import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton } from "@material-ui/core";
import SyncIcon from "@material-ui/icons/Sync";
import FilterListIcon from "@material-ui/icons/FilterList";

import { IncoreInputLabel } from "../styledComponents/IncoreInputLabel";
import { getHazardMetadata } from "../../utils/hazard";
import { ViewResultEntryTable } from "./table/ViewResultEntryTable";
import Interdependency from "./outputWidgets/Interdependency";
import BldgDamage from "./outputWidgets/BldgDamage";
import PoleDamage from "./outputWidgets/PoleDamage";
import BldgMCS from "./outputWidgets/BldgMCS";
import BldgFunctionality from "./outputWidgets/BldgFunctionality";
import CGE from "./outputWidgets/CGE";
import PopDislocation from "./outputWidgets/PopDislocation";
import ResilienceMetrics from "./outputWidgets/ResilienceMetrics";
import SubstationDamage from "./outputWidgets/SubstationDamage";
import { Collection } from "ol";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { getHazardGroupLayers } from "../../utils/map";


const useStyles = makeStyles({
	statTitle: {
		margin: "55px auto"
	},
	switchBase: {
		"&$checked": {
			color: "#00619D"
		},
		"&$checked + $track": {
			backgroundColor: "#00619D"
		}
	},
	checked: {},
	track: {}
});

// TODO move this registration somewhere else?
const registeredWidgets = {
	Interdependency: <Interdependency />,
	BldgDamage: <BldgDamage />,
	PoleDamage: <PoleDamage />,
	BldgMCS: <BldgMCS />,
	BldgFunctionality: <BldgFunctionality />,
	CGE: <CGE />,
	PopDislocation: <PopDislocation />,
	ResilienceMetrics: <ResilienceMetrics />,
	SubstationDamage: <SubstationDamage />
};

export default function ViewResult(props) {
	const { value, index, getExecutionList, executions, ...other } = props;
	const classes = useStyles();

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);

	// states
	const [numCompleted, setNumCompleted] = useState(0);
	const [executionEntries, setExecutionEntries] = useState([]);
	const [selectedExecutionItem, setSelectedExecutionItem] = useState(null);
	const [widgetName, setWidgetName] = useState(null); // outputWidgets name
	const [datawolfDatasetConfigItems, setDatawolfDatasetConfigItems] = useState([]);
	const [hazardGroupLayer, setHazardGroupLayer] = useState(); // group layer of hazard to overlay on the map
	const [hazardType, setHazardType] = useState(""); // used in runtime table
	const [previewOn, setPreviewOn] = useState(false); // list vs preview
	const [datawolfViewAllOn, setDatawolfViewAllOn] = useState(false); // datawolf view
	const [intervalId, setIntervalId] = useState(0);

	// component did mount
	useEffect(() => {
		getExecutionList(datawolfConfig, datawolfViewAllOn);
	}, []);

	// update execution statuses upon changing
	useEffect(() => {
		createAnalysisEntryTable();
	}, [executions]);

	// update datawolf view all on / off;
	// load executions list periodically every 10 seconds
	useEffect(() => {
		// clear old time due to params has changed
		if (intervalId){
			clearInterval(intervalId);
			setIntervalId(0);
		}

		// save some traffic; only perform backend GET when on that tab
		if (value === index){
			// immediately fetch new execution list
			getExecutionList(datawolfConfig, datawolfViewAllOn);

			// start a new interval timer and register that timer
			const interval = setInterval(() => {
				getExecutionList(datawolfConfig, datawolfViewAllOn);
			}, datawolfConfig["retreiveTimeInterval"] ?? 10 * 1000);
			setIntervalId(interval);
		}
	}, [datawolfViewAllOn, value]);

	// extract a single status from mutliple step status`
	const extractStatus = (executionItem) => {
		if (executionItem !== undefined && executionItem["stepState"] !== undefined) {
			let statusArr = Object.values(executionItem["stepState"]);
			// WAITING, QUEUED, RUNNING, FINISHED, ABORTED, FAILED, UNKNOWN
			// if failed or aborted, return failed | aborted
			// else if atleast one running, return running
			// else if atleast one queued, return queued
			// else if atleast one waiting, return waiting
			// else if any unknown, return unknown
			// last case where we need to check all values are finished then return finished
			// else return undefined
			if (statusArr.indexOf("FAILED") >= 0) return "FAILED";
			if (statusArr.indexOf("ABORTED") >= 0) return "ABORTED";
			else if (statusArr.indexOf("RUNNING") >= 0) return "RUNNING";
			else if (statusArr.indexOf("QUEUED") >= 0) return "QUEUED";
			else if (statusArr.indexOf("WAITING") >= 0) return "WAITING";
			else if (statusArr.indexOf("UNKNOWN") >= 0) return "UNKNOWN";
			else if (statusArr.every(status => status === "FINISHED")) return "FINISHED";
		}
		return "UNDEFINED";
	};

	// createAnalysisEntryTable
	const createAnalysisEntryTable = () => {
		let num = 0;
		let entries = [];
		executions.map((executionItem) => {
			// calculate the total completed executions
			if (extractStatus(executionItem) === "FINISHED") {
				num++;
			}

			// generate table
			let entry = Object.assign({}, executionItem);
			entry["hazardType"] = _getHazardInfo(executionItem).hazardType;
			entry["finalStatus"] = extractStatus(executionItem);
			entries.push(entry);
		});
		setNumCompleted(num);
		setExecutionEntries(entries);
	};

	const fieldNames = [
		{
			prettyName: "TITLE",
			columnName: "title"
		},
		{
			prettyName: "DESCRIPTION",
			columnName: "description"
		},
		{
			prettyName: "HAZARD TYPE",
			columnName: "hazardType"
		},
		{
			prettyName: "RUN DATE",
			columnName: "date"
		},
		{
			prettyName: "STATUS",
			columnName: "finalStatus"
		}
	];

	// close the model
	const handlePreviewClose = (layerRef) => {
		setPreviewOn(false);
		setWidgetName("");

		// important! remove tile layers; reset map
		layerRef.current.tilelayer.setLayers(new Collection([]));
	};

	const getExecution = (executionItemId) => {
		let item = executions.filter((executionItem) => {
			return executionItem.id === executionItemId;
		});

		return item[0];
	};

	// async loop is a hell! get hazard id params and type
	const _getHazardInfo = (executionItem) => {
		return datawolfWorkflowConfig.inputs.parameters.reduce((hazardInfo, p) => {
			if (p.variableName === "selectedHazardId") {
				return { ...hazardInfo, hazardId: executionItem["parameters"][p.parametersMap[0].paramId] };
			} else if (p.variableName === "selectedHazardType") {
				return { ...hazardInfo, hazardType: executionItem["parameters"][p.parametersMap[0].paramId] };
			} else {
				return hazardInfo;
			}
		}, {});
	};

	const preview = async (executionId, widgetName) => {
		const selectedExecutionItem = getExecution(executionId);
		setSelectedExecutionItem(selectedExecutionItem);
		setWidgetName(widgetName);

		// group output items belongs to that widgetName/widget type
		// TODO rewrite this part of logic!
		setDatawolfDatasetConfigItems(
			datawolfWorkflowConfig.outputs.datasets[0].datasetsMap.reduce((list, item) => {
				if (widgetName === "ResilienceMetrics") {
					if (
						item.datasets.widget === "CGE" ||
						item.datasets.widget === "PopDislocation" ||
						item.datasets.widget === "BldgFunctionality"
					) {
						return [...list, item];
					}
				}
				if (widgetName === "Interdependency") {
					if (item.datasets.widget === "SubstationDamage") {
						return [...list, item];
					}
				}
				if (widgetName === "PopDislocation") {
					if (item.datasets.widget === widgetName || item.datasets.widget === "BldgDamage") {
						return [...list, item];
					}
				} else {
					if (item.datasets.widget === widgetName) {
						return [...list, item];
					}
				}

				return list;
			}, [])
		);

		const hazardInfo = _getHazardInfo(selectedExecutionItem);
		let hazardMetadata = await getHazardMetadata(globalConfig, hazardInfo.hazardType, hazardInfo.hazardId);
		setHazardGroupLayer(getHazardGroupLayers(globalConfig, hazardMetadata, hazardInfo.hazardType, 3, 0.5));
		setHazardType(hazardInfo["hazardType"]);

		// dialog on
		setPreviewOn(true);
	};

	const handleViewAllDatawolf = () => {
		setDatawolfViewAllOn(datawolfViewAllOn => !datawolfViewAllOn);
	};

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{/*for analysis list*/}
			<Box>
				<Box className={classes.statTitle}>
					<IncoreInputLabel>{`Completed Analysis (${numCompleted})`}</IncoreInputLabel>
					<Box style={{ float: "right" }}>
						<FormControlLabel
							control={
								<Switch
									checked={datawolfViewAllOn}
									onChange={handleViewAllDatawolf}
									name="datawolfViewAllSwitch"
									color="default"
									classes={{
										switchBase: classes.switchBase,
										checked: classes.checked,
										track: classes.track
									}}
								/>
							}
							label="View All"
						/>
						{/*TODO in the future this could be used to add filters to narrow down exectusions (e.g. only show completed...)*/}
						{/*<IconButton aria-label="filter"><FilterListIcon /></IconButton>*/}
					</Box>
				</Box>
				<Box>
					<ViewResultEntryTable fieldNames={fieldNames} executions={executionEntries} preview={preview} />
				</Box>
			</Box>

			{/*for individual analysis result preview*/}
			{widgetName && selectedExecutionItem && previewOn && datawolfDatasetConfigItems.length >0 && hazardType && hazardGroupLayer ? (
				(() => {
					return React.cloneElement(registeredWidgets[widgetName], {
						executionItem: selectedExecutionItem,
						getExecution: getExecution,
						previewOn: previewOn,
						handlePreviewClose: handlePreviewClose,
						datawolfDatasetConfigItems: datawolfDatasetConfigItems,
						hazardType: hazardType,
						hazardLayers: hazardGroupLayer
					});
				})()
			) : (
				<></>
			)}
		</div>
	);
}

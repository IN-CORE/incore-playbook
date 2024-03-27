import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import { IncoreInputLabel } from "../styledComponents/IncoreInputLabel";
import { getHazardMetadata } from "../../utils/hazard";
import { ViewResultEntryTable } from "./table/ViewResultEntryTable";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { generateLayers, getHazardGroupLayers } from "../../utils/map";
import { DownloadAlert } from "./alert/DownloadAlert";
import { registeredWidgets } from "./outputWidgets/RegisteredWidgets";
import { extractStatus, fetchRsDetails } from "../../utils/common";

const useStyles = makeStyles({
	statTitle: {
		margin: "55px auto",
	},
	switchBase: {
		"&$checked": {
			color: "#00619D",
		},
		"&$checked + $track": {
			backgroundColor: "#00619D",
		},
	},
	checked: {},
	track: {},
});

export default function ViewResult(props) {
	const { value, index, getExecutionList, executions, ...other } = props;
	const classes = useStyles();

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfWorkflowConfig = useSelector(
		(state) => state.config.datawolfWorkflowConfig,
	);

	// states
	const [numCompleted, setNumCompleted] = useState(0);
	const [executionEntries, setExecutionEntries] = useState([]);
	const [selectedExecutionItem, setSelectedExecutionItem] = useState(null);
	const [widgetName, setWidgetName] = useState(null); // outputWidgets name
	const [datawolfDatasetConfigItems, setDatawolfDatasetConfigItems] = useState(
		[],
	);
	const [hazardGroupLayer, setHazardGroupLayer] = useState(); // group layer of hazard to overlay on the map
	const [hazardType, setHazardType] = useState(""); // used in runtime table
	const [retrofitLayer, setRetrofitLayer] = useState(); // retrofit strategy
	const [previewOn, setPreviewOn] = useState(false); // list vs preview
	const [datawolfViewAllOn, setDatawolfViewAllOn] = useState(false); // datawolf view
	const [downloadDialogOpen, setDownloadDialogOpen] = React.useState(false);

	// component did mount
	useEffect(() => {
		getExecutionList(datawolfConfig, datawolfViewAllOn);
	}, []);

	// update datawolf view all on / off;
	// load executions list periodically every 10 seconds
	useEffect(() => {
		// save some traffic; only perform backend GET when on that tab
		if (value === index) {
			// immediately fetch new execution list
			getExecutionList(datawolfConfig, datawolfViewAllOn);

			// start a new interval timer and register that timer
			const interval = setInterval(
				() => {
					getExecutionList(datawolfConfig, datawolfViewAllOn);
				},
				datawolfConfig["retreiveTimeInterval"] ?? 10 * 1000,
			);
			return () => {
				clearInterval(interval);
			};
		}
	}, [datawolfViewAllOn, value]);

	// update execution statuses upon changing
	useEffect(() => {
		createAnalysisEntryTable();
	}, [executions]);

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
			columnName: "title",
		},
		{
			prettyName: "DESCRIPTION",
			columnName: "description",
		},
		{
			prettyName: "CREATED BY",
			columnName: "creator",
		},
		{
			prettyName: "HAZARD TYPE",
			columnName: "hazardType",
		},
		{
			prettyName: "RUN DATE",
			columnName: "date",
		},
		{
			prettyName: "STATUS",
			columnName: "finalStatus",
		},
	];

	// close the model
	const handlePreviewClose = () => {
		setPreviewOn(false);
		setWidgetName("");
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
				return {
					...hazardInfo,
					hazardId: executionItem["parameters"][p.parametersMap[0].paramId],
				};
			} else if (p.variableName === "selectedHazardType") {
				return {
					...hazardInfo,
					hazardType: executionItem["parameters"][p.parametersMap[0].paramId],
				};
			} else {
				return hazardInfo;
			}
		}, {});
	};

	const _getRetrofitInfo = async (executionItem) => {
		let retrofitStrategyDetails = {};
		const parameter = datawolfWorkflowConfig.inputs.parameters.find(
			(p) => p.variableName === "selectedRetrofitStrategyId",
		);
		if (parameter) {
			const retrofitStrategyId =
				executionItem["parameters"][parameter.parametersMap[0].paramId];
			// fetch retrofit strategy details
			const response = await fetchRsDetails(retrofitStrategyId, globalConfig);
			if (response.status === 200) {
				retrofitStrategyDetails = response.json();
			}
		}
		return retrofitStrategyDetails;
	};

	const preview = async (executionId, widgetName) => {
		const selectedExecutionItem = getExecution(executionId);
		setSelectedExecutionItem(selectedExecutionItem);
		setWidgetName(widgetName);

		// group output items belongs to that widgetName/widget type
		// TODO rewrite this part of logic!
		setDatawolfDatasetConfigItems(
			datawolfWorkflowConfig.outputs.datasets[0].datasetsMap.reduce(
				(list, item) => {
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
						if (
							item.datasets.widget === widgetName ||
							item.datasets.widget === "BldgDamage"
						) {
							return [...list, item];
						}
					} else {
						if (item.datasets.widget === widgetName) {
							return [...list, item];
						}
					}

					return list;
				},
				[],
			),
		);

		const hazardInfo = _getHazardInfo(selectedExecutionItem);
		let hazardMetadata = await getHazardMetadata(
			globalConfig,
			hazardInfo.hazardType,
			hazardInfo.hazardId,
		);
		setHazardGroupLayer(
			getHazardGroupLayers(
				globalConfig,
				mapConfig,
				hazardMetadata,
				hazardInfo.hazardType,
				0,
				0.5,
			),
		);
		setHazardType(hazardInfo["hazardType"]);

		const retrofitInfo = await _getRetrofitInfo(selectedExecutionItem);
		const rsLayerId = retrofitInfo.rsDetailsLayerId
			? retrofitInfo.rsDetailsLayerId
			: "";
		const layerDef = [
			{
				layerId: rsLayerId,
				layerStyles: mapConfig.LAYER_STYLES.RetrofitStrategy,
				title: "Retrofit Strategy Details",
				opacity: 1,
				zIndex: 2,
			},
		];
		setRetrofitLayer(
			generateLayers(globalConfig, layerDef, "Retrofit Strategy"),
		);

		// dialog on
		setPreviewOn(true);
	};

	const handleViewAllDatawolf = () => {
		setDatawolfViewAllOn((datawolfViewAllOn) => !datawolfViewAllOn);
	};

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{/*Download alerts*/}
			<DownloadAlert
				downloadDialogOpen={downloadDialogOpen}
				handleDownloadDialogClose={() => {
					setDownloadDialogOpen(false);
				}}
			/>
			{/*for analysis list*/}
			<Box>
				<Box
					className={classes.statTitle}
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "30px",
						marginTop: "30px",
					}}
				>
					<IncoreInputLabel
						style={{
							display: "flex",
							justifyContent: "flex-top",
							width: "250px",
							margin: 0,
						}}
					>
						{`Completed Analysis (${numCompleted})`}
					</IncoreInputLabel>
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
									track: classes.track,
								}}
							/>
						}
						style={{
							display: "flex",
							justifyContent: "flex-end",
							width: "140px",
							margin: 0,
						}}
						label="View All"
					/>
				</Box>
				<Box>
					<ViewResultEntryTable
						fieldNames={fieldNames}
						executions={executionEntries}
						preview={preview}
					/>
				</Box>
			</Box>

			{/*for individual analysis result preview*/}
			{widgetName &&
			selectedExecutionItem &&
			previewOn &&
			datawolfDatasetConfigItems.length > 0 &&
			hazardType &&
			hazardGroupLayer &&
			retrofitLayer ? (
				(() => {
					return React.cloneElement(registeredWidgets[widgetName], {
						executionItem: selectedExecutionItem,
						getExecution: getExecution,
						previewOn: previewOn,
						handlePreviewClose: handlePreviewClose,
						datawolfDatasetConfigItems: datawolfDatasetConfigItems,
						hazardType: hazardType,
						hazardLayers: hazardGroupLayer,
						retrofitLayer: retrofitLayer,
						setDownloadDialogOpen: setDownloadDialogOpen,
					});
				})()
			) : (
				<></>
			)}
		</div>
	);
}

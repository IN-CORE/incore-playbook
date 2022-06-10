import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import {Box, IconButton} from "@material-ui/core";
import SyncIcon from "@material-ui/icons/Sync";
import FilterListIcon from "@material-ui/icons/FilterList";

import {IncoreInputLabel} from "../styledComponents/IncoreInputLabel";

import {getOutputFileJson} from "../../utils/datawolf";
import {getHazardMetadata} from "../../utils/hazard";
import {exportJson} from "../../utils/common";

import {ViewResultEntryTable} from "./table/ViewResultEntryTable";
import {downloadDataset} from "../../utils/dataset";
import Interdependency from "./outputWidgets/Interdependency";
import BldgDamage from "./outputWidgets/BldgDamage";
import PoleDamage from "./outputWidgets/PoleDamage";
import BldgMCS from "./outputWidgets/BldgMCS";
import BldgFunctionality from "./outputWidgets/BldgFunctionality";
import CGE from "./outputWidgets/CGE";
import PopDislocation from "./outputWidgets/PopDislocation";
import ResilienceMetrics from "./outputWidgets/ResilienceMetrics";
import SubstationDamage from "./outputWidgets/SubstationDamage";


const useStyles = makeStyles({
	statTitle: {
		margin: "55px auto",
	},
});

export default function ViewResult(props) {
	const {value, index, getExecutionList, executions, ...other} = props;
	const classes = useStyles();

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);

	// load executions list that has status
	useEffect(() => { getExecutionList(datawolfConfig); }, []);

	// update execution statuses upon changing
	useEffect(() => {
		createAnalysisEntryTable();
	}, [executions]);

	// states
	const [numCompleted, setNumCompleted] = useState(0);
	const [executionEntries, setExecutionEntries] = useState([]);
	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [selectedExecutionItem, setSelectedExecutionItem] = useState(null);
	const [widgetName, setWidgetName] = useState(""); // outputWidgets name
	const [datawolfDatasetConfigItems, setDatawolfDatasetConfigItems] = useState([]);
	const [hazardDatasetId, setHazardDatasetId] = useState([]); // to overlay hazard on the map
	const [map, setMap] = useState();
	const [previewOn, setPreviewOn] = useState(false); // list vs preview

	// extract a single status from mutliple step status`
	const extractStatus = (executionItem) => {
		if (executionItem !== undefined && executionItem["stepState"] !== undefined) {
			let statusArr = Object.values(executionItem["stepState"]);
			// WAITING, QUEUED, RUNNING, FINISHED, ABORTED, FAILED, UNKNOWN
			if (statusArr.indexOf("WAITING") >= 0) return "WAITING";
			else if (statusArr.indexOf("QUEUED") >= 0) return "QUEUED";
			else if (statusArr.indexOf("RUNNING") >= 0) return "RUNNING";
			else if (statusArr.indexOf("ABORTED") >= 0) return "ABORTED";
			else if (statusArr.indexOf("FAILED") >= 0) return "FAILED";
			else if (statusArr.indexOf("UNKNOWN") >= 0) return "UNKNOWN";
			else if (statusArr.indexOf("FINISHED") >= 0) return "FINISHED";
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
			// TODO read hazard Tyep without hard coding
			entry["hazardType"] = "Tornado";
			entry["finalStatus"] = extractStatus(executionItem);
			entries.push(entry);
		});
		setNumCompleted(num);
		setExecutionEntries(entries);
	};

	const fieldNames = [
		{
			"prettyName": "TITLE",
			"columnName": "title",
		},
		{
			"prettyName": "DESCRIPTION",
			"columnName": "description",
		},
		{
			"prettyName": "HAZARD TYPE",
			"columnName": "hazardType",
		},
		{
			"prettyName": "RUN DATE",
			"columnName": "date",
		},
		{
			"prettyName": "STATUS",
			"columnName": "finalStatus",
		}
	];

	// close the model
	const handlePreviewClose = () => {
		setPreviewOn(false);
		setWidgetName("");
		setMap();
	};

	const getExecution = (executionItemId) => {
		let item = executions.filter((executionItem) => {
			return executionItem.id === executionItemId;
		});

		return item[0];
	};

	// const downloadBldgDmg = async (executionItemId) => {
	// 	let executionItem = getExecution(executionItemId);
	// 	let bldgMaxDamageStateId = executionItem["datasets"][datawolfConfig["datasets"]["bldgMaxDamageStateId"]];
	// 	let bldgMaxDamageStateINCOREId = await getOutputFileJson(datawolfConfig, bldgMaxDamageStateId);
	// 	await downloadDataset(globalConfig, bldgMaxDamageStateINCOREId, "bldg-dmg");
	// };

	const downloadBldgFunc = async (executionItemId) => {
		let executionItem = getExecution(executionItemId);
		let bldgFuncProbId = executionItem["datasets"][datawolfConfig["datasets"]["bldgFuncProbId"]];
		let bldgFuncProbINCOREId = await getOutputFileJson(datawolfConfig, bldgFuncProbId);
		await downloadDataset(globalConfig, bldgFuncProbINCOREId, "bldg-func");
	};

	const downloadBldgMCS = async (executionItemId) => {
		let executionItem = getExecution(executionItemId);
		let mcsBldgFailureProbId = executionItem["datasets"][datawolfConfig["datasets"]["mcsBldgFailureProbId"]];
		let mcsBldgFailureProbINCOREId = await getOutputFileJson(datawolfConfig, mcsBldgFailureProbId);
		await downloadDataset(globalConfig, mcsBldgFailureProbINCOREId, "bldg-mcs");
	};

	const downloadEpfDmg = async (executionItemId, type) => {
		let executionItem = getExecution(executionItemId);
		setSelectedExecutionName(executionItem["title"]);

		let epfMaxDmgStateId;
		if (type === "pole") {
			epfMaxDmgStateId = executionItem["datasets"][datawolfConfig["datasets"]["epfPoleMaxDmgStateId"]];
			setWidgetName("epfPoleDmg");
		} else if (type === "substation") {
			epfMaxDmgStateId = executionItem["datasets"][datawolfConfig["datasets"]["epfSubstationMaxDmgStateId"]];
			setWidgetName("epfSubstationDmg");
		} else {
			console.log("unmatching EPF type", executionItemId);
		}
		let epfMaxDmgStateINCOREId = await getOutputFileJson(datawolfConfig, epfMaxDmgStateId);
		await downloadDataset(globalConfig, epfMaxDmgStateINCOREId, `epf-${type}`);
	};

	// const getCGEJson = async (executionItemId) => {
	//
	// 	let executionItem = getExecution(executionItemId);
	// 	setSelectedExecutionName(executionItem["title"]);
	//
	// 	// cge by total household income
	// 	let cgeHouseholdIncomeId = executionItem["datasets"][datawolfConfig["datasets"]["cgeHouseholdIncomeId"]];
	// 	let cgeHouseholdIncome = await getOutputFileJson(datawolfConfig, cgeHouseholdIncomeId);
	// 	let cgeHouseholdIncomeContent = JSON.parse(cgeHouseholdIncome);
	//
	// 	// dislocation group by
	// 	let cgeDomesticSupplyId = executionItem["datasets"][datawolfConfig["datasets"]["cgeDomesticSupplyId"]];
	// 	let cgeDomesticSupply = await getOutputFileJson(datawolfConfig, cgeDomesticSupplyId);
	// 	let cgeDomesticSupplyContent = JSON.parse(cgeDomesticSupply);
	//
	// 	let cgeEmploymentId = executionItem["datasets"][datawolfConfig["datasets"]["cgeEmploymentId"]];
	// 	let cgeEmployment = await getOutputFileJson(datawolfConfig, cgeEmploymentId);
	// 	let cgeEmploymentContent = JSON.parse(cgeEmployment);
	//
	// 	return {
	// 		"totalHouseholdIncome": cgeHouseholdIncomeContent,
	// 		"domesticSupply": cgeDomesticSupplyContent,
	// 		"employment": cgeEmploymentContent
	// 	};
	// };

	// const downloadCGE = async (executionItemId) => {
	// 	let cgeJson = await getCGEJson(executionItemId);
	// 	exportJson(cgeJson, `cge-${executionItemId}`);
	// };

	const getPopDislJson = async (executionItemId) => {
		let executionItem = getExecution(executionItemId);

		// total dislocation
		let totalDislTableId = executionItem["datasets"][datawolfConfig["datasets"]["totalDislocationId"]];
		let totalDislTable = await getOutputFileJson(datawolfConfig, totalDislTableId);
		let totalDislTableIdContent = JSON.parse(totalDislTable);

		// dislocation group by
		let dislocationByRaceId = executionItem["datasets"][datawolfConfig["datasets"]["dislocationByRaceId"]];
		let dislocationByRace = await getOutputFileJson(datawolfConfig, dislocationByRaceId);
		let dislocationByRaceContent = JSON.parse(dislocationByRace);

		let dislocationByTenureId = executionItem["datasets"][datawolfConfig["datasets"]["dislocationByTenureId"]];
		let dislocationByTenure = await getOutputFileJson(datawolfConfig, dislocationByTenureId);
		let dislocationByTenureContent = JSON.parse(dislocationByTenure);

		let dislocationByIncomeId = executionItem["datasets"][datawolfConfig["datasets"]["dislocationByIncomeId"]];
		let dislocationByIncome = await getOutputFileJson(datawolfConfig, dislocationByIncomeId);
		let dislocationByIncomeContent = JSON.parse(dislocationByIncome);

		let dislocationByHousingTypeId = executionItem["datasets"][datawolfConfig["datasets"]["dislocationByHousingTypeId"]];
		let dislocationByHousingType = await getOutputFileJson(datawolfConfig, dislocationByHousingTypeId);
		let dislocationByHousingTypeIdContent = JSON.parse(dislocationByHousingType);

		return {
			"totalResultsTable": totalDislTableIdContent,
			"huaResultsTable":{
				"income": dislocationByIncomeContent,
				"race": dislocationByRaceContent,
				"tenure": dislocationByTenureContent,
				"housingType": dislocationByHousingTypeIdContent
			}
		};
	};

	const downloadPopDisl = async (executionItemId) => {
		let popDislJson = await getPopDislJson(executionItemId);
		exportJson(popDislJson, `population-dislocation-${executionItemId}`);
	};

	const preview = (executionId, widgetName) => {
		const selectedExecutionItem = getExecution(executionId);
		setSelectedExecutionItem(selectedExecutionItem);
		setWidgetName(widgetName);

		// group output items belongs to that widgetName/widget type
		setDatawolfDatasetConfigItems(datawolfWorkflowConfig.outputs.datasets[0].datasetsMap.reduce((list, item) => {
			if (widgetName === "ResilienceMetrics"){
				if (item.datasets.widget === "CGE" || item.datasets.widget === "PopDislocation"
					|| item.datasets.widget === "BldgFunctionality"){
					return [...list, item];
				}
				else{
					return list;
				}
			}
			else{
				if (item.datasets.widget === widgetName){
					return [...list, item];
				}
				else{
					return list;
				}
			}
		}, []));

		// get hazard id params
		setHazardDatasetId(datawolfWorkflowConfig.inputs.parameters[0].parametersMap.filter(async item => {
			if (item.parameters.variableName === "selectedHazardId") {
				let hazardId = selectedExecutionItem["parameters"][item.paramId];
				let hazardMetadata = await getHazardMetadata(globalConfig, hazardId);
				setHazardDatasetId(hazardMetadata["datasetId"]);
			}
		}));

		// dialog on
		setPreviewOn(true);
	};

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
			 aria-labelledby={`simple-tab-${index}`}
			 {...other}
		>
			{/*for analysis list*/}
			<Box>
				<Box className={classes.statTitle}>
					<IncoreInputLabel>{`Completed Analysis (${numCompleted})`}</IncoreInputLabel>
					<Box style={{float: "right"}}>
						<IconButton aria-label="sync" onClick={() => {getExecutionList(datawolfConfig);}}
							color="secondary"><SyncIcon/></IconButton>
						<IconButton aria-label="filter"><FilterListIcon/></IconButton>
					</Box>
				</Box>
				<Box>
					<ViewResultEntryTable fieldNames={fieldNames}
										  executions={executionEntries}
										  preview={preview}
										  // previewMetrics={previewMetrics}
										  // previewBldgDmg={previewBldgDmg} downloadBldgDmg={downloadBldgDmg}
										  // previewEpfDmg={previewEpfDmg} downloadEpfDmg={downloadEpfDmg}
										  // previewBldgFunc={previewBldgFunc} downloadBldgFunc={downloadBldgFunc}
										  // previewInterd={previewInterd}
										  // previewBldgMCS={previewBldgMCS} downloadBldgMCS={downloadBldgMCS}
										  // previewPopDisl={previewPopDisl} downloadPopDisl={downloadPopDisl}
										  // previewCGE={previewCGE} downloadCGE={downloadCGE}
					/>
				</Box>
			</Box>

			{/*for individual analysis result preview*/}
			{
				// TODO this condition can be modified
				(()=>{
					if (widgetName === "ResilienceMetrics"){
						return (<ResilienceMetrics executionItem={selectedExecutionItem}
												   getExecution={getExecution}
												   previewOn={previewOn}
												   handlePreviewClose={handlePreviewClose}
												   datawolfDatasetConfigItems={datawolfDatasetConfigItems}
						/>);
					}
					// TODO
					else if (widgetName === "Interdependency") {
						return (<Interdependency executionName={selectedExecutionName}
												 executionItem={selectedExecutionItem}
												 getExecution={getExecution}
												 previewOn={previewOn}
												 handlePreviewClose={handlePreviewClose}
												 datawolfDatasetConfigItems={datawolfDatasetConfigItems}
												 setMap={setMap}
						/>);
					}
					else if (widgetName === "BldgDamage") {
						return (<BldgDamage
							executionItem={selectedExecutionItem}
							getExecution={getExecution}
							previewOn={previewOn}
							handlePreviewClose={handlePreviewClose}
							datawolfDatasetConfigItems={datawolfDatasetConfigItems}
							setMap={setMap}
							hazardDatasetId={hazardDatasetId}
						/>);
					}
					else if (widgetName === "PoleDamage") {
						return (
							<PoleDamage
								executionItem={selectedExecutionItem}
								getExecution={getExecution}
								previewOn={previewOn}
								handlePreviewClose={handlePreviewClose}
								datawolfDatasetConfigItems={datawolfDatasetConfigItems}
								setMap={setMap}
								hazardDatasetId={hazardDatasetId}
							/>);
					}
					else if (widgetName === "SubstationDamage") {
						return (
							<SubstationDamage
								executionItem={selectedExecutionItem}
								getExecution={getExecution}
								previewOn={previewOn}
								handlePreviewClose={handlePreviewClose}
								datawolfDatasetConfigItems={datawolfDatasetConfigItems}
								setMap={setMap}
								hazardDatasetId={hazardDatasetId}
							/>);
					}
					else if (widgetName === "BldgMCS") {
						return (<BldgMCS
							executionItem={selectedExecutionItem}
							getExecution={getExecution}
							previewOn={previewOn}
							handlePreviewClose={handlePreviewClose}
							datawolfDatasetConfigItems={datawolfDatasetConfigItems}
							setMap={setMap}
							hazardDatasetId={hazardDatasetId}
						/>);
					}
					else if (widgetName === "BldgFunctionality") {
						return (<BldgFunctionality
							executionItem={selectedExecutionItem}
							getExecution={getExecution}
							previewOn={previewOn}
							handlePreviewClose={handlePreviewClose}
							datawolfDatasetConfigItems={datawolfDatasetConfigItems}
							setMap={setMap}
							hazardDatasetId={hazardDatasetId}
						/>);
					}
					else if (widgetName === "CGE") {
						return (<CGE executionItem={selectedExecutionItem}
								 getExecution={getExecution}
								 previewOn={previewOn}
								 handlePreviewClose={handlePreviewClose}
								 datawolfDatasetConfigItems={datawolfDatasetConfigItems} />);
					}
					else if (widgetName === "PopDislocation") {
						return (<PopDislocation executionItem={selectedExecutionItem}
							getExecution={getExecution}
							previewOn={previewOn}
							handlePreviewClose={handlePreviewClose}
							datawolfDatasetConfigItems={datawolfDatasetConfigItems}
							setMap={setMap}
							hazardDatasetId={hazardDatasetId}
						/>);
					}
					else{
						return <></>;
					}
				})()
			}
		</div>);
}

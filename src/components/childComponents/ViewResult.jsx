import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, IconButton} from "@material-ui/core";
import SyncIcon from "@material-ui/icons/Sync";
import FilterListIcon from "@material-ui/icons/FilterList";

import {IncoreInputLabel} from "../styledComponents/IncoreInputLabel";

import datawolfConfig from "../../datawolf.config";

import {getOutputFileJson} from "../../utils/datawolf";
import {getTornadoMetadata} from "../../utils/hazard";

import GroupLayer from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM, {ATTRIBUTION as OSM_ATTRIBUTION} from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import config from "../../app.config";

import {ViewResultEntryTable} from "./table/ViewResultEntryTable";

import {downloadDataset} from "../../utils/dataset";
import Interdependency from "./modal/Interdependency";
import BldgDamage from "./modal/BldgDamage";
import EpfDamage from "./modal/EpfDamage";
import BldgFunctionality from "./modal/BldgFunctionality";
import CGE from "./modal/CGE";
import PopDislocation from "./modal/PopDislocation";

const useStyles = makeStyles({
	statTitle: {
		margin: "55px auto",
	},
});


const layers = {
	basemaps: new GroupLayer({
		title: "Base Maps",
		layers: [
			new TileLayer({
				type: "base",
				visible: true,
				title: "Carto",
				source: new XYZ({
					url: "https://{a-d}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
					attributions: [
						"&#169; <a href=\"https://www.carto.com\">Carto</a>,",
						OSM_ATTRIBUTION
					]
				})
			}),
			new TileLayer({
				type: "base",
				visible: false,
				title: "OSM",
				source: new OSM()
			}),
		]
	}),
	tilelayer: new GroupLayer({
		title: "Damage",
		layers: []
	})
};

export default function ViewResult(props) {
	const {value, index, getExecutionList, executions, ...other} = props;
	const classes = useStyles();

	// load executions list that has status
	useEffect(() => { getExecutionList(); }, []);

	// update execution statuses upon changing
	useEffect(() => {
		createAnalysisEntryTable();
	}, [executions]);

	// states
	const [numCompleted, setNumCompleted] = useState(0);
	const [executionEntries, setExecutionEntries] = useState([]);
	const [resultType, setResultType] = useState("bldgDmg"); // bldgFunc, bldgDmg, epfDmg, bldgMCS, interD
	const [runtime, setRuntime] = useState("");
	const [tables, setTables] = useState({});
	const [barCharts, setBarCharts] = useState([]);
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

	// for map
	const handleLayerUpdate = (layerDef) => {
		const inputLayers = [];

		layerDef.map((layerDefinition) => {
			const source = new TileWMS({
				url: `${config.geoServerWMS}`,
				params: {
					LAYERS: layerDefinition["layerId"],
					STYLES: layerDefinition["layerStyles"]
				},
				ratio: 1,
				serverType: "geoserver"
			});
			let mapLayer = new TileLayer({
				title: layerDefinition["title"],
				source: source,
				zIndex: 1,
				opacity: layerDefinition["opacity"]
			});
			inputLayers.push(mapLayer);
		});

		layers["tilelayer"] = new GroupLayer({
			title: "Preview",
			layers: inputLayers,
		});
	};

	// close the model
	const handlePreviewClose = () => {
		setPreviewOn(false);
	};

	const getExecution = (executionItemId) => {
		let item = executions.filter((executionItem) => {
			return executionItem.id === executionItemId;
		});

		return item[0];
	};

	const previewBldgDmg = async (executionItemId) => {
		let executionItem = getExecution(executionItemId);

		// map
		let bldgMaxDamageStateId = executionItem["datasets"][datawolfConfig["datasets"]["bldgMaxDamageStateId"]];
		let bldgMaxDamageStateINCOREId = await getOutputFileJson(bldgMaxDamageStateId);
		let hazardId = executionItem["parameters"][datawolfConfig["parameters"]["hazardId"]];
		let hazardMetadata = await getTornadoMetadata(hazardId);
		let hazardDatasetId = hazardMetadata["datasetId"];
		const layerDef = [
			{
				"layerId": bldgMaxDamageStateINCOREId,
				"layerStyles": "incore:bldg-dmg-summary",
				"title": "Building Damage",
				"opacity": 1
			},
			{
				"layerId": hazardDatasetId,
				"layerStyles": "incore:tornado",
				"title": "Tornado",
				"opacity": 0.3
			}
		];
		handleLayerUpdate(layerDef);

		let bldgDmgSummaryTableId = executionItem["datasets"][datawolfConfig["datasets"]["bldgDmgSummaryTableId"]];
		let bldgDmgSummaryTable = await getOutputFileJson(bldgDmgSummaryTableId);
		let bldgDmgSummaryTableContent = JSON.parse(bldgDmgSummaryTable);

		// for summary table on the top
		setRuntime(executionItem["date"].slice(0, 10));

		// for table
		setTables(bldgDmgSummaryTableContent);

		// for chart
		setBarCharts(bldgDmgSummaryTableContent["by_category"]);

		// set preview type
		setResultType("bldgDmg");

		// open preview
		setPreviewOn(true);
	};
	const downloadBldgDmg = async (executionItemId) => {
		let executionItem = getExecution(executionItemId);
		let bldgMaxDamageStateId = executionItem["datasets"][datawolfConfig["datasets"]["bldgMaxDamageStateId"]];
		let bldgMaxDamageStateINCOREId = await getOutputFileJson(bldgMaxDamageStateId);
		await downloadDataset(bldgMaxDamageStateINCOREId, "bldg-dmg");
	};

	const previewBldgFunc = async (executionItemId) => {
		const executionItem = await getExecution(executionItemId);

		// map
		let bldgFuncProbId = executionItem["datasets"][datawolfConfig["datasets"]["bldgFuncProbId"]];
		let bldgFuncProbINCOREId = await getOutputFileJson(bldgFuncProbId);
		let hazardId = executionItem["parameters"][datawolfConfig["parameters"]["hazardId"]];
		let hazardMetadata = await getTornadoMetadata(hazardId);
		let hazardDatasetId = hazardMetadata["datasetId"];
		const layerDef = [
			{
				"layerId": bldgFuncProbINCOREId,
				"layerStyles": "incore:joplin-bldg-func",
				"title": "Building Functionality Probability",
				"opacity": 1
			},
			{
				"layerId": hazardDatasetId,
				"layerStyles": "incore:tornado",
				"title": "Tornado",
				"opacity": 0.3
			}
		];
		handleLayerUpdate(layerDef);

		// bar chart & table
		let bldgFuncSummaryTableId = executionItem["datasets"][datawolfConfig["datasets"]["bldgFuncSummaryTableId"]];
		let bldgFuncSummaryTable = await getOutputFileJson(bldgFuncSummaryTableId);
		let bldgFuncSummaryTableContent = JSON.parse(bldgFuncSummaryTable);

		// for runtime table on the top
		setRuntime(executionItem["date"].slice(0, 10));

		// for table
		setTables(bldgFuncSummaryTableContent);

		// for chart
		setBarCharts(bldgFuncSummaryTableContent["by_category"]);

		// set preview type
		setResultType("bldgFunc");

		// open preview
		setPreviewOn(true);
	};
	const downloadBldgFunc = async (executionItemId) => {
		let executionItem = getExecution(executionItemId);
		let bldgFuncProbId = executionItem["datasets"][datawolfConfig["datasets"]["bldgFuncProbId"]];
		let bldgFuncProbINCOREId = await getOutputFileJson(bldgFuncProbId);
		await downloadDataset(bldgFuncProbINCOREId, "bldg-func");
	};

	const previewBldgMCS = async (executionItemId) => {
		const executionItem = await getExecution(executionItemId);

		// map
		let mcsBldgFailureProbId = executionItem["datasets"][datawolfConfig["datasets"]["mcsBldgFailureProbId"]];
		let mcsBldgFailureProbINCOREId = await getOutputFileJson(mcsBldgFailureProbId);
		let hazardId = executionItem["parameters"][datawolfConfig["parameters"]["hazardId"]];
		let hazardMetadata = await getTornadoMetadata(hazardId);
		let hazardDatasetId = hazardMetadata["datasetId"];
		const layerDef = [
			{
				"layerId": mcsBldgFailureProbINCOREId,
				"layerStyles": "incore:joplin-bldg-func",
				"title": "Building Functionality Probability without Interdependency",
				"opacity": 1
			},
			{
				"layerId": hazardDatasetId,
				"layerStyles": "incore:tornado",
				"title": "Tornado",
				"opacity": 0.3
			}
		];
		handleLayerUpdate(layerDef);

		// bar chart & table
		let mcsBldgSummaryTableId = executionItem["datasets"][datawolfConfig["datasets"]["mcsBldgSummaryTableId"]];
		let mcsBldgSummaryTable = await getOutputFileJson(mcsBldgSummaryTableId);
		let mcsBldgSummaryTableContent = JSON.parse(mcsBldgSummaryTable);

		// for runtime table on the top
		setRuntime(executionItem["date"].slice(0, 10));
		setTables(mcsBldgSummaryTableContent);
		setBarCharts(mcsBldgSummaryTableContent["by_category"]);
		setResultType("bldgMCS");

		// open preview
		setPreviewOn(true);
	};
	const downloadBldgMCS = async (executionItemId) => {
		let executionItem = getExecution(executionItemId);
		let mcsBldgFailureProbId = executionItem["datasets"][datawolfConfig["datasets"]["mcsBldgFailureProbId"]];
		let mcsBldgFailureProbINCOREId = await getOutputFileJson(mcsBldgFailureProbId);
		await downloadDataset(mcsBldgFailureProbINCOREId, "bldg-mcs");
	};

	const previewEpfDmg = async (executionItemId, type) => {
		let executionItem = getExecution(executionItemId);
		let epfMaxDmgStateId;

		if (type === "pole") {
			epfMaxDmgStateId = executionItem["datasets"][datawolfConfig["datasets"]["epfPoleMaxDmgStateId"]];
			setResultType("epfPoleDmg");
		} else if (type === "substation") {
			epfMaxDmgStateId = executionItem["datasets"][datawolfConfig["datasets"]["epfSubstationMaxDmgStateId"]];
			setResultType("epfSubstationDmg");
		} else {
			console.log("unmatching EPF type", executionItemId);
		}

		// map
		let epfMaxDmgStateINCOREId = await getOutputFileJson(epfMaxDmgStateId);
		let hazardId = executionItem["parameters"][datawolfConfig["parameters"]["hazardId"]];
		let hazardMetadata = await getTornadoMetadata(hazardId);
		let hazardDatasetId = hazardMetadata["datasetId"];
		const layerDef = [
			{
				"layerId": epfMaxDmgStateINCOREId,
				"layerStyles": "incore:epf-dmg-summary",
				"title": `EPF Damage (${type})`,
				"opacity": 1
			},
			{
				"layerId": hazardDatasetId,
				"layerStyles": "incore:tornado",
				"title": "Tornado",
				"opacity": 0.3
			}
		];
		handleLayerUpdate(layerDef);

		// open preview
		setPreviewOn(true);
	};
	const downloadEpfDmg = async (executionItemId, type) => {
		let executionItem = getExecution(executionItemId);
		let epfMaxDmgStateId;
		if (type === "pole") {
			epfMaxDmgStateId = executionItem["datasets"][datawolfConfig["datasets"]["epfPoleMaxDmgStateId"]];
			setResultType("epfPoleDmg");
		} else if (type === "substation") {
			epfMaxDmgStateId = executionItem["datasets"][datawolfConfig["datasets"]["epfSubstationMaxDmgStateId"]];
			setResultType("epfSubstationDmg");
		} else {
			console.log("unmatching EPF type", executionItemId);
		}
		let epfMaxDmgStateINCOREId = await getOutputFileJson(epfMaxDmgStateId);
		await downloadDataset(epfMaxDmgStateINCOREId, `epf-${type}`);
	};

	const previewInterd = async (executionItemId) => {
		let executionItem = getExecution(executionItemId);
		let epfMaxDmgStateId = executionItem["datasets"][datawolfConfig["datasets"]["epfSubstationMaxDmgStateId"]];
		let epfMaxDmgStateINCOREId = await getOutputFileJson(epfMaxDmgStateId);

		const layerDef = [
			{
				"layerId": "joplin-bldg-subs",
				"layerStyles": null,
				"title": "Interdependency Network",
				"opacity": 0.7
			},
			{
				"layerId": epfMaxDmgStateINCOREId,
				"layerStyles": "incore:joplin-substations-label",
				"title": "EPF Substations",
				"opacity": 1
			}
		];
		handleLayerUpdate(layerDef);

		// set preview type
		setResultType("interD");

		// open preview
		setPreviewOn(true);
	};

	const previewCGE = async (executionItemId) => {

		let executionItem = getExecution(executionItemId);

		// cge by total household income
		let cgeHouseholdIncomeId = executionItem["datasets"][datawolfConfig["datasets"]["cgeHouseholdIncomeId"]];
		let cgeHouseholdIncome = await getOutputFileJson(cgeHouseholdIncomeId);
		let cgeHouseholdIncomeContent = JSON.parse(cgeHouseholdIncome);

		// dislocation group by
		let cgeDomesticSupplyId = executionItem["datasets"][datawolfConfig["datasets"]["cgeDomesticSupplyId"]];
		let cgeDomesticSupply = await getOutputFileJson(cgeDomesticSupplyId);
		let cgeDomesticSupplyContent = JSON.parse(cgeDomesticSupply);

		let cgeEmploymentId = executionItem["datasets"][datawolfConfig["datasets"]["cgeEmploymentId"]];
		let cgeEmployment = await getOutputFileJson(cgeEmploymentId);
		let cgeEmploymentContent = JSON.parse(cgeEmployment);

		setTables({
			"totalHouseholdIncome":cgeHouseholdIncomeContent,
			"domesticSupply":cgeDomesticSupplyContent,
			"employment":cgeEmploymentContent
		});
		setResultType("cge");

		// open preview
		setPreviewOn(true);
	};

	const previewPopDisl = async (executionItemId) => {

		let executionItem = getExecution(executionItemId);

		// map
		let bldgMaxDamageStateId = executionItem["datasets"][datawolfConfig["datasets"]["bldgMaxDamageStateId"]];
		let bldgMaxDamageStateINCOREId = await getOutputFileJson(bldgMaxDamageStateId);

		let popDislId = executionItem["datasets"][datawolfConfig["datasets"]["popdislHeatmapId"]];
		let popDislINCOREId = await getOutputFileJson(popDislId);

		let hazardId = executionItem["parameters"][datawolfConfig["parameters"]["hazardId"]];
		let hazardMetadata = await getTornadoMetadata(hazardId);
		let hazardDatasetId = hazardMetadata["datasetId"];

		const layerDef = [
			{
				"layerId": hazardDatasetId,
				"layerStyles": "incore:tornado",
				"title": "Tornado",
				"opacity": 0.3
			},
			{
				"layerId": bldgMaxDamageStateINCOREId,
				"layerStyles": "incore:building",
				"title": "Building Inventory",
				"opacity": 0.8
			},
			{
				"layerId": popDislINCOREId,
				"layerStyles": "incore:heatmap",
				"title": "Population Dislocation Heatmap",
				"opacity": 0.8
			}
		];
		handleLayerUpdate(layerDef);

		// TODO
		// // total dislocation
		// let totalDislTableId = executionItem["datasets"][datawolfConfig["datasets"]["totalDislocationId"]];
		// let totalDislTable = await getOutputFileJson(totalDislTableId);
		// let totalDislTableIdContent = JSON.parse(totalDislTable);
		//
		// // dislocation group by
		// let dislocationByRaceId = executionItem["datasets"][datawolfConfig["datasets"]["dislocationByRaceId"]];
		// let dislocationByRace = await getOutputFileJson(dislocationByRaceId);
		// let dislocationByRaceContent = JSON.parse(dislocationByRace);
		//
		// let dislocationByTenureId = executionItem["datasets"][datawolfConfig["datasets"]["dislocationByTenureId"]];
		// let dislocationByTenure = await getOutputFileJson(dislocationByTenureId);
		// let dislocationByTenureContent = JSON.parse(dislocationByTenure);
		//
		// let dislocationByIncomeId = executionItem["datasets"][datawolfConfig["datasets"]["dislocationByIncomeId"]];
		// let dislocationByIncome = await getOutputFileJson(dislocationByIncomeId);
		// let dislocationByIncomeContent = JSON.parse(dislocationByIncome);
		//
		// let dislocationByHousingTypeId = executionItem["datasets"][datawolfConfig["datasets"]["dislocationByHousingTypeId"]];
		// let dislocationByHousingType = await getOutputFileJson(dislocationByHousingTypeId);
		// let dislocationByHousingTypeIdContent = JSON.parse(dislocationByHousingType);
		// setTable({});
		setResultType("popdisl");

		// open preview
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
						<IconButton aria-label="sync" onClick={getExecutionList}
							color="secondary"><SyncIcon/></IconButton>
						<IconButton aria-label="filter"><FilterListIcon/></IconButton>
					</Box>
				</Box>
				<Box>
					<ViewResultEntryTable fieldNames={fieldNames}
										  executions={executionEntries}
										  previewBldgDmg={previewBldgDmg} downloadBldgDmg={downloadBldgDmg}
										  previewEpfDmg={previewEpfDmg} downloadEpfDmg={downloadEpfDmg}
										  previewBldgFunc={previewBldgFunc} downloadBldgFunc={downloadBldgFunc}
										  previewInterd={previewInterd}
										  previewBldgMCS={previewBldgMCS} downloadBldgMCS={downloadBldgMCS}
										  previewPopDisl={previewPopDisl}
										  previewCGE={previewCGE}
					/>
				</Box>
			</Box>

			{/*for individual analysis result preview*/}
			{
				(()=>{
					if (resultType === "interD") {
						return (<Interdependency
							title="Interdependent Network of Building and Electric Power Facility"
							previewOn={previewOn}
							handlePreviewClose={handlePreviewClose}
							layers={layers}
							map={map}
							setMap={setMap}
						/>);
					}
					else if (resultType === "bldgDmg") {
						return (<BldgDamage
							title="Building Damage"
							previewOn={previewOn}
							handlePreviewClose={handlePreviewClose}
							runtime={runtime}
							barCharts={barCharts}
							layers={layers}
							tables={tables}
							map={map}
							setMap={setMap}
						/>);
					}
					else if (resultType === "epfPoleDmg") {
						return (
							<EpfDamage title="EPF Pole Damage"
									   previewOn={previewOn}
									   handlePreviewClose={handlePreviewClose}
									   layers={layers}
									   map={map}
									   setMap={setMap}
							/>);
					}
					else if (resultType === "epfSubstationDmg") {
						return (
							<EpfDamage title="EPF Substation Damage"
									   previewOn={previewOn}
									   handlePreviewClose={handlePreviewClose}
									   layers={layers}
									   map={map}
									   setMap={setMap}
							/>);
					}
					else if (resultType === "bldgMCS") {
						return (<BldgFunctionality
							title="Building Functionality without Interdependency"
							previewOn={previewOn}
							handlePreviewClose={handlePreviewClose}
							runtime={runtime}
							barCharts={barCharts}
							layers={layers}
							tables={tables}
							map={map}
							setMap={setMap}
						/>);
					}
					else if (resultType === "bldgFunc") {
						return (<BldgFunctionality
							title="Building Functionality with Interdependency"
							previewOn={previewOn}
							handlePreviewClose={handlePreviewClose}
							runtime={runtime}
							barCharts={barCharts}
							layers={layers}
							tables={tables}
							map={map}
							setMap={setMap}
						/>);
					}
					else if (resultType === "cge") {
						return (
							<CGE title="CGE Results"
								previewOn={previewOn}
								handlePreviewClose={handlePreviewClose}
								tables={tables}/>);
					}
					else if (resultType === "popdisl") {
						return (<PopDislocation
							title="Population Dislocation Results"
							previewOn={previewOn}
							handlePreviewClose={handlePreviewClose}
							layers={layers}
							map={map}
							setMap={setMap}
						/>);
					}
				})()
			}
		</div>);
}

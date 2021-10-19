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
	const [resultType, setResultType] = useState(""); // bldgFunc, bldgDmg, epfDmg, bldgMCS, interD
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
		setResultType("");
		setMap();
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
				// "layerStyles": "incore:joplin-bldg-func",
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
				"layerId": bldgMaxDamageStateINCOREId,
				"layerStyles": "incore:building",
				"title": "Building Inventory",
				"opacity": 1
			},
			{
				"layerId": popDislINCOREId,
				"layerStyles": "incore:heatmap",
				"title": "Population Dislocation Heatmap",
				"opacity": 0.8
			},
			{
				"layerId": hazardDatasetId,
				"layerStyles": "incore:tornado",
				"title": "Tornado",
				"opacity": 0.3
			},
		];
		handleLayerUpdate(layerDef);

		// TODO uncomment those to work with datawolf output
		// // // total dislocation
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
		// setTables(
		// 	{
		// 		"totalResultsTable": totalDislTableIdContent,
		// 		"huaResultsTable":{
		// 			"income": dislocationByIncomeContent,
		// 			"race": dislocationByRaceContent,
		// 			"tenure": dislocationByTenureContent,
		// 			"housingType": dislocationByHousingTypeIdContent
		// 		}}
		// );

		setTables(
			{
				"totalResultsTable": {
					"household_dislocation_in_total":{
						"dislocated":{
							"households":4990,
							"%_of_households":19.14371211539937
						},
						"not_dislocated":{
							"households":21076,
							"%_of_households":80.85628788460063
						},
						"total":{
							"households":26066,
							"%_of_households":100
						}
					},
					"population_dislocation_in_total":{
						"dislocated":{
							"population":10726,
							"%_of_population":19.115681417190924
						},
						"not_dislocated":{
							"population":45385,
							"%_of_population":80.88431858280907
						},
						"total":{
							"population":56111,
							"%_of_population":100
						}
					}
				},
				"huaResultsTable":{
					"income": [
						{
							"household_characteristics":"HH1 (less than $15,000)",
							"household_dislocated":647,
							"total_households":3552,
							"%_household_dislocated":18.21509009009009,
							"population_dislocated":1197,
							"total_population":5884,
							"%_population_dislocated":20.343303874915023
						},
						{
							"household_characteristics":"HH2 ($15,000 to $35,000)",
							"household_dislocated":631,
							"total_households":3391,
							"%_household_dislocated":18.608080212326747,
							"population_dislocated":1191,
							"total_population":6341,
							"%_population_dislocated":18.782526415391896
						},
						{
							"household_characteristics":"HH3 ($35,000 to $70,000)",
							"household_dislocated":2127,
							"total_households":10461,
							"%_household_dislocated":20.332664181244624,
							"population_dislocated":4960,
							"total_population":25368,
							"%_population_dislocated":19.552191737622202
						},
						{
							"household_characteristics":"HH4 ($70,000 to $120,000)",
							"household_dislocated":292,
							"total_households":1796,
							"%_household_dislocated":16.258351893095767,
							"population_dislocated":820,
							"total_population":5092,
							"%_population_dislocated":16.10369206598586
						},
						{
							"household_characteristics":"HH5 (More than $120,000)",
							"household_dislocated":323,
							"total_households":2248,
							"%_household_dislocated":14.36832740213523,
							"population_dislocated":876,
							"total_population":6416,
							"%_population_dislocated":13.653366583541146
						},
						{
							"household_characteristics":"Unknown",
							"household_dislocated":970,
							"total_households":4618,
							"%_household_dislocated":21.004763967085317,
							"population_dislocated":1682,
							"total_population":7010,
							"%_population_dislocated":23.99429386590585
						},
						{
							"household_characteristics":"Total",
							"household_dislocated":4990,
							"total_households":26066,
							"%_household_dislocated":19.14371211539937,
							"population_dislocated":10726,
							"total_population":56111,
							"%_population_dislocated":19.115681417190924
						}
					],
					"race": [
						{
							"household_characteristics":"Not Hispanic/White",
							"household_dislocated":4127,
							"total_households":20889,
							"%_household_dislocated":19.75680980420317,
							"population_dislocated":9238,
							"total_population":47637,
							"%_population_dislocated":19.392489031635073
						},
						{
							"household_characteristics":"Not Hispanic/Black",
							"household_dislocated":96,
							"total_households":638,
							"%_household_dislocated":15.047021943573668,
							"population_dislocated":258,
							"total_population":1540,
							"%_population_dislocated":16.753246753246753
						},
						{
							"household_characteristics":"Not Hispanic/Other Race",
							"household_dislocated":216,
							"total_households":1224,
							"%_household_dislocated":17.647058823529413,
							"population_dislocated":524,
							"total_population":2986,
							"%_population_dislocated":17.54855994641661
						},
						{
							"household_characteristics":"Hispanic",
							"household_dislocated":113,
							"total_households":605,
							"%_household_dislocated":18.677685950413224,
							"population_dislocated":368,
							"total_population":1916,
							"%_population_dislocated":19.206680584551147
						},
						{
							"household_characteristics":"No Race or Ethnicity Data",
							"household_dislocated":6,
							"total_households":29,
							"%_household_dislocated":20.689655172413794,
							"population_dislocated":338,
							"total_population":2032,
							"%_population_dislocated":16.633858267716537
						},
						{
							"household_characteristics":"Total",
							"household_dislocated":4558,
							"total_households":23385,
							"%_household_dislocated":19.491126790677786,
							"population_dislocated":10726,
							"total_population":56111,
							"%_population_dislocated":19.115681417190924
						}
					],
					"tenure": [
						{
							"household_characteristics":"Owner occupied",
							"household_dislocated":2464,
							"total_households":13065,
							"%_household_dislocated":18.859548411787216,
							"population_dislocated":5767,
							"total_population":31111,
							"%_population_dislocated":18.536851917328274
						},
						{
							"household_characteristics":"Renter occupied",
							"household_dislocated":2088,
							"total_households":10291,
							"%_household_dislocated":20.289573413662424,
							"population_dislocated":4621,
							"total_population":22968,
							"%_population_dislocated":20.119296412399862
						},
						{
							"household_characteristics":"Nursing facilities",
							"household_dislocated":5,
							"total_households":10,
							"%_household_dislocated":50.0,
							"population_dislocated":329,
							"total_population":688,
							"%_population_dislocated":47.81976744186046
						},
						{
							"household_characteristics":"Other group quarters",
							"household_dislocated":1,
							"total_households":19,
							"%_household_dislocated":5.263157894736842,
							"population_dislocated":9,
							"total_population":1344,
							"%_population_dislocated":0.6696428571428571
						},
						{
							"household_characteristics":"Vacant for rent",
							"household_dislocated":174,
							"total_households":1084,
							"%_household_dislocated":16.051660516605164,
							"population_dislocated":0,
							"total_population":0,
							"%_population_dislocated":null
						},
						{
							"household_characteristics":"Vacant for sale",
							"household_dislocated":113,
							"total_households":608,
							"%_household_dislocated":18.585526315789476,
							"population_dislocated":0,
							"total_population":0,
							"%_population_dislocated":null
						},
						{
							"household_characteristics":"Vacant other",
							"household_dislocated":145,
							"total_households":989,
							"%_household_dislocated":14.661274014155712,
							"population_dislocated":0,
							"total_population":0,
							"%_population_dislocated":null
						},
						{
							"household_characteristics":"Total",
							"household_dislocated":4990,
							"total_households":26066,
							"%_household_dislocated":19.14371211539937,
							"population_dislocated":10726,
							"total_population":56111,
							"%_population_dislocated":19.115681417190924
						}
					],
					"housingType": [
						{
							"household_characteristics":"Single Family",
							"household_dislocated":2108,
							"total_households":9359,
							"%_household_dislocated":22.523773907468748,
							"population_dislocated":4735,
							"total_population":21720,
							"%_population_dislocated":21.800184162062617
						},
						{
							"household_characteristics":"Multi Family",
							"household_dislocated":2882,
							"total_households":16707,
							"%_household_dislocated":17.250254384389777,
							"population_dislocated":5991,
							"total_population":34391,
							"%_population_dislocated":17.420255299351574
						},
						{
							"household_characteristics":"Total",
							"household_dislocated":4990,
							"total_households":26066,
							"%_household_dislocated":19.14371211539937,
							"population_dislocated":10726,
							"total_population":56111,
							"%_population_dislocated":19.115681417190924
						}
					]
				}}
		);
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
							tables={tables}
						/>);
					}
					else{
						return <></>
					}
				})()
			}
		</div>);
}

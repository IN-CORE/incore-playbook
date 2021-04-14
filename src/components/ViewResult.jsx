import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Container, Dialog, DialogContent, Divider, Grid, IconButton, Typography} from "@material-ui/core";
import SyncIcon from "@material-ui/icons/Sync";
import FilterListIcon from "@material-ui/icons/FilterList";

import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";

import datawolfConfig from "../datawolf.config";

import {getOutputFileJson} from "../utils/datawolf";
import {getTornadoMetadata} from "../utils/hazard";

import Map from "./Map";
import {globals} from "../globals";
import {fromLonLat} from "ol/proj";
import GroupLayer from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM, {ATTRIBUTION as OSM_ATTRIBUTION} from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import config from "../app.config";
import {ResultTable} from "./ResultTable";

import CloseIcon from "@material-ui/icons/Close";
import {ResultSummaryTable} from "./ResultSummaryTable";
import {StackedResult} from "./StackedResult";
import {FunctionalityGraph} from "./FunctionalityGraph";
import {ViewFunctionalityResults} from "./ViewFunctionalityResults";
import {FunctionalityTable} from "./FunctionalityTable";

const useStyles = makeStyles({
	statTitle: {
		margin: "55px auto",
	},
	chartContainer: {},
	mapContainer: {
		height: "366px",
	},
	mapContainerFull: {
		height: "800px"
	},
	previewModal: {
		padding: "50px",
	},
	previewTitle: {
		height: "18px",
		color: "#69707F",
		fontSize: "15px",
		fontWeight: 500,
		letterSpacing: 0,
		lineHeight: "18px"
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
			})
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
	const [resultType, setResultType] = useState("bldgDmg"); // bldgFunc, bldgDmg, epfDmg, interD
	const [summaryTableFields, setSummaryTableFields] = useState({"by_cluster": [], "by_category": []});
	const [barChartFields, setBarChartFields] = useState([]);
	const [map, setMap] = useState();
	const [mode, setMode] = useState("list"); // list vs preview
	const [runtime, setRuntime] = useState("");

	// extract a sinle status from mutliple step status`
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

	// empty preview and close the model
	const handlePreviewClose = () => {
		setMode("list");
		setSummaryTableFields({"by_cluster": [], "by_category": []});
		setBarChartFields([]);
		setMap();
		setRuntime("");
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
				"opacity": 0.5
			}
		];
		handleLayerUpdate(layerDef);

		let bldgDmgSummaryTableId = executionItem["datasets"][datawolfConfig["datasets"]["bldgDmgSummaryTableId"]];
		let bldgDmgSummaryTable = await getOutputFileJson(bldgDmgSummaryTableId);
		let bldgDmgSummaryTableContent = JSON.parse(bldgDmgSummaryTable);

		// for summary table on the top
		setRuntime(executionItem["date"].slice(0, 10));

		// for table
		setSummaryTableFields(bldgDmgSummaryTableContent);

		// for chart
		setBarChartFields(bldgDmgSummaryTableContent["by_category"]);

		// set preview type
		setResultType("bldgDmg");

		// open preview
		setMode("preview");
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
				"opacity": 0.5
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
		setSummaryTableFields(bldgFuncSummaryTableContent);

		// for chart
		setBarChartFields(bldgFuncSummaryTableContent["by_category"]);

		// set preview type
		setResultType("bldgFunc");

		// open preview
		setMode("preview");
	};

	const previewEpfDmg = (executionItemId) => {
	// TODO placeholder
		console.log(executionItemId);
	};

	const previewInterd = () => {

		const layerDef = [
			{
				"layerId": "joplin-bldg-subs",
				"layerStyles": null,
				"title": "Interdependency Network",
				"opacity": 0.7
			},
			{
				"layerId": "606287dc01f93d1b9f22320e",
				"layerStyles": "incore:joplin-substations-label",
				"title": "EPF Substations",
				"opacity": 1
			}
		];
		handleLayerUpdate(layerDef);

		// disable other components of map
		setRuntime(null);
		setSummaryTableFields(null);
		setBarChartFields(null);

		// set preview type
		setResultType("interD");

		// open preview
		setMode("preview");
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
					<ViewFunctionalityResults fieldNames={fieldNames}
										  executions={executionEntries}
										  previewBldgDmg={previewBldgDmg}
										  previewEpfDmg={previewEpfDmg}
										  previewBldgFunc={previewBldgFunc}
										  previewInterd={previewInterd}
					/>
				</Box>
			</Box>

			{/*for individual analysis result preview*/}
			<Dialog open={mode === "preview"} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
				<DialogContent className={classes.previewModal}>
					<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
						<CloseIcon fontSize="small"/>
					</IconButton>
					<>
						{/*for chart*/}
						<Box className={classes.chartContainer}>
							<Grid container spacing={3} justify="center">
								{
									runtime ?
										(<>
											<Grid item>
												<Typography className={classes.previewTitle}>
														Analysis Result View</Typography>
												<ResultSummaryTable runtime={runtime}/>
											</Grid>
											<Divider orientation="vertical" flexItem/>
										</>
										):
										null
								}

								{/*barchart*/}
								{
									barChartFields?
										(
											<Grid item style={{minWidth: "804px"}}>
												<Typography className={classes.previewTitle}>
												Anticipated Performance - Building Clusters</Typography>
												<Box style={{marginTop: "38px"}}>
													{
														resultType === "bldgDmg" ?
															<StackedResult categorySummary={barChartFields}/>
															:
															<FunctionalityGraph categorySummary={barChartFields}/>
													}

												</Box>
											</Grid>
										)
										:
										null
								}

							</Grid>
							<Divider orientation="horizontal"/>
						</Box>

						{/*for map*/}
						<Container className={((runtime && barChartFields) || summaryTableFields) ?
							classes.mapContainer : classes.mapContainerFull}
							   disableGutters>
							<Map
								className="fillContainer"
								zoom={12}
								minZoom={5}
								maxZoom={15}
								extent={globals.JOPLIN_MAP_BOUNDS}
								center={fromLonLat(globals.JOPLIN_MAP_CENTER)}
								layers={Object.values(layers)}
								layerSwitcherOptions={{}}
								updateMap={(map) => { setMap(map); }}
							/>
						</Container>
						{/*for table*/}
						{
							summaryTableFields ?
								(<Box>
									{
										resultType === "bldgDmg" ?
											<ResultTable fields={summaryTableFields}/>
											:
											<FunctionalityTable funcResults={summaryTableFields}/>
									}
								</Box>)
								:
								null
						}
					</>
				</DialogContent>
			</Dialog>
		</div>);
}

import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Container, IconButton, Dialog, DialogContent, Divider, Grid, Typography} from "@material-ui/core";
import SyncIcon from "@material-ui/icons/Sync";
import FilterListIcon from "@material-ui/icons/FilterList";

import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";

import {EntryTable} from "./EntryTable";

import datawolfConfig from "../datawolf.config";

import { getOutputFileJson } from "../utils/datawolf";
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
import {StackedResult} from "./StackedResult";

import CloseIcon from "@material-ui/icons/Close";
import {ResultSummaryTable} from "./resultSummaryTable";

const useStyles = makeStyles({
	statTitle:{
		margin: "55px auto",
	},
	chartContainer:{
	},
	mapContainer: {
		height: "366px",
	},
	previewModal:{
		padding: "50px",
	},
	previewTitle:{
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
	useEffect(() =>{ getExecutionList(); }, []);

	// update execution statuses upon changing
	useEffect(() => {
		createAnalysisEntryTable();
	}, [executions]);

	// states
	const [numCompleted, setNumCompleted] = useState(0);
	const [executionEntries, setExecutionEntries] = useState([]);
	const [summaryTableFields, setSummaryTableFields] = useState({"by_cluster":[], "by_category":[]});
	const [barChartFields, setBarChartFields] = useState([]);
	const [map, setMap] = useState();
	const [mode, setMode] = useState("list"); // list vs preview
	const [runtime, setRuntime] = useState("");

	// extract a sinle status from mutliple step status`
	const extractStatus = (executionItem) => {
		if (executionItem !== undefined && executionItem["stepState"] !== undefined){
			let statusArr = Object.values(executionItem["stepState"]);
			// WAITING, QUEUED, RUNNING, FINISHED, ABORTED, FAILED, UNKNOWN
			if (statusArr.indexOf("WAITING") >=0) return "WAITING";
			else if (statusArr.indexOf("QUEUED") >=0) return "QUEUED";
			else if (statusArr.indexOf("RUNNING") >=0) return "RUNNING";
			else if (statusArr.indexOf("ABORTED") >=0) return "ABORTED";
			else if (statusArr.indexOf("FAILED") >=0) return "FAILED";
			else if (statusArr.indexOf("UNKNOWN") >=0) return "UNKNOWN";
			else if (statusArr.indexOf("FINISHED") >=0) return "FINISHED";
		}
		return "UNDEFINED";
	};

	// createAnalysisEntryTable
	const createAnalysisEntryTable = () => {
		let num = 0;
		let entries = [];
		executions.map((executionItem) => {
			// calculate the total completed executions
			if (extractStatus(executionItem) === "FINISHED"){
				num ++;
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

	// show preview
	const executionIdClick = async (executionItem) => {
		// file that has incore dataset ID in it that's what i need to generate the map
		let bldgMaxDamageStateId = executionItem["datasets"][datawolfConfig["bldgMaxDamageStateId"]];
		let bldgMaxDamageStateINCOREId = await getOutputFileJson(bldgMaxDamageStateId);
		handleLayerUpdate(bldgMaxDamageStateINCOREId);

		let summaryTableId = executionItem["datasets"][datawolfConfig["summaryTableId"]];
		let summaryTable = await getOutputFileJson(summaryTableId);
		let sumaryTableContent = JSON.parse(summaryTable);

		// for summary table on the top
		setRuntime(executionItem["date"].slice(0,10));

		// for table
		setSummaryTableFields(sumaryTableContent);

		// for chart
		setBarChartFields(sumaryTableContent["by_category"]);

		// open preview
		setMode("preview");
	};

	const fieldNames = [
		{
			"prettyName": "TITLE",
			"columnName" :"title",
			"handleClick": executionIdClick
		},
		{
			"prettyName": "DESCRIPTION",
			"columnName" :"description",
		},
		{
			"prettyName": "HAZARD TYPE",
			"columnName" :"hazardType",
		},
		{
			"prettyName": "RUN DATE",
			"columnName" :"date",
		},
		{
			"prettyName": "STATUS",
			"columnName" :"finalStatus",
		}
	];

	// for map
	const handleLayerUpdate = (layerId) => {
		const source = new TileWMS({
			url: `${config.geoServerWMS}`,
			params: {LAYERS: layerId, STYLES: "incore:bldg-dmg-summary"},
			ratio: 1,
			serverType: "geoserver"
		});
		let HazardMapLayer = new TileLayer({
			title: "Building Damage",
			source: source,
			zIndex: 1,
			opacity: 1
		});

		layers["tilelayer"] = new GroupLayer({
			title: "Damage",
			layers: [HazardMapLayer]
		});
	};

	// empty preview and close the model
	const handlePreviewClose = () =>{
		setMode("list");
		setSummaryTableFields({"by_cluster":[], "by_category":[]});
		setBarChartFields([]);
		setMap();
		setRuntime("");
	};

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
			 aria-labelledby={`simple-tab-${index}`}
			 {...other}
		>
			{/*for analysis list*/}
			<Container>
				<Box className={classes.statTitle}>
					<IncoreInputLabel>{`Completed Analysis (${numCompleted})`}</IncoreInputLabel>
					<Box style={{float:"right"}}>
						<IconButton aria-label="sync" onClick={getExecutionList} color="secondary"><SyncIcon/></IconButton>
						<IconButton aria-label="filter"><FilterListIcon/></IconButton>
					</Box>
				</Box>
				<Box>
					<EntryTable fieldNames={fieldNames} fields={executionEntries}/>
				</Box>
			</Container>

			{/*for individual analysis result preview*/}
			<Dialog open={mode==="preview"} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
				<DialogContent className={classes.previewModal}>
					<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float:"right"}}>
						<CloseIcon fontSize="small"/>
					</IconButton>
					<>
						{/*for chart*/}
						<Box className={classes.chartContainer}>
							<Grid container spacing={3} justify="center">
								<Grid item>
									<Typography className={classes.previewTitle}>Analysis Result View</Typography>
									<ResultSummaryTable runtime={runtime}/>
								</Grid>
								<Divider orientation="vertical" flexItem />
								<Grid item style={{minWidth:"804px"}}>
									<Typography className={classes.previewTitle}>
										Anticipated Performance - Building Clusters</Typography>
									<Box style={{marginTop:"38px"}}>
										<StackedResult categorySummary={barChartFields}/>
									</Box>
								</Grid>
							</Grid>
							<Divider orientation="horizontal"/>
						</Box>

						{/*for map*/}
						<Container className={classes.mapContainer} disableGutters>
							<Map
								className="fillContainer"
								zoom={13}
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
						<Box>
							<ResultTable fields={summaryTableFields}/>
						</Box>
					</>
				</DialogContent>
			</Dialog>
		</div>);
}

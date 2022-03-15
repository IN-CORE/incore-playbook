import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Container, Grid, Tab, Tabs, makeStyles} from "@material-ui/core";
import GroupLayer from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM, {ATTRIBUTION as OSM_ATTRIBUTION} from "ol/source/OSM";
import Draw from "ol/interaction/Draw";
import LineString from "ol/geom/LineString";
import {Circle, Fill, Stroke, Style} from "ol/style";
import {fromLonLat} from "ol/proj";
import Feature from "ol/Feature";

import RasterTornado from "./childComponents/RasterTornado";
import ModelTornado from "./childComponents/ModelTornado";
import Map from "./childComponents/map/Map";
import config from "../app.config";
import {globals} from "../globals";
import Layout from "../containers/Layout";
import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";
import {IncoreMenuItem, IncoreSelectBox} from "./styledComponents/IncoreSelect";

// import FilterListIcon from "@material-ui/icons/FilterList";

import {EntryTable} from "./childComponents/table/EntryTable";
import PageBanner from "./childComponents/navigation/Banner";
import fullHtml from "../public/steps/3-3.html";
import StepInfo from "./StepInfo";
import {fetchTornadoes} from "../actions/hazards";

const useStyles = makeStyles({
	tabDiv: {
		margin: "48px 0 0 0",
		width: "100%",
	},
	tabs: {
		height: "21px",
		width: "100%"
	},
	tab: {
		height: "17px",
		color: "#69707F",
		fontSize: "14px",
		fontWeight: 500,
		letterSpacing: 0,
		lineHeight: "17px",
		textTransform: "None"
	},
	mapContainer: {
		height: "700px",
	}
});

export const CommunityHazards = () => {
	const classes = useStyles();

	const [currTabIndex, setCurrTabIndex] = useState(0);
	const [startCoord, setStartCoord] = useState([]);
	const [endCoord, setEndCoord] = useState([]);
	const [constructorHasRun, setConstructorHasRun] = useState(false);

	const dispatch = useDispatch();
	const listTornadoes = (limit, offset) => dispatch(fetchTornadoes(limit, offset));
	const tornadoes = useSelector((state) => state.tornado.tornadoes);

	// mimic constructor
	const constructor = () => {
		if (constructorHasRun) return;

		this.drawSource = new VectorSource({wrapX: false});
		this.lineSource = new VectorSource({wrapX: false});

		this.lineStyle = new Style({
			stroke: new Stroke({
				color: "#979797",
				width: 3,
				lineDash: [.1, 5] //or other combinations
			})
		});

		this.startStyle = new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: "#96B712"
				})
			})
		});

		this.endStyle = new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: "#D63649"
				})
			})
		});


		this.layers = {
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
			drawlayer: new GroupLayer({
				title: "Draw Layer",
				layers: [
					new VectorLayer({source: this.drawSource}),
					new VectorLayer({source: this.lineSource, style: [this.lineStyle]})
				]
			}),
			tilelayer: new GroupLayer({
				title: "Hazards",
				layers: []
			})
		};

		this.fieldNames = [
			{
				"prettyName": "NAME",
				"columnName": "name",
				"handleClick": hazardIdClick
			},
			{
				"prettyName": "DESCRIPTION",
				"columnName": "description"
			},
			{
				"prettyName": "DATE ADDED",
				"columnName": "date",
			},
			{
				"prettyName": "SUBMITTED BY",
				"columnName": "creator",
			}
		];

		setConstructorHasRun(true);
	};
	constructor();

	// component did mount
	useEffect(()=> {listTornadoes();}, []);

	// draw the line
	useEffect(() => {
		if (startCoord.length > 0 && endCoord.length === 0) {
			drawLine();
		}}, [endCoord]);

	map;

	const handleLayerUpdate = (json) => {

		let layerId = json["datasetId"];
		let layerTitle = json["name"];

		const source = new TileWMS({
			url: `${config.geoServerWMS}`,
			params: {LAYERS: layerId, STYLES: "incore:tornado"},
			ratio: 1,
			serverType: "geoserver"
		});
		let HazardMapLayer = new TileLayer({
			title: layerTitle,
			source: source,
			zIndex: 1,
			opacity: 1
		});

		// add created hazard to this created group layer
		this.layers["tilelayer"].getLayers().push(HazardMapLayer);
	};

	const hazardIdClick = async (hazard) => {
		handleLayerUpdate(hazard);
	};

	const drawLine = () => {
		let lineString = new LineString([startCoord, endCoord]);
		let lineFeature = new Feature({
			geometry: lineString,
			name: "Line"
		});
		this.lineSource.addFeature(lineFeature);
	};

	const handleMapClick = (event) => {
		// Important: need to clear previous draw interaction first
		let map = event.map;
		map.getInteractions().forEach((interaction) => {
			if (interaction instanceof Draw) {
				map.removeInteraction(interaction);
			}
		});

		let drawPointInteraction = new Draw({
			source: this.drawSource,
			type: "Point",
		});
		drawPointInteraction.on("drawend", (event) => {
			let coords = event.feature.getGeometry().getFlatCoordinates();

			if (startCoord.length === 0 && endCoord.length === 0) {
				// draw start
				event.feature.setStyle(this.startStyle);
				setStartCoord(coords);
			} else if (startCoord.length > 0 && endCoord.length === 0) {
				// draw endpoint
				event.feature.setStyle(this.endStyle);
				setEndCoord(coords);
			} else if (startCoord.length > 0 && endCoord.length > 0) {
				// restart
				this.drawSource.clear();
				this.lineSource.clear();
				event.feature.setStyle(this.startStyle);
				setStartCoord(coords);
				setEndCoord([]);
			}
		});

		map.addInteraction(drawPointInteraction);
	};

	return (
		<Layout>
			<div className="firstDivInContent">
				<PageBanner parentStep="Determine Goals & Objectives"
					childStep="Define Community Hazards" taskNo="3" subtaskNo="3-3"/>
				<Box className="outerBox">
					{/*List created tornadoes*/}
					<Box className="entryTableContainer">
						<StepInfo fullHtml={fullHtml} />
						<br />
						<Box className="entryTableTitle">
							<IncoreInputLabel>Created Hazard</IncoreInputLabel>
							{/*<Box style={{float:"right"}}>*/}
							{/*	<IconButton>*/}
							{/*		<FilterListIcon/>*/}
							{/*	</IconButton>*/}
							{/*</Box>*/}
						</Box>
						<Box className="entryTable">
							<EntryTable fieldNames={this.fieldNames} fields={tornadoes}/>
						</Box>
					</Box>
					<Grid container spacing={3} className="innerBox">
						<Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="gridItem">
							{/*Select*/}
							<Box>
								<IncoreInputLabel>Select Hazard Type</IncoreInputLabel>
								<IncoreSelectBox labelId="label" id="select" variant="outlined"
												 defaultValue="tornado">
									<IncoreMenuItem value="earthquake" key="earthquake">Earthquake</IncoreMenuItem>
									<IncoreMenuItem value="tsunami" key="tsunami">Tsunami</IncoreMenuItem>
									<IncoreMenuItem value="tornado" key="tornado">Tornado</IncoreMenuItem>
									<IncoreMenuItem value="hurricane" key="hurricane">Hurricane</IncoreMenuItem>
									<IncoreMenuItem value="flood" key="flood">Flood</IncoreMenuItem>
								</IncoreSelectBox>
							</Box>
							{/*Tabs*/}
							<Box className={classes.tabDiv}>
								<Tabs aria-label="create tornado tabs" value={currTabIndex}
									  className={classes.tabs}
									  onChange={(e, value) => {setCurrTabIndex(value);}}>
									<Tab label="Create a Hazard" className={classes.tab}/>
									<Tab label="Upload a Hazard Dataset" className={classes.tab}/>
								</Tabs>
								<ModelTornado value={currTabIndex} index={0}
											  handleLayerUpdate={this.handleLayerUpdate}
											  handleListUpdate={listTornadoes}
											  startCoordProps={startCoord}
											  endCoordProps={endCoord}/>
								<RasterTornado value={currTabIndex} index={1}
											   handleLayerUpdate={this.handleLayerUpdate}
											   handleListUpdate={listTornadoes}/>
							</Box>
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="gridItem">
							<Container className={classes.mapContainer} disableGutters>
								<Map
									className="fillContainer"
									zoom={10}
									minZoom={5}
									maxZoom={15}
									extent={globals.JOPLIN_MAP_BOUNDS}
									center={fromLonLat(globals.JOPLIN_MAP_CENTER)}
									layers={Object.values(this.layers)}
									layerSwitcherOptions={{}}
									updateMap={(map) => { this.map = map; }}
									events={{
										"click": handleMapClick
									}}
								/>
							</Container>
						</Grid>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
}

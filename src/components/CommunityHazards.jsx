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
import Point from "ol/geom/Point";
import {Circle, Fill, Stroke, Style} from "ol/style";
import {fromLonLat} from "ol/proj";
import Feature from "ol/Feature";

import RasterTornado from "./childComponents/tornado/RasterTornado";
import ModelTornado from "./childComponents/tornado/ModelTornado";
import Map from "./childComponents/map/Map";
import config from "../app.config";
import {globals} from "../globals";
import {Layout} from "./Layout";
import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";
import {IncoreMenuItem, IncoreSelectBox} from "./styledComponents/IncoreSelect";

// import FilterListIcon from "@material-ui/icons/FilterList";

import {EntryTable} from "./childComponents/table/EntryTable";
import PageBanner from "./childComponents/navigation/Banner";
import fullHtml from "../public/steps/3-3.html";
import StepInfo from "./StepInfo";
import {fetchHazards} from "../actions/hazards";
import DatasetHurricane from "./childComponents/hurricane/datasetHurricane";
import DatasetEarthquake from "./childComponents/earthquake/datasetEarthquake";
import DatasetFlood from "./childComponents/flood/datasetFlood";

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

	const [selectedHazardType, setSelectedHazardType] = useState("earthquakes");
	const [currTabIndex, setCurrTabIndex] = useState(0);
	const [startCoord, setStartCoord] = useState([]);
	const [endCoord, setEndCoord] = useState([]);

	const dispatch = useDispatch();
	const listHazards = (hazardType, limit, offset) => dispatch(fetchHazards(hazardType, limit, offset));
	const earthquakes = useSelector((state) => state.hazard.earthquakes);
	const tornadoes = useSelector((state) => state.hazard.tornadoes);
	const tsunamis = useSelector((state) => state.hazard.tsunamis);
	const floods = useSelector((state) => state.hazard.floods);
	const hurricanes = useSelector((state) => state.hazard.hurricanes);

	const drawSourceRef = React.useRef(new VectorSource({wrapX: false}));
	const pointSourceRef = React.useRef(new VectorSource({wrapX: false}));
	const lineStyleRef = React.useRef(new Style({
		stroke: new Stroke({
			color: "#979797",
			width: 3,
			lineDash: [.1, 5] //or other combinations
		})
	}));

	// Caches the control
	const cacheRef = React.useRef({
		startStyle: new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: "#96B712"
				})
			})
		}),
		endStyle: new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: "#D63649"
				})
			})
		}),
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
				new VectorLayer({
					source: drawSourceRef.current,
					style: [lineStyleRef.current]
				}),
				new VectorLayer({
					source: pointSourceRef.current
				})
			]
		}),
		tilelayer: new GroupLayer({
			title: "Hazards",
			layers: []
		})
	});

	// Holds an instance of Map component
	const mapRef = React.useRef();

	// component did mount
	useEffect(()=> {
		listHazards(selectedHazardType);}, []
	);

	useEffect(() => {
		listHazards(selectedHazardType);
	}, [selectedHazardType]);

	// draw the line
	useEffect(() => {
		drawPoints(startCoord, true);
	}, [startCoord]);

	useEffect(() => {
		drawPoints(endCoord, false);
	}, [endCoord]);

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
		cacheRef.current.tilelayer.getLayers().push(HazardMapLayer);
	};

	const hazardIdClick = async (hazard) => {
		handleLayerUpdate(hazard);
	};

	const drawPoints = (coord, isStart=true) => {
		let point = new Point(coord);
		let pointFeature = new Feature({
			geometry: point,
			name: "point",
		});
		isStart ? pointFeature.setStyle(cacheRef.current.startStyle)
			:
			pointFeature.setStyle(cacheRef.current.endStyle);
		pointSourceRef.current.addFeature(pointFeature);
	};

	const handleMapClick = (event) => {
		// Important: need to clear previous draw interaction first
		let map = event.map;

		/* Add your draw interaction here */
		let drawLineInteraction = new Draw({
			source: drawSourceRef.current,
			type: "LineString",
			stopClick: true,
			maxPoints: 2
		});

		drawLineInteraction.on("drawstart", () => {
			drawSourceRef.current.clear();
			pointSourceRef.current.clear();
		});
		drawLineInteraction.on("drawend", (event) => {
			// drawSourceRef.current.clear();
			const geometry = event.feature.getGeometry();
			setStartCoord(geometry.getFirstCoordinate());
			setEndCoord(geometry.getLastCoordinate());
		});

		// Start the draw interaction...
		map.addInteraction(drawLineInteraction);

	};

	const fieldNames = [
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

	return (
		<Layout>
			<div className="firstDivInContent">
				<PageBanner parentStep="Determine Goals & Objectives"
					childStep="Define Community Hazards" taskNo="3" subtaskNo="3-3"/>
				<Box className="outerBox">
					{/*List created hazards*/}
					<Box className="entryTableContainer">
						<StepInfo fullHtml={fullHtml} />
						<br />
						<Box className="entryTableTitle">
							<IncoreInputLabel>
								Created {selectedHazardType.charAt(0).toUpperCase()}{selectedHazardType.slice(1)}
							</IncoreInputLabel>
						</Box>
						{
							(() => {
								if (selectedHazardType === "earthquakes"){
									return (
										<Box className="entryTable">
											<EntryTable fieldNames={fieldNames} fields={earthquakes}/>
										</Box>);
								}
								else if (selectedHazardType === "tsunamis"){
									return (
										<Box className="entryTable">
											<EntryTable fieldNames={fieldNames} fields={tsunamis}/>
										</Box>);
								}
								else if (selectedHazardType === "tornadoes"){
									return (
										<Box className="entryTable">
											<EntryTable fieldNames={fieldNames} fields={tornadoes}/>
										</Box>);
								}
								else if (selectedHazardType === "floods"){
									return (
										<Box className="entryTable">
											<EntryTable fieldNames={fieldNames} fields={floods}/>
										</Box>);
								}
								else if (selectedHazardType === "hurricanes"){
									return (
										<Box className="entryTable">
											<EntryTable fieldNames={fieldNames} fields={hurricanes}/>
										</Box>);
								}
							})()
						}

					</Box>
					<Grid container spacing={3} className="innerBox">
						<Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="gridItem">
							{/*Select*/}
							<Box>
								<IncoreInputLabel>Select Hazard Type</IncoreInputLabel>
								<IncoreSelectBox labelId="label" id="select" variant="outlined"
												 defaultValue="earthquakes"
												 onChange={(e) => { setSelectedHazardType(e.target.value);}}>
									<IncoreMenuItem value="earthquakes" key="earthquakes">Earthquake</IncoreMenuItem>
									<IncoreMenuItem value="tsunamis" key="tsunamis">Tsunami</IncoreMenuItem>
									<IncoreMenuItem value="tornadoes" key="tornadoes">Tornado</IncoreMenuItem>
									<IncoreMenuItem value="hurricanes" key="hurricanes">Hurricane</IncoreMenuItem>
									<IncoreMenuItem value="floods" key="floods">Flood</IncoreMenuItem>
								</IncoreSelectBox>
							</Box>
							{/*Tabs*/}
							<Box className={classes.tabDiv}>
								<Tabs aria-label="create tornado tabs" value={currTabIndex}
									  className={classes.tabs}
									  onChange={(e, value) => {setCurrTabIndex(value);}}>
									{/*only certain hazard type has model based creation*/}
									<Tab label="Upload a Hazard Dataset" className={classes.tab}/>
									{selectedHazardType === "tornadoes" || selectedHazardType === "tsunamis"
									|| selectedHazardType === "earthquakes"?
										<Tab label="Create a Hazard" className={classes.tab}/> :
										<></>
									}
								</Tabs>
								{
									// different hazard type will have different UI
									(() => {
										if (selectedHazardType === "earthquakes") {
											return (<>
												<DatasetEarthquake value={currTabIndex} index={0}
															   handleLayerUpdate={handleLayerUpdate}
															   handleListUpdate={listHazards}/>
												{/*<ModelTornado value={currTabIndex} index={1}*/}
												{/*			  handleLayerUpdate={handleLayerUpdate}*/}
												{/*			  handleListUpdate={listHazards}*/}
												{/*			  startCoordProps={startCoord}*/}
												{/*			  endCoordProps={endCoord}/>*/}
											</>);
										}
										else if (selectedHazardType === "tornadoes") {
											return (<>
												<RasterTornado value={currTabIndex} index={0}
															   handleLayerUpdate={handleLayerUpdate}
															   handleListUpdate={listHazards}/>
												<ModelTornado value={currTabIndex} index={1}
															  handleLayerUpdate={handleLayerUpdate}
															  handleListUpdate={listHazards}
															  startCoordProps={startCoord}
															  endCoordProps={endCoord}/>
											</>);
										}
										else if (selectedHazardType === "hurricanes"){
											return (<DatasetHurricane value={currTabIndex} index={0}
																	  handleLayerUpdate={handleLayerUpdate}
																	  handleListUpdate={listHazards}/>);
										}
										else if (selectedHazardType === "floods"){
											return (<DatasetFlood value={currTabIndex} index={0}
																	  handleLayerUpdate={handleLayerUpdate}
																	  handleListUpdate={listHazards}/>);
										}
										else{
											return (<></>);
										}
									})()
								}
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
									layers={[
										cacheRef.current.basemaps,
										cacheRef.current.drawlayer,
										cacheRef.current.tilelayer
									]}
									layerSwitcherOptions={{}}
									updateMap={(map) => {
										mapRef.current = map;
									}}
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
};

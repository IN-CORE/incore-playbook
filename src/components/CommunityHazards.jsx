import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, Tab, Tabs, makeStyles } from "@material-ui/core";
import GroupLayer from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from "ol/source/OSM";
import Draw from "ol/interaction/Draw";
import Point from "ol/geom/Point";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { fromLonLat, getTransform } from "ol/proj";
import Feature from "ol/Feature";
import { applyTransform } from "ol/extent";

import RasterTornado from "./childComponents/tornado/RasterTornado";
import ModelTornado from "./childComponents/tornado/ModelTornado";
import Map from "./childComponents/map/Map";
import { Layout } from "./Layout";
import { IncoreInputLabel } from "./styledComponents/IncoreInputLabel";
import { IncoreMenuItem, IncoreSelectBox } from "./styledComponents/IncoreSelect";
import { getHazardGroupLayers } from "../utils/map";

import Pagination from "./childComponents/navigation/Pagination";

import { EntryTable } from "./childComponents/table/EntryTable";
import PageBanner from "./childComponents/navigation/Banner";
import fullHtml from "../public/steps/3-3.html";
import StepInfo from "./StepInfo";
import { fetchHazards } from "../actions/hazards";
import DatasetHurricane from "./childComponents/hurricane/datasetHurricane";
import DatasetEarthquake from "./childComponents/earthquake/datasetEarthquake";
import ModelEarthquake from "./childComponents/earthquake/modelEarthquake";
import DatasetFlood from "./childComponents/flood/datasetFlood";
import DatasetTsunami from "./childComponents/tsuanmi/datasetTsunami";
import { LineString } from "ol/geom";
import { useEffectAllDepsChange } from "./customHooks/useEffectAllDeps";
import { getHazardTypePlural } from "../utils/common";


const useStyles = makeStyles({
	tabDiv: {
		margin: "48px 0 0 0",
		width: "100%"
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
		height: "700px"
	}
});

export const CommunityHazards = () => {
	const classes = useStyles();

	const [currTabIndex, setCurrTabIndex] = useState(0);
	// for drawing tornado path
	const [startCoord, setStartCoord] = useState([]);
	const [endCoord, setEndCoord] = useState([]);

	// for draw eq epicenter
	const [srcCoord, setSrcCoord] = useState([]);

	const dispatch = useDispatch();
	const listHazards = (globalConfig, hazardType, limit, offset) =>
		dispatch(fetchHazards(globalConfig, hazardType, limit, offset));
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const earthquakes = useSelector((state) => state.hazard.earthquakes);
	const tornadoes = useSelector((state) => state.hazard.tornadoes);
	const tsunamis = useSelector((state) => state.hazard.tsunamis);
	const floods = useSelector((state) => state.hazard.floods);
	const hurricanes = useSelector((state) => state.hazard.hurricanes);
	const mapConfig = useSelector((state) => state.config.mapConfig);
	const allowedHazardTypes = useSelector((state) => state.config.allowedHazardTypes);

	const [selectedHazardType, setSelectedHazardType] = useState(allowedHazardTypes[0]);

	const [dataPerPage, setDataPerPage] = React.useState(5);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [offset, setOffset] = React.useState(0);

	// Cache the drawing
	const drawSourceRef = React.useRef(new VectorSource({ wrapX: false }));
	const drawDisplaySourceRef = React.useRef(new VectorSource({ wrapX: false }));
	const drawInteractionRef = React.useRef();
	const styleRef = React.useRef({
		lineStyle: new Style({
			stroke: new Stroke({
				color: "#979797",
				width: 3,
				lineDash: [0.1, 5] //or other combinations
			})
		}),
		startPointStyle: new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: "#96B712"
				})
			})
		}),
		endPointStyle: new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: "#D63649"
				})
			})
		}),
		invisibleStyle: new Style({
			visibility: "hidden"
		})
	});

	// Caches the control
	const layerRef = React.useRef({
		basemaps: new GroupLayer({
			title: "Base Maps",
			layers: [
				new TileLayer({
					type: "base",
					visible: true,
					title: "Carto",
					source: new XYZ({
						url: "https://{a-d}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
						attributions: ['&#169; <a href="https://www.carto.com">Carto</a>,', OSM_ATTRIBUTION]
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
				// interaction layer
				new VectorLayer({
					style: styleRef.current.invisibleStyle,
					source: drawSourceRef.current
				}),
				// display layer
				new VectorLayer({
					source: drawDisplaySourceRef.current
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

	useEffect(() => {
		// Important: need to clear previous draw interaction first
		drawDisplaySourceRef.current.clear();
		mapRef.current.getInteractions().forEach((interaction) => {
			if (interaction instanceof Draw) {
				mapRef.current.removeInteraction(interaction);
			}
		});

		// construct different draw interactions
		if (selectedHazardType === "tornado" && currTabIndex === 1) {
			drawInteractionRef.current = new Draw({
				source: drawSourceRef.current,
				type: "LineString",
				stopClick: true,
				maxPoints: 2
			});
			drawInteractionRef.current.on("drawstart", () => {
				drawSourceRef.current.clear();
				drawDisplaySourceRef.current.clear();
			});
			drawInteractionRef.current.on("drawend", (event) => {
				const geometry = event.feature.getGeometry();
				setStartCoord(geometry.getFirstCoordinate());
				setEndCoord(geometry.getLastCoordinate());
				// delete default draw feature
				// drawSourceRef.current.removeFeature(event.feature);
			});
		} else if (selectedHazardType === "earthquake" && currTabIndex === 1) {
			drawInteractionRef.current = new Draw({
				source: drawSourceRef.current,
				type: "Point"
			});
			drawInteractionRef.current.on("drawstart", () => {
				drawSourceRef.current.clear();
				drawDisplaySourceRef.current.clear();
			});
			drawInteractionRef.current.on("drawend", (event) => {
				const geometry = event.feature.getGeometry();
				setSrcCoord(geometry.getFlatCoordinates());
				// delete default draw feature
				// drawSourceRef.current.removeFeature(event.feature);
			});
		} else {
			drawInteractionRef.current = null;
		}

		// Start the draw interaction...
		if (drawInteractionRef.current !== null) {
			mapRef.current.addInteraction(drawInteractionRef.current);
		}
	}, [selectedHazardType, currTabIndex]);

	// display the line
	useEffectAllDepsChange(() => {
		if (startCoord.length > 0 && endCoord.length > 0) {
			syntheticDrawPoints(startCoord, true);
			syntheticDrawPoints(endCoord, false);
			syntheticDrawLine(startCoord, endCoord);
		}
	}, [startCoord, endCoord]); // this is triggered by any of it changes

	// display the dot
	useEffect(() => {
		if (srcCoord.length > 0) syntheticDrawPoints(srcCoord, false);
	}, [srcCoord]);

	const handleLayerUpdate = (json) => {
		const HazardMapGroupLayers = getHazardGroupLayers(globalConfig, json, selectedHazardType);
		// add created hazard to this created group layer
		layerRef.current.tilelayer.getLayers().push(HazardMapGroupLayers);
	};

	const hazardIdClick = async (hazard) => {
		handleLayerUpdate(hazard);
	};

	const syntheticDrawPoints = (coord, isStart = true) => {
		let point = new Point(coord);
		let pointFeature = new Feature({
			geometry: point,
			name: "point"
		});
		isStart
			? pointFeature.setStyle(styleRef.current.startPointStyle)
			: pointFeature.setStyle(styleRef.current.endPointStyle);
		drawDisplaySourceRef.current.addFeature(pointFeature);
	};

	const syntheticDrawLine = (start, end) => {
		let lineString = new LineString([start, end]);
		let lineFeature = new Feature({
			geometry: lineString,
			name: "Line"
		});
		lineFeature.setStyle(styleRef.current.lineStyle);
		drawDisplaySourceRef.current.addFeature(lineFeature);
	};

	const fieldNames = [
		{
			prettyName: "NAME",
			columnName: "name",
			handleClick: hazardIdClick
		},
		{
			prettyName: "DESCRIPTION",
			columnName: "description"
		},
		{
			prettyName: "DATE ADDED",
			columnName: "date"
		},
		{
			prettyName: "SUBMITTED BY",
			columnName: "creator"
		}
	];

	const pageChange = (direction) => {
		if (direction === "previous") {
			setOffset((pageNumber - 2) * dataPerPage);
			setPageNumber(pageNumber - 1);
		} else if (direction === "next") {
			setOffset(pageNumber * dataPerPage);
			setPageNumber(pageNumber + 1);
		}
	};

	// change hazard type
	useEffect(() => {
		setOffset(0);
		setPageNumber(1);
		// start from page 1 again
		listHazards(globalConfig, selectedHazardType, dataPerPage, offset);
	}, [selectedHazardType]);

	// page changes
	useEffect(() => {
		listHazards(globalConfig, selectedHazardType, dataPerPage, offset);
	}, [offset, pageNumber]);

	return (
		<Layout>
			<div className="firstDivInContent">
				<PageBanner
					parentStep="Determine Goals & Objectives"
					childStep="Define Community Hazards"
					taskNo="3"
					subtaskNo="3-3"
				/>
				<Box className="outerBox">
					{/*List created hazards*/}
					<Box className="entryTableContainer">
						<StepInfo fullHtml={fullHtml} />
						<br />
						<Box className="entryTableTitle">
							<IncoreInputLabel>
								Created {selectedHazardType.charAt(0).toUpperCase()}
								{selectedHazardType.slice(1)}
							</IncoreInputLabel>
						</Box>
						{(() => {
							// selectedHazardType: are earthquake, flood, hurricane, tsunami, tornado
							if (selectedHazardType !== "") {
								return (
									<Box className="entryTable">
										<EntryTable
											fieldNames={fieldNames}
											fields={eval(getHazardTypePlural(selectedHazardType))}
										/>
										<Pagination
											pageNumber={pageNumber}
											data={eval(getHazardTypePlural(selectedHazardType))}
											dataPerPage={dataPerPage}
											previous={() => pageChange("previous")}
											next={() => pageChange("next")}
										/>
									</Box>
								);
							}
						})()}
					</Box>
					<Grid container spacing={3} className="innerBox">
						<Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="gridItem">
							{/*Select*/}
							<Box>
								<IncoreInputLabel>Select Hazard Type</IncoreInputLabel>
								<IncoreSelectBox
									labelId="label"
									id="select"
									variant="outlined"
									defaultValue={allowedHazardTypes[0]}
									onChange={(e) => {
										setSelectedHazardType(e.target.value);
									}}
								>
									{allowedHazardTypes.map((hazardType) => {
										return (
											<IncoreMenuItem value={hazardType} key={hazardType}>
												{hazardType}
											</IncoreMenuItem>
										);
									})}
								</IncoreSelectBox>
							</Box>
							{/*Tabs*/}
							<Box className={classes.tabDiv}>
								<Tabs
									aria-label="create tornado tabs"
									value={currTabIndex}
									className={classes.tabs}
									onChange={(e, value) => {
										setCurrTabIndex(value);
									}}
								>
									{/*only certain hazard type has model based creation*/}
									<Tab label="Upload a Hazard Dataset" className={classes.tab} />
									{selectedHazardType === "tornado" || selectedHazardType === "earthquake" ? (
										<Tab label="Create a Hazard" className={classes.tab} />
									) : null}
								</Tabs>
								{
									// different hazard type will have different UI
									(() => {
										if (selectedHazardType === "earthquake") {
											return (
												<>
													<DatasetEarthquake
														value={currTabIndex}
														index={0}
														handleLayerUpdate={handleLayerUpdate}
														handleListUpdate={listHazards}
													/>
													<ModelEarthquake
														value={currTabIndex}
														index={1}
														handleLayerUpdate={handleLayerUpdate}
														handleListUpdate={listHazards}
														srcCoordProps={srcCoord}
													/>
												</>
											);
										} else if (selectedHazardType === "tornado") {
											return (
												<>
													<RasterTornado
														value={currTabIndex}
														index={0}
														handleLayerUpdate={handleLayerUpdate}
														handleListUpdate={listHazards}
													/>
													<ModelTornado
														value={currTabIndex}
														index={1}
														handleLayerUpdate={handleLayerUpdate}
														handleListUpdate={listHazards}
														startCoordProps={startCoord}
														endCoordProps={endCoord}
													/>
												</>
											);
										} else if (selectedHazardType === "hurricane") {
											return (
												<DatasetHurricane
													value={currTabIndex}
													index={0}
													handleLayerUpdate={handleLayerUpdate}
													handleListUpdate={listHazards}
												/>
											);
										} else if (selectedHazardType === "flood") {
											return (
												<DatasetFlood
													value={currTabIndex}
													index={0}
													handleLayerUpdate={handleLayerUpdate}
													handleListUpdate={listHazards}
												/>
											);
										} else if (selectedHazardType === "tsunami") {
											return (
												<DatasetTsunami
													value={currTabIndex}
													index={0}
													handleLayerUpdate={handleLayerUpdate}
													handleListUpdate={listHazards}
												/>
											);
										} else {
											return <></>;
										}
									})()
								}
							</Box>
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="gridItem">
							<Container className={classes.mapContainer} disableGutters>
								<Map
									className="fillContainer"
									zoom={mapConfig.ZOOM}
									minZoom={mapConfig.MIN_ZOOM}
									maxZoom={mapConfig.MAX_ZOOM}
									extent={applyTransform(
										mapConfig.MAP_BOUNDS,
										getTransform("EPSG:4326", "EPSG:3857")
									)}
									center={fromLonLat(mapConfig.MAP_CENTER)}
									layers={[
										layerRef.current.basemaps,
										layerRef.current.drawlayer,
										layerRef.current.tilelayer
									]}
									layerSwitcherOptions={{}}
									updateMap={(map) => {
										mapRef.current = map;
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

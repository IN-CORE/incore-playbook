import * as React from "react";
import { Map as OLMap, View } from "ol";
import Overlay from "ol/Overlay";
import LayerSwitcher from "./LayerSwitcher";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import LoadingOverlay from "react-loading-overlay";
import { makeStyles } from "@material-ui/core/styles";
import { fetchLegendsForLayers, maxStateMapping } from "../../../utils/common";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IncoreTitle } from "../../styledComponents/IncoreTitle";
import { IncoreFootNote } from "../../styledComponents/IncoreFootNote";
import { useSelector } from "react-redux";
import { Icon, Style } from "ol/style";
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Point from "ol/geom/Point";

export const MapContext = React.createContext({});

const useStyles = makeStyles({
	table: {
		backgroundColor: "#FFFFFF",
		width: "235px",
		maxHeight: "356px",
		overflowY: "auto",
	},
	tableHeaderRow: {
		//height: "34px"
	},
	tableHeaderCell: {
		//height: "14px",
		//width: "37px",
		color: "#FFFFFF",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1px",
		lineHeight: "14px",
		textAlign: "center",
		textTransform: "uppercase",
	},
	tableBodyRow: {
		//height: "28px"
	},
	tableBodyCell: {
		//height: "21px",
		//width: "123px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "18px",
		border: "1px solid rgba(46,91,255,0.08)",
	},
	tableContainer: {
		position: "absolute",
		width: "250px",
		maxHeight: "250px",
		top: "50px",
		left: "0px",
		zIndex: 10,
		padding: "5px",
		overflow: "scroll",
		scrollBehavior: "smooth",
		"&::WebkitScrollbar": {
			display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
		},
		"&MsOverflowStyle:": {
			display: "none", // Hide the scrollbar for IE
		},
		backgroundColor: "white",
	},
	legendDiv: {
		backgroundColor: "#ffffff",
		border: "1px solid #e0e0e0",
	},
	innerLegendDiv: {
		display: "flex",
		flexDirection: "row",
		padding: "10px",
		gap: "20px",
	},
	legendGroup: {
		minWidth: "200px",
		backgroundColor: "#ffffff",
		borderRadius: "4%",
		padding: "1em",
		boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
	},
	legendsContainer: {
		maxHeight: "200px",
		overflowY: "auto",
		marginTop: "10px",
	},
	groupTitle: {
		fontWeight: "bold",
		fontSize: "1.2em",
	},
	layer: {
		marginBottom: "10px",
	},
	layerName: {
		fontSize: "0.5 em",
	},
	legendImage: {
		maxWidth: "100%",
		height: "auto",
	},
});

const MapCompare = (props) => {
	const {
		children,
		className,
		height,
		allowBuildingSelection,
		fieldsA,
		fieldsB,
		activeLayerNames,
	} = props;
	const classes = useStyles();

	const [selectedBuildingA, setSelectedBuildingA] = React.useState(null);
	const [selectedBuildingB, setSelectedBuildingB] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const fallbackContainerA = React.useRef();
	const fallbackContainerB = React.useRef();

	const mapRefA = React.useRef();
	const mapRefB = React.useRef();

	const globalConfig = useSelector((state) => state.config.globalConfig);
	// State variable to store legends
	const [legends, setLegends] = React.useState([]);

	let markerStyle = new Style({
		image: new Icon({
			src: "public/map-pin.svg",
			scale: 0.3, // Adjust as necessary to fit your map's scale
			anchor: [0.5, 1.1],
			anchorXUnits: "fraction",
			anchorYUnits: "fraction",
		}),
	});

	let markerFeature = new Feature({
		id: "marker",
		visible: true,
	});

	let vectorSource = new VectorSource({
		features: [markerFeature],
	});

	let markerLayer = new VectorLayer({
		title: "Map Pin",
		source: vectorSource,
	});

	React.useEffect(() => {
		const {
			projection,
			center,
			zoom,
			minZoom,
			maxZoom,
			extent,
			layersA,
			layersB,
			layerSwitcherOptionsA,
			layerSwitcherOptionsB,
			updateMap,
			events,
		} = props;

		const view = new View({
			projection,
			center,
			zoom,
			minZoom,
			maxZoom,
			extent,
			showFullExtent: true,
			smoothExtentConstraint: true,
		});

		const mapA = new OLMap({
			target: fallbackContainerA.current,
			view: view,
			layers: layersA,
			overlays: [
				new Overlay({
					id: "popupA",
					className: "ol-popup",
					autoPan: true,
					autoPanAnimation: {
						duration: 250,
					},
				}),
			],
		});

		const mapB = new OLMap({
			target: fallbackContainerB.current,
			view: view,
			layers: layersB,
			overlays: [
				new Overlay({
					id: "popupB",
					className: "ol-popup",
					autoPan: true,
					autoPanAnimation: {
						duration: 250,
					},
				}),
			],
		});

		if (events) {
			Object.entries(events).forEach(([event, handler]) => {
				mapA.on(event, handler);
				mapB.on(event, handler);
			});
		}

		if (layerSwitcherOptionsA) {
			const layerSwitcher = new LayerSwitcher(layerSwitcherOptionsA);
			mapA.addControl(layerSwitcher);
		}

		if (layerSwitcherOptionsB) {
			const layerSwitcher = new LayerSwitcher(layerSwitcherOptionsB);
			mapB.addControl(layerSwitcher);
		}

		setupDamageLayerInteractions(
			mapA,
			mapB,
			layersA,
			layersB,
			allowBuildingSelection,
		);

		if (updateMap) {
			updateMap(mapA);
			updateMap(mapB);
		}

		mapRefA.current = mapA;
		mapRefB.current = mapB;

		// Fetch legends for layers
		setLegends(fetchLegendsForLayers(layersA));

		return () => {
			if (events) {
				Object.entries(events).forEach(([event, handler]) => {
					mapA.un(event, handler);
					mapB.un(event, handler);
				});
			}

			mapA.setTarget(null);
			mapB.setTarget(null);
		};
	}, []);

	function setupDamageLayerInteractions(
		mapA,
		mapB,
		layersA,
		layersB,
		allowBuildingSelection,
	) {
		let damageLayerGrpA = null;
		let damageLayerGrpB = null;

		layersA.forEach((layerGrp) => {
			if (
				layerGrp.getProperties().title === activeLayerNames
					? activeLayerNames
					: "Damage"
			) {
				damageLayerGrpA = layerGrp;
			}
		});
		layersB.forEach((layerGrp) => {
			if (
				layerGrp.getProperties().title === activeLayerNames
					? activeLayerNames
					: "Damage"
			) {
				damageLayerGrpB = layerGrp;
			}
		});

		if (
			damageLayerGrpA !== null &&
			damageLayerGrpB !== null &&
			allowBuildingSelection
		) {
			const damageLayerA = damageLayerGrpA.getLayers().getArray()[0];
			const damageLayerB = damageLayerGrpB.getLayers().getArray()[0];
			const damageLayerSourceA = damageLayerA.getSource();
			const damageLayerSourceB = damageLayerB.getSource();

			markerLayer.setZIndex(5);
			mapA.addLayer(markerLayer);
			mapB.addLayer(markerLayer);

			mapA.on("singleclick", (evt) => {
				let coordinate = mapA.getCoordinateFromPixel(evt.pixel);
				const view = mapA.getView();
				const viewProjection = view.getProjection();
				const viewResolution = view.getResolution();

				const urlA = damageLayerSourceA.getFeatureInfoUrl(
					coordinate,
					viewResolution,
					viewProjection,
					{
						INFO_FORMAT: "application/json",
						FEATURE_COUNT: 1,
					},
				);

				const urlB = damageLayerSourceB.getFeatureInfoUrl(
					coordinate,
					viewResolution,
					viewProjection,
					{
						INFO_FORMAT: "application/json",
						FEATURE_COUNT: 1,
					},
				);

				if (urlA && urlB) {
					setLoading(true);
					fetch(urlA)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							if (bldg.length > 0) {
								const returnCoordinates = bldg[0]?.geometry?.coordinates;
								let markerGeometry = new Point(returnCoordinates);
								markerFeature.setGeometry(markerGeometry);
								markerFeature.setStyle(markerStyle);
								setSelectedBuildingA(bldg[0].properties);
							} else {
								clearBuildingAndMarker();
							}
						})
						.catch((error) => {
							console.error("Error fetching building data:", error);
							clearBuildingAndMarker();
						})
						.finally(() => {
							setLoading(false); // Ensure loading state is turned off
						});

					fetch(urlB)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							if (bldg.length > 0) {
								const returnCoordinates = bldg[0]?.geometry?.coordinates;
								let markerGeometry = new Point(returnCoordinates);
								markerFeature.setGeometry(markerGeometry);
								markerFeature.setStyle(markerStyle);
								setSelectedBuildingB(bldg[0].properties);
							} else {
								clearBuildingAndMarker();
							}
						})
						.catch((error) => {
							console.error("Error fetching building data:", error);
							clearBuildingAndMarker();
						})
						.finally(() => {
							setLoading(false); // Ensure loading state is turned off
						});
				} else {
					clearBuildingAndMarker();
				}
			});

			mapB.on("singleclick", (evt) => {
				let coordinate = mapB.getCoordinateFromPixel(evt.pixel);
				const view = mapB.getView();
				const viewProjection = view.getProjection();
				const viewResolution = view.getResolution();

				const urlA = damageLayerSourceA.getFeatureInfoUrl(
					coordinate,
					viewResolution,
					viewProjection,
					{
						INFO_FORMAT: "application/json",
						FEATURE_COUNT: 1,
					},
				);

				const urlB = damageLayerSourceB.getFeatureInfoUrl(
					coordinate,
					viewResolution,
					viewProjection,
					{
						INFO_FORMAT: "application/json",
						FEATURE_COUNT: 1,
					},
				);

				if (urlA && urlB) {
					setLoading(true);
					fetch(urlA)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							if (bldg.length > 0) {
								const returnCoordinates = bldg[0]?.geometry?.coordinates;
								let markerGeometry = new Point(returnCoordinates);
								markerFeature.setGeometry(markerGeometry);
								markerFeature.setStyle(markerStyle);
								setSelectedBuildingA(bldg[0].properties);
							} else {
								clearBuildingAndMarker();
							}
						})
						.catch((error) => {
							console.error("Error fetching building data:", error);
							clearBuildingAndMarker();
						})
						.finally(() => {
							setLoading(false); // Ensure loading state is turned off
						});

					fetch(urlB)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							if (bldg.length > 0) {
								const returnCoordinates =
									json.features?.[0]?.geometry?.coordinates;
								let markerGeometry = new Point(returnCoordinates);
								markerFeature.setGeometry(markerGeometry);
								markerFeature.setStyle(markerStyle);
								setSelectedBuildingB(bldg[0].properties);
							} else {
								clearBuildingAndMarker();
							}
						})
						.catch((error) => {
							console.error("Error fetching building data:", error);
							clearBuildingAndMarker();
						})
						.finally(() => {
							setLoading(false); // Ensure loading state is turned off
						});
				} else {
					clearBuildingAndMarker();
				}
			});

			mapA.on("pointermove", (evt) => {
				if (evt.dragging) {
					return;
				}
				const data = damageLayerA.getData(evt.pixel);
				const hit = data && data[3] > 0;
				mapA.getTargetElement().style.cursor = hit ? "pointer" : "";
			});

			mapB.on("pointermove", (evt) => {
				if (evt.dragging) {
					return;
				}
				const data = damageLayerB.getData(evt.pixel);
				const hit = data && data[3] > 0;
				mapB.getTargetElement().style.cursor = hit ? "pointer" : "";
			});
		}
	}

	function clearBuildingAndMarker() {
		setSelectedBuildingA(null);
		setSelectedBuildingB(null);
		markerFeature.setStyle(null);
		markerFeature.setGeometry(undefined);
		setLoading(false);
	}

	return (
		<Grid container styles={{ marginBottom: "2em", zIndex: 50 }}>
			<Grid item xs={12}>
				<div style={{ position: "relative" }}>
					<div
						style={{ width: "100%", height: `${height}px`, display: "flex" }}
					>
						<div
							className={`ol-map ${className}`}
							ref={fallbackContainerA}
							style={{
								width: "100%",
								height: `${height}`,
								marginRight: "5px",
							}}
						>
							<p
								style={{
									color: "#808080",
									fontSize: "15px",
									margin: 0,
									padding: 0,
								}}
							>
								Map {globalConfig.comparisonKey[0]}
							</p>
							<MapContext.Provider value={{ map: mapRefA.current }}>
								{children}
							</MapContext.Provider>
						</div>
						<div
							className={`ol-map ${className}`}
							ref={fallbackContainerB}
							style={{
								width: "100%",
								height: `${height}`,
								marginLeft: "5px",
							}}
						>
							<p
								style={{
									color: "#808080",
									fontSize: "15px",
									margin: 0,
									padding: 0,
								}}
							>
								Map {globalConfig.comparisonKey[1]}
							</p>
							<MapContext.Provider value={{ map: mapRefB.current }}>
								{children}
							</MapContext.Provider>
						</div>
					</div>
					{allowBuildingSelection && selectedBuildingA ? (
						<OverlayTable
							selectedBuilding={selectedBuildingA}
							loading={loading}
							fields={fieldsA}
						/>
					) : (
						<></>
					)}
					{allowBuildingSelection && selectedBuildingB ? (
						<OverlayTable
							selectedBuilding={selectedBuildingB}
							loading={loading}
							right={true}
							fields={fieldsB}
						/>
					) : (
						<></>
					)}
				</div>
			</Grid>
			<Grid item xs={12}>
				<Accordion style={{ boxShadow: "none" }}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
						style={{ padding: "0", marginTop: "15px" }}
					>
						<Box display="flex" flexDirection="column" alignItems="flex-start">
							<IncoreTitle style={{ color: "#00619D", marginBottom: "auto" }}>
								Legends
							</IncoreTitle>
							<IncoreFootNote>
								Click to expand and view the legends
							</IncoreFootNote>
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<div className={classes.innerLegendDiv}>
							<br />
							{Object.entries(legends).map(([layerGroupName, layers]) => (
								<div key={layerGroupName} className={classes.legendGroup}>
									<div className={classes.groupTitle}>{layerGroupName}</div>
									<div className={classes.legendsContainer}>
										{Object.entries(layers).map(([layerName, { url }]) => (
											<div key={layerName} className={classes.layer}>
												<div className={classes.layerName}>{layerName}</div>
												<img
													src={url}
													alt={`Legend for ${layerName}`}
													className={classes.legendImage}
												/>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</AccordionDetails>
				</Accordion>
			</Grid>
		</Grid>
	);
};

const OverlayTable = (props) => {
	const { selectedBuilding, loading, right, fields } = props;
	const classes = useStyles();

	return (
		<TableContainer
			className={classes.tableContainer}
			style={right ? { left: "50%" } : null}
		>
			<LoadingOverlay active={loading} spinner text="Loading...">
				<Table
					className={classes.table}
					size="small"
					aria-label="a dense table"
				>
					<TableHead>
						<TableRow key="hdrRow">
							<TableCell
								align="left"
								style={{ backgroundColor: "#EFF2FF", color: "#69707F" }}
							>
								Attribute
							</TableCell>
							<TableCell
								align="right"
								style={{ backgroundColor: "#EFF2FF", color: "#69707F" }}
							>
								Value
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.keys(selectedBuilding)
							.sort()
							.map((colName) => {
								if (colName === "csv_guid") {
									return null;
								}
								return (
									<TableRow key={colName}>
										<TableCell
											align="left"
											style={{
												backgroundColor: "#EFF2FF",
												color: "#69707F",
												whiteSpace: "normal",
												overflowWrap: "break-word",
												wordBreak: "break-word",
											}}
										>
											{colName}
										</TableCell>
										<TableCell
											align="right"
											style={{
												whiteSpace: "normal",
												overflowWrap: "break-word",
												wordBreak: "break-word",
											}}
										>
											{colName === "max_state"
												? maxStateMapping(
														fields,
														selectedBuilding[colName],
														selectedBuilding["sw_max_state"],
												  )
												: selectedBuilding[colName] === undefined ||
												    selectedBuilding[colName] === null ||
												    selectedBuilding[colName] === ""
												  ? "-" // Fallback value for undefined, null, or empty strings
												  : selectedBuilding[colName]}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</LoadingOverlay>
		</TableContainer>
	);
};

export default MapCompare;

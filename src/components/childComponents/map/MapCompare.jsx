import * as React from "react";
import { Map as OLMap, View } from "ol";
import Overlay from "ol/Overlay";
import LayerSwitcher from "./LayerSwitcher";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import LoadingOverlay from "react-loading-overlay";
import { makeStyles } from "@material-ui/core/styles";

export const MapContext = React.createContext({});

const useStyles = makeStyles({
	table: {
		backgroundColor: "#FFFFFF",
		width: "235px",
		maxHeight: "356px",
		overflowY: "auto"
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
		textTransform: "uppercase"
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
		border: "1px solid rgba(46,91,255,0.08)"
	},
	tableContainer: {
		position: "absolute",
		width: "250px",
		maxHeight: "250px",
		top: "50px",
		left: "0px",
		zIndex: 5000,
		padding: "5px",
		overflow: "scroll",
		scrollBehavior: "smooth",
		"&::WebkitScrollbar": {
			display: "none" // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
		},
		"&MsOverflowStyle:": {
			display: "none" // Hide the scrollbar for IE
		}
	}
});

const MapCompare = (props) => {
	const { children, className, height, allowBuildingSelection } = props;
	const classes = useStyles();

	const [selectedBuildingA, setSelectedBuildingA] = React.useState(null);
	const [selectedBuildingB, setSelectedBuildingB] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const fallbackContainerA = React.useRef();
	const fallbackContainerB = React.useRef();

	const mapRefA = React.useRef();
	const mapRefB = React.useRef();

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
			events
		} = props;

		const view = new View({
			projection,
			center,
			zoom,
			minZoom,
			maxZoom,
			extent
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
						duration: 250
					}
				})
			]
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
						duration: 250
					}
				})
			]
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

		setupDamageLayerInteractions(mapA, mapB, layersA, layersB, allowBuildingSelection);

		if (updateMap) {
			updateMap(mapA);
			updateMap(mapB);
		}

		mapRefA.current = mapA;
		mapRefB.current = mapB;

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

	function setupDamageLayerInteractions(mapA, mapB, layersA, layersB, allowBuildingSelection) {
		let damageLayerGrpA = null;
		let damageLayerGrpB = null;

		layersA.forEach((layerGrp) => {
			if (layerGrp.getProperties().title === "Damage") {
				damageLayerGrpA = layerGrp;
			}
		});
		layersB.forEach((layerGrp) => {
			if (layerGrp.getProperties().title === "Damage") {
				damageLayerGrpB = layerGrp;
			}
		});

		if (damageLayerGrpA !== null && damageLayerGrpB !== null && allowBuildingSelection) {
			const damageLayerA = damageLayerGrpA.getLayers().getArray()[0];
			const damageLayerB = damageLayerGrpB.getLayers().getArray()[0];
			const damageLayerSourceA = damageLayerA.getSource();
			const damageLayerSourceB = damageLayerB.getSource();

			mapA.on("singleclick", (evt) => {
				let coordinate = mapA.getCoordinateFromPixel(evt.pixel);
				const view = mapA.getView();
				const viewProjection = view.getProjection();
				const viewResolution = view.getResolution();

				const urlA = damageLayerSourceA.getFeatureInfoUrl(coordinate, viewResolution, viewProjection, {
					INFO_FORMAT: "application/json",
					FEATURE_COUNT: 1
				});

				const urlB = damageLayerSourceB.getFeatureInfoUrl(coordinate, viewResolution, viewProjection, {
					INFO_FORMAT: "application/json",
					FEATURE_COUNT: 1
				});

				if (urlA && urlB) {
					setLoading(true);
					fetch(urlA)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							if (bldg.length > 0) {
								setSelectedBuildingA(bldg[0].properties);
							} else if (bldg.length === 0) {
								setSelectedBuildingA(null);
							}
							setLoading(false);
						});
					fetch(urlB)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							if (bldg.length > 0) {
								setSelectedBuildingB(bldg[0].properties);
							} else if (bldg.length === 0) {
								setSelectedBuildingB(null);
							}
							setLoading(false);
						});
				} else {
					setSelectedBuildingA(null);
					setSelectedBuildingB(null);
				}
			});

			mapB.on("singleclick", (evt) => {
				let coordinate = mapB.getCoordinateFromPixel(evt.pixel);
				const view = mapB.getView();
				const viewProjection = view.getProjection();
				const viewResolution = view.getResolution();

				const urlA = damageLayerSourceA.getFeatureInfoUrl(coordinate, viewResolution, viewProjection, {
					INFO_FORMAT: "application/json",
					FEATURE_COUNT: 1
				});

				const urlB = damageLayerSourceB.getFeatureInfoUrl(coordinate, viewResolution, viewProjection, {
					INFO_FORMAT: "application/json",
					FEATURE_COUNT: 1
				});

				if (urlA && urlB) {
					setLoading(true);
					fetch(urlA)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							if (bldg.length > 0) {
								setSelectedBuildingA(bldg[0].properties);
							} else if (bldg.length === 0) {
								setSelectedBuildingA(null);
							}
							setLoading(false);
						});
					fetch(urlB)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							if (bldg.length > 0) {
								setSelectedBuildingB(bldg[0].properties);
							} else if (bldg.length === 0) {
								setSelectedBuildingB(null);
							}
							setLoading(false);
						});
				} else {
					setSelectedBuildingA(null);
					setSelectedBuildingB(null);
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


	return (
		<div style={{ position: "relative" }}>
			<div style={{ width: "100%", height: `${height}px`, display: "flex" }}>
				<div className={`ol-map ${className}`} ref={fallbackContainerA}
					style={{ width: "50%", height: `${height}px`, marginRight: "5px" }}>
					<MapContext.Provider value={{ map: mapRefA.current }}>{children}</MapContext.Provider>
				</div>
				<div className={`ol-map ${className}`} ref={fallbackContainerB}
					style={{ width: "50%", height: `${height}px`, marginLeft: "5px" }}>
					<MapContext.Provider value={{ map: mapRefB.current }}>{children}</MapContext.Provider>
				</div>
			</div>
			{allowBuildingSelection && selectedBuildingA ?
				<OverlayTable selectedBuilding={selectedBuildingA} loading={loading} /> : <></>
			}
			{allowBuildingSelection && selectedBuildingB ?
				<OverlayTable selectedBuilding={selectedBuildingA} loading={loading} right={true} /> : <></>
			}
		</div>
	)
	;
};

const OverlayTable = (props) => {
	const { selectedBuilding, loading, right } = props;
	const classes = useStyles();

	return (
		<TableContainer className={classes.tableContainer} style={right ? { "left": "50%" } : null}>
			<LoadingOverlay active={loading} spinner text="Loading...">
				<Table className={classes.table} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow
							key="hdrRow"
						>
							<TableCell
								align="center"
								style={{ backgroundColor: "#EFF2FF", color: "#69707F" }}
							>
                                Attribute
							</TableCell>
							<TableCell
								align="center"
								style={{ backgroundColor: "#EFF2FF", color: "#69707F" }}
							>
                                Value
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.keys(selectedBuilding).map((colName) => {
							if (colName === "guid") {
								return null;
							}
							return (
								<TableRow
									key={colName}
								>
									<TableCell
										style={{ backgroundColor: "#EFF2FF", color: "#69707F" }}
									>
										{colName}
									</TableCell>
									<TableCell
										align="center"
									>
										{selectedBuilding[colName] === undefined ||
                                        selectedBuilding[colName] === null ||
                                        selectedBuilding[colName] === ""
											? "-"
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

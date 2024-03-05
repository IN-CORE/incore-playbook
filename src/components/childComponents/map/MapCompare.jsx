import * as React from "react";
import { Map as OLMap, View, Feature } from "ol";
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
	},
});

const MapCompare = (props) => {
	const { children, id, className, height, allowBuildingSelection } = props;
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
			extent,
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

		setupDamageLayerInteraction(mapA, layersA, allowBuildingSelection, "A");
		setupDamageLayerInteraction(mapB, layersB, allowBuildingSelection, "B");

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

	function setupDamageLayerInteraction(map, layers, allowBuildingSelection, analysisTag) {
		let damageLayerGrp = null;

		layers.forEach((layerGrp) => {
			if (layerGrp.getProperties().title === "Damage") {
				damageLayerGrp = layerGrp;
			}
		});

		if (damageLayerGrp !== null && allowBuildingSelection) {
			const damageLayer = damageLayerGrp.getLayers().getArray()[0];
			const damageLayerSource = damageLayer.getSource();

			map.on("singleclick", (evt) => {
				let coordinate = map.getCoordinateFromPixel(evt.pixel);
				const view = map.getView();
				const viewProjection = view.getProjection();
				const viewResolution = view.getResolution();

				const url = damageLayerSource.getFeatureInfoUrl(coordinate, viewResolution, viewProjection, {
					INFO_FORMAT: "application/json",
					FEATURE_COUNT: 1
				});

				if (url) {
					setLoading(true);
					fetch(url)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							if (bldg.length > 0) {
								setSelectedBuildingA(bldg[0].properties);
								setSelectedBuildingB(bldg[0].properties);
							} else if (bldg.length === 0) {
								setSelectedBuildingA(null);
								setSelectedBuildingB(null);
							}
							setLoading(false);
						});
				} else {
					setSelectedBuildingA(null);
					setSelectedBuildingB(null);
				}
			});

			map.on("pointermove", (evt) => {
				if (evt.dragging) {
					return;
				}
				const data = damageLayer.getData(evt.pixel);
				const hit = data && data[3] > 0;
				map.getTargetElement().style.cursor = hit ? "pointer" : "";
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
			{allowBuildingSelection && selectedBuildingA ? (
				<TableContainer className={classes.tableContainer}
				>
					<LoadingOverlay active={loading} spinner text="Loading...">
						<Table className={classes.table} size="small" aria-label="a dense table">
							<TableHead>
								{/* keeping this here to be added back in the future */}
								{/* <TableRow
								>
									<TableCell
										align="center"
									>
										<IconButton
											aria-label="close"
											size="small"
											onClick={() => {
												markerFeature.setGeometry(undefined);
												markerFeature.setStyle(new Style(null));
												markerFeature.set("visible", false);
												setSelectedBuilding(null);
											}}
										>
											<CloseIcon fontSize="inherit" />
										</IconButton>
									</TableCell>
									<TableCell
										align="center"
									></TableCell>
								</TableRow> */}
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
								{Object.keys(selectedBuildingA).map((colName) => {
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
												{selectedBuildingA[colName] === undefined ||
												selectedBuildingA[colName] === null ||
												selectedBuildingA[colName] === ""
													? "-"
													: selectedBuildingA[colName]}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</LoadingOverlay>
				</TableContainer>
			) : null}
			{allowBuildingSelection && selectedBuildingB ? (
				<TableContainer className={classes.tableContainer}
					style={{
						"left": "50%"
					}}
				>
					<LoadingOverlay active={loading} spinner text="Loading...">
						<Table className={classes.table} size="small" aria-label="a dense table">
							<TableHead>
								{/* keeping this here to be added back in the future */}
								{/* <TableRow
								>
									<TableCell
										align="center"
									>
										<IconButton
											aria-label="close"
											size="small"
											onClick={() => {
												markerFeature.setGeometry(undefined);
												markerFeature.setStyle(new Style(null));
												markerFeature.set("visible", false);
												setSelectedBuilding(null);
											}}
										>
											<CloseIcon fontSize="inherit" />
										</IconButton>
									</TableCell>
									<TableCell
										align="center"
									></TableCell>
								</TableRow> */}
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
								{Object.keys(selectedBuildingB).map((colName) => {
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
												{selectedBuildingB[colName] === undefined ||
												selectedBuildingB[colName] === null ||
												selectedBuildingB[colName] === ""
													? "-"
													: selectedBuildingB[colName]}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</LoadingOverlay>
				</TableContainer>
			) : null}
		</div>
	)
	;
};

export default MapCompare;

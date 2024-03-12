import * as React from "react";
import { Map as OLMap, View } from "ol";
import LayersIcon from "@material-ui/icons/Layers";
// import {defaults as defaultControls} from "ol/control";
import Overlay from "ol/Overlay";

import { makeStyles } from "@material-ui/core/styles";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import LoadingOverlay from "react-loading-overlay";

import LayerSwitcher from "./LayerSwitcher";
import { maxStateMapping } from "../../../utils/common";

const useStyles = makeStyles({
	table: {
		backgroundColor: "#FFFFFF",
		minWidth: "265px",
		maxHeight: "356px",
		overflowY: "auto",
	},
	tableHeaderRow: {
		height: "34px",
	},
	tableHeaderCell: {
		height: "14px",
		width: "37px",
		color: "#FFFFFF",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1.13px",
		lineHeight: "14px",
		textAlign: "center",
		textTransform: "uppercase",
	},
	tableBodyRow: {
		height: "28px",
	},
	tableBodyCell: {
		height: "21px",
		width: "123px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "18px",
		border: "1px solid rgba(46,91,255,0.08)",
	},
	legend: {
		position: "absolute",
		top: "27%",
		left: "0.5%",
		backgroundColor: "white",
		padding: "1%",
		borderRadius: "5%",
		boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
		maxHeight: "70%",
		overflowY: "auto",
		zIndex: 1000, // Added z-index here
	},
	legendButton: {
		position: "absolute",
		top: "17%",
		left: "0.5%",
		width: "2.25em",
		height: "2.25em",
		backgroundColor: "#FFFFFF",
		borderRadius: "10%",
		boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
		opacity: 0.8,
		zIndex: 1000,
		border: "none",
		padding: 0,
		outline: "none",
		cursor: "pointer",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export const MapContext = React.createContext({});

const Map = (props) => {
	const { children, id, className, allowBuildingSelection, fields } = props;
	const classes = useStyles();

	const [selectedBuilding, setSelectedBuilding] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const fallbackContainer = React.useRef();

	const mapRef = React.useRef();

	// State variable to make legend collapsible
	const [legendOpen, setLegendOpen] = React.useState(false);
	// State variable to store legends
	const [legends, setLegends] = React.useState([]);

	// var markerStyle = new Style({
	// 	image: new CircleStyle({
	// 		radius: 7,
	// 		fill: new Fill({ color: "black" }),
	// 		stroke: new Stroke({
	// 			color: "white",
	// 			width: 2
	// 		})
	// 	})
	// });

	// var markerFeature = new Feature({
	// 	id: "marker",
	// 	visible: true
	// });

	// var vectorSource = new VectorSource({
	// 	features: [markerFeature]
	// });

	// var markerLayer = new VectorLayer({
	// 	title: "BuildingPointMarker",
	// 	source: vectorSource
	// });

	function fetchLegendsForLayers(layers) {
		const legends = {};

		layers.forEach((layerGrp) => {
			const layersArray = layerGrp.getLayers().getArray();
			const layerGrpTitle = layerGrp.getProperties().title;

			// Check if there are valid layers in group, for example no need for Basemap group
			if (layersArray[0].getSource().params_) {
				legends[layerGrpTitle] = layersArray.reduce((acc, layer) => {
					const layerJSON = layer.getSource().params_;
					if (layerJSON) {
						const legendUrl = `https://incore-dev.ncsa.illinois.edu/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${layerJSON.LAYERS}&STYLE=${layerJSON.STYLES}`;
						acc[layer.get("title")] = { url: legendUrl };
					}
					return acc;
				}, {});
			}
		});
		return legends;
	}

	React.useEffect(() => {
		const {
			mapContainer,
			projection,
			center,
			zoom,
			minZoom,
			maxZoom,
			extent,
			// controls,
			layers,
			layerSwitcherOptions,
			updateMap,
			events,
			allowBuildingSelection,
		} = props;

		const map = new OLMap({
			target: mapContainer || fallbackContainer.current,
			view: new View({
				projection,
				center,
				zoom,
				minZoom,
				maxZoom,
				extent,
			}),
			layers,
			overlays: [
				new Overlay({
					id: "popup",
					className: "ol-popup",
					autoPan: true,
					autoPanAnimation: {
						duration: 250,
					},
				}),
			],
			// controls: defaultControls().extend(controls)
		});

		if (events) {
			Object.entries(events).forEach(([event, handler]) => {
				map.on(event, handler);
			});
		}

		if (layerSwitcherOptions) {
			const layerSwitcher = new LayerSwitcher(layerSwitcherOptions);
			map.addControl(layerSwitcher);
		}

		let damageLayerGrp = null;
		layers.forEach((layerGrp) => {
			if (layerGrp.getProperties().title === "Damage") {
				damageLayerGrp = layerGrp;
			}
		});

		if (damageLayerGrp !== null && allowBuildingSelection) {
			const damageLayer = damageLayerGrp.getLayers().getArray()[0];
			const damageLayerSource = damageLayer.getSource();

			// map.addLayer(markerLayer);

			map.on("singleclick", (evt) => {
				// clear out the previous marker if any

				let coordinate = map.getCoordinateFromPixel(evt.pixel);
				const view = map.getView();
				const viewProjection = view.getProjection();
				const viewResolution = view.getResolution();

				const url = damageLayerSource.getFeatureInfoUrl(
					coordinate,
					viewResolution,
					viewProjection,
					{
						INFO_FORMAT: "application/json",
						FEATURE_COUNT: 1,
					},
				);
				if (url) {
					setLoading(true);
					fetch(url)
						.then((response) => response.json())
						.then((json) => {
							let bldg = json.features;
							// var markerGeometry = new Point(coordinate);
							if (bldg.length > 0) {
								// TODO: add a marker to the building
								// markerFeature.setGeometry(markerGeometry);
								// markerFeature.setStyle(markerStyle);

								setSelectedBuilding(bldg[0].properties);
							} else if (bldg.length === 0) {
								// markerFeature.setGeometry(undefined);
								// markerFeature.setStyle(undefined);
								setSelectedBuilding(null);
							}
							setLoading(false);
						});
				} else {
					setSelectedBuilding(null);
					// markerFeature.setStyle(null);
					// markerFeature.setGeometry(undefined);
				}
			});

			map.on("pointermove", (evt) => {
				if (evt.dragging) {
					return;
				}
				const data = damageLayer.getData(evt.pixel);
				const hit = data && data[3] > 0; // transparent pixels have zero for data[3]
				map.getTargetElement().style.cursor = hit ? "pointer" : "";
			});
		}

		if (updateMap) {
			updateMap(map);
		}

		mapRef.current = map;

		setLegends(fetchLegendsForLayers(layers));

		return () => {
			if (events) {
				Object.entries(events).forEach(([event, handler]) => {
					map.un(event, handler);
				});
			}

			map.setTarget(undefined);
		};
	}, []);

	return allowBuildingSelection ? (
		<div style={{ position: "relative" }}>
			<button
				onClick={() => setLegendOpen(!legendOpen)}
				className={classes.legendButton}
			>
				<LayersIcon />
			</button>
			{legendOpen && (
				<div className={classes.legend}>
					{Object.entries(legends).map(([layerGroupName, layers]) => (
						<div key={layerGroupName} style={{ marginBottom: "20px" }}>
							<h3>{layerGroupName}</h3>
							<ul style={{ listStyleType: "none" }}>
								{Object.entries(layers).map(([layerName, { url }]) => (
									<li key={layerName} style={{ marginBottom: "10px" }}>
										<div>{layerName}</div>
										<img
											src={url}
											alt={`Legend for ${layerName}`}
											style={{
												maxWidth: "70%",
												height: "auto",
												marginTop: "5px",
											}}
										/>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}
			<div
				id={id}
				style={{ width: "100%", height: "366px" }}
				className={`ol-map ${className}`}
				ref={fallbackContainer}
			>
				<MapContext.Provider value={{ map: mapRef.current }}>
					{children}
				</MapContext.Provider>
			</div>
			{allowBuildingSelection && selectedBuilding ? (
				<TableContainer
					style={{
						position: "absolute",
						width: "300px",
						maxHeight: "356px",
						top: "5px",
						left: "30px",
						Zindex: 5000,
						padding: "5px",
						overflow: "scroll",
						scrollBehavior: "smooth",
						"&::WebkitScrollbar": {
							display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
						},
						"&MsOverflowStyle:": {
							display: "none", // Hide the scrollbar for IE
						},
					}}
				>
					<LoadingOverlay active={loading} spinner text="Loading...">
						<Table
							className={classes.table}
							size="small"
							aria-label="a dense table"
						>
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
								<TableRow key="hdrRow">
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
								{Object.keys(selectedBuilding)
									.sort()
									.map((colName) => {
										if (colName === "csv_guid") {
											return null;
										}
										return (
											<TableRow key={colName}>
												<TableCell
													style={{
														backgroundColor: "#EFF2FF",
														color: "#69707F",
													}}
												>
													{colName}
												</TableCell>
												<TableCell align="center">
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
			) : null}
		</div>
	) : (
		<div
			id={id}
			style={{ width: "100%", height: "100%" }}
			className={`ol-map ${className}`}
			ref={fallbackContainer}
		>
			<MapContext.Provider value={{ map: mapRef.current }}>
				{children}
			</MapContext.Provider>
		</div>
	);
};

export default Map;

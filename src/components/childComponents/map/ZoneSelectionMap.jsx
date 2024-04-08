import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Map as OLMap, View } from "ol";
import Overlay from "ol/Overlay";

import LayerSwitcher from "./LayerSwitcher";
import { Fill, Stroke, Style } from "ol/style";
import Select from "ol/interaction/Select";
import {
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from "@material-ui/core";

export const MapContext = React.createContext({});

export const ZoneSelectionMap = (props) => {
	const {
		children,
		id,
		className,
		layers,
		activeLayerNames,
		selectedZoneName,
		setSelectedZoneName,
	} = props;

	const fallbackContainer = React.useRef();

	const mapRef = React.useRef();
	const [featuresByName, setFeaturesByName] = useState({});
	const [leftColumnZones, setLeftColumnZones] = useState([]);
	const [rightColumnZones, setRightColumnZones] = useState([]);

	const zoneNames = useSelector((state) => state.attribute.zoneNames);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const columnBreakpoint = 15;

	const selectSingleClickRef = React.useRef();

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
			layerSwitcherOptions,
			updateMap,
			events,
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
				showFullExtent: true,
				smoothExtentConstraint: true,
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

		// Define select interaction
		selectSingleClickRef.current = new Select({
			style: new Style({
				fill: new Fill({
					color: "rgba(25, 118, 210, 0.3)",
				}),
				stroke: new Stroke({
					color: "#1976D2",
					width: 2,
				}),
			}),
		});

		// Add select interaction to the map
		map.addInteraction(selectSingleClickRef.current);

		// Add event listener for the select interaction
		selectSingleClickRef.current.on("select", function (e) {
			const selectedFeature = e.selected[0]; // Get the first selected feature
			if (selectedFeature) {
				// Retrieve the property of the selected feature e.g. 'name' or "fld_zone"
				const name = selectedFeature.get(
					globalConfig.retrofitStrategyBuilder.activeLayerFieldname ?? "name",
				);
				setSelectedZoneName(name.toString());
			} else {
				setSelectedZoneName("");
			}
		});

		if (updateMap) {
			updateMap(map);
		}

		mapRef.current = map;

		return () => {
			if (events) {
				Object.entries(events).forEach(([event, handler]) => {
					map.un(event, handler);
				});
			}
			if (map) {
				map.removeInteraction(selectSingleClickRef.current);
				map.setTarget(undefined);
			}
		};
	}, []);

	React.useEffect(() => {
		const zoneLayer = layers.find(
			(layer) => layer.getProperties().title === activeLayerNames ?? "Zone",
		);

		if (zoneLayer) {
			const zoneLayerSource = zoneLayer.getSource();

			const updateFeaturesAndNames = () => {
				// Update the name-to-feature map for reverse lookup
				const nameToFeatureMap = zoneLayerSource
					.getFeatures()
					.reduce((acc, feature) => {
						const name = feature.get(
							globalConfig.retrofitStrategyBuilder.activeLayerFieldname ??
								"name",
						);
						if (name) {
							acc[name.toString()] = feature;
						}
						return acc;
					}, {});

				setFeaturesByName(nameToFeatureMap);
			};

			// Listen for changes on the source
			zoneLayerSource.on("change", updateFeaturesAndNames);

			// Initial update in case features are already loaded before the listener is attached
			updateFeaturesAndNames();

			return () => {
				// Cleanup: remove the event listener
				zoneLayerSource.un("change", updateFeaturesAndNames);
			};
		}
	}, [layers, activeLayerNames]);

	const handleChange = (event) => {
		const selectedName = event.target.value;
		setSelectedZoneName(selectedName);

		// Clear previous selection
		selectSingleClickRef.current.getFeatures().clear();

		// Find and select the feature corresponding to the selected zone name
		const featureToSelect = featuresByName[selectedName];
		if (featureToSelect) {
			// Temporarily add the feature to the select interaction for highlighting
			selectSingleClickRef.current.getFeatures().push(featureToSelect);
		}
	};

	React.useEffect(() => {
		if (zoneNames.length > 0) {
			setLeftColumnZones(zoneNames.slice(0, columnBreakpoint));
			setRightColumnZones(zoneNames.slice(columnBreakpoint));
		}
	}, [zoneNames]);

	return (
		<>
			<Typography>Select a zone on the map or from the list:</Typography>
			<Grid container spacing={3}>
				{/*Map*/}
				<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
					<div
						id={id}
						style={{ width: "100%", height: "600px" }}
						className={`ol-map ${className}`}
						ref={fallbackContainer}
					>
						<MapContext.Provider value={{ map: mapRef.current }}>
							{children}
						</MapContext.Provider>
					</div>
				</Grid>
				{/*Selection*/}
				<Grid
					item
					xl={zoneNames.length > columnBreakpoint ? 3 : 6}
					lg={zoneNames.length > columnBreakpoint ? 3 : 6}
					md={zoneNames.length > columnBreakpoint ? 3 : 6}
					sm={zoneNames.length > columnBreakpoint ? 3 : 6}
					xs={6}
				>
					<FormControl component="fieldset">
						<RadioGroup
							aria-label="zone-left"
							name="zone-left"
							value={selectedZoneName}
							onChange={handleChange}
						>
							{leftColumnZones && leftColumnZones.length > 0
								? leftColumnZones.map((name, index) => (
										<FormControlLabel
											key={index}
											value={name}
											control={<Radio />}
											label={
												<span
													style={
														name === selectedZoneName
															? { fontWeight: "bold" }
															: {}
													}
												>
													{
														// Use the label from the global config if available
														globalConfig.retrofitStrategyBuilder.conditions
															.find((condition) => condition.key === "zones")
															.possibleOptions.find(
																(option) => option.value === name,
															)?.label || name
													}
												</span>
											}
										/>
								  ))
								: null}
						</RadioGroup>
					</FormControl>
				</Grid>
				{/*break long list into two columns*/}
				{zoneNames.length > columnBreakpoint && (
					<Grid item xl={3} lg={3} md={3} sm={3} xs={6}>
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="zone-right"
								name="zone-right"
								value={selectedZoneName}
								onChange={handleChange}
							>
								{rightColumnZones.map((name, index) => (
									<FormControlLabel
										key={index}
										value={name}
										control={<Radio />}
										label={
											<span
												style={
													name === selectedZoneName
														? { fontWeight: "bold" }
														: {}
												}
											>
												{name}
											</span>
										}
									/>
								))}
							</RadioGroup>
						</FormControl>
					</Grid>
				)}
			</Grid>
		</>
	);
};

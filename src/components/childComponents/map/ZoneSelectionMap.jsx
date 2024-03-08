import * as React from "react";
import { useState } from "react";
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
	const { children, id, className, layers, activeLayerNames } = props;

	const fallbackContainer = React.useRef();

	const mapRef = React.useRef();
	const [selectedZoneName, setSelectedZoneName] = useState("");
	const [featuresByName, setFeaturesByName] = useState({});
	const [zoneNames, setZoneNames] = useState([]);
	const [leftColumnZones, setLeftColumnZones] = useState([]);
	const [rightColumnZones, setRightColumnZones] = useState([]);

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
				const name = selectedFeature.get("name"); // Retrieve the 'name' property of the selected feature
				setSelectedZoneName(name);
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
		let zoneLayer = null;
		layers.forEach((layer) => {
			if (layer.getProperties().title === activeLayerNames) {
				zoneLayer = layer;
			}
		});

		// store name to feature map for reverse lookup when radio button is selected map selection
		let nameToFeatureMap = {};
		if (zoneLayer) {
			const zoneLayerSource = zoneLayer.getSource();
			zoneLayerSource.getFeatures().forEach((feature) => {
				const name = feature.get("name");
				if (name) {
					nameToFeatureMap[name] = feature;
				}
			});

			// Listen for when features have been added to the source
			// populate the zone name list
			zoneLayerSource.on("featuresloadend", () => {
				const tmpZoneNames = zoneLayerSource
					.getFeatures()
					.map((feature) => feature.get("name"));
				const uniqueSortedZoneNames = [...new Set(tmpZoneNames)].sort((a, b) =>
					a.localeCompare(b),
				);
				setZoneNames(uniqueSortedZoneNames);
			});
		}

		setFeaturesByName(nameToFeatureMap);
	}, [layers]);

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
		setLeftColumnZones(zoneNames.slice(0, columnBreakpoint));
		setRightColumnZones(zoneNames.slice(columnBreakpoint));
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
				<Grid item xl={3} lg={3} md={3} sm={3} xs={6}>
					<FormControl component="fieldset">
						<RadioGroup
							aria-label="zone-left"
							name="zone-left"
							value={selectedZoneName}
							onChange={handleChange}
						>
							{leftColumnZones.map((name, index) => (
								<FormControlLabel
									key={index}
									value={name}
									control={<Radio />}
									label={name}
								/>
							))}
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
										label={name}
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

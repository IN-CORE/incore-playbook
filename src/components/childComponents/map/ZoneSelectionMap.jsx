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
	Radio,
	RadioGroup,
	Typography,
} from "@material-ui/core";

export const MapContext = React.createContext({});

export const ZoneSelectionMap = (props) => {
	const { children, id, className, zoneNames } = props;

	const fallbackContainer = React.useRef();

	const mapRef = React.useRef();
	const [selectedZoneName, setSelectedZoneName] = useState("");

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
		const selectSingleClick = new Select({
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
		map.addInteraction(selectSingleClick);

		// Add event listener for the select interaction
		selectSingleClick.on("select", function (e) {
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
				map.removeInteraction(selectSingleClick);
				map.setTarget(undefined);
			}
		};
	}, []);

	const handleChange = (event) => {
		setSelectedZoneName(event.target.value);
	};

	return (
		<div style={{ position: "relative" }}>
			<Typography>Select a zone on the map or from the list:</Typography>
			<div
				id={id}
				style={{ width: "100%", height: "800px" }}
				className={`ol-map ${className}`}
				ref={fallbackContainer}
			>
				<MapContext.Provider value={{ map: mapRef.current }}>
					{children}
				</MapContext.Provider>
			</div>
			{/*Selection*/}
			<FormControl component="fieldset">
				<RadioGroup
					aria-label="zone"
					name="zone"
					value={selectedZoneName}
					onChange={handleChange}
				>
					{zoneNames.map((name, index) => (
						<FormControlLabel
							key={index}
							value={name}
							control={<Radio />}
							label={name}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</div>
	);
};

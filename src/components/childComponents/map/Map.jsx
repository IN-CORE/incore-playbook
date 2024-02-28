import * as React from "react";
import { Map as OLMap, View } from "ol";
// import {defaults as defaultControls} from "ol/control";
import Overlay from "ol/Overlay";

import LayerSwitcher from "./LayerSwitcher";

export const MapContext = React.createContext({});

const Map = (props) => {
	const { children, id, className } = props;
	const fallbackContainer = React.useRef();

	const mapRef = React.useRef();

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
			setSelectedBuilding,
			setLoading
		} = props;


		const map = new OLMap({
			target: mapContainer || fallbackContainer.current,
			view: new View({
				projection,
				center,
				zoom,
				minZoom,
				maxZoom,
				extent
			}),
			layers,
			overlays: [
				new Overlay({
					id: "popup",
					className: "ol-popup",
					autoPan: true,
					autoPanAnimation: {
						duration: 250
					}
				})
			]
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

		if ((damageLayerGrp !== null) && allowBuildingSelection && setSelectedBuilding !== undefined) {
			const damageLayer = damageLayerGrp.getLayers().getArray()[0];
			const damageLayerSource = damageLayer.getSource();

			map.on("singleclick", (evt) => {
				let coordinate = map.getCoordinateFromPixel(evt.pixel);
				const view = map.getView();
				const viewProjection = view.getProjection();
				const viewResolution = view.getResolution();

				const url = damageLayerSource.getFeatureInfoUrl(
					coordinate,
					viewResolution,
					viewProjection,
					{ "INFO_FORMAT": "application/json", "FEATURE_COUNT": 1 }
				);
				if (url) {
					setLoading(true);
					fetch(url)
						.then((response) => response.json())
						.then((json) => {
							setSelectedBuilding(json.features[0].properties);
							setLoading(false);
						});
				} else {
					setSelectedBuilding(null);
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
		} else if (allowBuildingSelection && setSelectedBuilding === undefined) {
			console.error("If allowBuildingSelection is true, setSelectedBuilding must be passed as a prop.");
		}

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

			map.setTarget(undefined);
		};
	}, []);

	return (
		<div id={id} className={`ol-map ${className}`} ref={fallbackContainer}>
			<MapContext.Provider value={{ map: mapRef.current }}>{children}</MapContext.Provider>
		</div>
	);
};

export default Map;

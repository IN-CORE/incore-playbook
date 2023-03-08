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
			events
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

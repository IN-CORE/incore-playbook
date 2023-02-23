import * as React from "react";
import { Map as OLMap, View } from "ol";

import LayerSwitcher from "./LayerSwitcher";

export const MapContext = new React.createContext({});

const Map = (props) => {
	const {
		children,
		className,
		projection,
		center,
		zoom,
		minZoom,
		maxZoom,
		extent,
		layers,
		layerSwitcherOptions,
		updateMap,
		events
	} = props;

	const [map, setMap] = React.useState(null);
	const mapRef = React.useRef();

	// on component mount
	React.useEffect(() => {
		const mapObj = new OLMap({
			target: mapRef.current,
			view: new View({
				projection,
				center,
				zoom,
				minZoom,
				maxZoom,
				extent
			}),
			layers
		});

		if (events) {
			Object.entries(events).forEach(([event, handler]) => {
				mapObj.on(event, handler);
			});
		}

		if (layerSwitcherOptions) {
			const layerSwitcher = new LayerSwitcher(layerSwitcherOptions);
			mapObj.addControl(layerSwitcher);
		}

		if (updateMap) {
			updateMap(mapObj);
		}

		setMap(mapObj);
		return () => {
			if (events) {
				Object.entries(events).forEach(([event, handler]) => {
					mapObj.un(event, handler);
				});
			}

			mapObj.setTarget(undefined);
		};
	}, []);

	// zoom change handler
	React.useEffect(() => {
		if (!map) return;
		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	React.useEffect(() => {
		if (!map) return;
		map.getView().setCenter(center);
	}, [center]);

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className={`ol-map ${className}`}>
				{children}
			</div>
		</MapContext.Provider>
	);
};

export default Map;

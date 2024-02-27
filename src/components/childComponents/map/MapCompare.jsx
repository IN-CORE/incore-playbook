import * as React from "react";
import { Map as OLMap, View } from "ol";
import Overlay from "ol/Overlay";
import LayerSwitcher from "./LayerSwitcher";

export const MapContext = React.createContext({});

const MapCompare = (props) => {
	const { children, id, className } = props;

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

	return (
		<div style={{ width: "100%", height: "400px", display: "flex" }}>
			<div className={`ol-map ${className}`} ref={fallbackContainerA} style={{ width: "50%", height: "400px", marginRight: "5px" }}>
				<MapContext.Provider value={{ map: mapRefA.current }}>{children}</MapContext.Provider>
			</div>
			<div className={`ol-map ${className}`} ref={fallbackContainerB} style={{ width: "50%", height: "400px", marginLeft: "5px" }}>
				<MapContext.Provider value={{ map: mapRefB.current }}>{children}</MapContext.Provider>
			</div>
		</div>
	);
};

export default MapCompare;

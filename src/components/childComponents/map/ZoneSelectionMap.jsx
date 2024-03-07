import * as React from "react";
import { Map as OLMap, View } from "ol";
// import {defaults as defaultControls} from "ol/control";
import Overlay from "ol/Overlay";

import { makeStyles } from "@material-ui/core/styles";

import LayerSwitcher from "./LayerSwitcher";

const useStyles = makeStyles({});

export const MapContext = React.createContext({});

export const ZoneSelectionMap = (props) => {
	const { children, id, className, activeLayerName } = props;

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

		let zoneLayerGrp = null;
		layers.forEach((layerGrp) => {
			if (layerGrp.getProperties().title === activeLayerName) {
				zoneLayerGrp = layerGrp;
			}
		});

		// if (zoneLayerGrp !== null) {
		//     const damageLayer = zoneLayerGrp.getLayers().getArray()[0];
		//     const damageLayerSource = damageLayer.getSource();
		//
		//     // map.addLayer(markerLayer);
		//
		//     map.on("singleclick", (evt) => {
		//         // clear out the previous marker if any
		//
		//         let coordinate = map.getCoordinateFromPixel(evt.pixel);
		//         const view = map.getView();
		//         const viewProjection = view.getProjection();
		//         const viewResolution = view.getResolution();
		//
		//         const url = damageLayerSource.getFeatureInfoUrl(
		//             coordinate,
		//             viewResolution,
		//             viewProjection,
		//             {
		//                 INFO_FORMAT: "application/json",
		//                 FEATURE_COUNT: 1
		//             }
		//         );
		//         if (url) {
		//             fetch(url)
		//             .then((response) => response.json())
		//             .then((json) => {
		//                 let bldg = json.features;
		//                 // var markerGeometry = new Point(coordinate);
		//                 if (bldg.length > 0) {
		//                     // TODO: add a marker to the building
		//                     // markerFeature.setGeometry(markerGeometry);
		//                     // markerFeature.setStyle(markerStyle);
		//
		//                 } else if (bldg.length === 0) {
		//                     // markerFeature.setGeometry(undefined);
		//                     // markerFeature.setStyle(undefined);
		//                 }
		//             });
		//         } else {
		//             // markerFeature.setStyle(null);
		//             // markerFeature.setGeometry(undefined);
		//         }
		//     });
		//
		//     map.on("pointermove", (evt) => {
		//         if (evt.dragging) {
		//             return;
		//         }
		//         const data = damageLayer.getData(evt.pixel);
		//         const hit = data && data[3] > 0; // transparent pixels have zero for data[3]
		//         map.getTargetElement().style.cursor = hit ? "pointer" : "";
		//     });
		// }

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
		<div style={{ position: "relative" }}>
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
			{/*Selection*/}
			<>selection panel</>
		</div>
	);
};

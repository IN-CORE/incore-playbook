import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map as OLMap, View, Feature } from "ol";
// import {defaults as defaultControls} from "ol/control";
import Overlay from "ol/Overlay";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from "ol/style/Stroke";
import {VectorLayer} from "ol/layer";
import VectorSource from "ol/source/Vector";


import LayerSwitcher from "./LayerSwitcher";
import { setMarkerFeature } from "../../../actions/map";

export const MapContext = React.createContext({});

const Map = (props) => {
	const { children, id, className } = props;

	const markerFeature = useSelector((state) => state.maps.markerFeature);
	const dispatch = useDispatch();

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

<<<<<<< Updated upstream
=======
		let damageLayerGrp = null;
		layers.forEach((layerGrp) => {
			if (layerGrp.getProperties().title === "Damage") {
				damageLayerGrp = layerGrp
			}
		})

		

		if ((damageLayerGrp !== null) && allowBuildingSelection && setSelectedBuilding !== undefined) {
			const view  = map.getView();
			const viewProjection = view.getProjection();
    		const viewResolution = view.getResolution();

			const damageLayer = damageLayerGrp.getLayers().getArray()[0]
			const damageLayerSource = damageLayer.getSource()

			var markerStyle = new Style({
				image: new CircleStyle({
					  radius: 7,
					  fill: new Fill({color: 'black'}),
					  stroke: new Stroke({
						color: 'white',
						width: 2,
					  }),
				}),
			})

			var vectorSource = new VectorSource({
				features: []
			});
			
			var markerLayer = new VectorLayer({
				title: "BuildingPointMarker",
				source: vectorSource
			});

			map.addLayer(markerLayer);

			map.on('singleclick', (evt) => {
				console.log(evt.coordinate)

				var markerGeometry = new Point(evt.coordinate);
				var markerFeature = new Feature({
					geometry: markerGeometry,
					visible: true
				});

				markerFeature.setStyle(markerStyle);
				

				const url = damageLayerSource.getFeatureInfoUrl(
				  	evt.coordinate,
				  	viewResolution,
				  	viewProjection,
				  	{'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50}
				);
				if (url) {
					setLoading(true)
				  	fetch(url)
						.then((response) => response.json())
						.then((json) => {
							vectorSource.addFeature(markerFeature);
							setSelectedBuilding(json.features[0].properties)
							dispatch(setMarkerFeature(markerFeature));
							setLoading(false)
						});
				} else {
					setSelectedBuilding(null)
					vectorSource.clear();
				}
			});

			map.on('pointermove', (evt) => {
				if (evt.dragging) {
					return;
				}
				const data = damageLayer.getData(evt.pixel);
				const hit = data && data[3] > 0; // transparent pixels have zero for data[3]
				map.getTargetElement().style.cursor = hit ? 'pointer' : '';
			});
		} else if (allowBuildingSelection && setSelectedBuilding === undefined) {
			console.error("If allowBuildingSelection is true, setSelectedBuilding must be passed as a prop.")
		}

>>>>>>> Stashed changes
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

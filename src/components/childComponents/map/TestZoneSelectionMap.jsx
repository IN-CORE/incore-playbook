import { useSelector } from "react-redux";
import * as React from "react";
import { useEffect, useState } from "react";
import { basicLayers, generateLayers } from "../../../utils/map";
import { applyTransform } from "ol/extent";
import { fromLonLat, getTransform } from "ol/proj";
import { ZoneSelectionMap } from "./ZoneSelectionMap";

export const TestZoneSelectionMap = () => {
	const mapConfig = useSelector((state) => state.config.mapConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [zoneLayer, setZoneLayer] = useState(null);
	const activeLayerName = "Zone";

	useEffect(() => {
		const layerDef = [
			{
				layerId: "65ea380c4331420c85ddb211",
				// TODO
				layerStyles: mapConfig.LAYER_STYLES.Zone,
				title: "SLC Municipal Boundary",
				opacity: 1,
				zIndex: 1,
			},
		];
		const tmp = generateLayers(globalConfig, layerDef, activeLayerName);
		setZoneLayer(tmp);
	}, []);

	return (
		<>
			{basicLayers && zoneLayer ? (
				<ZoneSelectionMap
					className="fillContainer-ZoneSelectionMap"
					zoom={mapConfig.ZOOM}
					minZoom={mapConfig.MIN_ZOOM}
					maxZoom={mapConfig.MAX_ZOOM}
					extent={applyTransform(
						mapConfig.MAP_BOUNDS,
						getTransform("EPSG:4326", "EPSG:3857"),
					)}
					center={fromLonLat(mapConfig.MAP_CENTER)}
					layers={[basicLayers, zoneLayer]}
					activeLayerName={activeLayerName}
					layerSwitcherOptions={{}}
				/>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
};

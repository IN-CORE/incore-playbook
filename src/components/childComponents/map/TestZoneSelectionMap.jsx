import { useSelector } from "react-redux";
import * as React from "react";
import { useEffect, useState } from "react";
import { basicLayers } from "../../../utils/map";
import { applyTransform } from "ol/extent";
import { fromLonLat, getTransform } from "ol/proj";
import { ZoneSelectionMap } from "./ZoneSelectionMap";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Fill, Stroke, Style } from "ol/style";

export const TestZoneSelectionMap = () => {
	const mapConfig = useSelector((state) => state.config.mapConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [zoneLayer, setZoneLayer] = useState(null);

	useEffect(() => {
		// Construct the WFS request URL
		const wfsUrl = `${globalConfig.geoServerWFS}&typeName=incore:65ea380c4331420c85ddb211`;

		const zoneLayer = new VectorLayer({
			title: "Zone",
			source: new VectorSource({
				format: new GeoJSON(),
				url: wfsUrl,
			}),
			style: new Style({
				fill: new Fill({
					color: "rgba(238, 238, 238, 0)",
				}),
				stroke: new Stroke({
					color: "#777777",
					width: 1,
				}),
			}),
		});
		setZoneLayer(zoneLayer);
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
					layerSwitcherOptions={{}}
					activeLayerNames={"Zone"}
				/>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
};

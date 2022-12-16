import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";
import GroupLayer from "ol/layer/Group";
import {globals as defaultGlobalConfig} from "../globals";
import XYZ from "ol/source/XYZ";
import OSM, {ATTRIBUTION as OSM_ATTRIBUTION} from "ol/source/OSM";

export const generateLayers = (globalConfig=defaultGlobalConfig, layerDef) => {
	return layerDef.reduce((previewLayers, layerDefinition) => {
		const source = new TileWMS({
			url: `${globalConfig.geoServerWMS}`,
			params: {LAYERS: layerDefinition.layerId, STYLES: layerDefinition.layerStyles},
			ratio: 1,
			serverType: "geoserver",
			crossOrigin: "anonymous"
		});
		const previewLayer = new TileLayer({
			title: layerDefinition["title"],
			source: source,
			zIndex: layerDefinition["zIndex"],
			opacity: layerDefinition["opacity"]
		});
		return [...previewLayers, previewLayer];
	}, []);
};

export const basicLayers = {
	basemaps: new GroupLayer({
		title: "Base Maps",
		layers: [
			new TileLayer({
				type: "base",
				visible: true,
				title: "Carto",
				source: new XYZ({
					url: "https://{a-d}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
					attributions: [
						"&#169; <a href=\"https://www.carto.com\">Carto</a>,",
						OSM_ATTRIBUTION
					],
					crossOrigin: "anonymous"
				})
			}),
			new TileLayer({
				type: "base",
				visible: false,
				title: "OSM",
				source: new OSM({
					crossOrigin: "anonymous"
				})
			}),
		]
	}),
	tilelayer: new GroupLayer({
		title: "Damage",
		layers: []
	})
};

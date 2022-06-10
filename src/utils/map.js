import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";
import GroupLayer from "ol/layer/Group";
import {globals as defaultGlobalConfig} from "../globals";
import XYZ from "ol/source/XYZ";
import OSM, {ATTRIBUTION as OSM_ATTRIBUTION} from "ol/source/OSM";

export const handleLayerUpdate = (globalConfig=defaultGlobalConfig, layerDef) => {

	const layers = basicLayers;

	const inputLayers = [];

	layerDef.map((layerDefinition) => {
		const source = new TileWMS({
			url: `${globalConfig.geoServerWMS}`,
			params: {
				LAYERS: layerDefinition["layerId"],
				STYLES: layerDefinition["layerStyles"]
			},
			ratio: 1,
			serverType: "geoserver"
		});
		let mapLayer = new TileLayer({
			title: layerDefinition["title"],
			source: source,
			zIndex: 1,
			opacity: layerDefinition["opacity"]
		});
		inputLayers.push(mapLayer);
	});

	layers["tilelayer"] = new GroupLayer({
		title: "Preview",
		layers: inputLayers,
	});

	return layers;
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
					]
				})
			}),
			new TileLayer({
				type: "base",
				visible: false,
				title: "OSM",
				source: new OSM()
			}),
		]
	}),
	tilelayer: new GroupLayer({
		title: "Damage",
		layers: []
	})
};

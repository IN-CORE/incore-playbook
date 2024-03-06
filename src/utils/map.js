import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";
import GroupLayer from "ol/layer/Group";
import { globals as defaultGlobalConfig } from "../globals";
import { mapConfig as defaultMapConfig } from "../map.config";
import XYZ from "ol/source/XYZ";
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from "ol/source/OSM";

export const generateLayers = (
	globalConfig = defaultGlobalConfig,
	layerDef,
	layerGroupTitle = "Damage",
) => {
	return layerDef.reduce((previewLayers, layerDefinition) => {
		const source = new TileWMS({
			url: `${globalConfig.geoServerWMS}`,
			params: {
				LAYERS: layerDefinition.layerId,
				STYLES: layerDefinition.layerStyles,
			},
			ratio: 1,
			transition: 0,
			serverType: "geoserver",
			crossOrigin: "anonymous",
		});
		const previewLayer = new TileLayer({
			title: layerDefinition["title"],
			source: source,
			zIndex: layerDefinition["zIndex"],
			opacity: layerDefinition["opacity"],
		});
		return new GroupLayer({
			title: layerGroupTitle,
			layers: [...previewLayers, previewLayer],
		});
	}, []);
};

// helper function to construct a single layer of tilelayer
const _constructHazardLayer = (
	globalConfig = defaultGlobalConfig,
	layerId,
	layerTitle,
	style,
	zIndex = 1,
	opacity = 1,
) => {
	let HazardMapLayer;
	if (layerId && layerTitle) {
		const source = new TileWMS({
			url: `${globalConfig.geoServerWMS}`,
			params: { LAYERS: layerId, STYLES: style },
			ratio: 1,
			transition: 0,
			serverType: "geoserver",
			crossOrigin: "anonymous",
		});
		HazardMapLayer = new TileLayer({
			title: layerTitle,
			source: source,
			zIndex: zIndex,
			opacity: opacity,
		});
	}
	return HazardMapLayer;
};

// helper function to construct the layer
export const getHazardGroupLayers = (
	globalConfig = defaultGlobalConfig,
	mapConfig = defaultMapConfig,
	json,
	htype,
	zIndex = 1,
	opacity = 1,
) => {
	let layerId;
	let layerTitle;
	let style = mapConfig.LAYER_STYLES.MapUtil[htype];

	let HazardMapLayers = [];

	if ("hazardDatasets" in json && json["hazardDatasets"].length > 0) {
		json["hazardDatasets"].map((hazardDataset) => {
			layerId = hazardDataset["datasetId"];
			layerTitle = `${json["name"]} - ${hazardDataset["demandType"]}`;
			HazardMapLayers.push(
				_constructHazardLayer(
					globalConfig,
					layerId,
					layerTitle,
					style[hazardDataset["demandType"]],
					zIndex,
					opacity,
				),
			);
		});
	}

	return new GroupLayer({ title: json["name"], layers: HazardMapLayers });
};

export const basicLayers = new GroupLayer({
	title: "Base Maps",
	layers: [
		new TileLayer({
			type: "base",
			title: "OSM",
			visible: false,
			source: new XYZ({
				url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
				attributions: [
					OSM_ATTRIBUTION,
					"Tiles courtesy of " +
						'<a href="http://openstreetmap.org">' +
						"OpenStreetMap" +
						"</a>",
				],
				crossOrigin: "anonymous",
			}),
		}),
		new TileLayer({
			type: "base",
			title: "Esri Satellite Layer",
			visible: true,
			source: new XYZ({
				url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
				attributions: [
					'&#169; <a href="https://www.esri.com">Esri</a>,',
					OSM_ATTRIBUTION,
				],
				crossOrigin: "anonymous",
			}),
		}),
		new TileLayer({
			type: "base",
			title: "Carto",
			visible: true,
			source: new XYZ({
				url: "https://{a-d}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
				attributions: [
					'&#169; <a href="https://www.carto.com">Carto</a>,',
					OSM_ATTRIBUTION,
				],
				crossOrigin: "anonymous",
			}),
		}),
	],
});

export const validateCoord = (lon, lat, boundingBox) => {
	return (
		lon &&
		lat &&
		parseFloat(lon) &&
		parseFloat(lat) &&
		!isNaN(parseFloat(lon)) &&
		!isNaN(parseFloat(lat)) &&
		parseFloat(lon) > boundingBox[0] &&
		parseFloat(lon) < boundingBox[2] &&
		parseFloat(lat) < boundingBox[1] &&
		parseFloat(lat) > boundingBox[3]
	);
};

// Function to generate basicLayers objects
export function createBasicLayers(title) {
	return new GroupLayer({
		title: title,
		layers: [
			new TileLayer({
				type: "base",
				title: "OSM",
				visible: false,
				source: new XYZ({
					url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
					attributions: [
						OSM_ATTRIBUTION,
						"Tiles courtesy of " +
							'<a href="http://openstreetmap.org">' +
							"OpenStreetMap" +
							"</a>",
					],
					crossOrigin: "anonymous",
				}),
			}),
			new TileLayer({
				type: "base",
				title: "Esri Satellite Layer",
				visible: true,
				source: new XYZ({
					url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
					attributions: [
						'&#169; <a href="https://www.esri.com">Esri</a>,',
						OSM_ATTRIBUTION,
					],
					crossOrigin: "anonymous",
				}),
			}),
			new TileLayer({
				type: "base",
				title: "Carto",
				visible: true,
				source: new XYZ({
					url: "https://{a-d}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
					attributions: [
						'&#169; <a href="https://www.carto.com">Carto</a>,',
						OSM_ATTRIBUTION,
					],
					crossOrigin: "anonymous",
				}),
			}),
		],
	});
}

const layerStyles = {
	BldgDamage: "incore:bldg-dmg-summary",
	BldgFunctionality: "incore:joplin-bldg-func",
	BldgMCS: "incore:joplin-bldg-mcs",
	Interdependency: "incore:joplin-substations-label",
	PoleDamage: "incore:epf-dmg-summary",
	PopulationDislocation: {
		bldgMaxDamageStateINCOREId: "incore:bldg-dmg-summary",
		popdislHeatmapINCOREId: "incore:heatmap"
	},
	SubstationDamage: "incore:epf-dmg-summary",
	MapUtil: {
		earthquake: "incore:earthquake-pga-g",
		tornado: "incore:tornado",
		hurricane: {
			"waveHeight": "incore:hurricane-wave-height",
			"surgeLevel": "incore:hurricane-surge-level",
			"inundationDuration": "incore:hurricane-inundation-duration",
			"inundationDepth": "incore:hurricane-inundation-depth",
			"wavePeriod": "incore:hurricane-wave-period",
			"waveDirection": "incore:hurricane-wave-direction",
			"waterVelocity": "incore:hurricane-water-velocity",
			"windVelocity": "incore:hurricane-wind"
		},
		tsunami: {},
		floods: {}
	}
};

// // joplin
// const mapConfig = {
// 	MAP_BOUNDS:[
// 		-94.818621,
// 		37.377222,
// 		-94.192626,
// 		36.816347,
// 	],
// 	MAP_CENTER: [-94.4980, 37.0672],
// 	ZOOM: 5,
// 	MIN_ZOOM: 4,
// 	MAX_ZOOM: 15,
// 	LAYER_STYLES: layerStyles
// };

// // seaside
// const mapConfig = {
// 	MAP_BOUNDS:[
// 		-122.108613,
// 		36.899902,
// 		-121.508613,
// 		36.299902,
// 	],
// 	MAP_CENTER: [-121.808613, 36.599902],
// 	ZOOM: 5,
// 	MIN_ZOOM: 4,
// 	MAX_ZOOM: 15,
// 	LAYER_STYLES: layerStyles
// };

// // memphis
// const mapConfig = {
// 	MAP_BOUNDS:[
// 		-90.347817,
// 		35.436082,
// 		-89.747817,
// 		34.836082,
// 	],
// 	MAP_CENTER: [-90.047817, 35.136082],
// 	ZOOM: 5,
// 	MIN_ZOOM: 4,
// 	MAX_ZOOM: 15,
// 	LAYER_STYLES: layerStyles
// };

// galveston
export const mapConfig = {
	MAP_BOUNDS: [
		-96.211436,
		27.941297,
		-93.611436,
		30.541297
	],
	MAP_CENTER: [-94.911436, 29.241297],
	ZOOM: 5,
	MIN_ZOOM: 4,
	MAX_ZOOM: 15,
	LAYER_STYLES: layerStyles
};

// // lumberton
// const mapConfig = {
// 	MAP_BOUNDS:[
// 		-79.306172,
// 		34.333583,
// 		-78.706172,
// 		34.933583,
// 	],
// 	MAP_CENTER: [-79.006172, 34.633583],
// 	ZOOM: 5,
// 	MIN_ZOOM: 4,
// 	MAX_ZOOM: 15,
// 	LAYER_STYLES: layerStyles
// };

// // Salt Lake City
// export const mapConfig = {
// 	MAP_BOUNDS:[
// 		-112.625,
// 		41.240,
// 		-111.282,
// 		40.126,
// 	],
// 	HAZARD_BOUNDS:[
// 		-112.312,
// 		41,
// 		-111.462,
// 		40.277
// 	],
// 	MAP_CENTER: [-111.954, 40.683],
// 	ZOOM: 5,
// 	MIN_ZOOM: 4,
// 	MAX_ZOOM: 15,
//  LAYER_STYLES: layerStyles
// };

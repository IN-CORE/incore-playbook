const layerStyles = {
	BldgDamage: "incore:bldg-dmg-summary",
	BldgFunctionality: "incore:bldg-func",
	BldgMCS: "incore:bldg-mcs",
	Interdependency: "incore:substations-label",
	PoleDamage: "incore:epf-dmg-summary",
	PopulationDislocation: {
		bldgMaxDamageStateINCOREId: "incore:bldg-dmg-summary",
		popdislHeatmapINCOREId: "incore:heatmap",
	},
	SubstationDamage: "incore:epf-dmg-summary",
	MapUtil: {
		earthquake: "incore:earthquake-pga-g",
		tornado: "incore:tornado",
		hurricane: {
			waveHeight: "incore:hurricane-wave-height",
			surgeLevel: "incore:hurricane-surge-level",
			inundationDuration: "incore:hurricane-inundation-duration",
			inundationDepth: "incore:hurricane-inundation-depth",
			wavePeriod: "incore:hurricane-wave-period",
			waveDirection: "incore:hurricane-wave-direction",
			waterVelocity: "incore:hurricane-water-velocity",
			windVelocity: "incore:hurricane-wind",
		},
		tsunami: {},
		floods: {},
	},
};

// joplin
const mapConfig = {
	MAP_BOUNDS: [-94.818621, 37.377222, -94.192626, 36.816347],
	MAP_CENTER: [-94.498, 37.0672],
	ZOOM: 5,
	MIN_ZOOM: 4,
	MAX_ZOOM: 19,
	LAYER_STYLES: layerStyles,
};

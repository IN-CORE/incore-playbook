import {UPDATE_MAP_CONFIG, SET_ALLOWED_HAZARD_TYPES, UPDATE_ASSET_CONFIG, SET_ALLOWED_DATA_TYPES} from "../actions/config";
import {mapConfig as defaultMapConfig} from "../map.config";
import {assetConfig as defaultAssetConfig} from "../asset.config";

const defaultConfig = {
	mapConfig: defaultMapConfig,
	assetConfig: defaultAssetConfig,
	allowedHazardTypes: ["earthquakes", "tornadoes", "tsunamis", "hurricanes", "floods"],
	allowedDataTypes: {
		building: true,
		epf: true,
		network: true,
		socioeconomics: true
	}
};

const config =  (state = defaultConfig, action) => {
	switch (action.type) {
	case UPDATE_MAP_CONFIG:
		return Object.assign({}, state, {mapConfig: action.mapConfig});
	case UPDATE_ASSET_CONFIG:
		return Object.assign({}, state, {assetConfig: action.assetConfig});
	case SET_ALLOWED_HAZARD_TYPES:
		return Object.assign({}, state, {allowedHazardTypes: action.allowedHazardTypes});
	case SET_ALLOWED_DATA_TYPES:
		return Object.assign({}, state, {allowedDataTypes: action.allowedDataTypes});
	default:
		return state;
	}
};

export default config;

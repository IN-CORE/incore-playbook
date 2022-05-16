import {UPDATE_MAP_CONFIG, SET_ALLOWED_HAZARD_TYPES, UPDATE_ASSET_CONFIG} from "../actions/config";
import {mapConfig as defaultMapConfig} from "../map.config";
import {assetConfig as defaultAssetConfig} from "../asset.config";

const defaultConfig = {
	mapConfig:defaultMapConfig,
	assetConfig: defaultAssetConfig,
	allowedHazardTypes: ["earthquakes", "tornadoes", "tsunamis", "hurricanes", "floods"]
};

const config =  (state = defaultConfig, action) => {
	switch (action.type) {
	case UPDATE_MAP_CONFIG:
		return Object.assign({}, state, {mapConfig: action.mapConfig});
	case UPDATE_ASSET_CONFIG:
		return Object.assign({}, state, {assetConfig: action.assetConfig});
	case SET_ALLOWED_HAZARD_TYPES:
		return Object.assign({}, state, {allowedHazardTypes: action.allowedHazardTypes});
	default:
		return state;
	}
};

export default config;

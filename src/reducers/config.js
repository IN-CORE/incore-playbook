import {UPDATE_MAP_CONFIG, SET_ALLOWED_HAZARD_TYPES} from "../actions/config";
import {defaultMapConfig} from "../map.config";

const defaultConfig = {
	mapConfig:defaultMapConfig,
	allowedHazardTypes: ["earthquakes", "tornadoes", "tsunamis", "hurricanes", "floods"]
};

const config =  (state = defaultConfig, action) => {
	switch (action.type) {
	case UPDATE_MAP_CONFIG:
		return Object.assign({}, state, {mapConfig: action.mapConfig});
	case SET_ALLOWED_HAZARD_TYPES:
		return Object.assign({}, state, {allowedHazardTypes: action.allowedHazardTypes});
	default:
		return state;
	}
};

export default config;

import {UPDATE_MAP_CONFIG} from "../actions/config";
import {mapConfigs as defaultMapConfig} from "../map.config";

const defaultConfig = {
	mapConfig:defaultMapConfig
};

export default (state = defaultConfig, action) => {
	switch (action.type) {
	case UPDATE_MAP_CONFIG:
		return Object.assign({}, state, {mapConfig: action.mapConfig});
	default:
		return state;
	}
};

import {
	UPDATE_MAP_CONFIG,
	SET_ALLOWED_HAZARD_TYPES,
	UPDATE_ASSET_CONFIG,
	SET_ALLOWED_DATA_TYPES,
	UPDATE_DATAWOLF_CONFIG,
	UPDATE_GLOBAL_CONFIG,
	UPDATE_DATAWOLF_WORKFLOW_CONFIG
} from "../actions/config";
import { mapConfig as defaultMapConfig } from "../map.config";
import { assetConfig as defaultAssetConfig } from "../asset.config";
import { datawolfConfig as defaultDatawolfConfig } from "../datawolf.config.js";
import { datawolfWorkflowConfig as defaultDatawolfWorkflowConfig } from "../datawolf.config.js";
import { globals as defaultGlobalConfig } from "../globals";

const defaultConfig = {
	mapConfig: defaultMapConfig,
	assetConfig: defaultAssetConfig,
	datawolfConfig: defaultDatawolfConfig,
	datawolfWorkflowConfig: defaultDatawolfWorkflowConfig,
	globalConfig: defaultGlobalConfig,
	allowedHazardTypes: ["earthquake", "tornado", "tsunami", "hurricane", "flood"],
	allowedDataTypes: {
		building: true,
		epf: true,
		network: true,
		socioeconomics: true
	}
};

const config = (state = defaultConfig, action) => {
	switch (action.type) {
		case UPDATE_MAP_CONFIG:
			return Object.assign({}, state, { mapConfig: action.mapConfig });
		case UPDATE_ASSET_CONFIG:
			return Object.assign({}, state, { assetConfig: action.assetConfig });
		case UPDATE_DATAWOLF_CONFIG:
			return Object.assign({}, state, { datawolfConfig: action.datawolfConfig });
		case UPDATE_DATAWOLF_WORKFLOW_CONFIG:
			return Object.assign({}, state, { datawolfWorkflowConfig: action.datawolfWorkflowConfig });
		case UPDATE_GLOBAL_CONFIG:
			return Object.assign({}, state, { globalConfig: action.globalConfig });
		case SET_ALLOWED_HAZARD_TYPES:
			return Object.assign({}, state, { allowedHazardTypes: action.allowedHazardTypes });
		case SET_ALLOWED_DATA_TYPES:
			return Object.assign({}, state, { allowedDataTypes: action.allowedDataTypes });
		default:
			return state;
	}
};

export default config;

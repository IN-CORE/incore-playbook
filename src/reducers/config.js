import {
	SET_ALLOWED_DATA_TYPES,
	SET_ALLOWED_HAZARD_TYPES,
	UPDATE_ASSET_CONFIG,
	UPDATE_CGE_INFO,
	UPDATE_DATAWOLF_CONFIG,
	UPDATE_DATAWOLF_RS_CONFIG,
	UPDATE_DATAWOLF_RS_WORKFLOW_CONFIG,
	UPDATE_DATAWOLF_WORKFLOW_CONFIG,
	UPDATE_GLOBAL_CONFIG,
	UPDATE_HHS_INFO,
	UPDATE_MAP_CONFIG,
} from "../actions/config";
import { mapConfig as defaultMapConfig } from "../map.config";
import { assetConfig as defaultAssetConfig } from "../asset.config";
import {
	datawolfConfig as defaultDatawolfConfig,
	datawolfWorkflowConfig as defaultDatawolfWorkflowConfig,
} from "../datawolf.config.js";

import {
	datawolfRsConfig as defaultDatawolfRsConfig,
	datawolfRsWorkflowConfig as defaultDatawolfRsWorkflowConfig,
} from "../datawolfRs.config.js";

import { globals as defaultGlobalConfig } from "../globals";
import {
	cgeInfo as defaultCgeConfig,
	hhsInfo as defaultHhsConfig,
} from "../messages.config";

const defaultConfig = {
	mapConfig: defaultMapConfig,
	assetConfig: defaultAssetConfig,
	datawolfConfig: defaultDatawolfConfig,
	datawolfRsConfig: defaultDatawolfRsConfig,
	datawolfWorkflowConfig: defaultDatawolfWorkflowConfig,
	datawolfRsWorkflowConfig: defaultDatawolfRsWorkflowConfig,
	globalConfig: defaultGlobalConfig,
	allowedHazardTypes: [
		"earthquake",
		"tornado",
		"tsunami",
		"hurricane",
		"flood",
	],
	allowedDataTypes: {
		building: true,
		retrofitStrategies: true,
		epf: true,
		network: true,
		socioeconomics: true,
	},
	cgeInfo: defaultCgeConfig,
	hhsInfo: defaultHhsConfig,
};

const config = (state = defaultConfig, action) => {
	switch (action.type) {
		case UPDATE_MAP_CONFIG:
			return Object.assign({}, state, { mapConfig: action.mapConfig });
		case UPDATE_ASSET_CONFIG:
			return Object.assign({}, state, { assetConfig: action.assetConfig });
		case UPDATE_DATAWOLF_CONFIG:
			return Object.assign({}, state, {
				datawolfConfig: action.datawolfConfig,
			});
		case UPDATE_DATAWOLF_WORKFLOW_CONFIG:
			return Object.assign({}, state, {
				datawolfWorkflowConfig: action.datawolfWorkflowConfig,
			});
		// Retrofit strategy flow
		case UPDATE_DATAWOLF_RS_CONFIG:
			return Object.assign({}, state, {
				datawolfRsConfig: action.datawolfRsConfig,
			});
		case UPDATE_DATAWOLF_RS_WORKFLOW_CONFIG:
			return Object.assign({}, state, {
				datawolfRsWorkflowConfig: action.datawolfRsWorkflowConfig,
			});
		case UPDATE_GLOBAL_CONFIG:
			return Object.assign({}, state, { globalConfig: action.globalConfig });
		case SET_ALLOWED_HAZARD_TYPES:
			return Object.assign({}, state, {
				allowedHazardTypes: action.allowedHazardTypes,
			});
		case SET_ALLOWED_DATA_TYPES:
			return Object.assign({}, state, {
				allowedDataTypes: action.allowedDataTypes,
			});
		case UPDATE_CGE_INFO:
			return Object.assign({}, state, { cgeInfo: action.cgeInfo });
		case UPDATE_HHS_INFO:
			return Object.assign({}, state, { hhsInfo: action.hhsInfo });
		default:
			return state;
	}
};

export default config;

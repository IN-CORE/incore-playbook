export const UPDATE_MAP_CONFIG = "UPDATE_MAP_CONFIG";
export const updateMapConfig = (config) => ({
	type: UPDATE_MAP_CONFIG,
	mapConfig: config,
	receivedAt: Date.now(),
});

export const UPDATE_ASSET_CONFIG = "UPDATE_ASSET_CONFIG";
export const updateAssetConfig = (config) => ({
	type: UPDATE_ASSET_CONFIG,
	assetConfig: config,
	receivedAt: Date.now(),
});

export const UPDATE_DATAWOLF_CONFIG = "UPDATE_DATAWOLF_CONFIG";
export const updateDatawolfConfig = (config) => ({
	type: UPDATE_DATAWOLF_CONFIG,
	datawolfConfig: config,
	receivedAt: Date.now(),
});

export const UPDATE_GLOBAL_CONFIG = "UPDATE_GLOBAL_CONFIG";
export const updateGlobalConfig = (config) => ({
	type: UPDATE_GLOBAL_CONFIG,
	globalConfig: config,
	receivedAt: Date.now(),
});

export const SET_ALLOWED_HAZARD_TYPES = "SET_ALLOWED_HAZARD_TYPES";
export const setAllowedHazardTypes = (hazardTypes) => ({
	type: SET_ALLOWED_HAZARD_TYPES,
	allowedHazardTypes: hazardTypes,
	receivedAt: Date.now(),
});

export const SET_ALLOWED_DATA_TYPES = "SET_ALLOWED_DATA_TYPES";
export const setAllowedDataTypes = (dataTypes) => ({
	type: SET_ALLOWED_DATA_TYPES,
	allowedDataTypes: dataTypes,
	receivedAt: Date.now(),
});

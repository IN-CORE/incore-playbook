export const UPDATE_MAP_CONFIG = "UPDATE_MAP_CONFIG";
export const updateMapConfig = (config) => ({
	type: UPDATE_MAP_CONFIG,
	mapConfig: config,
	receivedAt: Date.now(),
});

export const SET_ALLOWED_HAZARD_TYPES = "SET_ALLOWED_HAZARD_TYPES";
export const setAllowedHazardTypes = (hazardTypes) => ({
	type: SET_ALLOWED_HAZARD_TYPES,
	allowedHazardTypes: hazardTypes,
	receivedAt: Date.now(),
});

export const UPDATE_MAP_CONFIG = "UPDATE_MAP_CONFIG";
export const updateMapConfig = (config) => ({
	type: UPDATE_MAP_CONFIG,
	mapConfig: config,
	receivedAt: Date.now(),
});

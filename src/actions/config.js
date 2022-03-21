export const UPDATE_MAP_CONFIG = "UPDATE_MAP_CONFIG";
export function updateMapConfig(type, config){
	return (dispatch) => {
		dispatch({
			type: type,
			mapConfig: config,
			receivedAt: Date.now(),
		});
	};
}

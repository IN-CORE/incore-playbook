import { globals as defaultGlobalConfig } from "../globals";
import { getHeader, getHazardTypePlural } from "../utils/common";

export const LOGIN_ERROR = "LOGIN_ERROR";

export function receiveHazards(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			hazards: json,
			receivedAt: Date.now(),
		});
	};
}

export function fetchHazards(
	globalConfig = defaultGlobalConfig,
	hazardType = "tornadoes",
	limit = 20,
	offset = 0,
	sort = "desc",
	orderBy = "date",
) {
	hazardType = getHazardTypePlural(hazardType);
	let endpoint = `${globalConfig.hazardServiceBase}${hazardType}?limit=${limit}&skip=${offset}&sort=${sort}&sortBy=${orderBy}`;

	let space = globalConfig.testbedSpace;
	if (space !== undefined) endpoint = `${endpoint}&space=${space}`;

	return (dispatch) => {
		return fetch(endpoint, {
			mode: "cors",
			headers: getHeader(globalConfig.hostname),
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveHazards(`RECEIVE_${hazardType.toUpperCase()}`, json));
				});
			} else if (response.status === 401) {
				// TODO Auth Failed
				dispatch(receiveHazards(LOGIN_ERROR, []));
			} else {
				// TODO Request Failed
				dispatch(receiveHazards(`RECEIVE_${hazardType.toUpperCase()}`, []));
			}
		});
	};
}

import config from "../app.config";
import {getHeader, getCurrUsername} from "../utils/common";

export const LOGIN_ERROR = "LOGIN_ERROR";

export function receiveHazards(type, json){
	return (dispatch) => {
		dispatch({
			type: type,
			hazards: json,
			receivedAt: Date.now(),
		});
	};
}

export function fetchHazards(hazardType="tornadoes", limit=20, offset=0){
	let endpoint = `${config.hazardServiceBase}${hazardType}?limit=${limit}&skip=${offset}`;

	// default to current user's space
	let space = getCurrUsername();
	if (space !== undefined) endpoint = `${endpoint}&space=${space}`;

	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response => {
				if (response.status === 200) {
					response.json().then(json => {
						dispatch(receiveHazards(`RECEIVE_${hazardType.toUpperCase()}`, json));
					});
				}
				else if (response.status === 401) {
				// TODO Auth Failed
					dispatch(receiveHazards(LOGIN_ERROR, []));
				}
				else {
				// TODO Request Failed
					dispatch(receiveHazards(`RECEIVE_${hazardType.toUpperCase()}`, []));
				}
			});
	};
}

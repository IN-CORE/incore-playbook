import config from "../app.config";
import {getHeader, getCurrUsername} from "../utils/common";

export const RECEIVE_TORNADOES = "RECEIVE_TORNADOES";
export const LOGIN_ERROR = "LOGIN_ERROR";

export function receiveTornadoes(type, json){
	return (dispatch) => {
		dispatch({
			type: type,
			tornadoes: json,
			receivedAt: Date.now(),
		});
	};
}

export function fetchTornadoes(limit=5, offset=0){
	let endpoint = `${config.hazardServiceBase}tornadoes?limit=${limit}&skip=${offset}`;

	// default to current user's space
	let space = getCurrUsername();
	if (space !== undefined) endpoint = `${endpoint}&space=${space}`;

	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response => {
				if (response.status === 200) {
					response.json().then(json => {
						dispatch(receiveTornadoes(RECEIVE_TORNADOES, json));
					});
				}
				else if (response.status === 401) {
				// TODO Auth Failed
					dispatch(receiveTornadoes(LOGIN_ERROR, []));
				}
				else {
				// TODO Request Failed
					dispatch(receiveTornadoes(RECEIVE_TORNADOES, []));
				}
			});
	};
}

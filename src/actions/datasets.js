import config from "../app.config";
import {getHeader, getCurrUsername} from "../utils/common";

export const RECEIVE_DATASETS = "RECEIVE_DATASETS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export function receiveDatasets(type, json){
	return (dispatch) => {
		dispatch({
			type: type,
			datasets: json,
			receivedAt: Date.now(),
		});
	};
}

export function fetchDatasets(limit=20, offset=0, dataType="ergo:buildingInventoryVer6"){
	let endpoint = `${config.dataServiceBase}datasets?limit=${limit}&skip=${offset}&type=${dataType}`;

	// default to current user's space
	let space = getCurrUsername();
	if (space !== undefined) endpoint = `${endpoint}&space=${space}`;

	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response => {
				if (response.status === 200) {
					response.json().then(json => {
						dispatch(receiveDatasets(RECEIVE_DATASETS, json));
					});
				}
				else if (response.status === 401) {
					// TODO Auth Failed
					dispatch(receiveDatasets(LOGIN_ERROR, []));
				}
				else {
					// TODO Request Failed
					dispatch(receiveDatasets(RECEIVE_DATASETS, []));
				}
			});
	};
}

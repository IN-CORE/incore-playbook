import config from "../app.config";
import {getHeader, getCurrUsername} from "../utils/common";

export const RECEIVE_BLDGS = "RECEIVE_BLDGS";
export const RECEIVE_EPFS = "RECEIVE_EPFS";
export const RECEIVE_INTERD = "RECEIVE_INTERD";
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

export function fetchDatasets(limit=20, offset=0, type="ergo:buildingInventoryVer6"){
	let endpoint = `${config.dataServiceBase}datasets?limit=${limit}&skip=${offset}&type=${type}`;

	// default to current user's space
	let space = getCurrUsername();
	if (space !== undefined) endpoint = `${endpoint}&space=${space}`;

	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response => {
				if (response.status === 200) {
					response.json().then(json => {
						if (type === "ergo:buildingInventoryVer6"){
							dispatch(receiveDatasets(RECEIVE_BLDGS, json));
						}
						else if (type === "incore:epf"){
							dispatch(receiveDatasets(RECEIVE_EPFS, json));
						}
						else if (type === "incore:buildingInterdependencyDict"){
							dispatch(receiveDatasets(RECEIVE_INTERD, json));
						}
					});
				}
				else if (response.status === 401) {
					// TODO Auth Failed
					dispatch(receiveDatasets(LOGIN_ERROR, []));
				}
				else {
					// TODO Request Failed
					dispatch(receiveDatasets(RECEIVE_BLDGS, []));
					dispatch(receiveDatasets(RECEIVE_EPFS, []));
					dispatch(receiveDatasets(RECEIVE_INTERD, []));
				}
			});
	};
}

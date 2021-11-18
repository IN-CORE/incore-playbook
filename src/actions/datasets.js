import config from "../app.config";
import {getHeader, getCurrUsername} from "../utils/common";
import {inputDatasetTypes} from "../globals";

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

export function fetchDatasets(limit=20, offset=0, type){
	let endpoint = `${config.dataServiceBase}datasets?limit=${limit}&skip=${offset}&type=${type}`;

	// default to current user's space
	let space = getCurrUsername();
	if (space !== undefined) endpoint = `${endpoint}&space=${space}`;

	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response => {
				if (response.status === 200) {
					response.json().then(json => {
						Object.keys(inputDatasetTypes).map((key) => {
							inputDatasetTypes[key].map((inputDatasetType) => {
								if (inputDatasetType["type"] === type){
									dispatch(receiveDatasets(inputDatasetType["dispatchKey"], json));
								}
							});
						});
					});
				}
				else if (response.status === 401) {
					// TODO Auth Failed
					dispatch(receiveDatasets(LOGIN_ERROR, []));
				}
				else {
					Object.keys(inputDatasetTypes).map((key) => {
						inputDatasetTypes[key].map((inputDatasetType) => {
							if (inputDatasetType["type"] === type){
								dispatch(receiveDatasets(inputDatasetType["dispatchKey"], []));
							}
						});
					});
				}
			});
	};
}

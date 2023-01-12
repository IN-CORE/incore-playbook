import {getHeader} from "../utils/common";
import {inputDatasetTypes} from "../globals";
import {globals as defaultGlobalConfig} from "../globals";

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

export function fetchDatasets(globalConfig=defaultGlobalConfig, limit=20, offset=0, type){
	let endpoint = `${globalConfig.dataServiceBase}datasets?limit=${limit}&skip=${offset}&type=${type}`;

	let space = globalConfig.testbedSpace;
	if (space !== undefined) endpoint = `${endpoint}&space=${space}`;

	return async (dispatch) => {
		const response = await fetch(endpoint, { mode: "cors", headers: getHeader() });
		if (response.status === 200) {
			response.json().then(json => {
				Object.keys(inputDatasetTypes).map((key) => {
					inputDatasetTypes[key].map((inputDatasetType) => {
						if (inputDatasetType["type"] === type) {
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
			Object.keys(inputDatasetTypes).map((key_1) => {
				inputDatasetTypes[key_1].map((inputDatasetType_1) => {
					if (inputDatasetType_1["type"] === type) {
						dispatch(receiveDatasets(inputDatasetType_1["dispatchKey"], []));
					}
				});
			});
		}
	};
}

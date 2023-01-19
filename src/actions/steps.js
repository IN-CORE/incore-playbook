import { getHeader } from "../utils/common";
import { globals as defaultGlobalConfig } from "../globals";


export const updateStepDispatcher = (type, data, step_id) => {
	return (dispatch) => {
		dispatch({
			type: type,
			step: data,
			step_id: step_id
		});
	};
};

export const getAllSteps = (globalConfig=defaultGlobalConfig) => {
	let endpoint = `${globalConfig.maestroServiceBase}steps`;

	return async (dispatch) => {
		const response = await fetch(endpoint, { mode: "cors", headers: getHeader(globalConfig.hostname) });
		if (response.status === 200) {
			response.json().then(json => {
				let step_status = {};
				for (let i = 0; i < json.length; i++) {
					step_status[`step_${json[i].step_id}_${json[i].substep_id}`] = json[i];
				}
				dispatch({
					type: "UPDATE_ALL_STEPS",
					steps: step_status
				});
			});
		} else if (response.status === 401) {
			dispatch({
				type: "LOGIN_ERROR"
			});
		} else {
			console.log(response.status, response);
		}
	};
};

export const getStep = (globalConfig=defaultGlobalConfig, stepId, substepId) => {
	let endpoint = `${globalConfig.maestroServiceBase}steps/${stepId}/${substepId}`;

	return async (dispatch) => {
		const response = await fetch(endpoint, { mode: "cors", headers: getHeader(globalConfig.hostname) });
		if (response.status === 200) {
			response.json().then(json => dispatch(updateStepDispatcher("UPDATE_STEP", json, `step_${stepId}_${substepId}`)));
		} else if (response.status === 401) {
			dispatch({
				type: "LOGIN_ERROR"
			});
		} else {
			console.log(response.status, response);
		}
	};
};

export const updateStep = (globalConfig=defaultGlobalConfig, stepId, substepId, status = null, docUri = null) => {
	let endpoint = `${globalConfig.maestroServiceBase}steps/${stepId}/${substepId}?`;
	if (status) endpoint = `${endpoint}status=${status}&`;
	if (docUri) endpoint = `${endpoint}doc_uri=${docUri}&`;

	return async (dispatch) => {
		const response = await fetch(endpoint, { mode: "cors", method: "PATCH", headers: getHeader(globalConfig.hostname) });
		if (response.status === 200) {
			response.json().then(json => {
				dispatch(updateStepDispatcher("UPDATE_STEP", json, `step_${stepId}_${substepId}`));
			});
		} else if (response.status === 401) {
			dispatch({
				type: "LOGIN_ERROR"
			});
		} else {
			console.log(response.status, response);
		}
	};
};

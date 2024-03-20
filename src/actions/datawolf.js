import { getCurrUsername, getHeader } from "../utils/common";

export const RECEIVE_EXECUTIONS = "RECEIVE_EXECUTIONS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export function receiveExecutions(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			executions: json,
			receivedAt: Date.now(),
		});
	};
}

export function fetchExecutions(datawolfConfig, all = false) {
	let endpoint = datawolfConfig.executionGetURL;
	// filter by current user's email
	if (!all)
		endpoint = `${endpoint}?email=${getCurrUsername(datawolfConfig.hostname)}`;

	return (dispatch) => {
		return fetch(endpoint, {
			mode: "cors",
			headers: getHeader(datawolfConfig.hostname),
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch(receiveExecutions(RECEIVE_EXECUTIONS, json));
				});
			} else if (response.status === 401) {
				// TODO Auth Failed
				dispatch(receiveExecutions(LOGIN_ERROR, []));
			} else {
				// TODO Request Failed
				dispatch(receiveExecutions(RECEIVE_EXECUTIONS, []));
			}
		});
	};
}

export const RECEIVE_EXECUTION_ITEM = "RECEIVE_EXECUTION_ITEM";

export function fetchExecutionItem(datawolfConfig, executionId) {
	let endpoint = `${datawolfConfig.executionPostURL}/${executionId}`;
	return (dispatch) => {
		return fetch(endpoint, {
			mode: "cors",
			headers: getHeader(datawolfConfig.hostname),
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					dispatch({
						type: RECEIVE_EXECUTION_ITEM,
						executionItem: json,
						receivedAt: Date.now(),
					});
				});
			} else if (response.status === 401) {
				// TODO Auth Failed
				dispatch({
					type: LOGIN_ERROR,
					executionItem: {},
					receivedAt: Date.now(),
				});
				dispatch(receiveExecutions(LOGIN_ERROR, []));
			} else {
				// TODO Request Failed
				dispatch({
					type: RECEIVE_EXECUTION_ITEM,
					executionItem: {},
					receivedAt: Date.now(),
				});
			}
		});
	};
}

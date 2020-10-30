import datawolfConfig from "../datawolf.config";
import {getHeader, getCurrUserEmail} from "../utils/common";

export const RECEIVE_EXECUTIONS = "RECEIVE_EXECUTIONS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export function receiveExecutions(type, json){
	return (dispatch) => {
		dispatch({
			type: type,
			executions: json,
			receivedAt: Date.now(),
		});
	};
}

export function fetchExecutions(){
	let endpoint = datawolfConfig.executionBaseURL;
	// filter by current user's email
	endpoint = `${endpoint}?email=${getCurrUserEmail()}`;

	return (dispatch) => {
		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then(response => {
				if (response.status === 200) {
					response.json().then(json => {
						dispatch(receiveExecutions(RECEIVE_EXECUTIONS, json));
					});
				}
				else if (response.status === 401) {
				// TODO Auth Failed
					dispatch(receiveExecutions(LOGIN_ERROR, []));
				}
				else {
				// TODO Request Failed
					dispatch(receiveExecutions(RECEIVE_EXECUTIONS, []));
				}
			});
	};
}

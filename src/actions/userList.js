import {getHeader} from "../utils/common";
import {globals as defaultGlobalConfig} from "../globals";


export const RECEIVE_USER_LIST = "RECEIVE_USER_LIST";
export const LOGIN_ERROR = "LOGIN_ERROR";

export function receiveUserList(type, json){
	return (dispatch) => {
		dispatch({
			type: type,
			userList: json,
			receivedAt: Date.now(),
		});
	};
}

export function fetchUserList(globalConfig=defaultGlobalConfig, limit=100, skip=0){
	return (dispatch) => {
		let endpoint = `${globalConfig.maestroServiceBase}users?limit=${limit}&skip=${skip}`;

		return fetch(endpoint, {mode: "cors", headers: getHeader()})
			.then((response) => {
				if (response.status === 200) {
					response.json().then(json =>{
						dispatch(receiveUserList(RECEIVE_USER_LIST, json));
					});
				}
				else if (response.status === 401) {
					// TODO Auth Failed
					dispatch(receiveUserList(LOGIN_ERROR, []));
				}
				else {
					dispatch(receiveUserList(RECEIVE_USER_LIST, []));
				}
			});
	};
}

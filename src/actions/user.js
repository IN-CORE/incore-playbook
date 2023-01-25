import {getHeader} from "../utils/common";
import {globals as defaultGlobalConfig} from "../globals";


export const RECEIVE_USER_LIST = "RECEIVE_USER_LIST";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ROLES = "RECEIVE_ROLES";
export const ASSIGN_ROLE = "ASSIGN_ROLE";
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

		return fetch(endpoint, {mode: "cors", headers: getHeader(globalConfig.hostname)})
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

export function fetchUser(globalConfig=defaultGlobalConfig, userId){
	return (dispatch) => {
		let endpoint = `${globalConfig.maestroServiceBase}users/${userId}`;

		return fetch(endpoint, {mode: "cors", headers: getHeader(globalConfig.hostname)})
			.then((response) => {
				if (response.status === 200) {
					response.json().then(json =>{
						dispatch({
							type: RECEIVE_USER,
							user: json,
							receivedAt: Date.now(),
						});
					});
				}
				else if (response.status === 401) {
				// TODO Auth Failed
					dispatch({
						type: LOGIN_ERROR,
						user: {},
						receivedAt: Date.now(),
					});				}
				else {
					dispatch({
						type: RECEIVE_USER,
						user: {},
						receivedAt: Date.now(),
					});
				}
			});
	};
}

export function fetchRoles(globalConfig=defaultGlobalConfig,limit=100, skip=0){
	return (dispatch) => {
		let endpoint = `${globalConfig.maestroServiceBase}roles?limit=${limit}&skip=${skip}`;

		return fetch(endpoint, {mode: "cors", headers: getHeader(globalConfig.hostname), method: "GET"})
			.then((response) => {
				if (response.status === 200) {
					response.json().then(json =>{
						dispatch({
							type: RECEIVE_ROLES,
							roles: json,
							receivedAt: Date.now(),
						});
					});
				}
				else if (response.status === 401) {
				// TODO Auth Failed
					dispatch({
						type: LOGIN_ERROR,
						roles: [],
						receivedAt: Date.now(),
					});
				}
				else {
					dispatch({
						type: RECEIVE_ROLES,
						roles: [],
						receivedAt: Date.now(),
					});
				}
			});
	};
}


export function assignUserRole(globalConfig=defaultGlobalConfig, user_id, role_id=1){
	return (dispatch) => {
		let endpoint = `${globalConfig.maestroServiceBase}users/${user_id}/roles/${role_id}`;

		return fetch(endpoint, {mode: "cors", headers: getHeader(globalConfig.hostname), method: "POST"})
			.then((response) => {
				if (response.status === 200) {
					response.json().then(json =>{
						dispatch({
							type: ASSIGN_ROLE,
							user: json,
							receivedAt: Date.now(),
						});
					});
				}
				else if (response.status === 401) {
				// TODO Auth Failed
					dispatch({
						type: LOGIN_ERROR,
						user: {},
						receivedAt: Date.now(),
					});
				}
				else {
					dispatch({
						type: ASSIGN_ROLE,
						user: {},
						receivedAt: Date.now(),
					});
				}
			});
	};
}

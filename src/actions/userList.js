import {usersList} from "../globals";

export const RECEIVE_USER_LIST = "RECEIVE_USER_LIST";

export function receiveUserList(type, json){
	return (dispatch) => {
		dispatch({
			type: type,
			userList: json,
			receivedAt: Date.now(),
		});
	};
}

// export function fetchUserList(){
// 	return (dispatch) => {
// 		// For now read user list from a static json file
// 		return fetch("userList.json")
// 		.then((response) => {
// 			if (response.status === 200) {
// 				response.json().then(json =>{
// 					dispatch(receiveUserList(RECEIVE_USER_LIST, json));
// 				});
// 			}
// 			else {
// 				dispatch(receiveUserList(RECEIVE_USER_LIST, []));
// 			}
// 		});
// 	};
// }

// Remove this and enable above block when ready to use api call
export function fetchUserList(){
	return (dispatch) => {
		// For now read user list from a static json file
		return dispatch(receiveUserList(RECEIVE_USER_LIST, usersList));
	};
}

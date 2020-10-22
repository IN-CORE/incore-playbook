import { RECEIVE_USER_LIST } from "../actions/userList";

const defaultState = {userList: []};

const attributes = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_USER_LIST:
		return Object.assign({}, state, {userList: action.userList});
	default:
		return state;
	}
};

export default attributes;

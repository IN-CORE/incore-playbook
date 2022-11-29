import { RECEIVE_USER_LIST, ASSIGN_ROLE} from "../actions/user";

const defaultState = {userList: []};

const attributes = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_USER_LIST:
		return Object.assign({}, state, {userList: action.userList});
	case ASSIGN_ROLE:
		return Object.assign({}, state, {userList: Object.assign(action.userList[action.userList.findIndex(user => user.id === action.user.id)], action.user)});
	default:
		return state;
	}
};

export default attributes;

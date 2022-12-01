import { RECEIVE_USER_LIST, RECEIVE_ROLES, ASSIGN_ROLE} from "../actions/user";

const defaultState = {userList: [], roles: []};

const attributes = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_USER_LIST:
		return Object.assign({}, state, {userList: action.userList});
	case RECEIVE_ROLES:
		return Object.assign({}, state, {roles: action.roles});
	case ASSIGN_ROLE:
		return Object.assign({}, state, {userList: Object.assign(action.userList[action.userList.findIndex(user => user.id === action.user.id)], action.user)});
	default:
		return state;
	}
};

export default attributes;

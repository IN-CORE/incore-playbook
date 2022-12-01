import { RECEIVE_USER_LIST, RECEIVE_USER, RECEIVE_ROLES, ASSIGN_ROLE} from "../actions/user";

const defaultState = {userList: [], roles: []};

const users = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_USER_LIST:
		return Object.assign({}, state, {userList: action.userList});
	case RECEIVE_USER:
		return Object.assign({}, state, {user: action.user});
	case RECEIVE_ROLES:
		return Object.assign({}, state, {roles: action.roles});
	case ASSIGN_ROLE:
		return Object.assign({}, state, {user: action.user});
	default:
		return state;
	}
};

export default users;

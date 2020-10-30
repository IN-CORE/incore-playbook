import { RECEIVE_EXECUTIONS, LOGIN_ERROR } from "../actions/datawolf";

const defaultState = {executions: []};

export const executions = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_EXECUTIONS:
		return Object.assign({}, state, {executions: action.executions});
	case LOGIN_ERROR:
		return Object.assign({}, state, {executions: []});
	default:
		return state;
	}
};

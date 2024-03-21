import {
	LOGIN_ERROR,
	RECEIVE_EXECUTION_ITEM,
	RECEIVE_EXECUTIONS,
} from "../actions/datawolf";

const defaultState = { executions: [], executionItem: {} };

export const executions = (state = defaultState, action) => {
	switch (action.type) {
		case RECEIVE_EXECUTIONS:
			return Object.assign({}, state, { executions: action.executions });
		case RECEIVE_EXECUTION_ITEM:
			return Object.assign({}, state, { executionItem: action.executionItem });
		case LOGIN_ERROR:
			return Object.assign({}, state, { executions: [] });
		default:
			return state;
	}
};

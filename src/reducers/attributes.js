import { UPDATE_ZONENAMES } from "../actions/attributes";

const defaultState = { zoneNames: [] };

const attributes = (state = defaultState, action) => {
	switch (action.type) {
		case UPDATE_ZONENAMES:
			return Object.assign({}, state, { zoneNames: action.zoneNames });
		default:
			return state;
	}
};

export default attributes;

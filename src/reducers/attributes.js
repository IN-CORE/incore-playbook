import { RECEIVE_ATTRIBUTES, UPDATE_ZONENAMES } from "../actions/attributes";

const defaultState = { attributes: [], zoneNames: [] };

const attributes = (state = defaultState, action) => {
	switch (action.type) {
		case RECEIVE_ATTRIBUTES:
			return Object.assign({}, state, { attributes: action.attributes });
		case UPDATE_ZONENAMES:
			return Object.assign({}, state, { zoneNames: action.zoneNames });
		default:
			return state;
	}
};

export default attributes;

import { RECEIVE_ATTRIBUTES } from "../actions/attributes";

const defaultState = {attributes: []};

const attributes = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_ATTRIBUTES:
		return Object.assign({}, state, {attributes: action.attributes});
	default:
		return state;
	}
};

export default attributes;

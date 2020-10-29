import { RECEIVE_TORNADOES, LOGIN_ERROR } from "../actions/hazards";


const defaultState = {tornadoes: []};

const tornadoes = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_TORNADOES:
		return Object.assign({}, state, {tornadoes: action.tornadoes});
	case LOGIN_ERROR:
		return Object.assign({}, state, {tornadoes: []});
	default:
		return state;
	}
};

export default tornadoes;

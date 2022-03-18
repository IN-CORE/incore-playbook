import { LOGIN_ERROR } from "../actions/hazards";


const defaultState = {tornadoes: [], earthquakes: [], tsunamis: [], floods: [], hurricanes: [], hurricaneWindfields:[]};

const hazards = (state=defaultState, action) => {
	switch(action.type) {
	case "RECEIVE_TORNADOES`":
		return Object.assign({}, state, {tornadoes: action.tornadoes});
	case "RECEIVE_EARTHQUAKES`":
		return Object.assign({}, state, {earthquakes: action.earthquakes});
	case "RECEIVE_TSUNAMIS`":
		return Object.assign({}, state, {tsunamis: action.tsunamis});
	case "RECEIVE_FLOODS`":
		return Object.assign({}, state, {floods: action.floods});
	case "RECEIVE_HURRICANES`":
		return Object.assign({}, state, {hurricanes: action.hurricanes});
	case "RECEIVE_HURRICANEWINDFIELDS`":
		return Object.assign({}, state, {hurricaneWindfields: action.hurricaneWindfields});
	case LOGIN_ERROR:
		return Object.assign({}, state, {});
	default:
		return state;
	}
};

export default hazards;

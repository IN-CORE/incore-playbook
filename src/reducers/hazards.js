import { LOGIN_ERROR } from "../actions/hazards";


const defaultState = {tornadoes: [], earthquakes: [], tsunamis: [], floods: [], hurricanes: []};

const hazards = (state=defaultState, action) => {
	switch(action.type) {
	case "RECEIVE_TORNADOES":
		return Object.assign({}, state, {tornadoes: action.hazards});
	case "RECEIVE_EARTHQUAKES":
		return Object.assign({}, state, {earthquakes: action.hazards});
	case "RECEIVE_TSUNAMIS":
		return Object.assign({}, state, {tsunamis: action.hazards});
	case "RECEIVE_FLOODS":
		return Object.assign({}, state, {floods: action.hazards});
	case "RECEIVE_HURRICANES":
		return Object.assign({}, state, {hurricanes: action.hazards});
	case LOGIN_ERROR:
		return Object.assign({}, state, {});
	default:
		return state;
	}
};

export default hazards;

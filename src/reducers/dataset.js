import { RECEIVE_DATASETS, LOGIN_ERROR } from "../actions/datasets";

const defaultState = {datasets: []};

const datasets = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_DATASETS:
		return Object.assign({}, state, {datasets: action.datasets});
	case LOGIN_ERROR:
		return Object.assign({}, state, {datasets: []});
	default:
		return state;
	}
};

export default datasets;

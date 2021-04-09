import { RECEIVE_EPFS, RECEIVE_BLDGS, LOGIN_ERROR } from "../actions/datasets";

const defaultState = {buildings: [], epfs: []};

const datasets = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_BLDGS:
		return Object.assign({}, state, {buildings: action.datasets.filter(bldg => (bldg.dataType.includes("ergo:buildingInventoryVer")))});
	case RECEIVE_EPFS:
		return Object.assign({}, state, {epfs: action.datasets.filter(epf => (epf.dataType === "incore:epf"))});
	case LOGIN_ERROR:
		return Object.assign({}, state, {buildings: [], epfs: []});
	default:
		return state;
	}
};

export default datasets;

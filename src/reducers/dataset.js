import { RECEIVE_EPFS, RECEIVE_BLDGS, RECEIVE_INTERD, LOGIN_ERROR } from "../actions/datasets";

const defaultState = {buildings: [], epfs: [], interdNetworks:[]};

const datasets = (state=defaultState, action) => {
	switch(action.type) {
	case RECEIVE_BLDGS:
		return Object.assign({}, state, {buildings: action.datasets.filter(bldg => (bldg.dataType.includes("ergo:buildingInventoryVer")))});
	case RECEIVE_EPFS:
		return Object.assign({}, state, {epfs: action.datasets.filter(epf => (epf.dataType === "incore:epf"))});
	case RECEIVE_INTERD:
		return Object.assign({}, state, {interdNetworks: action.datasets.filter(interdNetwork =>
			(interdNetwork.dataType === "incore:buildingInterdependencyDict"))});
	case LOGIN_ERROR:
		return Object.assign({}, state, {buildings: [], epfs: [], interdNetworks: []});
	default:
		return state;
	}
};

export default datasets;

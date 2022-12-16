import { LOGIN_ERROR } from "../actions/datasets";

const defaultState = {
	buildings: [],
	epfs: [],
	interdNetworks: [],
	sectorShocks: [],
	cgeSams: [],
	cgeBbs: [],
	cgeIouts: [],
	cgeMiscs: [],
	cgeMischs: [],
	cgeLandcaps: [],
	cgeEmploys: [],
	cgeIgtds: [],
	cgeTauffs: [],
	cgeJobcrs: [],
	cgeOutcrs: [],
	huas: [],
	blockGroups: [],
	valueLosses: []
};
// type only does a vague match; need to filter to make sure
const datasets = (state = defaultState, action) => {
	switch (action.type) {
		case "RECEIVE_BLDGS":
			return Object.assign({}, state, { buildings: action.datasets });
		case "RECEIVE_EPFS":
			return Object.assign({}, state, { epfs: action.datasets });
		case "RECEIVE_INTERD":
			return Object.assign({}, state, { interdNetworks: action.datasets });
		case "RECEIVE_SECTOR_SHOCKS":
			return Object.assign({}, state, { sectorShocks: action.datasets });
		case "RECEIVE_CGE_SAM":
			return Object.assign({}, state, { cgeSams: action.datasets });
		case "RECEIVE_CGE_BB":
			return Object.assign({}, state, { cgeBbs: action.datasets });
		case "RECEIVE_CGE_IOUTS":
			return Object.assign({}, state, { cgeIouts: action.datasets });
		case "RECEIVE_CGE_MISC":
			return Object.assign({}, state, {
				cgeMiscs: action.datasets.filter((dataset) => dataset.dataType === "incore:JoplinCGEmisc")
			});
		case "RECEIVE_CGE_MISCH":
			return Object.assign({}, state, {
				cgeMischs: action.datasets.filter((dataset) => dataset.dataType === "incore:JoplinCGEmisch")
			});
		case "RECEIVE_CGE_LANDCAP":
			return Object.assign({}, state, { cgeLandcaps: action.datasets });
		case "RECEIVE_CGE_EMPLOY":
			return Object.assign({}, state, { cgeEmploys: action.datasets });
		case "RECEIVE_CGE_IGTD":
			return Object.assign({}, state, { cgeIgtds: action.datasets });
		case "RECEIVE_CGE_TAUFF":
			return Object.assign({}, state, { cgeTauffs: action.datasets });
		case "RECEIVE_CGE_JOBCR":
			return Object.assign({}, state, { cgeJobcrs: action.datasets });
		case "RECEIVE_CGE_OUTCR":
			return Object.assign({}, state, { cgeOutcrs: action.datasets });
		case "RECEIVE_HUA":
			return Object.assign({}, state, { huas: action.datasets });
		case "RECEIVE_BLOCK_GROUP":
			return Object.assign({}, state, { blockGroups: action.datasets });
		case "RECEIVE_VALUE_LOSS":
			return Object.assign({}, state, { valueLosses: action.datasets });
		case LOGIN_ERROR:
			return Object.assign({}, state, {
				buildings: [],
				epfs: [],
				interdNetworks: [],
				sectorShocks: [],
				cgeSams: [],
				cgeBbs: [],
				cgeIouts: [],
				cgeMiscs: [],
				cgeMischs: [],
				cgeLandcaps: [],
				cgeEmploys: [],
				cgeIgtds: [],
				cgeTauffs: [],
				cgeJobcrs: [],
				cgeOutcrs: [],
				huas: [],
				blockGroups: [],
				valueLosses: []
			});
		default:
			return state;
	}
};

export default datasets;

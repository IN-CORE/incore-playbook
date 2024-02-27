import { SET_MARKER_FEATURE } from "../actions/map";

const defaultState = { markerFeature: null };

const mapReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_MARKER_FEATURE:
			return Object.assign({}, state, { markerFeature: action.markerFeature });
		default:
			return state;
	}
};

export default mapReducer;

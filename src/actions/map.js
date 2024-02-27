export const SET_MARKER_FEATURE = "SET_MARKER_FEATURE";

export const setMarkerFeature = markerFeature => {
	return {
		type: SET_MARKER_FEATURE,
		markerFeature: markerFeature
	};
};

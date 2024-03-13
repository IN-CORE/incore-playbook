import { globals as defaultGlobalConfig } from "../globals";

export const RECEIVE_ATTRIBUTES = "RECEIVE_ATTRIBUTES";

export function receiveAttributes(type, json) {
	return (dispatch) => {
		dispatch({
			type: type,
			attributes: json,
			receivedAt: Date.now(),
		});
	};
}

export const UPDATE_ZONENAMES = "UPDATE_ZONENAMES";
export const updateZoneNames = (type, zoneNames) => ({
	type: type,
	zoneNames: zoneNames,
	receivedAt: Date.now(),
});

export function fetchZoneGeoJson(globalConfig = defaultGlobalConfig) {
	const url = `${globalConfig.geoServerWFS}&typeName=${globalConfig.retrofitStrategyBuilder["zoneLayerId"]}`;
	return (dispatch) => {
		return fetch(url, { mode: "cors" }).then((response) => {
			if (response.status === 200) {
				response.json().then((json) => {
					const tmpZoneNames = json["features"].map(
						(feature) => feature.properties.name,
					);

					// Removing duplicates and sorting the zone names alphabetically
					const uniqueSortedZoneNames = [...new Set(tmpZoneNames)].sort(
						(a, b) => a.localeCompare(b),
					);

					// Dispatching with the unique and sorted zoneNames list
					dispatch(updateZoneNames(UPDATE_ZONENAMES, uniqueSortedZoneNames));
				});
			} else {
				dispatch(updateZoneNames(UPDATE_ZONENAMES, []));
			}
		});
	};
}

import config from "../app.config";

export const RECEIVE_ATTRIBUTES = "RECEIVE_ATTRIBUTES";

export function receiveAttributes(type, json){
	return (dispatch) => {
		dispatch({
			type: type,
			attributes: json,
			receivedAt: Date.now(),
		});
	};
}

export function fetchAttributes(id, sortColumnName){
	let url = `${config.geoServerWFS}?service=WFS&version=1.0.0&request=GetFeature&outputFormat=JSON`;
	url = `${url}&typename=${id}&sortBy=${sortColumnName}+D`;
	return (dispatch) => {
		return fetch(url, {mode:"cors"})
			.then((response) => {
				if (response.status === 200) {
					response.json().then(json =>{
						dispatch(receiveAttributes(RECEIVE_ATTRIBUTES, json["features"]));
					});
				}
				else {
					dispatch(receiveAttributes(RECEIVE_ATTRIBUTES, []));
				}
			});
	};
}

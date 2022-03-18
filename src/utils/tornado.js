import config from "../app.config";
import {getHeader} from "./common";

export async function createModelTornado(name, description, rating, startLat, startLon, endLat, endLon) {
	const endpoint = `${config.hazardServiceBase}tornadoes`;
	let formData = new FormData();
	let tornadoMetadata = {
		"tornadoType": "model",
		"name": name,
		"description": description,
		"tornadoModel": "MeanWidthTornado",
		"tornadoParameters": {
			"efRating": rating,
			"startLatitude": startLat,
			"startLongitude": startLon,
			"endLatitude": [endLat],
			"endLongitude": [endLon],
			"windSpeedMethod": "1",
		}
	};
	formData.append("tornado", JSON.stringify(tornadoMetadata));
	let authHeader = getHeader();
	let tornadoRequest = await fetch(endpoint, {
		method: "POST",
		mode: "cors",
		headers: authHeader,
		body: formData,
	});

	if (tornadoRequest.status === 200) {
		return tornadoRequest.json();
	} else if (tornadoRequest.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}

export async function createRasterTornado(name, description, files) {
	const endpoint = `${config.hazardServiceBase}tornadoes`;
	let formData = new FormData();

	let tornadoMetadata = {
		"tornadoType": "dataset",
		"name": name,
		"description": description
	};
	formData.append("tornado", JSON.stringify(tornadoMetadata));
	files.map((file) => {
		formData.append("file", file);
	});

	let authHeader = getHeader();
	let tornadoRequest = await fetch(endpoint, {
		method: "POST",
		mode: "cors",
		headers: authHeader,
		body: formData,
	});

	if (tornadoRequest.status === 200) {
		return tornadoRequest.json();
	} else if (tornadoRequest.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}

export async function getTornadoMetadata(tornadoId) {
	let endpoint = `${config.hazardServiceBase}tornadoes/${tornadoId}`;
	let tornadoRequest = await fetch(endpoint, {mode: "cors", headers: getHeader()});
	if (tornadoRequest.status === 200) {
		return tornadoRequest.json();

	} else if (tornadoRequest.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}


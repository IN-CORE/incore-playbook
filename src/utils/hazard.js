import appConfig from "../globals";
import {dataURItoFile, getHeader} from "./common";

export async function createModelTornado(name, description, rating, startLat, startLon, endLat, endLon) {
	const endpoint = `${appConfig.hazardServiceBase}tornadoes`;
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
	const endpoint = `${appConfig.hazardServiceBase}tornadoes`;
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
	let endpoint = `${appConfig.hazardServiceBase}tornadoes/${tornadoId}`;
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

export async function createModelEarthquake(name, description, attenuationModel, lat, lon, magnitude, depth, demandType, demandUnits) {
	const endpoint = `${appConfig.hazardServiceBase}earthquakes`;
	let formData = new FormData();

	let minX = lat - 0.3;
	let maxX = lat + 0.3;
	let minY = lon - 0.3;
	let maxY = lon + 0.3;

	let eqMetadata = {
		"name": name,
		"description": description,
		"eqType": "model",
		"attenuations": {},
		"eqParameters": {
			"srcLatitude": lat,
			"srcLongitude": lon,
			"magnitude": magnitude,
			"depth": depth
		},
		"visualizationParameters":{
			"demandType": demandType,
			"demandUnits": demandUnits,
			"minX": minX,
			"minY": minY,
			"maxX": maxX,
			"maxY": maxY,
			"numPoints": "1025",
			"amplifyHazard": "true"
		}
	};
	eqMetadata["attenuations"] = {attenuationModel: "1.0"};

	formData.append("earthquake", JSON.stringify(eqMetadata));
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

export async function createRjfsDatasetHazards(formData, hazardType) {
	const endpoint = `${appConfig.hazardServiceBase}${hazardType}`;
	let dataurls = [];
	let payload = new FormData();

	formData["hazardDatasets"].map((hazardDataset) =>{
		dataurls.push({
			"dataurl": hazardDataset["file"],
			// need to have the correct extension name .tif to create a layer
			// data url does not contain filename!
			"filename": `${hazardDataset["demandType"]}-raster.tif`
		});
		delete hazardDataset["file"];
	});

	// need to convert data uri to blob then append
	dataurls.map((dataurl) => {
		payload.append("file", dataURItoFile(dataurl["dataurl"], dataurl["filename"]));
	});

	payload.append(hazardType.slice(0, -1), JSON.stringify(formData));
	let authHeader = getHeader();
	let request = await fetch(endpoint, {
		method: "POST",
		mode: "cors",
		headers: authHeader,
		body: payload,
	});

	if (request.status === 200) {
		return request.json();
	} else if (request.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}

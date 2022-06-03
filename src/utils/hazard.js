import {globals as defaultGlobalConfig} from "../globals";
import {dataURItoFile, getHeader, round} from "./common";

export async function createModelTornado(globalConfig=defaultGlobalConfig, name, description, rating, startLat, startLon, endLat, endLon) {
	const endpoint = `${globalConfig.hazardServiceBase}tornadoes`;
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

export async function createRasterTornado(globalConfig=defaultGlobalConfig, name, description, files) {
	const endpoint = `${globalConfig.hazardServiceBase}tornadoes`;
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

export async function getHazardMetadata(globalConfig=defaultGlobalConfig, hazardType, hazardId) {
	let endpoint = `${globalConfig.hazardServiceBase}${hazardType}/${hazardId}`;
	let hazardRequest = await fetch(endpoint, {mode: "cors", headers: getHeader()});
	if (hazardRequest.status === 200) {
		return hazardRequest.json();

	} else if (hazardRequest.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}

export async function createModelEarthquake(globalConfig=defaultGlobalConfig, name, description, lat, lon, magnitude, depth, demandType, demandUnits, attenuations) {
	const endpoint = `${globalConfig.hazardServiceBase}earthquakes`;
	let formData = new FormData();

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
			"minX": round(lon-0.1, 4),
			"minY": round(lat-0.1, 4),
			"maxX": round(lon+0.1, 4),
			"maxY": round(lat+0.1, 4),
			"numPoints": "1025",
			"amplifyHazard": "true"
		}
	};
	eqMetadata["attenuations"][attenuations] = 1.0;

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

export async function createRjfsDatasetHazards(globalConfig=defaultGlobalConfig, formData, hazardType) {
	const endpoint = `${globalConfig.hazardServiceBase}${hazardType}`;
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

import {dataURItoFile, getHeader} from "./common";
import config from "../app.config";

export async function createDatasetHurricane(formData) {
	const endpoint = `${config.hazardServiceBase}hurricanes`;
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

	payload.append("hurricane", JSON.stringify(formData));
	let authHeader = getHeader();
	let hurricaneRequest = await fetch(endpoint, {
		method: "POST",
		mode: "cors",
		headers: authHeader,
		body: payload,
	});

	if (hurricaneRequest.status === 200) {
		return hurricaneRequest.json();
	} else if (hurricaneRequest.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}

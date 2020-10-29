import config from "../app.config";
import {getHeader} from "./common";

export async function createDataset(title, description, files){
	const datasetEndpoint = `${config.dataServiceBase}datasets`;
	let datasetFormData = new FormData();
	let datasetMetadata = {
		"title": title,
		"description": description,
		"contributors":[],
		"dataType": "ergo:buildingInventoryVer6",
		"storedUrl": "",
		"format": "shapefile",
		"sourceDataset": "",
		"networkDataset": null
	};
	datasetFormData.append("dataset", JSON.stringify(datasetMetadata));

	let authHeader = getHeader();
	let datasetRequest = await fetch(datasetEndpoint, {
		method: "POST",
		mode: "cors",
		headers: authHeader,
		body: datasetFormData,
	});

	if (datasetRequest.status  === 200){
		let datasetJson = await datasetRequest.json();

		// attach files to that dataset
		let datasetId = datasetJson["id"];
		const fileEndpoint = `${config.dataServiceBase}datasets/${datasetId}/files`;
		let fileFormData = new FormData();
		files.map((file) => {
			fileFormData.append("file", file);
		});
		let fileRequest = await fetch(fileEndpoint, {
			method: "POST",
			mode: "cors",
			headers: authHeader,
			body: fileFormData,
		});

		if (fileRequest.status === 200){
			return fileRequest.json();
		}
		else if  (fileRequest.status  === 401){
			return {};
		}
		else {
			return {};
		}
	}
	else if  (datasetRequest.status  === 401){
		// TODO handle error
		return {};
	}
	else {
		// TODO handle error
		return {};
	}
}

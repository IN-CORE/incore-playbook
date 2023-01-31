import { globals as defaultGlobalConfig } from "../globals";
import { getHeader } from "./common";

export async function createDataset(
	globalConfig = defaultGlobalConfig,
	title,
	description,
	dataType,
	files,
	format = "shapefile"
) {
	const datasetEndpoint = `${globalConfig.dataServiceBase}datasets`;
	let datasetFormData = new FormData();
	let datasetMetadata = {
		title: title,
		description: description,
		contributors: [],
		dataType: dataType,
		storedUrl: "",
		format: format,
		sourceDataset: "",
		networkDataset: null
	};
	datasetFormData.append("dataset", JSON.stringify(datasetMetadata));

	let authHeader = getHeader(globalConfig.hostname);
	let datasetRequest = await fetch(datasetEndpoint, {
		method: "POST",
		mode: "cors",
		headers: authHeader,
		body: datasetFormData
	});

	if (datasetRequest.status === 200) {
		let datasetJson = await datasetRequest.json();

		// attach files to that dataset
		let datasetId = datasetJson["id"];
		const fileEndpoint = `${globalConfig.dataServiceBase}datasets/${datasetId}/files`;
		let fileFormData = new FormData();
		files.map((file) => {
			fileFormData.append("file", file);
		});
		let fileRequest = await fetch(fileEndpoint, {
			method: "POST",
			mode: "cors",
			headers: authHeader,
			body: fileFormData
		});

		if (fileRequest.status === 200) {
			return fileRequest.json();
		} else if (fileRequest.status === 401) {
			return {};
		} else {
			return {};
		}
	} else if (datasetRequest.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}

export async function downloadDataset(globalConfig = defaultGlobalConfig, datasetId, title = null) {
	let filename = `${datasetId}.zip`;
	if (title) filename = `${title}-${filename}`;

	let url = `${globalConfig.dataServiceBase}datasets/${datasetId}/blob`;
	let authHeader = getHeader(globalConfig.hostname);
	let response = await fetch(url, {
		method: "GET",
		mode: "cors",
		headers: authHeader
	});

	if (response.status === 200) {
		let blob = await response.blob();
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, filename);
		} else {
			let anchor = window.document.createElement("a");
			anchor.href = window.URL.createObjectURL(blob);
			anchor.download = filename;
			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);
		}
	} else if (response.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}

export async function downloadShapefile(globalConfig = defaultGlobalConfig, datasetId, title = null) {
	let filename = `${datasetId}.zip`;
	if (title) filename = `${title}-${filename}`;
	let url = `${globalConfig.geoServerFeature}&outputFormat=shape-zip&typename=incore:${datasetId}`;
	let response = await fetch(url, {
		// headers: authHeader,
		method: "GET",
		mode: "cors"
	});

	if (response.status === 200) {
		let blob = await response.blob();
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, filename);
		} else {
			let anchor = window.document.createElement("a");
			anchor.href = window.URL.createObjectURL(blob);
			anchor.download = filename;
			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);
		}
	} else if (response.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}

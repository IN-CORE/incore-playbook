import {getHeader, getCurrUserEmail, getIncoreTokenFile} from "./common";
import {datawolfConfig as defaultDatawolfConfig} from "../datawolf.config.js";
import {datawolfWorkflowConfig as defaultDatawolfWorkflowConfig} from "../datawolf.config.js";

export async function getOutputFileJson(datawolfConfig=defaultDatawolfConfig, datasetId, outputFileName = null) {
	let authHeader = getHeader();

	// Get - Result Dataset
	const datasetResponse = await
	fetch(`${datawolfConfig["datasetBaseURL"]}/${datasetId}`, {
		method: "GET",
		headers: authHeader,
		mode: "cors",
	});

	const resultDataset = await datasetResponse.json();
	let fileId = -1;

	// If output filename is already provided as input, use that to figure out the exact file that needs to be downloaded
	if (outputFileName !== null) {
		for (let i = 0; i < resultDataset.fileDescriptors.length; i++) {
			if (resultDataset.fileDescriptors[i].filename === outputFileName) {
				fileId = resultDataset.fileDescriptors[i].id;
				break;
			}
		}
	}
	// If no output filename is provided, get the first file in the dataset
	else {
		if (resultDataset.fileDescriptors.length > 0) {
			fileId = resultDataset.fileDescriptors[0].id;
		}
	}

	if (fileId !== -1) {
		// Get - Result File Download
		const fileDownloadResponse = await fetch(`${datawolfConfig["datasetBaseURL"]}/${datasetId}/${fileId}/file`,
			{
				method: "GET",
				headers: authHeader,
			});

		return await fileDownloadResponse.text();
	}
	else {
		return null;
	}
}

export async function submitExecution(datawolfConfig=defaultDatawolfConfig,
									  datawolfWorkflowConfig=defaultDatawolfWorkflowConfig,
									  title, description,
									  datawolfFormState){

	let incoreTokenDatasetId = await postDataset(datawolfConfig);
	if (incoreTokenDatasetId === null) {
		console.log("Fail to post incoretoken. Abort execution submission!");
		return null;
	}

	let authHeader = getHeader();
	authHeader.append("Content-Type", "application/json");

	const parameters = Object.keys(datawolfFormState).reduce((parameters, key) => {
		return {...parameters, ...datawolfFormState[key]};
	}, {});

	let requestBody = {
		"workflowId": datawolfWorkflowConfig["wfId"],
		"creatorId": datawolfWorkflowConfig["creatorId"],
		"title": title,
		"description": description,
		"parameters": parameters,

		// TODO right now only one input datasets; need to think in the future when we have more
		"datasets": {[datawolfWorkflowConfig["inputs"]["datasets"][0]["datasetsMap"][0]["datasetId"]]: incoreTokenDatasetId}
	};

	let datawolfResponse = await fetch(`${datawolfConfig["executionPostURL"]}`, {
		method: "POST",
		headers: authHeader,
		body: JSON.stringify(requestBody),
		mode: "cors",
	});

	if (datawolfResponse.status  === 200){
		return datawolfResponse.text();
	}
	else if  (datawolfResponse.status  === 401){
		// TODO handle error
		return null;
	}
	else {
		// TODO handle error
		return null;
	}
}

export async function postDataset(datawolfConfig, title="incoretoken", description="incoretoken"){

	let authHeader = getHeader();
	// authHeader.append("Content-Type", "multipart/form-data");

	let formData = new FormData();
	formData.append("title", title);
	formData.append("description", description);
	formData.append("useremail", getCurrUserEmail());

	// TODO add a file
	let file = getIncoreTokenFile();
	if (file !== null) formData.append("uploadedFile", file);

	let datawolfResponse = await fetch(`${datawolfConfig["datasetBaseURL"]}`, {
		method: "POST",
		headers: authHeader,
		body: formData,
		mode: "cors",
	});

	if (datawolfResponse.status  === 200){
		return datawolfResponse.text();
	}
	else if  (datawolfResponse.status  === 401){
		// TODO handle error
		return null;
	}
	else {
		// TODO handle error
		return null;
	}
}

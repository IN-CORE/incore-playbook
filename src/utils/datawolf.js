import {getHeader, getCurrUserInfo, getCurrUserEmail, getIncoreTokenFile} from "./common";
import datawolfConfig from "../datawolf.config";
import appConfig from "../app.config";

export async function getOutputFileJson(datasetId, outputFileName = null) {
	let authHeader = getHeader();
	let userInfoString = getCurrUserInfo();
	authHeader.append("X-Userinfo", userInfoString);

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

export async function submitExecution(title, description, datasetId, hazardId,){

	let incoreTokenDatasetId = await postDataset();
	if (incoreTokenDatasetId === null) {
		console.log("Fail to post incoretoken. Abort exeuction submission!");
	}
	else{
		let authHeader = getHeader();
		let userInfoString = getCurrUserInfo();
		authHeader.append("X-Userinfo", userInfoString);
		authHeader.append("Content-Type", "application/json");

		const datawolfDatasets = datawolfConfig["datasets"];
		const datawolfParams = datawolfConfig["parameters"];

		let requestBody = {
			"workflowId": datawolfConfig["workflowId"],
			"creatorId": datawolfConfig["creatorId"],
			"title": title,
			"description": description,
			"parameters": {},
			"datasets": {}
		};

		requestBody["parameters"][datawolfParams["hazardTypeId"]] = "tornado";
		requestBody["parameters"][datawolfParams["damageRatioId"]] = "5a284f2ec7d30d13bc08209a";
		requestBody["parameters"][datawolfParams["mappingId"]] = "5e8e3a21eaa8b80001f04f1c";
		requestBody["parameters"][datawolfParams["damageIntervalKeysId"]] = "insignific moderate heavy complete";
		requestBody["parameters"][datawolfParams["numCpuId1"]] = 4;
		requestBody["parameters"][datawolfParams["serviceUrlId1"]] = appConfig.apiUrl;
		requestBody["parameters"][datawolfParams["damageTypeId"]] = "ergo:buildingDamageVer4";
		requestBody["parameters"][datawolfParams["resultNameId1"]] = "joplin_bldg_dmg";
		requestBody["parameters"][datawolfParams["resultNameId2"]] = "joplin_bldg_mean_dmg";
		requestBody["parameters"][datawolfParams["hazardId"]] = hazardId;
		requestBody["parameters"][datawolfParams["serviceUrlId2"]] = appConfig.apiUrl;
		requestBody["parameters"][datawolfParams["sourceId"]] = datasetId;
		requestBody["parameters"][datawolfParams["buildingId"]] = datasetId;
		requestBody["parameters"][datawolfParams["numCpuId2"]] = 4;

		// these two ids need to change since token will expire
		requestBody["datasets"][datawolfDatasets["incoreTokenId1"]] = incoreTokenDatasetId;
		requestBody["datasets"][datawolfDatasets["incoreTokenId2"]] = incoreTokenDatasetId;

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
}

export async function postDataset(title="incoretoken", description="incoretoken"){

	let authHeader = getHeader();
	let userInfoString = getCurrUserInfo();
	authHeader.append("X-Userinfo", userInfoString);
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

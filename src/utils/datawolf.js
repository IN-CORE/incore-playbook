import {getHeader, getCurrUserEmail, getIncoreTokenFile, getCurrUsername} from "./common";
import datawolfConfig from "../datawolf.config";
import appConfig from "../globals";

export async function getOutputFileJson(datasetId, outputFileName = null) {
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

export async function submitExecution(title, description, bldgId, substationId, poleId, interdNetworkId,
									  bldgToSectorId, huaId, blockGroupId, valueLossId, hazardId,){
	let incoreTokenDatasetId = await postDataset();
	if (incoreTokenDatasetId === null) {
		console.log("Fail to post incoretoken. Abort exeuction submission!");
	}
	else{
		let authHeader = getHeader();
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

		requestBody["parameters"][datawolfParams["incoreUserNameId"]] = getCurrUsername();
		requestBody["parameters"][datawolfParams["interdependencyId"]] = interdNetworkId;
		requestBody["parameters"][datawolfParams["useUncertaintyId"]] = "";
		requestBody["parameters"][datawolfParams["numCpuId"]] = 8;
		requestBody["parameters"][datawolfParams["useLiquefactionId"]] = "";
		requestBody["parameters"][datawolfParams["mcsSamplesId"]] = 500;
		requestBody["parameters"][datawolfParams["bldgDamageRatioId"]] = "5a284f2ec7d30d13bc08209a";
		requestBody["parameters"][datawolfParams["epfPoleId"]] = poleId;
		requestBody["parameters"][datawolfParams["hazardId"]] = hazardId;
		requestBody["parameters"][datawolfParams["damageIntervalKeysId"]] = "DS_0 DS_1 DS_2 DS_3";
		requestBody["parameters"][datawolfParams["hazardTypeId"]] = "tornado";
		requestBody["parameters"][datawolfParams["bldgMappingId"]] = "5e8e3a21eaa8b80001f04f1c";
		requestBody["parameters"][datawolfParams["epfMappingId"]] = "5d8a326fb9219c068ea798e7";
		requestBody["parameters"][datawolfParams["archeTypeMappingId"]] = "5fca915fb34b193f7a44059b";
		requestBody["parameters"][datawolfParams["bldgFragilityKeyId"]] = "";
		requestBody["parameters"][datawolfParams["serviceUrlId"]] = appConfig["apiUrl"];
		requestBody["parameters"][datawolfParams["epfSubstationId"]] = substationId;
		requestBody["parameters"][datawolfParams["buildingId"]] = bldgId;
		requestBody["parameters"][datawolfParams["resultNameId"]] = "Joplin";

		// for cge and pop
		// requestBody["parameters"][datawolfParams[""]] = bldgToSectorId;
		requestBody["parameters"][datawolfParams["modelIterationsId"]] = "1";
		requestBody["parameters"][datawolfParams["seedId"]] = "1111";
		requestBody["parameters"][datawolfParams["housingUnitAllocationId"]] = huaId;
		requestBody["parameters"][datawolfParams["blockGroupDataId"]] = blockGroupId;
		requestBody["parameters"][datawolfParams["valueLossParamId"]] = valueLossId;

		// token will expire
		requestBody["datasets"][datawolfDatasets["incoreTokenId"]] = incoreTokenDatasetId;

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

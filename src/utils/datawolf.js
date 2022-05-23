import {getHeader, getCurrUserEmail, getIncoreTokenFile, getCurrUsername} from "./common";
import {globals as defaultGlobalConfig} from "../globals";
import {datawolfConfig as defaultDatawolfConfig} from "../datawolf.config.js.ignore";

export async function getOutputFileJson(datawolfConfig, datasetId, outputFileName = null) {
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

export async function submitExecution(globalConfig=defaultGlobalConfig, datawolfConfig=defaultDatawolfConfig, allowedDataType, title, description, bldgId, substationId, poleId, interdNetworkId,
									  bldgToSectorId, huaId, blockGroupId, valueLossId, hazardType, hazardId,){

	// not all the variables are needed; use allowedDataType to sift through

	let incoreTokenDatasetId = await postDataset(datawolfConfig);
	if (incoreTokenDatasetId === null) {
		console.log("Fail to post incoretoken. Abort exeuction submission!");
	}
	else{
		let authHeader = getHeader();
		authHeader.append("Content-Type", "application/json");

		const datawolfDatasets = datawolfConfig["datasets"];
		const datawolfParams = datawolfConfig["parameters"];
		const defaults = datawolfConfig["defaults"];

		let requestBody = {
			"workflowId": datawolfConfig["workflowId"],
			"creatorId": datawolfConfig["creatorId"],
			"title": title,
			"description": description,
			"parameters": {},
			"datasets": {}
		};

		requestBody["parameters"][datawolfParams["incoreUserNameId"]] = getCurrUsername();
		requestBody["parameters"][datawolfParams["numCpuId"]] = defaults["numCpuId"];
		requestBody["parameters"][datawolfParams["hazardId"]] = hazardId;
		requestBody["parameters"][datawolfParams["hazardTypeId"]] = hazardType;
		requestBody["parameters"][datawolfParams["serviceUrlId"]] = globalConfig["apiUrl"];
		requestBody["parameters"][datawolfParams["resultNameId"]] = title;

		if (allowedDataType.building){
			requestBody["parameters"][datawolfParams["archeTypeMappingId"]] = defaults["archeTypeMappingId"];
			requestBody["parameters"][datawolfParams["bldgMappingId"]] = defaults["bldgMappingId"];
			requestBody["parameters"][datawolfParams["bldgFragilityKeyId"]] = "";
			requestBody["parameters"][datawolfParams["buildingId"]] = bldgId;
			requestBody["parameters"][datawolfParams["useUncertaintyId"]] = "";
			requestBody["parameters"][datawolfParams["useLiquefactionId"]] = "";
		}

		if (allowedDataType.epf){
			requestBody["parameters"][datawolfParams["epfPoleId"]] = poleId;
			requestBody["parameters"][datawolfParams["epfMappingId"]] = defaults["epfMappingId"];
			requestBody["parameters"][datawolfParams["epfSubstationId"]] = substationId;
		}

		if (allowedDataType.network) {
			requestBody["parameters"][datawolfParams["interdependencyId"]] = interdNetworkId;
			requestBody["parameters"][datawolfParams["bldgDamageRatioId"]] = defaults["bldgDamageRatioId"];
			requestBody["parameters"][datawolfParams["mcsSamplesId"]] = defaults["mcsSamplesId"];
			requestBody["parameters"][datawolfParams["damageIntervalKeysId"]] = defaults["damageIntervalKeysId"];
		}

		// for cge and pop
		if (allowedDataType.socioeconomics){
			// requestBody["parameters"][datawolfParams[""]] = bldgToSectorId;
			requestBody["parameters"][datawolfParams["modelIterationsId"]] = "1";
			requestBody["parameters"][datawolfParams["seedId"]] = "1111";
			requestBody["parameters"][datawolfParams["housingUnitAllocationId"]] = huaId;
			requestBody["parameters"][datawolfParams["blockGroupDataId"]] = blockGroupId;
			requestBody["parameters"][datawolfParams["valueLossParamId"]] = valueLossId;
		}

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

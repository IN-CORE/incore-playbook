import {getHeader, getCurrUserInfo} from "./common";
import datawolfConfig from "../datawolf.config";

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

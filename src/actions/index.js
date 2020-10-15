import Cookies from "universal-cookie";
import config from "../app.config";

const cookies = new Cookies();

export const GET_ANALYSES = "GET_ANALYSES";

export const RECEIVE_ANALYSES = "RECEIVE_ANALYSES";

export function receiveAnalyses(api, json) {
	return (dispatch) => {
		dispatch({
			type: RECEIVE_ANALYSES,
			analyses: json,
			receivedAt: Date.now()
		});
	};
}

export const RECEIVE_ANALYSIS = "RECEIVE_ANALYSIS";

export function receiveAnalysis(api, json) {
	return (dispatch) => {
		dispatch({
			type: RECEIVE_ANALYSIS,
			analysis: json,
			receivedAt: Date.now()
		});
	};
}

export function fetchAnalyses() {
	const endpoint = `${ config.maestroService }/api/analyses?full=false`;

	return (dispatch) => {
		return fetch(endpoint, {
			headers: getHeader()
		})
			.then(response => response.json())
			.then(json =>
				dispatch(receiveAnalyses(endpoint, json))
			);
	};
}

export function getAnalysisById(id) {
	//TODO: Move to a configuration file
	const endpoint = `${ config.maestroService }/api/analyses/${ id }`;

	return (dispatch) => {
		return fetch(endpoint, {
			headers: getHeader()
		})
			.then(response => response.json())
			.then(json =>
				dispatch(receiveAnalysis(config.maestroService, json))
			);
	};

}

export async function loginHelper(username, password) {
	const endpoint = config.authService;
	let formData = [
		`${encodeURIComponent("grant_type")  }=${  encodeURIComponent("password")}`,
		`${encodeURIComponent("username")  }=${  encodeURIComponent(username)}`,
		`${encodeURIComponent("password")  }=${  encodeURIComponent(password)}`,
		`${encodeURIComponent("client_id")  }=${  encodeURIComponent(config.client_id)}`,
	];

	const tokenRequest = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: formData.join("&"),
	});

	const tokens = await tokenRequest.json();

	return tokens;
}

export const LOGIN_ERROR = "LOGIN_ERROR";
export const SET_USER = "SET_USER";

export function login(username, password) {
	return async (dispatch) => {
		const json = await loginHelper(username, password);
		if (json["access_token"] !== undefined) {
			cookies.set("Authorization", `bearer ${json["access_token"]}`, {maxAge: json["expires_in"]});
			return dispatch({
				type: SET_USER,
				Authorization: `bearer ${json["access_token"]}`,
			});
		} else {
			return dispatch({
				type: LOGIN_ERROR
			});
		}

	};
}

export const LOGOUT = "LOGOUT";

export function logout() {
	return (dispatch) => {
		cookies.remove("Authorization");
		return dispatch({
			type: LOGOUT
		});
	};
}

export const RECEIVE_EXECUTION_ID = "RECEIVE_WORKFLOW_ID";

export function receiveDatawolfResponse(json) {
	// Get the id of the layers in geoserver to display in the map
	// Get the info from a table to display


	return (dispatch) => {
		dispatch({
			type: RECEIVE_EXECUTION_ID,
			executionId: json,
			receivedAt: Date.now()
		});
	};

}

async function getOutputDatasetHelper(executionId) {
	const datawolfUrl = `${ config.dataWolf }executions/${ executionId }`;
	const headers = getDatawolfHeader();
	const datawolf_execution_fetch = await fetch(datawolfUrl, {
		method: "GET",
		headers: headers
	});

	const datawolfExecution = await datawolf_execution_fetch.json();

	const output_dataset_id = datawolfExecution.datasets["7774de32-481f-48dd-8223-d9cdf16eaec1"];
	const endpoint = `${ config.dataService }/${ output_dataset_id }`;
	const output_dataset = await fetch(endpoint, {
		headers: getHeader()
	});

	const outputDataset = await output_dataset.json();
	const fileId = outputDataset.fileDescriptors[0].id;

	const fileDownloadUrl = `${ config.dataServiceBase }data/api/files/${ fileId }/blob`;
	const fileBlob = await fetch(fileDownloadUrl, {method: "GET", mode: "CORS", headers: getHeader()});

	const fileText = await fileBlob.text();

	return [outputDataset.id, fileText];
}

export const RECEIVE_OUTPUT = "RECEIVE_OUTPUT";

export function getOutputDataset(executionId) {

	return async (dispatch) => {
		const data = await getOutputDatasetHelper(executionId);
		dispatch({
			type: RECEIVE_OUTPUT,
			outputDatasetId: data[0],
			file: data[1].replace(/"/g, "").split("\n")
		});

	};
}

export async function executeDatawolfWorkflowHelper(workflowid, creatorid, title, description, parameters, datasets) {
	const datawolfUrl = `${ config.dataWolf }executions`;
	const dataToSubmit = {
		"title": title,
		"parameters": parameters,
		"datasets": datasets,
		"workflowId": workflowid,
		"creatorId": creatorid,
		"description": description
	};
	const headers = getDatawolfHeader();
	headers.append("Content-Type", "application/json");

	const datawolfExecution = await fetch(datawolfUrl, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(dataToSubmit),
		credentials: "include",
	});

	const executionId = await datawolfExecution.text();

	return executionId;
}

export function executeDatawolfWorkflow(workflowid, creatorid, title, description, parameters, datasets) {

	return async (dispatch) => {
		const json = await  executeDatawolfWorkflowHelper(workflowid, creatorid, title, description, parameters, datasets);
		return dispatch({
			type: RECEIVE_EXECUTION_ID,
			executionId: json,
			receivedAt: Date.now()
		});
	};

}

export function getHeader() {
	if (process.env.DEPLOY_ENV === "local"){
		const headers = new Headers({
			"x-auth-userinfo": `{"preferred_username":"${config.testUserInfo}"}`,
		});

		return headers;
	}
	else{
		const headers = new Headers({
			"Authorization": cookies.get("Authorization"),
		});

		return headers;
	}
}

function getDatawolfHeader() {
	const headers = new Headers({
		"X-Credential-Username": sessionStorage.user
	});
	return headers;
}

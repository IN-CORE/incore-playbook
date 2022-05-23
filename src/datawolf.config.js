import {IncoreTextField} from "./components/styledComponents/IncoreInput";
import React from "react";
import {getCurrUsername} from "./utils/common";

let datawolfConfig = {};
if (process.env.DEPLOY_ENV === "production") {
	let apiUrl = "https://incore.ncsa.illinois.edu";
	datawolfConfig["executionGetURL"] = `${apiUrl}/datawolf/workflows/${datawolfConfig["workflowId"]}/executions`;
	datawolfConfig["executionPostURL"] = `${apiUrl}/datawolf/executions`;
	datawolfConfig["datasetBaseURL"] = `${apiUrl}/datawolf/datasets`;
}
else if (process.env.DEPLOY_ENV === "test") {
	let apiUrl = "https://incore-tst.ncsa.illinois.edu";
	datawolfConfig["executionGetURL"] = `${apiUrl}/datawolf/workflows/${datawolfConfig["workflowId"]}/executions`;
	datawolfConfig["executionPostURL"] = `${apiUrl}/datawolf/executions`;
	datawolfConfig["datasetBaseURL"] = `${apiUrl}/datawolf/datasets`;
}
else if (process.env.DEPLOY_ENV === "local") {
	let apiUrl = "http://localhost:8080";
	datawolfConfig["executionGetURL"] = `${apiUrl}/datawolf/workflows/${datawolfConfig["workflowId"]}/executions`;
	datawolfConfig["executionPostURL"] = `${apiUrl}/datawolf/executions`;
	datawolfConfig["datasetBaseURL"] = `${apiUrl}/datawolf/datasets`;
}
else if (process.env.DEPLOY_ENV === "development") {
	let apiUrl = "https://incore-dev.ncsa.illinois.edu";
	datawolfConfig["executionGetURL"] = `${apiUrl}/datawolf/workflows/${datawolfConfig["workflowId"]}/executions`;
	datawolfConfig["executionPostURL"] = `${apiUrl}/datawolf/executions`;
	datawolfConfig["datasetBaseURL"] = `${apiUrl}/datawolf/datasets`;
}
else { // default case that used dev environment
	datawolfConfig["executionGetURL"] = `/datawolf/workflows/${datawolfConfig["workflowId"]}/executions`;
	datawolfConfig["executionPostURL"] = "/datawolf/executions";
	datawolfConfig["datasetBaseURL"] = "/datawolf/datasets";
}

const datawolfWorkflowConfig =
{
	"title": "Joplin Playbook",
	"description": "The complete workflow includes Building Damage, EPN Damage, MCS, Functionality Analysis, CGE and Population Dislocations.",
	"wfTitle": "",
	"wfId": "25077ac9-d7d6-45c0-880b-cd08ed35d8d0",
	"inputs": [
		{
			"title": "Building Damage",
			"description": "building damage step",
			"parametersMap": [
				{
					"paramId": "0430a060-38a4-4cb9-873e-b8d8992f017a",
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Result Name",
						"variableName":"title",
						"widget": "TextField",
						"defaultValue": ""
					}
				},
				{
					"paramId": "265fc9c6-b7f1-4475-f7ec-6380d27584d9",
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Building Inventory",
						"variableName":"selectedBldgId",
						"widget": "SelectBox",
						"defaultValue": "buildings"
					}
				},
				{
					"paramId": "82993fee-97c6-4e7c-8904-9083cebc77d1",
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Hazard Type",
						"variableName":"selectedHazardType",
						"widget": "SelectBox",
						"defaultValue": "alllowedHazardTypes"
					}
				},
				// {
				// 	"paramId": "062882da-163d-4623-df0e-2d7778ee7c72",
				// 	"parameters": {
				// 		"step": "Joplin VSAM Nov 2021",
				// 		"title": "Hazard ID",
				// 		"variableName":"selectedHazardId",
				// 		"widget": "SelectBox",
				// 		"defaultValue": "hazards"
				// 	}
				// },
				{
					"paramId": "c2aa45e5-1e4a-4d7c-f72b-d5e18ef5e6a5",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Building Mapping ID",
						"variableName":"buildingMappingId",
						"widget": null,
						"defaultValue": "5e8e3a21eaa8b80001f04f1c"
					}
				},
				{
					"paramId": "deea2122-213e-41af-9149-1dacd71f7a08",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Building Fragility Key",
						"variableName":"buildingFragilityKey",
						"widget": null,
						"defaultValue": "Non-Retrofit Fragility ID Code"
					}
				},
				{
					"paramId": "f30aa0ac-b3d1-4663-c693-e843d78696cb",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Include Liquefaction",
						"variableName":"useLiquefaction",
						"widget": null,
						"defaultValue": "false"
					}
				},
				{
					"paramId": "8f5b37c0-0a1b-4ec8-e25f-1a6eccd5aa06",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Include Hazard Uncertainty",
						"variableName":"useUncertainty",
						"widget": null,
						"defaultValue": "false"
					}
				},
				{
					"paramId": "a66a6ea6-7897-4598-a8a3-cedbe6bc9250",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Number of CPUs",
						"variableName":"numCpus",
						"widget": null,
						"defaultValue": "4"
					}
				},
				{
					"paramId": "0e6e239e-fdfc-4227-e293-3deb5a1305ae",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "IN-CORE Service",
						"variableName":"serviceUrl",
						"widget": null,
						"defaultValue": "https://incore-dev.ncsa.illinois.edu"
					}
				},
				{
					"paramId": "ea483fd9-f2e5-4349-81d9-120ab42bf930",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Username",
						"variableName":"incoreUserName",
						"widget": null,
						"defaultValue": getCurrUsername()
					}
				},
				{
					"paramId": "cbff0e26-199d-4753-db4b-fded9c381145",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Building Damage Ratios",
						"variableName":"damageRatio",
						"widget": null,
						"defaultValue": "5a284f2ec7d30d13bc08209a"
					}
				},
				{
					"paramId": "602dc4f4-9499-4af4-b509-6d8d89b60883",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Damage Interval Keys",
						"variableName":"damageIntervalKeys",
						"widget": null,
						"defaultValue": "DS_0 DS_1 DS_2 DS_3"
					}
				},
				{
					"paramId": "23df8b77-dd93-4fb0-d5cf-01b63051de24",
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "EPF Substations",
						"variableName":"selectedSubstationId",
						"widget":"SelectBox",
						"defaultValue":"epfs"
					}
				},
				{
					"paramId": "9a70052f-00c9-442c-dbd0-0aae2c275064",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "EPF Mapping",
						"variableName": "epfMapping",
						"widget":null,
						"defaultValue":"5d8a326fb9219c068ea798e7"
					}
				},
				{
					"paramId": "7615ad52-0caf-46d3-bbd8-be0fb38813f2",
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "EPF Poles",
						"variableName": "selectedPoleId",
						"widget":"SelectBox",
						"defaultValue":"epfs"
					}
				},
				{
					"paramId": "c4ac97b3-5876-4d77-8f2d-33e58434895a",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "MCS Samples",
						"variableName": "mcsSamples",
						"widget": null,
						"defaultValue": "500"
					}
				},
				{
					"paramId": "fef24c27-a766-44ed-b620-f99fd5ed21c4",
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Interdependency",
						"variableName": "selectedInterdNetworkId",
						"widget": "SelectBox",
						"defaultValue": "interdNetworks"
					}
				},
				{
					"paramId": "ebd6a700-06b6-4b16-9069-4bf28587822e",
					"hidden":true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Model Iterations",
						"variableName": "iterations",
						"widget": null,
						"defaultValue": "500"
					}
				},
				{
					"paramId": "6a7ee57f-3bf4-4f39-c7c0-d508f55beebd",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Seed",
						"variableName": "seed",
						"widget": null,
						"defaultValue": "1111"
					}
				},
				{
					"paramId": "063b7ddb-2233-4d76-8a9c-7ad1f3cb8080",
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Housing Unit Allocation",
						"variableName": "selectedHuaId",
						"widget": "SelectBox",
						"defaultValue": "huas"
					}
				},
				{
					"paramId": "70762642-66ad-4183-beef-20f30306fd69",
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Block Group Data",
						"variableName": "selectedBlockGroupId",
						"widget": "SelectBox",
						"defaultValue": "blockGroups"
					}
				},
				{
					"paramId": "99d1837b-19e5-486e-a44a-76c67e6bc1f1",
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Value Loss Param",
						"variableName": "selectedValueLossId",
						"widget": "SelectBox",
						"defaultValue": "valueLosses"
					}
				},
				{
					"paramId": "c9aaf183-e1da-4234-e84d-1ae7bb52a955",
					"hidden": true,
					"parameters": {
						"step": "Joplin VSAM Nov 2021",
						"title": "Archetype Mapping",
						"variableName": "archetypeMapping",
						"widget": null,
						"defaultValue": "5fca915fb34b193f7a44059b"
					}
				},
				// // this is the input dataset, not sure what to do with it
				// {
				// 	"parameters": {
				// 		"step": "Joplin VSAM Nov 2021",
				// 		"title": "Token"
				// 	}
				// }
			]
		}
	],
	"metadata": []
};


export {datawolfConfig, datawolfWorkflowConfig}

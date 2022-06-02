import React from "react";
import {getCurrUsername} from "./utils/common";

const datawolfWorkflowConfig =
	{
		"title": "Joplin Playbook",
		"description": "The complete workflow includes Building Damage, EPN Damage, MCS, Functionality Analysis, CGE and Population Dislocations.",
		"wfTitle": "",
		"wfId": "25077ac9-d7d6-45c0-880b-cd08ed35d8d0",
		"creatorId": "ce92336c-1ca4-4989-8d6f-33cd3155b5ef",
		"inputs": {
			"parameters":
			// input parameters; might be multiple steps?
				[{
					"title": "Building Damage",
					"description": "building damage step",
					"parametersMap": [
						{
							"paramId": "f37d073e-a43a-4c0d-e037-efcb7c53242c",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Result Name",
								"variableName":"title",
								"widget": "InputTextField",
								"defaultValue": "",
							}
						},
						{
							"paramId": "99f7510e-c2f3-4825-cdea-3cb4aa1b2f1a",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Building Inventory",
								"variableName":"selectedBldgId",
								"widget": "Buildings",
								"defaultValue": ""
							}
						},
						{
							"paramId": "9b4932ee-af22-407e-b09e-7fc89ba1fe4a",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Hazard Type",
								"variableName":"selectedHazardType",
								"widget": "AllowedHazardTypes",
								"defaultValue": ""
							}
						},
						{
							"paramId": "1a83ac6e-20d6-4168-d85d-6764ba904ea9",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Hazard ID",
								"variableName":"selectedHazardId",
								"widget": "Hazards",
							}
						},
						{
							"paramId": "cf424377-d30b-4bac-c20f-aeaac09856b2",
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
							"paramId": "b607cb65-685c-482a-991c-f00c0c40038e",
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
							"paramId": "2df987ba-dca9-4525-b316-b6f05d54856e",
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
							"paramId": "f64ba875-088d-4577-f98d-d6e354fdb259",
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
							"paramId": "ada353de-bd22-4a37-9d53-8323c9ef01c9",
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
							"paramId": "b009f3d5-58a1-4474-db91-c20123fe8822",
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
							"paramId": "c91efb6f-1196-45fc-e950-2a889b5c3d7b",
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
							"paramId": "66a22eae-5307-4c47-d953-2eb7970080f2",
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
							"paramId": "15b4c7ca-87e5-441d-fea2-ebdbcb77388d",
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
							"paramId": "410a3e9f-2e3d-4146-8e57-4fdf84dc645a",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "EPF Substations",
								"variableName":"selectedSubstationId",
								"widget":"Epfs",
								"defaultValue":""
							}
						},
						{
							"paramId": "6f5026f3-22be-46dd-a1c4-9576a0bbf293",
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
							"paramId": "2f0be26e-aef2-4c53-a218-0b7deba5c41c",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "EPF Poles",
								"variableName": "selectedPoleId",
								"widget":"Epfs",
								"defaultValue":""
							}
						},
						{
							"paramId": "98601c47-bce1-4c8a-99b5-3387592a128a",
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
							"paramId": "107bff9c-a35f-432a-d4ae-e89b18e1cee2",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Interdependency",
								"variableName": "selectedInterdNetworkId",
								"widget": "InterdNetworks",
								"defaultValue": ""
							}
						},
						{
							"paramId": "30c18da0-ea79-4861-87ef-be7bec2c8e4e",
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
							"paramId": "1c4bd5db-6023-4855-ea2d-416415db3cde",
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
							"paramId": "a2302ea4-0f60-4d51-aa15-345637611170",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Housing Unit Allocation",
								"variableName": "selectedHuaId",
								"widget": "Huas",
								"defaultValue": ""
							}
						},
						{
							"paramId": "3ee62327-9fa5-48ba-9455-ffe34f480bfb",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Block Group Data",
								"variableName": "selectedBlockGroupId",
								"widget": "BlockGroups",
								"defaultValue": ""
							}
						},
						{
							"paramId": "37d172b3-084f-4c8b-c110-91597b56c7b6",
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Value Loss Param",
								"variableName": "selectedValueLossId",
								"widget": "ValueLosses",
								"defaultValue": ""
							}
						},
						{
							"paramId": "b19c55f4-f1ab-4eda-c508-17438524f78d",
							"hidden": true,
							"parameters": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Archetype Mapping",
								"variableName": "archetypeMapping",
								"widget": null,
								"defaultValue": "5fca915fb34b193f7a44059b"
							}
						}
					]
				}],
			"datasets": // input datasets
				[{
					"title": "Building Damage",
					"description": "building damage step",
					"datasetsMap": [
						{
							"datasetId": "c2b37d2c-f85e-4ce7-cd8f-42e1f463e1b4",
							"datasets": {
								"step": "Joplin VSAM Nov 2021",
								"title": "Token",
								"hidden": true,
								"variableName":"title",
								"widget": null,
							}
						},
					]
				}]
		},
		"outputs": {
			"datasets": [{
				"title": "Building Damage",
				"description": "building damage step",
				"datasetsMap": [
					{
						"datasetId": "f7680752-6639-483b-e3b0-0b544313d13d",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Building damage summary table",
							"variableName":"bldgDmgSummaryTableId",
							"widget": null,
						}
					},
					{
						"datasetId": "a65248b8-6cb5-41bf-dbc2-724eb35f4ddc",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Building maximum damage state",
							"variableName":"bldgMaxDamageStateId",
							"widget": null,
						}
					},
					{
						"datasetId": "bcdd92ea-0eea-473f-da32-5510ca4733b0",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "EPF pole maximum damage state",
							"variableName":"epfPoleMaxDmgStateId",
							"widget": null,
						}
					},
					{
						"datasetId": "67991509-4d0d-4f42-d105-00bbf9a407ef",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "EPF substation maximum damage state",
							"variableName":"epfSubstationMaxDmgStateId",
							"widget": null,
						}
					},
					{
						"datasetId": "0b376e1d-d29d-496c-b39f-e0216085f458",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Monte Carlo building failure summary table",
							"variableName":"mcsBldgSummaryTableId",
							"widget": null,
						}
					},
					{
						"datasetId": "6d9f9b7c-9de5-45ff-d6ce-ac7ce348d429",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Monte Carlo building failure probability",
							"variableName":"mcsBldgFailureProbId",
							"widget": null,
						}
					},
					{
						"datasetId": "3f100fce-10a9-454d-cdf7-428dad7d9df0",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Building funcionality probability",
							"variableName":"bldgFuncProbId",
							"widget": null,
						}
					},
					{
						"datasetId": "3bbd7a45-6bb6-4ebe-d068-e6115c588a40",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Building funcionality summary table",
							"variableName":"bldgFuncSummaryTableId",
							"widget": null,
						}
					},
					// TODO can use this to display error messages
					{
						"datasetId": "a7595336-a834-4a23-a9a2-23484bf51128",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "standard output",
							"variableName":"stdout",
							"widget": null,
						}
					},
					{
						"datasetId": "c38e28b9-2d5e-4d11-db69-1260857de354",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "CGE Domestic Supply",
							"variableName":"cgeDomesticSupplyId",
							"widget": null,
						}
					},
					{
						"datasetId": "32035bf2-eb1f-42db-e17b-d06701128632",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "CGE household income",
							"variableName":"cgeHouseholdIncomeId",
							"widget": null,
						}
					},
					{
						"datasetId": "5ea9be2d-486a-48fe-c43b-7f24c95687a4",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "CGE employment",
							"variableName":"cgeEmploymentId",
							"widget": null,
						}
					},
					{
						"datasetId": "8f4b896f-0425-4bb4-c56d-df6fcb097740",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation heatmap",
							"variableName":"popdislHeatmapId",
							"widget": null,
						}
					},
					{
						"datasetId": "09128994-8120-4184-b61e-9ffc5c29bccc",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Total Population dislocation",
							"variableName":"totalDislocationId",
							"widget": null,
						}
					},
					{
						"datasetId": "8868d685-0aeb-42b9-d3a4-720dfea27fed",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by race",
							"variableName":"dislocationByRaceId",
							"widget": null,
						}
					},
					{
						"datasetId": "2a468adf-0055-41b7-d80d-7826acc5dff0",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by tenure",
							"variableName":"dislocationByTenureId",
							"widget": null,
						}
					},
					{
						"datasetId": "0ffd4649-4352-4c88-fd30-2752da1279b6",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by income",
							"variableName":"dislocationByIncomeId",
							"widget": null,
						}
					},
					{
						"datasetId": "7b69e147-d9ac-475c-b9f6-54a391350326",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by housing type",
							"variableName":"dislocationByHousingTypeId",
							"widget": null,
						}
					},
					{
						"datasetId": "aa3451a3-f0a9-47af-feb2-a4cdfa9250e1",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by disability",
							"variableName":"dislocationByDisabilityId",
							"widget": null,
						}
					},
				]
			}]
		},
		"metadata": []
	};

let datawolfConfig = {
	// TODO need to comment those out and address in the next PR
	"datasets":  {
		// input
		"incoreTokenId":"c2b37d2c-f85e-4ce7-cd8f-42e1f463e1b4",

		// bldg dmg
		"bldgDmgSummaryTableId":"f7680752-6639-483b-e3b0-0b544313d13d", // preview
		"bldgMaxDamageStateId":"a65248b8-6cb5-41bf-dbc2-724eb35f4ddc", // preview

		// pole dmg
		"epfPoleMaxDmgStateId":"bcdd92ea-0eea-473f-da32-5510ca4733b0",

		// substation dmg
		"epfSubstationMaxDmgStateId":"67991509-4d0d-4f42-d105-00bbf9a407ef",

		// mcs
		"mcsBldgSummaryTableId":"0b376e1d-d29d-496c-b39f-e0216085f458",
		"mcsBldgFailureProbId":"6d9f9b7c-9de5-45ff-d6ce-ac7ce348d429",

		// bldg func
		"bldgFuncProbId":"3f100fce-10a9-454d-cdf7-428dad7d9df0",
		"bldgFuncSummaryTableId":"3bbd7a45-6bb6-4ebe-d068-e6115c588a40",

		// TODO
		"stdout":"a7595336-a834-4a23-a9a2-23484bf51128",

		// cge
		"cgeDomesticSupplyId":"c38e28b9-2d5e-4d11-db69-1260857de354",
		"cgeHouseholdIncomeId":"32035bf2-eb1f-42db-e17b-d06701128632",
		"cgeEmploymentId":"5ea9be2d-486a-48fe-c43b-7f24c95687a4",

		// popdislocation
		"popdislHeatmapId":"8f4b896f-0425-4bb4-c56d-df6fcb097740",
		"totalDislocationId":"09128994-8120-4184-b61e-9ffc5c29bccc",
		"dislocationByRaceId":"8868d685-0aeb-42b9-d3a4-720dfea27fed",
		"dislocationByTenureId":"2a468adf-0055-41b7-d80d-7826acc5dff0",
		"dislocationByIncomeId":"0ffd4649-4352-4c88-fd30-2752da1279b6",
		"dislocationByHousingTypeId":"7b69e147-d9ac-475c-b9f6-54a391350326",
		"dislocationByDisabilityId":"aa3451a3-f0a9-47af-feb2-a4cdfa9250e1"
	},
};
if (process.env.DEPLOY_ENV === "production") {
	let apiUrl = "https://incore.ncsa.illinois.edu";
	datawolfConfig["executionGetURL"] = `${apiUrl}/datawolf/workflows/${datawolfWorkflowConfig["wfId"]}/executions`;
	datawolfConfig["executionPostURL"] = `${apiUrl}/datawolf/executions`;
	datawolfConfig["datasetBaseURL"] = `${apiUrl}/datawolf/datasets`;
}
else if (process.env.DEPLOY_ENV === "test") {
	let apiUrl = "https://incore-tst.ncsa.illinois.edu";
	datawolfConfig["executionGetURL"] = `${apiUrl}/datawolf/workflows/${datawolfWorkflowConfig["wfId"]}/executions`;
	datawolfConfig["executionPostURL"] = `${apiUrl}/datawolf/executions`;
	datawolfConfig["datasetBaseURL"] = `${apiUrl}/datawolf/datasets`;
}
else if (process.env.DEPLOY_ENV === "local") {
	let apiUrl = "http://localhost:8080";
	datawolfConfig["executionGetURL"] = `${apiUrl}/datawolf/workflows/${datawolfWorkflowConfig["wfId"]}/executions`;
	datawolfConfig["executionPostURL"] = `${apiUrl}/datawolf/executions`;
	datawolfConfig["datasetBaseURL"] = `${apiUrl}/datawolf/datasets`;
}
else if (process.env.DEPLOY_ENV === "development") {
	let apiUrl = "https://incore-dev.ncsa.illinois.edu";
	datawolfConfig["executionGetURL"] = `${apiUrl}/datawolf/workflows/${datawolfWorkflowConfig["wfId"]}/executions`;
	datawolfConfig["executionPostURL"] = `${apiUrl}/datawolf/executions`;
	datawolfConfig["datasetBaseURL"] = `${apiUrl}/datawolf/datasets`;
}
else { // default case that used dev environment
	datawolfConfig["executionGetURL"] = `/datawolf/workflows/${datawolfWorkflowConfig["wfId"]}/executions`;
	datawolfConfig["executionPostURL"] = "/datawolf/executions";
	datawolfConfig["datasetBaseURL"] = "/datawolf/datasets";
}

export {datawolfConfig, datawolfWorkflowConfig};

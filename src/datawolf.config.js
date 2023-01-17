import React from "react";

import {getCurrUsername} from "./utils/common";

let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

const datawolfWorkflowConfig =
	{
		"title": "Joplin Playbook",
		"description": "The complete workflow includes Building Damage, EPN Damage, MCS, Functionality Analysis, CGE and Population Dislocations.",
		"wfTitle": "",
		"wfId": "25077ac9-d7d6-45c0-880b-cd08ed35d8d0",
		"creatorId": "ce92336c-1ca4-4989-8d6f-33cd3155b5ef",
		"inputs": {
			"parameters":
				[
					{
						"title": "Building Damage Result Name",
						"description": "",
						"variableName":"title",
						"widget": "InputTextField",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "f37d073e-a43a-4c0d-e037-efcb7c53242c",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Building Damage Result Name"
								}
							}
						]
					},
					{
						"title": "Building Inventory",
						"description": "",
						"variableName":"selectedBldgId",
						"widget": "Buildings",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "99f7510e-c2f3-4825-cdea-3cb4aa1b2f1a",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Building Inventory",
								}
							},
						]
					},
					{
						"title": "Hazard Type",
						"description": "",
						"variableName":"selectedHazardType",
						"widget": "AllowedHazardTypes",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "9b4932ee-af22-407e-b09e-7fc89ba1fe4a",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Hazard Type",
								}
							},
						]
					},
					{
						"title": "Hazard ID",
						"description": "",
						"variableName":"selectedHazardId",
						"widget": "Hazards",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "1a83ac6e-20d6-4168-d85d-6764ba904ea9",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Hazard ID",
								}
							},
						]
					},
					{
						"title": "Building Mapping ID",
						"description": "",
						"variableName":"buildingMappingId",
						"widget": null,
						"defaultValue": "5e8e3a21eaa8b80001f04f1c",
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "cf424377-d30b-4bac-c20f-aeaac09856b2",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Building Mapping ID",
								}
							},
						]
					},
					{
						"title": "Building Fragility Key",
						"description": "",
						"variableName":"buildingFragilityKey",
						"widget": null,
						"defaultValue": "",
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "b607cb65-685c-482a-991c-f00c0c40038e",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Building Fragility Key",
								}
							},
						]
					},
					{
						"title": "Include Liquefaction",
						"description": "",
						"variableName":"useLiquefaction",
						"widget": null,
						"defaultValue": "",
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "2df987ba-dca9-4525-b316-b6f05d54856e",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Include Liquefaction",
								}
							},
						]
					},
					{
						"title": "Include Hazard Uncertainty",
						"description": "",
						"variableName":"useUncertainty",
						"widget": null,
						"defaultValue": "",
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "f64ba875-088d-4577-f98d-d6e354fdb259",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Include Hazard Uncertainty",
								}
							},
						]
					},
					{
						"title": "Number of CPUs",
						"description": "",
						"variableName":"numCpus",
						"widget": null,
						"defaultValue": 8,
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "ada353de-bd22-4a37-9d53-8323c9ef01c9",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Number of CPUs",
								}
							},
						]
					},
					{
						"title": "IN-CORE Service",
						"description": "",
						"variableName":"serviceUrl",
						"widget": null,
						"defaultValue": "https://incore-dev.ncsa.illinois.edu",
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "b009f3d5-58a1-4474-db91-c20123fe8822",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "IN-CORE Service",
								}
							},
						]
					},
					{
						"title": "Username",
						"description": "",
						"variableName":"incoreUserName",
						"widget": null,
						"defaultValue": getCurrUsername(hostname),
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "c91efb6f-1196-45fc-e950-2a889b5c3d7b",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Username",
								}
							},
						]
					},
					{
						"title": "Building Damage Ratios",
						"description": "",
						"variableName":"damageRatio",
						"widget": null,
						"defaultValue": "5a284f2ec7d30d13bc08209a",
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "66a22eae-5307-4c47-d953-2eb7970080f2",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Building Damage Ratios",
								}
							},
						]
					},
					{
						"title": "Damage Interval Keys",
						"description": "",
						"variableName":"damageIntervalKeys",
						"widget": null,
						"defaultValue": "DS_0 DS_1 DS_2 DS_3",
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "15b4c7ca-87e5-441d-fea2-ebdbcb77388d",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Damage Interval Keys",
								}
							},
						]
					},
					{
						"title": "EPF Substations",
						"description": "",
						"variableName":"selectedSubstationId",
						"widget":"Epfs",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "410a3e9f-2e3d-4146-8e57-4fdf84dc645a",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "EPF Substations",
								}
							},
						]
					},
					{
						"title": "EPF Mapping",
						"description": "",
						"variableName": "epfMapping",
						"widget":null,
						"defaultValue":"5d8a326fb9219c068ea798e7",
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "6f5026f3-22be-46dd-a1c4-9576a0bbf293",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "EPF Mapping",
								}
							},
						]
					},
					{
						"title": "EPF Poles",
						"description": "",
						"variableName": "selectedPoleId",
						"widget":"Epfs",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "2f0be26e-aef2-4c53-a218-0b7deba5c41c",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "EPF Poles",
								}
							},
						]
					},
					{
						"title": "MCS Samples",
						"description": "",
						"variableName": "mcsSamples",
						"widget": null,
						"defaultValue": 500,
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "98601c47-bce1-4c8a-99b5-3387592a128a",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "MCS Samples",
								}
							},
						]
					},
					{
						"title": "Interdependency",
						"description": "",
						"variableName": "selectedInterdNetworkId",
						"widget": "InterdNetworks",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "107bff9c-a35f-432a-d4ae-e89b18e1cee2",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Interdependency",
								}
							},
						]
					},
					{
						"title": "Model Iterations",
						"description": "",
						"variableName": "iterations",
						"widget": null,
						"defaultValue": 1,
						"hidden":true,
						"parametersMap": [
							{
								"paramId": "30c18da0-ea79-4861-87ef-be7bec2c8e4e",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Model Iterations",
								}
							},
						]
					},
					{
						"title": "Seed",
						"description": "",
						"variableName": "seed",
						"widget": null,
						"defaultValue": 1111,
						"hidden":true,
						"parametersMap": [
							{
								"paramId": "1c4bd5db-6023-4855-ea2d-416415db3cde",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Seed",
								}
							},
						]
					},
					{
						"title": "Building to Sector Table",
						"description": "",
						"variableName": "selectedBldgToSector",
						"widget": "SectorShocks",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "CGE",
								}
							},
						]
					},
					{
						"title": "Housing Unit Allocation",
						"description": "",
						"variableName": "selectedHuaId",
						"widget": "Huas",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "a2302ea4-0f60-4d51-aa15-345637611170",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Housing Unit Allocation",
								}
							},
						]
					},
					{
						"title": "Block Group Data",
						"description": "",
						"variableName": "selectedBlockGroupId",
						"widget": "BlockGroups",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "3ee62327-9fa5-48ba-9455-ffe34f480bfb",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Block Group Data",
								}
							},
						]
					},
					{
						"title": "Value Loss Param",
						"description": "",
						"variableName": "selectedValueLossId",
						"widget": "ValueLosses",
						"defaultValue": null,
						"parametersMap": [
							{
								"paramId": "37d172b3-084f-4c8b-c110-91597b56c7b6",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Value Loss Param",
								}
							},
						]
					},
					{
						"title": "Archetype Mapping",
						"description": "",
						"variableName": "archetypeMapping",
						"widget": null,
						"defaultValue": "5fca915fb34b193f7a44059b",
						"hidden": true,
						"parametersMap": [
							{
								"paramId": "b19c55f4-f1ab-4eda-c508-17438524f78d",
								"parameters": {
									"step": "Joplin VSAM Nov 2021",
									"title": "Archetype Mapping",
								}
							},
						]
					}
				],
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
							"variableName":"bldgDmgSummaryTableContent",
							"widget": "BldgDamage",
						}
					},
					{
						"datasetId": "a65248b8-6cb5-41bf-dbc2-724eb35f4ddc",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Building maximum damage state ID",
							"variableName":"bldgMaxDamageStateINCOREId",
							"widget": "BldgDamage",
						}
					},
					{
						"datasetId": "bcdd92ea-0eea-473f-da32-5510ca4733b0",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "EPF pole maximum damage state",
							"variableName":"poleMaxDmgStateINCOREId",
							"widget": "PoleDamage",
						}
					},
					{
						"datasetId": "67991509-4d0d-4f42-d105-00bbf9a407ef",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "EPF substation maximum damage state",
							"variableName":"substationMaxDmgStateINCOREId",
							"widget": "SubstationDamage",
						}
					},
					{
						"datasetId": "0b376e1d-d29d-496c-b39f-e0216085f458",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Monte Carlo building failure summary table",
							"variableName":"mcsBldgSummaryTableContent",
							"widget": "BldgMCS",
						}
					},
					{
						"datasetId": "6d9f9b7c-9de5-45ff-d6ce-ac7ce348d429",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Monte Carlo building failure probability Layer ID",
							"variableName":"mcsBldgFailureProbINCOREId",
							"widget": "BldgMCS",
						}
					},
					{
						"datasetId": "3f100fce-10a9-454d-cdf7-428dad7d9df0",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Building funcionality probability layer ID",
							"variableName":"bldgFuncProbINCOREId",
							"widget": "BldgFunctionality",
						}
					},
					{
						"datasetId": "3bbd7a45-6bb6-4ebe-d068-e6115c588a40",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Building funcionality summary table",
							"variableName":"bldgFuncSummaryTableContent",
							"widget": "BldgFunctionality",
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
							"variableName":"cgeDomesticSupplyContent",
							"widget": "CGE",
						}
					},
					{
						"datasetId": "32035bf2-eb1f-42db-e17b-d06701128632",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "CGE household income",
							"variableName":"cgeHouseholdIncomeContent",
							"widget": "CGE",
						}
					},
					{
						"datasetId": "5ea9be2d-486a-48fe-c43b-7f24c95687a4",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "CGE employment",
							"variableName":"cgeEmploymentContent",
							"widget": "CGE",
						}
					},
					{
						"datasetId": "8f4b896f-0425-4bb4-c56d-df6fcb097740",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation heatmap",
							"variableName":"popdislHeatmapINCOREId",
							"widget": "PopDislocation",
						}
					},
					{
						"datasetId": "09128994-8120-4184-b61e-9ffc5c29bccc",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Total Population dislocation",
							"variableName":"totalDislTableContent",
							"widget": "PopDislocation",
						}
					},
					{
						"datasetId": "8868d685-0aeb-42b9-d3a4-720dfea27fed",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by race",
							"variableName":"dislocationByRaceContent",
							"widget": "PopDislocation",
						}
					},
					{
						"datasetId": "2a468adf-0055-41b7-d80d-7826acc5dff0",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by tenure",
							"variableName":"dislocationByTenureContent",
							"widget": "PopDislocation",
						}
					},
					{
						"datasetId": "0ffd4649-4352-4c88-fd30-2752da1279b6",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by income",
							"variableName":"dislocationByIncomeContent",
							"widget": "PopDislocation",
						}
					},
					{
						"datasetId": "7b69e147-d9ac-475c-b9f6-54a391350326",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by housing type",
							"variableName":"dislocationByHousingTypeContent",
							"widget": "PopDislocation",
						}
					},
					{
						"datasetId": "aa3451a3-f0a9-47af-feb2-a4cdfa9250e1",
						"datasets": {
							"step": "Joplin VSAM Nov 2021",
							"title": "Population dislocation by disability",
							"variableName":"dislocationByDisabilityContent",
							"widget": "PopDislocation",
						}
					},
				]
			}]
		},
		"metadata": []
	};


let datawolfConfig = {};

// use default
datawolfConfig["executionGetURL"] = `${hostname}/datawolf/workflows/${datawolfWorkflowConfig["wfId"]}/executions`;
datawolfConfig["executionPostURL"] = `${hostname}/datawolf/executions`;
datawolfConfig["datasetBaseURL"] = `${hostname}/datawolf/datasets`;
datawolfConfig["retreiveTimeInterval"] = 10 * 1000;


export {datawolfWorkflowConfig, datawolfConfig};

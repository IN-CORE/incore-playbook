import React from "react";

const datawolfWorkflowConfig = {
	title: "slc-community-wf",
	description: "",
	wfTitle: "",
	wfId: "5607938d-d266-4995-86f4-5fc204b51999",
	creatorId: "71d098e9-a148-4d9d-bc92-5ac756556848",
	inputs: {
		parameters:
			// input parameters; might be multiple steps?
			[
				{
					title: "Building Inventory",
					description: "Building inventory",
					variableName: "selectedBldgId",
					widget: "Buildings",
					defaultValue: null,
					parametersMap: [
						{
							paramId: "de4649e7-be6b-46ea-f2a8-86e0353b8b61",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Buildings Inventory"
							}
						},
						{
							paramId: "4f0c9d2f-e457-4c34-b319-65ccd71131c6",
							parameters: {
								step: "Building-Dmg-Summary",
								title: "Buildings Inventory"
							}
						},
						{
							paramId: "685f8d28-2d18-43ee-c835-bccb4b20e303",
							parameters: {
								step: "SLC-bldg-cluster",
								title: "Buildings Inventory"
							}
						},
						{
							paramId: "b1828d34-8f96-454a-d083-9f1a5a0b0ef4",
							parameters: {
								step: "SLC-store-bldg-func",
								title: "Buildings Inventory"
							}
						},
						{
							paramId: "1a15df03-c590-43ba-bb29-0aa2e86dd4ae",
							parameters: {
								step: "SLC-Bldg-Max-Dmg-Store",
								title: "Buildings Inventory"
							}
						}
					]
				},
				{
					title: "INCORE Service URL",
					description: "INCORE service URL to point to",
					variableName: "serviceUrl",
					widget: null,
					hidden: true,
					defaultValue: "https://incore-dev.ncsa.illinois.edu",
					parametersMap: [
						{
							paramId: "9518d2f3-56c8-4f4d-b9c8-480265249c92",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "IN-CORE Service"
							}
						},
						{
							paramId: "9bc4a17c-dcda-45ea-bacb-c39d71988d21",
							parameters: {
								step: "SLC-mc",
								title: "IN-CORE Service"
							}
						},
						{
							paramId: "e4edf408-7414-408d-9080-4e8406c191fd",
							parameters: {
								step: "SLC-dmg-summary",
								title: "IN-CORE Service"
							}
						},
						{
							paramId: "05127f39-0c0a-4e7c-f188-5beb9be3650f",
							parameters: {
								step: "SLC-func",
								title: "In-Core Service"
							}
						},
						{
							paramId: "916a4dd6-c4ae-4c76-b907-a591f258ab8c",
							parameters: {
								step: "SLC-bldg-cluster",
								title: "In-Core Service"
							}
						},
						{
							paramId: "256e41e8-a313-4a56-f5c3-91e582ca66f3",
							parameters: {
								step: "SLC-store-bldg-func",
								title: "In-Core Service"
							}
						},
						{
							paramId: "92d35e96-de7b-47fc-816b-1a512529f68e",
							parameters: {
								step: "SLC-Bldg-Max-Dmg-Store",
								title: "In-Core Service"
							}
						}
					]
				},
				{
					title: "Bldg Dmg result name",
					description: "",
					variableName: "titleBldgDmg",
					widget: null,
					hidden: true,
					defaultValue: "bldg-dmg",
					parametersMap: [
						{
							paramId: "a9a74f60-43fe-475e-f60d-5ee945eda778",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Result Name"
							}
						}
					]
				},
				{
					title: "Hazard Type",
					description: "",
					variableName: "selectedHazardType",
					widget: "AllowedHazardTypes",
					defaultValue: null,
					parametersMap: [
						{
							paramId: "dae2b658-8d17-4bbe-ad76-19c5ae58b1c6",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Hazard Type"
							}
						}
					]
				},
				{
					title: "Hazard ID",
					description: "",
					variableName: "selectedHazardId",
					widget: "Hazards",
					defaultValue: null,
					parametersMap: [
						{
							paramId: "5bb8c2c9-c09d-4a13-a5ed-20d5cb88d58c",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Hazard ID"
							}
						}
					]
				},
				{
					title: "Building Fragility Key",
					description: "",
					variableName: "buildingFragilityKey",
					widget: null,
					defaultValue: "",
					hidden: true,
					parametersMap: [
						{
							paramId: "08576e61-eea9-48c6-f1f7-0663ad254b9d",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Building Fragility Key"
							}
						}
					]
				},
				{
					title: "Include Liquefaction",
					description: "",
					variableName: "useLiquefaction",
					widget: null,
					defaultValue: "True",
					hidden: true,
					parametersMap: [
						{
							paramId: "9e15011a-4d94-4e6f-da40-e1da1220aef2",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Include Liquefaction"
							}
						}
					]
				},
				{
					title: "Include Hazard Uncertainty",
					description: "",
					variableName: "useUncertainty",
					widget: null,
					defaultValue: "",
					hidden: true,
					parametersMap: [
						{
							paramId: "154b16b7-e27d-48c8-9af2-42c1e118f912",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Include Hazard Uncertainty"
							}
						}
					]
				},
				{
					title: "Number of CPUs",
					description: "",
					variableName: "numCpus",
					widget: null,
					defaultValue: 8,
					hidden: true,
					parametersMap: [
						{
							paramId: "80641929-1d28-4da7-ed04-5b460e9aed67",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Number of CPUs"
							}
						},
						{
							paramId: "bad24430-3315-4839-d325-b828f4e4c39d",
							parameters: {
								step: "SLC-mc",
								title: "Number of CPUs"
							}
						}
					]
				},
				{
					title: "Seed",
					description: "",
					variableName: "seed",
					widget: null,
					defaultValue: "1234",
					hidden: true,
					parametersMap: [
						{
							paramId: "c33e00dd-8fe6-4b33-cad0-7915fa0bbb0f",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Seed"
							}
						},
						{
							paramId: "d4cb41c0-f77f-42a9-9cbd-322c8fd3244f",
							parameters: {
								step: "SLC-mc",
								title: "Seed"
							}
						}
					]
				},
				{
					title: "Liquefaction geology dataset id",
					description: "",
					variableName: "liquefactionGeologyDatasetId",
					widget: null,
					defaultValue: "6335ae58ac33a63950a9d8a1",
					hidden: true,
					parametersMap: [
						{
							paramId: "98525e53-1feb-4464-b697-bb872bab5ee3",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "liquefaction geology dataset id"
							}
						}
					]
				},
				{
					title: "Building Mapping ID",
					description: "",
					variableName: "buildingMappingId",
					widget: null,
					defaultValue: "6309005ad76c6d0e1f6be081",
					hidden: true,
					parametersMap: [
						{
							paramId: "4fbbb6a8-99de-4539-b12f-2da17888d2a7",
							parameters: {
								step: "SLC-bldg-dmg",
								title: "Building Mapping ID"
							}
						}
					]
				},
				{
					title: "max state result name",
					description: "",
					variableName: "resultNameMaxState",
					widget: null,
					defaultValue: "bldg-max-dmg",
					hidden: true,
					parametersMap: [
						{
							paramId: "94906bb4-b8da-4888-8210-5f2d6dfdc400",
							parameters: {
								step: "SLC-max-state",
								title: "max state result name"
							}
						}
					]
				},
				{
					title: "MC result name",
					description: "",
					variableName: "resultNameMc",
					widget: null,
					defaultValue: "bldg-mc",
					hidden: true,
					parametersMap: [
						{
							paramId: "c4391395-7e56-49dc-ab21-f6c1eedc6e03",
							parameters: {
								step: "SLC-mc",
								title: "result name"
							}
						}
					]
				},
				{
					title: "Number of Samples",
					description: "",
					variableName: "numSamplesMc",
					widget: null,
					defaultValue: 100,
					hidden: true,
					parametersMap: [
						{
							paramId: "8f97b01b-2101-49df-e3ed-611281c5853c",
							parameters: {
								step: "SLC-mc",
								title: "Number of Samples"
							}
						}
					]
				},
				{
					title: "Damage Interval Keys",
					description: "",
					variableName: "damageIntervalKeysMc",
					widget: null,
					defaultValue: "DS_0 DS_1 DS_2 DS_3",
					hidden: true,
					parametersMap: [
						{
							paramId: "e4faf01e-a83b-438b-bf9f-0bd95a5b67dc",
							parameters: {
								step: "SLC-mc",
								title: "Damage Interval Keys"
							}
						}
					]
				},
				{
					title: "Failure State Keys",
					description: "",
					variableName: "failureStateKeysMc",
					widget: null,
					defaultValue: "DS_1 DS_2 DS_3",
					hidden: true,
					parametersMap: [
						{
							paramId: "acee9e9b-a775-4c6a-ab99-2dcd9fc7bee4",
							parameters: {
								step: "SLC-mc",
								title: "Failure State Keys"
							}
						}
					]
				},
				{
					title: "Damage summary result name",
					description: "",
					variableName: "resultNameDmgSummary",
					widget: null,
					defaultValue: "bldg-dmg-summary",
					hidden: true,
					parametersMap: [
						{
							paramId: "3301a595-d595-4131-8cf9-a077623fc3b0",
							hidden: true,
							parameters: {
								step: "SLC-dmg-summary",
								title: "result name"
							}
						}
					]
				},
				{
					title: "Archetype Mapping",
					description: "",
					variableName: "archetypeMapping",
					widget: null,
					defaultValue: "633b18a41f950c126bc90406",
					hidden: true,
					parametersMap: [
						{
							paramId: "d6a35143-2d5f-43fd-e977-d4837f423f4b",
							parameters: {
								step: "SLC-dmg-summary",
								title: "Archetype Mapping"
							}
						},
						{
							paramId: "27983842-9ded-44bc-c285-3cdf44b7d351",
							parameters: {
								step: "SLC-bldg-cluster",
								title: "Archetype Mapping"
							}
						}
					]
				},
				{
					title: "Functionality result name",
					description: "",
					variableName: "resultNameFunc",
					widget: null,
					defaultValue: "bldg-func",
					hidden: true,
					parametersMap: [
						{
							paramId: "0596851d-a1cf-4890-b9cb-5ba0aed9eebf",
							parameters: {
								step: "SLC-func",
								title: "Result Name"
							}
						}
					]
				},
				{
					title: "Bldg Cluster result name",
					description: "",
					variableName: "resultNameBldgCluster",
					widget: null,
					defaultValue: "bldg-cluster",
					hidden: true,
					parametersMap: [
						{
							paramId: "e540961a-23b8-4b46-9ca3-b97a60a82e82",
							parameters: {
								step: "SLC-bldg-cluster",
								title: "Result Name"
							}
						}
					]
				},
				{
					title: "Store Bldg func result name",
					description: "",
					variableName: "resultNameBldgFuncStore",
					widget: null,
					defaultValue: "store-bldg-func",
					hidden: true,
					parametersMap: [
						{
							paramId: "70366b27-8738-415e-b2dd-7ae094cad0e3",
							parameters: {
								step: "SLC-store-bldg-func",
								title: "Result Name"
							}
						}
					]
				},
				{
					title: "Bldg Func Output Type",
					description: "",
					variableName: "outputTypeBldgFuncStore",
					widget: null,
					defaultValue: "incore:funcProbability",
					hidden: true,
					parametersMap: [
						{
							paramId: "4c22759f-6512-47e1-db8b-141a8f0139e9",
							parameters: {
								step: "SLC-store-bldg-func",
								title: "Output Type"
							}
						}
					]
				},
				{
					title: "Bldg Func Output Format",
					description: "",
					variableName: "outputFormatBldgFuncStore",
					widget: null,
					defaultValue: "table",
					hidden: true,
					parametersMap: [
						{
							paramId: "4a0391a3-be8c-42bb-c3c8-dd51e25fa90e",
							parameters: {
								step: "SLC-store-bldg-func",
								title: "Output Format"
							}
						}
					]
				},
				{
					title: "Store Bldg Max Dmg result name",
					description: "",
					variableName: "resultNameMaxDmgStore",
					widget: null,
					defaultValue: "store-bldg-max_dmg",
					hidden: true,
					parametersMap: [
						{
							paramId: "420d2e35-61b8-4d87-f9e5-3bcf021f469d",
							parameters: {
								step: "SLC-Bldg-Max-Dmg-Store",
								title: "Result Name"
							}
						}
					]
				},
				{
					title: "Bldg Max Dmg output type",
					description: "",
					variableName: "outputTypeMaxDmgStore",
					widget: null,
					defaultValue: "incore:funcProbability",
					hidden: true,
					parametersMap: [
						{
							paramId: "90892a6c-85b5-4117-8c1a-fc8dc0e85564",
							hidden: true,
							parameters: {
								step: "SLC-Bldg-Max-Dmg-Store",
								title: "Output Type"
							}
						}
					]
				},
				{
					title: "Bldg Max Dmg Output Format",
					description: "",
					variableName: "outputFormatMaxDmgStore",
					widget: null,
					defaultValue: "table",
					hidden: true,
					parametersMap: [
						{
							paramId: "f9007017-f9bc-4fb0-a20a-825ae6613fce",
							parameters: {
								step: "SLC-Bldg-Max-Dmg-Store",
								title: "Output Format"
							}
						}
					]
				}
			],
		// input datasets
		datasets: [
			{
				title: "Token",
				description: "",
				hidden: true,
				variableName: "token",
				widget: null,
				datasetsMap: [
					{
						datasetId: "80f9f9f0-8c66-48db-aac3-964584a314d9",
						datasets: {
							step: "SLC-bldg-dmg",
							title: "Token"
						}
					},
					{
						datasetId: "487cce5b-8a0b-4ace-9ac0-3654c1b77906",
						datasets: {
							step: "SLC-mc",
							title: "Token"
						}
					},
					{
						datasetId: "0a4d4065-26cb-4909-c51e-5da7dfca6bbb",
						datasets: {
							step: "SLC-dmg-summary",
							title: "Token"
						}
					},
					{
						datasetId: "932678fb-85e6-4902-b955-cc33aed75eac",
						datasets: {
							step: "SLC-func",
							title: "Token"
						}
					},
					{
						datasetId: "64914de7-28fd-4d38-e6fd-9e9f35a1576a",
						datasets: {
							step: "SLC-bldg-cluster",
							title: "Token"
						}
					},
					{
						datasetId: "a9da3e09-1d6e-4804-d85b-2bb896712e31",
						datasets: {
							step: "SLC-store-bldg-func",
							title: "Token"
						}
					},
					{
						datasetId: "e4f58b67-112a-4010-8253-72015c5c436b",
						datasets: {
							step: "SLC-Bldg-Max-Dmg-Store",
							title: "Token"
						}
					}
				]
			}
		]
	},
	outputs: {
		datasets: [
			{
				title: "Building Damage",
				description: "building damage step",
				datasetsMap: [
					{
						datasetId: "2f9b0e9c-55ec-4e33-b122-f47172a9af2c",
						datasets: {
							step: "SLC-dmg-summary",
							title: "Building damage summary table",
							variableName: "bldgDmgSummaryTableContent",
							widget: "BldgDamage"
						}
					},
					{
						datasetId: "a9318a0c-1e7e-49de-df7f-96795a17fb34",
						datasets: {
							step: "SLC-Bldg-Max-Dmg-Store",
							title: "Building maximum damage state ID",
							variableName: "bldgMaxDamageStateINCOREId",
							widget: "BldgDamage"
						}
					},
					{
						datasetId: "9fc73be5-7fae-47d0-a21c-d16c287e65ad",
						datasets: {
							step: "SLC-store-bldg-func",
							title: "building functionality Layer ID",
							variableName: "bldgFuncProbINCOREId",
							widget: "BldgFunctionality"
						}
					},
					{
						datasetId: "08d2248b-b405-47e9-ec50-cc03eeba67e1",
						datasets: {
							step: "SLC-bldg-func",
							title: "Building functionality summary table",
							variableName: "bldgFuncSummaryTableContent",
							widget: "BldgFunctionality"
						}
					}
					// TODO can use this to display error messages
					// {
					// 	"datasetId": "a7595336-a834-4a23-a9a2-23484bf51128",
					// 	"datasets": {
					// 		"step": "SLC",
					// 		"title": "standard output",
					// 		"variableName":"stdout",
					// 		"widget": null,
					// 	}
					// }
				]
			}
		]
	},
	metadata: []
};

let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

let datawolfConfig = {};
datawolfConfig["executionGetURL"] = `${hostname}/datawolf/workflows/${datawolfWorkflowConfig["wfId"]}/executions`;
datawolfConfig["executionPostURL"] = `${hostname}/datawolf/executions`;
datawolfConfig["datasetBaseURL"] = `${hostname}/datawolf/datasets`;
datawolfConfig["retreiveTimeInterval"] = 10 * 1000;

export { datawolfWorkflowConfig, datawolfConfig };

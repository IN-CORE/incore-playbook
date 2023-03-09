const datawolfWorkflowConfig = {
	title: "Joplin Playbook",
	description:
		"The complete workflow includes Building Damage, EPN Damage, MCS, Functionality Analysis, CGE and Population Dislocations.",
	wfTitle: "joplin-community-wf-v1",
	wfId: "05e5ac18-c202-4a8b-973d-01afcae20b14",
	creatorId: "901e85ca-1a52-4917-83f8-e387b95a259b", // commresileince
	inputs: {
		parameters: [
			{
				title: "IN-CORE Service URL",
				description: "IN-CORE service URL to point to",
				variableName: "serviceUrl",
				widget: null,
				hidden: true,
				defaultValue: "https://incore-dev.ncsa.illinois.edu",
				parametersMap: [
					{
						paramId: "ad3f373b-83a4-4a64-9a52-286989e8fae1",
						parameters: {
							step: "BuildingDamage",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "38a0ecc3-6a49-4629-d75d-324d2b7cf79a",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "b668dedd-66ec-4fa0-e450-42e181accd7d",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "5a299c82-de5a-425e-c614-4131f832bfb2",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "b9ef16f4-c7ad-4102-d655-3e003d07e19a",
						parameters: {
							step: "Sub-EpfDamage",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "93f51c98-ab21-4276-f62f-6766e8f29607",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "6e9d5ffd-422d-4d0e-9d96-9fd2d79b339e",
						parameters: {
							step: "Poles-EpfDamage",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "48105838-ae85-4773-ba6a-7805abac1dbd",
						parameters: {
							step: "Pole-Max-Store Result",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "62a70e86-ae79-42cd-f5a5-58c9cabb2b05",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "ff288535-08e9-4faa-da8f-691f7642e641",
						parameters: {
							step: "Poles-MonteCarloFailureProbability",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "6a22d9f4-dee0-4fae-e594-bb1c0e0f9b66",
						parameters: {
							step: "BuildingFunctionality",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "3213ed04-9a3c-4ecc-b9da-3d42946e5fba",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "e812b780-a5a5-47fa-aea7-1d29e4577444",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "91b27c64-7508-4414-decb-a44f53f2ff97",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "ff748e6c-3410-4751-bad4-ff98a7594026",
						parameters: {
							step: "Building-Func-Cluster",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "3576723f-5ec5-4ed9-960f-e75cf7c61bb8",
						parameters: {
							step: "CapitalShocks",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "7fbf0a0b-3a5b-4088-aa51-a6a96ae98516",
						parameters: {
							step: "JoplinCGEModel",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "35be8a30-a623-447b-9f2a-cd90155d1638",
						parameters: {
							step: "PopulationDislocation",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "bec1abd5-2cd2-42e3-c2c5-cd57c37f6e95",
						parameters: {
							step: "HeatMap-Store result",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "90deb257-9323-47b1-ebb1-08d369a3bf50",
						parameters: {
							step: "SocialVulnerability",
							title: "IN-CORE Service"
						}
					},
					{
						paramId: "c415e0db-553c-4120-899e-1316e4814589",
						parameters: {
							step: "HousingRecoverySequential",
							title: "IN-CORE Service"
						}
					}
				]
			},
			{
				title: "Saved Result Name",
				description: "Saved Result Name",
				variableName: "result_name",
				widget: "InputTextField",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "be9266c0-6fc5-4861-9844-9c31d7bf2c78",
						parameters: {
							step: "BuildingDamage",
							title: "result_name"
						}
					},
					{
						paramId: "1c7a6d9c-3d5c-4020-b1ba-c7feee3f4ef6",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "result_name"
						}
					},
					{
						paramId: "103b5143-8059-4052-bb9c-10fb6b956471",
						parameters: {
							step: "Bldg-Max-Dmg-State",
							title: "result_name"
						}
					},
					{
						paramId: "d97dfb84-ce8a-4320-d151-43ce37177467",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "result_name"
						}
					},
					{
						paramId: "db1d7f2b-be47-41f1-87f6-d4624e0c8de9",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "result_name"
						}
					},
					{
						paramId: "ffca1ace-2264-4dbe-e7c8-ecedc2dc748b",
						parameters: {
							step: "Sub-Epfdamage",
							title: "result_name"
						}
					},
					{
						paramId: "bb421a94-e990-483d-d08f-7b67961eb2b2",
						parameters: {
							step: "Sub-Max-Dmg-State",
							title: "result_name"
						}
					},
					{
						paramId: "ba4bee68-42a4-4b1a-bd0c-b809e949a34b",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "result_name"
						}
					},
					{
						paramId: "622f0897-2e7a-40c1-dc37-654f5ebe2e8b",
						parameters: {
							step: "Poles-EpfDamage",
							title: "result_name"
						}
					},
					{
						paramId: "ee60ca46-8b07-4940-8744-4530d258d7b1",
						parameters: {
							step: "Pole-Max-Dmg-State",
							title: "result_name"
						}
					},
					{
						paramId: "10c701be-1497-4206-ff25-e6610ce53e3b",
						parameters: {
							step: "Pole-Max-Store Result",
							title: "result_name"
						}
					},
					{
						paramId: "ecc1d35f-3a34-46d9-e306-dc8bc5738eed",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "result_name"
						}
					},
					{
						paramId: "9abe8136-f0b4-454b-affd-9f390ad64ea2",
						parameters: {
							step: "Poles-MonteCarloFailureProbability",
							title: "result_name"
						}
					},
					{
						paramId: "331c5a65-b39e-4f62-8668-7ef31b1cd9d4",
						parameters: {
							step: "BuildingFunctionality",
							title: "result_name"
						}
					},
					{
						paramId: "53d37c17-3a96-4177-8d55-fe657f7abb5d",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "result_name"
						}
					},
					{
						paramId: "c68e32f3-06fc-4a61-e701-4abb3e8f5281",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "result_name"
						}
					},
					{
						paramId: "f0387d6d-1e3e-426e-89b5-6351f84eaef6",
						parameters: {
							step: "Building-Func-Cluster",
							title: "result_name"
						}
					},
					{
						paramId: "5118208c-40ed-4837-9334-6c82d447e0f4",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "result_name"
						}
					},
					{
						paramId: "fa0d6d5e-5ffa-4059-d02a-a94d5e42c72b",
						parameters: {
							step: "CapitalShocks",
							title: "result_name"
						}
					},
					{
						paramId: "ab39eb9c-7110-4d62-90a5-0cdbf23c07de",
						parameters: {
							step: "CGE-Output-Process",
							title: "result_name"
						}
					},
					{
						paramId: "15e42c27-cec2-471e-a231-0938a461c9ea",
						parameters: {
							step: "PopulationDislocation",
							title: "result_name"
						}
					},
					{
						paramId: "e225d26f-7fe1-4058-f400-a0f8c321e70c",
						parameters: {
							step: "HeatMap-Store Result",
							title: "result_name"
						}
					},
					{
						paramId: "35ddf87b-7eb4-4b5f-d606-b0d73fb904cc",
						parameters: {
							step: "SocialVulnerability",
							title: "result_name"
						}
					},
					{
						paramId: "05894bef-2750-4ecc-9fcc-9ec18d11fd2e",
						parameters: {
							step: "HousingRecoverySequential",
							title: "result_name"
						}
					},
					{
						paramId: "b2ed3ad7-8209-49e5-f25e-bb85527a7bd4",
						parameters: {
							step: "HHRSOutputProcess",
							title: "result_name"
						}
					}
				]
			},
			{
				title: "Hazard Type",
				description: "Hazard Type",
				variableName: "selectedHazardType",
				widget: "AllowedHazardTypes",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "a385ac10-a8c4-44e0-8293-75d77d4c3793",
						parameters: {
							step: "BuildingDamage",
							title: "Hazard Type"
						}
					},
					{
						paramId: "706184d5-85da-4245-c28e-98fde1bf3150",
						parameters: {
							step: "Sub-EpfDamage",
							title: "Hazard Type"
						}
					},
					{
						paramId: "02ca9666-1091-487b-ab3c-2641eb372c0f",
						parameters: {
							step: "Pole-EpfDamage",
							title: "Hazard Type"
						}
					}
				]
			},
			{
				title: "Hazard ID",
				description: "Hazard ID",
				variableName: "selectedHazardId",
				widget: "Hazards",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "71e714b0-fa46-4e39-923c-7c5087665f86",
						parameters: {
							step: "BuildingDamage",
							title: "Hazard ID"
						}
					},
					{
						paramId: "69a4732f-c914-40ca-c2ac-f61242bf2190",
						parameters: {
							step: "Sub-EpfDamage",
							title: "Hazard ID"
						}
					},
					{
						paramId: "c477df17-8028-4179-829a-5bba7a4c13ed",
						parameters: {
							step: "Pole-EpfDamage",
							title: "Hazard ID"
						}
					}
				]
			},
			{
				title: "Fragility Key",
				description: "Fragility Key",
				variableName: "fragilityKey",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "28e71889-26b7-4178-b3c3-55b71b18d6bc",
						parameters: {
							step: "BuildingDamage",
							title: "Fragility Key"
						}
					},
					{
						paramId: "43c0d905-d219-40c1-a95a-aabbc164f59c",
						parameters: {
							step: "Sub-EpfDamage",
							title: "Fragility Key"
						}
					},
					{
						paramId: "ae6ead2f-4897-4a3a-e1d6-ca020bceb35d",
						parameters: {
							step: "Pole-EpfDamage",
							title: "Fragility Key"
						}
					}
				]
			},
			{
				title: "Bldg Use Liquefaction",
				description: "Bldg Use Liquefaction or not",
				variableName: "bldgUseLiquefaction",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "4f2cfa0a-9e3c-4117-c3e1-37eef6d924d1",
						parameters: {
							step: "BuildingDamage",
							title: "Use Liquefaction"
						}
					}
				]
			},
			{
				title: "EPF Use Liquefaction",
				description: "EPF Use Liquefaction or not",
				variableName: "epfUseLiquefaction",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "80231a18-429b-43fa-de34-c8ab054b417e",
						parameters: {
							step: "Sub-EpfDamage",
							title: "Use Liquefaction"
						}
					},
					{
						paramId: "343d182b-7970-467e-d997-a8e5e1f28aa4",
						parameters: {
							step: "Pole-EpfDamage",
							title: "Use Liquefaction"
						}
					}
				]
			},
			{
				title: "Liquefaction Fragility Key",
				description: "Liquefaction Fragility Key",
				variableName: "liquefactionFragilityKey",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "a0c5a39b-ff11-4898-a2dc-dd5ca139c732",
						parameters: {
							step: "Sub-EpfDamage",
							title: "Liquefaction Fragility Key"
						}
					},
					{
						paramId: "fa910dbe-8d26-491e-a6ee-01fcff1eb99a",
						parameters: {
							step: "Pole-EpfDamage",
							title: "Liquefaction Fragility Key"
						}
					}
				]
			},
			{
				title: "Use Hazard Uncertainty",
				description: "Use Hazard Uncertainty or not",
				variableName: "useUncertainty",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "5f2b59eb-6041-4389-c13a-fe2d6c5d51ee",
						parameters: {
							step: "BuildingDamage",
							title: "Use Hazard Uncertainty"
						}
					},
					{
						paramId: "2cf39637-68c6-4dfb-f953-3494363483cd",
						parameters: {
							step: "Sub-EpfDamage",
							title: "Use Hazard Uncertainty"
						}
					},
					{
						paramId: "e4b6cd26-bcdd-4831-8ca8-a90be49fdc95",
						parameters: {
							step: "Pole-EpfDamage",
							title: "Use Hazard Uncertainty"
						}
					}
				]
			},
			{
				title: "Number of CPUs",
				description: "Number of CPUs",
				variableName: "numCpus",
				widget: null,
				hidden: true,
				defaultValue: 8,
				parametersMap: [
					{
						paramId: "937224ee-0e6c-40d7-dd2e-6a40018c1a02",
						parameters: {
							step: "BuildingDamage",
							title: "Number of CPUs"
						}
					},
					{
						paramId: "72d2212a-9aa6-4511-c0b8-6990e5f51667",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "Number of CPUs"
						}
					},
					{
						paramId: "9eefb251-7b32-4101-823e-1da5f3bfcda5",
						parameters: {
							step: "Sub-EpfDamage",
							title: "Number of CPUs"
						}
					},
					{
						paramId: "3c6a334a-c0af-4768-a183-f89ae0b3edeb",
						parameters: {
							step: "Pole-EpfDamage",
							title: "Number of CPUs"
						}
					},
					{
						paramId: "145a7b7c-19f3-40cb-9d7f-3131d8d39d1b",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "Number of CPUs"
						}
					},
					{
						paramId: "73f64797-0a63-490a-fddd-992b19343912",
						parameters: {
							step: "Poles-MonteCarloFailureProbability",
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
				hidden: true,
				defaultValue: 1111,
				parametersMap: [
					{
						paramId: "d109c67d-c547-4d86-da41-12d2b4d389bb",
						parameters: {
							step: "BuildingDamage",
							title: "Seed"
						}
					},
					{
						paramId: "85105a63-8cba-408d-de57-57d57f7742e4",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "Seed"
						}
					},
					{
						paramId: "03d4fe6f-d9d6-4bfb-900d-5c17c6a91b49",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "Seed"
						}
					},
					{
						paramId: "4fcef96f-c810-4ef4-ed69-abaeef288e5a",
						parameters: {
							step: "Poles-MonteCarloFailureProbability",
							title: "Seed"
						}
					},
					{
						paramId: "19ee09f2-57dc-4652-9bff-8e5db6758820",
						parameters: {
							step: "PopulationDislocation",
							title: "Seed"
						}
					},
					{
						paramId: "1fff9fff-82d2-486c-afec-551e61b6fbdd",
						parameters: {
							step: "HousingSequentialRecovery",
							title: "Seed"
						}
					}
				]
			},
			{
				title: "Bldg Liquefaction geology dataset id",
				description: "Bldg Liquefaction geology dataset id",
				variableName: "bldgLiquefactionGeologyDatasetId",
				widget: null,
				defaultValue: "",
				hidden: true,
				parametersMap: [
					{
						paramId: "dad935c9-0369-4ca3-ab93-aacaa43885f6",
						parameters: {
							step: "BuildingDamage",
							title: "liquefaction geology dataset id"
						}
					}
				]
			},
			{
				title: "EPF Liquefaction geology dataset id",
				description: "EPF Liquefaction geology dataset id",
				variableName: "epfLiquefactionGeologyDatasetId",
				widget: null,
				defaultValue: "",
				hidden: true,
				parametersMap: [
					{
						paramId: "e98bf196-ca9d-458a-a522-d41763d6ced3",
						parameters: {
							step: "Sub-EpfDamage",
							title: "liquefaction geology dataset id"
						}
					},
					{
						paramId: "e98bf196-ca9d-458a-a522-d41763d6ced3",
						parameters: {
							step: "Pole-EpfDamage",
							title: "liquefaction geology dataset id"
						}
					}
				]
			},
			{
				title: "Building Inventory",
				description: "Building Inventory",
				variableName: "selectedBldgId",
				widget: "Buildings",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "7a831e75-2a5c-4be9-c792-c4dd8d9fc64d",
						parameters: {
							step: "BuildingDamage",
							title: "Buildings Inventory"
						}
					},
					{
						paramId: "0d453ac8-fa91-4517-8727-9921ad17c3d1",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "Buildings Inventory"
						}
					},
					{
						paramId: "1a38efe9-0b6e-4be7-e816-043c94a724bb",
						parameters: {
							step: "Bldg-Max-Store",
							title: "Source Id"
						}
					},
					{
						paramId: "90169332-180e-41c2-f483-18e25e7618f7",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "Source Id"
						}
					},
					{
						paramId: "88f4b631-ef6f-44db-ef1b-2fbb553a3dad",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "Source Id"
						}
					},
					{
						paramId: "3f8b0db0-c24b-4cc5-85fc-e9b06b9db485",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "Buildings"
						}
					},
					{
						paramId: "37cf203f-36c8-4ff7-c2a2-3e67cfca42ec",
						parameters: {
							step: "Building-Func-Cluster",
							title: "Buildings"
						}
					},
					{
						paramId: "95ec7301-e030-4e05-a203-b807882a7f0f",
						parameters: {
							step: "CapitalShocks",
							title: "Buildings"
						}
					}
				]
			},
			{
				title: "HeatMap Source ID",
				description: "HeatMap Source ID",
				variableName: "heatmapSourceId",
				widget: null,
				defaultValue: "",
				hidden: true,
				parametersMap: [
					{
						paramId: "a7392299-a2e4-4154-b9fa-f08d5c6f643d",
						parameters: {
							step: "HeatMap-Store Result",
							title: "Source ID"
						}
					}
				]
			},
			{
				title: "DFR3 Mapping Set",
				description: "",
				variableName: "buildingMappingId",
				widget: null,
				hidden: true,
				defaultValue: "5e8e3a21eaa8b80001f04f1c",
				parametersMap: [
					{
						paramId: "590311bd-4ba7-414f-e249-7a3d5524bef0",
						parameters: {
							step: "BuildingDamage",
							title: "DFR3 Mapping Set"
						}
					}
				]
			},
			{
				title: "Retrofit Strategy",
				description: "Retrofit Strategy",
				variableName: "retrofitStrategyId",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "3091cc60-86cf-44ce-9dcf-2ef2b227aab4",
						parameters: {
							step: "BuildingDamage",
							title: "Retrofit Strategy"
						}
					}
				]
			},
			{
				title: "Archetype Mapping",
				description: "Archetype Mapping",
				variableName: "archetypeMapping",
				widget: null,
				hidden: true,
				defaultValue: "5fca915fb34b193f7a44059b",
				parametersMap: [
					{
						paramId: "631955b9-06df-45d4-8136-b56c78193b22",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "Archetype Mapping"
						}
					},
					{
						paramId: "d1451c74-4b6e-4cba-ef7f-defec6f1384d",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "Archetype Mapping"
						}
					},
					{
						paramId: "560c01da-6df8-4602-80b1-d321e4fac114",
						parameters: {
							step: "Building-Func-Cluster",
							title: "Archetype Mapping"
						}
					}
				]
			},
			{
				title: "Bldg Damage Interval Keys",
				description: "",
				variableName: "bldgDamageIntervalKeys",
				widget: null,
				hidden: true,
				defaultValue: "DS_0 DS_1 DS_2 DS_3",
				parametersMap: [
					{
						paramId: "d1b0b142-b755-4ad7-8959-ba1ffe9b2864",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "Bldg Damage Interval Keys"
						}
					}
				]
			},
			{
				title: "EPF Damage Interval Keys",
				description: "",
				variableName: "epfDamageIntervalKeys",
				widget: null,
				hidden: true,
				defaultValue: "DS_0 DS_1 DS_2 DS_3 DS_4",
				parametersMap: [
					{
						paramId: "2d42149f-dee4-4888-d26c-f4150bfd62c3",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "EPF Damage Interval Keys"
						}
					},
					{
						paramId: "1c6b33a8-5cdd-407a-c27e-81be014bb8b7",
						parameters: {
							step: "Poles-MonteCarloFailureProbability",
							title: "EPF Damage Interval Keys"
						}
					}
				]
			},
			{
				title: "Bldg Failure State Keys",
				description: "Bldg Failure State Keys",
				variableName: "bldgFailureStateKeys",
				widget: null,
				hidden: true,
				defaultValue: "DS_1 DS_2 DS_3",
				parametersMap: [
					{
						paramId: "f94aea0f-4276-48e6-8f1e-dd6b1eb3ce78",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "Bldg Failure State Keys"
						}
					}
				]
			},
			{
				title: "EPF Failure State Keys",
				description: "EPF Failure State Keys",
				variableName: "epfFailureStateKeys",
				widget: null,
				hidden: true,
				defaultValue: "DS_1 DS_2 DS_3 DS_4",
				parametersMap: [
					{
						paramId: "433418a3-10b6-42e7-e947-bc2a4a9f7334",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "EPF Failure State Keys"
						}
					},
					{
						paramId: "e3ef2a1d-38a6-468c-8c96-49c61736af97",
						parameters: {
							step: "Poles-MonteCarloFailureProbability",
							title: "EPF Failure State Keys"
						}
					}
				]
			},
			{
				title: "MCS Samples",
				description: "MCS Samples",
				variableName: "mcsSamples",
				widget: null,
				defaultValue: 500,
				hidden: true,
				parametersMap: [
					{
						paramId: "9012f01d-5c76-4689-934e-4bd76a9e3fc9",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "MCS Samples"
						}
					},
					{
						paramId: "1fa63fcb-7093-4737-b3a8-0e1fd6c00cac",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "MCS Samples"
						}
					},
					{
						paramId: "a45d5c3a-dd94-4780-a366-adda08b7c9a4",
						parameters: {
							step: "Poles-MonteCarloFailureProbability",
							title: "MCS Samples"
						}
					}
				]
			},
			{
				title: "EPF Substations",
				description: "",
				variableName: "selectedSubstationId",
				widget: "Epfs",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "03bf9f80-8544-464d-c867-d7c0c0c495b4",
						parameters: {
							step: "Sub-EpfDamage",
							title: "EPF Substations"
						}
					},
					{
						paramId: "7f0b9603-908b-49bf-be57-fca4c26463df",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "Source ID"
						}
					}
				]
			},
			{
				title: "EPF Poles",
				description: "",
				variableName: "selectedPoleId",
				widget: "Epfs",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "44ebd2e5-100a-48af-d7c7-8e98bf9bcf7b",
						parameters: {
							step: "Pole-EpfDamage",
							title: "EPF Substations"
						}
					},
					{
						paramId: "9d212cd0-12f0-4399-bdaf-345dfb193398",
						parameters: {
							step: "Pole-Max-Store Result",
							title: "Source ID"
						}
					}
				]
			},
			{
				title: "EPF Mapping",
				description: "",
				variableName: "epfMapping",
				widget: null,
				defaultValue: "5d8a326fb9219c068ea798e7",
				hidden: true,
				parametersMap: [
					{
						paramId: "6cf1350a-b5d8-4921-fed0-35acd1b2ab12",
						parameters: {
							step: "Sub-EpfDamage",
							title: "EPF Mapping"
						}
					},
					{
						paramId: "5b7dbe15-888a-4b7f-a4c2-df504ddeadeb",
						parameters: {
							step: "Pole-EpfDamage",
							title: "EPF Mapping"
						}
					}
				]
			},
			{
				title: "EPF Pole Fragility Key",
				description: "",
				variableName: "epfPoleFragilityKey",
				widget: null,
				defaultValue: "poles",
				hidden: true,
				parametersMap: [
					{
						paramId: "ae6ead2f-4897-4a3a-e1d6-ca020bceb35d",
						parameters: {
							step: "Poles-EpfDamage",
							title: "EPF Pole Fragility Key"
						}
					}
				]
			},
			{
				title: "EPF Substation Fragility Key",
				description: "",
				variableName: "epfSubstationFragilityKey",
				widget: null,
				defaultValue: "substations",
				hidden: true,
				parametersMap: [
					{
						paramId: "43c0d905-d219-40c1-a95a-aabbc164f59c",
						parameters: {
							step: "Substations-EpfDamage",
							title: "EPF Substation Fragility Key"
						}
					}
				]
			},
			{
				title: "Output Type",
				description: "Dataset data type",
				variableName: "maxDamageStateDataType",
				widget: null,
				defaultValue: "incore:maxDamageState",
				hidden: true,
				parametersMap: [
					{
						paramId: "9ef34ba3-41cb-4702-962b-28e074d01ef0",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "Output Type"
						}
					},
					{
						paramId: "571838aa-f243-48cb-9989-e6da5cb556e8",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "Output Type"
						}
					},
					{
						paramId: "c3035bce-c326-4f42-a725-57d8615f4c62",
						parameters: {
							step: "Pole-Max-Store Result",
							title: "Output Type"
						}
					}
				]
			},
			{
				title: "Output Type",
				description: "Dataset data type",
				variableName: "funcProbabilityDataType",
				widget: null,
				defaultValue: "incore:funcProbability",
				hidden: true,
				parametersMap: [
					{
						paramId: "0e1d8b7e-9623-4fc6-986b-15d041d6e026",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "Output Type"
						}
					},
					{
						paramId: "552a9c15-c1bc-49f9-e7e7-f068acf0876a",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "Output Type"
						}
					}
				]
			},
			{
				title: "Output Type",
				description: "Dataset data type",
				variableName: "popDislocationShpdataType",
				widget: null,
				defaultValue: "incore:popdislocationShp",
				hidden: true,
				parametersMap: [
					{
						paramId: "f8fd5daa-fdff-4534-c65c-29f4589e8620",
						parameters: {
							step: "HeatMap-Store Result",
							title: "Output Type"
						}
					}
				]
			},
			{
				title: "Table Output Format",
				description: "Dataset data format for table",
				variableName: "tableOutputFormat",
				widget: null,
				defaultValue: "table",
				hidden: true,
				parametersMap: [
					{
						paramId: "d899d952-6838-45ae-96b4-b2e75a35adb1",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "Output Format"
						}
					},
					{
						paramId: "b625bf13-a5dd-446d-8a90-4322fb9f1a33",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "Output Format"
						}
					},
					{
						paramId: "ef418794-5608-4420-8c2d-578ec216f443",
						parameters: {
							step: "Pole-Max-Store Result",
							title: "Output Format"
						}
					},
					{
						paramId: "0f63677f-9e4f-4905-9367-cdb7037f88e8",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "Output Format"
						}
					},
					{
						paramId: "cb5ef2bc-d53f-4cc1-c927-aea9d427bf27",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "Output Format"
						}
					}
				]
			},
			{
				title: "Shapefile Output Format",
				description: "Dataset data format for shapefile",
				variableName: "shapefileOutputFormat",
				widget: null,
				defaultValue: "shapefile",
				hidden: true,
				parametersMap: [
					{
						paramId: "408c402e-f45f-4015-c09e-c766311f64f1",
						parameters: {
							step: "HeatMap-Store Result",
							title: "Output Format"
						}
					}
				]
			},
			{
				title: "Interdependency",
				description: "",
				variableName: "selectedInterdNetworkId",
				widget: "InterdNetworks",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "18f68644-5601-4214-bbb4-92bce2092a47",
						parameters: {
							step: "BuildingFunctionality",
							title: "Interdependency"
						}
					}
				]
			},
			{
				title: "Building to Sector Table",
				description: "",
				variableName: "selectedBldgToSector",
				widget: "SectorShocks",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "3894afc2-b039-4b86-8e17-644c0f09d8b5",
						parameters: {
							step: "CapitalShocks",
							title: "Building to Sector Table"
						}
					}
				]
			},
			{
				title: "Model Iterations",
				description: "",
				variableName: "iterations",
				widget: null,
				defaultValue: 1,
				hidden: true,
				parametersMap: [
					{
						paramId: "39abfe94-14b2-4b93-b24d-3ca26a1adb38",
						parameters: {
							step: "JoplinCGEModel",
							title: "Model Iterations"
						}
					}
				]
			},
			{
				title: "SAM",
				description: "",
				variableName: "sam",
				widget: null,
				defaultValue: "6138f39fca423a005e42232a",
				hidden: true,
				parametersMap: [
					{
						paramId: "675571d3-389e-4995-9f92-8d94db69386f",
						parameters: {
							step: "JoplinCGEModel",
							title: "SAM"
						}
					}
				]
			},
			{
				title: "BB",
				description: "",
				variableName: "bb",
				widget: null,
				defaultValue: "6138f3faca423a005e4223bc",
				hidden: true,
				parametersMap: [
					{
						paramId: "f4f58f3d-a452-467b-dafd-9637cb7a0ef5",
						parameters: {
							step: "JoplinCGEModel",
							title: "BB"
						}
					}
				]
			},
			{
				title: "IOUT",
				description: "",
				variableName: "IOUT",
				widget: null,
				defaultValue: "6138f427ca423a005e42244e",
				hidden: true,
				parametersMap: [
					{
						paramId: "5d5a229a-e840-44e5-b77b-9f2ac866fcb6",
						parameters: {
							step: "JoplinCGEModel",
							title: "IOUT"
						}
					}
				]
			},
			{
				title: "MISC",
				description: "",
				variableName: "MISC",
				widget: null,
				defaultValue: "6138f452ca423a005e4224e0",
				hidden: true,
				parametersMap: [
					{
						paramId: "0dea4685-f7e0-4ed0-bc46-60a73032678d",
						parameters: {
							step: "JoplinCGEModel",
							title: "MISC"
						}
					}
				]
			},
			{
				title: "MISCH",
				description: "",
				variableName: "MISCH",
				widget: null,
				defaultValue: "6138fda7ca423a005e422574",
				hidden: true,
				parametersMap: [
					{
						paramId: "ccf99aba-1875-4ff6-ae63-e6f74d1b3f35",
						parameters: {
							step: "JoplinCGEModel",
							title: "MISCG"
						}
					}
				]
			},
			{
				title: "LANDCAP",
				description: "",
				variableName: "LANDCAP",
				widget: null,
				defaultValue: "6138fdcfca423a005e422606",
				hidden: true,
				parametersMap: [
					{
						paramId: "68034c2d-6849-478f-abb5-16c35828298c",
						parameters: {
							step: "JoplinCGEModel",
							title: "LANDCAP"
						}
					}
				]
			},
			{
				title: "EMPLOY",
				description: "",
				variableName: "EMPLOY",
				widget: null,
				defaultValue: "6138fe38ca423a005e422698",
				hidden: true,
				parametersMap: [
					{
						paramId: "5b076579-2a34-444e-ee25-f08b9a76a513",
						parameters: {
							step: "JoplinCGEModel",
							title: "EMPLOY"
						}
					}
				]
			},
			{
				title: "IGTD",
				description: "",
				variableName: "IGTD",
				widget: null,
				defaultValue: "6138fe68ca423a005e42272a",
				hidden: true,
				parametersMap: [
					{
						paramId: "abe45db7-5779-400a-a32a-958a7f1c0ba1",
						parameters: {
							step: "JoplinCGEModel",
							title: "IGTD"
						}
					}
				]
			},
			{
				title: "TAUFF",
				description: "",
				variableName: "TAUFF",
				widget: null,
				defaultValue: "6138fe99ca423a005e4227bc",
				hidden: true,
				parametersMap: [
					{
						paramId: "9b22df95-761b-4117-8274-7a5e9003b52c",
						parameters: {
							step: "JoplinCGEModel",
							title: "TAUFF"
						}
					}
				]
			},
			{
				title: "JOBCR",
				description: "",
				variableName: "JOBCR",
				widget: null,
				defaultValue: "6138fecbca423a005e42284e",
				hidden: true,
				parametersMap: [
					{
						paramId: "e8aff2a3-41a3-4b50-8af5-0fe8aceef671",
						parameters: {
							step: "JoplinCGEModel",
							title: "JOBCR"
						}
					}
				]
			},
			{
				title: "OUTCR",
				description: "",
				variableName: "OUTCR",
				widget: null,
				defaultValue: "6138fef6ca423a005e4228e0",
				hidden: true,
				parametersMap: [
					{
						paramId: "d7dd88c2-2e53-4468-94ac-c8dbefae4ac2",
						parameters: {
							step: "JoplinCGEModel",
							title: "OUTCR"
						}
					}
				]
			},
			{
				title: "Housing Unit Allocation",
				description: "",
				variableName: "selectedHuaId",
				widget: "Huas",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "1c865a6c-4668-420f-974e-e238acfc5a5d",
						parameters: {
							step: "PopulationDislocation",
							title: "Housing Unit Allocation"
						}
					}
				]
			},
			{
				title: "Block Group Data",
				description: "",
				variableName: "selectedBlockGroupId",
				widget: "BlockGroups",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "fb769d18-b846-4cc3-c7e4-93955dfc3d84",
						parameters: {
							step: "PopulationDislocation",
							title: "Block Group Data"
						}
					}
				]
			},
			{
				title: "Value Loss Param",
				description: "",
				variableName: "selectedValueLossId",
				widget: "ValueLosses",
				defaultValue: null,
				parametersMap: [
					{
						paramId: "e2536b2c-a6fe-4d21-fb73-e68b46841344",
						parameters: {
							step: "PopulationDislocation",
							title: "Value Loss Param"
						}
					}
				]
			},
			{
				title: "national_vulnerability_feature_averages",
				description: "",
				variableName: "nationalVulnerabilityFeatureAverages",
				widget: null,
				hidden: true,
				defaultValue: "63daa9ad695e0f57262c7d8f",
				parametersMap: [
					{
						paramId: "23ce8682-cdfa-4fcd-a335-219a40332e6b",
						parameters: {
							step: "SocialVulnerability",
							title: "national_vulnerability_feature_averages"
						}
					}
				]
			},
			{
				title: "social_vulnerability_demographic_factors",
				description: "",
				variableName: "demFactor",
				widget: null,
				hidden: true,
				defaultValue: "63daac32695e0f57262c844a",
				parametersMap: [
					{
						paramId: "1eb72116-ce74-4e66-fab5-495995fd084e",
						parameters: {
							step: "SocialVulnerability",
							title: "social_vulnerability_demographic_factors"
						}
					}
				]
			},
			{
				title: "t_delta",
				description: "t_delta",
				variableName: "tDelta",
				widget: null,
				hidden: true,
				defaultValue: "1.0",
				parametersMap: [
					{
						paramId: "995a5335-fc2e-4336-d295-ca9650504a69",
						parameters: {
							step: "HousingSequentialRecovery",
							title: "t_delta"
						}
					}
				]
			},
			{
				title: "t_final",
				description: "t_final",
				variableName: "tFinal",
				widget: null,
				hidden: true,
				defaultValue: "90.0",
				parametersMap: [
					{
						paramId: "10744777-d35a-4d9c-9cf0-6db31f36e7de",
						parameters: {
							step: "HousingSequentialRecovery",
							title: "t_final"
						}
					}
				]
			},
			{
				title: "tpm",
				description: "tpm",
				variableName: "tpm",
				widget: null,
				hidden: true,
				defaultValue: "60ef513802897f12fcd9765c",
				parametersMap: [
					{
						paramId: "d0619a7b-e5f6-4b79-8830-8935c30463dc",
						parameters: {
							step: "HousingSequentialRecovery",
							title: "tpm"
						}
					}
				]
			},
			{
				title: "initial_stage_probabilities",
				description: "initial_stage_probabilities",
				variableName: "initialStageProbabilities",
				widget: null,
				hidden: true,
				defaultValue: "60ef532e02897f12fcd9ac63",
				parametersMap: [
					{
						paramId: "599cd8f2-e8c9-4512-80b8-8ddd3d89ae61",
						parameters: {
							step: "HousingSequentialRecovery",
							title: "initial_stage_probabilities"
						}
					}
				]
			},
			{
				title: "Time Steps",
				description: "Time Steps",
				variableName: "timeSteps",
				widget: null,
				hidden: true,
				defaultValue: "1,7,13,25,49,85",
				parametersMap: [
					{
						paramId: "8739d850-605d-466f-aa1f-7d6069f80932",
						parameters: {
							step: "HHRSOutputProcess",
							title: "Time Steps"
						}
					}
				]
			}
		],
		// input datasets
		datasets: [
			{
				title: "Token",
				description: "Token",
				hidden: true,
				widget: null,
				variableName: "token",
				datasetsMap: [
					{
						datasetId: "b7c3e9d1-9697-4ebd-d79a-9daaf66b4fc1",
						datasets: {
							step: "BuildingDamage",
							title: "Token"
						}
					},
					{
						datasetId: "f8749e24-e188-4b27-838b-daa025e7a53c",
						datasets: {
							step: "Building-Dmg-Summary",
							title: "Token"
						}
					},
					{
						datasetId: "1d0bdeb9-27bc-43eb-b8ee-fe987aea711c",
						datasets: {
							step: "Bldg-Max-Store Result",
							title: "Token"
						}
					},
					{
						datasetId: "c484e0b1-dff2-412f-efe8-2e0e5321d667",
						datasets: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "Token"
						}
					},
					{
						datasetId: "c9ab0651-864f-4b6b-c1c1-fc64d1f58de3",
						datasets: {
							step: "Sub-EpfDamage",
							title: "Token"
						}
					},
					{
						datasetId: "e2a1f76e-4d77-4898-aaa6-0477f6c96176",
						datasets: {
							step: "Sub-Max-Store Result",
							title: "Token"
						}
					},
					{
						datasetId: "a5f7a1ac-3cda-4b5c-ddfd-5991c30cb287",
						datasets: {
							step: "Poles-EpfDamage",
							title: "Token"
						}
					},
					{
						datasetId: "fd4a1927-b512-4265-b642-c3b8a28ff334",
						datasets: {
							step: "Pole-Max-Store Result",
							title: "Token"
						}
					},
					{
						datasetId: "97a3ce6f-5b5f-40c0-8a0c-e26ceb92635c",
						datasets: {
							step: "Sub-MonteCarloFailureProbability",
							title: "Token"
						}
					},
					{
						datasetId: "f21ed941-fc20-4a5a-ad24-fd29d97997ba",
						datasets: {
							step: "Poles-MonteCarloFailureProbability",
							title: "Token"
						}
					},
					{
						datasetId: "29033059-cc41-4a8a-ca4e-222686cf55d7",
						datasets: {
							step: "BuildingFunctionality",
							title: "Token"
						}
					},
					{
						datasetId: "43ff6004-3928-4b9c-d9c1-3765eccd3431",
						datasets: {
							step: "Bldg-Func-Store Result",
							title: "Token"
						}
					},
					{
						datasetId: "39124a24-8326-417e-dcfc-ae58db6b724a",
						datasets: {
							step: "Bldg-FailProb-Store Result",
							title: "Token"
						}
					},
					{
						datasetId: "edf2d5e6-0ac3-4c73-add5-3e11552884c5",
						datasets: {
							step: "Building-Failure-Cluster",
							title: "Token"
						}
					},
					{
						datasetId: "f12247ba-854d-4b8e-e081-c4441fd537cc",
						datasets: {
							step: "Building-Func-Cluster",
							title: "Token"
						}
					},
					{
						datasetId: "6ac994a1-d852-454b-dc8e-266720fce459",
						datasets: {
							step: "CapitalShocks",
							title: "Token"
						}
					},
					{
						datasetId: "8beaca31-23e7-4776-e4bd-d60894cd9dfe",
						datasets: {
							step: "JoplinCGEModel",
							title: "Token"
						}
					},
					{
						datasetId: "0e7373df-c450-4455-d10b-d16f5113f177",
						datasets: {
							step: "PopulationDislocation",
							title: "Token"
						}
					},
					{
						datasetId: "f20fdecb-58e7-488a-fa78-c442ef83422c",
						datasets: {
							step: "HeatMap-Store Result",
							title: "Token"
						}
					},
					{
						datasetId: "3f95a3fe-f1f7-4b4f-84af-30fe38d9c241",
						datasets: {
							step: "SocialVulnerability",
							title: "Token"
						}
					},
					{
						datasetId: "b2832956-6cb9-4bc4-d5f0-b554ce80944f",
						datasets: {
							step: "HousingRecoverySequential",
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
				// TODO rewrite this part it's confusing
				title: "",
				description: "",
				datasetsMap: [
					{
						datasetId: "95b65dc8-1129-40ee-c3d3-f880ebdb6bdc",
						datasets: {
							step: "Building-Dmg-Summary",
							title: "Building damage summary table",
							variableName: "bldgDmgSummaryTableContent",
							widget: "BldgDamage"
						}
					},
					{
						datasetId: "7cdf1ea9-4863-4194-d343-a06e4989fb60",
						datasets: {
							step: "Bldg-Max-Store Result",
							title: "Building maximum damage state ID",
							variableName: "bldgMaxDamageStateINCOREId",
							widget: "BldgDamage"
						}
					},
					{
						datasetId: "b9e08789-8730-49b8-8f21-be76889db2d6",
						datasets: {
							step: "Pole-Max-Store Result",
							title: "EPF pole maximum damage state",
							variableName: "poleMaxDmgStateINCOREId",
							widget: "PoleDamage"
						}
					},
					{
						datasetId: "81941b03-44fb-4a58-8fde-e02fbac68bae",
						datasets: {
							step: "Sub-Max-Store Result",
							title: "EPF substation maximum damage state",
							variableName: "substationMaxDmgStateINCOREId",
							widget: "SubstationDamage"
						}
					},
					{
						datasetId: "3bcc9377-5ec3-46d6-8f40-bdc939c22d43",
						datasets: {
							step: "Bldg-FailProb-Store Result",
							title: "Monte Carlo building failure probability Layer ID",
							variableName: "mcsBldgFailureProbINCOREId",
							widget: "BldgMCS"
						}
					},
					{
						datasetId: "2e4668bb-03b4-40e1-8c59-688a94b45b64",
						datasets: {
							step: "Building-Failure-Cluster",
							title: "Monte Carlo building failure summary table",
							variableName: "mcsBldgSummaryTableContent",
							widget: "BldgMCS"
						}
					},
					{
						datasetId: "294f7edb-2bc0-4152-df4f-5144c6dd3649",
						datasets: {
							step: "Bldg-Func-Store Result",
							title: "building functionality Layer ID",
							variableName: "bldgFuncProbINCOREId",
							widget: "BldgFunctionality"
						}
					},
					{
						datasetId: "6da16a29-ed5c-434a-90c9-7c233670d143",
						datasets: {
							step: "Building-Func-Cluster",
							title: "Building funcionality summary table",
							variableName: "bldgFuncSummaryTableContent",
							widget: "BldgFunctionality"
						}
					},
					{
						datasetId: "168b5193-c8aa-42b4-c64c-0b9b31914428",
						datasets: {
							step: "CGE-Output-Process",
							title: "CGE Domestic Supply",
							variableName: "cgeDomesticSupplyContent",
							widget: "CGE"
						}
					},
					{
						datasetId: "6c00efe4-9c49-403c-93cd-851780f57c16",
						datasets: {
							step: "CGE-Output-Process",
							title: "CGE household income",
							variableName: "cgeHouseholdIncomeContent",
							widget: "CGE"
						}
					},
					{
						datasetId: "c3d7751a-487c-4179-eea2-451cd872ea2f",
						datasets: {
							step: "CGE-Output-Process",
							title: "CGE employment",
							variableName: "cgeEmploymentContent",
							widget: "CGE"
						}
					},
					{
						datasetId: "b502fc43-c3b1-4332-a632-db88061c18df",
						datasets: {
							step: "HeatMap-Store Result",
							title: "Population dislocation heatmap",
							variableName: "popdislHeatmapINCOREId",
							widget: "PopDislocation"
						}
					},
					{
						datasetId: "c7dd6a3e-1625-4ce2-f41a-491ec221a09b",
						datasets: {
							step: "Disl-Post-Process",
							title: "Total Population dislocation",
							variableName: "totalDislTableContent",
							widget: "PopDislocation"
						}
					},
					{
						datasetId: "f0f34461-2bc2-4b2a-c396-8ea576b725fa",
						datasets: {
							step: "Disl-Post-Process",
							title: "Population dislocation by race",
							variableName: "dislocationByRaceContent",
							widget: "PopDislocation"
						}
					},
					{
						datasetId: "7812c343-e12a-4eca-b041-26e56e6c2bd3",
						datasets: {
							step: "Disl-Post-Process",
							title: "Population dislocation by tenure",
							variableName: "dislocationByTenureContent",
							widget: "PopDislocation"
						}
					},
					{
						datasetId: "9f8b3020-b39e-4e76-9cee-341f2cf675b1",
						datasets: {
							step: "Disl-Post-Process",
							title: "Population dislocation by income",
							variableName: "dislocationByIncomeContent",
							widget: "PopDislocation"
						}
					},
					{
						datasetId: "0814b499-9937-453b-b143-19244795d008",
						datasets: {
							step: "Disl-Post-Process",
							title: "Population dislocation by housing type",
							variableName: "dislocationByHousingTypeContent",
							widget: "PopDislocation"
						}
					},
					{
						datasetId: "af45fc57-c1d7-465b-c03f-a7a8b7ae79f1",
						datasets: {
							step: "Disl-Post-Process",
							title: "Population dislocation by disability",
							variableName: "dislocationByDisabilityContent",
							widget: "PopDislocation"
						}
					},
					{
						datasetId: "3704bb0d-3cc3-4a49-b33a-7b0574842c2f",
						datasets: {
							step: "CapitalShocks",
							title: "Sector Shocks",
							variableName: "sectorShocksContent",
							widget: "SectorShocks"
						}
					},
					{
						datasetId: "fbf3842d-e2be-48ad-d421-5bcf5ab22811",
						datasets: {
							step: "HHRSOutputProcess",
							title: "HHRS Bar Chart",
							variableName: "HHSBarChartContent",
							widget: "HHS"
						}
					},
					{
						datasetId: "4eebb9b8-43f3-45cb-800c-d717d07d5d30",
						datasets: {
							step: "Disl-Post-Process",
							title: "Post Process of Population Dislocation",
							variableName: "DislPostProcessLog",
							widget: "Log"
						}
					},
					{
						datasetId: "622be383-df51-42a4-f4bf-84e8d24f11f2",
						datasets: {
							step: "Bldg-Max-Dmg-State",
							title: "Building Maximum Damage State",
							variableName: "BldgMaxDmgStateLog",
							widget: "Log"
						}
					},
					{
						datasetId: "96ee0749-dec4-48ee-adf0-9e7d8e4adde0",
						datasets: {
							step: "BuildingFunctionality",
							title: "Building Functionality Analysis",
							variableName: "BuildingFunctionalityLog",
							widget: "Log"
						}
					},
					{
						datasetId: "9b349e27-baa7-4a41-e9e4-d3290286a0a5",
						datasets: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "Building Monte Carlo Failure Probability",
							variableName: "BldgMonteCarloFailureProbabilityLog",
							widget: "Log"
						}
					},
					{
						datasetId: "fbc7824b-0253-4e71-a4ca-e5f2d47a4dec",
						datasets: {
							step: "Poles-MonteCarloFailureProbability",
							title: "Electric Power Poles Monte Carlo Failure Probability",
							variableName: "PolesMonteCarloFailureProbabilityLog",
							widget: "Log"
						}
					},
					{
						datasetId: "180d1ee1-d74a-4046-c2d5-2694435c2a3e",
						datasets: {
							step: "Sub-MonteCarloFailureProbability",
							title: "Electric Power Substation Monte Carlo Failure Probability",
							variableName: "SubMonteCarloFailureProbabilityLog",
							widget: "Log"
						}
					},
					{
						datasetId: "81650d08-7afb-4d03-b19d-3cab35ea9033",
						datasets: {
							step: "Sub-EpfDamage",
							title: "Electric Power Substation Damage",
							variableName: "SubEpfDamageLog",
							widget: "Log"
						}
					},
					{
						datasetId: "439e46bb-6ea0-4d0e-b188-5adc71e4ec2c",
						datasets: {
							step: "Poles-EpfDamage",
							title: "Electric Power Pole Damage",
							variableName: "PolesEpfDamageLog",
							widget: "Log"
						}
					},
					{
						datasetId: "067c9db0-84ab-4a9c-b6bc-9d0fffb32134",
						datasets: {
							step: "JoplinCGEModel",
							title: "Joplin CGE Model",
							variableName: "JoplinCGEModelLog",
							widget: "Log"
						}
					},
					{
						datasetId: "09bf8dd2-1250-462e-b0cd-819ab216e363",
						datasets: {
							step: "CapitalShocks",
							title: "Capital Shocks",
							variableName: "CapitalShocksLog",
							widget: "Log"
						}
					},
					{
						datasetId: "6bbd145c-1842-459b-fc65-56b0ec0745ee",
						datasets: {
							step: "Pole-Max-Dmg-State",
							title: "Electric Power Pole Maximum Damage State",
							variableName: "PoleMaxDmgStateLog",
							widget: "Log"
						}
					},
					{
						datasetId: "6bbd145c-1842-459b-fc65-56b0ec0745ee",
						datasets: {
							step: "Sub-Max-Dmg-State",
							title: "Electric Power Substation Maximum Damage State",
							variableName: "SubMaxDmgStateLog",
							widget: "Log"
						}
					},
					{
						datasetId: "67131668-d47e-4cfa-d4c0-e7ce61324e1e",
						datasets: {
							step: "Bldg-Max-Store Result",
							title: "Store Building Maximum Damage Result",
							variableName: "BldgMaxStoreResultLog",
							widget: "Log"
						}
					},
					{
						datasetId: "164ad7ba-3a91-4651-9772-c4d55f27e19f",
						datasets: {
							step: "Pole-Max-Store Result",
							title: "Store Electric Power Pole Maximum Damage Result",
							variableName: "PoleMaxStoreResultLog",
							widget: "Log"
						}
					},
					{
						datasetId: "2c82c853-1ace-4528-b271-74dfe50e4611",
						datasets: {
							step: "Sub-Max-Store Result",
							title: "Store Electric Power Substation Maximum Damage Result",
							variableName: "SubMaxStoreResultLog",
							widget: "Log"
						}
					},
					{
						datasetId: "6d2e78ec-a2db-4876-8f99-ff2e4b848cb0",
						datasets: {
							step: "Bldg-Func-Store Result",
							title: "Storing Building Functionality Result",
							variableName: "BldgFuncStoreResultLog",
							widget: "Log"
						}
					},
					{
						datasetId: "6d2e78ec-a2db-4876-8f99-ff2e4b848cb0",
						datasets: {
							step: "HeatMap-Store Result",
							title: "Store Population Dislocation HeatMap Result",
							variableName: "HeatMapStoreResultLog",
							widget: "Log"
						}
					},
					{
						datasetId: "d5e99bb2-17f4-4455-ab7e-510db8a691db",
						datasets: {
							step: "HeatMap-Store Result",
							title: "Store Population Dislocation HeatMap Result",
							variableName: "HeatMapStoreResultLog",
							widget: "Log"
						}
					},
					{
						datasetId: "f7c4252e-59ee-4185-897c-57361e114cec",
						datasets: {
							step: "Bldg-FailProb-Store Result",
							title: "Storing Building Failure Probability Result",
							variableName: "BldgFailProbStoreResultLog",
							widget: "Log"
						}
					},
					{
						datasetId: "dee3c1df-66b9-402a-a5ad-ca6d23a4662d",
						datasets: {
							step: "HHRSOutputProcess",
							title: "Post Process of Housing Household Recovery Sequential Analysis",
							variableName: "HHRSOutputProcess",
							widget: "Log"
						}
					},
					{
						datasetId: "4f9a7142-d382-4913-8894-7549ef77e50d",
						datasets: {
							step: "SocialVulnerability",
							title: "Social Vulnerability",
							variableName: "SocialVulnerabilityLog",
							widget: "Log"
						}
					},
					{
						datasetId: "6f0a8e45-eca2-40b4-8ea5-a964d582de4a",
						datasets: {
							step: "PopulationDislocation",
							title: "Population Dislocation",
							variableName: "PopulationDislocationLog",
							widget: "Log"
						}
					},
					{
						datasetId: "e2867e0d-b637-4bea-dd14-b6beb03a0335",
						datasets: {
							step: "CGE-Output-Process",
							title: "Post Process of CGE",
							variableName: "CGEOutputProcessLog",
							widget: "Log"
						}
					},
					{
						datasetId: "7b82b481-32ae-4c3b-8e32-21f6c46c3a97",
						datasets: {
							step: "Building-Func-Cluster",
							title: "Clustering Building Functionality",
							variableName: "BuildingFuncClusterLog",
							widget: "Log"
						}
					},
					{
						datasetId: "3f32f287-cd46-4e5f-e3cd-50dff7de3b73",
						datasets: {
							step: "Building-Failure-Cluster",
							title: "Clustering Building Failure",
							variableName: "BuildingFailureClusterLog",
							widget: "Log"
						}
					},
					{
						datasetId: "733108d3-6343-4a91-f657-98b36a5647bb",
						datasets: {
							step: "Building-Dmg-Summary",
							title: "Building Damage Summary",
							variableName: "BuildingDmgSummaryLog",
							widget: "Log"
						}
					},
					{
						datasetId: "fd22cd60-66be-4e0c-dcb2-751e59a3d1ec",
						datasets: {
							step: "HousingRecoverySequential",
							title: "Housing Household Recovery Sequential",
							variableName: "HousingRecoverySequentialLog",
							widget: "Log"
						}
					},
					{
						datasetId: "3b71fa25-a661-4c7a-a981-907b1867d6d4",
						datasets: {
							step: "BuildingDamage",
							title: "Building Damage",
							variableName: "BuildingDamageLog",
							widget: "Log"
						}
					},
				]
			}
		]
	},
	metadata: []
};

let datawolfConfig = {};
let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

// use default
datawolfConfig["hostname"] = hostname;
datawolfConfig["executionGetURL"] = `${hostname}/datawolf/workflows/${datawolfWorkflowConfig["wfId"]}/executions`;
datawolfConfig["executionPostURL"] = `${hostname}/datawolf/executions`;
datawolfConfig["datasetBaseURL"] = `${hostname}/datawolf/datasets`;
datawolfConfig["datawolfPersonsDetail"] = `${hostname}/datawolf/persons?email=`;
datawolfConfig["retreiveTimeInterval"] = 10 * 1000;

export { datawolfWorkflowConfig, datawolfConfig };

const datawolfWorkflowConfig = {
	title: "slc-community-wf-v2",
	description: "2023-03-07 full workflow v2",
	wfTitle: "slc-community-wf-v2",
	wfId: "c81ab517-77a3-472a-a1a6-db08d1fadb35",
	creatorId: "d39e1679-4dcc-4158-9655-a604801871a7",
	inputs: {
		parameters: [
			{
				title: "Result Name",
				description: "Result name",
				variableName: "resultName",
				widget: null,
				hidden: true,
				defaultValue: "SLC",
				parametersMap: [
					{
						paramId: "103b5143-8059-4052-bb9c-10fb6b956471",
						parameters: {
							step: "Bldg-Max-Dmg-State",
							title: "Result Name",
						},
					},
					{
						paramId: "bb421a94-e990-483d-d08f-7b67961eb2b2",
						parameters: {
							step: "Sub-Max-Dmg-State",
							title: "Result Name",
						},
					},
					{
						paramId: "db1d7f2b-be47-41f1-87f6-d4624e0c8de9",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "result_name",
						},
					},
					{
						paramId: "ecc1d35f-3a34-46d9-e306-dc8bc5738eed",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "result_name",
						},
					},
					{
						paramId: "ffca1ace-2264-4dbe-e7c8-ecedc2dc748b",
						parameters: {
							step: "Sub-EpfDamage",
							title: "result_name",
						},
					},
					{
						paramId: "35ddf87b-7eb4-4b5f-d606-b0d73fb904cc",
						parameters: {
							step: "SocialVulnerability",
							title: "result_name",
						},
					},
					{
						paramId: "15e42c27-cec2-471e-a231-0938a461c9ea",
						parameters: {
							step: "PopulationDislocation",
							title: "result_name",
						},
					},
					{
						paramId: "be9266c0-6fc5-4861-9844-9c31d7bf2c78",
						parameters: {
							step: "BuildingDamage",
							title: "result_name",
						},
					},
					{
						paramId: "df9ccac3-5480-4053-a342-2c4a0bc29f9d",
						parameters: {
							step: "BuildingFunctionality-sub-only",
							title: "result_name",
						},
					},
					{
						paramId: "59b0b59b-db87-408f-9d40-2103af92d74b",
						parameters: {
							step: "CapitalShocks",
							title: "result_name",
						},
					},
					{
						paramId: "419c1e2c-3e8e-4354-e883-e0f4d49576c5",
						parameters: {
							step: "HousingRecoverySequential",
							title: "result_name",
						},
					},
					{
						paramId: "b2ed3ad7-8209-49e5-f25e-bb85527a7bd4",
						parameters: {
							step: "HHRSOutputProcess",
							title: "Result Name",
						},
					},
					{
						paramId: "ab39eb9c-7110-4d62-90a5-0cdbf23c07de",
						parameters: {
							step: "CGE-Output-Process",
							title: "Result Name",
						},
					},
					{
						paramId: "f0387d6d-1e3e-426e-89b5-6351f84eaef6",
						parameters: {
							step: "Building-Func-Cluster",
							title: "Result Name",
						},
					},
					{
						paramId: "c68e32f3-06fc-4a61-e701-4abb3e8f5281",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "Result Name",
						},
					},
					{
						paramId: "1c7a6d9c-3d5c-4020-b1ba-c7feee3f4ef6",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "Result Name",
						},
					},
					{
						paramId: "971cc30c-79db-4045-9cc1-0c89bc2b66b3",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "Result Name",
						},
					},
					{
						paramId: "f0028ea0-f38d-45f2-ca9c-3962a676e5ce",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "Result Name",
						},
					},
					{
						paramId: "8edb0d54-c402-481b-e5a9-874bd04b0f8e",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "Result Name",
						},
					},
					{
						paramId: "a3cc1a27-a80a-45c5-a955-76a318507824",
						parameters: {
							step: "HeatMap-Store Result",
							title: "Result Name",
						},
					},
					{
						paramId: "d6a9b9c3-6c10-41a1-84b7-81c554d0e956",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "Result Name",
						},
					},
				],
			},
			{
				title: "damage_interval_keys",
				description: "damage_interval_keys",
				variableName: "bldgDamageIntervalKeys",
				widget: null,
				hidden: true,
				defaultValue: "DS_0 DS_1 DS_2 DS_3",
				parametersMap: [
					{
						paramId: "d1b0b142-b755-4ad7-8959-ba1ffe9b2864",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "damage_interval_keys",
						},
					},
				],
			},
			{
				title: "damage_interval_keys",
				description: "damage_interval_keys",
				variableName: "epfDamageIntervalKeys",
				widget: null,
				hidden: true,
				defaultValue: "DS_0 DS_1 DS_2 DS_3 DS_4",
				parametersMap: [
					{
						paramId: "2d42149f-dee4-4888-d26c-f4150bfd62c3",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "damage_interval_keys",
						},
					},
				],
			},
			{
				title: "failure_state_keys",
				description: "failure_state_keys",
				variableName: "bldgFailureStateKeys",
				widget: null,
				hidden: true,
				defaultValue: "DS_2 DS_3",
				parametersMap: [
					{
						paramId: "f94aea0f-4276-48e6-8f1e-dd6b1eb3ce78",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "failure_state_keys",
						},
					},
				],
			},
			{
				title: "failure_state_keys",
				description: "failure_state_keys",
				variableName: "epfFailureStateKeys",
				widget: null,
				hidden: true,
				defaultValue: "DS_2 DS_3 DS_4",
				parametersMap: [
					{
						paramId: "433418a3-10b6-42e7-e947-bc2a4a9f7334",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "failure_state_keys",
						},
					},
				],
			},
			{
				title: "seed",
				description: "seed",
				variableName: "seed",
				widget: null,
				hidden: true,
				defaultValue: 1111,
				parametersMap: [
					{
						paramId: "85105a63-8cba-408d-de57-57d57f7742e4",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "seed",
						},
					},
					{
						paramId: "03d4fe6f-d9d6-4bfb-900d-5c17c6a91b49",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "seed",
						},
					},
					{
						paramId: "19ee09f2-57dc-4652-9bff-8e5db6758820",
						parameters: {
							step: "PopulationDislocation",
							title: "seed",
						},
					},
					{
						paramId: "d109c67d-c547-4d86-da41-12d2b4d389bb",
						parameters: {
							step: "BuildingDamage",
							title: "seed",
						},
					},
					{
						paramId: "8ecae30f-8a44-4ea2-a62b-e2129559f562",
						parameters: {
							step: "HousingRecoverySequential",
							title: "seed",
						},
					},
				],
			},
			{
				title: "num_samples",
				description: "num_samples",
				variableName: "mcsSamples",
				widget: null,
				hidden: true,
				defaultValue: 100,
				parametersMap: [
					{
						paramId: "a45d5c3a-dd94-4780-a366-adda08b7c9a4",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "num_samples",
						},
					},
					{
						paramId: "1fa63fcb-7093-4737-b3a8-0e1fd6c00cac",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "num_samples",
						},
					},
				],
			},
			{
				title: "num_cpu",
				description: "num_cpu",
				variableName: "numCPUs",
				widget: null,
				hidden: true,
				defaultValue: 8,
				parametersMap: [
					{
						paramId: "72d2212a-9aa6-4511-c0b8-6990e5f51667",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "num_cpu",
						},
					},
					{
						paramId: "145a7b7c-19f3-40cb-9d7f-3131d8d39d1b",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "num_cpu",
						},
					},
					{
						paramId: "9eefb251-7b32-4101-823e-1da5f3bfcda5",
						parameters: {
							step: "Sub-EpfDamage",
							title: "num_cpu",
						},
					},
					{
						paramId: "fa432b67-adb9-47cb-bd0e-aa7197aada15",
						parameters: {
							step: "HousingRecoverySequential",
							title: "num_cpu",
						},
					},
					{
						paramId: "937224ee-0e6c-40d7-dd2e-6a40018c1a02",
						parameters: {
							step: "BuildingDamage",
							title: "num_cpu",
						},
					},
				],
			},
			{
				title: "IN-CORE Service",
				description: "IN-CORE Service",
				variableName: "serviceURL",
				widget: null,
				hidden: true,
				defaultValue: "https://incore-dev.ncsa.illinois.edu",
				parametersMap: [
					{
						paramId: "5a299c82-de5a-425e-c614-4131f832bfb2",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "62a70e86-ae79-42cd-f5a5-58c9cabb2b05",
						parameters: {
							step: "Sub-MonteCarloFailureProbability",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "b9ef16f4-c7ad-4102-d655-3e003d07e19a",
						parameters: {
							step: "Sub-EpfDamage",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "90deb257-9323-47b1-ebb1-08d369a3bf50",
						parameters: {
							step: "SocialVulnerability",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "35be8a30-a623-447b-9f2a-cd90155d1638",
						parameters: {
							step: "PopulationDislocation",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "ff748e6c-3410-4751-bad4-ff98a7594026",
						parameters: {
							step: "Building-Func-Cluster",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "91b27c64-7508-4414-decb-a44f53f2ff97",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "38a0ecc3-6a49-4629-d75d-324d2b7cf79a",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "ad3f373b-83a4-4a64-9a52-286989e8fae1",
						parameters: {
							step: "BuildingDamage",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "7c86cc07-37d6-48cb-f75f-8c90d9512023",
						parameters: {
							step: "BuildingFunctionality-sub-only",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "e58893b5-d7a0-428a-ec04-0965c6b0af0e",
						parameters: {
							step: "CapitalShocks",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "efd1f25b-9379-4002-81c4-9b3a87981a21",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "667febc2-6d3b-4c67-bd52-5a678dfa4418",
						parameters: {
							step: "HousingRecoverySequential",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "c4cdeae6-da88-4317-b08b-720d5cf77dd2",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "2dd45c06-bc4a-4829-b4a5-84486329e528",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "ae37b54d-a49b-4810-85bc-531ef4425bff",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "cc1b9842-a4d9-4479-a232-6bccf2fcdabc",
						parameters: {
							step: "HeatMap-Store Result",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "35afa396-03c6-4b47-e3b0-de80120f48a1",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "IN-CORE Service",
						},
					},
				],
			},
			{
				title: "Hazard Type",
				description: "hazard_type",
				variableName: "selectedHazardType",
				widget: "AllowedHazardTypes",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "706184d5-85da-4245-c28e-98fde1bf3150",
						parameters: {
							step: "Sub-EpfDamage",
							title: "hazard_type",
						},
					},
					{
						paramId: "a385ac10-a8c4-44e0-8293-75d77d4c3793",
						parameters: {
							step: "BuildingDamage",
							title: "hazard_type",
						},
					},
				],
			},
			{
				title: "Hazard ID",
				description: "hazard_id",
				variableName: "selectedHazardId",
				widget: "Hazards",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "69a4732f-c914-40ca-c2ac-f61242bf2190",
						parameters: {
							step: "Sub-EpfDamage",
							title: "hazard_id",
						},
					},
					{
						paramId: "71e714b0-fa46-4e39-923c-7c5087665f86",
						parameters: {
							step: "BuildingDamage",
							title: "hazard_id",
						},
					},
				],
			},
			{
				title: "fragility_key",
				description: "fragility_key",
				variableName: "fragilityKey",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "43c0d905-d219-40c1-a95a-aabbc164f59c",
						parameters: {
							step: "Sub-EpfDamage",
							title: "fragility_key",
						},
					},
					{
						paramId: "28e71889-26b7-4178-b3c3-55b71b18d6bc",
						parameters: {
							step: "BuildingDamage",
							title: "fragility_key",
						},
					},
				],
			},
			{
				title: "liquefaction_fragility_key",
				description: "liquefaction_fragility_key",
				variableName: "liquefactionFragilityKey",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "a0c5a39b-ff11-4898-a2dc-dd5ca139c732",
						parameters: {
							step: "Sub-EpfDamage",
							title: "liquefaction_fragility_key",
						},
					},
				],
			},
			{
				title: "use_liquefaction",
				description: "use_liquefaction",
				variableName: "useLiquefaction",
				widget: null,
				hidden: true,
				defaultValue: "true",
				parametersMap: [
					{
						paramId: "80231a18-429b-43fa-de34-c8ab054b417e",
						parameters: {
							step: "Sub-EpfDamage",
							title: "use_liquefaction",
						},
					},
					{
						paramId: "4f2cfa0a-9e3c-4117-c3e1-37eef6d924d1",
						parameters: {
							step: "BuildingDamage",
							title: "use_liquefaction",
						},
					},
				],
			},
			{
				title: "liquefaction_geology_dataset_id",
				description: "liquefaction_geology_dataset_id",
				variableName: "liquefactionGeologyDataset",
				widget: null,
				hidden: true,
				defaultValue: "6335ae58ac33a63950a9d8a1",
				parametersMap: [
					{
						paramId: "e0a8a11f-ed36-49b4-a6e8-a3c92c939bb6",
						parameters: {
							step: "Sub-EpfDamage",
							title: "liquefaction_geology_dataset_id",
						},
					},
					{
						paramId: "dad935c9-0369-4ca3-ab93-aacaa43885f6",
						parameters: {
							step: "BuildingDamage",
							title: "liquefaction_geology_dataset_id",
						},
					},
				],
			},
			{
				title: "use_hazard_uncertainty",
				description: "use_hazard_uncertainty",
				variableName: "useUncertainty",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "2cf39637-68c6-4dfb-f953-3494363483cd",
						parameters: {
							step: "Sub-EpfDamage",
							title: "use_hazard_uncertainty",
						},
					},
					{
						paramId: "5f2b59eb-6041-4389-c13a-fe2d6c5d51ee",
						parameters: {
							step: "BuildingDamage",
							title: "use_hazard_uncertainty",
						},
					},
				],
			},
			{
				title: "Buildings",
				description: "Building Inventory",
				variableName: "selectedBldgId",
				widget: "Buildings",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "37cf203f-36c8-4ff7-c2a2-3e67cfca42ec",
						parameters: {
							step: "Building-Func-Cluster",
							title: "Buildings",
						},
					},
					{
						paramId: "3f8b0db0-c24b-4cc5-85fc-e9b06b9db485",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "Buildings",
						},
					},
					{
						paramId: "0d453ac8-fa91-4517-8727-9921ad17c3d1",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "Buildings",
						},
					},
					{
						paramId: "7a831e75-2a5c-4be9-c792-c4dd8d9fc64d",
						parameters: {
							step: "BuildingDamage",
							title: "buildings",
						},
					},
					{
						paramId: "34d5e043-f0b9-4ace-d3a3-276429954516",
						parameters: {
							step: "CapitalShocks",
							title: "buildings",
						},
					},
					{
						paramId: "02319e5d-65ac-45b0-a9a5-b033cbbe029a",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "Source ID",
						},
					},
					{
						paramId: "ade43ab3-8591-47d6-ac39-548fc7749728",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "Source ID",
						},
					},
					{
						paramId: "0118354a-ef49-4e44-cd07-d73b81180550",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "Source ID",
						},
					},
					{
						paramId: "905dd2c1-e0bd-412f-fb3b-99533fd1bc70",
						parameters: {
							step: "HeatMap-Store Result",
							title: "Source ID",
						},
					},
				],
			},
			{
				title: "Retrofit Strategies",
				description: "retrofit_strategy",
				variableName: "selectedRetrofitStrategyId",
				widget: "RetrofitStrategies",
				hidden: false,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "3091cc60-86cf-44ce-9dcf-2ef2b227aab4",
						parameters: {
							step: "BuildingDamage",
							title: "retrofit_strategy",
						},
					},
				],
			},
			{
				title: "Electric Power Substations",
				description: "epfs",
				variableName: "selectedSubstationId",
				widget: "Epfs",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "03bf9f80-8544-464d-c867-d7c0c0c495b4",
						parameters: {
							step: "Sub-EpfDamage",
							title: "epfs",
						},
					},
					{
						paramId: "9c9956ee-cff1-4f94-8e48-cafad3f898e8",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "Source ID",
						},
					},
				],
			},
			{
				title: "Network Interdependency",
				description: "interdependency_dictionary",
				variableName: "selectedInterdNetworkId",
				widget: "InterdNetworks",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "273dac0a-662c-4791-f8d7-803595ee1b33",
						parameters: {
							step: "BuildingFunctionality-sub-only",
							title: "interdependency_dictionary",
						},
					},
				],
			},
			{
				title: "dfr3_mapping_set",
				description: "dfr3_mapping_set",
				variableName: "epfMapping",
				widget: null,
				hidden: true,
				defaultValue: "5b47be62337d4a37b6197a3a",
				parametersMap: [
					{
						paramId: "6cf1350a-b5d8-4921-fed0-35acd1b2ab12",
						parameters: {
							step: "Sub-EpfDamage",
							title: "dfr3_mapping_set",
						},
					},
				],
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
							title: "Time Steps",
						},
					},
				],
			},
			{
				title: "national_vulnerability_feature_averages",
				description: "national_vulnerability_feature_averages",
				variableName: "nationalVulnerabilityFeatureAverages",
				widget: null,
				hidden: true,
				defaultValue: "63daa9ad695e0f57262c7d8f",
				parametersMap: [
					{
						paramId: "23ce8682-cdfa-4fcd-a335-219a40332e6b",
						parameters: {
							step: "SocialVulnerability",
							title: "national_vulnerability_feature_averages",
						},
					},
				],
			},
			{
				title: "social_vulnerability_demographic_factors",
				description: "social_vulnerability_demographic_factors",
				variableName: "demFactor",
				widget: null,
				hidden: true,
				defaultValue: "63daaa2c695e0f57262c7d95",
				parametersMap: [
					{
						paramId: "1eb72116-ce74-4e66-fab5-495995fd084e",
						parameters: {
							step: "SocialVulnerability",
							title: "social_vulnerability_demographic_factors",
						},
					},
				],
			},
			{
				title: "Buildings to Sectors Table",
				description: "buildings_to_sectors",
				variableName: "selectedBldgToSector",
				widget: "SectorShocks",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "13b87f69-109f-452d-a0fe-4b4c10692950",
						parameters: {
							step: "CapitalShocks",
							title: "buildings_to_sectors",
						},
					},
				],
			},
			{
				title: "Housing Unit Allocation",
				description: "housing_unit_allocation",
				variableName: "selectedHuaId",
				widget: "Huas",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "1c865a6c-4668-420f-974e-e238acfc5a5d",
						parameters: {
							step: "PopulationDislocation",
							title: "housing_unit_allocation",
						},
					},
				],
			},
			{
				title: "Block Group Data",
				description: "block_group_data",
				variableName: "selectedBlockGroupId",
				widget: "BlockGroups",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "fb769d18-b846-4cc3-c7e4-93955dfc3d84",
						parameters: {
							step: "PopulationDislocation",
							title: "block_group_data",
						},
					},
				],
			},
			{
				title: "Value Loss Parameter",
				description: "value_loss_param",
				variableName: "valueLosses",
				widget: "ValueLosses",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "e2536b2c-a6fe-4d21-fb73-e68b46841344",
						parameters: {
							step: "PopulationDislocation",
							title: "value_loss_param",
						},
					},
				],
			},
			{
				title: "Regions",
				description: "Regions",
				variableName: "regions",
				widget: null,
				hidden: true,
				defaultValue: "R1,R2",
				parametersMap: [
					{
						paramId: "46509d68-7f9e-447f-eb76-de5a884cf3b0",
						parameters: {
							step: "CGE-Output-Process",
							title: "Regions",
						},
					},
				],
			},
			{
				title: "HH Categories",
				description: "Household categories",
				variableName: "hhCategories",
				widget: null,
				hidden: true,
				defaultValue: "HH1,HH2,HH3,HH4",
				parametersMap: [
					{
						paramId: "fc7b149e-61be-4b34-a884-1234af9e98b0",
						parameters: {
							step: "CGE-Output-Process",
							title: "HH Categories",
						},
					},
				],
			},
			{
				title: "Demand Categories",
				description: "Demand Categories for employoment",
				variableName: "demCategories",
				widget: null,
				hidden: true,
				defaultValue: "AG_MI,UTIL,CONS,MANU,COMMER,EDU,HEALTH,ART_ACC,RELIG",
				parametersMap: [
					{
						paramId: "e838c579-15d3-43e7-dada-0f8345e15b21",
						parameters: {
							step: "CGE-Output-Process",
							title: "Demand Categories",
						},
					},
				],
			},
			{
				title: "Supply Categories",
				description: "Supply Categories",
				variableName: "supCategories",
				widget: null,
				hidden: true,
				defaultValue:
					"AG_MI,UTIL,CONS,MANU,COMMER,EDU,HEALTH,ART_ACC,RELIG,HS1,HS2,HS3",
				parametersMap: [
					{
						paramId: "7c88cdbf-3801-4371-e709-50be083c7f75",
						parameters: {
							step: "CGE-Output-Process",
							title: "Supply Categories",
						},
					},
				],
			},
			{
				title: "Archetype Mapping",
				description: "Building archetype mapping",
				variableName: "archetypeMapping",
				widget: null,
				hidden: true,
				defaultValue: "63c978b44b843238326c464b",
				parametersMap: [
					{
						paramId: "560c01da-6df8-4602-80b1-d321e4fac114",
						parameters: {
							step: "Building-Func-Cluster",
							title: "Archetype Mapping",
						},
					},
					{
						paramId: "d1451c74-4b6e-4cba-ef7f-defec6f1384d",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "Archetype Mapping",
						},
					},
					{
						paramId: "631955b9-06df-45d4-8136-b56c78193b22",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "Archetype Mapping",
						},
					},
				],
			},
			{
				title: "Cluster Column",
				description: "Column to cluster on",
				variableName: "clusterColumn",
				widget: null,
				hidden: true,
				defaultValue: "occ_type",
				parametersMap: [
					{
						paramId: "fa7e3420-a267-4196-d09b-5dca688a37ed",
						parameters: {
							step: "Building-Func-Cluster",
							title: "Cluster Column",
						},
					},
					{
						paramId: "157d4d89-7a8b-49d6-d5ce-bbdd97b1a401",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "Cluster Column",
						},
					},
					{
						paramId: "7e765d1a-a945-4008-d0d6-468c705b308a",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "Cluster Column",
						},
					},
				],
			},
			{
				title: "Group Column",
				description: "Column to create groups",
				variableName: "groupColumn",
				widget: null,
				hidden: true,
				defaultValue: "max_state",
				parametersMap: [
					{
						paramId: "d4b8ddb0-fa3f-4f93-d48b-7b3993c07500",
						parameters: {
							step: "Building-Dmg-Summary",
							title: "Group Column",
						},
					},
				],
			},
			{
				title: "dfr3_mapping_set",
				description: "dfr3_mapping_set",
				variableName: "bldgMapping",
				widget: null,
				hidden: true,
				defaultValue: "6309005ad76c6d0e1f6be081",
				parametersMap: [
					{
						paramId: "590311bd-4ba7-414f-e249-7a3d5524bef0",
						parameters: {
							step: "BuildingDamage",
							title: "dfr3_mapping_set",
						},
					},
				],
			},
			{
				title: "poles_damage_mcs_samples",
				description: "poles_damage_mcs_samples",
				variableName: "polesDmgMcsSamples",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "2c478590-c6bc-4ea2-9598-595a91a749b9",
						parameters: {
							step: "BuildingFunctionality-sub-only",
							title: "poles_damage_mcs_samples",
						},
					},
				],
			},
			{
				title: "model_iterations",
				description: "model_iterations",
				variableName: "modelIteration",
				widget: null,
				hidden: true,
				defaultValue: "1",
				parametersMap: [
					{
						paramId: "879e94d0-a95a-4820-e71a-c13120277ca9",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "model_iterations",
						},
					},
				],
			},
			{
				title: "solver_path",
				description: "solver_path",
				variableName: "solverPath",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "0a2086a4-ce3e-45c0-82b6-4ba4af1836b4",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "solver_path",
						},
					},
				],
			},
			{
				title: "SAM",
				description: "SAM",
				variableName: "sam",
				widget: null,
				hidden: true,
				defaultValue: "640758d66121f943887299a2",
				parametersMap: [
					{
						paramId: "2032accf-0ef0-440c-d4b7-1cff6f9bbd5f",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "SAM",
						},
					},
				],
			},
			{
				title: "BB",
				description: "BB",
				variableName: "bb",
				widget: null,
				hidden: true,
				defaultValue: "640759b56121f94388729d01",
				parametersMap: [
					{
						paramId: "d4568d6d-32eb-4035-ccbd-8239e5699e01",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "BB",
						},
					},
				],
			},
			{
				title: "IOUT",
				description: "IOUT",
				variableName: "iout",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "ce885abb-ab3c-43e8-89c2-c1ca3b3ff727",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "IOUT",
						},
					},
				],
			},
			{
				title: "MISC",
				description: "MISC",
				variableName: "misc",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "6785c9c4-ba9b-4f99-b1c0-7e69f9ba0a02",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "MISC",
						},
					},
				],
			},
			{
				title: "MISCH",
				description: "MISCH",
				variableName: "misch",
				widget: null,
				hidden: true,
				defaultValue: "64075a5d6121f94388729f8a",
				parametersMap: [
					{
						paramId: "5e8af984-79d2-463b-8ca4-fc946a1c0b4c",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "MISCH",
						},
					},
				],
			},
			{
				title: "EMPLOY",
				description: "EMPLOY",
				variableName: "employ",
				widget: null,
				hidden: true,
				defaultValue: "64075b116121f94388729f91",
				parametersMap: [
					{
						paramId: "3e7ed836-2114-4dea-ef3d-91074d6b821d",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "EMPLOY",
						},
					},
				],
			},
			{
				title: "JOBCR",
				description: "JOBCR",
				variableName: "jobcr",
				widget: null,
				hidden: true,
				defaultValue: "64075d1c6121f9438872a648",
				parametersMap: [
					{
						paramId: "80b43ed6-a66f-4891-fb46-194ee94d009c",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "JOBCR",
						},
					},
				],
			},
			{
				title: "OUTCR",
				description: "OUTCR",
				variableName: "outcr",
				widget: null,
				hidden: true,
				defaultValue: "64075e306121f9438872a7fb",
				parametersMap: [
					{
						paramId: "e9b22eb0-bb25-4e60-a0c7-ceb111770e28",
						parameters: {
							step: "SaltLakeCGEModel",
							title: "OUTCR",
						},
					},
				],
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
						paramId: "3909cd82-5256-4925-9e10-a63d9adb865f",
						parameters: {
							step: "HousingRecoverySequential",
							title: "t_delta",
						},
					},
				],
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
						paramId: "c02f86bb-8c65-418f-e836-2ee1b8791a2d",
						parameters: {
							step: "HousingRecoverySequential",
							title: "t_final",
						},
					},
				],
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
						paramId: "6cf56dec-68b9-4be9-e532-f9c422f7d57e",
						parameters: {
							step: "HousingRecoverySequential",
							title: "tpm",
						},
					},
				],
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
						paramId: "34fff30f-d199-4545-b7f6-138c4e5d0c24",
						parameters: {
							step: "HousingRecoverySequential",
							title: "initial_stage_probabilities",
						},
					},
				],
			},
			{
				title: "Output Type",
				description: "Output Type",
				variableName: "funcProbabilityDataType",
				widget: null,
				hidden: true,
				defaultValue: "incore:funcProbability",
				parametersMap: [
					{
						paramId: "9b2f055d-e708-42f5-bd92-c0479431e952",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "Output Type",
						},
					},
				],
			},
			{
				title: "Output Type",
				description: "Output Type",
				variableName: "failureProbabilityDataType",
				widget: null,
				hidden: true,
				defaultValue: "incore:failureProbability",
				parametersMap: [
					{
						paramId: "d923c37c-4b7e-41f1-e404-21003738d3c6",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "Output Type",
						},
					},
				],
			},
			{
				title: "Output Type",
				description: "Output Type",
				variableName: "maxDamageStateDataType",
				widget: null,
				hidden: true,
				defaultValue: "incore:maxDamageState",
				parametersMap: [
					{
						paramId: "bb24e40b-03a4-48ca-f943-ffe72103a4cd",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "Output Type",
						},
					},
					{
						paramId: "e97632f0-ff75-4f82-fab5-1d9fccc07c33",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "Output Type",
						},
					},
				],
			},
			{
				title: "Output Type",
				description: "Output Type",
				variableName: "popDislocationShpdataType",
				widget: null,
				hidden: true,
				defaultValue: "incore:popdislocationShp",
				parametersMap: [
					{
						paramId: "b2ada272-85f5-452a-f467-c5ef6ccd2262",
						parameters: {
							step: "HeatMap-Store Result",
							title: "Output Type",
						},
					},
				],
			},
			{
				title: "Output format",
				description: "Output format",
				variableName: "tableOutputFormat",
				widget: null,
				hidden: true,
				defaultValue: "table",
				parametersMap: [
					{
						paramId: "30ef6df8-bdfe-4a36-f686-4157fdaf5fe8",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "Output format",
						},
					},
					{
						paramId: "90b01539-1cb6-459b-abc9-a9d8fab0c664",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "Output format",
						},
					},
					{
						paramId: "a644b3c8-8a01-4f49-ce10-827e48936ebf",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "Output format",
						},
					},
					{
						paramId: "18d0b09b-b180-487b-fa2c-e7436edd8add",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "Output format",
						},
					},
				],
			},
			{
				title: "Output format",
				description: "Output format",
				variableName: "shapefileOutputFormat",
				widget: null,
				hidden: true,
				defaultValue: "shapefile",
				parametersMap: [
					{
						paramId: "0cfeaeb6-6a13-4eff-cf38-cbee21f56715",
						parameters: {
							step: "HeatMap-Store Result",
							title: "Output format",
						},
					},
				],
			},
			{
				title: "Spaces",
				description: "IN-CORE space or spaces to add the dataset to",
				variableName: "space",
				widget: null,
				hidden: true,
				defaultValue: "commresilienceslc",
				parametersMap: [
					{
						paramId: "c528ca2d-f572-45b0-b038-2954415b4b09",
						parameters: {
							step: "Bldg-Func-Store Result",
							title: "Spaces",
						},
					},
					{
						paramId: "464e2963-c527-47ab-acfe-46e58727e99e",
						parameters: {
							step: "Bldg-FailProb-Store Result",
							title: "Spaces",
						},
					},
					{
						paramId: "d405acb0-b2dc-4f88-b806-e7c749897712",
						parameters: {
							step: "Bldg-Max-Store Result",
							title: "Spaces",
						},
					},
					{
						paramId: "e27dd10c-4d57-48e6-9a2e-6affeabf0c4d",
						parameters: {
							step: "HeatMap-Store Result",
							title: "Spaces",
						},
					},
					{
						paramId: "0f6c26c1-4d99-4e2b-bd36-12b1f6a22f9f",
						parameters: {
							step: "Sub-Max-Store Result",
							title: "Spaces",
						},
					},
				],
			},
		],
		datasets: [
			{
				title: "Token",
				description: "IN-CORE Service Token",
				variableName: "token",
				widget: null,
				hidden: true,
				datasetsMap: [
					{
						datasetId: "c484e0b1-dff2-412f-efe8-2e0e5321d667",
						datasets: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "Token",
						},
					},
					{
						datasetId: "97a3ce6f-5b5f-40c0-8a0c-e26ceb92635c",
						datasets: {
							step: "Sub-MonteCarloFailureProbability",
							title: "Token",
						},
					},
					{
						datasetId: "c9ab0651-864f-4b6b-c1c1-fc64d1f58de3",
						datasets: {
							step: "Sub-EpfDamage",
							title: "Token",
						},
					},
					{
						datasetId: "3f95a3fe-f1f7-4b4f-84af-30fe38d9c241",
						datasets: {
							step: "SocialVulnerability",
							title: "Token",
						},
					},
					{
						datasetId: "0e7373df-c450-4455-d10b-d16f5113f177",
						datasets: {
							step: "PopulationDislocation",
							title: "Token",
						},
					},
					{
						datasetId: "f12247ba-854d-4b8e-e081-c4441fd537cc",
						datasets: {
							step: "Building-Func-Cluster",
							title: "IN-CORE Token",
						},
					},
					{
						datasetId: "edf2d5e6-0ac3-4c73-add5-3e11552884c5",
						datasets: {
							step: "Building-Failure-Cluster",
							title: "IN-CORE Token",
						},
					},
					{
						datasetId: "f8749e24-e188-4b27-838b-daa025e7a53c",
						datasets: {
							step: "Building-Dmg-Summary",
							title: "IN-CORE Token",
						},
					},
					{
						datasetId: "b7c3e9d1-9697-4ebd-d79a-9daaf66b4fc1",
						datasets: {
							step: "BuildingDamage",
							title: "Token",
						},
					},
					{
						datasetId: "7e031d84-c5ac-422c-fde4-7c2c5c0eed06",
						datasets: {
							step: "BuildingFunctionality-sub-only",
							title: "Token",
						},
					},
					{
						datasetId: "1fb15ca5-55db-4066-dbb6-a6f75d49aeb6",
						datasets: {
							step: "CapitalShocks",
							title: "Token",
						},
					},
					{
						datasetId: "60986703-1f86-4f8a-87a1-6e360a185f2e",
						datasets: {
							step: "SaltLakeCGEModel",
							title: "Token",
						},
					},
					{
						datasetId: "d92df4b0-48ba-46dd-9975-d04d90f82f2e",
						datasets: {
							step: "HousingRecoverySequential",
							title: "Token",
						},
					},
					{
						datasetId: "8460ca93-836c-4d48-f1e2-c9c031edca9c",
						datasets: {
							step: "Bldg-Func-Store Result",
							title: "Token",
						},
					},
					{
						datasetId: "0dff57fb-8f6c-4847-d00e-45a9d79dc8dc",
						datasets: {
							step: "Bldg-FailProb-Store Result",
							title: "Token",
						},
					},
					{
						datasetId: "f6806415-26e3-43bf-9585-62dc49080000",
						datasets: {
							step: "Bldg-Max-Store Result",
							title: "Token",
						},
					},
					{
						datasetId: "4208a3ee-2010-4f36-c8c4-4c90e7b11bfd",
						datasets: {
							step: "HeatMap-Store Result",
							title: "Token",
						},
					},
					{
						datasetId: "a201283a-e5bb-43ed-9f0f-06716ff1ef96",
						datasets: {
							step: "Sub-Max-Store Result",
							title: "Token",
						},
					},
				],
			},
		],
	},
	outputs: {
		datasets: [
			{
				title: "",
				description: "",
				datasetsMap: [
					{
						datasetId: "4eebb9b8-43f3-45cb-800c-d717d07d5d30",
						datasets: {
							step: "Disl-Post-Process",
							title: "Disl-Post-Process",
							variableName: "Disl-Post-ProcessLog",
							widget: "Log",
						},
					},
					{
						datasetId: "27147921-dc89-4693-f0f2-5d63b1b5a3cc",
						datasets: {
							step: "PopulationDislocation",
							title: "result",
							variableName: "populationDislocationDownload",
							widget: "PopDislocation",
						},
					},
					{
						datasetId: "f0f34461-2bc2-4b2a-c396-8ea576b725fa",
						datasets: {
							step: "Disl-Post-Process",
							title: "Dislocation by Race",
							variableName: "dislocationByRaceContent",
							widget: "PopDislocation",
						},
					},
					{
						datasetId: "9f8b3020-b39e-4e76-9cee-341f2cf675b1",
						datasets: {
							step: "Disl-Post-Process",
							title: "Dislocation by Income",
							variableName: "dislocationByIncomeContent",
							widget: "PopDislocation",
						},
					},
					{
						datasetId: "7812c343-e12a-4eca-b041-26e56e6c2bd3",
						datasets: {
							step: "Disl-Post-Process",
							title: "Dislocation by Tenure",
							variableName: "dislocationByTenureContent",
							widget: "PopDislocation",
						},
					},
					{
						datasetId: "0814b499-9937-453b-b143-19244795d008",
						datasets: {
							step: "Disl-Post-Process",
							title: "Dislocation by Housing Type",
							variableName: "dislocationByHousingTypeContent",
							widget: "PopDislocation",
						},
					},
					{
						datasetId: "c7dd6a3e-1625-4ce2-f41a-491ec221a09b",
						datasets: {
							step: "Disl-Post-Process",
							title: "Total Dislocation",
							variableName: "totalDislTableContent",
							widget: "PopDislocation",
						},
					},
					{
						datasetId: "af45fc57-c1d7-465b-c03f-a7a8b7ae79f1",
						datasets: {
							step: "Disl-Post-Process",
							title: "Dislocation by Disability",
							variableName: "dislocationByDisabilityContent",
							widget: "PopDislocation",
						},
					},
					{
						datasetId: "622be383-df51-42a4-f4bf-84e8d24f11f2",
						datasets: {
							step: "Bldg-Max-Dmg-State",
							title: "Bldg-Max-Dmg-State",
							variableName: "Bldg-Max-Dmg-StateLog",
							widget: "Log",
						},
					},
					{
						datasetId: "9b349e27-baa7-4a41-e9e4-d3290286a0a5",
						datasets: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "Bldg-MonteCarloFailureProbability",
							variableName: "Bldg-MonteCarloFailureProbabilityLog",
							widget: "Log",
						},
					},
					{
						datasetId: "180d1ee1-d74a-4046-c2d5-2694435c2a3e",
						datasets: {
							step: "Sub-MonteCarloFailureProbability",
							title: "Sub-MonteCarloFailureProbability",
							variableName: "Sub-MonteCarloFailureProbabilityLog",
							widget: "Log",
						},
					},
					{
						datasetId: "81650d08-7afb-4d03-b19d-3cab35ea9033",
						datasets: {
							step: "Sub-EpfDamage",
							title: "Sub-EpfDamage",
							variableName: "Sub-EpfDamageLog",
							widget: "Log",
						},
					},
					{
						datasetId: "b4019522-2d8c-4ca3-e919-d2023a13b40e",
						datasets: {
							step: "Sub-Max-Dmg-State",
							title: "Sub-Max-Dmg-State",
							variableName: "Sub-Max-Dmg-StateLog",
							widget: "Log",
						},
					},
					{
						datasetId: "dee3c1df-66b9-402a-a5ad-ca6d23a4662d",
						datasets: {
							step: "HHRSOutputProcess",
							title: "HHRSOutputProcess",
							variableName: "HHRSOutputProcessLog",
							widget: "Log",
						},
					},
					{
						datasetId: "fbf3842d-e2be-48ad-d421-5bcf5ab22811",
						datasets: {
							step: "HHRSOutputProcess",
							title: "Housing Recovery",
							variableName: "HHSBarChartContent",
							widget: "HHS",
						},
					},
					{
						datasetId: "45173a06-901f-4101-c8eb-5e15429d7e55",
						datasets: {
							step: "HousingRecoverySequential",
							title: "Housing Recovery",
							variableName: "HhsDownload",
							widget: "HHS",
						},
					},
					{
						datasetId: "4f9a7142-d382-4913-8894-7549ef77e50d",
						datasets: {
							step: "SocialVulnerability",
							title: "SocialVulnerability",
							variableName: "SocialVulnerabilityLog",
							widget: "Log",
						},
					},
					{
						datasetId: "6f0a8e45-eca2-40b4-8ea5-a964d582de4a",
						datasets: {
							step: "PopulationDislocation",
							title: "PopulationDislocation",
							variableName: "PopulationDislocationLog",
							widget: "Log",
						},
					},
					{
						datasetId: "e2867e0d-b637-4bea-dd14-b6beb03a0335",
						datasets: {
							step: "CGE-Output-Process",
							title: "CGE-Output-Process",
							variableName: "CGE-Output-ProcessLog",
							widget: "Log",
						},
					},
					{
						datasetId: "168b5193-c8aa-42b4-c64c-0b9b31914428",
						datasets: {
							step: "CGE-Output-Process",
							title: "Domestic Supply ",
							variableName: "cgeDomesticSupplyContent",
							widget: "CGE",
						},
					},
					{
						datasetId: "6c00efe4-9c49-403c-93cd-851780f57c16",
						datasets: {
							step: "CGE-Output-Process",
							title: "Total Household Income",
							variableName: "cgeHouseholdIncomeContent",
							widget: "CGE",
						},
					},
					{
						datasetId: "c3d7751a-487c-4179-eea2-451cd872ea2f",
						datasets: {
							step: "CGE-Output-Process",
							title: "Employment",
							variableName: "cgeEmploymentContent",
							widget: "CGE",
						},
					},
					{
						datasetId: "03488efa-bd41-42d5-d621-0ac9a2fb4a8f",
						datasets: {
							step: "SaltLakeCGEModel",
							title: "domestic-supply",
							variableName: "cgeDomesticSupplyDownload",
							widget: "CGE",
						},
					},
					{
						datasetId: "795a1e3a-c363-4839-c060-ef449ac6205f",
						datasets: {
							step: "SaltLakeCGEModel",
							title: "gross-income",
							variableName: "cgeHouseholdIncomeDownload",
							widget: "CGE",
						},
					},
					{
						datasetId: "4335c8c8-2382-44b3-829e-5c0169082062",
						datasets: {
							step: "SaltLakeCGEModel",
							title: "pre-disaster-factor-demand",
							variableName: "cgeEmploymentPreDownload",
							widget: "CGE",
						},
					},
					{
						datasetId: "198cf559-5e83-481f-8df6-b63befc84072",
						datasets: {
							step: "SaltLakeCGEModel",
							title: "post-disaster-factor-demand",
							variableName: "cgeEmploymentPostDownload",
							widget: "CGE",
						},
					},
					{
						datasetId: "7b82b481-32ae-4c3b-8e32-21f6c46c3a97",
						datasets: {
							step: "Building-Func-Cluster",
							title: "Building-Func-Cluster",
							variableName: "Building-Func-ClusterLog",
							widget: "Log",
						},
					},
					{
						datasetId: "6da16a29-ed5c-434a-90c9-7c233670d143",
						datasets: {
							step: "Building-Func-Cluster",
							title: "Functionality Cluster",
							variableName: "bldgFuncSummaryTableContent",
							widget: "BldgFunctionality",
						},
					},
					{
						datasetId: "3f32f287-cd46-4e5f-e3cd-50dff7de3b73",
						datasets: {
							step: "Building-Failure-Cluster",
							title: "Building-Failure-Cluster",
							variableName: "Building-Failure-ClusterLog",
							widget: "Log",
						},
					},
					{
						datasetId: "2e4668bb-03b4-40e1-8c59-688a94b45b64",
						datasets: {
							step: "Building-Failure-Cluster",
							title: "Failure Cluster json",
							variableName: "mcsBldgSummaryTableContent",
							widget: "BldgMCS",
						},
					},
					{
						datasetId: "4a7456d5-3153-4074-ac04-988d52a867e7",
						datasets: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "failure_probability",
							variableName: "mcsBldgFailureProbDownload",
							widget: "BldgMCS",
						},
					},
					{
						datasetId: "733108d3-6343-4a91-f657-98b36a5647bb",
						datasets: {
							step: "Building-Dmg-Summary",
							title: "Building-Dmg-Summary",
							variableName: "Building-Dmg-SummaryLog",
							widget: "Log",
						},
					},
					{
						datasetId: "95b65dc8-1129-40ee-c3d3-f880ebdb6bdc",
						datasets: {
							step: "Building-Dmg-Summary",
							title: "Building Dmg Summary",
							variableName: "bldgDmgSummaryTableContent",
							widget: "BldgDamage",
						},
					},
					{
						datasetId: "4e4aa0c6-59fe-4d4a-cb34-f9a0f6a7ea28",
						datasets: {
							step: "BuildingDamage",
							title: "ds_result",
							variableName: "bldgDmgDsResultDownload",
							widget: "BldgDamage",
						},
					},
					{
						datasetId: "3b71fa25-a661-4c7a-a981-907b1867d6d4",
						datasets: {
							step: "BuildingDamage",
							title: "BuildingDamage",
							variableName: "BuildingDamageLog",
							widget: "Log",
						},
					},
					{
						datasetId: "b3ed7b36-1782-424b-b2a5-3b355bf4ef0c",
						datasets: {
							step: "BuildingFunctionality-sub-only",
							title: "BuildingFunctionality-sub-only",
							variableName: "BuildingFunctionality-sub-onlyLog",
							widget: "Log",
						},
					},
					{
						datasetId: "6fa73a0f-414c-4a92-8004-825863bace39",
						datasets: {
							step: "CapitalShocks",
							title: "CapitalShocks",
							variableName: "CapitalShocksLog",
							widget: "Log",
						},
					},
					{
						datasetId: "e4c0d8f0-54a0-4256-995d-8566fe5d8cb6",
						datasets: {
							step: "CapitalShocks",
							title: "sector_shocks",
							variableName: "sectorShocksDownload",
							widget: "SectorShocks",
						},
					},
					{
						datasetId: "eba2e2ae-4b3f-4ce0-d4fe-152973b810f6",
						datasets: {
							step: "SaltLakeCGEModel",
							title: "SaltLakeCGEModel",
							variableName: "SaltLakeCGEModelLog",
							widget: "Log",
						},
					},
					{
						datasetId: "07b2567f-aca6-4d45-ec5d-4475f9cf16e5",
						datasets: {
							step: "HousingRecoverySequential",
							title: "HousingRecoverySequential",
							variableName: "HousingRecoverySequentialLog",
							widget: "Log",
						},
					},
					{
						datasetId: "959a0818-6da4-4a0c-b119-3251916848c1",
						datasets: {
							step: "Bldg-Func-Store Result",
							title: "Bldg-Func-Store Result",
							variableName: "Bldg-Func-StoreResultLog",
							widget: "Log",
						},
					},
					{
						datasetId: "105bba1c-a47d-4e86-b80a-d3a34d29bf24",
						datasets: {
							step: "Bldg-Func-Store Result",
							title: "Dataset ID",
							variableName: "bldgFuncProbINCOREId",
							widget: "BldgFunctionality",
						},
					},
					{
						datasetId: "04c0b274-841f-4e8a-dd67-b97a8a5fc235",
						datasets: {
							step: "BuildingFunctionality-sub-only",
							title: "functionality_probability",
							variableName: "bldgFuncProbDownload",
							widget: "BldgFunctionality",
						},
					},
					{
						datasetId: "2f1252f1-3665-425c-ad5e-18a6bc72a898",
						datasets: {
							step: "Bldg-FailProb-Store Result",
							title: "Bldg-FailProb-Store Result",
							variableName: "Bldg-FailProb-StoreResultLog",
							widget: "Log",
						},
					},
					{
						datasetId: "4159c722-1f23-44d7-ba89-3668c7a9fb4c",
						datasets: {
							step: "Bldg-FailProb-Store Result",
							title: "Dataset ID",
							variableName: "mcsBldgFailureProbINCOREId",
							widget: "BldgMCS",
						},
					},
					{
						datasetId: "8b054078-1e73-468a-8641-e1cceb22731a",
						datasets: {
							step: "Bldg-Max-Store Result",
							title: "Bldg-Max-Store Result",
							variableName: "Bldg-Max-StoreResultLog",
							widget: "Log",
						},
					},
					{
						datasetId: "c6801803-f96c-4f63-e4f3-e0b6d70c91a5",
						datasets: {
							step: "Bldg-Max-Store Result",
							title: "Dataset ID",
							variableName: "bldgMaxDamageStateINCOREId",
							widget: "BldgDamage",
						},
					},
					{
						datasetId: "c48c4288-0fa7-4eba-9dc9-09ebcc07976d",
						datasets: {
							step: "HeatMap-Store Result",
							title: "HeatMap-Store Result",
							variableName: "HeatMap-StoreResultLog",
							widget: "Log",
						},
					},
					{
						datasetId: "cbbb09d5-7a6c-4d27-e10f-b8ca723163dd",
						datasets: {
							step: "HeatMap-Store Result",
							title: "Dataset ID",
							variableName: "popdislHeatmapINCOREId",
							widget: "PopDislocation",
						},
					},
					{
						datasetId: "ac671bc7-ccdc-488d-8bb8-30edd9a97884",
						datasets: {
							step: "Sub-Max-Store Result",
							title: "Sub-Max-Store Result",
							variableName: "Sub-Max-StoreResultLog",
							widget: "Log",
						},
					},
					{
						datasetId: "7ec7d80e-e95a-4c5f-e148-8f60376bb3ae",
						datasets: {
							step: "Sub-Max-Store Result",
							title: "Dataset ID",
							variableName: "substationMaxDmgStateINCOREId",
							widget: "SubstationDamage",
						},
					},
					{
						datasetId: "0c2c6744-1097-4bca-e479-6158c6e396e8",
						datasets: {
							step: "Sub-EpfDamage",
							title: "result",
							variableName: "substationDmgDsResultDownload",
							widget: "SubstationDamage",
						},
					},
				],
			},
		],
	},
	metadata: [],
};

let datawolfConfig = {};
let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

// use default
datawolfConfig["hostname"] = hostname;
datawolfConfig["executionGetURL"] =
	`${hostname}/datawolf/workflows/${datawolfWorkflowConfig["wfId"]}/executions`;
datawolfConfig["executionPostURL"] = `${hostname}/datawolf/executions`;
datawolfConfig["datasetBaseURL"] = `${hostname}/datawolf/datasets`;
datawolfConfig["datawolfPersonsDetail"] = `${hostname}/datawolf/persons?email=`;
datawolfConfig["retreiveTimeInterval"] = 10 * 1000;

export { datawolfWorkflowConfig, datawolfConfig };

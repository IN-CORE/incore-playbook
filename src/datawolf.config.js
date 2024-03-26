const datawolfWorkflowConfig = {
	title: "galveston-community-wf-v1",
	description: "2023-03-24 full workflow v1",
	wfTitle: "galveston-community-wf-v1",
	wfId: "9c1c11c8-9ba5-4125-bb35-e032095983af",
	creatorId: "d39e1679-4dcc-4158-9655-a604801871a7",
	inputs: {
		parameters: [
			{
				title: "Result Name",
				description: "Result name",
				variableName: "resultName",
				widget: null,
				hidden: true,
				defaultValue: "Galveston",
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
							step: "Pole-Max-Dmg-State",
							title: "Result Name",
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
						paramId: "db1d7f2b-be47-41f1-87f6-d4624e0c8de9",
						parameters: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "result_name",
						},
					},
					{
						paramId: "ecc1d35f-3a34-46d9-e306-dc8bc5738eed",
						parameters: {
							step: "Pole-MonteCarloFailureProbability",
							title: "result_name",
						},
					},
					{
						paramId: "ffca1ace-2264-4dbe-e7c8-ecedc2dc748b",
						parameters: {
							step: "Pole-EpfDamage",
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
							step: "BuildingDamage-Surge",
							title: "result_name",
						},
					},
					{
						paramId: "5a644796-4ea5-447d-8ff4-70f34dc5548b",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "result_name",
						},
					},
					{
						paramId: "ea439f27-c1aa-4103-d10a-b55ba8c82912",
						parameters: {
							step: "BuildingDamage-Flood",
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
						paramId: "cbec56c7-c1c7-4dd3-bb9c-f0834c4bd70a",
						parameters: {
							step: "CombinedWindWaveSurgeBuildingDamage",
							title: "result_name",
						},
					},
					{
						paramId: "59331924-949f-4c78-ffa1-706f4ed0b6f3",
						parameters: {
							step: "BuildingFunctionality-pole-only",
							title: "result_name",
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
							step: "Pole-MonteCarloFailureProbability",
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
							step: "Pole-MonteCarloFailureProbability",
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
							step: "Pole-MonteCarloFailureProbability",
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
							step: "BuildingDamage-Surge",
							title: "seed",
						},
					},
					{
						paramId: "cd35e4d1-f2cc-4329-ccd9-6e679f7468ab",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "seed",
						},
					},
					{
						paramId: "b6280019-3f7c-45ab-c4ab-f5914ff57416",
						parameters: {
							step: "BuildingDamage-Flood",
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
							step: "Pole-MonteCarloFailureProbability",
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
							step: "Pole-MonteCarloFailureProbability",
							title: "num_cpu",
						},
					},
					{
						paramId: "9eefb251-7b32-4101-823e-1da5f3bfcda5",
						parameters: {
							step: "Pole-EpfDamage",
							title: "num_cpu",
						},
					},
					{
						paramId: "937224ee-0e6c-40d7-dd2e-6a40018c1a02",
						parameters: {
							step: "BuildingDamage-Surge",
							title: "num_cpu",
						},
					},
					{
						paramId: "e588c1a2-9716-41ed-850c-70f626ce0b5a",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "num_cpu",
						},
					},
					{
						paramId: "1f439687-ddd2-4822-e5e0-40a33860b308",
						parameters: {
							step: "BuildingDamage-Flood",
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
							step: "Pole-MonteCarloFailureProbability",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "b9ef16f4-c7ad-4102-d655-3e003d07e19a",
						parameters: {
							step: "Pole-EpfDamage",
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
							step: "BuildingDamage-Surge",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "1199d11d-6354-45af-ec56-3b95c684df3b",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "b1d78389-bc45-424e-8310-bd502451fa08",
						parameters: {
							step: "BuildingDamage-Flood",
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
							step: "Pole-Max-Store Result",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "753e2aaa-1f32-4c2d-bade-88ec43c8435c",
						parameters: {
							step: "CombinedWindWaveSurgeBuildingDamage",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "9c9e4b0d-28d0-46f8-9288-6a0ce27a1c49",
						parameters: {
							step: "BuildingFunctionality-pole-only",
							title: "IN-CORE Service",
						},
					},
					{
						paramId: "0d10cacb-6926-46c3-d8a6-f96e2a7f540e",
						parameters: {
							step: "GalvestonCGEModel",
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
							step: "Pole-EpfDamage",
							title: "hazard_type",
						},
					},
					{
						paramId: "a385ac10-a8c4-44e0-8293-75d77d4c3793",
						parameters: {
							step: "BuildingDamage-Surge",
							title: "hazard_type",
						},
					},
					{
						paramId: "5f4dd770-c0ce-4387-c29b-2316dfa2c437",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "hazard_type",
						},
					},
					{
						paramId: "32899621-936b-417a-e205-533ed2533654",
						parameters: {
							step: "BuildingDamage-Flood",
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
							step: "Pole-EpfDamage",
							title: "hazard_id",
						},
					},
					{
						paramId: "71e714b0-fa46-4e39-923c-7c5087665f86",
						parameters: {
							step: "BuildingDamage-Surge",
							title: "hazard_id",
						},
					},
					{
						paramId: "f187f11f-8ffe-468c-b909-c7c154e8ccf6",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "hazard_id",
						},
					},
					{
						paramId: "a25766e2-b8d3-45dc-86f1-c8dc86582095",
						parameters: {
							step: "BuildingDamage-Flood",
							title: "hazard_id",
						},
					},
				],
			},
			{
				title: "fragility_key",
				description: "fragility_key",
				variableName: "epfFragilityKey",
				widget: null,
				hidden: true,
				defaultValue: "Non-Retrofit Fragility ID Code",
				parametersMap: [
					{
						paramId: "43c0d905-d219-40c1-a95a-aabbc164f59c",
						parameters: {
							step: "Pole-EpfDamage",
							title: "fragility_key",
						},
					},
				],
			},
			{
				title: "fragility_key",
				description: "fragility_key",
				variableName: "bldgFragilityKey",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "28e71889-26b7-4178-b3c3-55b71b18d6bc",
						parameters: {
							step: "BuildingDamage-Surge",
							title: "fragility_key",
						},
					},
					{
						paramId: "3e537d73-25c3-4432-e208-88a9a32001ce",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "fragility_key",
						},
					},
					{
						paramId: "f0bc6779-2264-45da-ec0b-e07edda2434a",
						parameters: {
							step: "BuildingDamage-Flood",
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
							step: "Pole-EpfDamage",
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
				defaultValue: "",
				parametersMap: [
					{
						paramId: "80231a18-429b-43fa-de34-c8ab054b417e",
						parameters: {
							step: "Pole-EpfDamage",
							title: "use_liquefaction",
						},
					},
					{
						paramId: "4f2cfa0a-9e3c-4117-c3e1-37eef6d924d1",
						parameters: {
							step: "BuildingDamage-Surge",
							title: "use_liquefaction",
						},
					},
					{
						paramId: "e119477e-7b01-4447-a5cc-c74e5b2e5fd1",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "use_liquefaction",
						},
					},
					{
						paramId: "cd604605-3bf0-4bbe-bcc4-dc03806d5db2",
						parameters: {
							step: "BuildingDamage-Flood",
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
				defaultValue: "",
				parametersMap: [
					{
						paramId: "e0a8a11f-ed36-49b4-a6e8-a3c92c939bb6",
						parameters: {
							step: "Pole-EpfDamage",
							title: "liquefaction_geology_dataset_id",
						},
					},
					{
						paramId: "dad935c9-0369-4ca3-ab93-aacaa43885f6",
						parameters: {
							step: "BuildingDamage-Surge",
							title: "liquefaction_geology_dataset_id",
						},
					},
					{
						paramId: "deb73def-173f-4df6-b49f-0716964ebc24",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "liquefaction_geology_dataset_id",
						},
					},
					{
						paramId: "ce7e0bd4-00b0-4c64-8466-30720922d7a9",
						parameters: {
							step: "BuildingDamage-Flood",
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
							step: "Pole-EpfDamage",
							title: "use_hazard_uncertainty",
						},
					},
					{
						paramId: "5f2b59eb-6041-4389-c13a-fe2d6c5d51ee",
						parameters: {
							step: "BuildingDamage-Surge",
							title: "use_hazard_uncertainty",
						},
					},
					{
						paramId: "c800feb2-8515-4ea6-b52c-817d51c3a271",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "use_hazard_uncertainty",
						},
					},
					{
						paramId: "60df1d7f-cd4e-431e-a8d8-d65bddc33d3a",
						parameters: {
							step: "BuildingDamage-Flood",
							title: "use_hazard_uncertainty",
						},
					},
				],
			},
			{
				title: "Buildings",
				description: "Building inventory",
				variableName: "selectedBldgId",
				widget: "Buildings",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "3f8b0db0-c24b-4cc5-85fc-e9b06b9db485",
						parameters: {
							step: "Building-Failure-Cluster",
							title: "Buildings",
						},
					},
					{
						paramId: "37cf203f-36c8-4ff7-c2a2-3e67cfca42ec",
						parameters: {
							step: "Building-Func-Cluster",
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
							step: "BuildingDamage-Surge",
							title: "buildings",
						},
					},
					{
						paramId: "dcf00197-caa3-44e8-fd33-126c73ea7672",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "buildings",
						},
					},
					{
						paramId: "5811164f-aa54-4155-db3d-a8f174785546",
						parameters: {
							step: "BuildingDamage-Flood",
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
				title: "retrofit strategy",
				description: "retrofit_strategy",
				variableName: "selectedRetrofitStrategyId",
				widget: "RetrofitStrategies",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "3091cc60-86cf-44ce-9dcf-2ef2b227aab4",
						parameters: {
							step: "BuildingDamage-Surge",
							title: "retrofit_strategy",
						},
					},
					{
						paramId: "36b8c16f-9dc7-4d3e-f1fe-36c978b9f84c",
						parameters: {
							step: "BuildingDamage-Flood",
							title: "retrofit_strategy",
						},
					},
				],
			},
			{
				title: "retrofit strategy not needed",
				description: "retrofit_strategy not needed",
				variableName: "selectedRetrofitStrategyId",
				widget: null,
				hidden: true,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "1ebbf186-ddba-45b4-c570-0406915a37ab",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "retrofit_strategy",
						},
					},
				],
			},
			{
				title: "epfs pole",
				description: "epfs pole",
				variableName: "selectedPoleId",
				widget: "Epfs",
				hidden: false,
				defaultValue: null,
				parametersMap: [
					{
						paramId: "03bf9f80-8544-464d-c867-d7c0c0c495b4",
						parameters: {
							step: "Pole-EpfDamage",
							title: "epfs",
						},
					},
					{
						paramId: "9c9956ee-cff1-4f94-8e48-cafad3f898e8",
						parameters: {
							step: "Pole-Max-Store Result",
							title: "Source ID",
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
				defaultValue: "62fac92ecef2881193f22613",
				parametersMap: [
					{
						paramId: "6cf1350a-b5d8-4921-fed0-35acd1b2ab12",
						parameters: {
							step: "Pole-EpfDamage",
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
				defaultValue: "6420bd8cb18d026e7c7db2d8",
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
				defaultValue: "",
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
				defaultValue: "IHH1,IHH2,IHH3,IHH4,IHH5,MHH1,MHH2,MHH3,MHH4,MHH5",
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
				description: "Demand Categories",
				variableName: "demCategories",
				widget: null,
				hidden: true,
				defaultValue:
					"IAGMIN,IUTIL,ICONS,IMANU,IWHOLE,IRETAIL,ITRANS,IPROFSER,IREALE,IEDU,IHEALTH,IART,IACCO,MAGMIN,MUTIL,MCONS,MMANU,MWHOLE,MRETAIL,MTRANS,MPROFSER,MREALE,MEDU,MHEALTH,MART,MACCO,HS1I,HS2I,HS3I,HS1M,HS2M,HS3M",
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
					"IAGMIN,IUTIL,ICONS,IMANU,IWHOLE,IRETAIL,ITRANS,IPROFSER,IREALE,IEDU,IHEALTH,IART,IACCO,MAGMIN,MUTIL,MCONS,MMANU,MWHOLE,MRETAIL,MTRANS,MPROFSER,MREALE,MEDU,MHEALTH,MART,MACCO,HS1I,HS2I,HS3I,HS1M,HS2M,HS3M",
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
				defaultValue: "6420befbb18d026e7c7dbafc",
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
				defaultValue: "arch_wind",
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
				variableName: "bldgSurgeWaveMapping",
				widget: null,
				hidden: true,
				defaultValue: "6303e51bd76c6d0e1f6be080",
				parametersMap: [
					{
						paramId: "590311bd-4ba7-414f-e249-7a3d5524bef0",
						parameters: {
							step: "BuildingDamage-Surge",
							title: "dfr3_mapping_set",
						},
					},
				],
			},
			{
				title: "dfr3_mapping_set",
				description: "dfr3_mapping_set",
				variableName: "bldgWindMapping",
				widget: null,
				hidden: true,
				defaultValue: "62fef3a6cef2881193f2261d",
				parametersMap: [
					{
						paramId: "3be2570a-cb50-4c00-fcd7-9bad28979819",
						parameters: {
							step: "BuildingDamage-Wind",
							title: "dfr3_mapping_set",
						},
					},
				],
			},
			{
				title: "dfr3_mapping_set",
				description: "dfr3_mapping_set",
				variableName: "bldgFloodMapping",
				widget: null,
				hidden: true,
				defaultValue: "62fefd688a30d30dac57bbd7",
				parametersMap: [
					{
						paramId: "17a98e75-4978-4ecf-8d5a-56ecdcc0e4e0",
						parameters: {
							step: "BuildingDamage-Flood",
							title: "dfr3_mapping_set",
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
				defaultValue: "6420c184b18d026e7c7dc321",
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
							step: "Pole-Max-Store Result",
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
							step: "Pole-Max-Store Result",
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
				defaultValue: "commresiliencegal",
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
							step: "Pole-Max-Store Result",
							title: "Spaces",
						},
					},
				],
			},
			{
				title: "substations_damage_mcs_samples",
				description: "substations_damage_mcs_samples",
				variableName: "substationsDmgMcsSamples",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "09d53917-3618-4a91-99bc-8304a859a97e",
						parameters: {
							step: "BuildingFunctionality-pole-only",
							title: "substations_damage_mcs_samples",
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
						paramId: "5adea2be-db15-4aa8-c3ef-2b1432bb6267",
						parameters: {
							step: "BuildingFunctionality-pole-only",
							title: "interdependency_dictionary",
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
						paramId: "60757a49-6019-4ec7-cea4-f3f62aece949",
						parameters: {
							step: "GalvestonCGEModel",
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
						paramId: "bc73d0f5-e81e-40b6-acb7-c1670bdbf3a1",
						parameters: {
							step: "GalvestonCGEModel",
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
				defaultValue: "6420c377b18d026e7c7dc327",
				parametersMap: [
					{
						paramId: "d283a461-3dd7-48bb-c272-d956d6f1fb9c",
						parameters: {
							step: "GalvestonCGEModel",
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
				defaultValue: "6420c3d2b18d026e7c7dc328",
				parametersMap: [
					{
						paramId: "9c1bc5cf-83c3-4be8-8d3f-96b4c9189a72",
						parameters: {
							step: "GalvestonCGEModel",
							title: "BB",
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
				defaultValue: "6420c434b18d026e7c7dc32e",
				parametersMap: [
					{
						paramId: "d7726876-6dd9-4690-d141-b34e3b1e8f0a",
						parameters: {
							step: "GalvestonCGEModel",
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
				defaultValue: "6420c474b18d026e7c7dc334",
				parametersMap: [
					{
						paramId: "a17d2606-cddd-4a1e-d218-bec8299cb94d",
						parameters: {
							step: "GalvestonCGEModel",
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
				defaultValue: "6420c4d9b18d026e7c7dc33a",
				parametersMap: [
					{
						paramId: "4870c4dd-273b-4129-81a8-9f5a93145542",
						parameters: {
							step: "GalvestonCGEModel",
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
				defaultValue: "6420c511b18d026e7c7dc340",
				parametersMap: [
					{
						paramId: "43d1286d-2731-4a37-bf7e-321fd56d5323",
						parameters: {
							step: "GalvestonCGEModel",
							title: "OUTCR",
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
							step: "Pole-MonteCarloFailureProbability",
							title: "Token",
						},
					},
					{
						datasetId: "c9ab0651-864f-4b6b-c1c1-fc64d1f58de3",
						datasets: {
							step: "Pole-EpfDamage",
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
							step: "BuildingDamage-Surge",
							title: "Token",
						},
					},
					{
						datasetId: "6bb8a788-b553-42c0-93bc-56d76b907781",
						datasets: {
							step: "BuildingDamage-Wind",
							title: "Token",
						},
					},
					{
						datasetId: "63a39c9d-9d9c-491c-ddba-ba7497ec0348",
						datasets: {
							step: "BuildingDamage-Flood",
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
							step: "Pole-Max-Store Result",
							title: "Token",
						},
					},
					{
						datasetId: "fd6039d6-3cc3-41f3-8de9-1836c579ad4a",
						datasets: {
							step: "CombinedWindWaveSurgeBuildingDamage",
							title: "Token",
						},
					},
					{
						datasetId: "6624d5c8-e7b8-42c4-aa0b-ea67b008912b",
						datasets: {
							step: "BuildingFunctionality-pole-only",
							title: "Token",
						},
					},
					{
						datasetId: "eae9e675-44f8-4eb8-952b-415d41d31ecb",
						datasets: {
							step: "GalvestonCGEModel",
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
							variableName: "DislPostProcessLog",
							widget: "Log",
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
							variableName: "BldgMaxDmgStateLog",
							widget: "Log",
						},
					},
					{
						datasetId: "9b349e27-baa7-4a41-e9e4-d3290286a0a5",
						datasets: {
							step: "Bldg-MonteCarloFailureProbability",
							title: "Bldg-MonteCarloFailureProbability",
							variableName: "BldgMonteCarloFailureProbabilityLog",
							widget: "Log",
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
						datasetId: "180d1ee1-d74a-4046-c2d5-2694435c2a3e",
						datasets: {
							step: "Pole-MonteCarloFailureProbability",
							title: "Pole-MonteCarloFailureProbability",
							variableName: "PoleMonteCarloFailureProbabilityLog",
							widget: "Log",
						},
					},
					{
						datasetId: "a1eddb50-15c3-4513-d03b-12624ff35b84",
						datasets: {
							step: "Pole-MonteCarloFailureProbability",
							title: "failure_probability",
							variableName: "bldgFuncProbDownload",
							widget: "BldgFunctionality",
						},
					},
					{
						datasetId: "81650d08-7afb-4d03-b19d-3cab35ea9033",
						datasets: {
							step: "Pole-EpfDamage",
							title: "Pole-EpfDamage",
							variableName: "PoleEpfDamageLog",
							widget: "Log",
						},
					},
					{
						datasetId: "0c2c6744-1097-4bca-e479-6158c6e396e8",
						datasets: {
							step: "Pole-EpfDamage",
							title: "result",
							variableName: "poleDmgDsResultDownload",
							widget: "PoleDamage",
						},
					},
					{
						datasetId: "b4019522-2d8c-4ca3-e919-d2023a13b40e",
						datasets: {
							step: "Pole-Max-Dmg-State",
							title: "Pole-Max-Dmg-State",
							variableName: "PoleMaxDmgStateLog",
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
						datasetId: "27147921-dc89-4693-f0f2-5d63b1b5a3cc",
						datasets: {
							step: "PopulationDislocation",
							title: "result",
							variableName: "populationDislocationDownload",
							widget: "PopDislocation",
						},
					},
					{
						datasetId: "e2867e0d-b637-4bea-dd14-b6beb03a0335",
						datasets: {
							step: "CGE-Output-Process",
							title: "CGE-Output-Process",
							variableName: "CGEOutputProcessLog",
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
						datasetId: "7b82b481-32ae-4c3b-8e32-21f6c46c3a97",
						datasets: {
							step: "Building-Func-Cluster",
							title: "Building-Func-Cluster",
							variableName: "BuildingFuncClusterLog",
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
							variableName: "BuildingFailureClusterLog",
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
						datasetId: "733108d3-6343-4a91-f657-98b36a5647bb",
						datasets: {
							step: "Building-Dmg-Summary",
							title: "Building-Dmg-Summary",
							variableName: "BuildingDmgSummaryLog",
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
						datasetId: "3b71fa25-a661-4c7a-a981-907b1867d6d4",
						datasets: {
							step: "BuildingDamage-Surge",
							title: "BuildingDamage-Surge",
							variableName: "BuildingDamageSurgeLog",
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
						datasetId: "07b2567f-aca6-4d45-ec5d-4475f9cf16e5",
						datasets: {
							step: "HousingRecoverySequential",
							title: "HousingRecoverySequential",
							variableName: "HousingRecoverySequentialLog",
							widget: "Log",
						},
					},
					{
						datasetId: "45173a06-901f-4101-c8eb-5e15429d7e55",
						datasets: {
							step: "HousingRecoverySequential",
							title: "HousingRecoverySequential",
							variableName: "HhsDownload",
							widget: "HHS",
						},
					},
					{
						datasetId: "959a0818-6da4-4a0c-b119-3251916848c1",
						datasets: {
							step: "Bldg-Func-Store Result",
							title: "Bldg-Func-Store Result",
							variableName: "BldgFuncStoreResultLog",
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
						datasetId: "2f1252f1-3665-425c-ad5e-18a6bc72a898",
						datasets: {
							step: "Bldg-FailProb-Store Result",
							title: "Bldg-FailProb-Store Result",
							variableName: "BldgFailProbStoreResultLog",
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
							variableName: "BldgMaxStoreResultLog",
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
							variableName: "HeatMapStoreResultLog",
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
							step: "Pole-Max-Store Result",
							title: "Pole-Max-Store Result",
							variableName: "PoleMaxStoreResultLog",
							widget: "Log",
						},
					},
					{
						datasetId: "7ec7d80e-e95a-4c5f-e148-8f60376bb3ae",
						datasets: {
							step: "Pole-Max-Store Result",
							title: "Dataset ID",
							variableName: "poleMaxDmgStateINCOREId",
							widget: "PoleDamage",
						},
					},
					{
						datasetId: "23c0b341-cfe0-44df-d932-9d4f8ff9fa76",
						datasets: {
							step: "CombinedWindWaveSurgeBuildingDamage",
							title: "CombinedWindWaveSurgeBuildingDamage",
							variableName: "CombinedWindWaveSurgeBuildingDamageLog",
							widget: "Log",
						},
					},
					{
						datasetId: "749639e9-7eaf-4961-e88d-512efd562785",
						datasets: {
							step: "CombinedWindWaveSurgeBuildingDamage",
							title: "ds_result",
							variableName: "bldgDmgDsResultDownload",
							widget: "BldgDamage",
						},
					},
					{
						datasetId: "c575a619-071a-468f-a59a-14dcb722ebaa",
						datasets: {
							step: "BuildingDamage-Wind",
							title: "BuildingDamage-Wind",
							variableName: "BuildingDamageWindLog",
							widget: "Log",
						},
					},
					{
						datasetId: "fe79ef7a-06cc-438c-be0f-4f5c61351185",
						datasets: {
							step: "BuildingDamage-Flood",
							title: "BuildingDamage-Flood",
							variableName: "BuildingDamageFloodLog",
							widget: "Log",
						},
					},
					{
						datasetId: "23ca622b-929f-4765-8e83-c08a4b4625d3",
						datasets: {
							step: "BuildingFunctionality-pole-only",
							title: "BuildingFunctionality-pole-only",
							variableName: "BuildingFunctionalitypoleonlyLog",
							widget: "Log",
						},
					},
					{
						datasetId: "f8e3974a-3bdb-4001-c5b7-dff2700842ed",
						datasets: {
							step: "BuildingFunctionality-pole-only",
							title: "functionality_probability",
							variableName: "bldgFuncProbDownload",
							widget: "BldgFunctionality",
						},
					},
					{
						datasetId: "097eae99-0e45-4351-fb5a-51c067a8e13e",
						datasets: {
							step: "GalvestonCGEModel",
							title: "GalvestonCGEModel",
							variableName: "GalvestonCGEModelLog",
							widget: "Log",
						},
					},
					{
						datasetId: "3e199adc-3b9f-436c-ac0e-c4e0d0d2b7ba",
						datasets: {
							step: "GalvestonCGEModel",
							title: "domestic-supply",
							variableName: "cgeDomesticSupplyDownload",
							widget: "CGE",
						},
					},
					{
						datasetId: "9c82bbff-8089-4e78-8f51-9509ab153f23",
						datasets: {
							step: "GalvestonCGEModel",
							title: "gross-income",
							variableName: "cgeHouseholdIncomeDownload",
							widget: "CGE",
						},
					},
					{
						datasetId: "3eac776e-3a12-443a-91fc-785301f4b7db",
						datasets: {
							step: "GalvestonCGEModel",
							title: "pre-disaster-factor-demand",
							variableName: "cgeEmploymentPreDownload",
							widget: "CGE",
						},
					},
					{
						datasetId: "a6e4de80-220d-4f8a-e68c-41cdf95883c0",
						datasets: {
							step: "GalvestonCGEModel",
							title: "post-disaster-factor-demand",
							variableName: "cgeEmploymentPostDownload",
							widget: "CGE",
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

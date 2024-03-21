const datawolfRsWorkflowConfig = {
	wfId: "efc14b0f-1848-4dc7-ad0d-69ef6d7f0d9c",
	title: "retrofit_strategy_wf",
	description: "Retrofit strategy workflow",
	created: "2024-03-15T18:51:21+0000",
	creatorId: "d39e1679-4dcc-4158-9655-a604801871a7",
	inputs: {
		parameters: [
			{
				title: "Rules",
				description: "Retrofit Strategy Rules",
				variableName: "rules",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "e9e3afdf-3af4-49d3-a0a6-70de8c177574",
						parameters: {
							step: "retrofit-strategy-builder",
							title: "Rules",
						},
					},
				],
			},
			{
				title: "Retrofits",
				description: "Retrofit methods and values",
				variableName: "retrofits",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "ce6a1f7e-4b0d-40bc-b36b-68a0e43c66be",
						parameters: {
							step: "retrofit-strategy-builder",
							title: "Retrofits",
						},
					},
				],
			},
			{
				title: "Result Name",
				description: "Strategy Related Results Name",
				variableName: "name",
				widget: null,
				hidden: true,
				defaultValue: "",
				parametersMap: [
					{
						paramId: "cb0c76c0-f5ef-4e14-c4ef-bf4205711003",
						parameters: {
							step: "retrofit-strategy-builder",
							title: "Result Name",
						},
					},
				],
			},
			{
				title: "IN-CORE Service URL",
				description: "IN-CORE Service URL",
				variableName: "incoreServiceUrl",
				widget: null,
				hidden: true,
				defaultValue: "https://incore-dev.ncsa.illinois.edu",
				parametersMap: [
					{
						paramId: "c67ef86a-568f-46dd-aced-3cdaa851da97",
						parameters: {
							step: "retrofit-strategy-builder",
							title: "IN-CORE Service URL",
						},
					},
				],
			},
			{
				title: "Spaces",
				description: "IN-CORE Spaces",
				variableName: "spaces",
				widget: null,
				hidden: true,
				defaultValue: "commresiliencejoplin",
				parametersMap: [
					{
						paramId: "bb8ebbaf-3c76-417c-8ffe-fad2d574ec48",
						parameters: {
							step: "retrofit-strategy-builder",
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
						datasetId: "89ac4a5b-7da1-4689-c5cc-a9607229f1b3",
						datasets: {
							step: "retrofit-strategy-builder",
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
				title: "stdout",
				description: "stdout",
				datasetsMap: [
					{
						datasetId: "ac3bc057-875d-428f-9951-a95124f595fd",
						datasets: {
							step: "retrofit-strategy-builder",
							title: "stdout",
							variableName: "log",
							widget: "RetrofitStrategySummary",
						},
					},
				],
			},
			{
				title: "Retrofit Strategy",
				description: "Dataset ID of Retrofit strategy CSV",
				datasetsMap: [
					{
						datasetId: "08b97e81-4c1a-42d8-f211-78bd6c819362",
						datasets: {
							step: "retrofit-strategy-builder",
							title: "Retrofit Strategy",
							variableName: "retrofitStrategy",
							widget: "RetrofitStrategySummary",
						},
					},
				],
			},
			{
				title: "Retrofit Strategy Details",
				description: "Dataset ID of Retrofit Strategy Details Shapefile",
				datasetsMap: [
					{
						datasetId: "a097cb85-ecc9-43df-f56b-5c6022188033",
						datasets: {
							step: "retrofit-strategy-builder",
							title: "Retrofit Strategy Details",
							variableName: "retrofitStrategyDetails",
							widget: "RetrofitStrategySummary",
						},
					},
				],
			},
			{
				title: "Retrofit Cost",
				description: "JSON of retrofit cost information",
				datasetsMap: [
					{
						datasetId: "23d776cd-3d66-46fb-8cc9-6a68f239c879",
						datasets: {
							step: "retrofit-strategy-builder",
							title: "Retrofit Cost",
							variableName: "retrofitCostSummary",
							widget: "RetrofitStrategySummary",
						},
					},
				],
			},
		],
	},
	metadata: [],
};

let datawolfRsConfig = {};
let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

// use default
datawolfRsConfig["hostname"] = hostname;
datawolfRsConfig["executionGetURL"] =
	`${hostname}/datawolf/workflows/${datawolfRsWorkflowConfig["wfId"]}/executions`;
datawolfRsConfig["executionPostURL"] = `${hostname}/datawolf/executions`;
datawolfRsConfig["datasetBaseURL"] = `${hostname}/datawolf/datasets`;
datawolfRsConfig["datawolfPersonsDetail"] =
	`${hostname}/datawolf/persons?email=`;
datawolfRsConfig["retreiveTimeInterval"] = 1000; // 1 second

export { datawolfRsWorkflowConfig, datawolfRsConfig };

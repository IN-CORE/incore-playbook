let config = {};

config["workflowId"] = "119e7ca2-e44c-476d-a62b-c9d2e54301d3";
// TODO how to dynamically use the current user
config["creatorId"] = "2724367d-d357-4e71-be10-d06b97535dec";
config["parameters"] = {
	"hazardTypeId": "bd03cb9b-c621-4a95-ae93-5f05fbe99d00",
	"damageRatioId": "70f8cb6b-d8b5-4471-de55-d55943700bf8",
	"mappingId": "d8d0c4b8-6388-432d-fc8f-a8329e8fafd0",
	"damageIntervalKeysId":"be53d998-d046-46d2-edb1-ce60eb1661c2",
	"numCpuId1":"adba9dd9-f4a0-40fa-ec86-6c50331068e0",
	"numCpuId2":"24759901-4a9c-470e-e14d-9e937832d07a",
	"serviceUrlId1":"2aa506b3-cf86-4dc3-eaf4-044af9fce7cb",
	"serviceUrlId2":"a669751e-4cdd-4d9d-c719-34c70ca98a5b",
	"damageTypeId":"2a10f6ea-5819-4eeb-aa44-ca5adb2a9809",
	"resultNameId1":"fdc32e85-80b9-43c6-f415-f43082e1dbab",
	"resultNameId2":"3a3c052f-94a7-4360-e2b2-cad71e156eb2",
	"hazardId":"3dc852c9-12e4-4186-8fb9-660aa01e6386",
	"sourceId":"3c6c02ae-35ce-437d-ac27-7ef7cc85d520",
	"buildingId":"974b7d06-58c6-4138-e271-a7d50e7a051d"
};

config["datasets"] = {
	"incoreTokenId1":"3598445d-1dbd-48f9-831d-406ac61b077a",
	"incoreTokenId2":"94d4bd0c-6386-4aae-f401-c37a0e1f5c07"
};

config["executionGetURL"] = `https://incore-dev-kube.ncsa.illinois.edu/datawolf/workflows/${config["workflowId"]}/executions`;
config["executionPostURL"] = "https://incore-dev-kube.ncsa.illinois.edu/datawolf/executions";

config["datasetBaseURL"] = "https://incore-dev-kube.ncsa.illinois.edu/datawolf/datasets";

config["bldgMeanDamageId"] = "62c2aec0-dfd8-4300-bb9a-bd5559e84316";
config["summaryTableId"] = "c4285f72-4259-464b-91bf-3e71f0f6e196";
config["bldgMaxDamageStateId"] = "de510f50-67b8-4119-fb47-f8032d31d703";

export default config;

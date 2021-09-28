import appConfig from "./app.config";

let config = {};

config["workflowId"] = "25077ac9-d7d6-45c0-880b-cd08ed35d8d0";
// TODO how to dynamically use the current user
config["creatorId"] = "ce92336c-1ca4-4989-8d6f-33cd3155b5ef"; // creatorId

config["parameters"] = {
	"incoreUserNameId": "c91efb6f-1196-45fc-e950-2a889b5c3d7b",
	"serviceUrlId":"b009f3d5-58a1-4474-db91-c20123fe8822", //https://incore-dev.ncsa.illinois.edu
	"useUncertaintyId":"f64ba875-088d-4577-f98d-d6e354fdb259",
	"useLiquefactionId":"2df987ba-dca9-4525-b316-b6f05d54856e",
	"numCpuId":"ada353de-bd22-4a37-9d53-8323c9ef01c9", // 4
	"hazardId":"1a83ac6e-20d6-4168-d85d-6764ba904ea9", //5d07cbeab9219c065b080930
	"hazardTypeId": "9b4932ee-af22-407e-b09e-7fc89ba1fe4a", //tornoda
	"buildingId":"99f7510e-c2f3-4825-cdea-3cb4aa1b2f1a", //5dbc8478b9219c06dd242c0d
	"bldgDamageRatioId": "66a22eae-5307-4c47-d953-2eb7970080f2", //5a284f2ec7d30d13bc08209a
	"bldgMappingId":"cf424377-d30b-4bac-c20f-aeaac09856b2", //5d8942dfb9219c068ea795ea
	"bldgFragilityKeyId":"b607cb65-685c-482a-991c-f00c0c40038e",
	"epfPoleId":"2f0be26e-aef2-4c53-a218-0b7deba5c41c", //5d923daab9219c06ae84afb0
	"epfSubstationId":"410a3e9f-2e3d-4146-8e57-4fdf84dc645a", //5d92355bb9219c06ae7e386a
	"epfMappingId":"6f5026f3-22be-46dd-a1c4-9576a0bbf293", //5d8a326fb9219c068ea798e7
	"mcsSamplesId":"98601c47-bce1-4c8a-99b5-3387592a128a", // 500
	"damageIntervalKeysId":"1515b4c7ca-87e5-441d-fea2-ebdbcb77388d", //DS_0 DS_1 DS_2 DS_3
	"interdependencyId":"107bff9c-a35f-432a-d4ae-e89b18e1cee2", //5dcf4a34b9219ca5e4118312
	"resultNameId":"f37d073e-a43a-4c0d-e037-efcb7c53242c", //Joplin

	// new
	"modelIterationsId":"30c18da0-ea79-4861-87ef-be7bec2c8e4e",
	"seedId":"1c4bd5db-6023-4855-ea2d-416415db3cde",
	"valueLossParamId":"37d172b3-084f-4c8b-c110-91597b56c7b6",
	"blockGroupDataId":"3ee62327-9fa5-48ba-9455-ffe34f480bfb",
	"archeTypeMappingId":"b19c55f4-f1ab-4eda-c508-17438524f78d",
	"housingUnitAllocationId":"a2302ea4-0f60-4d51-aa15-345637611170"
};

config["datasets"] = {
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
};

config["executionGetURL"] = `${appConfig.apiUrl}/datawolf/workflows/${config["workflowId"]}/executions`;
config["executionPostURL"] = `${appConfig.apiUrl}/datawolf/executions`;

config["datasetBaseURL"] =  `${appConfig.apiUrl}/datawolf/datasets`;

export default config;

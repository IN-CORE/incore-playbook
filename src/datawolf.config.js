import appConfig from "./app.config";

let config = {};

config["workflowId"] = "45623b48-6b0d-41fb-b725-a7ae3977ce49";
// TODO how to dynamically use the current user
config["creatorId"] = "a36fcc6a-bb7f-43ce-8eca-509fcc09cde5";

config["parameters"] = {
	"incoreUserNameId": "520967e3-0fe1-46c4-9a57-6edcc33d097e",
	"interdependencyId":"9f093268-4695-476a-db17-65997fe1755d", //5dcf4a34b9219ca5e4118312
	"useUncertaintyId":"03b98dcc-237c-4c2e-a300-cea2fca0b1d3",
	"numCpuId":"02d5f850-3379-4d05-aeb5-98593a02a4aa", // 4
	"useLiquefactionId":"3c8c60e2-dfce-4f9f-9bda-22f9a8518b92",
	"mcsSamplesId":"bc4cd0e3-2cb1-4629-e916-17f15f53ac49", // 500
	"bldgDamageRatioId": "a968b1c0-d87a-4e11-8737-43cfe81ac5d1", //5a284f2ec7d30d13bc08209a
	"epfPoleId":"77510ba2-da45-4e93-c17d-fc189f37a6a8", //5d923daab9219c06ae84afb0
	"hazardId":"76a30599-525c-4f0f-a434-67832435c157", //5d07cbeab9219c065b080930
	"damageIntervalKeysId":"5212ac13-6afa-49b8-ab31-fc2e08467dd6", //DS_0 DS_1 DS_2 DS_3
	"hazardTypeId": "98aab05c-bce2-4151-e02f-d60aed2519c2", //tornoda
	"bldgMappingId":"34d89c81-7f35-40f4-a85e-511657de9ce3", //5d8942dfb9219c068ea795ea
	"epfMappingId":"cd81271e-617d-44c2-a1da-ab7032c7d45d", //5d8a326fb9219c068ea798e7
	"bldgFragilityKeyId":"eaaad018-6543-42bc-c687-3374fcbc227e",
	"serviceUrlId":"9e3a8def-955c-4a06-f93c-7ebe1a36f42b", //https://incore-tst.ncsa.illinois.edu
	"epfSubstationId":"b01d290c-a14b-4143-f5f4-b30c660f3477", //5d92355bb9219c06ae7e386a
	"buildingId":"16ca458c-0f4d-49cd-a1a3-f832b104435c", //5dbc8478b9219c06dd242c0d
	"resultNameId":"01a7f162-a249-4fcf-ecb7-7bd7f3801e84", //Joplin
};

config["datasets"] = {
	// input
	"incoreTokenId":"9759b6cb-31ec-496e-de5b-30889fd8d10d",

	// bldg dmg
	"bldgDmgId":"6a78f065-90a5-4e82-879c-ad80c7c1bb1c",
	"bldgMeanDamageId":"b9085417-1ec7-4d04-b51c-b9733f54d581",
	"bldgDmgSummaryTableId":"11e33223-e86e-4b7c-ab00-50254410588a", // preview
	"bldgMaxDamageStateId":"8160a6e2-4edc-4e66-b1b3-4fc891c7b62f", // preview

	// pole dmg
	"epfPoleDmgId":"e6355ef9-3602-41ae-aa3c-91fef9d2b723",

	// substation dmg
	"epfSubstationDmgId":"8a73c2fc-01d6-4878-dc05-c0abafa5b15c",

	// mcs
	"mcsBldgFailureStateId":"7fcbdcc6-7bf7-4f5f-add2-b2bfa4ece62b",
	"mcsBldgFailureProbId":"847756a7-2daa-4b8d-96b5-3b1a4833a08f",
	"mcsPoleFailureStateId":"a8f93a4d-32c2-4a11-d42f-b01769b059c9",
	"mcsPoleFailureProbId":"67f34ab0-914b-4034-84ce-356f546af96d",
	"mcsSubstationFailureStateId":"24277a0e-8dd7-48c6-b291-7f3acd96b9c0",
	"mcsSubstationFailureProbId":"b2ff2fbb-0a83-4934-ae58-cef0cbbc4cca",

	// bldg func
	"bldgFuncSampleId":"2d54aa60-3173-4427-a32e-196abe884cad",
	"bldgFuncProbId":"6049880b-4441-4079-bba3-dc1a714a45d5",

	"stdout":"cca6d88a-0c86-484f-ec51-4f21dbc911ce",





};

config["executionGetURL"] = `${appConfig.apiUrl}/datawolf/workflows/${config["workflowId"]}/executions`;
config["executionPostURL"] = `${appConfig.apiUrl}/datawolf/executions`;

config["datasetBaseURL"] =  `${appConfig.apiUrl}/datawolf/datasets`;

export default config;

const globals = {};

// ******************* COMMON GLOBAL CONFIGS *******************

let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

globals["baseUrlRoute"] = "playbook";
globals["geoServerWMS"] = `${hostname}/geoserver/incore/wms`;
globals["geoServerWFS"] =
	`${hostname}/geoserver/incore/ows?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json`;
globals["client_id"] = "react-auth";
globals["authService"] =
	`${hostname}/auth/realms/In-core/protocol/openid-connect/token`;
globals["hazardServiceBase"] = `${hostname}/hazard/api/`;
globals["dataServiceBase"] = `${hostname}/data/api/`;
globals["spaceServiceBase"] = `${hostname}/space/api/`;
globals["setGravatarURL"] =
	"https://en.gravatar.com/support/activating-your-account/";
globals["allowUpload"] = true;
globals["enableRunAnalysis"] = false;
globals["registerNewUserURL"] =
	"https://identity.ncsa.illinois.edu/register/BSKC2UKQPU";
globals["resetPasswordURL"] = "https://identity.ncsa.illinois.edu/reset";

// might have multiple versions in the future
globals["inputDatasetTypes"] = {
	retrofitStrategies: [
		{
			type: "incore:retrofitStrategy",
			format: "table",
			num: 50,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_RETROFIT_STRATEGIES",
		},
	],
	epfs: [
		{
			type: "incore:epf",
			format: "shapefile",
			num: 20,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_EPFS",
		},
	],
	interdNetworks: [
		{
			type: "incore:buildingInterdependencyDict",
			format: "json",
			num: 20,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_INTERD",
		},
	],
	sectorShocks: [
		{
			description: "Buildings to sectors mapping",
			type: "incore:buildingsToSectors",
			format: "table",
			num: 5,
			isSocioeconomics: true,
			dispatchKey: "RECEIVE_SECTOR_SHOCKS",
		},
	],
	cgeSams: [
		{
			description: "Joplin CGE sam",
			type: "incore:JoplinCGEsam",
			format: "table",
			num: 5,
			isSocioeconomics: false, // not allow user to upload
			dispatchKey: "RECEIVE_CGE_SAM",
		},
	],
	cgeBbs: [
		{
			description: "Joplin CGE bb",
			type: "incore:JoplinCGEbb",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_BB",
		},
	],
	cgeIouts: [
		{
			description: "Joplin CGE iout",
			type: "incore:JoplinCGEiout",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_IOUTS",
		},
	],
	cgeMiscs: [
		{
			description: "Joplin CGE misc",
			type: "incore:JoplinCGEmisc",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_MISC",
		},
	],
	cgeMischs: [
		{
			description: "Joplin CGE misch",
			type: "incore:JoplinCGEmisch",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_MISCH",
		},
	],
	cgeLandcaps: [
		{
			description: "Joplin CGE landcap",
			type: "incore:JoplinCGElandcap",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_LANDCAP",
		},
	],
	cgeEmploys: [
		{
			description: "Joplin CGE employ",
			type: "incore:JoplinCGEemploy",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_EMPLOY",
		},
	],
	cgeIgtds: [
		{
			description: "Joplin CGE igtd",
			type: "incore:JoplinCGEigtd",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_IGTD",
		},
	],
	cgeTauffs: [
		{
			description: "Joplin CGE tauff",
			type: "incore:JoplinCGEtauff",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_TAUFF",
		},
	],
	cgeJobcrs: [
		{
			description: "Joplin CGE jobcr",
			type: "incore:JoplinCGEjobcr",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_JOBCR",
		},
	],
	cgeOutcrs: [
		{
			description: "Joplin CGE outcr",
			type: "incore:JoplinCGEoutcr",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_OUTCR",
		},
	],
	huas: [
		{
			description: "Housing unit allocation",
			type: "incore:housingUnitAllocation",
			format: "table",
			num: 5,
			isSocioeconomics: true,
			dispatchKey: "RECEIVE_HUA",
		},
	],
	blockGroups: [
		{
			description: "Block group census of racial and ethnic distribution",
			type: "incore:blockGroupData",
			format: "table",
			num: 5,
			isSocioeconomics: true,
			dispatchKey: "RECEIVE_BLOCK_GROUP",
		},
	],
	valueLosses: [
		{
			description: "Value loss beta distribution parameters",
			type: "incore:valuLossParam",
			format: "table",
			num: 5,
			isSocioeconomics: true,
			dispatchKey: "RECEIVE_VALUE_LOSS",
		},
	],
};

// ******************* Galveston GLOBAL CONFIGS *******************
const testbed = "galveston";
globals["maestroServiceBase"] = `${hostname}/maestro/${testbed}/`;
globals["allowedRegions"] = [
	{
		name: "Island",
		value: "I",
	},
	{
		name: "Mainland",
		value: "M",
	},
];
globals["testbedSpace"] = "commresiliencegal";
globals["testbedGroup"] = "incore_galveston_user"; // incore_galveston_user, incore_joplin_user, incore_slc_user
globals["inputDatasetTypes"].buildings = [
	{
		type: "ergo:buildingInventoryVer7",
		format: "shapefile",
		num: 20,
		isSocioeconomics: false,
		dispatchKey: "RECEIVE_BLDGS",
	},
];

globals["testbed"] = testbed;
globals["retrofitStrategyBuilder"] = {
	colorCodes: [
		"#C32541",
		"#1B3EBB",
		"#76930F",
		"#268FB0",
		"#BB772B",
		"#F54362",
		"#456AEA",
		"#98BB1D",
		"#47B4D6",
		"#E29D50",
		"#FC7F95",
		"#7C95EC",
		"#C9DF7A",
		"#83DEF2",
		"#F4C189",
		"#FDBBC9",
		"#DBD2FC",
		"#E0E9C2",
		"#CDECF0",
		"#FFE3C4",
	],
	maxStrategies: 20,
	conditions: [
		{
			label: "Flood Zone",
			type: "mapSelect",
			key: "zones",
			possibleOptions: [
				{
					label: "1% annual chance flood hazard",
					value: "1p",
				},
				{
					label: "0.2% annual chance flood hazard",
					value: "0.2p",
				},
			],
		},
		{
			label: "Building Archetypes",
			type: "select",
			key: "strtypes",
			possibleOptions: [
				{
					label:
						"1 story residential wood building (small rectangular plan and gable roof)",
					value: "1",
				},
				{
					label:
						"2 stories residential wood building (small square plan and gable roof)",
					value: "2",
				},
				{
					label:
						"1 story residential building (medium rectangular plan and gable roof)",
					value: "3",
				},
				{
					label:
						"2 stories residential building (medium rectangular plan and hip roof)",
					value: "4",
				},
			],
		},
		{
			label: "% number of Buildings",
			type: "number",
			key: "pcts",
			possibleOptions: null,
		},
	],
	retrofitMethods: [
		{
			label: "Retrofit Method",
			type: "select",
			key: "retrofits",
			possibleOptions: [
				{
					label: "Elevated by 5 feet",
					value: { ret_key: "elevation", ret_val: 5 },
				},
				{
					label: "Elevated by 10 feet",
					value: { ret_key: "elevation", ret_val: 10 },
				},
			],
		},
	],
	zoneLayerId: "65f50d44e42f3b0da55d74f5", // 2 labels flood zone map
	activeLayerNames: "Zone",
	activeLayerFieldname: "fld_zone",
	zoneMapBounds: [
		-95.23304467554465, 29.07743684291063, -94.37074997273265,
		29.598309974710844,
	],
	zoneMapStyle: "incore:zone",
};

globals["comparisonKey"] = ["A", "B"];

export { globals };

export const testUserInfo = "commresilience";

export const menuWidth = 300;

export const ARCHETYPE = {
	1: "Wood Residential Building - small rectangular plan, garble roof, 1 story",
	2: "Wood Residential Building - small rectangular plan, garble roof, 2 story",
	3: "Wood Residential Building - medium rectangular plan, hip roof, 2 story",
	4: "Wood Residential Building - medium rectangular plan, garble roof, 2 story",
	5: "Wood Residential Building - large rectangular plan, garble roof, 2 story",
	6: "Business and Retail Building",
	7: "Light Industrial Building",
	8: "Heavy Industrial Building",
	9: "Elementary/Middle School",
	10: "High School",
	11: "Fire-police station",
	12: "Hospital",
	13: "Community Center/Church",
	14: "Government Building",
	15: "Large big-box",
	16: "Small big-box",
	17: "Mobile Home",
	18: "Shopping Center",
	19: "Office Building",
};

export const processStatus = [
	{ name: "PENDING", key: "pending" },
	{ name: "IN PROGRESS", key: "in_progress" },
	{ name: "COMPLETE", key: "complete" },
];

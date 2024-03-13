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

// ******************* SLC GLOBAL CONFIGS *******************
globals["maestroServiceBase"] = `${hostname}/maestro/slc/`;
globals["allowedRegions"] = [
	{
		name: "R1",
		value: "R1",
	},
	{
		name: "R2",
		value: "R2",
	},
];
globals["testbedSpace"] = "commresilienceslc";
globals["testbedGroup"] = "incore_slc_user"; // incore_galveston_user, incore_joplin_user, incore_slc_user

globals["inputDatasetTypes"].buildings = [
	{
		type: "ergo:buildingInventoryVer6",
		format: "shapefile",
		num: 20,
		isSocioeconomics: false,
		dispatchKey: "RECEIVE_BLDGS",
	},
];

globals["testBed"] = "slc";

globals["retrofitStrategyBuilder"] = {
	maxStrategies: 4,
	displayValues: {
		URMM: "URMM",
		URML: "URML",
	},
	conditions: [
		{
			label: "Flood Zone",
			type: "mapSelect",
			key: "zone",
			possibleOptions: [],
		},
		{
			label: "Building Archetypes",
			type: "select",
			key: "archetype",
			possibleOptions: [
				{
					label: "URMM",
					value: "URMM",
				},
				{
					label: "URML",
					value: "URML",
				},
			],
		},
		{
			label: "% number of Buildings",
			type: "number",
			key: "percent",
			possibleOptions: null,
		},
	],
	retrofitMethods: [
		{
			label: "",
			type: "select",
			key: "retrofitMethod",
			possibleOptions: [
				{
					label: "Wood or Metal Deck Diaphragms",
					value: "Wood or Metal Deck Diaphragms",
				},
			],
		},
	],
	zoneLayerId: "incore:65ea380c4331420c85ddb211",
	activeLayerNames: "Zone",
};

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

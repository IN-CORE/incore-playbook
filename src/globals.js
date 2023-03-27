const globals = {};

let hostname = process.env.INCORE_REMOTE_HOSTNAME || "";

globals["baseUrlRoute"] = "playbook";
globals["geoServerWMS"] = `${hostname}/geoserver/incore/wms`;
globals["client_id"] = "react-auth";
globals["authService"] = `${hostname}/auth/realms/In-core/protocol/openid-connect/token`;
globals["hazardServiceBase"] = `${hostname}/hazard/api/`;
globals["dataServiceBase"] = `${hostname}/data/api/`;
globals["spaceServiceBase"] = `${hostname}/space/api/`;
globals["setGravatarURL"] = "https://en.gravatar.com/support/activating-your-account/";
globals["allowUpload"] = true;
// globals["maestroServiceBase"] = `${hostname}/maestro/joplin/`;
// globals["testbedSpace"] = "commresiliencejoplin";
// globals["testbedGroup"] = "incore_joplin_user"; // incore_galveston_user, incore_joplin_user, incore_slc_user

// globals["maestroServiceBase"] = `${hostname}/maestro/slc/`;
// globals["allowedRegions"] = ["R1", "R2"];
// globals["testbedSpace"] = "commresilienceslc";
// globals["testbedGroup"] = "incore_slc_user"; // incore_galveston_user, incore_joplin_user, incore_slc_user

globals["maestroServiceBase"] = `${hostname}/maestro/galveston/`;
globals["allowedRegions"] = ["R1", "R2", "R3", "R4", "R5", "R6", "R7"];
globals["testbedSpace"] = "commresiliencegal";
globals["testbedGroup"] = "incore_galveston_user"; // incore_galveston_user, incore_joplin_user, incore_slc_user

globals["registerNewUserURL"] = "https://identity.ncsa.illinois.edu/register/BSKC2UKQPU";
globals["resetPasswordURL"] = "https://identity.ncsa.illinois.edu/reset";

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
	19: "Office Building"
};

export const processStatus = [
	{ name: "PENDING", key: "pending" },
	{ name: "IN PROGRESS", key: "in_progress" },
	{ name: "COMPLETE", key: "complete" }
];

export const usersList = [
	{
		id: "101fc475-5896-408b-83ce-fe21e9d10f3d",
		username: "cmnavarr",
		firstName: "Chris",
		lastName: "Navarro",
		email: "cnavarro2@gmail.com"
	},
	{
		id: "9cdb85a1-c202-460d-b6ce-cc24cd85d3a8",
		username: "cwang138",
		firstName: "Chen",
		lastName: "Wang",
		email: "cwang138@illinois.edu"
	},
	{
		id: "283c466b-fc57-4d2d-ad03-ec1d30ba7fe0",
		username: "diegoac2",
		firstName: "Diego",
		lastName: "Rivera",
		email: "diegoac2@illinois.edu"
	},
	{
		id: "a5515771-c2ef-4032-bbe4-7e546496e628",
		username: "jonglee",
		firstName: "Jong",
		lastName: "Lee",
		email: "jonglee1@illinois.edu"
	},
	{
		id: "3383aa70-f06a-4061-b0ae-3e5f33678c81",
		username: "mondrejc",
		firstName: "Michal",
		lastName: "Ondrejcek",
		email: "ondrejce@illinois.edu"
	},
	{
		id: "c9bbdf2b-6d53-4bef-b485-6f44e9764ba5",
		username: "fredrick",
		firstName: "Mark",
		lastName: "Fredricksen",
		email: "mfrdrcks@illinois.edu"
	},
	{
		id: "b222dc55-14d0-4c9a-8dc0-10537e917ca0",
		username: "kooper",
		firstName: "Rob",
		lastName: "Kooper",
		email: "kooper@illinois.edu"
	},
	{
		id: "g1258955-14d0-mlka-2kl9-02341g352ke1",
		username: "ywkim",
		firstName: "Yong Wook",
		lastName: "Kim",
		email: "ywkim@illinois.edu"
	},
	{
		id: "b7ea9c2a-6773-4db5-a8aa-40f0bc076dfb",
		username: "gowtham",
		firstName: "Gowtham",
		lastName: "Naraharisetty",
		email: "vnarah2@illinois.edu"
	}
];

// might have multiple versions in the future
export const inputDatasetTypes = {
	buildings: [
		{
			type: "ergo:buildingInventoryVer6",
			format: "shapefile",
			num: 20,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_BLDGS"
		}
	],
	epfs: [
		{
			type: "incore:epf",
			format: "shapefile",
			num: 20,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_EPFS"
		}
	],
	interdNetworks: [
		{
			type: "incore:buildingInterdependencyDict",
			format: "json",
			num: 20,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_INTERD"
		}
	],
	sectorShocks: [
		{
			description: "Buildings to sectors mapping",
			type: "incore:buildingsToSectors",
			format: "table",
			num: 5,
			isSocioeconomics: true,
			dispatchKey: "RECEIVE_SECTOR_SHOCKS"
		}
	],
	cgeSams: [
		{
			description: "Joplin CGE sam",
			type: "incore:JoplinCGEsam",
			format: "table",
			num: 5,
			isSocioeconomics: false, // not allow user to upload
			dispatchKey: "RECEIVE_CGE_SAM"
		}
	],
	cgeBbs: [
		{
			description: "Joplin CGE bb",
			type: "incore:JoplinCGEbb",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_BB"
		}
	],
	cgeIouts: [
		{
			description: "Joplin CGE iout",
			type: "incore:JoplinCGEiout",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_IOUTS"
		}
	],
	cgeMiscs: [
		{
			description: "Joplin CGE misc",
			type: "incore:JoplinCGEmisc",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_MISC"
		}
	],
	cgeMischs: [
		{
			description: "Joplin CGE misch",
			type: "incore:JoplinCGEmisch",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_MISCH"
		}
	],
	cgeLandcaps: [
		{
			description: "Joplin CGE landcap",
			type: "incore:JoplinCGElandcap",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_LANDCAP"
		}
	],
	cgeEmploys: [
		{
			description: "Joplin CGE employ",
			type: "incore:JoplinCGEemploy",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_EMPLOY"
		}
	],
	cgeIgtds: [
		{
			description: "Joplin CGE igtd",
			type: "incore:JoplinCGEigtd",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_IGTD"
		}
	],
	cgeTauffs: [
		{
			description: "Joplin CGE tauff",
			type: "incore:JoplinCGEtauff",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_TAUFF"
		}
	],
	cgeJobcrs: [
		{
			description: "Joplin CGE jobcr",
			type: "incore:JoplinCGEjobcr",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_JOBCR"
		}
	],
	cgeOutcrs: [
		{
			description: "Joplin CGE outcr",
			type: "incore:JoplinCGEoutcr",
			format: "table",
			num: 5,
			isSocioeconomics: false,
			dispatchKey: "RECEIVE_CGE_OUTCR"
		}
	],
	huas: [
		{
			description: "Housing unit allocation",
			type: "incore:housingUnitAllocation",
			format: "table",
			num: 5,
			isSocioeconomics: true,
			dispatchKey: "RECEIVE_HUA"
		}
	],
	blockGroups: [
		{
			description: "Block group census of racial and ethnic distribution",
			type: "incore:blockGroupData",
			format: "table",
			num: 5,
			isSocioeconomics: true,
			dispatchKey: "RECEIVE_BLOCK_GROUP"
		}
	],
	valueLosses: [
		{
			description: "Value loss beta distribution parameters",
			type: "incore:valuLossParam",
			format: "table",
			num: 5,
			isSocioeconomics: true,
			dispatchKey: "RECEIVE_VALUE_LOSS"
		}
	]
};

import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { globals as defaultGlobalConfig, testUserInfo } from "../globals";
import {
	datawolfConfig as defaultDatawolfConfig,
	datawolfWorkflowConfig as defaultDatawolfWorkflowConfig,
} from "../datawolf.config.js";
import JSSoup from "jssoup";
import { fromLonLat, toLonLat } from "ol/proj";

const cookies = new Cookies();

//NOTE: This is only checking if a cookie is present, but not validating the cookie.
export const isAuthorized = (
	hostname = "",
	testbedGroup = defaultGlobalConfig.testbedGroup,
) => {
	const authorization = cookies.get("Authorization");

	if (hostname === "http://localhost:8080") return true;
	else {
		if (
			authorization !== undefined &&
			authorization !== "" &&
			authorization !== null
		) {
			// further restrict to the testbed group
			const userInfo = getCurrUserInfo(authorization);
			return "groups" in userInfo && userInfo["groups"].includes(testbedGroup);
		} else return false;
	}
};

//NOTE: This is only checking if a cookie is present, but not validating the cookie.
export const isAdmin = (hostname = "") => {
	const authorization = cookies.get("Authorization");

	if (hostname === "http://localhost:8080") return true;
	else {
		if (
			authorization !== undefined &&
			authorization !== "" &&
			authorization !== null
		) {
			// further restrict to the testbed group
			const userInfo = getCurrUserInfo(authorization);
			return "groups" in userInfo && userInfo["groups"].includes("incore_ncsa");
		} else return false;
	}
};

// construct header
export function getHeader(hostname = "") {
	if (hostname.includes("localhost")) {
		const headers = new Headers({
			"x-auth-userinfo": `{"preferred_username":"${testUserInfo}"}`,
		});

		return headers;
	} else {
		const headers = new Headers({
			Authorization: cookies.get("Authorization"),
		});

		return headers;
	}
}

// get current username
export function getCurrUsername(hostname = "") {
	if (hostname === "http://localhost:8080") {
		return testUserInfo;
	} else {
		let cookie = cookies.get("Authorization");
		if (cookie !== undefined && cookie !== "" && cookie.split(" ").length > 0) {
			let userInfo = jwt_decode(cookie.split(" ")[1]);
			return userInfo["preferred_username"];
		}
	}
}

// get current user's full name
export function getCurrUserFullname(hostname = "") {
	if (hostname === "http://localhost:8080") {
		return testUserInfo;
	} else {
		let cookie = cookies.get("Authorization");
		if (cookie !== undefined && cookie !== "" && cookie.split(" ").length > 0) {
			let userInfo = jwt_decode(cookie.split(" ")[1]);
			return `${userInfo["given_name"]} ${userInfo["family_name"]}`;
		}
	}
}

// get current users id from datawolf
export async function getCurrUserDatawolfId(
	email,
	datawolfConfig = defaultDatawolfConfig,
	datawolfWorkflowConfig = defaultDatawolfWorkflowConfig,
) {
	let cookie = cookies.get("DatawolfUserDetails");
	if (email === "" || undefined || null) {
		return datawolfWorkflowConfig["creatorId"]; // default to use the workflow creator's ID if no match can be found
	} else if (cookie !== undefined && cookie.email === email) {
		return cookie.id;
	}
	let endpoint = datawolfConfig["datawolfPersonsDetail"] + email;
	let request = await fetch(endpoint, {
		mode: "cors",
		headers: getHeader(datawolfConfig.hostname),
	});
	if (request.status === 200) {
		const userDetail = await request.json();
		cookies.set("DatawolfUserDetails", {
			id: userDetail[0].id,
			email: userDetail[0].email,
		});
		return userDetail[0].id;
	} else if (request.status === 401) {
		// TODO handle error
		return "";
	} else {
		// TODO handle error
		return "";
	}
}

// get incore token and write to a file
export function getIncoreTokenFile(hostname = "") {
	if (hostname !== "http://localhost:8080") {
		return new Blob([cookies.get("Authorization")], { type: "text/plain" });
	} else {
		return null;
	}
}

// get current user's encoded email address for datawolf use
export function getCurrEmail(hostname = "") {
	if (hostname === "http://localhost:8080") {
		return testUserInfo;
	} else {
		let cookie = cookies.get("Authorization");
		if (cookie && cookie !== "" && cookie.split(" ").length > 0) {
			let userInfo = jwt_decode(cookie.split(" ")[1]);
			// return userInfo["email"];
			return userInfo["email"];
		}
	}
}

export function getShortHTML(html) {
	let htmlSoup = new JSSoup(html);
	return htmlSoup.find("div", "shortDescription");
}

// export function round(val, n) {
// 	if (n === undefined || n === 0) {
// 		return Math.round(val);
// 	} else {
// 		return (Math.round((val + Number.EPSILON) * 10**n) / 10**n);
// 		// return +(Math.round(val + `e+${n}`) + `e-${n}`);
// 	}
// }

export function round(num, scale) {
	if (!`${num}`.includes("e")) {
		return +`${Math.round(`${num}e+${scale}`)}e-${scale}`;
	} else {
		let arr = `${num}`.split("e");
		let sig = "";
		if (+arr[1] + scale > 0) {
			sig = "+";
		}
		return +`${Math.round(`${+arr[0]}e${sig}${+arr[1] + scale}`)}e-${scale}`;
	}
}

export function diff(num1, num2) {
	if (num1 === undefined || num2 === undefined) {
		return "-";
	} else {
		const difference = num1 - num2;
		if (difference > 0) {
			return `+${difference.toLocaleString("en-US")}`;
		} else {
			return difference.toLocaleString("en-US");
		}
	}
}

export function percentDiff(num1, num2) {
	if (num1 === undefined || num2 === undefined) {
		return "-";
	} else {
		const difference = num1 - num2;
		if (difference > 0) {
			return `+${round(difference, 1)}%`;
		} else {
			return `${round(difference, 1)}%`;
		}
	}
}

export function formatPercent(val, n = 1) {
	return `${round(val, n)}%`;
}

export function formatProbToPercent(val, n = 1) {
	return formatPercent(val * 100, n);
}

export function exportJson(json, file_name) {
	let formattedJson = JSON.stringify(json, null, 4);
	let blob = new Blob([formattedJson], { type: "application/json" });

	const filename = `${file_name}.json`;

	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveBlob(blob, filename);
	} else {
		let anchor = window.document.createElement("a");
		anchor.href = window.URL.createObjectURL(blob);
		anchor.download = filename;
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
	}
}

export function dataURItoFile(dataURI, filename = "") {
	if (filename === undefined || filename === "" || filename === null)
		filename = "hurricane-raster.tif";
	let mime = dataURI.split(",")[0].match(/:(.*?);/)[1];
	let binary = atob(dataURI.split(",")[1]);
	let array = [];
	for (let i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	const blob = new Blob([new Uint8Array(array)], { type: mime });
	return new File([blob], filename, { type: mime, lastModified: new Date() });
}

export function FlatCoordToLonLat(flatCoord) {
	return toLonLat(flatCoord);
}

export function LonLatToFlatCoord(lon, lat) {
	return fromLonLat([lon, lat]);
}

export function getHazardTypePlural(hazardType) {
	if (hazardType.match(/w*(o|s|sh|ch|x|z)\b/)) {
		hazardType = `${hazardType}es`;
	} else {
		hazardType = `${hazardType}s`;
	}
	return hazardType;
}

// get incore space id given space name
// TODO replace with endpoint once it's ready
export async function getSpaceIdByName(
	globalConfig = defaultGlobalConfig,
	name,
) {
	const endpoint = `${globalConfig.spaceServiceBase}spaces`;
	if (name === undefined || name === null) name = globalConfig.testbedSpace;
	const request = await fetch(endpoint, {
		mode: "cors",
		headers: getHeader(globalConfig.hostname),
	});
	if (request.status === 200) {
		const spaces = await request.json();
		return spaces.filter((space) => space["name"] === name)[0]["id"];
	} else if (request.status === 401) {
		// TODO handle error
		return "";
	} else {
		// TODO handle error
		return "";
	}
}

// move resource to space
export async function move2TestbedSpace(
	globalConfig = defaultGlobalConfig,
	resourceId,
) {
	const spaceId = await getSpaceIdByName(globalConfig);
	const endpoint = `${globalConfig.spaceServiceBase}spaces/${spaceId}/members/${resourceId}`;
	const request = await fetch(endpoint, {
		mode: "cors",
		headers: getHeader(globalConfig.hostname),
		method: "POST",
	});
	if (request.status === 200) {
		return await request.json();
	} else if (request.status === 401) {
		// TODO handle error
		return {};
	} else {
		// TODO handle error
		return {};
	}
}

export function parseDateTime(dateString) {
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: timeZone,
	};
	const mydate = new Date(dateString);
	return mydate.toLocaleString("en-US", options);
}

// TODO replace this using keycloak's userInfo endpoint
// get current user's info from jwt token
export function getCurrUserInfo(cookie) {
	if (cookie !== undefined && cookie !== "" && cookie.split(" ").length > 0) {
		try {
			return jwt_decode(cookie.split(" ")[1]);
		} catch (err) {
			console.log(err);
			return {};
		}
	} else {
		return {};
	}
}

export function csvToArray(str, delimiter = ",", includeHeader = true) {
	// slice from start of text to the first \n index
	// use split to create an array from string by delimiter
	const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

	// slice from \n index + 1 to the end of the text
	// use split to create an array of each csv value row
	const rows = str.slice(str.indexOf("\n") + 1).split("\n");
	let rows_arr = [];
	rows.map(function (row) {
		if (row) rows_arr.push(row.split(delimiter));
	});

	// return the array
	if (includeHeader) return [headers, ...rows_arr];
	else return rows_arr;
}

export function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export function descendingComparator(a, b, orderBy) {
	// if (b[orderBy] < a[orderBy]) {
	if (ObjectByString(b, orderBy) < ObjectByString(a, orderBy)) {
		return -1;
	}
	// if (b[orderBy] > a[orderBy]) {
	if (ObjectByString(b, orderBy) > ObjectByString(a, orderBy)) {
		return 1;
	}
	return 0;
}

function ObjectByString(o, s) {
	s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
	s = s.replace(/^\./, ""); // strip a leading dot
	const a = s.split(".");
	for (let i = 0, n = a.length; i < n; ++i) {
		let k = a[i];
		if (o !== null && o !== undefined) {
			if (k in o) {
				o = o[k];
			} else {
				return;
			}
		} else {
			return;
		}
	}
	return o;
}

export const maxStateMapping = (fields, max_state, sw_max_state) => {
	if (fields && "Insignificant" in fields["by_category"][0]) {
		if (max_state === "DS_0") return "Insignificant";
		if (max_state === "DS_1") return "Moderate";
		if (max_state === "DS_2") return "Extensive";
		if (max_state === "DS_3") return "Complete";
	} else if (fields && "Affected" in fields["by_category"][0]) {
		if (max_state === "DS_0" || max_state === "DS_1") return "Affected";
		if (max_state === "DS_2") return "Minor";
		if (max_state === "DS_3") return "Major";
		if (sw_max_state === "DS_3") return "Destroyed";
	}
	return max_state;
};

export const fetchLegendsForLayers = (layers) => {
	const legends = {};

	layers.forEach((layerGrp) => {
		const layersArray = layerGrp.getLayers().getArray();
		const layerGrpTitle = layerGrp.getProperties().title;

		// Check if there are valid layers in group, for example no need for Basemap group
		if (layersArray.length !== 0 && layersArray[0].getSource().params_) {
			legends[layerGrpTitle] = layersArray.reduce((acc, layer) => {
				const layerJSON = layer.getSource().params_;
				if (layerJSON) {
					const legendUrl = `https://incore-dev.ncsa.illinois.edu/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${layerJSON.LAYERS}&STYLE=${layerJSON.STYLES}`;
					acc[layer.get("title")] = { url: legendUrl };
				}
				return acc;
			}, {});
		}
	});
	return legends;
};

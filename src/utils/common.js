import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { globals as defaultGlobalConfig, testUserInfo } from "../globals";
import {
	datawolfConfig as defaultDatawolfConfig,
	datawolfWorkflowConfig as defaultDatawolfWorkflowConfig,
} from "../datawolf.config.js";
import JSSoup from "jssoup";
import { fromLonLat, toLonLat } from "ol/proj";
import { createSvgIcon } from "@material-ui/core";
import React from "react";

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
					const legendUrl = `${defaultGlobalConfig.geoServerWMS}?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${layerJSON.LAYERS}&STYLE=${layerJSON.STYLES}`;
					acc[layer.get("title")] = { url: legendUrl };
				}
				return acc;
			}, {});
		}
	});
	return legends;
};

export const LegendIcon = createSvgIcon(
	<svg
		width="24"
		height="24"
		viewBox="0 0 12 10"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M3.51754 6.0934C3.29748 5.76873 3.14669 5.40965 3.06563 5.01525C3.04254 4.9111 2.96149 4.82959 2.84557 4.82959H0.758543C0.619531 4.82959 0.514925 4.94551 0.53848 5.07321C0.666178 6.11649 1.0719 7.06692 1.68591 7.84347C1.76696 7.94762 1.92952 7.95939 2.02189 7.85524L3.50578 6.37135C3.57552 6.30207 3.5755 6.18622 3.51754 6.0934Z"
			fill="#797979"
		/>
		<path
			d="M0.755696 4.01785H2.85408C2.95823 4.01785 3.05106 3.9368 3.07415 3.8322C3.1552 3.43825 3.30599 3.07871 3.52605 2.75404C3.58401 2.66122 3.58401 2.54529 3.50296 2.46424L2.00782 0.980812C1.91499 0.887985 1.75289 0.887985 1.67183 0.992585C1.05736 1.76916 0.651643 2.71956 0.524409 3.76285C0.512183 3.90186 0.616784 4.01778 0.755798 4.01778L0.755696 4.01785Z"
			fill="#797979"
		/>
		<path
			d="M11.3035 4.82959H9.2051C9.10095 4.82959 9.00813 4.91064 8.98504 5.01525C8.90398 5.40919 8.75319 5.76873 8.53313 6.0934C8.47517 6.18623 8.47517 6.30215 8.55623 6.3832L10.0401 7.86709C10.1329 7.95992 10.2951 7.95992 10.3761 7.85532C10.9906 7.07875 11.3963 6.12834 11.5235 5.08506C11.5471 4.9456 11.4425 4.82959 11.3035 4.82959Z"
			fill="#797979"
		/>
		<path
			d="M5.43913 7.37957C5.04519 7.29851 4.68565 7.14773 4.36098 6.92766C4.26815 6.8697 4.15223 6.8697 4.07118 6.95076L2.58775 8.44636C2.49492 8.53919 2.49492 8.70129 2.59952 8.78234C3.37609 9.39681 4.3265 9.80253 5.36978 9.92977C5.49748 9.94154 5.6134 9.83694 5.6134 9.70971L5.61295 7.60007C5.62472 7.49547 5.54373 7.40311 5.43913 7.37957Z"
			fill="#797979"
		/>
		<path
			d="M8.98537 3.83288C9.00847 3.93703 9.08952 4.01854 9.20544 4.01854H11.3038C11.4428 4.01854 11.5474 3.90262 11.5239 3.77492C11.3962 2.73164 10.9905 1.78121 10.3765 1.00466C10.2954 0.900509 10.1328 0.888736 10.0405 0.992883L8.56794 2.46495C8.48689 2.54601 8.48689 2.66193 8.54485 2.75476C8.7536 3.06765 8.91564 3.43847 8.98537 3.83288Z"
			fill="#797979"
		/>
		<path
			d="M7.9872 6.96248C7.90615 6.88142 7.79023 6.88142 7.6974 6.93938C7.37273 7.15945 7.01366 7.31023 6.61925 7.39129C6.5151 7.41438 6.43359 7.49543 6.43359 7.61135V9.70974C6.43359 9.84875 6.54951 9.95335 6.67721 9.9298C7.72049 9.8021 8.67092 9.39638 9.44747 8.78237C9.55162 8.70132 9.56339 8.53876 9.45925 8.44639L7.9872 6.96248Z"
			fill="#797979"
		/>
		<path
			d="M7.52553 4.43517C7.52553 3.77451 6.64435 2.26757 6.3781 1.81514C6.30837 1.68744 6.16935 1.61816 6.03034 1.61816C5.89133 1.61816 5.75232 1.6879 5.68258 1.81514C5.41587 2.26704 4.53516 3.77396 4.53516 4.43517C4.53516 5.25838 5.20759 5.9303 6.0303 5.9303C6.85351 5.9303 7.52553 5.26965 7.52553 4.43517ZM5.84468 3.7976C5.83291 3.8207 5.47383 4.41207 5.74054 4.80602C5.7754 4.86398 5.78672 4.92194 5.7754 4.9799C5.76363 5.03786 5.72922 5.09582 5.67126 5.13069C5.63639 5.15378 5.5902 5.17687 5.54356 5.17687C5.4625 5.17687 5.39277 5.14201 5.34659 5.07273C4.906 4.41207 5.42764 3.57759 5.45073 3.5427C5.4856 3.48473 5.54356 3.44987 5.60152 3.43855C5.65948 3.42678 5.72922 3.43855 5.78718 3.47341C5.87956 3.53092 5.91442 3.68168 5.84468 3.7976Z"
			fill="#797979"
		/>
	</svg>,
);

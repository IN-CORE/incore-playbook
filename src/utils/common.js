import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import appConfig from "../globals";
import JSSoup from "jssoup";
import {toLonLat} from "ol/proj";

const cookies = new Cookies();


//NOTE: This is only checking if a cookie is present, but not validating the cookie.
export const isAuthorized = () => {
	const authorization = cookies.get("Authorization");
	return process.env.DEPLOY_ENV === "local" ||
			(authorization !== undefined && authorization !== "" && authorization !==
					null);
};

// construct header
export function getHeader() {
	if (process.env.DEPLOY_ENV === "local"){
		const headers = new Headers({
			"x-auth-userinfo": `{"preferred_username":"${appConfig.testUserInfo}"}`,
		});

		return headers;
	}
	else{
		const headers = new Headers({
			"Authorization": cookies.get("Authorization"),
		});

		return headers;
	}
}

// get current username
export function getCurrUsername(){
	if (process.env.DEPLOY_ENV === "local"){
		return appConfig.testUserInfo;
	}
	else{
		let cookie = cookies.get("Authorization");
		if (cookie !== "" && cookie.split(" ").length > 0){
			let userInfo = jwt_decode(cookie.split(" ")[1]);
			return userInfo["preferred_username"];
		}
	}
}

// get incore token and write to a file
export function getIncoreTokenFile(){
	if (process.env.DEPLOY_ENV !== "local"){
		return new Blob([cookies.get("Authorization")], {type:"text/plain"});
	}
	else{
		return null;
	}
}

// get current user's encoded email address for datawolf use
export function getCurrUserEmail(){
	if (process.env.DEPLOY_ENV === "local"){
		return appConfig.testUserInfo;
	}
	else{
		let cookie = cookies.get("Authorization");
		if (cookie !== "" && cookie.split(" ").length > 0){
			let userInfo = jwt_decode(cookie.split(" ")[1]);
			// return userInfo["email"];
			return userInfo["preferred_username"];
		}
	}
}

export function getShortHTML(html){
	let htmlSoup = new JSSoup(html);
	return htmlSoup.find("div", "shortDescription");
}

export function round(val, n){
	if (n === undefined || n === 0) {
		return Math.round(val);
	}
	else {
		return +(Math.round(val + `e+${n}`)  + `e-${n}`);
	}
}

export function formatPercent(val, n = 1){
	return `${round(val, n)  }%`;
}

export function formatProbToPercent(val, n = 1){
	return formatPercent(val*100, n);
}

export function exportJson(json, file_name) {
	let formattedJson = JSON.stringify(json, null, 4);
	let blob = new Blob([formattedJson], {type: "application/json"});

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

export function dataURItoFile(dataURI, filename="") {
	if (filename === undefined || filename === "" || filename === null) filename = "hurricane-raster.tif";
	let mime = dataURI.split(",")[0].match(/:(.*?);/)[1];
	let binary = atob(dataURI.split(",")[1]);
	let array = [];
	for (let i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	const blob = new Blob([new Uint8Array(array)], {type: mime});
	return new File([blob], filename, {type: mime, lastModified: new Date()});
}


export function FlatCoordToLonLat(flatCoord) {
	let LonLat = toLonLat(flatCoord);
	return LonLat;
}

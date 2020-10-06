let apiprotocol = "https";

let config = {};
let apihost;
let apiurl;

if (process.env.DEPLOY_ENV === "production") {
	apihost = "incore.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServer: "https://incore-geoserver.ncsa.illinois.edu/geoserver/incore/wms",
	};
} else if (process.env.DEPLOY_ENV === "test") {
	apihost = "incore-test-kube.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServer: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/wms",
	};
} else if (process.env.DEPLOY_ENV === "local") {
	apihost = "localhost:8080";
	apiurl = `http://${apihost}`;
	config = {
		geoServer: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/wms",
	};
} else if (process.env.DEPLOY_ENV === "develop") {
	apihost = "incore-dev-kube.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServer: "https://incore-dev-kube.ncsa.illinois.edu/geoserver/incore/wms",
	};
} else { // default case that used dev environment
	apihost = "";
	apiurl = "";
	config = {
		geoServer: "/geoserver/incore/wms",
	};
}
config["dataWolf"] = "https://incore2-datawolf.ncsa.illinois.edu/datawolf/";
config["client_id"] = "react-auth";
config["authService"] = `${apiurl}/auth/realms/In-core/protocol/openid-connect/token`;
config["testUserInfo"] = "incrtest";

export default config;

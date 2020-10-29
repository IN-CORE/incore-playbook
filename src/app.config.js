let apiprotocol = "https";

let config = {};
let apihost;
let apiurl;

if (process.env.DEPLOY_ENV === "production") {
	apihost = "incore.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServerWMS: "https://incore-geoserver.ncsa.illinois.edu/geoserver/incore/wms",
		geoServerWFS: "https://incore-geoserver.ncsa.illinois.edu/geoserver/incore/ows",
	};
} else if (process.env.DEPLOY_ENV === "test") {
	apihost = "incore-test-kube.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServerWMS: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/wms",
		geoServerWFS: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/ows",
	};
} else if (process.env.DEPLOY_ENV === "local") {
	apihost = "localhost:8080";
	apiurl = `http://${apihost}`;
	config = {
		geoServerWMS: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/wms",
		geoServerWFS: "https://incore-test-kube.ncsa.illinois.edu/geoserver/incore/ows",
	};
} else if (process.env.DEPLOY_ENV === "develop") {
	apihost = "incore-dev-kube.ncsa.illinois.edu";
	apiurl = `${apiprotocol}://${apihost}`;
	config = {
		geoServerWMS: "https://incore-dev-kube.ncsa.illinois.edu/geoserver/incore/wms",
		geoServerWFS: "https://incore-dev-kube.ncsa.illinois.edu/geoserver/incore/ows",
	};
} else { // default case that used dev environment
	apihost = "";
	apiurl = "";
	config = {
		geoServerWMS: "/geoserver/incore/wms",
		geoServerWFS: "https://incore-geoserver.ncsa.illinois.edu/geoserver/incore/ows",
	};
}
config["dataWolf"] = "https://incore2-datawolf.ncsa.illinois.edu/datawolf/";
config["client_id"] = "react-auth";
config["authService"] = `${apiurl}/auth/realms/In-core/protocol/openid-connect/token`;
config["testUserInfo"] = "incrtest";

config["ARCHETYPE"] = {
	"1":"Wood Residential Building - small rectangular plan, garble roof, 1 story",
	"2":"Wood Residential Building - small rectangular plan, garble roof, 2 story",
	"3":"Wood Residential Building - medium rectangular plan, hip roof, 2 story",
	"4":"Wood Residential Building - medium rectangular plan, garble roof, 2 story",
	"5":"Wood Residential Building - large rectangular plan, garble roof, 2 story",
	"6":"Business and Retail Building",
	"7":"Light Industrial Building",
	"8":"Heavy Industrial Building",
	"9":"Elementary/Middle School",
	"10":"High School",
	"11":"Fire-police station",
	"12":"Hospital",
	"13":"Community Center/Church",
	"14":"Government Building",
	"15":"Large big-box",
	"16":"Small big-box",
	"17":"Mobile Home",
	"18":"Shopping Center",
	"19":"Office Building"
};

config["dataServiceBase"] = `${apiurl}/data/api/`;

export default config;

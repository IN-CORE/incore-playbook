import * as React from "react";
import {Introduction} from "./components/Introduction";
import {TeamLeader} from "./components/TeamLeader";
import {StepTmpInfo} from "./components/StepTmpInfo";
import {BuiltEnvironment} from "./components/BuiltEnvironment";
import {CommunityHazards} from "./components/CommunityHazards";
import {AnticipatedPerformance} from "./components/AnticipatedPerformance";
import Login from "./containers/Login";


const routes = {
	"/": {
		exact: true,
		component: () => {
			sessionStorage.setItem("menu", "0");
			return (<Introduction menu={"0"}/>);
		}
	},
	"/login": {
		exact: false,
		component: Login
	},
	"/create-team": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1");
			return (<Introduction menu={"1"}/>);
		}
	},
	"/create-team-leader": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1-1");
			return (<TeamLeader/>);
		}
	},
	"/create-team-member": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1-2");
			return (<StepTmpInfo menu={"1-2"}/>);
		}
	},
	"/create-team-scope": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1-3");
			return (<StepTmpInfo menu={"1-3"}/>);
		}
	},
	"/create-team-stakeholder": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1-4");
			return (<StepTmpInfo menu={"1-4"}/>);
		}
	},
	"/community": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2");
			return (<Introduction menu={"2"}/>);
		}
	},
	"/community-plan": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-1");
			return (<StepTmpInfo menu={"2-1"}/>);
		}
	},
	"/community-member": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-2");
			return (<StepTmpInfo menu={"2-2"}/>);
		}
	},
	"/community-function": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-3");
			return (<StepTmpInfo menu={"2-3"}/>);
		}
	},
	"/community-environment": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-4");
			return (<BuiltEnvironment/>);
		}
	},
	"/community-link": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-5");
			return (<StepTmpInfo menu={"2-5"}/>);
		}
	},
	"/goal-objective": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3");
			return (<Introduction menu={"3"}/>);
		}
	},
	"/goal-objective-long": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-1");
			return (<StepTmpInfo menu={"3-1"}/>);
		}
	},
	"/goal-objective-desired": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-2");
			return (<StepTmpInfo menu={"3-2"}/>);
		}
	},
	"/goal-objective-hazard": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-3");
			return (<CommunityHazards/>);
		}
	},
	"/goal-objective-performance": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-4");
			return (<AnticipatedPerformance/>);
		}
	},
	"/goal-objective-result": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-5");
			return (<StepTmpInfo menu={"3-5"}/>);
		}
	},
	"/plan-development": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "4");
			return (<Introduction menu={"4"}/>);
		}
	},
	"/plan-development-gap": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "4-1");
			return (<StepTmpInfo menu={"4-1"}/>);
		}
	},
	"/plan-development-solution": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "4-2");
			return (<StepTmpInfo menu={"4-2"}/>);
		}
	},
	"/plan-development-strategy": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "4-3");
			return (<StepTmpInfo menu={"4-3"}/>);
		}
	},
	"/review": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "5");
			return (<Introduction menu={"5"}/>);
		}
	},
	"/review-strategy": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "5-1");
			return (<StepTmpInfo menu={"5-1"}/>);
		}
	},
	"/review-approval": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "5-2");
			return (<StepTmpInfo menu={"5-2"}/>);
		}
	},
	"/review-final": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "5-3");
			return (<StepTmpInfo menu={"5-3"}/>);
		}
	},
	"/implementation": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "6");
			return (<Introduction menu={"6"}/>);
		}
	},
	"/implementation-execute": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "6-1");
			return (<StepTmpInfo menu={"6-1"}/>);
		}
	},
	"/implementation-update": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "6-2");
			return (<StepTmpInfo menu={"6-2"}/>);
		}
	},
	"/implementation-modify": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "6-3");
			return (<StepTmpInfo menu={"6-3"}/>);
		}
	},
};

export default routes;

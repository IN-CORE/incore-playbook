import * as React from "react";
import { MainStep } from "./components/MainStep";
import { TeamLeader } from "./components/TeamLeader";
import { StaticSubStep } from "./components/StaticSubStep";
import { BuiltEnvironment } from "./components/BuiltEnvironment";
import { CommunityHazards } from "./components/CommunityHazards";
import { AnticipatedPerformance } from "./components/AnticipatedPerformance";
import { Login } from "./components/Login";
import TeamMember from "./components/TeamMember";
import { CompareAnalyses } from "./components/CompareAnalyses";
import { ZoneSelectionMapDialog } from "./components/childComponents/map/ZoneSelectionMapDialog";

const routes = {
	"/": {
		exact: true,
		component: () => {
			sessionStorage.setItem("menu", "0");
			return <MainStep menu={"0"} />;
		},
	},
	"/login": {
		exact: true,
		component: () => {
			return <Login />;
		},
	},
	"/create-team": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1");
			return <MainStep menu={"1"} />;
		},
	},
	"/create-team-leader": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1-1");
			return <TeamLeader step={1} substep={1} />;
		},
	},
	"/create-team-member": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1-2");
			return <TeamMember step={1} substep={2} />;
		},
	},
	"/create-team-scope": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1-3");
			return <StaticSubStep menu={"1-3"} step={1} substep={3} />;
		},
	},
	"/create-team-stakeholder": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "1-4");
			return <StaticSubStep menu={"1-4"} step={1} substep={4} />;
		},
	},
	"/community": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2");
			return <MainStep menu={"2"} />;
		},
	},
	"/community-plan": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-1");
			return <StaticSubStep menu={"2-1"} step={2} substep={1} />;
		},
	},
	"/community-member": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-2");
			return <StaticSubStep menu={"2-2"} step={2} substep={2} />;
		},
	},
	"/community-function": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-3");
			return <StaticSubStep menu={"2-3"} step={2} substep={3} />;
		},
	},
	"/community-environment": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-4");
			return <BuiltEnvironment step={2} substep={4} />;
		},
	},
	"/community-link": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "2-5");
			return <StaticSubStep menu={"2-5"} step={2} substep={5} />;
		},
	},
	"/goal-objective": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3");
			return <MainStep menu={"3"} />;
		},
	},
	"/goal-objective-long": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-1");
			return <StaticSubStep menu={"3-1"} step={3} substep={1} />;
		},
	},
	"/goal-objective-desired": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-2");
			return <StaticSubStep menu={"3-2"} step={3} substep={2} />;
		},
	},
	"/goal-objective-hazard": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-3");
			return <CommunityHazards step={3} substep={3} />;
		},
	},
	"/goal-objective-performance": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-4");
			return <AnticipatedPerformance step={3} substep={4} />;
		},
	},
	"/compare-analyses": {
		exact: false,
		component: () => {
			return <CompareAnalyses />;
		},
	},
	"/goal-objective-result": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "3-5");
			return <StaticSubStep menu={"3-5"} step={3} substep={5} />;
		},
	},
	"/plan-development": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "4");
			return <MainStep menu={"4"} />;
		},
	},
	"/plan-development-gap": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "4-1");
			return <StaticSubStep menu={"4-1"} step={4} substep={1} />;
		},
	},
	"/plan-development-solution": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "4-2");
			return <StaticSubStep menu={"4-2"} step={4} substep={2} />;
		},
	},
	"/plan-development-strategy": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "4-3");
			return <StaticSubStep menu={"4-3"} step={4} substep={3} />;
		},
	},
	"/review": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "5");
			return <MainStep menu={"5"} />;
		},
	},
	"/review-strategy": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "5-1");
			return <StaticSubStep menu={"5-1"} step={5} substep={1} />;
		},
	},
	"/review-approval": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "5-2");
			return <StaticSubStep menu={"5-2"} step={5} substep={2} />;
		},
	},
	"/review-final": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "5-3");
			return <StaticSubStep menu={"5-3"} step={5} substep={3} />;
		},
	},
	"/implementation": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "6");
			return <MainStep menu={"6"} />;
		},
	},
	"/implementation-execute": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "6-1");
			return <StaticSubStep menu={"6-1"} step={6} substep={1} />;
		},
	},
	"/implementation-update": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "6-2");
			return <StaticSubStep menu={"6-2"} step={6} substep={2} />;
		},
	},
	"/implementation-modify": {
		exact: false,
		component: () => {
			sessionStorage.setItem("menu", "6-3");
			return <StaticSubStep menu={"6-3"} step={6} substep={3} />;
		},
	},
	"/test-zone-selection": {
		exact: false,
		component: () => {
			return <ZoneSelectionMapDialog open={true} />;
		},
	},
};

export default routes;

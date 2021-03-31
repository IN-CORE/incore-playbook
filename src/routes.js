import React from "react";
import {Route, Switch} from "react-router-dom";

import Introduction from "./containers/Introduction";
import Team from "./containers/Team";
import TeamLeader from "./containers/TeamLeader";
import AnticipatedPerformance from "./containers/AnticipatedPerformance";
import CommunityHazards from "./containers/CommunityHazards";
import BuiltEnvironment from "./containers/BuiltEnvironment";
import Login from "./containers/Login";
import {NotFound} from "./containers/NotFound";


export default (
	<Switch>
		<Route exact path="/" render={() => {
			sessionStorage.setItem("menu", "0-0");
			return (<Introduction menu={"0"}/>);
		}}/>
		<Route path="/create-team" render={() => {
			sessionStorage.setItem("menu", "1-0");
			return (<Introduction menu={"1"}/>);
		}}/>
		<Route path="/create-team-leader" render={() => {
			sessionStorage.setItem("menu", "1-1");
			return (<TeamLeader/>);
		}}/>
		<Route path="/built-environment" render={() => {
			sessionStorage.setItem("menu", "2-0");
			return (<Introduction menu={"2"}/>);
		}}/>
		<Route path="/set-built-environment" render={() => {
			sessionStorage.setItem("menu", "2-4");
			return (<BuiltEnvironment/>);
		}}/>
		<Route path="/goals-objective" render={() => {
			sessionStorage.setItem("menu", "3-0");
			return (<Introduction menu={"3"}/>);
		}}/>
		<Route path="/define-community-hazards" render={() => {
			sessionStorage.setItem("menu", "3-3");
			return (<CommunityHazards/>);
		}}/>
		<Route path="/determine-anticipated-performance" render={() => {
			sessionStorage.setItem("menu", "3-4");
			return (<AnticipatedPerformance/>);
		}}/>
		<Route path="/plan-development" render={() => {
			sessionStorage.setItem("menu", "4-0");
			return (<Introduction menu={"4"}/>);
		}}/>
		<Route path="/review-approval" render={() => {
			sessionStorage.setItem("menu", "5-0");
			return (<Introduction menu={"5"}/>);
		}}/>
		<Route path="/implementation" render={() => {
			sessionStorage.setItem("menu", "6-0");
			return (<Introduction menu={"6"}/>);
		}}/>
		<Route path="/login" component={Login} />
		<Route path="*" component={NotFound}/>
	</Switch>
);

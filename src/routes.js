import React from "react";
import {Route, Switch} from "react-router-dom";

import Team from "./containers/Team";
import AnticipatedPerformance from "./containers/AnticipatedPerformance";
import CommunityHazards from "./containers/CommunityHazards";
import BuiltEnvironment from "./containers/BuiltEnvironment";
import Login from "./containers/Login";
import {NotFound} from "./containers/NotFound";


export default (
	<Switch>
		<Route exact path="/" render={() => {
			sessionStorage.setItem("menu", "1-1");
			return (<Team/>);
			// return (<HomePage/>);
		}}/>
		<Route path="/set-built-environment" render={() => {
			sessionStorage.setItem("menu", "2-4");
			return (<BuiltEnvironment/>);
		}}/>
		<Route path="/define-community-hazards" render={() => {
			sessionStorage.setItem("menu", "3-3");
			return (<CommunityHazards/>);
		}}/>
		<Route path="/determine-anticipated-performance" render={() => {
			sessionStorage.setItem("menu", "3-4");
			return (<AnticipatedPerformance/>);
		}}/>
		<Route path="/create-team" render={() => {
			sessionStorage.setItem("menu", "1-1");
			return (<Team/>);
		}}/>
		<Route path="/login" component={Login} />
		<Route path="*" component={NotFound}/>
	</Switch>
);


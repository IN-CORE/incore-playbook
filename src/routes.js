import React from "react";
import {Route, Switch} from "react-router-dom";

import Team from "./containers/Team";
import AnticipatedPerformance from "./containers/AnticipatedPerformance";
import CommunityHazards from "./containers/CommunityHazards";
import BuiltEnvironment from "./containers/BuiltEnvironment";
import Login from "./containers/Login";
import {HomePage} from "./containers/HomePage";
import {NotFound} from "./containers/NotFound";



export default (
	<Switch>
		<Route exact path="/" component={HomePage}/>
		<Route path="/determine-anticipated-performance" component={AnticipatedPerformance}/>
		<Route path="/define-community-hazards" component={CommunityHazards}/>
		<Route path="/set-built-environment" component={BuiltEnvironment}/>
		<Route path="/create-team" component={Team}/>
		<Route path="/login" component={Login} />
		<Route path="*" component={NotFound}/>
	</Switch>
);


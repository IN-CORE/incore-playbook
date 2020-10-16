import React from "react";
import {Route, Switch} from "react-router-dom";

import AnticipatedPerformance from "./containers/AnticipatedPerformance";
import {Login} from "./containers/Login";
import {HomePage} from "./containers/HomePage";
import {NotFound} from "./containers/NotFound";


export default (
	<Switch>
		<Route exact path="/" component={HomePage}/>
		<Route path="/determine-anticipated-performance" component={AnticipatedPerformance}/>
		<Route path="/login" component={Login} />
		<Route path="*" component={NotFound}/>
	</Switch>
);


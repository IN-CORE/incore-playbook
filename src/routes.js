import React from "react";
import {Route} from "react-router";

import AnticipatedPerformance from "./containers/AnticipatedPerformance";
import {Login} from "./containers/Login";
import {HomePage} from "./containers/HomePage";


export default (
		<div>
			<Route path="/" component={HomePage}/>
			<Route path="determine-anticipated-performance" component={AnticipatedPerformance}/>
			<Route path="login" component={Login} />
			{/*<Route path="*" component={RouteMismatch}/>*/} //TODO: Enable this
		</div>
);


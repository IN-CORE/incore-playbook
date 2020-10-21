import React from "react";
import {Link} from "react-router-dom";
import {processStatus} from "../globals";
import StepStatus from "../components/StepStatus";
import Layout from "./Layout";


export class HomePage extends React.Component {
	render() {
		let activeKey = "inprogress";
		return(
			<div>
				<Layout>
					This is the home page  - to be replaced <br/>

					<Link to="/login">
						Login
					</Link>
					<br/>
					<Link to="/determine-anticipated-performance">
						Results
					</Link>

					<StepStatus status={activeKey} />
				</Layout>
			</div>

		);
	}
}

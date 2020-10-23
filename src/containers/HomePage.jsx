import React from "react";
import {Link} from "react-router-dom";
import {processStatus} from "../globals";
import {stepInfo} from "../app.messages";
import StepStatus from "../components/StepStatus";
import StepDescription from "../components/StepDescription";
import Layout from "./Layout";


export class HomePage extends React.Component {
	render() {
		let activeKey = "inprogress";

		return(
			<div>
				<Layout>
					<div>
						This is the home page  - to be replaced <br/>

						<Link to="/login">
							Login
						</Link>
						<br />
						<Link to="/determine-anticipated-performance">
							Results
						</Link>

						<StepStatus statusOptions= {processStatus} status={activeKey} />
						<br />
						<StepDescription stepInfo={stepInfo[0]} />
					</div>


				</Layout>
			</div>
		);
	}
}

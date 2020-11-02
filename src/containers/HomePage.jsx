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
						<Dropdown>
							<Dropdown.Toggle variant="success" id="dropdown-basic">
						Dropdown Button
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Link to="/login">
							Login
						</Link>
						<br />
						<Link to="/determine-anticipated-performance">
							Results
						</Link>

						<StepStatus />
						<br />
						<StepDescription stepInfo={stepInfo[0]} />
					</div>


				</Layout>
			</div>
		);
	}
}

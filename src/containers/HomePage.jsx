import React from "react";
import {Link} from "react-router-dom";
import Layout from "./Layout";

export class HomePage extends React.Component {
	render() {
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
				</Layout>
			</div>

		);
	}
}

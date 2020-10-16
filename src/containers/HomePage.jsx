import * as React from "react";
import {Link} from "react-router-dom";

export class HomePage extends React.Component {
	render() {
		return(
			<div>
				This is the home page  - to be deleted and replaced with App<br/>

				<Link to="/login">
					Login
				</Link>
				<br/>

				<Link to="/determine-anticipated-performance">
					Results
				</Link>
			</div>
		);
	}
}

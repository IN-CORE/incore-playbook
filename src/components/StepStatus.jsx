import * as React from "react";
import {withStyles} from "@material-ui/core";
import {processStatus} from "../globals";
import "../styles/step-status.css";

const styles = {

};


class StepStatus extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		return (
			<div>
				<div className={"stepStatus"}>
					Step Status
				</div>
				<div className={"statusBox"}>
					<div className={`statusInfo ${this.props.status === "pending" ? "active": ""}`}>
						<div style={{paddingTop:2}}>{processStatus[0].name}</div>
					</div>
					<div className={`statusInfo ${this.props.status === "inprogress" ? "active": ""}`}>
						<div style={{paddingTop:2}}>{processStatus[1].name}</div>
					</div>
					<div className={`statusInfo ${this.props.status === "complete" ? "active": ""}`}>
						<div style={{paddingTop:2}}>{processStatus[2].name}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(StepStatus);

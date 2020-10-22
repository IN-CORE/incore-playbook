import * as React from "react";
import {withStyles} from "@material-ui/core";
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
		const processStatus = this.props.statusOptions;

		return (
			<div>
				<div className={"stepStatus"}>
					Step Status
				</div>
				<div className={"statusBox"}>
					{processStatus.map((status, index) => (
						<div  key={index} className={`statusInfo ${this.props.status === status.key ? "active": ""}`}>
							<div style={{paddingTop:2}}>{status.name}</div>
						</div>))}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(StepStatus);

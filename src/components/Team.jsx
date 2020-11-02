import * as React from "react";
import {
	Box,
	Grid,
} from "@material-ui/core";
import UserInfo from "./UserInfo";
import StepStatus from "./StepStatus";
import StepDescription from "./StepDescription";
import PageBanner from "./Banner";
import Layout from "../containers/Layout";
import {stepInfo} from "../app.messages";
import {processStatus} from "../globals";


class Team extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeKey: "inprogress"
		};

		this.handleStepStatusChange = this.handleStepStatusChange.bind(this);
	}

	componentDidMount() {
		this.props.getPlaybookUserList();
	}

	handleStepStatusChange(state){
		this.setState({
			activeKey: state
		});
	}

	render() {
		return (
			<Layout>
				<div className="firstDivInContent">
					<PageBanner parentStep="Form a Collaborative Planning Team"
						childStep="Identify a Resilience Leader for the Community" taskNo="1" subtaskNo="1-1"/>
					<Box className="outerBox">
						<Grid container spacing={3} className="innerBox">
							<Grid item className="gridItem">
								<UserInfo userList={this.props.userList} handleStepStatusChange={this.handleStepStatusChange}/>
							</Grid>
							<Grid item className="gridItem">
								<StepStatus statusOptions={processStatus} status={this.state.activeKey} />
								<StepDescription stepInfo={stepInfo[0]} />
							</Grid>
						</Grid>
					</Box>
				</div>
			</Layout>
		);
	}
}

export default Team;

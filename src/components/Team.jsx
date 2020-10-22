import * as React from "react";
import {
	Box,
	Grid,
} from "@material-ui/core";
import UserInfo from "./UserInfo";
import StepStatus from "./StepStatus";
import PageBanner from "./Banner";
import Layout from "../containers/Layout";


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
				<PageBanner parentStep="Form a Collaborative Planning Team"
					childStep="Identify a Resilience Leader for the Community"/>
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<Grid item className="gridItem">
							<UserInfo userList={this.props.userList} handleStepStatusChange={this.handleStepStatusChange}/>
						</Grid>
						<Grid item className="gridItem">
							<StepStatus status={this.state.activeKey} />
						</Grid>
					</Grid>
				</Box>
			</Layout>
		);
	}
}

export default Team;

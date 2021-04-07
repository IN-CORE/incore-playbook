import * as React from "react";
import {
	Box,
	Grid,
} from "@material-ui/core";
import UserInfo from "./UserInfo";
import StepStatus from "./StepStatus";
import PageBanner from "./Banner";
import Layout from "../containers/Layout";
import StepInfo from "./StepInfo";
import fullHtml from "../public/steps/1-1.html";


class Team extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
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
							<Grid item xl={5} lg={5} md={5} sm={5} xs={12} className="gridItem">
								<UserInfo userList={this.props.userList} handleStepStatusChange={this.handleStepStatusChange}/>
							</Grid>
							<Grid item xl={7} lg={7} md={7} sm={7} xs={12} className="gridItem">
								<StepStatus />
								<StepInfo fullHtml={fullHtml} />
							</Grid>
						</Grid>
					</Box>
				</div>
			</Layout>
		);
	}
}

export default Team;

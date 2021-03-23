import * as React from "react";
import {
	Box,
	Grid,
	Button,
	Dialog, DialogContent, DialogActions
} from "@material-ui/core";
import UserInfo from "./UserInfo";
import StepStatus from "./StepStatus";
import StepDescription from "./StepDescription";
import PageBanner from "./Banner";
import Layout from "../containers/Layout";
import {stepInfo} from "../app.messages";
import JSSoup from "jssoup";
import html11 from "../public/steps/1-2.html"; // Change to 1-1, 1-2 or 6-2 for testing


class Team extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};

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
		let htmlSoup = new JSSoup(html11);
		let short = htmlSoup.find("div", "shortDescription");

		const handleClickOpen = () => {
			this.setState({open: true});
		};

		const handleClose = () => {
			this.setState({open: false});
		};

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
								<StepStatus />
								{/*<StepDescription stepInfo={stepInfo[0]} />*/}

								<div dangerouslySetInnerHTML={{__html: short}} />
								<span style={{color: "#00619D", textDecoration: "underline", cursor: "pointer"}} onClick={handleClickOpen}> Learn More About This Step</span>
								<Dialog open={this.state.open} divider={true} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
									<DialogContent>
										<div dangerouslySetInnerHTML={{__html: html11}} />
									</DialogContent>

									<DialogActions>
										<Button onClick={handleClose} color="primary">
											Close
										</Button>
									</DialogActions>
								</Dialog>


							</Grid>
						</Grid>
					</Box>
				</div>
			</Layout>
		);
	}
}

export default Team;

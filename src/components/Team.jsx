import * as React from "react";
import {
	Box,
	Grid,
} from "@material-ui/core";
import Layout from "../containers/Layout";
import StepInfo from "./StepInfo";
import fullHtml from "../public/steps/1-0.html";


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
					<Box className="outerIntroBox">
						<Grid container spacing={12} className="innerIntroBox">
							<Grid item className="gridIntroItem">
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

import * as React from "react";
import {Box, withStyles, Tabs, Tab, Grid} from "@material-ui/core";
import Layout from "../containers/Layout";

import ViewResult from "./ViewResult";
import RunAnalysis from "./RunAnalysis";
import PageBanner from "./Banner";
import fullHtml from "../public/steps/3-4.html";
import StepInfo from "./StepInfo";


const styles = {};

class AnticipatedPerformance extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currTabIndex: 0,
		};

		this.gotoViewResultTab = this.gotoViewResultTab.bind(this);
	}

	gotoViewResultTab(){
		this.setState({
			currTabIndex: 1
		});
	}

	render() {

		const {classes} = this.props;

		return (
			<Layout>
				<div className="firstDivInContent">
					<PageBanner parentStep="Determine Goals & Objectives"
						childStep="Determine Anticipated Performance" taskNo="3" subtaskNo="3-4"/>
					<Box className="outerBox">
						<StepInfo fullHtml={fullHtml} />
						<br />
						<Grid container spacing={3} className="innerBox">
							<Grid item>
								<Tabs aria-label="determine anticipated performance tabs" value={this.state.currTabIndex} className={classes.tabs}
									  onChange={(e, value) => {this.setState({ currTabIndex: value});}}>
									<Tab label="run analysis" className={classes.tab}/>
									<Tab label="view results" className={classes.tab}/>
								</Tabs>
								<RunAnalysis value={this.state.currTabIndex} index={0}
											 listTornadoes={this.props.listTornadoes}
											 tornadoes={this.props.tornadoes}
											 listDatasets={this.props.listDatasets}
											 buildings={this.props.buildings}
											 epfs={this.props.epfs}
											 getExecutionList={this.props.getExecutionList}
											 gotoViewResultTab={this.gotoViewResultTab}
								/>
								<ViewResult value={this.state.currTabIndex} index={1}
									getExecutionList={this.props.getExecutionList}
									executions={this.props.executions}
								/>

							</Grid>
						</Grid>
					</Box>
				</div>
			</Layout>
		);
	}
}

export default withStyles(styles)(AnticipatedPerformance);

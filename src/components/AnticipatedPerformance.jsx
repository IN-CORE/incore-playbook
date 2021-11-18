import * as React from "react";
import {Box, withStyles, Tabs, Tab, Grid} from "@material-ui/core";
import Layout from "../containers/Layout";

import ViewResult from "./childComponents/ViewResult";
import RunAnalysis from "./childComponents/RunAnalysis";
import PageBanner from "./childComponents/navigation/Banner";


const styles = {
	tab: {
		height: "22px",
		color: "#69707F",
		fontSize: "18px",
		fontWeight: "500",
		letterSpacing: 0,
		lineHeight: "22px",
		textAlign: "center",
		textTransform:"capitalize"
	},
};

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
						<Grid container spacing={3} className="innerBox">
							<Grid item className="gridItem">
								<Tabs TabIndicatorProps={{style: {background: "#00619D"}}}
									aria-label="determine anticipated performance tabs"
									value={this.state.currTabIndex}
									className={classes.tabs}
									  onChange={(e, value) => {this.setState({ currTabIndex: value});}}>
									<Tab label="run analysis" className={classes.tab}
										 style={this.state.currTabIndex === 0? {color: "#00619D"}: {}}/>
									<Tab label="view results" className={classes.tab}
										 style={this.state.currTabIndex === 1? {color: "#00619D"}: {}}/>
								</Tabs>
								<RunAnalysis value={this.state.currTabIndex} index={0}
											 listTornadoes={this.props.listTornadoes}
											 tornadoes={this.props.tornadoes}
											 listDatasets={this.props.listDatasets}
											 buildings={this.props.buildings}
											 epfs={this.props.epfs}
											 interdNetworks={this.props.interdNetworks}
											 sectorShocks={this.props.sectorShocks}
											 huas={this.props.huas}
											 blockGroups={this.props.blockGroups}
											 valueLosses={this.props.valueLosses}
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

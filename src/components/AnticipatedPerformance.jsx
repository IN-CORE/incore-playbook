import * as React from "react";
import {Box, withStyles, Tabs, Tab, Grid} from "@material-ui/core";
import Layout from "../containers/Layout";

import ViewResult from "./ViewResult";


const styles = {};

class AnticipatedPerformance extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currTabIndex: 0,
		};
	}

	componentDidMount() {}

	render() {

		const {classes} = this.props;

		return (
			<Layout>
				<div className="firstDivInContent">
					<Box className="outerBox">
						<Grid container spacing={3} className="innerBox">
							<Grid item>
								<Tabs aria-label="determine anticipated performance tabs" value={this.state.currTabIndex} className={classes.tabs}
									  onChange={(e, value) => {this.setState({ currTabIndex: value});}}>
									<Tab label="view results" className={classes.tab}/>
									<Tab label="run analysis" className={classes.tab}/>
								</Tabs>
								<ViewResult value={this.state.currTabIndex} index={0}
									getExecutionList={this.props.getExecutionList}
									executions={this.props.executions}/>
								{/*<RunAnalysis value={this.state.currTabIndex} index={1} />*/}
							</Grid>
						</Grid>
					</Box>
				</div>
			</Layout>
		);
	}
}

export default withStyles(styles)(AnticipatedPerformance);

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, makeStyles, Tab, Tabs } from "@material-ui/core";
import { Layout } from "./Layout";

import ViewResult from "./childComponents/ViewResult";
import RunAnalysis from "./childComponents/RunAnalysis";
import BreadCrumb from "./childComponents/navigation/BreadCrumb";
import { fetchExecutions } from "../actions/datawolf";
import StepStatus from "./childComponents/step/StepStatus";

const useStyles = makeStyles({
	tab: {
		height: "22px",
		color: "#69707F",
		fontSize: "18px",
		fontWeight: "500",
		letterSpacing: 0,
		lineHeight: "22px",
		textAlign: "center",
		textTransform: "capitalize"
	}
});

export const AnticipatedPerformance = (props) => {
	const {step, substep} = props;

	const classes = useStyles();

	const [currTabIndex, setCurrTabIndex] = useState(0);

	// Redux connect equivalent
	const dispatch = useDispatch();
	const getExecutionList = (datawolfConfig, all) => dispatch(fetchExecutions(datawolfConfig, all));
	const executions = useSelector((state) => state.execution.executions);

	return (
		<Layout>
			<div className="firstDivInContent">
				<Box display="flex" style={{alignItem:"baseline", padding:"1em 0"}}>
					<BreadCrumb
						parentStep="Determine Goals & Objectives"
						childStep="Determine Anticipated Performance"
						taskNo="3"
						subtaskNo="3-4"
					/>
					<StepStatus step={step} substep={substep} />
				</Box>
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<Grid item className="gridItem">
							<Tabs
								TabIndicatorProps={{ style: { background: "#00619D" } }}
								aria-label="determine anticipated performance tabs"
								value={currTabIndex}
								className={classes.tabs}
								onChange={(e, value) => {
									setCurrTabIndex(value);
								}}
							>
								<Tab
									label="run analysis"
									className={classes.tab}
									style={currTabIndex === 0 ? { color: "#00619D" } : {}}
								/>
								<Tab
									label="view results"
									className={classes.tab}
									style={currTabIndex === 1 ? { color: "#00619D" } : {}}
								/>
							</Tabs>
							<RunAnalysis
								value={currTabIndex}
								index={0}
								getExecutionList={getExecutionList}
								gotoViewResultTab={() => {
									setCurrTabIndex(1);
								}}
							/>
							<ViewResult
								value={currTabIndex}
								index={1}
								getExecutionList={getExecutionList}
								executions={executions}
							/>
						</Grid>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
};

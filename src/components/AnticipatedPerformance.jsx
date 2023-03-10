import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, makeStyles, Tab, Tabs } from "@material-ui/core";
import { Layout } from "./Layout";

import ViewResult from "./childComponents/ViewResult";
import RunAnalysis from "./childComponents/RunAnalysis";
import BreadCrumb from "./childComponents/navigation/BreadCrumb";
import { AlertMessage } from "./childComponents/alert/AlertMessage";
import { fetchExecutions } from "../actions/datawolf";
import StepStatusDropdown from "./childComponents/step/StepStatusDropdown";

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
	const { step, substep } = props;

	const classes = useStyles();

	const [currTabIndex, setCurrTabIndex] = useState(0);
	const [errorAlertOpen, setErrorAlertOpen] = useState(false);
	const [errorStatus, setErrorStatus] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	// Redux connect equivalent
	const dispatch = useDispatch();
	const getExecutionList = (datawolfConfig, all) => dispatch(fetchExecutions(datawolfConfig, all));
	const executions = useSelector((state) => state.execution.executions);

	return (
		<Layout>
			<div className="firstDivInContent">
				<Box display="flex" style={{alignItem:"center", padding:"1em 0"}} sx={{ justifyContent: "space-between" }}>
					<Box>
						<BreadCrumb
							parentStep="Determine Goals & Objectives"
							childStep="Determine Anticipated Performance"
							taskNo="3"
							subtaskNo="3-4"
						/>
					</Box>
					<Box style={{marginRight:"2em"}}>
						<StepStatusDropdown step={step} substep={substep} style={{marginLeft:"auto"}}/>
					</Box>
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
								gotoViewResultTab={() => {
									setCurrTabIndex(1);
								}}
								setErrorAlertOpen={setErrorAlertOpen}
								setErrorStatus={setErrorStatus}
								setErrorMessage={setErrorMessage}
							/>
							<ViewResult
								value={currTabIndex}
								index={1}
								getExecutionList={getExecutionList}
								executions={executions}
							/>
							<AlertMessage
								open={errorAlertOpen}
								setOpen={setErrorAlertOpen}
								message={errorMessage}
								alertSeverity={"error"}
								status={errorStatus}
							/>
						</Grid>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
};

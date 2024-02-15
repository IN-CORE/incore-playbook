import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { Layout } from "./Layout";

import { AlertMessage } from "./childComponents/alert/AlertMessage";
import { IncoreTitle } from "./styledComponents/IncoreTitle";
import { getExecution } from "../utils/datawolf";
import { useSearchParams } from "react-router-dom";

export const CompareAnalyses = () => {

	const [searchParams] = useSearchParams();
	const executionIds = searchParams.getAll("executionId");

	const [errorAlertOpen, setErrorAlertOpen] = useState(false);
	const [errorStatus, setErrorStatus] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	// Redux connect equivalent
	useEffect(() => {
		if (executionIds && executionIds.length > 0) {
			let executionsCompared = [];
			executionIds.map(async (executionId) => {
				executionsCompared.push[await getExecution(executionId)];
			});
		}
	}, []);

	return (
		<Layout>
			<div className="firstDivInContent">
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<IncoreTitle>Compare Analyses A: and B:</IncoreTitle>
						<AlertMessage
							open={errorAlertOpen}
							setOpen={setErrorAlertOpen}
							message={errorMessage}
							alertSeverity={"error"}
							status={errorStatus}
						/>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
};

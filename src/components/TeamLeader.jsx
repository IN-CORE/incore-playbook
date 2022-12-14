import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { UserInfo } from "./childComponents/user/UserInfo";
import StepStatus from "./childComponents/step/StepStatus";
import PageBanner from "./childComponents/navigation/Banner";
import { Layout } from "./Layout";
import StepInfo from "./StepInfo";
import fullHtml from "../public/steps/1-1.html";

export const TeamLeader = ({ step, substep }) => {
	return (
		<Layout>
			<div className="firstDivInContent">
				<PageBanner
					parentStep="Form a Collaborative Planning Team"
					childStep="Identify a Resilience Leader for the Community"
					taskNo="1"
					subtaskNo="1-1"
				/>
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<Grid item xl={5} lg={5} md={5} sm={5} xs={12} className="gridItem">
							<UserInfo />
						</Grid>
						<Grid item xl={7} lg={7} md={7} sm={7} xs={12} className="gridItem">
							<StepStatus step={step} substep={substep} />
							<StepInfo fullHtml={fullHtml} />
						</Grid>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
};

export default TeamLeader;

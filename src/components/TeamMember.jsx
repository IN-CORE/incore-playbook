import React from "react";
import { Box, Grid } from "@material-ui/core";
import { UserInfo } from "./childComponents/user/UserInfo";
import StepStatusDropdown from "./childComponents/step/StepStatusDropdown";
import BreadCrumb from "./childComponents/navigation/BreadCrumb";
import { Layout } from "./Layout";
import StepInfo from "./StepInfo";
import fullHtml from "../public/steps/1-2.html";

export const TeamMember = ({ step, substep }) => {
	return (
		<Layout>
			<div className="firstDivInContent">
				<Box
					display="flex"
					style={{ alignItem: "center", padding: "1em 0" }}
					sx={{ justifyContent: "space-between" }}
				>
					<Box>
						<BreadCrumb
							parentStep="Form a Collaborative Planning Team"
							childStep="Identify collaborative planning team members"
							taskNo="1"
							subtaskNo="1-2"
						/>
					</Box>
					<Box style={{ marginRight: "2em" }}>
						<StepStatusDropdown
							step={step}
							substep={substep}
							style={{ marginLeft: "auto" }}
						/>
					</Box>
				</Box>
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<Grid
							item
							xl={8}
							lg={8}
							md={8}
							sm={12}
							xs={12}
							className="gridItem"
						>
							<UserInfo editable={false} />
						</Grid>
						<Grid
							item
							xl={5}
							lg={4}
							md={4}
							sm={12}
							xs={12}
							className="gridItem"
						>
							<StepInfo fullHtml={fullHtml} />
						</Grid>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
};

export default TeamMember;

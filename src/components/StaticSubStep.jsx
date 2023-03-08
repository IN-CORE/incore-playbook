import React from "react";
import { Box, Grid } from "@material-ui/core";
import BreadCrumb from "./childComponents/navigation/BreadCrumb";
import { Layout } from "./Layout";
import StepInfo from "./StepInfo";
import StepStatusDropdown from "./childComponents/step/StepStatusDropdown";
import fullHtml00 from "../public/steps/0-0.html";
import fullHtml12 from "../public/steps/1-2.html";
import fullHtml13 from "../public/steps/1-3.html";
import fullHtml14 from "../public/steps/1-4.html";
import fullHtml21 from "../public/steps/2-1.html";
import fullHtml22 from "../public/steps/2-2.html";
import fullHtml23 from "../public/steps/2-3.html";
import fullHtml25 from "../public/steps/2-5.html";
import fullHtml31 from "../public/steps/3-1.html";
import fullHtml32 from "../public/steps/3-2.html";
import fullHtml35 from "../public/steps/3-5.html";
import fullHtml41 from "../public/steps/4-1.html";
import fullHtml42 from "../public/steps/4-2.html";
import fullHtml43 from "../public/steps/4-3.html";
import fullHtml51 from "../public/steps/5-1.html";
import fullHtml52 from "../public/steps/5-2.html";
import fullHtml53 from "../public/steps/5-3.html";
import fullHtml61 from "../public/steps/6-1.html";
import fullHtml62 from "../public/steps/6-2.html";
import fullHtml63 from "../public/steps/6-3.html";
import { DocURI } from "./childComponents/form/DocURI";

export const StaticSubStep = ({ menu, step, substep }) => {
	let fullHtml = fullHtml00;
	let breadCrumb = null;

	if (menu === "1-2") {
		fullHtml = fullHtml12;
		breadCrumb = (
			<BreadCrumb
				parentStep="Form a Collaborative Planning Team"
				childStep="Identify a Resilience Leader for the Community"
				taskNo="1"
				subtaskNo="1-2"
			/>
		);
	} else if (menu === "1-3") {
		fullHtml = fullHtml13;
		breadCrumb = (
			<BreadCrumb
				parentStep="Form a Collaborative Planning Team"
				childStep="Establish the scope of the planning effort"
				taskNo="1"
				subtaskNo="1-3"
			/>
		);
	} else if (menu === "1-4") {
		fullHtml = fullHtml14;
		breadCrumb = (
			<BreadCrumb
				parentStep="Form a Collaborative Planning Team"
				childStep="Identify key public and private stakeholders"
				taskNo="1"
				subtaskNo="1-4"
			/>
		);
	} else if (menu === "2-1") {
		fullHtml = fullHtml21;
		breadCrumb = (
			<BreadCrumb
				parentStep="Understanding the Situation"
				childStep="Assess existing community plans"
				taskNo="2"
				subtaskNo="2-1"
			/>
		);
	} else if (menu === "2-2") {
		fullHtml = fullHtml22;
		breadCrumb = (
			<BreadCrumb
				parentStep="Understanding the Situation"
				childStep="Characterize community members and their needs"
				taskNo="2"
				subtaskNo="2-2"
			/>
		);
	} else if (menu === "2-3") {
		fullHtml = fullHtml23;
		breadCrumb = (
			<BreadCrumb
				parentStep="Understanding the Situation"
				childStep="Characterize the community social functions and dependencies"
				taskNo="2"
				subtaskNo="2-3"
			/>
		);
	} else if (menu === "2-5") {
		fullHtml = fullHtml25;
		breadCrumb = (
			<BreadCrumb
				parentStep="Understanding the Situation"
				childStep="Link social functions to the built environment"
				taskNo="2"
				subtaskNo="2-5"
			/>
		);
	} else if (menu === "3-1") {
		fullHtml = fullHtml31;
		breadCrumb = (
			<BreadCrumb
				parentStep="Determine Goals & Objectives"
				childStep="Identify a Resilience Leader for the Community"
				taskNo="3"
				subtaskNo="3-1"
			/>
		);
	} else if (menu === "3-2") {
		fullHtml = fullHtml32;
		breadCrumb = (
			<BreadCrumb
				parentStep="Determine Goals & Objectives"
				childStep="Identify a Resilience Leader for the Community"
				taskNo="3"
				subtaskNo="3-2"
			/>
		);
	} else if (menu === "3-5") {
		fullHtml = fullHtml35;
		breadCrumb = (
			<BreadCrumb
				parentStep="Determine Goals & Objectives"
				childStep="Summarize the results"
				taskNo="3"
				subtaskNo="3-5"
			/>
		);
	} else if (menu === "4-1") {
		fullHtml = fullHtml41;
		breadCrumb = (
			<BreadCrumb
				parentStep="Plan Development"
				childStep="Evaluate the gaps between goals and performance"
				taskNo="4"
				subtaskNo="4-1"
			/>
		);
	} else if (menu === "4-2") {
		fullHtml = fullHtml42;
		breadCrumb = (
			<BreadCrumb
				parentStep="Plan Development"
				childStep="Identify solutions to address gaps"
				taskNo="4"
				subtaskNo="4-2"
			/>
		);
	} else if (menu === "4-3") {
		fullHtml = fullHtml43;
		breadCrumb = (
			<BreadCrumb
				parentStep="Plan Development"
				childStep="Prioritize solutions and develop an implementation strategy"
				taskNo="4"
				subtaskNo="4-3"
			/>
		);
	} else if (menu === "5-1") {
		fullHtml = fullHtml51;
		breadCrumb = (
			<BreadCrumb
				parentStep="Plan Prep, Review, & Approval"
				childStep="Document the community plans"
				taskNo="5"
				subtaskNo="5-1"
			/>
		);
	} else if (menu === "5-2") {
		fullHtml = fullHtml52;
		breadCrumb = (
			<BreadCrumb
				parentStep="Plan Prep, Review, & Approval"
				childStep="Obtain feedback and approval from stakeholders"
				taskNo="5"
				subtaskNo="5-2"
			/>
		);
	} else if (menu === "5-3") {
		fullHtml = fullHtml53;
		breadCrumb = (
			<BreadCrumb
				parentStep="Plan Prep, Review, & Approval"
				childStep="Finalize and approve the plan"
				taskNo="5"
				subtaskNo="5-3"
			/>
		);
	} else if (menu === "6-1") {
		fullHtml = fullHtml61;
		breadCrumb = (
			<BreadCrumb
				parentStep="Plan Implementation & Maintenance"
				childStep="Execute administrative and construction solutions"
				taskNo="6"
				subtaskNo="6-1"
			/>
		);
	} else if (menu === "6-2") {
		fullHtml = fullHtml62;
		breadCrumb = (
			<BreadCrumb
				parentStep="Plan Implementation & Maintenance"
				childStep="Evaluate and update on a periodic basis"
				taskNo="6"
				subtaskNo="6-2"
			/>
		);
	} else if (menu === "6-3") {
		fullHtml = fullHtml63;
		breadCrumb = (
			<BreadCrumb
				parentStep="Plan Implementation & Maintenance"
				childStep="Modify implementation strategies"
				taskNo="6"
				subtaskNo="6-3"
			/>
		);
	}

	return (
		<Layout>
			<div className="firstDivInContent">
				<Box display="flex" style={{alignItem:"baseline", padding:"1em 0"}} sx={{ justifyContent: "space-between" }}>
					<Box>
						{breadCrumb}
					</Box>
					<Box style={{marginRight:"2em"}}>
						<StepStatusDropdown step={step} substep={substep} />
					</Box>
				</Box>
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<StepInfo fullHtml={fullHtml} />
						<DocURI step={step} substep={substep} />
					</Grid>
				</Box>
			</div>
		</Layout>
	);
};

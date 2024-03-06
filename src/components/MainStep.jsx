import React from "react";
import { Box, Grid } from "@material-ui/core";
import BreadCrumb from "./childComponents/navigation/BreadCrumb";
import { Layout } from "./Layout";
import StepInfo from "./StepInfo";
import fullHtml00 from "../public/steps/0-0.html";
import fullHtml10 from "../public/steps/1-0.html";
import fullHtml20 from "../public/steps/2-0.html";
import fullHtml30 from "../public/steps/3-0.html";
import fullHtml40 from "../public/steps/4-0.html";
import fullHtml50 from "../public/steps/5-0.html";
import fullHtml60 from "../public/steps/6-0.html";

export const MainStep = ({ menu }) => {
	let fullHtml = fullHtml00;
	let breadCrumb = null;
	if (menu === "1") {
		fullHtml = fullHtml10;
		breadCrumb = (
			<BreadCrumb parentStep="Form a Collaborative Planning Team" taskNo="1" />
		);
	} else if (menu === "2") {
		fullHtml = fullHtml20;
		breadCrumb = (
			<BreadCrumb parentStep="Understanding the Situation" taskNo="2" />
		);
	} else if (menu === "3") {
		fullHtml = fullHtml30;
		breadCrumb = (
			<BreadCrumb parentStep="Determine Goals & Objectives" taskNo="3" />
		);
	} else if (menu === "4") {
		fullHtml = fullHtml40;
		breadCrumb = <BreadCrumb parentStep="Plan Development" taskNo="4" />;
	} else if (menu === "5") {
		fullHtml = fullHtml50;
		breadCrumb = (
			<BreadCrumb parentStep="Plan Prep, Review, & Approval" taskNo="5" />
		);
	} else if (menu === "6") {
		fullHtml = fullHtml60;
		breadCrumb = (
			<BreadCrumb parentStep="Plan Implementation & Maintenance" taskNo="6" />
		);
	}

	return (
		<Layout>
			<div className="firstDivInContent">
				{breadCrumb}
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<Grid item className="gridItem">
							<StepInfo fullHtml={fullHtml} />
						</Grid>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
};

import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid} from "@material-ui/core";
import PageBanner from "./Banner";
import Layout from "../containers/Layout";
import StepInfo from "./StepInfo";
import fullHtml0 from "../public/steps/0-0.html";
import fullHtml1 from "../public/steps/1-0.html";
import fullHtml2 from "../public/steps/2-0.html";
import fullHtml3 from "../public/steps/3-0.html";
import fullHtml4 from "../public/steps/4-0.html";
import fullHtml5 from "../public/steps/5-0.html";
import fullHtml6 from "../public/steps/6-0.html";

const useStyles = makeStyles({
	innerBox: {
		backgroundColor: "#F8F9FF"
	},
	outerBox: {
		backgroundColor: "#F8F9FF"
	},
	gridItem: {
		width: "900px"
	},
});


const Introduction = ({menu}: string) => {
	const classes = useStyles();

	let fullHtml = fullHtml0;
	let pageBanner = null;
	if (menu === "1") {
		console.log(menu);
		fullHtml = fullHtml1;
		pageBanner = <PageBanner parentStep="Form a Collaborative Planning Team" taskNo="1" />;
	}
	else if (menu === "2") {
		fullHtml = fullHtml2;
		pageBanner = <PageBanner parentStep="Understanding the Situation" taskNo="2" />;
	}
	else if (menu === "3") {
		fullHtml = fullHtml3;
		pageBanner = <PageBanner parentStep="Determine Goals & Objectives" taskNo="3" />;
	}
	else if (menu === "4") {
		fullHtml = fullHtml4;
		pageBanner = <PageBanner parentStep="Plan Development" taskNo="4" />;
	}
	else if (menu === "5") {
		fullHtml = fullHtml5;
		pageBanner = <PageBanner parentStep="Plan Prep, Review, & Approval" taskNo="5" />;
	}
	else if (menu === "6") {
		fullHtml = fullHtml6;
		pageBanner = <PageBanner parentStep="Plan Implementation & Maintenance" taskNo="6" />;
	}

	return (
		<Layout>
			<div className="firstDivInContent">
				{pageBanner}
				<Box  className={classes.outerBox}>
					<Grid container spacing={12} className={classes.innerBox}>
						<Grid item className={classes.gridItem}>
							<StepInfo fullHtml={fullHtml}/>
						</Grid>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
};

export default Introduction;

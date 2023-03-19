import * as React from "react";
import Chip from "@material-ui/core/Chip";

import { Box, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	breadcrumb: {
		height: "22px",
		width: "auto",
		color: "#69707F",
		fontSize: "18px",
		fontWeight: 500,
		letterSpacing: 0,
		lineHeight: "22px",
		display: "inline-block",
		padding: "0 17px",
		textTransform: "capitalize"
	},
	breadcrumbText: {
		display: "inline",
		fontWeight: 500,
		fontSize: "18px"
	},
	breadcrumbTextColored: {
		color: "#00619D",
		display: "inline",
		fontWeight: 500,
		fontSize: "18px"
	},
	chipLabel: {
		borderRadius: "5px",
		height: "18px",
		marginRight: "6px"
	},
	chipLabelColored: {
		borderRadius: "5px",
		height: "18px",
		marginRight: "6px",
		backgroundColor: "rgba(0, 97, 157)",
		color: "White"
	}
});

export default function BreadCrumb(props) {
	const classes = useStyles();

	if (props.subtaskNo && props.childStep) {
		return (
			<Box className={classes.breadcrumb}>
				<Typography className={classes.breadcrumbText}>
					<Chip label={props.taskNo} className={classes.chipLabel} />
					{props.parentStep}
				</Typography>
				<Typography className={classes.breadcrumbTextColored}>
					&nbsp; {">"} &nbsp; <Chip label={props.subtaskNo} className={classes.chipLabelColored} />
					{props.childStep}
				</Typography>
			</Box>
		);
	} else {
		return (
			<Box className={classes.breadcrumb}>
				<Typography className={classes.breadcrumbTextColored}>
					<Chip label={props.taskNo} className={classes.chipLabelColored} />
					{props.parentStep}
				</Typography>
			</Box>
		);
	}
}

import * as React from "react";
import Chip from "@material-ui/core/Chip";

import { Box, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	banner: {
		height: "22px",
		width: "1018px",
		color: "#69707F",
		fontSize: "18px",
		fontWeight: 500,
		letterSpacing: 0,
		lineHeight: "22px",
		display: "inline-block",
		margin: "19px 17px 25px 17px"
	},
	bannerText: {
		display: "inline",
		fontWeight: 500,
		fontSize: "18px"
	},
	bannerTextColored: {
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
			<Box className={classes.banner}>
				<Typography className={classes.bannerText}>
					<Chip label={props.taskNo} className={classes.chipLabel} />
					{props.parentStep}
				</Typography>
				<Typography className={classes.bannerTextColored}>
					&nbsp; {">"} &nbsp; <Chip label={props.subtaskNo} className={classes.chipLabelColored} />
					{props.childStep}
				</Typography>
			</Box>
		);
	} else {
		return (
			<Box className={classes.banner}>
				<Typography className={classes.bannerTextColored}>
					<Chip label={props.taskNo} className={classes.chipLabelColored} />
					{props.parentStep}
				</Typography>
			</Box>
		);
	}
}

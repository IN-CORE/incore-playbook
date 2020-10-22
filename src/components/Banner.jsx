import * as React from "react";

import {Box, Typography} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";

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
		margin: "19px 17px 39px 17px"
	},
	bannerText:{
		display:"inline"
	},
	bannerTextColored:{
		color: "#00619D",
		display:"inline"
	}
});

export default function Banner(props) {
	const classes = useStyles();
	return (
		<Box className={classes.banner}>
			<Typography className={classes.bannerText}>{props.parentStep}</Typography>
			<Typography className={classes.bannerTextColored}> > {props.childStep}</Typography>
		</Box>
	);
}

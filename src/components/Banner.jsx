import * as React from "react";
import Chip from "@material-ui/core/Chip";

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
		display:"inline",
		fontWeight: 500,
		fontSize: "18px"
	},
	bannerTextColored:{
		color: "#00619D",
		display:"inline",
		fontWeight: 500,
		fontSize: "18px"
	},
	chipParent: {
		borderRadius: "5px",
		height: "18px",
		marginRight: "6px",
	},
	chipChild: {
		borderRadius: "5px",
		height: "18px",
		marginRight: "6px",
		backgroundColor: "rgba(0, 97, 157)",
		color: "White"

	}
});

export default function Banner(props) {
	const classes = useStyles();
	return (
		<Box className={classes.banner}>
			<Typography className={classes.bannerText}>
				<Chip label={props.taskNo} className={classes.chipParent}/>
				{props.parentStep}
			</Typography>
			<Typography className={classes.bannerTextColored}>
				&nbsp; > &nbsp; <Chip label={props.subtaskNo} className={classes.chipChild}/>
				{props.childStep}
			</Typography>
		</Box>
	);
}

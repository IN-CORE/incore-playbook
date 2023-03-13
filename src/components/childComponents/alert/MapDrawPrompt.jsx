import React from "react";
import { Button, Modal, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";
import { IncoreTitle } from "../../styledComponents/IncoreTitle";
import { IncoreButton } from "../../styledComponents/IncoreButton";

const useStyles = makeStyles({
	dialog: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		maxWidth:"300px",
		padding:"3em",
		zIndex:3000,
	}
});

export const MapDrawPrompt = (props) => {
	const classes = useStyles();

	const { mapDialogOpen, handleMapDialogClose, rootRef, promptTitle, prompt } = props;

	return (
		<Paper className={classes.dialog} style={{display: mapDialogOpen? "inherit":"none"}}>
			<IncoreTitle style={{color:"#00619D"}}>Define Epicenter</IncoreTitle>
			<p style={{padding: "1em 0"}}>
				Click on the map to draw the dot below to define the epicenter of an earthquake.
				The locations will automatically be entered into the form.
			</p>
			<Box style={{margin:"auto", textAlign: "center", padding: "3em"}}>
				<span style={{height: "2em", width: "2em", backgroundColor: "#D63649", borderRadius: "50%",
					display:"block", margin:"auto"}} />
				<span>Epicenter</span>
			</Box>
			<IncoreButton onClick={handleMapDialogClose}>
				Got It
			</IncoreButton>
		</Paper>
	);
};

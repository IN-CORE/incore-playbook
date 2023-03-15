import React from "react";
import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { IncoreTitle } from "../../styledComponents/IncoreTitle";
import { IncoreButton } from "../../styledComponents/IncoreButton";

const useStyles = makeStyles({
	dialog: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		maxWidth:"400px",
		padding:"3em",
		zIndex:3000,
	}
});

export const MapDrawPrompt = (props) => {
	const classes = useStyles();

	const { mapDialogOpen, handleMapDialogClose, promptTitle, promptText, promptElem } = props;


	return (
		<Paper className={classes.dialog} style={{display: mapDialogOpen? "inherit":"none"}}>
			<IncoreTitle style={{color:"#00619D"}}>{promptTitle}</IncoreTitle>
			<p style={{padding: "1em 0"}}>{promptText}</p>
			<Box style={{margin:"auto", textAlign: "center", padding: "2em"}}>
				{promptElem}
			</Box>
			<IncoreButton onClick={handleMapDialogClose}>
				Got It
			</IncoreButton>
		</Paper>
	);
};

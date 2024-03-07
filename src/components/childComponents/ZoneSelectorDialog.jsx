import React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

export default function ZoneSelectorDialog(props) {
	const classes = useStyles();
	const { mapDialogOpen, setMapDialogOpen } = props;

	return (
		<Dialog
			open={mapDialogOpen}
			onClose={() => setMapDialogOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth
			maxWidth="md"
		>
			<DialogTitle id="alert-dialog-title">
				<Typography variant="h5">Select Zone</Typography>
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={() => setMapDialogOpen(false)}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Grid container>
					<Grid item xs={12}>
						Implement Select Zone
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}

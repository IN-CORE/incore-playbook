import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

export const DownloadAlert = (props) => {
	const { downloadDialogOpen, handleDownloadDialogClose } = props;

	return (
		<Dialog
			open={downloadDialogOpen}
			onClose={handleDownloadDialogClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle style={{ color: "#00619D" }}>Download in Progress</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Your download has already started. Please do not double-click the download link as this may cause
					multiple downloads and slow down the process.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="text" onClick={handleDownloadDialogClose} style={{ color: "#00619D" }}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

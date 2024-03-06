import React from "react";
import { Box, IconButton, Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

export const AlertMessage = ({
	open,
	setOpen,
	message,
	alertSeverity,
	status,
}) => {
	let subMessage = "";

	if (status !== null && status === 401) {
		subMessage = " Error: Unauthorized request. Please log in and try again.";
	} else if (status !== null && status === 403) {
		subMessage = " Error: Forbidden, you don't have enough privileges.";
	} else {
		subMessage = ` Error: Unknown error, response status code: ${status}`;
	}

	return (
		<Box>
			<Collapse in={open}>
				<Alert
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					severity={alertSeverity === "" ? "error" : alertSeverity}
				>
					{message + subMessage}
				</Alert>
			</Collapse>
		</Box>
	);
};

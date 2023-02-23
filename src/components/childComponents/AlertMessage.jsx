import React from "react";
import { Box, IconButton, Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

export const AlertMessage = ({ open, setOpen, message, alertSeverity }) => {
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
					{message}
				</Alert>
			</Collapse>
		</Box>
	);
};

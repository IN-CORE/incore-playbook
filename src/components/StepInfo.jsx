import React, {useState} from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,

} from "@material-ui/core";


const StepInfo = (props: {fullHtml: string, shortHtml: string}) => {

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<div dangerouslySetInnerHTML={{__html: props.shortHtml}} />
			<span style={{color: "#00619D", textDecoration: "underline", cursor: "pointer"}} onClick={handleClickOpen}> Learn More About This Step</span>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
				<DialogContent>
					<div dangerouslySetInnerHTML={{__html: props.fullHtml}} />
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>

		</div>

	);
};

export default StepInfo;

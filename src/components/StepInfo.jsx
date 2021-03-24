import React, {useEffect, useState} from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,

} from "@material-ui/core";

import {getShortHTML} from "../utils/common";


const StepInfo = (props: {fullHtml: string}) => {

	const [open, setOpen] = useState(false);
	const [html, setHtml] = useState(null);
	const [shortHtml, setShortHtml] = useState(null);
	const [showMoreLink, setShowMoreLink] = useState(true);

	useEffect( () => {
		setHtml(props.fullHtml);
		let shortHtml = getShortHTML((props.fullHtml));
		if (shortHtml === undefined) {
			setShowMoreLink(false);
			setShortHtml(html);
		}
		else{
			setShortHtml(shortHtml);
		}

	}, [props]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<div dangerouslySetInnerHTML={{__html: shortHtml}} />

			{showMoreLink ?
				<span style={{color: "#00619D", textDecoration: "underline", cursor: "pointer"}}
					onClick={handleClickOpen}> Learn More About This Step</span>
				: null
			}

			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
				<DialogContent>
					<div dangerouslySetInnerHTML={{__html: html}} />
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

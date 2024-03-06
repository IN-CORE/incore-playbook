import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
} from "@material-ui/core";

import { getShortHTML } from "../utils/common";

const StepInfo = (props) => {
	const [open, setOpen] = useState(false);
	const [html, setHtml] = useState(null);
	const [shortHtml, setShortHtml] = useState(null);
	const [showMoreLink, setShowMoreLink] = useState(true);

	useEffect(() => {
		setHtml(props.fullHtml);
		let sHtml = getShortHTML(props.fullHtml);
		if (sHtml === undefined) {
			setShowMoreLink(false);
			setShortHtml(props.fullHtml);
		} else {
			setShortHtml(sHtml);
		}
	}, [props.fullHtml]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: shortHtml }} />

			{showMoreLink ? (
				<span
					style={{
						color: "#00619D",
						textDecoration: "underline",
						cursor: "pointer",
					}}
					onClick={handleClickOpen}
				>
					{" "}
					Learn More About This Step
				</span>
			) : null}

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				maxWidth="lg"
			>
				<DialogContent>
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} style={{ color: "#00619D" }}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default StepInfo;

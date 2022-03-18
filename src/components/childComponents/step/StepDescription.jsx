import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

const useStyles = makeStyles({
	thisStepTitle: {
		cursor: "pointer",
		height: "14px",
		width: "120px",
		color: "#00619D",
		fontFamily: "Roboto, sans-serif",
		fontSize: "12px",
		fontWeight: "500",
		letterSpacing: "0",
		lineHeight: "14px",
		margin: "20px 5px 0px 5px"
	},
	thisStepAbout: {
		minHeight: "200px",
		width: "100%",
		color: "#8798AD",
		fontFamily: "Rubik, sans-serif",
		fontSize: "12px",
		letterSpacing: "0",
		lineHeight: "15px",
		margin: "0px 5px 0px 5px"
	},
	learnMoreLink: {
		color: "#00619D",
		lineHeight: "14px"
	}
});

export const StepDescription = (props) => {
	const classes = useStyles();

	const {stepInfo} = props;

	const [open, setOpen] = useState(true);

	const togglePanel = () => {
		setOpen(!open);
	};

	const title = stepInfo.stepTitle;
	const about = stepInfo.stepAbout.map((paragraph, index) =>
		<p key={index} className="secondary-color">{paragraph}</p>);
	const link = stepInfo.stepLink;


	return (
		<div>
			<div onClick={()=>togglePanel()} className={classes.thisStepTitle} >
				{title} {open ? (<ExpandLess style={{fontSize: "small"}} />) : <ExpandMore style={{fontSize: "small"}} />}
			</div>
			{open ? (
				<div className={classes.thisStepAbout}>
					{about}
					<a className={classes.learnMoreLink} href={link.uri}>{link.text}</a>
				</div>
			) : null}
		</div>
	);
};

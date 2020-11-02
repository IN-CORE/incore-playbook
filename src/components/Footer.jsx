import React from "react";
import {Container} from "@material-ui/core";
import {makeStyles } from "@material-ui/core/styles";
import "../public/CSU-logo.png";
import "../public/resilience-logo.png";
import "../public/NCSA-logo.png";

const useStyles = makeStyles((theme) => ({

	footerContainer: {
		textAlign: "center",
		maxWidth: "50%",
		marginTop: theme.spacing(0),
		marginBottom: theme.spacing(0),
		display: "flex",
		paddingTop: theme.spacing(0.25),
		paddingBottom: theme.spacing(0.25),
	},
	iconContainerLink:{
		paddingLeft: theme.spacing(4),
		margin: "0 auto"
	},

	icon: {
		height: 50,
		borderRadius: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginRight: theme.spacing(1)
	},
}));

const Footer = () => {
	const classes = useStyles();
	const footerLogos = [
		{
			name: "CSU",
			image: "/CSU-logo.png",
			url: "https://www.colostate.edu/"
		},
		{
			name: "IN-CORE",
			image: "/resilience-logo.png",
			url: "http://resilience.colostate.edu/"
		},
		{
			name: "NCSA",
			image: "/NCSA-logo.png",
			url: "http://www.ncsa.illinois.edu/"
		}
	];

	return(
		<div className="footerDiv">
			<Container className={classes.footerContainer}>
				{
					footerLogos.map((footerLogo, idx) =>
						(
							<a href={footerLogo.url} target="_blank" className={classes.iconContainerLink} key={idx}>
								<img src={footerLogo.image} className={classes.icon} key={idx} alt={footerLogo.name}/>
							</a>
						))
				}
			</Container>
		</div>
	);
};

export default Footer;

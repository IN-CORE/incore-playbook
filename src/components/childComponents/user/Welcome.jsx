import React from "react";
import Box from "@material-ui/core/Box";
import { getCurrEmail, getCurrUserFullname } from "../../../utils/common";
import Gravatar from "react-gravatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";
import { IncoreFootNote } from "../../styledComponents/IncoreFootNote";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	avatarImgSquare: {
		width: "32px",
		height: "32px",
		borderRadius: "10%"
	}
}));

export const Welcome = () => {
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const classes = useStyles();

	return (
		<Container style={{ margin: "2em auto" }}>
			<Box display="flex" alignItems="center">
				{getCurrEmail(globalConfig.hostname) !== undefined ? (
					<Gravatar
						className={classes.avatarImgSquare}
						email={getCurrEmail(globalConfig.hostname)}
						rating="g"
						style={{ marginRight: "1em" }}
					/>
				) : (
					<AccountCircle fontSize="small" />
				)}
				<Box display="flex" flexDirection="column">
					<IncoreInputLabel style={{ margin: "auto", padding: 0 }}>Welcome</IncoreInputLabel>
					<IncoreFootNote style={{ margin: "auto", padding: 0, fontSize: "14px" }}>
						{getCurrUserFullname(globalConfig.hostname) ?? "Playbook User"}
					</IncoreFootNote>
				</Box>
			</Box>
		</Container>
	);
};

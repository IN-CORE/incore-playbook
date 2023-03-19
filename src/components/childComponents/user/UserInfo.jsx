import React, { useEffect } from "react";

import { Container, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { fetchRoles, fetchUserList } from "../../../actions/user";
import { Role } from "./Role";
import { IncoreLinkSmall } from "../../styledComponents/IncoreLinkSmall";

const useStyles = makeStyles({
	avatarImg: {
		width: "32px",
		height: "32px",
		borderRadius: "50%"
	},
	table: {
		wordBreak: "break-all",
	}
});

/**
 * Generate a user info form
 */
export const UserInfo = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const getPlaybookUserList = () => dispatch(fetchUserList());
	const getPlaybookRoles = () => dispatch(fetchRoles());
	const userList = useSelector((state) => state.user.userList);
	const roles = useSelector((state) => state.user.roles);

	useEffect(() => {
		getPlaybookUserList();
		getPlaybookRoles();
	}, []);

	return (
		<Container>
			<Table size="small" className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left" />
						<TableCell align="left">Email</TableCell>
						<TableCell align="left">Name</TableCell>
						<TableCell align="center" style={{minWidth:"150px"}}>Role</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{userList.map((user, index) => (
						<TableRow key={index}>
							<TableCell component="th" scope="row" align="left" style={{padding: 0, maxWidth: "100%",
								whiteSpace: "nowrap"}}>
								<Tooltip title={user["username"] ?? ""}>
									{user["email"] !== undefined ? (
										<Gravatar className={classes.avatarImg} email={user["email"]} rating="g" />
									) : (
										<AccountCircle fontSize="small" />
									)}
								</Tooltip>
							</TableCell>
							<TableCell align="left">
								<IncoreLinkSmall href={`mailto:${user["email"]}`} style={{fontWeight:400}}>
									{user["email"]}</IncoreLinkSmall></TableCell>
							<TableCell align="left">
								{user["firstName"]} {user["lastName"]}
							</TableCell>
							<TableCell align="center" style={{fontWeight:500}}>
								<Role roles={roles} user={user} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Container>
	);
};

import React, { useEffect } from "react";

import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { fetchRoles, fetchUserList } from "../../../actions/user";
import { Role } from "./Role";

const useStyles = makeStyles({
	defaultProfileImage: {
		height: "200px",
		width: "200px"
	},
	avatarImg: {
		width: "32px",
		height: "32px",
		borderRadius: "50%"
	},
	table: {
		wordBreak: "break-all"
	}
});

/**
 * Generate a user info form
 */
export const UserInfo = (props) => {
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
			<Box className="inputGroup">
				<Table size="small" className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center" />
							<TableCell align="center">Username</TableCell>
							<TableCell align="center">Email</TableCell>
							<TableCell align="center">Name</TableCell>
							<TableCell align="center" style={{minWidth:"150px"}}>Role</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{userList.map((user, index) => (
							<TableRow key={index}>
								<TableCell component="th" scope="row" align="center">
									{user["email"] !== undefined ? (
										<Gravatar className={classes.avatarImg} email={user["email"]} rating="g" />
									) : (
										<AccountCircle fontSize="small" />
									)}
								</TableCell>
								<TableCell align="center">{user["username"]}</TableCell>
								<TableCell align="center">{user["email"]}</TableCell>
								<TableCell align="center">
									{user["firstName"]} {user["lastName"]}
								</TableCell>
								<TableCell align="center">
									<Role roles={roles} user={user} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</Container>
	);
};

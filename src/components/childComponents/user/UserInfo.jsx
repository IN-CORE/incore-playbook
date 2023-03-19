import React, { useEffect, useState } from "react";

import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead, TablePagination,
	TableRow, TableSortLabel,
	Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { fetchRoles, fetchUserList } from "../../../actions/user";
import { Role } from "./Role";
import { IncoreLinkSmall } from "../../styledComponents/IncoreLinkSmall";
import { getComparator, stableSort } from "../../../utils/common";

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
	const userChanged = useSelector((state) => state.user.user);
	const roles = useSelector((state) => state.user.roles);

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = React.useState("email");
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		getPlaybookUserList();
		getPlaybookRoles();
	}, []);

	useEffect(() => {
		getPlaybookUserList();
	}, [userChanged]);

	return (
		<TableContainer>
			<Table size="small" className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left" />
						<TableCell align="left" sortDirection={orderBy === "email" ? order : false}>
							<TableSortLabel
								active={orderBy === "email"}
								direction={orderBy === "email" ? order : "asc"}
								onClick={createSortHandler("email")}
							>
								Email
							</TableSortLabel>
						</TableCell>
						<TableCell align="left" sortDirection={orderBy === "firstName" ? order : false}>
							<TableSortLabel
								active={orderBy === "firstName"}
								direction={orderBy === "firstName" ? order : "asc"}
								onClick={createSortHandler("firstName")}
							>
								Name
							</TableSortLabel>
						</TableCell>
						<TableCell align="center" style={{minWidth:"150px"}}>Role</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						stableSort(userList, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((user, index) => (
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
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={userList.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
};

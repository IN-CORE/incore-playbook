import React, { useState } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableSortLabel,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { makeStyles } from "@material-ui/core/styles";
import { IncoreLinkSmall } from "../../styledComponents/IncoreLinkSmall";
import {
	getComparator,
	parseDateTime,
	stableSort,
} from "../../../utils/common";

export const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	tableHeaderRow: {
		// height: "34px",
	},
	tableHeaderCell: {
		height: "14px",
		width: "37px",
		color: "#69707F",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1.13px",
		lineHeight: "14px",
	},
	tableBodyRow: {
		// height: "75px",
	},
	tableBodyCell: {
		height: "21px",
		width: "68.75px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "22px",
		wordBreak: "break-word",
	},
	firstTableBodyCell: {
		width: "250px",
		height: "21px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "22px",
	},
	clickableLink: {
		"&:hover": {
			cursor: "pointer",
		},
	},
	clickableLinkDisabled: {
		pointerEvents: "none",
		textDecoration: "none",
		color: "#9E9E9E",
	},
});

export function EntryTable(props) {
	const { fieldNames, fields, enableAction, actionBtnText, actionClick } =
		props;

	// if (enableAction === undefined || enableAction === null) {
	// 	enableAction = false;
	// }

	const [order, setOrder] = useState("desc");
	const [orderBy, setOrderBy] = React.useState("date");

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};

	const classes = useStyles();

	return (
		<TableContainer>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						{fieldNames.map((fieldName) => {
							return (
								<TableCell
									className={classes.tableHeaderCell}
									key={fieldName["columnName"]}
									sortDirection={
										orderBy === fieldName["columnName"] ? order : false
									}
								>
									<TableSortLabel
										active={orderBy === fieldName["columnName"]}
										direction={
											orderBy === fieldName["columnName"] ? order : "asc"
										}
										onClick={createSortHandler(fieldName["columnName"])}
									>
										{fieldName["prettyName"]}
									</TableSortLabel>
								</TableCell>
							);
						})}
						{enableAction ? (
							<TableCell className={classes.tableHeaderCell}>Action</TableCell>
						) : null}
						{/*/!*TODO implement expending*!/*/}
						{/*<TableCell className={classes.tableHeaderCell} key="dot" />*/}
					</TableRow>
				</TableHead>
				<TableBody>
					{stableSort(fields, getComparator(order, orderBy)).map((field) => {
						return (
							<TableRow className={classes.tableBodyRow} key={field["id"]}>
								{fieldNames.map((fieldName, idx) => {
									if (fieldName["handleClick"] !== undefined) {
										let handleClick = fieldName["handleClick"];
										return (
											<TableCell key={idx} className={classes.tableBodyCell}>
												<IncoreLinkSmall
													color="primary"
													onClick={() => {
														handleClick(field);
													}}
													className={
														field["finalStatus"] === undefined ||
														field["finalStatus"] === "FINISHED"
															? classes.clickableLink
															: classes.clickableLinkDisabled
													}
												>
													{field[fieldName["columnName"]]}
												</IncoreLinkSmall>
											</TableCell>
										);
									}
									return (
										<TableCell key={idx} className={classes.tableBodyCell}>
											{fieldName["columnName"] === "date"
												? parseDateTime(field[fieldName["columnName"]])
												: field[fieldName["columnName"]]}
										</TableCell>
									);
								})}
								{enableAction ? (
									<TableCell
										key={field["id"]}
										className={classes.tableBodyCell}
									>
										<IncoreLinkSmall
											color="primary"
											onClick={() => {
												actionClick(
													field["id"],
													field["title"],
													field["description"],
												);
											}}
											className={
												field["finalStatus"] === undefined ||
												field["finalStatus"] === "FINISHED"
													? classes.clickableLink
													: classes.clickableLinkDisabled
											}
										>
											{actionBtnText}
										</IncoreLinkSmall>
									</TableCell>
								) : null}

								{/*/!*TODO implement expending*!/*/}
								{/*<TableCell className={classes.tableBodyCell} key="dot">*/}
								{/*	<MoreHorizIcon />*/}
								{/*</TableCell>*/}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

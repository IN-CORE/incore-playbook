import React, { useState } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableSortLabel,
	TableContainer,
	TableHead,
	TableRow,
	Link
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	table: {
		minWidth: 650
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
		lineHeight: "14px"
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
		wordBreak: "break-word"
	},
	firstTableBodyCell: {
		width: "250px",
		height: "21px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "22px"
	},
	clickableLink: {
		"&:hover": {
			cursor: "pointer"
		}
	},
	clickableLinkDisabled: {
		pointerEvents: "none",
		textDecoration: "none",
		color: "#9E9E9E"
	}
});

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function prettifyDate(date) {
	return date.slice(0, 10);
}

export function EntryTable(props) {
	const { fieldNames, fields } = props;

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
									sortDirection={orderBy === fieldName["columnName"] ? order : false}
								>
									<TableSortLabel
										active={orderBy === fieldName["columnName"]}
										direction={orderBy === fieldName["columnName"] ? order : "asc"}
										onClick={createSortHandler(fieldName["columnName"])}
									>
										{fieldName["prettyName"]}
									</TableSortLabel>
								</TableCell>
							);
						})}
						{/*TODO implement expending*/}
						<TableCell className={classes.tableHeaderCell} key="dot" />
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
												<Link
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
												</Link>
											</TableCell>
										);
									}
									return (
										<TableCell key={idx} className={classes.tableBodyCell}>
											{fieldName["columnName"] === "date"
												? prettifyDate(field[fieldName["columnName"]])
												: field[fieldName["columnName"]]}
										</TableCell>
									);
								})}
								{/*TODO implement expending*/}
								<TableCell className={classes.tableBodyCell} key="dot">
									<MoreHorizIcon />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

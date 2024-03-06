import React from "react";

import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	table: {
		backgroundColor: "#FFFFFF",
		minWidth: "170px",
		margin: "27px 0px",
	},
	tableBodyRow: {
		fontSize: "15px",
		lineHeight: "18px",
		letterSpacing: 0,
		border: "None",
	},
	tableBodyCellLeft: {
		color: "#8798AD",
		border: "None",
		padding: "0 5px",
	},
	tableBodyCellRight: {
		color: "#2E384D",
		fontWeight: 500,
		border: "None",
		padding: "0 5px",
	},
});

export function ResultSummaryTable(props) {
	const { hazardType, inventoryType, runtime } = props;
	const classes = useStyles();
	return (
		<Table className={classes.table} size="small" aria-label="a dense table">
			<TableBody>
				<TableRow className={classes.tableBodyRow}>
					<TableCell
						align="left"
						component="th"
						scope="row"
						className={classes.tableBodyCellLeft}
					>
						hazard type
					</TableCell>
					<TableCell align="left" className={classes.tableBodyCellRight}>
						{hazardType ?? ""}
					</TableCell>
				</TableRow>
				<TableRow className={classes.tableBodyRow}>
					<TableCell
						align="left"
						component="th"
						scope="row"
						className={classes.tableBodyCellLeft}
					>
						inventory type
					</TableCell>
					<TableCell align="left" className={classes.tableBodyCellRight}>
						{inventoryType ?? ""}
					</TableCell>
				</TableRow>
				<TableRow align="right" className={classes.tableBodyRow}>
					<TableCell
						align="left"
						component="th"
						scope="row"
						className={classes.tableBodyCellLeft}
					>
						run at
					</TableCell>
					<TableCell align="left" className={classes.tableBodyCellRight}>
						{runtime}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}

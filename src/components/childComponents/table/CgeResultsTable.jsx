import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import {round} from "../../../utils/common";

const tableColumnHead = {
	color: "#FFFFFF",
	fontSize: "12px",
	fontWeight: "500",
	textAlign: "right",
	border: "solid 1px rgba(46,91,255,0.08)",
	borderRadius: "1px",
	width: "160px"
};

const tableRowHead = {
	color: "#69707F",
	fontSize: "12px",
	fontWeight: "500",
	textAlign: "center",
	backgroundColor: "#EAEEFF",
	borderLeft: "solid 1px #FFFFFF",
	borderRight: "solid 1px #FFFFFF",
	borderTop: "solid 1px #FFFFFF",
	borderBottom: "solid 1px #FFFFFF"
};

const useStyles = makeStyles({
	table: {
		maxWidth: 700,
	},
	tableRowHeadFirst: {
		color: "#69707F",
		fontSize: "12px",
		fontWeight: "500",
		textAlign: "center",
		backgroundColor: "#F8F9FF",
		border: "solid 1px #FFFFFF"
	},
	tableRowHead: tableRowHead,
	tableRowHeadRight: {
		...tableRowHead,
		borderRight: "solid 1px #EAEEFF",
	},
	tableColumnHeadGreen: {
		...tableColumnHead,
		backgroundColor: "#A1BE2E",
	},
	tableColumnHeadRed: {
		...tableColumnHead,
		backgroundColor: "#DB4F60"
	},
	tableDataCell: {
		width: "100px",
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)"
	}
});


export function CgeResultsTable(props) {

	let resultsJson = props.resultsJson;

	if (resultsJson === null){
		// to be commented out when integrated with API and prop validation can be added

	}

	let headers = [""];
	let beforeJson = resultsJson["beforeEvent"];
	let afterJson = resultsJson["afterEvent"];
	let percentageChange = resultsJson["%_change"];

	// Eliminate duplicate keys. Also, handles the case where before and after has different number of groups
	headers = [...headers, ...new Set([...Object.keys(afterJson), ...Object.keys(beforeJson), ...Object.keys(percentageChange)])];
	const headerSize = headers.length;

	const classes = useStyles();

	return (
		<div>
			<TableContainer>
				<Table className={classes.table} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow >
							{
								headers.map( (header, idx) => {
									let headClass = classes.tableRowHead;
									if (idx === 0){
										headClass = classes.tableRowHeadFirst;
									} else if (idx === headerSize -1){
										headClass = classes.tableRowHeadRight;
									}
									return (<TableCell className={headClass} key={idx}>
										{header}
									</TableCell>);
								})
							}
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell className={classes.tableColumnHeadGreen}> Before Event </TableCell>
							{
								headers.slice(1).map( (header, idx) => {
									return (<TableCell className={classes.tableDataCell} key={idx}>
										{(beforeJson[header] !== undefined ? round(beforeJson[header], 1) : "-" )}
									</TableCell>);
								})
							}
						</TableRow>

						<TableRow>
							<TableCell className={classes.tableColumnHeadRed}> After Event </TableCell>
							{
								headers.slice(1).map( (header, idx) => {
									return (<TableCell className={classes.tableDataCell} key={idx}>
										{(afterJson[header] !== undefined ? round(afterJson[header], 1) : "-" )}
									</TableCell>);
								})
							}
						</TableRow>

						<TableRow>
							<TableCell className={classes.tableRowHead} style={{textAlign:"right"}}> % of Change </TableCell>
							{
								headers.slice(1).map( (header, idx) => {
									return (<TableCell className={classes.tableDataCell} key={idx}>
										{(percentageChange[header] !== undefined ? `${round(percentageChange[header], 1)} %`: "-" )}
									</TableCell>);
								})
							}
						</TableRow>

					</TableBody>
				</Table>
			</TableContainer>
		</div>

	);
}

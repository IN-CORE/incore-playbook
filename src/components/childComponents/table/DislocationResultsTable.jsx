import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
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
	backgroundColor: "rgba(234, 238, 255, 0.6)",
	borderLeft: "solid 1px #FFFFFF",
	borderRight: "solid 1px #FFFFFF",
	borderTop: "solid 1px #FFFFFF",
	borderBottom: "solid 1px #FFFFFF",
	letterSpacing: "1.13px"
};

const useStyles = makeStyles({
	table: {
		maxWidth: 550,
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
		borderRight: "solid 1px rgba(234, 238, 255, 0.6)",
	},
	tableRowTotal: {
		...tableRowHead,
		textAlign: "right",
		letterSpacing: "inherit"
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
	},
	tableDataCellDislocated: {
		width: "100px",
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)",
		backgroundColor: "#FEEFF1"
	},
	title: {
		height: "19px",
		width: "460px",
		color: "#2E384D",
		fontSize: "16px",
		fontWeight: "500",
		letterSpacing: "0.6px",
		lineHeight: "19px",
		padding: "12px 8px",
		marginBottom: "17px"
	}
});

export function DislocationResultsTable(props) {

	let resultsJson = props.resultsJson;
	let title = props.title;

	let headers = [...[""], ...props.headers];
	const headerSize = headers.length;

	const classes = useStyles();

	return (
		<div>
			<div className={classes.title}>{title}</div>
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
							<TableCell className={classes.tableColumnHeadRed}> Dislocated </TableCell>
							<TableCell className={classes.tableDataCellDislocated}>
								{
									"households" in resultsJson.dislocated ?
										resultsJson.dislocated["households"].toLocaleString("en-US")
										:
										resultsJson.dislocated["population"].toLocaleString("en-US")
								}
							</TableCell>
							<TableCell className={classes.tableDataCellDislocated}>
								{
									"%_of_households" in resultsJson.dislocated ?
										round(resultsJson.dislocated["%_of_households"], 1):
										round(resultsJson.dislocated["%_of_population"], 1)
								}%
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className={classes.tableColumnHeadGreen}> Not Dislocated </TableCell>
							<TableCell className={classes.tableDataCell}>
								{
									"households" in resultsJson.not_dislocated ?
										resultsJson.not_dislocated["households"].toLocaleString("en-US")
										:
										resultsJson.not_dislocated["population"].toLocaleString("en-US")
								}
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{
									"%_of_households" in resultsJson.not_dislocated ?
										round(resultsJson.not_dislocated["%_of_households"], 1):
										round(resultsJson.not_dislocated["%_of_population"], 1)
								}%
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className={classes.tableRowTotal}> Total </TableCell>
							<TableCell className={classes.tableDataCell}>
								{
									"households" in resultsJson.total ?
										resultsJson.total["households"].toLocaleString("en-US") :
										resultsJson.total["population"].toLocaleString("en-US")
								}
							</TableCell>
							<TableCell className={classes.tableDataCell} />
						</TableRow>

					</TableBody>
				</Table>
			</TableContainer>
		</div>

	);
}

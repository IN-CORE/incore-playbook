import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { diff, percentDiff, round } from "../../../utils/common";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";

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
		display: "block"
	},
	metricsTable: {
		display: "block",
		maxWidth: "fit-content",
		margin: "auto auto"
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
		borderRight: "solid 1px rgba(234, 238, 255, 0.6)"
	},
	tableRowTotal: {
		...tableRowHead,
		textAlign: "right",
		letterSpacing: "inherit"
	},
	tableColumnHeadGreen: {
		...tableColumnHead,
		backgroundColor: "#A1BE2E"
	},
	tableColumnHeadRed: {
		...tableColumnHead,
		backgroundColor: "#DB4F60"
	},
	tableDataCell: {
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)"
	},
	tableDataCellDislocated: {
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)",
		backgroundColor: "#FEEFF1"
	},
	title: {
		height: "19px",
		color: "#2E384D",
		fontSize: "16px",
		fontWeight: "500",
		letterSpacing: "0.6px",
		lineHeight: "19px",
		padding: "12px 8px",
		marginBottom: "17px",
		display: "block"
	}
});

export function DislocationResultsTableCompare(props) {
	let { resultsJsonA, resultsJsonB, isMetrics } = props;
	let title = props.title;
	let headers = props.headers;

	const classes = useStyles();

	return (
		<div>
			<div className={classes.title}>{title}</div>
			<TableContainer>
				<Table
					className={isMetrics ? classes.metricsTable : classes.table}
					size="small"
					aria-label="a dense table"
				>
					<TableHead>
						<TableRow>
							<TableCell
								className={classes.tableRowHeadFirst}
								style={isMetrics ? { minWidth: "200px" } : {}}
								colSpan={2}
							/>
							{headers.map((header, idx) => {
								return (
									<TableCell
										className={classes.tableRowHeadRight}
										key={idx}
										style={isMetrics ? { minWidth: "200px" } : {}}
									>
										{header}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{/*dislocated*/}
						<TableRow>
							<TableCell className={classes.tableColumnHeadRed} rowSpan={3}> Dislocated </TableCell>
							<TableCell className={classes.tableDataCellDislocated}>
                                A
							</TableCell>
							<TableCell className={classes.tableDataCellDislocated}>
								{"households" in resultsJsonA["dislocated"]
									? resultsJsonA["dislocated"]["households"].toLocaleString("en-US")
									: resultsJsonA["dislocated"]["population"].toLocaleString("en-US")}
							</TableCell>
							<TableCell className={classes.tableDataCellDislocated}>
								{"percent_of_households" in resultsJsonA["dislocated"]
									? round(resultsJsonA["dislocated"]["percent_of_households"], 1)
									: round(resultsJsonA["dislocated"]["percent_of_population"], 1)}
                                %
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableDataCellDislocated}>
                                B
							</TableCell>
							<TableCell className={classes.tableDataCellDislocated}>
								{"households" in resultsJsonB["dislocated"]
									? resultsJsonB["dislocated"]["households"].toLocaleString("en-US")
									: resultsJsonB["dislocated"]["population"].toLocaleString("en-US")}
							</TableCell>
							<TableCell className={classes.tableDataCellDislocated}>
								{"percent_of_households" in resultsJsonB["dislocated"]
									? round(resultsJsonB["dislocated"]["percent_of_households"], 1)
									: round(resultsJsonB["dislocated"]["percent_of_population"], 1)}
                                %
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableDataCellDislocated}>
								<CompareArrowsIcon style={{ transform: "rotate(90deg)" }} />
							</TableCell>
							<TableCell className={classes.tableDataCellDislocated}>
								{"households" in resultsJsonA["dislocated"] && "households" in resultsJsonB["dislocated"]
									? diff(resultsJsonB["dislocated"]["households"], resultsJsonA["dislocated"]["households"])
									: diff(resultsJsonB["dislocated"]["population"], resultsJsonA["dislocated"]["population"])}
							</TableCell>
							<TableCell className={classes.tableDataCellDislocated}>
								{"percent_of_households" in resultsJsonA["dislocated"]
									? percentDiff(resultsJsonB["dislocated"]["percent_of_households"], resultsJsonA["dislocated"]["percent_of_households"])
									: percentDiff(resultsJsonB["dislocated"]["percent_of_population"], resultsJsonA["dislocated"]["percent_of_population"])}
                                %
							</TableCell>
						</TableRow>

						{/*not_dislocated*/}
						<TableRow>
							<TableCell className={classes.tableColumnHeadGreen} rowSpan={3}> Not Dislocated </TableCell>
							<TableCell className={classes.tableDataCell}>
                                A
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{"households" in resultsJsonA["not_dislocated"]
									? resultsJsonA["not_dislocated"]["households"].toLocaleString("en-US")
									: resultsJsonA["not_dislocated"]["population"].toLocaleString("en-US")}
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{"percent_of_households" in resultsJsonA["not_dislocated"]
									? round(resultsJsonA["not_dislocated"]["percent_of_households"], 1)
									: round(resultsJsonA["not_dislocated"]["percent_of_population"], 1)}
                                %
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableDataCell}>
                                B
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{"households" in resultsJsonB["not_dislocated"]
									? resultsJsonB["not_dislocated"]["households"].toLocaleString("en-US")
									: resultsJsonB["not_dislocated"]["population"].toLocaleString("en-US")}
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{"percent_of_households" in resultsJsonB["not_dislocated"]
									? round(resultsJsonB["not_dislocated"]["percent_of_households"], 1)
									: round(resultsJsonB["not_dislocated"]["percent_of_population"], 1)}
                                %
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableDataCell}>
								<CompareArrowsIcon style={{ transform: "rotate(90deg)" }} />
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{"households" in resultsJsonA["not_dislocated"] && "households" in resultsJsonB["not_dislocated"]
									? diff(resultsJsonB["not_dislocated"]["households"],
										resultsJsonA["not_dislocated"]["households"])
									: diff(resultsJsonB["not_dislocated"]["population"],
										resultsJsonA["not_dislocated"]["population"])
								}
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{"percent_of_households" in resultsJsonA["not_dislocated"] && "percent_of_households" in resultsJsonB["not_dislocated"]
									? percentDiff(resultsJsonB["not_dislocated"]["percent_of_households"],
										resultsJsonA["not_dislocated"]["percent_of_households"])
									: percentDiff(resultsJsonB["not_dislocated"]["percent_of_population"],
										resultsJsonA["not_dislocated"]["percent_of_population"])
								}
							</TableCell>
						</TableRow>

						{/*total*/}
						<TableRow>
							<TableCell className={classes.tableRowTotal} rowSpan={3}> Total </TableCell>
							<TableCell className={classes.tableDataCell}>
                                A
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{"households" in resultsJsonA["total"]
									? resultsJsonA["total"]["households"].toLocaleString("en-US")
									: resultsJsonA["total"]["population"].toLocaleString("en-US")}
							</TableCell>
							<TableCell className={classes.tableDataCell} />
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableDataCell}>
                                B
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{"households" in resultsJsonA["total"]
									? resultsJsonB["total"]["households"].toLocaleString("en-US")
									: resultsJsonB["total"]["population"].toLocaleString("en-US")}
							</TableCell>
							<TableCell className={classes.tableDataCell} />
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableDataCell}>
								<CompareArrowsIcon style={{ transform: "rotate(90deg)" }} />
							</TableCell>
							<TableCell className={classes.tableDataCell}>
								{"households" in resultsJsonA["total"] && "households" in resultsJsonB["total"]
									? diff(resultsJsonB["total"]["households"], resultsJsonA["total"]["households"])
									: diff(resultsJsonB["total"]["population"], resultsJsonA["total"]["population"])
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

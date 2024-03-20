import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { round } from "../../../utils/common";

const tableColumnHead = {
	color: "#FFFFFF",
	fontSize: "12px",
	fontWeight: "500",
	border: "solid 1px rgba(46,91,255,0.08)",
	borderRadius: "1px",
	width: "160px",
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
	borderBottom: "solid 1px #FFFFFF",
};

const useStyles = makeStyles({
	table: {
		maxWidth: 700,
		display: "block",
	},
	metricsTable: {
		display: "block",
		maxWidth: "fit-content",
		margin: "auto auto",
	},
	tableRowHeadFirst: {
		color: "#69707F",
		fontSize: "12px",
		fontWeight: "500",
		textAlign: "center",
		backgroundColor: "#F8F9FF",
		border: "solid 1px #FFFFFF",
	},
	tableRowHead: tableRowHead,
	tableRowHeadRight: {
		...tableRowHead,
		borderRight: "solid 1px #EAEEFF",
	},
	tableColumnHeadGreen: {
		...tableColumnHead,
		backgroundColor: "#A1BE2E",
		textAlign: "left",
	},
	tableColumnHeadRed: {
		...tableColumnHead,
		backgroundColor: "#CB5963",
		textAlign: "left",
	},
	tableColumnHeadDarkRed: {
		...tableColumnHead,
		backgroundColor: "#833841",
		textAlign: "left",
	},
	tableColumnHeadPurple: {
		...tableRowHead,
		textAlign: "left",
	},
	tableDataCell: {
		width: "100px",
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)",
	},
});

export function CGEResultsTableCompare(props) {
	let { resultsJsonArr, isMetrics, region, ...others } = props;

	if (
		resultsJsonArr === null ||
		resultsJsonArr.length < 2 ||
		resultsJsonArr[0] === null ||
		resultsJsonArr[1] === null
	) {
		return null;
	}

	let headers = [""];
	let beforeJson = resultsJsonArr[0]["beforeEvent"];
	let afterJsonA = resultsJsonArr[0]["afterEvent"];
	let afterJsonB = resultsJsonArr[1]["afterEvent"];
	let percentageChangeA = resultsJsonArr[0]["%_change"];
	let percentageChangeB = resultsJsonArr[1]["%_change"];

	if (region) {
		let filterFunc = ([key]) => {
			if (region.startsWith("R") || (key.startsWith("H") && !/\d$/.test(key))) {
				return key.endsWith(region);
			}

			return key.startsWith(region);
		};

		beforeJson = Object.fromEntries(
			Object.entries(beforeJson).filter(filterFunc),
		);
		afterJsonA = Object.fromEntries(
			Object.entries(afterJsonA).filter(filterFunc),
		);
		percentageChangeA = Object.fromEntries(
			Object.entries(percentageChangeA).filter(filterFunc),
		);
		afterJsonB = Object.fromEntries(
			Object.entries(afterJsonB).filter(filterFunc),
		);
		percentageChangeB = Object.fromEntries(
			Object.entries(percentageChangeB).filter(filterFunc),
		);
	}

	// Eliminate duplicate keys. Also, handles the case where before and after has different number of groups
	headers = [
		...headers,
		...new Set([
			...Object.keys(afterJsonA),
			...Object.keys(beforeJson),
			...Object.keys(percentageChangeA),
		]),
	];
	const headerSize = headers.length;

	const classes = useStyles();

	return (
		<div>
			<TableContainer>
				<Table
					className={isMetrics ? classes.metricsTable : classes.table}
					size="small"
					aria-label="a dense table"
				>
					<TableHead>
						<TableRow>
							{headers.map((header, idx) => {
								let headClass = classes.tableRowHead;
								if (idx === 0) {
									headClass = classes.tableRowHeadFirst;
								} else if (idx === headerSize - 1) {
									headClass = classes.tableRowHeadRight;
								}
								return (
									<TableCell className={headClass} key={idx}>
										{header}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell
								className={classes.tableColumnHeadGreen}
								sx={{ textAlign: "left", paddingLeft: 0 }}
							>
								{" "}
								Before Event{" "}
							</TableCell>
							{headers.slice(1).map((header, idx) => {
								return (
									<TableCell className={classes.tableDataCell} key={idx}>
										{beforeJson[header] !== undefined
											? round(beforeJson[header], 1)
											: "-"}
									</TableCell>
								);
							})}
						</TableRow>

						<TableRow>
							<TableCell
								className={classes.tableColumnHeadRed}
								sx={{ textAlign: "left", paddingLeft: 0 }}
							>
								A
							</TableCell>
							{headers.slice(1).map((header, idx) => {
								return (
									<TableCell className={classes.tableDataCell} key={idx}>
										{afterJsonA[header] !== undefined
											? round(afterJsonA[header], 1)
											: "-"}
									</TableCell>
								);
							})}
						</TableRow>

						<TableRow>
							<TableCell className={classes.tableColumnHeadRed}>
								% of Change
							</TableCell>
							{headers.slice(1).map((header, idx) => {
								return (
									<TableCell className={classes.tableDataCell} key={idx}>
										{percentageChangeA[header] !== undefined
											? `${round(percentageChangeA[header], 1)} %`
											: "-"}
									</TableCell>
								);
							})}
						</TableRow>

						<TableRow>
							<TableCell className={classes.tableColumnHeadDarkRed}>
								B
							</TableCell>
							{headers.slice(1).map((header, idx) => {
								return (
									<TableCell className={classes.tableDataCell} key={idx}>
										{afterJsonB[header] !== undefined
											? round(afterJsonB[header], 1)
											: "-"}
									</TableCell>
								);
							})}
						</TableRow>

						<TableRow>
							<TableCell className={classes.tableColumnHeadDarkRed}>
								% of Change
							</TableCell>
							{headers.slice(1).map((header, idx) => {
								return (
									<TableCell className={classes.tableDataCell} key={idx}>
										{percentageChangeB[header] !== undefined
											? `${round(percentageChangeB[header], 1)} %`
											: "-"}
									</TableCell>
								);
							})}
						</TableRow>

						<TableRow>
							<TableCell className={classes.tableColumnHeadPurple}>
								Difference between A and B
							</TableCell>
							{headers.slice(1).map((header, idx) => {
								return (
									<TableCell className={classes.tableDataCell} key={idx}>
										{afterJsonA[header] === undefined &&
										afterJsonB[header] === undefined
											? "-"
											: round(afterJsonB[header] - afterJsonA[header], 1) > 0
											  ? `+${round(
														afterJsonB[header] - afterJsonA[header],
														1,
											    )}`
											  : round(afterJsonB[header] - afterJsonA[header], 1)}
									</TableCell>
								);
							})}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

import React, { useState } from "react";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles({
	table: {
		backgroundColor: "#FFFFFF",
		minWidth: "1135px",
	},
	tableContainer: {
		height: "400px",
	},
	tableHeaderRow: {
		height: "34px",
	},
	tableHeaderCell: {
		height: "14px",
		width: "37px",
		color: "#FFFFFF",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1.13px",
		lineHeight: "14px",
		textAlign: "center",
		textTransform: "uppercase",
	},
	tableBodyRow: {
		height: "28px",
	},
	tableBodyCell: {
		height: "21px",
		width: "123px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "18px",
		border: "1px solid rgba(46,91,255,0.08)",
	},
	tableBodyCategoryCell: {
		height: "21px",
		width: "209px",
		color: "#2E384D",
		fontSize: "18px",
		fontWeight: 500,
		letterSpacing: 0,
		lineHeight: "18px",
		textTransform: "capitalize",
		border: "1px solid rgba(46,91,255,0.08)",
	},
	tableBodyClusterCell: {
		height: "21px",
		width: "440px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "18px",
		border: "1px solid rgba(46,91,255,0.08)",
	},
	switchBase: {
		"&$checked": {
			color: "#00619D",
		},
		"&$checked + $track": {
			backgroundColor: "#00619D",
		},
	},
	checked: {},
	track: {},
});

const NA_value = -1; // TODO need to change to -1

function fillNA(obj, currentKey, keys) {
	let NA_display = obj[currentKey];
	if (!(currentKey in obj)) {
		NA_display = 0; // Return 0 if currentKey was not in obj
	}

	// If any of the keys in keys is in obj and its value is NA_value, overwrite it with "-"
	keys.forEach((key) => {
		if (key in obj && obj[key] === NA_value) {
			NA_display = "-";
		}
	});

	return NA_display;
}

function calcClusterNumInCategory(fields) {
	let count = {};
	fields["by_category"].map((categoryItem) => {
		count[categoryItem["category"]] = 0;

		fields["by_cluster"].map((clusterItem) => {
			if (clusterItem["category"] === categoryItem["category"]) {
				count[categoryItem["category"]] += 1;
			}
		});
	});

	return count;
}

function calcPercentage(partialValue, items, tableHeaders) {
	let totalValue = 0;
	for (let i = 0; i < 4; i++) {
		const key = tableHeaders[i];
		totalValue += items[key];
	}

	if (partialValue === NA_value) {
		return "";
	}
	if (totalValue === 0) {
		return " (0%)";
	}
	return ` (${parseFloat(((100 * partialValue) / totalValue).toFixed(2))}%)`;
}

export function BldgDamageTable(props) {
	const { fields } = props;
	const [percentOn, setPercentOn] = useState(false);

	function handleChange() {
		setPercentOn((percentOn) => !percentOn);
	}

	// e.g.
	// Community Recovery: 5
	// Critical Facilities: 4
	// "Emergency Housing ": 3
	// Housing / Neighborhood: 7
	let clusterNumInCategory = calcClusterNumInCategory(fields);

	const classes = useStyles();

	let tableHeaders = ["Insignificant", "Moderate", "Extensive", "Complete"];
	if (fields && "Insignificant" in fields["by_category"][0]) {
		tableHeaders = ["Insignificant", "Moderate", "Extensive", "Complete"];
	} else if (fields && "Affected" in fields["by_category"][0]) {
		tableHeaders = ["Affected", "Minor", "Major", "Destroyed"];
	} else {
		tableHeaders = ["DS_0", "DS_1", "DS_2", "DS_3"];
	}

	return (
		<TableContainer className={classes.tableContainer}>
			<Box style={{ float: "right" }}>
				<FormControlLabel
					control={
						<Switch
							checked={percentOn}
							onChange={(e) => handleChange()}
							color="default"
							classes={{
								switchBase: classes.switchBase,
								checked: classes.checked,
								track: classes.track,
							}}
						/>
					}
					label="View Percentage"
				/>
			</Box>
			<Table
				stickyHeader
				className={classes.table}
				size="small"
				aria-label="a dense table"
			>
				<TableHead>
					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						<TableCell
							style={{
								width: "647px",
								backgroundColor: "#EFF2FF",
								color: "#69707F",
							}}
							colSpan={2}
							className={classes.tableHeaderCell}
							key="playbook-building-clusters"
						>
							playbook builiding clusters
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#96B712" }}
							className={classes.tableHeaderCell}
							key={tableHeaders[0]}
						>
							{tableHeaders[0]}
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#F7C137" }}
							className={classes.tableHeaderCell}
							key={tableHeaders[1]}
						>
							{tableHeaders[1]}
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#ED8036" }}
							className={classes.tableHeaderCell}
							key={tableHeaders[2]}
						>
							{tableHeaders[2]}
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#D63649" }}
							className={classes.tableHeaderCell}
							key={tableHeaders[3]}
						>
							{tableHeaders[3]}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						// TODO this is not working
						fields["by_category"].map((categoryItem, _) => {
							let firstMatchIdxx = -1;
							return (
								<>
									{fields["by_cluster"].map((clusterItem, idxx) => {
										if (clusterItem["category"] === categoryItem["category"]) {
											if (firstMatchIdxx < 0) firstMatchIdxx = idxx;
											return (
												<TableRow
													className={classes.tableBodyRow}
													key={clusterItem["cluster"]}
												>
													{idxx === firstMatchIdxx ? (
														<TableCell
															rowSpan={
																clusterNumInCategory[categoryItem["category"]] +
																1
															}
															align="center"
															className={classes.tableBodyCategoryCell}
															style={{ fontWeight: 500, textAlign: "left" }}
														>
															{categoryItem["category"]}
														</TableCell>
													) : null}
													<TableCell
														key={idxx}
														className={classes.tableBodyClusterCell}
													>
														{clusterItem["cluster"]}
													</TableCell>
													<TableCell
														key={`${idxx}-insig`}
														className={classes.tableBodyCell}
													>
														<td>
															{fillNA(
																clusterItem,
																tableHeaders[0],
																tableHeaders,
															)}
														</td>
														<td
															style={
																percentOn
																	? {
																			visibility: "visible",
																			color: "#A9A9A9",
																	  }
																	: { visibility: "hidden" }
															}
														>
															{calcPercentage(
																clusterItem[tableHeaders[0]],
																clusterItem,
																tableHeaders,
															)}
														</td>
													</TableCell>
													<TableCell
														key={`${idxx}-mod`}
														className={classes.tableBodyCell}
													>
														<td>
															{fillNA(
																clusterItem,
																tableHeaders[1],
																tableHeaders,
															)}
														</td>
														<td
															style={
																percentOn
																	? {
																			visibility: "visible",
																			color: "#A9A9A9",
																	  }
																	: { visibility: "hidden" }
															}
														>
															{calcPercentage(
																clusterItem[tableHeaders[1]],
																clusterItem,
																tableHeaders,
															)}
														</td>
													</TableCell>
													<TableCell
														key={`${idxx}-extensi`}
														className={classes.tableBodyCell}
													>
														<td>
															{fillNA(
																clusterItem,
																tableHeaders[2],
																tableHeaders,
															)}
														</td>
														<td
															style={
																percentOn
																	? {
																			visibility: "visible",
																			color: "#A9A9A9",
																	  }
																	: { visibility: "hidden" }
															}
														>
															{calcPercentage(
																clusterItem[tableHeaders[2]],
																clusterItem,
																tableHeaders,
															)}
														</td>
													</TableCell>
													<TableCell
														key={`${idxx}-comp`}
														className={classes.tableBodyCell}
													>
														<td>
															{fillNA(
																clusterItem,
																tableHeaders[3],
																tableHeaders,
															)}
														</td>
														<td
															style={
																percentOn
																	? {
																			visibility: "visible",
																			color: "#A9A9A9",
																	  }
																	: { visibility: "hidden" }
															}
														>
															{calcPercentage(
																clusterItem[tableHeaders[3]],
																clusterItem,
																tableHeaders,
															)}
														</td>
													</TableCell>
												</TableRow>
											);
										}
									})}
									<TableRow
										className={classes.tableBodyRow}
										key={categoryItem["id"]}
									>
										<TableCell
											key="total"
											className={classes.tableBodyClusterCell}
											style={{
												fontWeight: 500,
												textAlign: "right",
												backgroundColor: "#EEF3F5",
											}}
										>
											TOTAL
										</TableCell>
										<TableCell
											key="total-insig"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>
												{fillNA(categoryItem, tableHeaders[0], tableHeaders)}
											</td>
											<td
												style={
													percentOn
														? { visibility: "visible", color: "#A9A9A9" }
														: { visibility: "hidden" }
												}
											>
												{categoryItem[tableHeaders[0]] === NA_value
													? ""
													: calcPercentage(
															categoryItem[tableHeaders[0]],
															categoryItem,
															tableHeaders,
													  )}
											</td>
										</TableCell>
										<TableCell
											key="total-mod"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>
												{fillNA(categoryItem, tableHeaders[1], tableHeaders)}
											</td>
											<td
												style={
													percentOn
														? { visibility: "visible", color: "#A9A9A9" }
														: { visibility: "hidden" }
												}
											>
												{categoryItem[tableHeaders[1]] === NA_value
													? ""
													: calcPercentage(
															categoryItem[tableHeaders[1]],
															categoryItem,
															tableHeaders,
													  )}
											</td>
										</TableCell>
										<TableCell
											key="total-extensi"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>
												{fillNA(categoryItem, tableHeaders[2], tableHeaders)}
											</td>
											<td
												style={
													percentOn
														? { visibility: "visible", color: "#A9A9A9" }
														: { visibility: "hidden" }
												}
											>
												{categoryItem[tableHeaders[2]] === NA_value
													? ""
													: calcPercentage(
															categoryItem[tableHeaders[2]],
															categoryItem,
															tableHeaders,
													  )}
											</td>
										</TableCell>
										<TableCell
											key="total-comp"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>
												{fillNA(categoryItem, tableHeaders[3], tableHeaders)}
											</td>
											<td
												style={
													percentOn
														? { visibility: "visible", color: "#A9A9A9" }
														: { visibility: "hidden" }
												}
											>
												{categoryItem[tableHeaders[3]] === NA_value
													? ""
													: calcPercentage(
															categoryItem[tableHeaders[3]],
															categoryItem,
															tableHeaders,
													  )}
											</td>
										</TableCell>
									</TableRow>
								</>
							);
						})
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

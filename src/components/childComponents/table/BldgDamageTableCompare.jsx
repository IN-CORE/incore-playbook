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
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import BldgDmgDiffBarChart from "../graph/BldgDmgDiffBarChart";

const useStyles = makeStyles({
	table: {
		backgroundColor: "#FFFFFF",
		minWidth: "1135px",
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
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "18px",
		border: "1px solid rgba(46,91,255,0.08)",
		textAlign: "center",
		paddingRight: "16px",
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
});

const NA_value = -1; // TODO need to change to -1

function calcClusterNumInCategory(fields) {
	let count = {};
	fields["by_category"].map((categoryItemA) => {
		count[categoryItemA["category"]] = 0;

		fields["by_cluster"].map((clusterItemA) => {
			if (clusterItemA["category"] === categoryItemA["category"]) {
				count[categoryItemA["category"]] += 1;
			}
		});
	});

	return count;
}

function calcPercentage(partialValue, totalValue) {
	if (partialValue === NA_value) {
		return "";
	}
	if (totalValue === 0) {
		return " (0%)";
	}
	return ` (${parseFloat(((100 * partialValue) / totalValue).toFixed(2))}%)`;
}

function checkNA(obj, key) {
	return obj[key] === NA_value || !(key in obj);
}

function fillNA(obj, currentKey, keys) {
	let NA_display = "-";
	if (!(currentKey in obj)) {
		NA_display = "0"; // Return "0" if currentKey was not in obj
	}

	// If any of the keys in keys is in obj and its value is NA_value, overwrite it with "-"
	keys.forEach((key) => {
		if (key in obj && obj[key] === NA_value) {
			NA_display = "-";
		}
	});

	return NA_display;
}

export function BldgDamageTableCompare(props) {
	const { fieldsA, fieldsB } = props;

	// e.g.
	// Community Recovery: 5
	// Critical Facilities: 4
	// "Emergency Housing ": 3
	// Housing / Neighborhood: 7
	// Assume A and B has exact same shape
	let clusterNumInCategory = calcClusterNumInCategory(fieldsA);

	const classes = useStyles();

	// backward compatibility with different table headers
	let tableHeadersA = ["Insignificant", "Moderate", "Extensive", "Complete"];
	let tableHeadersB = ["Insignificant", "Moderate", "Extensive", "Complete"];
	if (fieldsA && "Insignificant" in fieldsA["by_category"][0]) {
		tableHeadersA = ["Insignificant", "Moderate", "Extensive", "Complete"];
	} else if (fieldsA && "Affected" in fieldsA["by_category"][0]) {
		tableHeadersA = ["Affected", "Minor", "Major", "Destroyed"];
	} else {
		tableHeadersA = ["DS_0", "DS_1", "DS_2", "DS_3"];
	}
	if (fieldsB && "Insignificant" in fieldsB["by_category"][0]) {
		tableHeadersB = ["Insignificant", "Moderate", "Extensive", "Complete"];
	} else if (fieldsB && "Affected" in fieldsB["by_category"][0]) {
		tableHeadersB = ["Affected", "Minor", "Major", "Destroyed"];
	} else {
		tableHeadersB = ["DS_0", "DS_1", "DS_2", "DS_3"];
	}

	return (
		<TableContainer>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					{/*["playbook builidng clusters", "DS_0", "DS_1", "DS_2", "DS_3"];*/}
					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						<TableCell
							style={{
								width: "647px",
								backgroundColor: "#EFF2FF",
								color: "#69707F",
							}}
							colSpan={3}
							className={classes.tableHeaderCell}
							key="playbook-building-clusters"
						>
							playbook builidng clusters
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#96B712" }}
							className={classes.tableHeaderCell}
							key={tableHeadersA[0]}
						>
							{tableHeadersA[0]}
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#F7C137" }}
							className={classes.tableHeaderCell}
							key={tableHeadersA[1]}
						>
							{tableHeadersA[1]}
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#ED8036" }}
							className={classes.tableHeaderCell}
							key={tableHeadersA[2]}
						>
							{tableHeadersA[2]}
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#D63649" }}
							className={classes.tableHeaderCell}
							key={tableHeadersA[3]}
						>
							{tableHeadersA[3]}
						</TableCell>
						<TableCell
							style={{
								width: "25%",
								backgroundColor: "#EFF2FF",
								color: "#69707F",
							}}
							className={classes.tableHeaderCell}
							key="percent-change"
						>
							% of Change
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{fieldsA["by_category"].map((categoryItemA, idx) => {
						const categoryItemB = fieldsB["by_category"][idx];
						let firstMatchIdxx = -1;
						return (
							<>
								{fieldsA["by_cluster"].map((clusterItemA, idxx) => {
									const clusterItemB = fieldsB["by_cluster"][idxx];
									if (clusterItemA["category"] === categoryItemA["category"]) {
										if (firstMatchIdxx < 0) firstMatchIdxx = idxx;
										return (
											<>
												{/*A:*/}
												<TableRow
													className={classes.tableBodyRow}
													key={clusterItemA["cluster"]}
												>
													{idxx === firstMatchIdxx ? (
														<TableCell
															rowSpan={
																(clusterNumInCategory[
																	categoryItemA["category"]
																] +
																	1) *
																3
															}
															align="center"
															className={classes.tableBodyCategoryCell}
															style={{ fontWeight: 500, textAlign: "left" }}
														>
															{categoryItemA["category"]}
														</TableCell>
													) : null}
													<TableCell
														key={idxx}
														className={classes.tableBodyClusterCell}
														rowSpan={3}
													>
														{clusterItemA["cluster"]}
													</TableCell>
													<TableCell
														key={`${idxx}-A`}
														className={classes.tableBodyCell}
													>
														A
													</TableCell>
													<TableCell
														key={`${idxx}-insig`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemA, tableHeadersA[0])
															? fillNA(
																	clusterItemA,
																	tableHeadersA[0],
																	tableHeadersA,
															  )
															: clusterItemA[tableHeadersA[0]]}
													</TableCell>
													<TableCell
														key={`${idxx}-mod`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemA, tableHeadersA[1])
															? fillNA(
																	clusterItemA,
																	tableHeadersA[1],
																	tableHeadersA,
															  )
															: clusterItemA[tableHeadersA[1]]}
													</TableCell>
													<TableCell
														key={`${idxx}-extensi`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemA, tableHeadersA[2])
															? fillNA(
																	clusterItemA,
																	tableHeadersA[2],
																	tableHeadersA,
															  )
															: clusterItemA[tableHeadersA[2]]}
													</TableCell>
													<TableCell
														key={`${idxx}-comp`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemA, tableHeadersA[3])
															? fillNA(
																	clusterItemA,
																	tableHeadersA[3],
																	tableHeadersA,
															  )
															: clusterItemA[tableHeadersA[3]]}
													</TableCell>
													{/*barchart*/}
													<TableCell
														key={`${idxx}-barchart`}
														className={classes.tableBodyCell}
														rowSpan={3}
													>
														{clusterItemA[tableHeadersA[0]] !== NA_value &&
														clusterItemB[tableHeadersB[0]] !== NA_value &&
														clusterItemA[tableHeadersA[1]] !== NA_value &&
														clusterItemB[tableHeadersB[1]] !== NA_value &&
														clusterItemA[tableHeadersA[2]] !== NA_value &&
														clusterItemB[tableHeadersB[2]] !== NA_value &&
														clusterItemA[tableHeadersA[3]] !== NA_value &&
														clusterItemB[tableHeadersB[3]] !== NA_value ? (
															<BldgDmgDiffBarChart
																headers={tableHeadersA}
																data={[
																	parseFloat(clusterItemB[tableHeadersB[0]]) -
																		parseFloat(clusterItemA[tableHeadersA[0]]),
																	parseFloat(clusterItemB[tableHeadersB[1]]) -
																		parseFloat(clusterItemA[tableHeadersA[1]]),
																	parseFloat(clusterItemB[tableHeadersB[2]]) -
																		parseFloat(clusterItemA[tableHeadersA[2]]),
																	parseFloat(clusterItemB[tableHeadersB[3]]) -
																		parseFloat(clusterItemA[tableHeadersA[3]]),
																]}
															/>
														) : (
															<></>
														)}
													</TableCell>
												</TableRow>
												{/*B:*/}
												<TableRow
													className={classes.tableBodyRow}
													key={clusterItemB["cluster"]}
												>
													<TableCell
														key={`${idxx}-B`}
														className={classes.tableBodyCell}
													>
														B
													</TableCell>
													<TableCell
														key={`${idxx}-insig`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemB, tableHeadersB[0])
															? fillNA(
																	clusterItemB,
																	tableHeadersB[0],
																	tableHeadersB,
															  )
															: clusterItemB[tableHeadersB[0]]}
													</TableCell>
													<TableCell
														key={`${idxx}-mod`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemB, tableHeadersB[1])
															? fillNA(
																	clusterItemB,
																	tableHeadersB[1],
																	tableHeadersB,
															  )
															: clusterItemB[tableHeadersB[1]]}
													</TableCell>
													<TableCell
														key={`${idxx}-extensi`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemB, tableHeadersB[2])
															? fillNA(
																	clusterItemB,
																	tableHeadersB[2],
																	tableHeadersB,
															  )
															: clusterItemB[tableHeadersB[2]]}
													</TableCell>
													<TableCell
														key={`${idxx}-comp`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemB, tableHeadersB[3])
															? fillNA(
																	clusterItemB,
																	tableHeadersB[3],
																	tableHeadersB,
															  )
															: clusterItemB[tableHeadersB[3]]}
													</TableCell>
												</TableRow>
												{/*Diff:*/}
												<TableRow
													className={classes.tableBodyRow}
													key={`${clusterItemB["cluster"]}-diff`}
												>
													<TableCell
														key={`${idxx}-diff`}
														className={classes.tableBodyCell}
													>
														<CompareArrowsIcon
															style={{ transform: "rotate(90deg)" }}
														/>
													</TableCell>
													<TableCell
														key={`${idxx}-insig`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemA, tableHeadersA[0]) ||
														checkNA(clusterItemB, tableHeadersB[0])
															? fillNA(
																	clusterItemA,
																	tableHeadersA[0],
																	tableHeadersA,
															  ) === "0" &&
															  fillNA(
																	clusterItemB,
																	tableHeadersB[0],
																	tableHeadersB,
															  ) === "0"
																? "0"
																: "-"
															: parseFloat(clusterItemB[tableHeadersB[0]]) -
																		parseFloat(clusterItemA[tableHeadersA[0]]) >
															    0
															  ? `+${
																		parseFloat(clusterItemB[tableHeadersB[0]]) -
																		parseFloat(clusterItemA[tableHeadersA[0]])
															    }`
															  : parseFloat(clusterItemB[tableHeadersB[0]]) -
															    parseFloat(clusterItemA[tableHeadersA[0]])}
													</TableCell>
													<TableCell
														key={`${idxx}-mod`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemA, tableHeadersA[1]) ||
														checkNA(clusterItemB, tableHeadersB[1])
															? fillNA(
																	clusterItemA,
																	tableHeadersA[1],
																	tableHeadersA,
															  ) === "0" &&
															  fillNA(
																	clusterItemB,
																	tableHeadersB[1],
																	tableHeadersB,
															  ) === "0"
																? "0"
																: "-"
															: parseFloat(clusterItemB[tableHeadersB[1]]) -
																		parseFloat(clusterItemA[tableHeadersA[1]]) >
															    0
															  ? `+${
																		parseFloat(clusterItemB[tableHeadersB[1]]) -
																		parseFloat(clusterItemA[tableHeadersA[1]])
															    }`
															  : parseFloat(clusterItemB[tableHeadersB[1]]) -
															    parseFloat(clusterItemA[tableHeadersA[1]])}
													</TableCell>
													<TableCell
														key={`${idxx}-extensi`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemA, tableHeadersA[2]) ||
														checkNA(clusterItemB, tableHeadersB[2])
															? fillNA(
																	clusterItemA,
																	tableHeadersA[2],
																	tableHeadersA,
															  ) === "0" &&
															  fillNA(
																	clusterItemB,
																	tableHeadersB[2],
																	tableHeadersB,
															  ) === "0"
																? "0"
																: "-"
															: parseFloat(clusterItemB[tableHeadersB[2]]) -
																		parseFloat(clusterItemA[tableHeadersA[2]]) >
															    0
															  ? `+${
																		parseFloat(clusterItemB[tableHeadersB[2]]) -
																		parseFloat(clusterItemA[tableHeadersA[2]])
															    }`
															  : parseFloat(clusterItemB[tableHeadersB[2]]) -
															    parseFloat(clusterItemA[tableHeadersA[2]])}
													</TableCell>
													<TableCell
														key={`${idxx}-comp`}
														className={classes.tableBodyCell}
													>
														{checkNA(clusterItemA, tableHeadersA[3]) ||
														checkNA(clusterItemB, tableHeadersB[3])
															? fillNA(
																	clusterItemA,
																	tableHeadersA[3],
																	tableHeadersA,
															  ) === "0" &&
															  fillNA(
																	clusterItemB,
																	tableHeadersB[3],
																	tableHeadersB,
															  ) === "0"
																? "0"
																: "-"
															: parseFloat(clusterItemB[tableHeadersA[3]]) -
																		parseFloat(clusterItemA[tableHeadersA[3]]) >
															    0
															  ? `+${
																		parseFloat(clusterItemB[tableHeadersB[3]]) -
																		parseFloat(clusterItemA[tableHeadersA[3]])
															    }`
															  : parseFloat(clusterItemB[tableHeadersB[3]]) -
															    parseFloat(clusterItemA[tableHeadersA[3]])}
													</TableCell>
												</TableRow>
											</>
										);
									}
								})}
								{/*A:*/}
								<TableRow
									className={classes.tableBodyRow}
									key={categoryItemA["id"]}
								>
									<TableCell
										key="total"
										className={classes.tableBodyClusterCell}
										style={{
											fontWeight: 500,
											textAlign: "right",
											backgroundColor: "#EEF3F5",
										}}
										rowSpan={3}
									>
										TOTAL
									</TableCell>
									<TableCell
										key="total-A"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										A
									</TableCell>
									<TableCell
										key="total-insig"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemA, tableHeadersA[0])
											? fillNA(categoryItemA, tableHeadersA[0], tableHeadersA)
											: categoryItemA[tableHeadersA[0]]}
									</TableCell>
									<TableCell
										key="total-mod"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemA, tableHeadersA[1])
											? fillNA(categoryItemA, tableHeadersA[1], tableHeadersA)
											: categoryItemA[tableHeadersA[1]]}
									</TableCell>
									<TableCell
										key="total-extensi"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemA, tableHeadersA[2])
											? fillNA(categoryItemA, tableHeadersA[2], tableHeadersA)
											: categoryItemA[tableHeadersA[2]]}
									</TableCell>
									<TableCell
										key="total-comp"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemA, tableHeadersA[3])
											? fillNA(categoryItemA, tableHeadersA[3], tableHeadersA)
											: categoryItemA[tableHeadersA[3]]}
									</TableCell>
									{/*barchart*/}
									<TableCell
										key="total-barchart"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										rowSpan={3}
									>
										{categoryItemA[tableHeadersA[0]] !== NA_value &&
										categoryItemB[tableHeadersB[0]] !== NA_value &&
										categoryItemA[tableHeadersA[1]] !== NA_value &&
										categoryItemB[tableHeadersB[1]] !== NA_value &&
										categoryItemA[tableHeadersA[2]] !== NA_value &&
										categoryItemB[tableHeadersB[2]] !== NA_value &&
										categoryItemA[tableHeadersA[3]] !== NA_value &&
										categoryItemB[tableHeadersB[3]] !== NA_value ? (
											<BldgDmgDiffBarChart
												headers={tableHeadersA}
												data={[
													parseFloat(categoryItemB[tableHeadersB[0]]) -
														parseFloat(categoryItemA[tableHeadersA[0]]),
													parseFloat(categoryItemB[tableHeadersB[1]]) -
														parseFloat(categoryItemA[tableHeadersA[1]]),
													parseFloat(categoryItemB[tableHeadersB[2]]) -
														parseFloat(categoryItemA[tableHeadersA[2]]),
													parseFloat(categoryItemB[tableHeadersB[3]]) -
														parseFloat(categoryItemA[tableHeadersA[3]]),
												]}
											/>
										) : (
											<></>
										)}
									</TableCell>
								</TableRow>
								{/*B:*/}
								<TableRow
									className={classes.tableBodyRow}
									key={categoryItemB["id"]}
								>
									<TableCell
										key="total-B"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										B
									</TableCell>
									<TableCell
										key="total-insig"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemB, tableHeadersB[0])
											? fillNA(categoryItemB, tableHeadersB[0], tableHeadersB)
											: categoryItemB[tableHeadersB[0]]}
									</TableCell>
									<TableCell
										key="total-mod"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemB, tableHeadersB[1])
											? fillNA(categoryItemB, tableHeadersB[1], tableHeadersB)
											: categoryItemB[tableHeadersB[1]]}
									</TableCell>
									<TableCell
										key="total-extensi"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemB, tableHeadersB[2])
											? fillNA(categoryItemB, tableHeadersB[2], tableHeadersB)
											: categoryItemB[tableHeadersB[2]]}
									</TableCell>
									<TableCell
										key="total-comp"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemB, tableHeadersB[3])
											? fillNA(categoryItemB, tableHeadersB[3], tableHeadersB)
											: categoryItemB[tableHeadersB[3]]}
									</TableCell>
								</TableRow>
								{/*Diff:*/}
								<TableRow
									className={classes.tableBodyRow}
									key={`${categoryItemB["id"]}-diff`}
								>
									<TableCell
										key="total-diff"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										<CompareArrowsIcon style={{ transform: "rotate(90deg)" }} />
									</TableCell>
									<TableCell
										key="total-insig"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemA, tableHeadersA[0]) ||
										checkNA(categoryItemB, tableHeadersB[0])
											? fillNA(
													categoryItemA,
													tableHeadersA[0],
													tableHeadersA,
											  ) === "0" &&
											  fillNA(
													categoryItemB,
													tableHeadersB[0],
													tableHeadersB,
											  ) === "0"
												? "0"
												: "-"
											: parseFloat(categoryItemB[tableHeadersB[0]]) -
														parseFloat(categoryItemA[tableHeadersA[0]]) >
											    0
											  ? `+${
														parseFloat(categoryItemB[tableHeadersB[0]]) -
														parseFloat(categoryItemA[tableHeadersA[0]])
											    }`
											  : parseFloat(categoryItemB[tableHeadersB[0]]) -
											    parseFloat(categoryItemA[tableHeadersA[0]])}
									</TableCell>
									<TableCell
										key="total-mod"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemA, tableHeadersA[1]) ||
										checkNA(categoryItemB, tableHeadersB[1])
											? fillNA(
													categoryItemA,
													tableHeadersA[1],
													tableHeadersA,
											  ) === "0" &&
											  fillNA(
													categoryItemB,
													tableHeadersB[1],
													tableHeadersB,
											  ) === "0"
												? "0"
												: "-"
											: parseFloat(categoryItemB[tableHeadersB[1]]) -
														parseFloat(categoryItemA[tableHeadersA[1]]) >
											    0
											  ? `+${
														parseFloat(categoryItemB[tableHeadersB[1]]) -
														parseFloat(categoryItemA[tableHeadersA[1]])
											    }`
											  : parseFloat(categoryItemB[tableHeadersB[1]]) -
											    parseFloat(categoryItemA[tableHeadersA[1]])}
									</TableCell>
									<TableCell
										key="total-extensi"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemA, tableHeadersA[2]) ||
										checkNA(categoryItemB, tableHeadersB[2])
											? fillNA(
													categoryItemA,
													tableHeadersA[2],
													tableHeadersA,
											  ) === "0" &&
											  fillNA(
													categoryItemB,
													tableHeadersB[2],
													tableHeadersB,
											  ) === "0"
												? "0"
												: "-"
											: parseFloat(categoryItemB[tableHeadersB[2]]) -
														parseFloat(categoryItemA[tableHeadersA[2]]) >
											    0
											  ? `+${
														parseFloat(categoryItemB[tableHeadersB[2]]) -
														parseFloat(categoryItemA[tableHeadersA[2]])
											    }`
											  : parseFloat(categoryItemB[tableHeadersB[2]]) -
											    parseFloat(categoryItemA[tableHeadersA[2]])}
									</TableCell>
									<TableCell
										key="total-comp"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{checkNA(categoryItemA, tableHeadersA[3]) ||
										checkNA(categoryItemB, tableHeadersB[3])
											? fillNA(
													categoryItemA,
													tableHeadersA[3],
													tableHeadersA,
											  ) === "0" &&
											  fillNA(
													categoryItemB,
													tableHeadersB[3],
													tableHeadersB,
											  ) === "0"
												? "0"
												: "-"
											: parseFloat(categoryItemB[tableHeadersB[3]]) -
														parseFloat(categoryItemA[tableHeadersA[3]]) >
											    0
											  ? `+${
														parseFloat(categoryItemB[tableHeadersB[3]]) -
														parseFloat(categoryItemA[tableHeadersA[3]])
											    }`
											  : parseFloat(categoryItemB[tableHeadersB[3]]) -
											    parseFloat(categoryItemA[tableHeadersA[3]])}
									</TableCell>
								</TableRow>
							</>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

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
import { formatProbToPercent } from "../../../utils/common";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";

const useStyles = makeStyles({
	table: {
		backgroundColor: "#FFFFFF",
		minWidth: "1135px",
	},
	tableHeaderRow: {
		height: "34px",
	},
	tableTopHeaderRow: {
		textAlign: "center",
		border: "1px solid rgba(46,91,255,0.08)",
		height: "15px",
		textTransform: "uppercase",
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
	},
	tableBodyCategoryCell: {
		height: "21px",
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
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "18px",
		border: "1px solid rgba(46,91,255,0.08)",
	},
});

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

export function FunctionalityTableCompare(props) {
	const { funcResultsA, funcResultsB } = props;

	const NA_value = -1;

	let clusterNumInCategory = calcClusterNumInCategory(funcResultsA);

	const classes = useStyles();

	return (
		<TableContainer>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell
							style={{
								width: "647px",
								backgroundColor: "#EFF2FF",
								color: "#69707F",
							}}
							colSpan={3}
							rowSpan={2}
							className={classes.tableHeaderCell}
							key="playbook-building-clusters"
						>
							playbook building clusters
						</TableCell>
						<TableCell colSpan={2} className={classes.tableTopHeaderRow}>
							{" "}
							Percent (%){" "}
						</TableCell>
						<TableCell colSpan={2} className={classes.tableTopHeaderRow}>
							{" "}
							No. of Buildings{" "}
						</TableCell>
					</TableRow>

					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						<TableCell
							style={{ width: "121px", backgroundColor: "#96B712" }}
							className={classes.tableHeaderCell}
							key="funcPercent"
						>
							Functional
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#D63649" }}
							className={classes.tableHeaderCell}
							key="nonFunctPercent"
						>
							Non-Functional
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#96B712" }}
							className={classes.tableHeaderCell}
							key="FuncNum"
						>
							Functional
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#D63649" }}
							className={classes.tableHeaderCell}
							key="nonFuncNum"
						>
							Non-Functional
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{funcResultsA["by_category"].map((categoryItemA, idx) => {
						const categoryItemB = funcResultsB["by_category"][idx];
						let firstMatchIdxx = -1;
						return (
							<>
								{funcResultsA["by_cluster"].map((clusterItemA, idxx) => {
									const clusterItemB = funcResultsB["by_cluster"][idxx];

									// let style = {};
									let funcPercent = -1;
									// let nonFuncPercent = 100;

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
														key={`${idxx}-f1`}
														className={classes.tableBodyCell}
													>
														{clusterItemA["percent_functional"] === NA_value
															? "-"
															: formatProbToPercent(
																	clusterItemA["percent_functional"],
																	1,
															  )}
													</TableCell>
													<TableCell
														key={`${idxx}-nf1`}
														className={classes.tableBodyCell}
													>
														{clusterItemA["percent_non_functional"] === NA_value
															? "-"
															: formatProbToPercent(
																	clusterItemA["percent_non_functional"],
															  )}
													</TableCell>
													<TableCell
														key={`${idxx}-f2`}
														className={classes.tableBodyCell}
													>
														{clusterItemA["num_functional"] === NA_value
															? "-"
															: clusterItemA["num_functional"]}
													</TableCell>
													<TableCell
														key={`${idxx}-nf2`}
														className={classes.tableBodyCell}
													>
														{clusterItemA["num_non_functional"] === NA_value
															? "-"
															: clusterItemA["num_non_functional"]}
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
														key={`${idxx}-f1`}
														className={classes.tableBodyCell}
													>
														{clusterItemB["percent_functional"] === NA_value
															? "-"
															: formatProbToPercent(
																	clusterItemB["percent_functional"],
																	1,
															  )}
													</TableCell>
													<TableCell
														key={`${idxx}-nf1`}
														className={classes.tableBodyCell}
													>
														{clusterItemB["percent_non_functional"] === NA_value
															? "-"
															: formatProbToPercent(
																	clusterItemB["percent_non_functional"],
															  )}
													</TableCell>
													<TableCell
														key={`${idxx}-f2`}
														className={classes.tableBodyCell}
													>
														{clusterItemB["num_functional"] === NA_value
															? "-"
															: clusterItemB["num_functional"]}
													</TableCell>
													<TableCell
														key={`${idxx}-nf2`}
														className={classes.tableBodyCell}
													>
														{clusterItemB["num_non_functional"] === NA_value
															? "-"
															: clusterItemB["num_non_functional"]}
													</TableCell>
												</TableRow>
												{/*Diff:*/}
												<TableRow
													className={classes.tableBodyRow}
													key={clusterItemA["cluster"]}
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
														key={`${idxx}-f1`}
														className={classes.tableBodyCell}
													>
														{clusterItemA["percent_functional"] === NA_value ||
														clusterItemB["percent_functional"] === NA_value
															? "-"
															: parseFloat(clusterItemB["percent_functional"]) -
																		parseFloat(
																			clusterItemA["percent_functional"],
																		) >
															    0
															  ? `+${formatProbToPercent(
																		parseFloat(
																			clusterItemB["percent_functional"],
																		) -
																			parseFloat(
																				clusterItemA["percent_functional"],
																			),
																		1,
															    )}`
															  : formatProbToPercent(
																		parseFloat(
																			clusterItemB["percent_functional"],
																		) -
																			parseFloat(
																				clusterItemA["percent_functional"],
																			),
																		1,
															    )}
													</TableCell>
													<TableCell
														key={`${idxx}-nf1`}
														className={classes.tableBodyCell}
													>
														{clusterItemA["percent_non_functional"] ===
															NA_value ||
														clusterItemB["percent_non_functional"] === NA_value
															? "-"
															: parseFloat(
																		clusterItemB["percent_non_functional"],
															    ) -
																		parseFloat(
																			clusterItemA["percent_non_functional"],
																		) >
															    0
															  ? `+${formatProbToPercent(
																		parseFloat(
																			clusterItemB["percent_non_functional"],
																		) -
																			parseFloat(
																				clusterItemA["percent_non_functional"],
																			),
																		1,
															    )}`
															  : formatProbToPercent(
																		parseFloat(
																			clusterItemB["percent_non_functional"],
																		) -
																			parseFloat(
																				clusterItemA["percent_non_functional"],
																			),
																		1,
															    )}
													</TableCell>
													<TableCell
														key={`${idxx}-f2`}
														className={classes.tableBodyCell}
													>
														{clusterItemA["num_functional"] === NA_value ||
														clusterItemB["num_functional"] === NA_value
															? "-"
															: parseFloat(clusterItemB["num_functional"]) -
																		parseFloat(clusterItemA["num_functional"]) >
															    0
															  ? `+${
																		parseFloat(clusterItemB["num_functional"]) -
																		parseFloat(clusterItemA["num_functional"])
															    }`
															  : parseFloat(clusterItemB["num_functional"]) -
															    parseFloat(clusterItemA["num_functional"])}
													</TableCell>
													<TableCell
														key={`${idxx}-nf2`}
														className={classes.tableBodyCell}
													>
														{clusterItemA["num_non_functional"] === NA_value ||
														clusterItemB["num_non_functional"] === NA_value
															? "-"
															: parseFloat(clusterItemB["num_non_functional"]) -
																		parseFloat(
																			clusterItemA["num_non_functional"],
																		) >
															    0
															  ? `+${
																		parseFloat(
																			clusterItemB["num_non_functional"],
																		) -
																		parseFloat(
																			clusterItemA["num_non_functional"],
																		)
															    }`
															  : parseFloat(
																		clusterItemB["num_non_functional"],
															    ) -
															    parseFloat(
																		clusterItemA["num_non_functional"],
															    )}
													</TableCell>
												</TableRow>
											</>
										);
									}
								})}
								{/*TOTAL A:*/}
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
										key="perent-func-A"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										A
									</TableCell>
									<TableCell
										key="percent-func"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemA["percent_functional"] === NA_value
											? "-"
											: formatProbToPercent(
													categoryItemA["percent_functional"],
											  )}
									</TableCell>
									<TableCell
										key="percent-nonfunc"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemA["percent_non_functional"] === NA_value
											? "-"
											: formatProbToPercent(
													categoryItemA["percent_non_functional"],
											  )}
									</TableCell>
									<TableCell
										key="num-func"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemA["num_functional"] === NA_value
											? "-"
											: categoryItemA["num_functional"]}
									</TableCell>
									<TableCell
										key="num-nonfunc"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemA["num_non_functional"] === NA_value
											? "-"
											: categoryItemA["num_non_functional"]}
									</TableCell>
								</TableRow>
								{/*TOTAL B:*/}
								<TableRow
									className={classes.tableBodyRow}
									key={categoryItemA["id"]}
								>
									<TableCell
										key="perent-func-B"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										B
									</TableCell>
									<TableCell
										key="percent-func"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemB["percent_functional"] === NA_value
											? "-"
											: formatProbToPercent(
													categoryItemB["percent_functional"],
											  )}
									</TableCell>
									<TableCell
										key="percent-nonfunc"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemB["percent_non_functional"] === NA_value
											? "-"
											: formatProbToPercent(
													categoryItemB["percent_non_functional"],
											  )}
									</TableCell>
									<TableCell
										key="num-func"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemB["num_functional"] === NA_value
											? "-"
											: categoryItemB["num_functional"]}
									</TableCell>
									<TableCell
										key="num-nonfunc"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemB["num_non_functional"] === NA_value
											? "-"
											: categoryItemB["num_non_functional"]}
									</TableCell>
								</TableRow>
								{/*TOTAL Diff:*/}
								<TableRow
									className={classes.tableBodyRow}
									key={categoryItemA["id"]}
								>
									<TableCell
										key="percent-func-diff"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										<CompareArrowsIcon style={{ transform: "rotate(90deg)" }} />
									</TableCell>
									<TableCell
										key="percent-func"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemA["percent_functional"] === NA_value ||
										categoryItemB["percent_functional"] === NA_value
											? "-"
											: parseFloat(categoryItemB["percent_functional"]) -
														parseFloat(categoryItemA["percent_functional"]) >
											    0
											  ? `+${formatProbToPercent(
														parseFloat(categoryItemB["percent_functional"]) -
															parseFloat(categoryItemA["percent_functional"]),
														1,
											    )}`
											  : formatProbToPercent(
														parseFloat(categoryItemB["percent_functional"]) -
															parseFloat(categoryItemA["percent_functional"]),
														1,
											    )}
									</TableCell>
									<TableCell
										key="percent-nonfunc"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemA["percent_non_functional"] === NA_value ||
										categoryItemB["percent_non_functional"] === NA_value
											? "-"
											: parseFloat(categoryItemB["percent_non_functional"]) -
														parseFloat(
															categoryItemA["percent_non_functional"],
														) >
											    0
											  ? `+${formatProbToPercent(
														parseFloat(
															categoryItemB["percent_non_functional"],
														) -
															parseFloat(
																categoryItemA["percent_non_functional"],
															),
														1,
											    )}`
											  : formatProbToPercent(
														parseFloat(
															categoryItemB["percent_non_functional"],
														) -
															parseFloat(
																categoryItemA["percent_non_functional"],
															),
														1,
											    )}
									</TableCell>
									<TableCell
										key="num-func"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemA["num_functional"] === NA_value ||
										categoryItemB["num_functional"] === NA_value
											? "-"
											: parseFloat(categoryItemB["num_functional"]) -
														parseFloat(categoryItemA["num_functional"]) >
											    0
											  ? `+${
														parseFloat(categoryItemB["num_functional"]) -
														parseFloat(categoryItemA["num_functional"])
											    }`
											  : parseFloat(categoryItemB["num_functional"]) -
											    parseFloat(categoryItemA["num_functional"])}
									</TableCell>
									<TableCell
										key="num-nonfunc"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItemA["num_non_functional"] === NA_value ||
										categoryItemB["num_non_functional"] === NA_value
											? "-"
											: parseFloat(categoryItemB["num_non_functional"]) -
														parseFloat(categoryItemA["num_non_functional"]) >
											    0
											  ? `+${
														parseFloat(categoryItemB["num_non_functional"]) -
														parseFloat(categoryItemA["num_non_functional"])
											    }`
											  : parseFloat(categoryItemB["num_non_functional"]) -
											    parseFloat(categoryItemA["num_non_functional"])}
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

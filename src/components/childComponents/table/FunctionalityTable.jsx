import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	withStyles,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { formatProbToPercent, round } from "../../../utils/common";
import LinearProgress from "@material-ui/core/LinearProgress";

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
	tableHeaderLowerCell: {
		top: "38px",
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
		// display: "flex",
		// width: "100%"
	},
});

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

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 4,
		borderRadius: 5,
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	barColorPrimary: {
		backgroundColor: "red",
	},
	bar: {
		borderRadius: 5,
		backgroundColor: "rgba(150, 183, 18, 1)",
		// backgroundColor: "#1a90ff",
	},
}))(LinearProgress);

export function FunctionalityTable(props) {
	const { funcResults } = props;

	const NA_value = -1;

	let clusterNumInCategory = calcClusterNumInCategory(funcResults);

	const classes = useStyles();

	return (
		<TableContainer className={classes.tableContainer}>
			<Table
				stickyHeader
				className={classes.table}
				size="small"
				aria-label="a dense table"
			>
				<TableHead>
					<TableRow>
						<TableCell
							style={{
								width: "647px",
								backgroundColor: "#EFF2FF",
								color: "#69707F",
							}}
							colSpan={2}
							rowSpan={2}
							className={classes.tableHeaderCell}
							key="playbook-building-clusters"
						>
							playbook builidng clusters
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
							className={`${classes.tableHeaderCell} ${classes.tableHeaderLowerCell}`}
							key="funcPercent"
						>
							Functional
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#D63649" }}
							className={`${classes.tableHeaderCell} ${classes.tableHeaderLowerCell}`}
							key="nonFunctPercent"
						>
							Non-Functional
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#96B712" }}
							className={`${classes.tableHeaderCell} ${classes.tableHeaderLowerCell}`}
							key="FuncNum"
						>
							Functional
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#D63649" }}
							className={`${classes.tableHeaderCell} ${classes.tableHeaderLowerCell}`}
							key="nonFuncNum"
						>
							Non-Functional
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{funcResults["by_category"].map((categoryItem, _) => {
						let firstMatchIdxx = -1;
						return (
							<>
								{funcResults["by_cluster"].map((clusterItem, idxx) => {
									// let style = {};
									let funcPercent = -1;
									// let nonFuncPercent = 100;

									if (clusterItem["category"] === categoryItem["category"]) {
										if (clusterItem["percent_functional"] > 0) {
											funcPercent = round(
												clusterItem["percent_functional"] * 100,
												1,
											);
											// uncomment this if we want to style it by using the background instead of progress bar
											// nonFuncPercent = round(100 - funcPercent, 1);
											// style = {background: `linear-gradient(90deg, rgba(150, 183, 18, 0.15) ${funcPercent}%, rgba(214,54,73, 0.15) ${funcPercent}% ${nonFuncPercent}%)`};
										}

										if (firstMatchIdxx < 0) firstMatchIdxx = idxx;
										return (
											<TableRow
												className={classes.tableBodyRow}
												key={clusterItem["cluster"]}
											>
												{idxx === firstMatchIdxx ? (
													<TableCell
														rowSpan={
															clusterNumInCategory[categoryItem["category"]] + 1
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
													// style={style}
												>
													{clusterItem["cluster"]}
													<BorderLinearProgress
														variant="determinate"
														value={funcPercent === NA_value ? 0 : funcPercent}
														style={
															funcPercent === NA_value
																? {}
																: { backgroundColor: "#D63649" }
														}
													/>
												</TableCell>
												<TableCell
													key={`${idxx}-f1`}
													className={classes.tableBodyCell}
												>
													{clusterItem["percent_functional"] === NA_value
														? "-"
														: formatProbToPercent(
																clusterItem["percent_functional"],
																1,
														  )}
												</TableCell>
												<TableCell
													key={`${idxx}-nf1`}
													className={classes.tableBodyCell}
												>
													{clusterItem["percent_non_functional"] === NA_value
														? "-"
														: formatProbToPercent(
																clusterItem["percent_non_functional"],
														  )}
												</TableCell>
												<TableCell
													key={`${idxx}-f2`}
													className={classes.tableBodyCell}
												>
													{clusterItem["num_functional"] === NA_value
														? "-"
														: clusterItem["num_functional"]}
												</TableCell>
												<TableCell
													key={`${idxx}-nf2`}
													className={classes.tableBodyCell}
												>
													{clusterItem["num_non_functional"] === NA_value
														? "-"
														: clusterItem["num_non_functional"]}
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
										key="percent-func"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItem["percent_functional"] === NA_value
											? "-"
											: formatProbToPercent(categoryItem["percent_functional"])}
									</TableCell>
									<TableCell
										key="percent-nonfunc"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItem["percent_non_functional"] === NA_value
											? "-"
											: formatProbToPercent(
													categoryItem["percent_non_functional"],
											  )}
									</TableCell>
									<TableCell
										key="num-func"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItem["num_functional"] === NA_value
											? "-"
											: categoryItem["num_functional"]}
									</TableCell>
									<TableCell
										key="num-nonfunc"
										className={classes.tableBodyCell}
										style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
									>
										{categoryItem["num_non_functional"] === NA_value
											? "-"
											: categoryItem["num_non_functional"]}
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

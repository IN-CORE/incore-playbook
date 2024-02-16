import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	table: {
		backgroundColor: "#FFFFFF",
		minWidth: "1135px"
	},
	tableHeaderRow: {
		height: "34px"
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
		textTransform: "uppercase"
	},
	tableBodyRow: {
		height: "28px"
	},
	tableBodyCell: {
		height: "21px",
		width: "123px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "18px",
		border: "1px solid rgba(46,91,255,0.08)"
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
		border: "1px solid rgba(46,91,255,0.08)"
	},
	tableBodyClusterCell: {
		height: "21px",
		width: "440px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "18px",
		border: "1px solid rgba(46,91,255,0.08)"
	},
	switchBase: {
		"&$checked": {
			color: "#00619D"
		},
		"&$checked + $track": {
			backgroundColor: "#00619D"
		}
	},
	checked: {},
	track: {}
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
	return ` (${parseFloat((100 * partialValue / totalValue).toFixed(2))}%)`;
}

export function BldgDamageTableCompare(props) {
	const { fieldsA, fieldsB } = props;
	const [percentOn, setPercentOn] = useState(false);

	function handleChange() {
		setPercentOn((percentOn) => !percentOn);
	}

	// e.g.
	// Community Recovery: 5
	// Critical Facilities: 4
	// "Emergency Housing ": 3
	// Housing / Neighborhood: 7
	// Assume A and B has exact same shape
	let clusterNumInCategory = calcClusterNumInCategory(fieldsA);

	const classes = useStyles();

	return (
		<TableContainer>
			{/*<Box style={{ float: "right" }}>*/}
			{/*	<FormControlLabel*/}
			{/*		control={*/}
			{/*			<Switch*/}
			{/*				checked={percentOn}*/}
			{/*				onChange={(e) => handleChange()}*/}
			{/*				color="default"*/}
			{/*				classes={{*/}
			{/*					switchBase: classes.switchBase,*/}
			{/*					checked: classes.checked,*/}
			{/*					track: classes.track*/}
			{/*				}}*/}
			{/*			/>*/}
			{/*		}*/}
			{/*		label="View Percentage"*/}
			{/*	/>*/}
			{/*</Box>*/}
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					{/*["playbook builidng clusters", "DS_0", "DS_1", "DS_2", "DS_3"];*/}
					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						<TableCell
							style={{ width: "647px", backgroundColor: "#EFF2FF", color: "#69707F" }}
							colSpan={2}
							className={classes.tableHeaderCell}
							key="playbook-building-clusters"
						>
                            playbook builidng clusters
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#96B712" }}
							className={classes.tableHeaderCell}
							key="DS_0"
						>
                            Insignificant
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#F7C137" }}
							className={classes.tableHeaderCell}
							key="DS_1"
						>
                            Moderate
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#ED8036" }}
							className={classes.tableHeaderCell}
							key="DS_2"
						>
                            Extensive
						</TableCell>
						<TableCell
							style={{ width: "121px", backgroundColor: "#D63649" }}
							className={classes.tableHeaderCell}
							key="DS_3"
						>
                            Complete
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						fieldsA["by_category"].map((categoryItemA, idx) => {
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
													<TableRow className={classes.tableBodyRow}
														key={clusterItemA["cluster"]}>
														{idxx === firstMatchIdxx ? (
															<TableCell
																rowSpan={(clusterNumInCategory[categoryItemA["category"]] + 1) * 3}
																align="center"
																className={classes.tableBodyCategoryCell}
																style={{ fontWeight: 500, textAlign: "left" }}
															>
																{categoryItemA["category"]}
															</TableCell>
														) : null}
														<TableCell key={idxx} className={classes.tableBodyClusterCell}
															rowSpan={3}>
															{clusterItemA["cluster"]}
														</TableCell>
														<TableCell key={`${idxx}-insig`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemA["DS_0"] === NA_value ? "-" : clusterItemA["DS_0"]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemA["DS_0"], categoryItemA["DS_0"])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-mod`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemA["DS_1"] === NA_value ? "-" : clusterItemA["DS_1"]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemA["DS_1"], categoryItemA["DS_1"])}
															</td>
														</TableCell>
														<TableCell
															key={`${idxx}-extensi`}
															className={classes.tableBodyCell}
														>
															<td>
																{clusterItemA["DS_2"] === NA_value ? "-" : clusterItemA["DS_2"]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemA["DS_2"], categoryItemA["DS_2"])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-comp`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemA["DS_3"] === NA_value ? "-" : clusterItemA["DS_3"]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemA["DS_3"], categoryItemA["DS_3"])}
															</td>
														</TableCell>
													</TableRow>
													{/*B:*/}
													<TableRow className={classes.tableBodyRow}
														key={clusterItemB["cluster"]}>
														<TableCell key={`${idxx}-insig`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB["DS_0"] === NA_value ? "-" : clusterItemB["DS_0"]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB["DS_0"], categoryItemB["DS_0"])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-mod`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB["DS_1"] === NA_value ? "-" : clusterItemB["DS_1"]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB["DS_1"], clusterItemB["DS_1"])}
															</td>
														</TableCell>
														<TableCell
															key={`${idxx}-extensi`}
															className={classes.tableBodyCell}
														>
															<td>
																{clusterItemB["DS_2"] === NA_value ? "-" : clusterItemB["DS_2"]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB["DS_2"], clusterItemB["DS_2"])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-comp`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB["DS_3"] === NA_value ? "-" : clusterItemB["DS_3"]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB["DS_3"], categoryItemB["DS_3"])}
															</td>
														</TableCell>
													</TableRow>
													{/*Diff:*/}
													<TableRow className={classes.tableBodyRow}
														key={`${clusterItemB["cluster"]}-diff`}>
														<TableCell key={`${idxx}-insig`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB["DS_0"] === NA_value || clusterItemA["DS_0"] === NA_value ?
																	"-" : parseFloat(clusterItemB["DS_0"]) - parseFloat(clusterItemA["DS_0"])}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB["DS_0"], categoryItemB["DS_0"])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-mod`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB["DS_1"] === NA_value || clusterItemA["DS_1"] === NA_value ?
																	"-" : parseFloat(clusterItemB["DS_1"]) - parseFloat(clusterItemA["DS_1"])}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB["DS_1"], clusterItemB["DS_1"])}
															</td>
														</TableCell>
														<TableCell
															key={`${idxx}-extensi`}
															className={classes.tableBodyCell}
														>
															<td>
																{clusterItemB["DS_2"] === NA_value || clusterItemA["DS_2"] === NA_value ?
																	"-" : parseFloat(clusterItemB["DS_2"]) - parseFloat(clusterItemA["DS_2"])}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB["DS_2"], clusterItemB["DS_2"])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-comp`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB["DS_3"] === NA_value || clusterItemA["DS_3"] === NA_value ?
																	"-" : parseFloat(clusterItemB["DS_3"]) - parseFloat(clusterItemA["DS_3"])}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB["DS_3"], categoryItemB["DS_3"])}
															</td>
														</TableCell>
													</TableRow>
												</>
											);
										}
									})}
									{/*A:*/}
									<TableRow className={classes.tableBodyRow} key={categoryItemA["id"]}>
										<TableCell
											key="total"
											className={classes.tableBodyClusterCell}
											style={{ fontWeight: 500, textAlign: "right", backgroundColor: "#EEF3F5" }}
											rowSpan={3}
										>
                                            TOTAL
										</TableCell>
										<TableCell
											key="total-insig"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA["DS_0"] === NA_value ? "-" : categoryItemA["DS_0"]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemA["DS_0"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-mod"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA["DS_1"] === NA_value ? "-" : categoryItemA["DS_1"]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemA["DS_1"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-extensi"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA["DS_2"] === NA_value ? "-" : categoryItemA["DS_2"]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemA["DS_2"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-comp"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA["DS_3"] === NA_value ? "-" : categoryItemA["DS_3"]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemA["DS_3"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
									</TableRow>
									{/*B:*/}
									<TableRow className={classes.tableBodyRow} key={categoryItemB["id"]}>
										<TableCell
											key="total-insig"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemB["DS_0"] === NA_value ? "-" : categoryItemB["DS_0"]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB["DS_0"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-mod"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemB["DS_1"] === NA_value ? "-" : categoryItemB["DS_1"]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB["DS_1"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-extensi"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemB["DS_2"] === NA_value ? "-" : categoryItemB["DS_2"]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB["DS_2"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-comp"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemB["DS_3"] === NA_value ? "-" : categoryItemB["DS_3"]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB["DS_3"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
									</TableRow>
									{/*Diff:*/}
									<TableRow className={classes.tableBodyRow} key={`${categoryItemB["id"]}-diff`}>
										<TableCell
											key="total-insig"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA["DS_0"] === NA_value || categoryItemB["DS_0"] === NA_value ?
												"-" : parseFloat(categoryItemB["DS_0"]) - parseFloat(categoryItemA["DS_0"])}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB["DS_0"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-mod"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA["DS_1"] === NA_value || categoryItemB["DS_1"] === NA_value ?
												"-" : parseFloat(categoryItemB["DS_1"]) - parseFloat(categoryItemA["DS_1"])}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB["DS_1"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-extensi"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA["DS_2"] === NA_value || categoryItemB["DS_2"] === NA_value ?
												"-" : parseFloat(categoryItemB["DS_2"]) - parseFloat(categoryItemA["DS_2"])}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB["DS_2"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-comp"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA["DS_3"] === NA_value || categoryItemB["DS_3"] === NA_value ?
												"-" : parseFloat(categoryItemB["DS_3"]) - parseFloat(categoryItemA["DS_3"])}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB["DS_3"] === NA_value ? "" : "(100%)"}
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

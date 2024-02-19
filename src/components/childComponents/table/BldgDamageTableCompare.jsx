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

	let tableHeaders = ["Insignificant", "Moderate", "Extensive", "Complete"];
	if (fieldsA && ("Insignificant" in fieldsA["by_category"][0])) {
		tableHeaders = ["Insignificant", "Moderate", "Extensive", "Complete"];
	} else if (fieldsA && ("Affected" in fieldsA["by_category"][0])) {
		tableHeaders = ["Affected", "Minor", "Major", "Destroyed"];
	} else {
		tableHeaders = ["DS_0", "DS_1", "DS_2", "DS_3"];
	}

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
																{clusterItemA[tableHeaders[0]] === NA_value ? "-" : clusterItemA[tableHeaders[0]]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemA[tableHeaders[0]], categoryItemA[tableHeaders[0]])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-mod`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemA[tableHeaders[1]] === NA_value ? "-" : clusterItemA[tableHeaders[1]]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemA[tableHeaders[1]], categoryItemA[tableHeaders[1]])}
															</td>
														</TableCell>
														<TableCell
															key={`${idxx}-extensi`}
															className={classes.tableBodyCell}
														>
															<td>
																{clusterItemA[tableHeaders[2]] === NA_value ? "-" : clusterItemA[tableHeaders[2]]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemA[tableHeaders[2]], categoryItemA[tableHeaders[2]])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-comp`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemA[tableHeaders[3]] === NA_value ? "-" : clusterItemA[tableHeaders[3]]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemA[tableHeaders[3]], categoryItemA[tableHeaders[3]])}
															</td>
														</TableCell>
													</TableRow>
													{/*B:*/}
													<TableRow className={classes.tableBodyRow}
														key={clusterItemB["cluster"]}>
														<TableCell key={`${idxx}-insig`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB[tableHeaders[0]] === NA_value ? "-" : clusterItemB[tableHeaders[0]]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB[tableHeaders[0]], categoryItemB[tableHeaders[0]])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-mod`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB[tableHeaders[1]] === NA_value ? "-" : clusterItemB[tableHeaders[1]]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB[tableHeaders[1]], clusterItemB[tableHeaders[1]])}
															</td>
														</TableCell>
														<TableCell
															key={`${idxx}-extensi`}
															className={classes.tableBodyCell}
														>
															<td>
																{clusterItemB[tableHeaders[2]] === NA_value ? "-" : clusterItemB[tableHeaders[2]]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB[tableHeaders[2]], clusterItemB[tableHeaders[2]])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-comp`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB[tableHeaders[3]] === NA_value ? "-" : clusterItemB[tableHeaders[3]]}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB[tableHeaders[3]], categoryItemB[tableHeaders[3]])}
															</td>
														</TableCell>
													</TableRow>
													{/*Diff:*/}
													<TableRow className={classes.tableBodyRow}
														key={`${clusterItemB["cluster"]}-diff`}>
														<TableCell key={`${idxx}-insig`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB[tableHeaders[0]] === NA_value || clusterItemA[tableHeaders[0]] === NA_value ?
																	"-" : parseFloat(clusterItemB[tableHeaders[0]]) - parseFloat(clusterItemA[tableHeaders[0]])}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB[tableHeaders[0]], categoryItemB[tableHeaders[0]])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-mod`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB[tableHeaders[1]] === NA_value || clusterItemA[tableHeaders[1]] === NA_value ?
																	"-" : parseFloat(clusterItemB[tableHeaders[1]]) - parseFloat(clusterItemA[tableHeaders[1]])}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB[tableHeaders[1]], clusterItemB[tableHeaders[1]])}
															</td>
														</TableCell>
														<TableCell
															key={`${idxx}-extensi`}
															className={classes.tableBodyCell}
														>
															<td>
																{clusterItemB[tableHeaders[2]] === NA_value || clusterItemA[tableHeaders[2]] === NA_value ?
																	"-" : parseFloat(clusterItemB[tableHeaders[2]]) - parseFloat(clusterItemA[tableHeaders[2]])}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB[tableHeaders[2]], clusterItemB[tableHeaders[2]])}
															</td>
														</TableCell>
														<TableCell key={`${idxx}-comp`}
															className={classes.tableBodyCell}>
															<td>
																{clusterItemB[tableHeaders[3]] === NA_value || clusterItemA[tableHeaders[3]] === NA_value ?
																	"-" : parseFloat(clusterItemB[tableHeaders[3]]) - parseFloat(clusterItemA[tableHeaders[3]])}
															</td>
															<td style={percentOn ?
																{
																	visibility: "visible",
																	color: "#A9A9A9"
																} : { visibility: "hidden" }}>
																{calcPercentage(clusterItemB[tableHeaders[3]], categoryItemB[tableHeaders[3]])}
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
											<td>{categoryItemA[tableHeaders[0]] === NA_value ? "-" : categoryItemA[tableHeaders[0]]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemA[tableHeaders[0]] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-mod"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA[tableHeaders[1]] === NA_value ? "-" : categoryItemA[tableHeaders[1]]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemA[tableHeaders[1]] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-extensi"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA[tableHeaders[2]] === NA_value ? "-" : categoryItemA[tableHeaders[2]]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemA[tableHeaders[2]] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-comp"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA[tableHeaders[3]] === NA_value ? "-" : categoryItemA[tableHeaders[3]]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemA[tableHeaders[3]] === NA_value ? "" : "(100%)"}
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
											<td>{categoryItemB[tableHeaders[0]] === NA_value ? "-" : categoryItemB[tableHeaders[0]]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB[tableHeaders[0]] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-mod"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemB[tableHeaders[1]] === NA_value ? "-" : categoryItemB[tableHeaders[1]]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB[tableHeaders[1]] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-extensi"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemB[tableHeaders[2]] === NA_value ? "-" : categoryItemB[tableHeaders[2]]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB[tableHeaders[2]] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-comp"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemB[tableHeaders[3]] === NA_value ? "-" : categoryItemB[tableHeaders[3]]}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB[tableHeaders[3]] === NA_value ? "" : "(100%)"}
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
											<td>{categoryItemA[tableHeaders[0]] === NA_value || categoryItemB[tableHeaders[0]] === NA_value ?
												"-" : parseFloat(categoryItemB[tableHeaders[0]]) - parseFloat(categoryItemA[tableHeaders[0]])}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB[tableHeaders[0]] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-mod"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA[tableHeaders[1]] === NA_value || categoryItemB[tableHeaders[1]] === NA_value ?
												"-" : parseFloat(categoryItemB[tableHeaders[1]]) - parseFloat(categoryItemA[tableHeaders[1]])}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB[tableHeaders[1]] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-extensi"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA[tableHeaders[2]] === NA_value || categoryItemB[tableHeaders[2]] === NA_value ?
												"-" : parseFloat(categoryItemB[tableHeaders[2]]) - parseFloat(categoryItemA[tableHeaders[2]])}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB[tableHeaders[2]] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-comp"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItemA[tableHeaders[3]] === NA_value || categoryItemB[tableHeaders[3]] === NA_value ?
												"-" : parseFloat(categoryItemB[tableHeaders[3]]) - parseFloat(categoryItemA[tableHeaders[3]])}</td>
											<td style={percentOn ?
												{ visibility: "visible", color: "#A9A9A9" } : { visibility: "hidden" }}>
												{categoryItemB[tableHeaders[3]] === NA_value ? "" : "(100%)"}
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

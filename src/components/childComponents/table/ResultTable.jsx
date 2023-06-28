import React, { useState } from "react";
import { Box, Table, TableBody,	TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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

function calcPercentage(partialValue, totalValue) {
	if (partialValue === NA_value) {
		return ""
	}
	if (totalValue == 0) {
		return " (0%)"
	}
	return " ("+parseFloat((100 * partialValue/totalValue).toFixed(2)) + "%)"
}

export function ResultTable(props) {
	const { fields } = props;
	const [percentOn, setPercentOn] = useState(false);

	function handleChange(classname) {
		setPercentOn((percentOn) => !percentOn);
		const collection = document.getElementsByClassName(classname);
		for (let i = 0; i < collection.length; i++) {
        	let x = collection[i];
			if (x.style.visibility === "visible") {
                x.style.visibility = "hidden";
			} else {
    			x.style.visibility = "visible";
  			}
    	}
	}

	// e.g.
	// Community Recovery: 5
	// Critical Facilities: 4
	// "Emergency Housing ": 3
	// Housing / Neighborhood: 7
	let clusterNumInCategory = calcClusterNumInCategory(fields);

	const classes = useStyles();

	return (
		<TableContainer>
			<Box style={{ float: "right" }}>
				<FormControlLabel
					control={
						<Switch
							checked={percentOn}
							onChange={(e) => handleChange("percent")}
							color="default"
							classes={{
								switchBase: classes.switchBase,
								checked: classes.checked,
								track: classes.track
							}}
						/>
					}
					label="%"
				/>
			</Box>
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
						// TODO this is not working
						fields["by_category"].map((categoryItem, _) => {
							let firstMatchIdxx = -1;
							return (
								<>
									{fields["by_cluster"].map((clusterItem, idxx) => {
										if (clusterItem["category"] === categoryItem["category"]) {
											if (firstMatchIdxx < 0) firstMatchIdxx = idxx;
											return (
												<TableRow className={classes.tableBodyRow} key={clusterItem["cluster"]}>
													{idxx === firstMatchIdxx ? (
														<TableCell
															rowSpan={clusterNumInCategory[categoryItem["category"]] + 1}
															align="center"
															className={classes.tableBodyCategoryCell}
															style={{ fontWeight: 500, textAlign: "left" }}
														>
															{categoryItem["category"]}
														</TableCell>
													) : null}
													<TableCell key={idxx} className={classes.tableBodyClusterCell}>
														{clusterItem["cluster"]}
													</TableCell>
													<TableCell key={`${idxx}-insig`} className={classes.tableBodyCell}>
														<td>
															{clusterItem["DS_0"] === NA_value ? "-" : clusterItem["DS_0"]}
														</td>
														<td className={`percent`} style={{ visibility:"hidden", color:"#A9A9A9" }}>
															{calcPercentage(clusterItem["DS_0"], categoryItem["DS_0"])}
														</td>
													</TableCell>
													<TableCell key={`${idxx}-mod`} className={classes.tableBodyCell}>
														<td>
															{clusterItem["DS_1"] === NA_value ? "-" : clusterItem["DS_1"]}
														</td>
														<td className={`percent`} style={{ visibility:"hidden", color:"#A9A9A9" }}>
															{calcPercentage(clusterItem["DS_1"], categoryItem["DS_1"])}
														</td>
													</TableCell>
													<TableCell
														key={`${idxx}-extensi`}
														className={classes.tableBodyCell}
													>
														<td>
															{clusterItem["DS_2"] === NA_value ? "-" : clusterItem["DS_2"]}
														</td>
														<td className={`percent`} style={{ visibility:"hidden", color:"#A9A9A9" }}>
															{calcPercentage(clusterItem["DS_2"], categoryItem["DS_2"])}
														</td>
													</TableCell>
													<TableCell key={`${idxx}-comp`} className={classes.tableBodyCell}>
														<td>
															{clusterItem["DS_3"] === NA_value ? "-" : clusterItem["DS_3"]}
														</td>
														<td className={`percent`} style={{ visibility:"hidden", color:"#A9A9A9" }}>
															{calcPercentage(clusterItem["DS_3"], categoryItem["DS_3"])}
														</td>
													</TableCell>
												</TableRow>
											);
										}
									})}
									<TableRow className={classes.tableBodyRow} key={categoryItem["id"]}>
										<TableCell
											key="total"
											className={classes.tableBodyClusterCell}
											style={{ fontWeight: 500, textAlign: "right", backgroundColor: "#EEF3F5" }}
										>
											TOTAL
										</TableCell>
										<TableCell
											key="total-insig"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItem["DS_0"] === NA_value ? "-" : categoryItem["DS_0"]}</td>
											<td className={`percent`} style={{ visibility:"hidden", color:"#A9A9A9" }}>
												{categoryItem["DS_0"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-mod"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItem["DS_1"] === NA_value ? "-" : categoryItem["DS_1"]}</td>
											<td className={`percent`} style={{ visibility:"hidden", color:"#A9A9A9" }}>
												{categoryItem["DS_1"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-extensi"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItem["DS_2"] === NA_value ? "-" : categoryItem["DS_2"]}</td>
											<td className={`percent`} style={{ visibility:"hidden", color:"#A9A9A9" }}>
												{categoryItem["DS_2"] === NA_value ? "" : "(100%)"}
											</td>
										</TableCell>
										<TableCell
											key="total-comp"
											className={classes.tableBodyCell}
											style={{ fontWeight: 500, backgroundColor: "#EEF3F5" }}
										>
											<td>{categoryItem["DS_3"] === NA_value ? "-" : categoryItem["DS_3"]}</td>
											<td className={`percent`} style={{ visibility:"hidden", color:"#A9A9A9" }}>
												{categoryItem["DS_3"] === NA_value ? "" : "(100%)"}
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

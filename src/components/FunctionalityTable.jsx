import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	withStyles
} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import {formatProbToPercent, round} from "../utils/common";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
	table: {
		backgroundColor:"#FFFFFF",
		minWidth: "1135px",
	},
	tableHeaderRow: {
		height: "34px",
	},
	tableTopHeaderRow:{
		textAlign: "center",
		border: "1px solid rgba(46,91,255,0.08)",
		height: "15px",
		textTransform:"uppercase"
	},
	tableHeaderCell: {
		height: "14px",
		width: "37px",
		color: "#FFFFFF",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1.13px",
		lineHeight: "14px",
		textAlign:"center",
		textTransform:"uppercase"
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
	tableBodyCategoryCell:{
		height: "21px",
		width: "209px",
		color: "#2E384D",
		fontSize: "18px",
		fontWeight:500,
		letterSpacing: 0,
		lineHeight: "18px",
		textTransform:"capitalize",
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

function calcClusterNumInCategory(fields){
	let count = {};
	fields["by_category"].map((categoryItem) => {

		count[categoryItem["category"]] = 0;

		fields["by_cluster"].map((clusterItem) => {
			if (clusterItem["category"] === categoryItem["category"]){
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
		backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	barColorPrimary: {
		backgroundColor: "red",
	},
	bar: {
		borderRadius: 5,
		backgroundColor: "rgba(150, 183, 18, 1)"
		// backgroundColor: "#1a90ff",
	},
}))(LinearProgress);


export function FunctionalityTable(props) {

	// const { funcResults } = props;

	// TODO: comment out when props is passed
	const jsonData = "{\"by_cluster\":[{\"cluster\":\"Critical Medical - Acute Care Hospitals\",\"category\":\"Critical Facilities\",\"percent_functional\":0.75,\"percent_non_functional\":0.25,\"num_functional\":3,\"num_non_functional\":1},{\"cluster\":\"Emergency Operations Centers\",\"category\":\"Critical Facilities\",\"percent_functional\":0.7895789474,\"percent_non_functional\":0.2104210526,\"num_functional\":15,\"num_non_functional\":4},{\"cluster\":\"Critical Government - First Responder Facilities\",\"category\":\"Critical Facilities\",\"percent_functional\":1,\"percent_non_functional\":0,\"num_functional\":4,\"num_non_functional\":0},{\"cluster\":\"Non-ambulatory Facilities - Prisons, nursing homes, etc.\",\"category\":\"Critical Facilities\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1},{\"cluster\":\"Emergency Shelters\",\"category\":\"Emergency Housing\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1},{\"cluster\":\"Residential Housing\",\"category\":\"Emergency Housing\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1},{\"cluster\":\"SFH and Multi-family\",\"category\":\"Emergency Housing\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1},{\"cluster\":\"Residential Housing\",\"category\":\"Housing / Neighborhood\",\"percent_functional\":0.0637706311,\"percent_non_functional\":0.9362293689,\"num_functional\":525,\"num_non_functional\":7715},{\"cluster\":\"Critical Retail\",\"category\":\"Housing / Neighborhood\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1},{\"cluster\":\"Religious and Spiritual Centers\",\"category\":\"Housing / Neighborhood\",\"percent_functional\":0.3424736842,\"percent_non_functional\":0.6575263158,\"num_functional\":13,\"num_non_functional\":25},{\"cluster\":\"K-12 Schools\",\"category\":\"Housing / Neighborhood\",\"percent_functional\":0.1433571429,\"percent_non_functional\":0.8566428571,\"num_functional\":4,\"num_non_functional\":24},{\"cluster\":\"Child Care Centers\",\"category\":\"Housing / Neighborhood\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1},{\"cluster\":\"Hotels and Motels\",\"category\":\"Housing / Neighborhood\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1},{\"cluster\":\"Business - Manufacturing\",\"category\":\"Community Recovery\",\"percent_functional\":0.5599494585,\"percent_non_functional\":0.4400505415,\"num_functional\":155,\"num_non_functional\":122},{\"cluster\":\"Business - Commodity Services\",\"category\":\"Community Recovery\",\"percent_functional\":0.4214298246,\"percent_non_functional\":0.5785701754,\"num_functional\":192,\"num_non_functional\":264},{\"cluster\":\"Business - Service Professions\",\"category\":\"Community Recovery\",\"percent_functional\":0.3320894737,\"percent_non_functional\":0.6679105263,\"num_functional\":126,\"num_non_functional\":254},{\"cluster\":\"Conference & Event Venues\",\"category\":\"Community Recovery\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1},{\"cluster\":\"Other\",\"category\":\"Community Recovery\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1}],\"by_category\":[{\"category\":\"Critical Facilities\",\"percent_functional\":0.8148888889,\"percent_non_functional\":0.1851111111,\"num_functional\":22,\"num_non_functional\":5},{\"category\":\"Emergency Housing\",\"percent_functional\":-1,\"percent_non_functional\":-1,\"num_functional\":-1,\"num_non_functional\":-1},{\"category\":\"Housing / Neighborhood\",\"percent_functional\":0.0653139899,\"percent_non_functional\":0.9346860101,\"num_functional\":542,\"num_non_functional\":7764},{\"category\":\"Community Recovery\",\"percent_functional\":0.4254016173,\"percent_non_functional\":0.5745983827,\"num_functional\":473,\"num_non_functional\":640}]}";
	let funcResults = JSON.parse(jsonData);

	const NA_value = -1;

	let clusterNumInCategory = calcClusterNumInCategory(funcResults);

	const classes = useStyles();

	return (
		<TableContainer>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell colSpan={2}>  </TableCell>
						<TableCell colSpan={2} className={classes.tableTopHeaderRow}> Percent (%) </TableCell>
						<TableCell colSpan={2} className={classes.tableTopHeaderRow}> No. of Buildings </TableCell>
					</TableRow>

					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						<TableCell style={{width: "647px", backgroundColor: "#EFF2FF", color:"#69707F"}}
								   colSpan={2}
								   className={classes.tableHeaderCell}
								   key="playbook-building-clusters">playbook builidng clusters</TableCell>
						<TableCell style={{width: "121px", backgroundColor: "#96B712"}}
								   className={classes.tableHeaderCell}
								   key="funcPercent">Functional</TableCell>
						<TableCell style={{width: "121px", backgroundColor: "#D63649"}}
								   className={classes.tableHeaderCell}
								   key="nonFunctPercent">Non-Functional</TableCell>
						<TableCell style={{width: "121px", backgroundColor: "#96B712"}}
								   className={classes.tableHeaderCell}
								   key="FuncNum">Functional</TableCell>
						<TableCell style={{width: "121px", backgroundColor: "#D63649"}}
								   className={classes.tableHeaderCell}
								   key="nonFuncNum">Non-Functional</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						funcResults["by_category"].map((categoryItem, idx) => {
							let firstMatchIdxx = -1;
							return (
								<>
									{
										funcResults["by_cluster"].map((clusterItem, idxx) =>{
											let style = {};
											let funcPercent = -1;
											let nonFuncPercent = 100;

											if (clusterItem["category"] === categoryItem["category"]) {
												if(clusterItem["percent_functional"] > 0) {
													funcPercent = round(clusterItem["percent_functional"] * 100, 1);
													// uncomment this if we want to style it by using the background instead of progress bar
													// nonFuncPercent = round(100 - funcPercent, 1);
													// style = {background: `linear-gradient(90deg, rgba(150, 183, 18, 0.15) ${funcPercent}%, rgba(214,54,73, 0.15) ${funcPercent}% ${nonFuncPercent}%)`};
												}

												if (firstMatchIdxx < 0)	firstMatchIdxx = idxx;
												return (
													<TableRow className={classes.tableBodyRow} key={clusterItem["cluster"]}>
														{ idxx === firstMatchIdxx ?
															<TableCell rowSpan={clusterNumInCategory[categoryItem["category"]] + 1}
															   align="center"
															   className={classes.tableBodyCategoryCell}
															   style={{fontWeight:500,  textAlign:"left"}}>{categoryItem["category"]}

															</TableCell>
															: null
														}
														<TableCell key={idxx} className={[classes.tableBodyClusterCell]}
																			 // style={style}
														>
															{clusterItem["cluster"]}
															<BorderLinearProgress variant="determinate" value={funcPercent === NA_value ? 0 : funcPercent}
																style={funcPercent === NA_value ? {} : {backgroundColor: "#D63649"}}/>

														</TableCell>
														<TableCell key={`${idxx}-f1`} className={classes.tableBodyCell}>
															{clusterItem["percent_functional"] === NA_value? "-" : formatProbToPercent(clusterItem["percent_functional"], 1)}
														</TableCell>
														<TableCell key={`${idxx}-nf1`} className={classes.tableBodyCell}>
															{clusterItem["percent_non_functional"] === NA_value? "-" : formatProbToPercent(clusterItem["percent_non_functional"])}
														</TableCell>
														<TableCell key={`${idxx}-f2`} className={classes.tableBodyCell}>
															{clusterItem["num_functional"] === NA_value? "-": clusterItem["num_functional"]}
														</TableCell>
														<TableCell key={`${idxx}-nf2`} className={classes.tableBodyCell}>
															{clusterItem["num_non_functional"] === NA_value? "-": clusterItem["num_non_functional"]}
														</TableCell>
													</TableRow>
												);
											}
										})
									}
									<TableRow className={classes.tableBodyRow} key={categoryItem["id"]}>
										<TableCell key="total" className={classes.tableBodyClusterCell}
												   style={{fontWeight:500, textAlign:"right",
													   backgroundColor: "#EEF3F5"}}>TOTAL</TableCell>
										<TableCell key="percent-func" className={classes.tableBodyCell}
												   style={{fontWeight:500, backgroundColor: "#EEF3F5"}}>
											{categoryItem["percent_functional"] === NA_value ? "-" : formatProbToPercent(categoryItem["percent_functional"])}
										</TableCell>
										<TableCell key="percent-nonfunc" className={classes.tableBodyCell}
												   style={{fontWeight:500, backgroundColor: "#EEF3F5"}}>
											{categoryItem["percent_non_functional"] === NA_value ? "-" : formatProbToPercent(categoryItem["percent_non_functional"])}
										</TableCell>
										<TableCell key="num-func" className={classes.tableBodyCell}
												   style={{fontWeight:500, backgroundColor: "#EEF3F5"}}>
											{categoryItem["num_functional"] === NA_value ? "-" : categoryItem["num_functional"]}
										</TableCell>
										<TableCell key="num-nonfunc" className={classes.tableBodyCell}
												   style={{fontWeight:500, backgroundColor: "#EEF3F5"}}>
											{categoryItem["num_non_functional"] === NA_value ? "-" : categoryItem["num_non_functional"]}
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

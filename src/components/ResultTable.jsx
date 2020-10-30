import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@material-ui/core";


import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	table: {
		backgroundColor:"#FFFFFF",
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


export function ResultTable(props) {

	const { fields } = props;

	const NA_value = -1; // TODO need to change to -1

	// e.g.
	// Community Recovery: 5
	// Critical Facilities: 4
	// "Emergency Housing ": 3
	// Housing / Neighborhood: 7
	let clusterNumInCategory = calcClusterNumInCategory(fields);

	const classes = useStyles();

	return (
		<TableContainer>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					{/*["playbook builidng clusters", "insiginificant", "moderate", "extensive", "complete"];*/}
					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						<TableCell style={{width: "647px", backgroundColor: "#EFF2FF", color:"#69707F"}}
								   colSpan={2}
								   className={classes.tableHeaderCell}
								   key="playbook-building-clusters">playbook builidng clusters</TableCell>
						<TableCell style={{width: "121px", backgroundColor: "#96B712"}}
								   className={classes.tableHeaderCell}
								   key="insiginificant">insiginificant</TableCell>
						<TableCell style={{width: "121px", backgroundColor: "#F7C137"}}
								   className={classes.tableHeaderCell}
								   key="moderate">moderate</TableCell>
						<TableCell style={{width: "121px", backgroundColor: "#ED8036"}}
								   className={classes.tableHeaderCell}
								   key="extensive">extensive</TableCell>
						<TableCell style={{width: "121px", backgroundColor: "#D63649"}}
								   className={classes.tableHeaderCell}
								   key="complete">complete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						// TODO this is not working
						fields["by_category"].map((categoryItem, idx) => {
							let firstMatchIdxx = -1;
							return (
								<>
									{
										fields["by_cluster"].map((clusterItem, idxx) =>{
											if (clusterItem["category"] === categoryItem["category"]) {
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
														<TableCell key={idxx} className={classes.tableBodyClusterCell}>
															{clusterItem["cluster"]}
														</TableCell>
														<TableCell key={`${idxx}-insig`} className={classes.tableBodyCell}>
															{clusterItem["insignific"] === NA_value? "-" : clusterItem["insignific"]}
														</TableCell>
														<TableCell key={`${idxx}-mod`} className={classes.tableBodyCell}>
															{clusterItem["moderate"] === NA_value? "-" : clusterItem["moderate"]}
														</TableCell>
														<TableCell key={`${idxx}-extensi`} className={classes.tableBodyCell}>
															{clusterItem["heavy"] === NA_value? "-": clusterItem["heavy"]}
														</TableCell>
														<TableCell key={`${idxx}-comp`} className={classes.tableBodyCell}>
															{clusterItem["complete"] === NA_value? "-": clusterItem["complete"]}
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
										<TableCell key="total-insig" className={classes.tableBodyCell}
												   style={{fontWeight:500, backgroundColor: "#EEF3F5"}}>
											{categoryItem["insignific"] === NA_value ? "-" : categoryItem["insignific"]}
										</TableCell>
										<TableCell key="total-mod" className={classes.tableBodyCell}
												   style={{fontWeight:500, backgroundColor: "#EEF3F5"}}>
											{categoryItem["moderate"] === NA_value ? "-" : categoryItem["moderate"]}
										</TableCell>
										<TableCell key="total-extensi" className={classes.tableBodyCell}
												   style={{fontWeight:500, backgroundColor: "#EEF3F5"}}>
											{categoryItem["heavy"] === NA_value ? "-" : categoryItem["heavy"]}
										</TableCell>
										<TableCell key="total-comp" className={classes.tableBodyCell}
												   style={{fontWeight:500, backgroundColor: "#EEF3F5"}}>
											{categoryItem["complete"] === NA_value ? "-" : categoryItem["complete"]}
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

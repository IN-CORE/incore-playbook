import React, {useEffect, useState} from "react";

import {
	IconButton,
	Link,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import UnfoldLess from "@material-ui/icons/UnfoldLess";

import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
		borderCollapse: "collapse"
	},
	tableHeaderRow: {
		// height: "34px",
	},
	tableHeaderCell: {
		height: "14px",
		width: "37px",
		color: "#69707F",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1.13px",
		lineHeight: "14px"
	},
	tableBodyRow: {
		backgroundColor: "#FFFFFF",
		borderBottom: "2px solid #D9E8F1",
		borderTop: "2px solid #D9E8F1",
		minHeight: "65px"
	},
	tableBodyCell: {
		minWidth: "68.75px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "22px"
	},
	statusSuccess: {
		textTransform: "capitalize",
		color: "#2E384D",
		backgroundColor: "#9BD686",
		padding: "auto 2px",
		textAlign: "center"
	},
	statusUnsuccess: {
		textTransform: "capitalize",
		color: "#2E384D",
		backgroundColor: "#f3b4b0",
		padding: "auto 2px",
		textAlign: "center"
	},
	firstTableBodyCell: {
		minWidth: "300px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "22px",
		fontWeight: 500
	},
	subBodyRow: {
		backgroundColor: "rgba(255,255,255,0.6)",
		borderBottom: "2px solid #D9E8F1",
		borderTop: "2px solid #D9E8F1",
		minHeight: "34px",
	},
	clickableLink: {
		"&:hover": {
			cursor: "pointer"
		},
		color: "#00619D",
		fontWeight: 500,
		margin: "auto 0px auto 20px",
	},
	clickableLinkDisabled: {
		pointerEvents: "none",
		textDecoration: "none",
		color: "#9E9E9E",
		fontWeight: 500,
		margin: "auto 0px auto 20px",
	}
});

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export function ViewResultEntryTable(props) {

	// const {fieldNames, executions, previewMetrics, previewBldgDmg, downloadBldgDmg, previewEpfDmg, downloadEpfDmg,
	// 	previewBldgFunc, downloadBldgFunc, previewInterd, previewBldgMCS, downloadBldgMCS, previewPopDisl,
	// 	previewCGE, downloadCGE, downloadPopDisl} = props;

	const {fieldNames, executions, preview} = props;
	const [widgetList, setWidgetList] = useState([]);

	// list all the widgets from workflow definition
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);
	useEffect(()=> {
		setWidgetList(datawolfWorkflowConfig.outputs.datasets[0].datasetsMap.reduce((list, item) => {
			if (!list.includes(item.datasets.widget)){
				return [...list, item.datasets.widget];
			}
			else{
				return list;
			}
		}, []));
	}, []);

	const [expandId, setExpandId] = useState("");
	const [collapseId, setCollapseId] = useState("");

	const [order, setOrder] = useState("desc");
	const [orderBy, setOrderBy] = React.useState("date");

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};

	const classes = useStyles();

	return (
		<TableContainer>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						{
							fieldNames.map((fieldName) => {
								return (
									<TableCell className={classes.tableHeaderCell} key={fieldName["columnName"]}
											   sortDirection={orderBy === fieldName["columnName"] ? order : false}>
										<TableSortLabel
											active={orderBy === fieldName["columnName"]}
											direction={orderBy === fieldName["columnName"] ? order : "asc"}
											onClick={createSortHandler(fieldName["columnName"])}
										>
											{fieldName["prettyName"]}
										</TableSortLabel>
									</TableCell>
								);
							})
						}
						{/*TODO implement expending*/}
						<TableCell className={classes.tableHeaderCell} key="dot"/>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						stableSort(executions, getComparator(order, orderBy)).map((execution) => {
							return (
								<>
									<TableRow className={classes.tableBodyRow} key={execution["id"]}>
										{
											fieldNames.map((fieldName, idx) => {
												if (fieldName["columnName"] === "finalStatus") {
													return (
														<TableCell key={`${execution["id"]}-${idx}`}>
															<p className={
																execution["finalStatus"].toLowerCase() === "finished" ?
																	classes.statusSuccess :
																	classes.statusUnsuccess
															}>
																{execution[fieldName["columnName"]].toLowerCase()}</p>
														</TableCell>
													);
												} else {
													return (
														<TableCell key={`${execution["id"]}-${idx}`}
																   className={idx === 0 ? classes.firstTableBodyCell :
																	   classes.tableBodyCell}>
															{execution[fieldName["columnName"]]}</TableCell>
													);
												}
											})
										}
										<TableCell className={classes.tableBodyCell} key={`${execution["id"]}-unfold`}>
											{
												execution["id"] === expandId && execution["id"] !== collapseId ?
													<IconButton aria-label="unfold" onClick={() => {
														setCollapseId(execution["id"]);
														setExpandId("");
													}}>
														<UnfoldLess/>
													</IconButton>
													:
													<IconButton aria-label="unfold" onClick={() => {
														setExpandId(execution["id"]);
														setCollapseId("");
													}}>
														<UnfoldMoreIcon/>
													</IconButton>
											}

										</TableCell>
									</TableRow>
									{
										(execution["id"] === expandId && execution["id"] !== collapseId) ?
											<>
												{/*resilience metrics*/}
												{
													widgetList.includes("CGE") && widgetList.includes("PopDislocation")
													&& widgetList.includes("BldgFunctionality")?
														<TableRow className={classes.subBodyRow}
																  key={`${execution["id"]}-resilience-metrics`}>
															<TableCell key={`${execution["id"]}-resilience-metrics-title`}>Resilience Metrics</TableCell>
															<TableCell colSpan={3} key={`${execution["id"]}-resilience-metrics-1`}/>
															<TableCell colSpan={2} key={`${execution["id"]}-resilience-metrics-2`}>
																<Link color="primary" onClick={() => {preview(execution["id"], "metrics");}}
																	  className={execution["finalStatus"] === undefined ||
																	  execution["finalStatus"] === "FINISHED" ?
																		  classes.clickableLink : classes.clickableLinkDisabled}>
																	View
																</Link>
																<Link color="primary" className={classes.clickableLinkDisabled}>
																	Download
																</Link>
															</TableCell>
														</TableRow>
														:
														<></>
												}
												{/*interdependency network*/}
												{
													widgetList.includes("EpfDamage") ?
														<TableRow className={classes.subBodyRow}
																  key={`${execution["id"]}-interdependency`}>
															<TableCell key={`${execution["id"]}-interdependency-title`}>Interdependency</TableCell>
															<TableCell colSpan={3} key={`${execution["id"]}-interdependency-1`}/>
															<TableCell colSpan={2} key={`${execution["id"]}-interdependency-2`}>
																<Link color="primary" onClick={() => {previewInterd(execution["id"]);}}
																	  className={execution["finalStatus"] === undefined ||
																	  execution["finalStatus"] === "FINISHED" ?
																		  classes.clickableLink : classes.clickableLinkDisabled}>
																	View
																</Link>
																<Link color="primary" className={classes.clickableLinkDisabled}>
																	Download
																</Link>
															</TableCell>
														</TableRow>
														:<></>
												}
												{
													widgetList.includes("BldgDamage") ?
														<>
															{/*building damage*/}
															<TableRow className={classes.subBodyRow}
																	  key={`${execution["id"]}-bldg-dmg`}>
																<TableCell key={`${execution["id"]}-bldg-dmg-title`}>Building Damage</TableCell>
																<TableCell colSpan={3} key={`${execution["id"]}-bldg-dmg-1`}/>
																<TableCell colSpan={2} key={`${execution["id"]}-bldg-dmg-2`}>
																	<Link color="primary" onClick={() => {previewBldgDmg(execution["id"]);}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>
																		View
																	</Link>
																	<Link color="primary" onClick={() => {downloadBldgDmg(execution["id"]);}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>
																		Download
																	</Link>
																</TableCell>
															</TableRow>
															{/*EPF damage*/}
															<TableRow className={classes.subBodyRow}
																	  key={`${execution["id"]}-epf-pole`}>
																<TableCell key={`${execution["id"]}-epf-pole-title`}>Pole Damage (Electrical Power Network)</TableCell>
																<TableCell colSpan={3} key={`${execution["id"]}-epf-pole-1`}/>
																<TableCell colSpan={2} key={`${execution["id"]}-epf-pole-2`}>
																	<Link color="primary" onClick={() =>
																	{previewEpfDmg(execution["id"], "pole");}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>
																		View
																	</Link>
																	<Link color="primary" onClick={() => {downloadEpfDmg(execution["id"], "pole");}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>Download</Link>
																</TableCell>
															</TableRow>
															<TableRow className={classes.subBodyRow}
																	  key={`${execution["id"]}-epf-substation`}>
																<TableCell key={`${execution["id"]}-epf-substation-title`}>Substation Damage (Electrical Power Network)</TableCell>
																<TableCell colSpan={3} key={`${execution["id"]}-epf-substation-1`}/>
																<TableCell colSpan={2} key={`${execution["id"]}-epf-substation-2`}>
																	<Link color="primary" onClick={() =>
																	{previewEpfDmg(execution["id"], "substation");}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>
																		View
																	</Link>
																	<Link color="primary" onClick={() => {downloadEpfDmg(execution["id"], "substation");}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>Download</Link>
																</TableCell>
															</TableRow>
														</>
														:
														<></>
												}

												{/*functionality*/}
												{
													widgetList.includes("BldgFunctionality") ?
														<>
															<TableRow className={classes.subBodyRow} key={`${execution["id"]}-mcs`}>
																<TableCell key={`${execution["id"]}-mcs-title`}>Building Functionality (w/o Electrical Power Dependency)</TableCell>
																<TableCell colSpan={3} key={`${execution["id"]}-mcs-1`}/>
																<TableCell colSpan={2}key={`${execution["id"]}-mcs-2`}>
																	<Link color="primary" onClick={() => {previewBldgMCS(execution["id"]);}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>
																		View
																	</Link>
																	<Link color="primary" onClick={() => {downloadBldgMCS(execution["id"]);}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>Download</Link>
																</TableCell>
															</TableRow>
															<TableRow className={classes.subBodyRow}
																	  key={`${execution["id"]}-bldg-functionality`}>
																<TableCell key={`${execution["id"]}-bldg-functionality-title`}>Building Functionality (with Electrical Power Dependency)</TableCell>
																<TableCell colSpan={3} key={`${execution["id"]}-bldg-functionality-1`}/>
																<TableCell colSpan={2} key={`${execution["id"]}-bldg-functionality-2`}>
																	<Link color="primary" onClick={() => {previewBldgFunc(execution["id"]);}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>
																		View
																	</Link>
																	<Link color="primary" onClick={() => {downloadBldgFunc(execution["id"]);}}
																		  className={execution["finalStatus"] === undefined ||
																		  execution["finalStatus"] === "FINISHED" ?
																			  classes.clickableLink : classes.clickableLinkDisabled}>Download</Link>
																</TableCell>
															</TableRow>
														</>
														:<></>
												}
												{/*CGE*/}
												{
													widgetList.includes("CGE") ?
														<TableRow className={classes.subBodyRow} key={`${execution["id"]}-cge`}>
															<TableCell key={`${execution["id"]}-cge-title`}>Economic Prediction Model (Computable General Equilibrium)</TableCell>
															<TableCell colSpan={3} key={`${execution["id"]}-cge-1`}/>
															<TableCell colSpan={2} key={`${execution["id"]}-cge-2`}>
																<Link color="primary" onClick={() => {previewCGE(execution["id"]);}}
																	  className={execution["finalStatus"] === undefined ||
																	  execution["finalStatus"] === "FINISHED" ?
																		  classes.clickableLink : classes.clickableLinkDisabled}>
																	View
																</Link>
																<Link color="primary" className={
																	execution["finalStatus"] === undefined || execution["finalStatus"] === "FINISHED" ?
																		classes.clickableLink : classes.clickableLinkDisabled
																} onClick={() => downloadCGE(execution["id"])}>
																	Download
																</Link>
															</TableCell>
														</TableRow>
														:<></>
												}
												{/*population dislocation*/}
												{
													widgetList.includes("PopDislocation") ?
														<TableRow className={classes.subBodyRow}
																  key={`${execution["id"]}-popdislocation`}>
															<TableCell key={`${execution["id"]}-popdislocation-title`}>Population Dislocation</TableCell>
															<TableCell colSpan={3} key={`${execution["id"]}-popdislocation-1`}/>
															<TableCell colSpan={2} key={`${execution["id"]}-popdislocation-2`}>
																<Link color="primary" onClick={() => {previewPopDisl(execution["id"]);}}
																	  className={execution["finalStatus"] === undefined ||
																	  execution["finalStatus"] === "FINISHED" ?
																		  classes.clickableLink : classes.clickableLinkDisabled}>
																	View
																</Link>
																<Link color="primary" className={
																	execution["finalStatus"] === undefined || execution["finalStatus"] === "FINISHED" ?
																		classes.clickableLink : classes.clickableLinkDisabled
																} onClick={() => downloadPopDisl(execution["id"])}>
																	Download
																</Link>
															</TableCell>
														</TableRow>
														:
														<></>
												}
											</>
											:
											null
									}
								</>
							);
						})
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

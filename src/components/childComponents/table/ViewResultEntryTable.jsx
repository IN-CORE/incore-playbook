import React, { useEffect, useState } from "react";

import {
	IconButton,
	Link,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel
} from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import UnfoldLess from "@material-ui/icons/UnfoldLess";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { parseDateTime } from "../../../utils/common";

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
	statusFinished: {
		textTransform: "lowercase",
		color: "#2E384D",
		backgroundColor: "#9BD686",
		padding: "auto 2px",
		textAlign: "center"
	},
	statusWaiting: {
		textTransform: "lowercase",
		color: "#2E384D",
		backgroundColor: "#8798AD",
		padding: "auto 2px",
		textAlign: "center"
	},
	statusRunning: {
		textTransform: "lowercase",
		color: "#2E384D",
		backgroundColor: "#F7C137",
		padding: "auto 2px",
		textAlign: "center"
	},
	statusUnsuccess: {
		textTransform: "lowercase",
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
		minHeight: "34px"
	},
	clickableLink: {
		"&:hover": {
			cursor: "pointer"
		},
		"color": "#00619D",
		"fontWeight": 500,
		"margin": "auto auto"
	},
	clickableLinkDisabled: {
		pointerEvents: "none",
		textDecoration: "none",
		color: "#9E9E9E",
		fontWeight: 500,
		margin: "auto auto"
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
	const { fieldNames, executions, preview } = props;
	const [widgetList, setWidgetList] = useState([]);

	// list all the widgets from workflow definition
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);
	useEffect(() => {
		setWidgetList(
			datawolfWorkflowConfig.outputs.datasets[0].datasetsMap.reduce((list, item) => {
				if (!list.includes(item.datasets.widget)) {
					return [...list, item.datasets.widget];
				} else {
					return list;
				}
			}, [])
		);
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

	const checkResultsReady = (listWidgets, currentExecutionDataset) => {
		const requiredDatasetIds = datawolfWorkflowConfig.outputs.datasets[0].datasetsMap.reduce((list, item) => {
			if (listWidgets.includes(item.datasets.widget)) {
				return [...list, item.datasetId];
			}

			return list;
		}, []);

		return requiredDatasetIds.every(
			(reqId) => reqId in currentExecutionDataset && currentExecutionDataset[reqId] !== "ERROR"
		);
	};

	const classes = useStyles();

	return (
		<TableContainer>
			{/* {console.log(widgetList)} */}
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						{fieldNames.map((fieldName) => {
							return (
								<TableCell
									className={classes.tableHeaderCell}
									key={fieldName["columnName"]}
									sortDirection={orderBy === fieldName["columnName"] ? order : false}
								>
									<TableSortLabel
										active={orderBy === fieldName["columnName"]}
										direction={orderBy === fieldName["columnName"] ? order : "asc"}
										onClick={createSortHandler(fieldName["columnName"])}
									>
										{fieldName["prettyName"]}
									</TableSortLabel>
								</TableCell>
							);
						})}
						{/*TODO implement expending*/}
						<TableCell className={classes.tableHeaderCell} key="dot" />
					</TableRow>
				</TableHead>
				<TableBody>
					{stableSort(executions, getComparator(order, orderBy)).map((execution) => {
						return (
							<>
								<TableRow className={classes.tableBodyRow} key={execution["id"]}>
									{fieldNames.map((fieldName, idx) => {
										if (fieldName["columnName"] === "finalStatus") {
											return (
												<TableCell key={`${execution["id"]}-${idx}`}>
													{(() => {
														if (execution["finalStatus"].toLowerCase() === "finished") {
															return (
																<p className={classes.statusFinished}>
																	{execution[fieldName["columnName"]]}
																</p>
															);
														} else if (
															execution["finalStatus"].toLowerCase() === "waiting" ||
															execution["finalStatus"].toLowerCase() === "queued"
														) {
															return (
																<p className={classes.statusWaiting}>
																	{execution[fieldName["columnName"]]}
																</p>
															);
														} else if (
															execution["finalStatus"].toLowerCase() === "failed" ||
															execution["finalStatus"].toLowerCase() === "aborted"
														) {
															return (
																<p className={classes.statusUnsuccess}>
																	{execution[fieldName["columnName"]]}
																</p>
															);
														} else if (
															execution["finalStatus"].toLowerCase() === "running"
														) {
															return (
																<p className={classes.statusRunning}>
																	{execution[fieldName["columnName"]]}
																</p>
															);
														} else {
															return <p>{execution[fieldName["columnName"]]}</p>;
														}
													})()}
												</TableCell>
											);
										} else if (fieldName["columnName"] === "date") {
											return (
												<TableCell
													key={`${execution["id"]}-${idx}`}
													className={
														idx === 0 ? classes.firstTableBodyCell : classes.tableBodyCell
													}
												>
													{parseDateTime(execution[fieldName["columnName"]])}
												</TableCell>
											);
										} else {
											return (
												<TableCell
													key={`${execution["id"]}-${idx}`}
													className={
														idx === 0 ? classes.firstTableBodyCell : classes.tableBodyCell
													}
												>
													{fieldName["columnName"] === "creator" &&
													execution[fieldName["columnName"]] &&
													"firstName" in execution[fieldName["columnName"]] &&
													"lastName" in execution[fieldName["columnName"]]
														? `${execution[fieldName["columnName"]].firstName}
														${execution[fieldName["columnName"]].lastName}`
														: execution[fieldName["columnName"]]}
												</TableCell>
											);
										}
									})}
									<TableCell className={classes.tableBodyCell} key={`${execution["id"]}-unfold`}>
										{execution["id"] === expandId && execution["id"] !== collapseId ? (
											<IconButton
												aria-label="unfold"
												onClick={() => {
													setCollapseId(execution["id"]);
													setExpandId("");
												}}
											>
												<UnfoldLess />
											</IconButton>
										) : (
											<IconButton
												aria-label="unfold"
												onClick={() => {
													setExpandId(execution["id"]);
													setCollapseId("");
												}}
											>
												<UnfoldMoreIcon />
											</IconButton>
										)}
									</TableCell>
								</TableRow>
								{execution["id"] === expandId && execution["id"] !== collapseId ? (
									<>
										{/* {console.log(execution)} */}
										{/*resilience metrics*/}
										{widgetList.includes("CGE") &&
										widgetList.includes("PopDislocation") &&
										widgetList.includes("BldgFunctionality") ? (
											<TableRow
												className={classes.subBodyRow}
												key={`${execution["id"]}-resilience-metrics`}
											>
												<TableCell
													colSpan={6}
													key={`${execution["id"]}-resilience-metrics-title`}
												>
													<Link
														color="primary"
														onClick={() => {
															preview(execution["id"], "ResilienceMetrics");
														}}
														className={
															checkResultsReady(
																["CGE", "PopDislocation", "BldgFunctionality"],
																execution.datasets
															)
																? classes.clickableLink
																: classes.clickableLinkDisabled
														}
													>
														Resilience Metrics
													</Link>
												</TableCell>
											</TableRow>
										) : (
											<></>
										)}
										{/*EPF damage*/}
										{widgetList.includes("PoleDamage") ? (
											<TableRow
												className={classes.subBodyRow}
												key={`${execution["id"]}-epf-pole`}
											>
												<TableCell colSpan={6} key={`${execution["id"]}-epf-pole-title`}>
													<Link
														color="primary"
														onClick={() => {
															preview(execution["id"], "PoleDamage");
														}}
														className={
															checkResultsReady(["PoleDamage"], execution.datasets)
																? classes.clickableLink
																: classes.clickableLinkDisabled
														}
													>
														Pole Damage (Electrical Power Network)
													</Link>
												</TableCell>
											</TableRow>
										) : (
											<></>
										)}
										{widgetList.includes("SubstationDamage") ? (
											<TableRow
												className={classes.subBodyRow}
												key={`${execution["id"]}-epf-substation`}
											>
												<TableCell colSpan={6} key={`${execution["id"]}-epf-substation-title`}>
													<Link
														color="primary"
														onClick={() => {
															preview(execution["id"], "SubstationDamage");
														}}
														className={
															checkResultsReady(["SubstationDamage"], execution.datasets)
																? classes.clickableLink
																: classes.clickableLinkDisabled
														}
													>
														Substation Damage (Electrical Power Network)
													</Link>
												</TableCell>
											</TableRow>
										) : (
											<></>
										)}
										{/*building damage*/}
										{widgetList.includes("BldgDamage") ? (
											<TableRow
												className={classes.subBodyRow}
												key={`${execution["id"]}-bldg-dmg`}
											>
												<TableCell colSpan={6} key={`${execution["id"]}-bldg-dmg-title`}>
													<Link
														color="primary"
														onClick={() => {
															preview(execution["id"], "BldgDamage");
														}}
														className={
															checkResultsReady(["BldgDamage"], execution.datasets)
																? classes.clickableLink
																: classes.clickableLinkDisabled
														}
													>
														Building Damage
													</Link>
												</TableCell>
											</TableRow>
										) : (
											<></>
										)}

										{/*mcs*/}
										{widgetList.includes("BldgMCS") ? (
											<TableRow className={classes.subBodyRow} key={`${execution["id"]}-mcs`}>
												<TableCell colSpan={6} key={`${execution["id"]}-mcs-title`}>
													<Link
														color="primary"
														onClick={() => {
															preview(execution["id"], "BldgMCS");
														}}
														className={
															checkResultsReady(["BldgMCS"], execution.datasets)
																? classes.clickableLink
																: classes.clickableLinkDisabled
														}
													>
														Building Functionality (without Electrical Power Dependency)
													</Link>
												</TableCell>
											</TableRow>
										) : (
											<></>
										)}
										{/*bldg functionality*/}
										{widgetList.includes("BldgFunctionality") ? (
											<TableRow
												className={classes.subBodyRow}
												key={`${execution["id"]}-bldg-functionality`}
											>
												<TableCell
													colSpan={6}
													key={`${execution["id"]}-bldg-functionality-title`}
												>
													<Link
														color="primary"
														onClick={() => {
															preview(execution["id"], "BldgFunctionality");
														}}
														className={
															checkResultsReady(["BldgFunctionality"], execution.datasets)
																? classes.clickableLink
																: classes.clickableLinkDisabled
														}
													>
														Building Functionality (with Electrical Power Dependency)
													</Link>
												</TableCell>
											</TableRow>
										) : (
											<></>
										)}
										{/*CGE*/}
										{widgetList.includes("CGE") ? (
											<TableRow className={classes.subBodyRow} key={`${execution["id"]}-cge`}>
												<TableCell colSpan={6} key={`${execution["id"]}-cge-title`}>
													<Link
														color="primary"
														onClick={() => {
															preview(execution["id"], "CGE");
														}}
														className={
															checkResultsReady(["CGE"], execution.datasets)
																? classes.clickableLink
																: classes.clickableLinkDisabled
														}
													>
														Economic Prediction Model (Computable General Equilibrium)
													</Link>
												</TableCell>
											</TableRow>
										) : (
											<></>
										)}
										{/*population dislocation*/}
										{widgetList.includes("PopDislocation") ? (
											<TableRow
												className={classes.subBodyRow}
												key={`${execution["id"]}-popdislocation`}
											>
												<TableCell colSpan={6} key={`${execution["id"]}-popdislocation-title`}>
													<Link
														color="primary"
														onClick={() => {
															preview(execution["id"], "PopDislocation");
														}}
														className={
															checkResultsReady(["PopDislocation"], execution.datasets)
																? classes.clickableLink
																: classes.clickableLinkDisabled
														}
													>
														Population Dislocation
													</Link>
												</TableCell>
											</TableRow>
										) : (
											<></>
										)}
										{/*Housing Recover*/}
										{widgetList.includes("HHS") ? (
											<TableRow className={classes.subBodyRow} key={`${execution["id"]}-HHS`}>
												<TableCell colSpan={6} key={`${execution["id"]}-HHS-title`}>
													<Link
														color="primary"
														onClick={() => {
															preview(execution["id"], "HHS");
														}}
														className={
															checkResultsReady(["HHS"], execution.datasets)
																? classes.clickableLink
																: classes.clickableLinkDisabled
														}
													>
														Housing Recovery
													</Link>
												</TableCell>
											</TableRow>
										) : (
											<></>
										)}
									</>
								) : null}
							</>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

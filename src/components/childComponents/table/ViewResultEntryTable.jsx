import React, { useEffect, useState } from "react";

import {
	IconButton,
	Link,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel
} from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import UnfoldLess from "@material-ui/icons/UnfoldLess";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { getComparator, isAdmin, parseDateTime, stableSort } from "../../../utils/common";
import { checkFileDescriptors } from "../../../utils/datawolf";

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
		"margin": "auto 2em"
	},
	clickableLinkDisabled: {
		pointerEvents: "none",
		textDecoration: "none",
		color: "#9E9E9E",
		fontWeight: 500,
		margin: "auto 2em"
	}
});

export function ViewResultEntryTable(props) {
	const { fieldNames, executions, preview } = props;
	const [widgetList, setWidgetList] = useState([]);

	const [resMatricsReadiness, setResMatricsReadiness] = useState(false);
	const [epfPoleDmgReadiness, setEpfPoleDmgReadiness] = useState(false);
	const [epfSubDmgReadiness, setEpfSubDmgReadiness] = useState(false);
	const [bldgDmgReadiness, setBldgDmgReadiness] = useState(false);
	const [bldgFailReadiness, setBldgFailReadiness] = useState(false);
	const [bldgFuncReadiness, setBldgFuncReadiness] = useState(false);
	const [sectorShockReadiness, setSectorShockReadiness] = useState(false);
	const [cgeReadiness, setCgeReadiness] = useState(false);
	const [popDislReadiness, setPopDislReadiness] = useState(false);
	const [hhrsReadiness, setHhrsReadiness] = useState(false);

	const [expandId, setExpandId] = useState("");
	const [collapseId, setCollapseId] = useState("");

	const [order, setOrder] = useState("desc");
	const [orderBy, setOrderBy] = React.useState("date");

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	// list all the widgets from workflow definition
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const _checkResultsReady = async (listWidgets, currentExecutionDataset) => {
		const requiredDatasetIds = datawolfWorkflowConfig.outputs.datasets[0].datasetsMap.reduce((list, item) => {
			if (listWidgets.includes(item.datasets.widget)) {
				return [...list, item.datasetId];
			}

			return list;
		}, []);

		return await requiredDatasetIds.reduce(async (state, reqId) => {
			return (
				reqId in currentExecutionDataset &&
				currentExecutionDataset[reqId] !== "ERROR" &&
				(await checkFileDescriptors(datawolfConfig, currentExecutionDataset[reqId])) > 0 &&
				state
			);
		}, true);
	};

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

	useEffect(() => {
		executions.map(async (execution) => {
			if (execution["id"] === expandId) {
				setResMatricsReadiness(await _checkResultsReady(["CGE", "PopDislocation"], execution.datasets));
				setEpfPoleDmgReadiness(await _checkResultsReady(["PoleDamage"], execution.datasets));
				setEpfSubDmgReadiness(await _checkResultsReady(["SubstationDamage"], execution.datasets));
				setBldgDmgReadiness(await _checkResultsReady(["BldgDamage"], execution.datasets));
				setBldgFailReadiness(await _checkResultsReady(["BldgMCS"], execution.datasets));
				setBldgFuncReadiness(await _checkResultsReady(["BldgFunctionality"], execution.datasets));
				setSectorShockReadiness(await _checkResultsReady(["SectorShocks"], execution.datasets));
				setCgeReadiness(await _checkResultsReady(["CGE"], execution.datasets));
				setPopDislReadiness(await _checkResultsReady(["PopDislocation", "BldgDamage"], execution.datasets));
				setHhrsReadiness(await _checkResultsReady(["HHS"], execution.datasets));
			}
		});
	}, [executions, expandId]);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - executions.length) : 0;

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
					{stableSort(executions, getComparator(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((execution) => {
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
															idx === 0
																? classes.firstTableBodyCell
																: classes.tableBodyCell
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
															idx === 0
																? classes.firstTableBodyCell
																: classes.tableBodyCell
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
															colSpan={7}
															key={`${execution["id"]}-resilience-metrics-title`}
														>
															<Link
																color="primary"
																onClick={() => {
																	preview(execution["id"], "ResilienceMetrics");
																}}
																className={
																	resMatricsReadiness
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
													<TableCell colSpan={7} key={`${execution["id"]}-epf-pole-title`}>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "PoleDamage");
															}}
															className={
																epfPoleDmgReadiness
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
													<TableCell
														colSpan={7}
														key={`${execution["id"]}-epf-substation-title`}
													>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "SubstationDamage");
															}}
															className={
																epfSubDmgReadiness
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
													<TableCell colSpan={7} key={`${execution["id"]}-bldg-dmg-title`}>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "BldgDamage");
															}}
															className={
																bldgDmgReadiness
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
													<TableCell colSpan={7} key={`${execution["id"]}-mcs-title`}>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "BldgMCS");
															}}
															className={
																bldgFailReadiness
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
														colSpan={7}
														key={`${execution["id"]}-bldg-functionality-title`}
													>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "BldgFunctionality");
															}}
															className={
																bldgFuncReadiness
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
											{/*Sector Shocks*/}
											{widgetList.includes("SectorShocks") ? (
												<TableRow
													className={classes.subBodyRow}
													key={`${execution["id"]}-sector-shocks`}
												>
													<TableCell
														colSpan={7}
														key={`${execution["id"]}-sector-shocks-title`}
													>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "SectorShocks");
															}}
															className={
																sectorShockReadiness
																	? classes.clickableLink
																	: classes.clickableLinkDisabled
															}
														>
															Capital Shocks
														</Link>
													</TableCell>
												</TableRow>
											) : (
												<></>
											)}
											{/*CGE*/}
											{widgetList.includes("CGE") ? (
												<TableRow className={classes.subBodyRow} key={`${execution["id"]}-cge`}>
													<TableCell colSpan={7} key={`${execution["id"]}-cge-title`}>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "CGE");
															}}
															className={
																cgeReadiness
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
													<TableCell
														colSpan={7}
														key={`${execution["id"]}-popdislocation-title`}
													>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "PopDislocation");
															}}
															className={
																popDislReadiness
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
													<TableCell colSpan={7} key={`${execution["id"]}-HHS-title`}>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "HHS");
															}}
															className={
																hhrsReadiness
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

											{/*Logs: Only allow the admin to see the logs*/}
											{/*Always show logs*/}
											{widgetList.includes("Log") && isAdmin(globalConfig.hostname) ? (
												<TableRow className={classes.subBodyRow} key={`${execution["id"]}-Log`}>
													<TableCell colSpan={7} key={`${execution["id"]}-Log-title`}>
														<Link
															color="primary"
															onClick={() => {
																preview(execution["id"], "Log");
															}}
															className={classes.clickableLink}
														>
															Logs
														</Link>
													</TableCell>
												</TableRow>
											) : (
												<></>
											)}
										</>
									) : (
										<></>
									)}
								</>
							);
						})}
					{emptyRows > 0 && (
						<TableRow
							style={{
								height: 53 * emptyRows
							}}
						>
							<TableCell colSpan={7} />
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={executions.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
}

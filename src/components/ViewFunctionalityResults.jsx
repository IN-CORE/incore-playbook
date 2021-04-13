import React, {useState} from "react";

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
		minWidth: "250px",
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

export function ViewFunctionalityResults(props) {

	const {fieldNames, fields, previewBldgDmg, previewEpfDmg, previewBldgFunc, previewInterd,} = props;

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
						stableSort(fields, getComparator(order, orderBy)).map((field) => {
							return (
								<>
									<TableRow className={classes.tableBodyRow} key={field["id"]}>
										{
											fieldNames.map((fieldName, idx) => {
												if (fieldName["columnName"] === "finalStatus") {
													return (
														<TableCell key={idx}>
															<p className={
																field["finalStatus"].toLowerCase() === "finished" ?
																	classes.statusSuccess :
																	classes.statusUnsuccess
															}>
																{field[fieldName["columnName"]].toLowerCase()}</p>
														</TableCell>
													);
												} else {
													return (
														<TableCell key={idx}
																   className={idx === 0 ? classes.firstTableBodyCell :
																	   classes.tableBodyCell}>
															{field[fieldName["columnName"]]}</TableCell>
													);
												}
											})
										}
										{/*TODO implement expending*/}
										<TableCell className={classes.tableBodyCell} key="unfold">
											{
												field["id"] === expandId && field["id"] !== collapseId ?
													<IconButton aria-label="unfold" onClick={() => {
														setCollapseId(field["id"]);
														setExpandId("");
													}}>
														<UnfoldLess/>
													</IconButton>
													:
													<IconButton aria-label="unfold" onClick={() => {
														setExpandId(field["id"]);
														setCollapseId("");
													}}>
														<UnfoldMoreIcon/>
													</IconButton>
											}

										</TableCell>
									</TableRow>
									{
										(field["id"] === expandId && field["id"] !== collapseId) ?
											<>
												<TableRow className={classes.subBodyRow}>
													<TableCell>Interdependency</TableCell>
													<TableCell colSpan={3}/>
													<TableCell colSpan={2}>
														<Link color="primary" onClick={() => {previewInterd(field["id"]);}}
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>
															View
														</Link>
														<Link color="primary"
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>Download
														</Link>
													</TableCell>
												</TableRow>
												<TableRow className={classes.subBodyRow}>
													<TableCell>Building Damage Result</TableCell>
													<TableCell colSpan={3}/>
													<TableCell colSpan={2}>
														<Link color="primary" onClick={() => {previewBldgDmg(field["id"]);}}
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>
															View
														</Link>
														<Link color="primary"
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>
															Download
														</Link>
													</TableCell>
												</TableRow>
												<TableRow className={classes.subBodyRow}>
													<TableCell>EPF Pole Damage Result</TableCell>
													<TableCell colSpan={3}/>
													<TableCell colSpan={2}>
														<Link color="primary" onClick={() => {previewEpfDmg(field["id"]);}}
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>
															View
														</Link>
														<Link color="primary"
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>Download</Link>
													</TableCell>
												</TableRow>
												<TableRow className={classes.subBodyRow}>
													<TableCell>EPF Substation Damage Result</TableCell>
													<TableCell colSpan={3}/>
													<TableCell colSpan={2}>
														<Link color="primary" onClick={() => {previewEpfDmg(field["id"]);}}
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>
															View
														</Link>
														<Link color="primary"
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>Download</Link>
													</TableCell>
												</TableRow>
												<TableRow className={classes.subBodyRow}>
													<TableCell>Building Functionality Result</TableCell>
													<TableCell colSpan={3}/>
													<TableCell colSpan={2}>
														<Link color="primary" onClick={() => {previewBldgFunc(field["id"]);}}
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>
															View
														</Link>
														<Link color="primary"
															  className={field["finalStatus"] === undefined ||
															  field["finalStatus"] === "FINISHED" ?
																  classes.clickableLink : classes.clickableLinkDisabled}>Download</Link>
													</TableCell>
												</TableRow>
											</> :
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

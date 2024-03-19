import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	Step,
	StepLabel,
	Stepper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LoadingOverlay from "react-loading-overlay";
import MapIcon from "@material-ui/icons/Map";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import { makeStyles } from "@material-ui/core/styles";

import { IncoreInputLabel } from "../styledComponents/IncoreInputLabel";
import { IncoreTextField } from "../styledComponents/IncoreInput";
import { ZoneSelectionMapDialog } from "./map/ZoneSelectionMapDialog";
import RetrofitStrategySummary from "./RetrofitStrategySummary";
import {
	IncoreMenuItem,
	IncoreSelectBox,
} from "../styledComponents/IncoreSelect";
import { fetchZoneGeoJson as fetchZoneGeoJsonAction } from "../../actions/attributes";
import { IncoreFootNote } from "../styledComponents/IncoreFootNote";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	button: {
		margin: theme.spacing(1),
	},
	actionButtons: {
		fontSize: "15px",
		fontWeight: 400,
		letterSpacing: "0.15px",
		color: "#000000B2",
		textTransform: "capitalize",
	},
	addMoreStrategyBtn: {
		font: "Roboto",
		fontSize: "15px",
		fontWeight: 600,
		letterSpacing: "0.46px",
		textAlign: "left",
		borderColor: "#00619D",
		color: "#00619D",
		marginTop: "20px",
	},
	nxtBuildBtn: {
		font: "Roboto",
		fontSize: "15px",
		fontWeight: 500,
		letterSpacing: "0.4px",
		backgroundColor: "#00619D",
		color: "#FFFFFF",
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	table: {
		minWidth: 650,
	},
	tableContainer: {
		// maxWidth: "960px"
	},
	tableHeaderCellNo: {
		width: "8%",
	},
	tableHeaderCellConditions: {
		borderRight: "1px solid #0000001F",
		borderLeft: "1px solid #0000001F",
	},
	tableHeaderCellRetrofit: {
		borderRight: "1px solid #0000001F",
		borderLeft: "1px solid #0000001F",
		width: "30%",
		maxWidth: "30%",
	},
	tableHeaderCellActions: {
		width: "10%",
	},
	tableHeaderRow: {
		font: "Roboto",
		fontSize: "15px",
		fontWeight: 400,
		letterSpacing: "0.17px",
		backgroundColor: "#EDF1F4",
		color: "#000000DE",
	},
	tableSavedCell: {
		padding: 0,
		backgroundColor: "#FBFBFB",
		border: "1px solid #E0E0E0",
	},
	tableUnSavedCell: {
		border: "1px solid #E0E0E0",
		verticalAlign: "top",
	},
	tableSavedText: {
		font: "Roboto",
		fontSize: "15px",
		fontWeight: 400,
		letterSpacing: "0.15px",
		color: "#0000008A",
	},
	tableSavedValue: {
		font: "Roboto",
		fontSize: "15px",
		fontWeight: 400,
		letterSpacing: "0.15px",
		color: "#000000DE",
	},
}));

export default function RetrofitStrategyBuilder(props) {
	const classes = useStyles();

	const { strategyBuilderModalStatus, onRetrofitStrategyBuilderClose } = props;
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [activeStep, setActiveStep] = React.useState(0);
	const [loading, setLoading] = React.useState(false);

	// Step 1
	const [name, setName] = React.useState("");
	const [nameError, setNameError] = React.useState(false);
	const [description, setDescription] = React.useState("");

	// Step 2
	const [addedRows, setAddedRows] = React.useState([]);
	const [numRow, setNumRow] = React.useState(1);
	const [mapDialogOpen, setMapDialogOpen] = React.useState(false);
	const [selectedValues, setSelectedValues] = React.useState({});
	const [addError, setAddError] = React.useState(null);
	const [showAddRetrofitStrategyRow, setShowAddRetrofitStrategyRow] =
		React.useState(true);
	const [currentlyEditing, setCurrentlyEditing] = React.useState(null);
	// get zone name for redux
	const zoneNames = useSelector((state) => state.attribute.zoneNames);
	const dispatch = useDispatch();
	const fetchZoneGeoJson = (globalConfig) =>
		dispatch(fetchZoneGeoJsonAction(globalConfig));

	// Step 3
	const [retrofitSummary, setRetrofitSummary] = React.useState({});
	const [rules, setRules] = React.useState(null);
	const [rsLayerId, setRsLayerId] = React.useState(null);

	let conditionKeys = [];
	let conditionSelectKeys = [];
	let retrofitMethodKeys = [];
	globalConfig.retrofitStrategyBuilder.conditions.forEach((condition) => {
		conditionKeys.push(condition.key);
		if (condition.type === "mapSelect" || condition.type === "select") {
			conditionSelectKeys.push(condition.key);
		}
	});
	globalConfig.retrofitStrategyBuilder.retrofitMethods.forEach((method) =>
		retrofitMethodKeys.push(method.key),
	);

	useEffect(() => {
		// get zone name for redux
		fetchZoneGeoJson(globalConfig);
	}, []);

	const sanityCheck = () => {
		// for any missing fields
		let disabled = false;
		conditionKeys.forEach((key) => {
			if (
				selectedValues[key] === undefined ||
				selectedValues[key].value === ""
			) {
				disabled = true;
			}
		});
		retrofitMethodKeys.forEach((key) => {
			if (
				selectedValues[key] === undefined ||
				selectedValues[key].value === ""
			) {
				disabled = true;
			}
		});
		if (disabled) {
			setAddError("Please fill all the fields");
		}

		// for any duplicates
		let matches = addedRows.filter((row, i) => {
			if (currentlyEditing === i) {
				return false;
			}
			let matches = [];
			conditionSelectKeys.forEach((key) => {
				if (
					row[key] !== undefined &&
					selectedValues[key] !== undefined &&
					row[key].value === selectedValues[key].value
				) {
					matches.push(true);
				} else {
					matches.push(false);
				}
			});

			return matches.every((v) => v === true);
		});

		if (matches.length > 0) {
			setAddError("Duplicate entry, please choose unique conditions");
			disabled = true;
		}

		return !disabled;
	};

	const handleAddRow = () => {
		// perform sanity check
		const allowRowAdded = sanityCheck();
		if (allowRowAdded) {
			if (currentlyEditing !== null) {
				const updatedRows = addedRows.map((row, i) => {
					if (i === currentlyEditing) {
						return selectedValues;
					}
					return row;
				});
				setAddedRows(updatedRows);
				setCurrentlyEditing(null);
				setSelectedValues({});
				setShowAddRetrofitStrategyRow(false);
				return;
			}

			setNumRow(numRow + 1);
			const updateRows = [...addedRows, selectedValues];
			setAddedRows(updateRows);
			setSelectedValues({});
			setShowAddRetrofitStrategyRow(false);
		}
	};

	const steps = [
		"Start to build a Retrofit Strategy",
		"Add Conditions and Retrofit Methods",
		"Review Retrofit Summary",
	];

	const AddRetrofitStrategyRow = () => {
		return (
			<TableRow>
				{/*number cell align middle veritcally*/}
				<TableCell
					align="center"
					className={classes.tableUnSavedCell}
					style={{ verticalAlign: "middle" }}
				>
					{currentlyEditing !== null ? currentlyEditing + 1 : numRow}
				</TableCell>
				<TableCell className={classes.tableUnSavedCell}>
					<Grid
						container
						alignItems="center"
						spacing={3}
						key={"add-retrofit-strategy-row"}
					>
						{globalConfig.retrofitStrategyBuilder.conditions.map(
							(condition) => {
								// Map select need to fill in the options with zone name
								if (condition.type === "mapSelect") {
									let selectEndIconProp = {};
									selectEndIconProp.IconComponent = () => (
										<IconButton onClick={() => setMapDialogOpen(true)}>
											<MapIcon />
										</IconButton>
									);
									return (
										<>
											<Grid item xs={4} key={condition.label + 1}>
												<Typography variant="body1">
													{condition.label}
												</Typography>
											</Grid>
											<Grid item xs={8} key={condition.label + 2}>
												<IncoreSelectBox
													labelId="label"
													id={`${condition.label}Select`}
													variant="outlined"
													onChange={(e) => {
														if (e.target.value !== "") {
															setSelectedValues({
																...selectedValues,
																[condition.key]: {
																	label: condition.label,
																	type: "string",
																	// assume zone label and name are the same
																	value: e.target.value,
																	valueLabel: e.target.value,
																},
															});
															setAddError(null);
														}
													}}
													value={
														selectedValues[condition.key]
															? selectedValues[condition.key].value
															: ""
													}
													{...selectEndIconProp}
												>
													{zoneNames.map((zoneOption) => (
														<IncoreMenuItem value={zoneOption} key={zoneOption}>
															{zoneOption}
														</IncoreMenuItem>
													))}
												</IncoreSelectBox>
											</Grid>
										</>
									);
								} else if (condition.type === "select") {
									return (
										<>
											<Grid item xs={4} key={condition.label + 1}>
												<Typography variant="body1">
													{condition.label}
												</Typography>
											</Grid>
											<Grid item xs={8} key={condition.label + 2}>
												<IncoreSelectBox
													labelId="label"
													id={`${condition.label}Select`}
													variant="outlined"
													onChange={(e) => {
														if (e.target.value !== "") {
															const value = e.target.value;
															const selectedOption =
																condition.possibleOptions.find(
																	(option) => option.value === value,
																);
															const selectedOptionLabel = selectedOption
																? selectedOption.label
																: "";
															setSelectedValues({
																...selectedValues,
																[condition.key]: {
																	label: condition.label,
																	type: "string",
																	value: value,
																	valueLabel: selectedOptionLabel,
																},
															});
															setAddError(null);
														}
													}}
													value={
														selectedValues[condition.key]
															? selectedValues[condition.key].value
															: ""
													}
												>
													{condition.possibleOptions.map((option) => (
														<IncoreMenuItem
															value={option.value}
															key={option.value}
														>
															{option.label}
														</IncoreMenuItem>
													))}
												</IncoreSelectBox>
											</Grid>
										</>
									);
								} else if (condition.type === "number") {
									return (
										<>
											<Grid item xs={4} key={condition.label + 1}>
												<Typography variant="body1">
													{condition.label}
												</Typography>
											</Grid>
											<Grid item xs={8} key={condition.label + 2}>
												<IncoreTextField
													variant="outlined"
													value={
														selectedValues[condition.key]
															? selectedValues[condition.key].value
															: ""
													}
													type="number"
													onChange={(e) => {
														if (
															(e.target.value >= 0 && e.target.value <= 100) ||
															e.target.value === ""
														) {
															setSelectedValues({
																...selectedValues,
																[condition.key]: {
																	label: condition.label,
																	type: "number",
																	value: e.target.value,
																	valueLabel: `${e.target.value}%`,
																},
															});
															setAddError(null);
														}
													}}
													inputProps={{ min: 0, max: 100, step: 1 }}
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">%</InputAdornment>
														),
													}}
												/>
											</Grid>
										</>
									);
								}
							},
						)}
					</Grid>
				</TableCell>
				<TableCell className={classes.tableUnSavedCell} align="left">
					<Grid container alignItems="center" spacing={3}>
						{globalConfig.retrofitStrategyBuilder.retrofitMethods.map(
							(method) => {
								if (method.type === "select") {
									return (
										<>
											<Grid item xs={12} key={method.label + 1}>
												<IncoreSelectBox
													labelId={`${method.label}Select`}
													id={`${method.label}Select`}
													variant="outlined"
													onChange={(e) => {
														if (e.target.value !== "") {
															const value = JSON.parse(e.target.value);
															const selectedOption =
																method.possibleOptions.find(
																	(option) =>
																		option.value.ret_key === value.ret_key &&
																		option.value.ret_val === value.ret_val,
																);
															const selectedOptionLabel = selectedOption
																? selectedOption.label
																: "";
															setSelectedValues({
																...selectedValues,
																[method.key]: {
																	label: method.label,
																	type: "string",
																	value: value,
																	valueLabel: selectedOptionLabel,
																},
															});
															setAddError(null);
														}
													}}
													value={
														selectedValues[method.key]
															? JSON.stringify(selectedValues[method.key].value)
															: ""
													}
												>
													{method.possibleOptions.map((option) => (
														<IncoreMenuItem
															value={JSON.stringify(option.value)}
															key={JSON.stringify(option.value)}
														>
															{option.label}
														</IncoreMenuItem>
													))}
												</IncoreSelectBox>
											</Grid>
										</>
									);
								}
							},
						)}
					</Grid>
				</TableCell>
				<TableCell className={classes.tableUnSavedCell} align="left">
					<Grid container spacing={0}>
						<Grid item xs={12}>
							<Button
								disabled={
									currentlyEditing !== null
										? false
										: numRow ===
										  globalConfig.retrofitStrategyBuilder.maxStrategies
								}
								variant="outlined"
								color="primary"
								onClick={handleAddRow}
								startIcon={
									currentlyEditing !== null ? <SaveIcon /> : <AddIcon />
								}
							>
								{currentlyEditing !== null ? "Save" : "Add"}
							</Button>
						</Grid>
						<Grid item xs={12}>
							<IncoreFootNote style={{ color: "red" }}>
								{addError}
							</IncoreFootNote>
						</Grid>
					</Grid>
				</TableCell>
			</TableRow>
		);
	};

	const handleNext = () => {
		switch (activeStep) {
			case 0:
				// name should not have special characters
				if (name.match(/^[0-9a-zA-Z\-\_ ]+$/) === null) {
					setNameError(true);
				} else {
					setActiveStep(activeStep + 1);
				}
				break;
			case 1:
				setActiveStep(activeStep + 1);
				break;
			case 2:
				setActiveStep(0);
				break;
			default:
				return "Unknown step";
		}
	};

	const handleSubmit = () => {
		if (showAddRetrofitStrategyRow) {
			setAddError("Save the current rule before submitting.");
			return;
		}
		// prepare data
		let payload = {
			name: name,
			description: description,
			testbed: globalConfig.testBed,
			rules: addedRows.length,
		};

		conditionKeys.forEach((key) => (payload[key] = [])); // add all condition keys to payload
		retrofitMethodKeys.forEach(
			(key) => (payload[key] = { ret_keys: [], ret_vals: [] }),
		); // add all retrofit method keys to payload

		// when new condition or retrofit method is added, the payload should be updated
		addedRows.forEach((row) => {
			conditionKeys.forEach((key) => payload[key].push(row[key].value)); // add all condition keys to payload
			retrofitMethodKeys.forEach((key) => {
				payload[key].ret_keys.push(row[key].value.ret_key);
				payload[key].ret_vals.push(row[key].value.ret_val);
			}); // add all retrofit method keys to payload
		});

		console.log(payload);

		setLoading(true);
		// make API call to save the strategy
		let responseJson = {
			total: {
				num_bldg: 3283,
				num_bldg_no_cost: 42,
				cost: 117260721.43,
			},
			by_rule: {
				0: {
					num_bldg: 3191,
					num_bldg_no_cost: 40,
					cost: 94393478.73,
				},
				1: {
					num_bldg: 90,
					num_bldg_no_cost: 0,
					cost: 22867242.7,
				},
				2: {
					num_bldg: 2,
					num_bldg_no_cost: 2,
					cost: 0,
				},
			},
		};

		let rsDetailsLayerId = "dummy_layer_id";

		let samplePayload = {
			testbed: "galveston",
			rules: 3,
			zones: ["1P", "1P", "0.2P"],
			strtypes: ["1", "2", "1"],
			pcts: [1, 1, 1],
			retrofits: {
				ret_keys: ["elevation", "elevation", "elevation"],
				ret_vals: [5, 10, 5],
			},
		};
		setRsLayerId(rsDetailsLayerId);
		setRules(samplePayload);
		setRetrofitSummary(responseJson);
		setActiveStep(activeStep + 1);
		setLoading(false);
	};

	const handleCloseSummary = () => {
		onRetrofitStrategyBuilderClose();

		setActiveStep(0);
		// Step 1
		setName("");
		setDescription("");
		// Step 2
		setAddedRows([]);
		setNumRow(1);
		setSelectedValues({});
		setCurrentlyEditing(null);
		setShowAddRetrofitStrategyRow(true);
		// Step 3
		setRetrofitSummary({});
	};

	return (
		<Dialog
			open={strategyBuilderModalStatus}
			onClose={onRetrofitStrategyBuilderClose}
			PaperProps={{
				style: { minHeight: "800px" }, // Set your desired minimum height here
			}}
			maxWidth="lg"
			fullWidth
			scroll="paper"
		>
			<DialogTitle>
				<Typography variant="h6">Retrofit Strategy Builder</Typography>
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onRetrofitStrategyBuilderClose}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				<Stepper activeStep={activeStep}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<LoadingOverlay active={loading} spinner text="Loading...">
					<Grid container spacing={3}>
						{activeStep === 0 ? (
							<Grid item xs={12}>
								<Box className="inputGroup" style={{ height: "auto" }}>
									<IncoreInputLabel className="required-field">
										Name
									</IncoreInputLabel>
									<IncoreTextField
										variant="outlined"
										value={name}
										error={nameError}
										helperText={
											nameError
												? "Name should not have special characters other than '-' and '_'. Please check."
												: ""
										}
										placeholder="Name"
										onChange={(e) => {
											setNameError(false);
											setName(e.target.value);
										}}
									/>
								</Box>
								<Box className="inputGroup" style={{ height: "auto" }}>
									<IncoreInputLabel>Description</IncoreInputLabel>
									<TextField
										variant="outlined"
										value={description}
										placeholder="Description"
										multiline
										rows={6}
										fullWidth
										onChange={(e) => {
											setDescription(e.target.value);
										}}
									/>
								</Box>
							</Grid>
						) : null}

						{activeStep === 1 ? (
							<Grid item xs={12}>
								<TableContainer className={classes.tableContainer}>
									<Table className={classes.table} aria-label="simple table">
										<TableHead>
											<TableRow className={classes.tableHeaderRow}>
												<TableCell
													className={classes.tableHeaderCellNo}
													align="center"
												>
													No.
												</TableCell>
												<TableCell
													className={classes.tableHeaderCellConditions}
												>
													Conditions
												</TableCell>
												<TableCell className={classes.tableHeaderCellRetrofit}>
													Retrofit Methods
												</TableCell>
												<TableCell className={classes.tableHeaderCellActions}>
													Actions
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{addedRows.map((row, index) => {
												if (currentlyEditing === index) {
													return AddRetrofitStrategyRow();
												}
												return (
													<TableRow key={index}>
														<TableCell
															component="th"
															align="center"
															scope="row"
															className={classes.tableSavedCell}
														>
															<Box
																display="flex"
																flexDirection="row"
																alignItems="center"
																justifyContent="center"
															>
																<StopRoundedIcon
																	fontSize="large"
																	style={{
																		color:
																			globalConfig.retrofitStrategyBuilder
																				.colorCodes[index],
																	}}
																/>
																{index + 1}
															</Box>
														</TableCell>
														<TableCell className={classes.tableSavedCell}>
															<TableContainer>
																<Table>
																	<TableBody>
																		{conditionKeys.map((key) => (
																			<TableRow key={key}>
																				<TableCell>
																					<Typography
																						variant="body1"
																						className={classes.tableSavedText}
																					>
																						{row[key].label}
																					</Typography>
																				</TableCell>
																				<TableCell align="right">
																					<Typography
																						variant="body1"
																						className={classes.tableSavedValue}
																					>
																						{row[key].valueLabel}
																					</Typography>
																				</TableCell>
																			</TableRow>
																		))}
																	</TableBody>
																</Table>
															</TableContainer>
														</TableCell>
														<TableCell
															align="center"
															className={classes.tableSavedCell}
															style={{ padding: "16px" }}
														>
															{retrofitMethodKeys.map((key, idx) => (
																<>
																	<Typography
																		variant="body1"
																		className={classes.tableSavedValue}
																	>
																		{row[key].valueLabel}
																	</Typography>
																	{idx ===
																	retrofitMethodKeys.length - 1 ? null : (
																		<Divider />
																	)}
																</>
															))}
														</TableCell>
														<TableCell
															align="left"
															className={classes.tableSavedCell}
														>
															<Button
																className={classes.button}
																startIcon={
																	<EditIcon style={{ color: "#0000008A" }} />
																}
																// if there is an open row we shouldn't allow edit
																onClick={() => {
																	if (showAddRetrofitStrategyRow) {
																		setAddError(
																			"Save the current rule before editing.",
																		);
																	} else {
																		setSelectedValues(row);
																		setShowAddRetrofitStrategyRow(true);
																		setCurrentlyEditing(index);
																		setAddError(null);
																	}
																}}
															>
																<Typography className={classes.actionButtons}>
																	Edit
																</Typography>
															</Button>
															<Button
																className={classes.button}
																startIcon={
																	<DeleteIcon style={{ color: "#0000008A" }} />
																}
																onClick={() => {
																	// should't allow delete if there is only one row
																	if (numRow > 1) {
																		const newRows = addedRows.filter(
																			(r, i) => i !== index,
																		);
																		setNumRow(numRow - 1);
																		setAddedRows(newRows);
																		// reset error message
																		setAddError(null);
																	}
																}}
															>
																<Typography className={classes.actionButtons}>
																	Delete
																</Typography>
															</Button>
														</TableCell>
													</TableRow>
												);
											})}
											{/* not editing adding new row*/}
											{currentlyEditing === null && showAddRetrofitStrategyRow
												? AddRetrofitStrategyRow()
												: null}
										</TableBody>
									</Table>
								</TableContainer>
								<Grid item xs={4}>
									<Button
										disabled={
											numRow ===
											globalConfig.retrofitStrategyBuilder.maxStrategies
										}
										variant="text"
										className={classes.addMoreStrategyBtn}
										startIcon={<AddIcon />}
										onClick={() => {
											if (
												showAddRetrofitStrategyRow &&
												Object.keys(selectedValues).length > 0
											) {
												setAddError(
													"Save the current rule before adding more.",
												);
											} else {
												// reset editing
												setCurrentlyEditing(null);
												// reset error message
												setAddError(null);
												// deposit the new row
												setShowAddRetrofitStrategyRow(true);
											}
										}}
									>
										Add more conditions and methods
									</Button>
								</Grid>
							</Grid>
						) : null}

						{activeStep === 2 ? (
							<RetrofitStrategySummary
								name={name}
								description={description}
								retrofitDetails={retrofitSummary}
								rules={rules}
								rsLayerId={rsLayerId}
							/>
						) : null}

						<ZoneSelectionMapDialog
							open={mapDialogOpen}
							handleClose={() => setMapDialogOpen(false)}
							handleSave={(selectedZoneName) => {
								setSelectedValues({
									...selectedValues,
									zone: {
										label:
											globalConfig.retrofitStrategyBuilder.conditions[0].label,
										type: "string",
										// zone label and key are the same
										value: selectedZoneName,
										valueLabel: selectedZoneName,
									},
								});
								setMapDialogOpen(false);
								setAddError(null);
							}}
						/>
					</Grid>
				</LoadingOverlay>
			</DialogContent>
			<DialogActions
				disableSpacing
				style={{
					justifyContent:
						activeStep === 0 || activeStep === 2 ? "flex-end" : "space-between",
				}}
			>
				{activeStep > 0 && activeStep < 2 ? (
					<Button
						disabled={activeStep === 0}
						variant="outlined"
						onClick={() => setActiveStep(activeStep - 1)}
						startIcon={<ArrowBackIcon />}
					>
						Previous
					</Button>
				) : null}
				<Button
					disabled={
						(activeStep === 0
							? name === ""
							: activeStep === 1
							  ? addedRows.length === 0
							  : false) || loading
					}
					variant="contained"
					className={classes.nxtBuildBtn}
					onClick={
						activeStep === 0
							? handleNext
							: activeStep === 1
							  ? handleSubmit
							  : handleCloseSummary
					}
				>
					{activeStep === 0
						? "Next Step"
						: activeStep === 1
						  ? "Build Retrofit Strategy"
						  : "Close"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

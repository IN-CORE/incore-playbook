import React, { useEffect, useRef } from "react";
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
import { fetchExecutionItem as fetchExecutionItemAction } from "../../actions/datawolf";
import { extractStatus } from "../../utils/common";
import {
	getOutputFileContent,
	getOutputFileContentJSON,
	submitExecution,
} from "../../utils/datawolf";
import { AlertMessage } from "./alert/AlertMessage";
import { fetchDatasets } from "../../actions/datasets";

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
	const [retrofits, setRetrofits] = React.useState(null);
	const [rsLayerId, setRsLayerId] = React.useState(null);
	const [executionId, setExecutionId] = React.useState();

	// Error handling
	const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [errorStatus, setErrorStatus] = React.useState(200);

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

	// Datawolf setting
	const datawolfRsConfig = useSelector(
		(state) => state.config.datawolfRsConfig,
	);
	const datawolfRsWorkflowConfig = useSelector(
		(state) => state.config.datawolfRsWorkflowConfig,
	);
	const getExecutionItem = (datawolfConfig, executionId) =>
		dispatch(fetchExecutionItemAction(datawolfConfig, executionId));
	const executionItem = useSelector((state) => state.execution.executionItem);

	// Fetch datasets
	const listDatasets = (config, limit, offset, type) =>
		dispatch(fetchDatasets(config, limit, offset, type));

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
	const handleOpenEditRowDelete = () => {
		setSelectedValues({});
		setShowAddRetrofitStrategyRow(false);
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
															const selectedOption =
																condition.possibleOptions.find(
																	(option) => option.value === e.target.value,
																);
															const selectedOptionLabel = selectedOption
																? selectedOption.label
																: e.target.value;
															setSelectedValues({
																...selectedValues,
																[condition.key]: {
																	label: condition.label,
																	type: "string",
																	value: e.target.value,
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
													{...selectEndIconProp}
												>
													{zoneNames.map((zoneOption) => (
														<IncoreMenuItem value={zoneOption} key={zoneOption}>
															{/*Get nice label if needed*/}
															{condition.possibleOptions.find(
																(option) => option.value === zoneOption,
															)?.label || zoneOption}
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
					<Button
						className={classes.button}
						disabled={
							currentlyEditing !== null
								? false
								: numRow === globalConfig.retrofitStrategyBuilder.maxStrategies
						}
						variant="outlined"
						color="primary"
						onClick={handleAddRow}
						startIcon={currentlyEditing !== null ? <SaveIcon /> : <AddIcon />}
					>
						{currentlyEditing !== null ? "Save" : "Add"}
					</Button>
					<Button
						className={classes.button}
						disabled={currentlyEditing !== null}
						variant="outlined"
						color="primary"
						onClick={handleOpenEditRowDelete}
						startIcon={<DeleteIcon />}
					>
						Delete
					</Button>
					<IncoreFootNote style={{ color: "red" }}>{addError}</IncoreFootNote>
				</TableCell>
			</TableRow>
		);
	};

	const handleNext = () => {
		switch (activeStep) {
			case 0:
				// name should not have special characters
				if (name.match(/^[0-9a-zA-Z\-\_ ]+$/) === null || name.length > 250) {
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

	const _convertToDatawolfParmas = (addedRows, testbed) => {
		let rules = {
			testbed: testbed,
			rules: 0,
			zones: [],
			strtypes: [],
			pcts: [],
		};

		let retrofits = {
			ret_keys: [],
			ret_vals: [],
		};

		addedRows.forEach((row) => {
			// handle joplin case that doesn't have zones
			if ("zones" in row) {
				rules.zones.push(row.zones.value);
			} else {
				rules.zones.push("");
			}
			rules.strtypes.push(row.strtypes.value);
			rules.pcts.push(parseFloat(row.pcts.value));
			retrofits.ret_keys.push(`${row.retrofits.value.ret_key}`);
			retrofits.ret_vals.push(row.retrofits.value.ret_val);
		});

		// Update 'rules' with the count of unique 'zones' as an example dynamic value
		rules.rules = rules.zones.length;
		rules.testbed = testbed;

		setRules(rules);
		setRetrofits(retrofits);
		return { rules, retrofits };
	};

	const handleSubmit = async () => {
		if (showAddRetrofitStrategyRow) {
			setAddError("Save the current rule before submitting.");
			return;
		}
		// prepare datawolf payload
		const { rules, retrofits } = _convertToDatawolfParmas(
			addedRows,
			globalConfig.testbed,
		);
		let parameters = datawolfRsWorkflowConfig.inputs.parameters;
		let datawolfFormState = parameters.reduce((state, parameter) => {
			const value =
				parameter.variableName === "name"
					? name
					: parameter.variableName === "retrofits"
					  ? JSON.stringify(retrofits)
					  : parameter.variableName === "rules"
					    ? JSON.stringify(rules)
					    : undefined;

			const mappedState = parameter.parametersMap.reduce(
				(acc, pm) => ({
					...acc,
					[pm.paramId]: value || parameter.defaultValue,
				}),
				{},
			);

			return { ...state, [parameter.variableName]: mappedState };
		}, {});

		const { datawolfExecutionStatus, datawolfExecutionId } =
			await submitExecution(
				datawolfRsConfig,
				datawolfRsWorkflowConfig,
				name,
				description,
				datawolfFormState,
			);

		if (datawolfExecutionStatus !== 200) {
			setErrorAlertOpen(true);
			setErrorMessage("Retrofit strategy building submission failed.");
			setErrorStatus(datawolfExecutionStatus);
		} else {
			setLoading(true);
			setExecutionId(datawolfExecutionId);
		}
	};

	// listen to the executionId change and get datasets
	const intervalRef = useRef(null);
	useEffect(() => {
		if (executionId) {
			// Start a new interval timer and register that timer
			intervalRef.current = setInterval(() => {
				getExecutionItem(datawolfRsConfig, executionId);
			}, datawolfRsConfig["retreiveTimeInterval"] ?? 1000);

			return () => {
				// Clear interval on component unmount or executionId change
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
				}
			};
		}
	}, [executionId]);

	useEffect(() => {
		if (
			Object.keys(executionItem).length > 0 &&
			extractStatus(executionItem) === "FINISHED"
		) {
			// Clear the interval
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}

			const datawolfDatasetConfigItems =
				datawolfRsWorkflowConfig.outputs.datasets.flatMap(
					(dataset) => dataset.datasetsMap,
				);
			datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				if (vName === "retrofitStrategyDetails") {
					setRsLayerId(
						await getOutputFileContent(
							datawolfRsConfig,
							executionItem,
							datawolfDatasetConfigItem.datasetId,
						),
					);
				} else if (vName === "retrofitCostSummary") {
					setRetrofitSummary(
						await getOutputFileContentJSON(
							datawolfRsConfig,
							executionItem,
							datawolfDatasetConfigItem.datasetId,
						),
					);
				}
			});
			setActiveStep(activeStep + 1);
			setLoading(false);
		}
		if (
			(Object.keys(executionItem).length > 0 &&
				extractStatus(executionItem) === "FAILED") ||
			extractStatus(executionItem) === "ABORTED"
		) {
			// Clear the interval
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			// Error handling
			setLoading(false);
			setErrorAlertOpen(true);
			setErrorMessage("Retrofit strategy building failed.");
			setErrorStatus(-999);
		}
	}, [executionItem]);

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

		// clean up rules/retrofits
		setRules();
		setRetrofits();
		setRsLayerId();
		setExecutionId();

		// clean interval if applicable
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
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
				<LoadingOverlay
					active={loading}
					spinner
					styles={{
						overlay: (base) => ({
							...base,
							background: "white",
							color: "black",
						}),
						spinner: (base) => ({
							...base,
							"& svg circle": {
								stroke: "#00619D",
							},
						}),
					}}
					text="Calculating and Generating the Retrofit Strategy..."
				>
					<Grid container spacing={3}>
						{activeStep === 0 ? (
							<Grid item xs={12}>
								<Box className="inputGroup" style={{ height: "auto" }}>
									<IncoreInputLabel className="required-field">
										Name
									</IncoreInputLabel>
									<IncoreFootNote style={{ textTransform: "none" }}>
										Please choose a memorable name for your retrofit strategy.
										This name will help you easily identify and refer to your
										strategy in future analyses.
									</IncoreFootNote>
									<IncoreTextField
										variant="outlined"
										value={name}
										error={nameError}
										helperText={
											nameError
												? "Please ensure the name only includes letters, numbers, hyphens (-), " +
												  "underscores (_), and spaces. Additionally, the name should not exceed " +
												  "250 characters in length. If these conditions are not met, an error " +
												  "will be triggered."
												: ""
										}
										placeholder="Name"
										onChange={(e) => {
											setNameError(false);
											setName(e.target.value);
										}}
									/>
								</Box>
								{/*<Box className="inputGroup" style={{ height: "auto" }}>*/}
								{/*    <IncoreInputLabel>Description</IncoreInputLabel>*/}
								{/*    <TextField*/}
								{/*        variant="outlined"*/}
								{/*        value={description}*/}
								{/*        placeholder="Description"*/}
								{/*        multiline*/}
								{/*        rows={6}*/}
								{/*        fullWidth*/}
								{/*        onChange={(e) => {*/}
								{/*            setDescription(e.target.value);*/}
								{/*        }}*/}
								{/*    />*/}
								{/*</Box>*/}
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
																Edit
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
																Delete
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

						{activeStep === 2 && retrofitSummary && rsLayerId ? (
							<RetrofitStrategySummary
								name={name}
								description={description}
								retrofitDetails={retrofitSummary}
								rules={rules}
								retrofits={retrofits}
								rsLayerId={rsLayerId}
							/>
						) : null}

						<ZoneSelectionMapDialog
							open={mapDialogOpen}
							handleClose={() => setMapDialogOpen(false)}
							handleSave={(selectedZoneName) => {
								const zoneCondition =
									globalConfig.retrofitStrategyBuilder.conditions.find(
										(condition) => condition.key === "zones",
									);
								// match label if available
								const selectedZoneLabel =
									zoneCondition.possibleOptions.find(
										(option) => option.value === selectedZoneName,
									)?.label || selectedZoneName;
								setSelectedValues({
									...selectedValues,
									zones: {
										label: zoneCondition.label,
										type: "string",
										value: selectedZoneName,
										valueLabel: selectedZoneLabel,
									},
								});
								setMapDialogOpen(false);
								setAddError(null);
							}}
						/>
					</Grid>
				</LoadingOverlay>
				<AlertMessage
					open={errorAlertOpen}
					setOpen={setErrorAlertOpen}
					message={errorMessage}
					alertSeverity={"error"}
					status={errorStatus}
				/>
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

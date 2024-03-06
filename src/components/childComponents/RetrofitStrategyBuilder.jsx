import React from "react";
import { useSelector } from "react-redux";

import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	Stepper,
	Step,
	StepLabel,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MapIcon from "@material-ui/icons/Map";
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import { makeStyles } from "@material-ui/core/styles";

import { IncoreInputLabel } from "../styledComponents/IncoreInputLabel";
import { IncoreTextField } from "../styledComponents/IncoreInput";
import { IncoreSelectBox, IncoreMenuItem } from "../styledComponents/IncoreSelect";

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	},
	button: {
		margin: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	queryBuilderDialog: {
		height: "911px"
	},
	table: {
		minWidth: 650
	},
	tableContainer: {
		// maxWidth: "960px"
	},
	tableHeaderCellNo: {
		width: "5%"
	},
	tableHeaderCellConditions: {
		borderRight: "1px solid #0000001F",
		borderLeft: "1px solid #0000001F"
	},
	tableHeaderCellRetrofit: {
		borderRight: "1px solid #0000001F",
		borderLeft: "1px solid #0000001F",
		width: "20%"
	},
	tableHeaderCellActions: {
		width: "10%"
	},
	tableHeaderRow: {
		font: "Roboto",
		fontSize: "14px",
		fontWeight: 400,
		lineHeight: "24px",
		letterSpacing: "0.17px",
		backgroundColor: "#EDF1F4",
		color: "#000000DE"
	},
	tableSavedCell: {
		padding: 0,
		border: "1px solid #E0E0E0"
	},
	tableSavedText: {
		font: "Roboto",
		fontSize: "14px",
		fontWeight: 400,
		lineHeight: "16.41px",
		letterSpacing: "0.15px",
		color: "#0000008A"
	},
	tableSavedValue: {
		font: "Roboto",
		fontSize: "14px",
		fontWeight: 400,
		lineHeight: "16.41px",
		letterSpacing: "0.15px",
		color: "#000000DE"
	
	}
}));

export default function RetrofitStrategyBuilder(props) {
	const classes = useStyles();

	const { strategyBuilderModalStatus, onRetrofitStrategyBuilderClose } = props;
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [activeStep, setActiveStep] = React.useState(0);

	// Step 0
	const [name, setName] = React.useState("");
	const [nameError, setNameError] = React.useState(false);
	const [description, setDescription] = React.useState("");

	// Step 1
	const [addedRows, setAddedRows] = React.useState([]);
	const [numRow, setNumRow] = React.useState(1);
	const [mapDialogOpen, setMapDialogOpen] = React.useState(false);
	const [selectedValues, setSelectedValues] = React.useState({});
	const [addError, setAddError] = React.useState(false);

	let conditionKeys = [];
	let retrofitMethodKeys = [];
	globalConfig.retrofitStrategyBuilder.conditions.forEach((condition) => conditionKeys.push(condition.key));
	globalConfig.retrofitStrategyBuilder.retrofitMethods.forEach((method) => retrofitMethodKeys.push(method.key));

	const handleAddRow = () => {
		let disabled = false;
		conditionKeys.forEach((key) => {
			if (selectedValues[key] === undefined || selectedValues[key].value === "") {
				disabled = true;
			}
		});
		retrofitMethodKeys.forEach((key) => {
			if (selectedValues[key] === undefined || selectedValues[key].value === "") {
				disabled = true;
			}
		});
		if (disabled) {
			setAddError(true);
			return;
		}

		setNumRow(numRow + 1);
		const updateRows = [...addedRows, selectedValues];
		setAddedRows(updateRows);
		setSelectedValues({});
	};

	const steps = [
		"Start to build a Retrofit Strategy",
		"Add Conditions and Retrofit Methods",
		"Review Retrofit Summary"
	];

	const colorCodes = [
		"#00B654",
		"#FF88CF",
		"#36C1ED",
		"#FFB067",
		"#9C4EFF"
	]

	const AddRetrofitStrategyRow = () => {
		return (
			<TableRow>
				<TableCell align="center">{numRow}</TableCell>
				<TableCell>
					<Grid container alignItems="center" spacing={3} key={"add-retrofit-strategy-row"}>
						{globalConfig.retrofitStrategyBuilder.conditions.map((condition) => {
							if (condition.type === "mapSelect" || condition.type === "select") {
								let selectEndIconProp = {};
								if (condition.type === "mapSelect") {
									selectEndIconProp.IconComponent = () => (
										<IconButton onClick={() => setMapDialogOpen(true)}>
											<MapIcon />
										</IconButton>
									);
								}
								return (
									<>
										<Grid item xs={3} key={condition.label + 1}>
											<Typography variant="body1">{condition.label}</Typography>
										</Grid>
										<Grid item xs={9} key={condition.label + 2}>
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
																value: e.target.value
															}
														});
														setAddError(false);
													}
												}}
												value={
													selectedValues[condition.key]
														? selectedValues[condition.key].value
														: ""
												}
												{...selectEndIconProp}
											>
												{condition.possibleOptions.map((option) => (
													<IncoreMenuItem value={option.value} key={option.value}>
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
										<Grid item xs={3} key={condition.label + 1}>
											<Typography variant="body1">{condition.label}</Typography>
										</Grid>
										<Grid item xs={9} key={condition.label + 2}>
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
																value: e.target.value
															}
														});
														setAddError(false);
													}
												}}
												inputProps={{ min: 0, max: 100, step: 0.01 }}
												InputProps={{
													endAdornment: <InputAdornment position="end">%</InputAdornment>
												}}
											/>
										</Grid>
									</>
								);
							}
						})}
					</Grid>
				</TableCell>
				<TableCell>
					<Grid container alignItems="center" spacing={3}>
						{globalConfig.retrofitStrategyBuilder.retrofitMethods.map((method) => {
							if (method.type === "select") {
								return (
									<>
										{method.label === "" ? null : (
											<Grid item xs={3} key={method.label + 1}>
												<Typography variant="body1">{method.label}</Typography>
											</Grid>
										)}

										<Grid item xs={method.label === "" ? 12 : 9} key={method.label + 1}>
											<IncoreSelectBox
												labelId="label"
												id={`${method.label}Select`}
												variant="outlined"
												onChange={(e) => {
													if (e.target.value !== "") {
														setSelectedValues({
															...selectedValues,
															[method.key]: {
																label: method.label,
																type: "string",
																value: e.target.value
															}
														});
														setAddError(false);
													}
												}}
												value={
													selectedValues[method.key] ? selectedValues[method.key].value : ""
												}
											>
												{method.possibleOptions.map((option) => (
													<IncoreMenuItem value={option.value} key={option.value}>
														{option.label}
													</IncoreMenuItem>
												))}
											</IncoreSelectBox>
										</Grid>
									</>
								);
							}
						})}
					</Grid>
				</TableCell>
				<TableCell>
					<Button
						disabled={numRow === globalConfig.retrofitStrategyBuilder.maxStrategies}
						variant="outlined"
						color="primary"
						startIcon={<AddIcon />}
						onClick={handleAddRow}
					>
						ADD
					</Button>
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

	return (
		<Dialog
			open={strategyBuilderModalStatus}
			onClose={onRetrofitStrategyBuilderClose}
			className={classes.queryBuilderDialog}
			maxWidth="lg"
			fullWidth
			scroll="paper"
		>
			<DialogTitle id="max-width-dialog-title">
				<Typography variant="h6">Retrofit Strategy Builder</Typography>
				<IconButton aria-label="close" className={classes.closeButton} onClick={onRetrofitStrategyBuilderClose}>
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
				<Grid container spacing={3}>
					{activeStep === 0 ? (
						<Grid item xs={12}>
							<Box className="inputGroup" style={{ height: "auto" }}>
								<IncoreInputLabel className="required-field">Name</IncoreInputLabel>
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
									sx={{
										height: "41px",
										width: "100%",
										color: "#2E384D",
										fontSize: "15px",
										fontWeight: 500,
										letterSpacing: 0,
										lineHeight: "18px",
										backgroundColor: "#FFFFFF"
									}}
									multiline
									minRows={4}
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
											<TableCell className={classes.tableHeaderCellNo}>No.</TableCell>
											<TableCell className={classes.tableHeaderCellConditions}>
												Conditions
											</TableCell>
											<TableCell className={classes.tableHeaderCellRetrofit}>
												Retrofit Methods
											</TableCell>
											<TableCell className={classes.tableHeaderCellActions}>Actions</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{addedRows.map((row, index) => (
											<TableRow key={index}>
												<TableCell component="th" align="center" scope="row" className={classes.tableSavedCell}>
													<StopRoundedIcon fontSize="medium" style={{color: colorCodes[index]}} />{index + 1}
												</TableCell>
												<TableCell className={classes.tableSavedCell}>
													<TableContainer>
														<Table>
															<TableBody>
																{conditionKeys.map((key) => (
																	<TableRow key={key}>
																		<TableCell>
																			<Typography variant="body1" className={classes.tableSavedText}>
																				{row[key].label}
																			</Typography>
																		</TableCell>
																		<TableCell align="right">
																			<Typography variant="body1" className={classes.tableSavedValue}>
																			{
																				(row[key].type === "number") ? row[key].value : globalConfig.retrofitStrategyBuilder.displayValues[row[key].value]
																			}
																			</Typography>
																		</TableCell>
																	</TableRow>
																))}
															</TableBody>
														</Table>
													</TableContainer>

													{/* <Grid container spacing={0} sx={{margin: 1}} >
														{conditionKeys.map((key) => (
															<>
																<Grid item xs={4} key={key + 1} sx={{p: 0}}>
																	<Typography variant="body1" className={classes.tableSavedText}>
																	{row[key].label}
																	</Typography>
																</Grid>
																<Grid item xs={8} key={key + 2} sx={{textAlign: "right", p: 0}}>
																	<Typography variant="body1" className={classes.tableSavedValue}>
																		{
																			(row[key].type === "number") ? row[key].value : globalConfig.retrofitStrategyBuilder.displayValues[row[key].value]
																		}
																	</Typography>
																</Grid>
															</>
														))}
													</Grid> */}
												</TableCell>
												<TableCell align="center" className={classes.tableSavedCell}>
													<Grid container spacing={0}>
														{retrofitMethodKeys.map((key, idx) => (
															<>
																{row[key].label === "" ? null : (
																	<Grid item xs={4} key={key + 1} sx={{p: 0}}>
																		<Typography variant="body1" className={classes.tableSavedText}>
																			{row[key].label}
																		</Typography>
																	</Grid>
																)}
																<Grid
																	item
																	xs={row[key].label === "" ? 12 : 8}
																	key={key + 2}
																	sx={{p: 0}}
																>
																	<Typography variant="body1">
																		{
																			globalConfig.retrofitStrategyBuilder
																				.displayValues[row[key].value]
																		}
																	</Typography>
																</Grid>
																{idx === retrofitMethodKeys.length - 1 ? null : <Divider />}
															</>
														))}
													</Grid>
												</TableCell>
												<TableCell align="center" className={classes.tableSavedCell}>
													<Button className={classes.button} startIcon={<EditIcon />}>
														Edit
													</Button>
													<Divider />
													<Button className={classes.button} startIcon={<DeleteIcon />}>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										))}
										{AddRetrofitStrategyRow()}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					) : null}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
					Back
				</Button>
				{activeStep === steps.length - 1 ? (
					<Button variant="contained" color="primary" onClick={handleNext}>
						Finish
					</Button>
				) : (
					<Button disabled={name === ""} variant="contained" color="primary" onClick={handleNext}>
						Next
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
}

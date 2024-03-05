import React from "react";

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

import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import { globals as defaultGlobalConfig } from "../../globals";
import { IncoreInputLabel } from "../styledComponents/IncoreInputLabel";
import { IncoreTextField } from "../styledComponents/IncoreInput";

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	queryBuilderDialog: {
		height: "911px"
	}
}));

export default function RetrofitStrategyBuilder(props) {
	const classes = useStyles();

	const { strategyBuilderModalStatus, onRetrofitStrategyBuilderClose } = props;

	const [activeStep, setActiveStep] = React.useState(0);

	// Step 0
	const [name, setName] = React.useState("");
	const [nameError, setNameError] = React.useState(false);
	const [description, setDescription] = React.useState("");

	// Step 1


	const steps = [
		"Start to build a Retrofit Strategy",
		"Add Conditions and Retrofit Methods",
		"Review Retrofit Summary"
	];

	const handleNext = () => {
		switch (activeStep) {
			case 0:
				// name should not have special characters
				if (name.match(/^[0-9a-z\-\_ ]+$/) === null) {
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
			maxWidth="md"
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
							2nd step
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

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Button, Grid } from "@material-ui/core";

import { IncoreInputLabel } from "../styledComponents/IncoreInputLabel";
import { submitExecution } from "../../utils/datawolf";

import fullHtml from "../../public/steps/3-4.html";
import StepInfo from "../StepInfo";
import { useSelector } from "react-redux";
import AllowedHazardTypes from "./inputWidgets/AllowedHazardTypes";
import BlockGroups from "./inputWidgets/BlockGroups";
import Epfs from "./inputWidgets/Epfs";
import Hazards from "./inputWidgets/Hazards";
import Huas from "./inputWidgets/Huas";
import InterdNetworks from "./inputWidgets/InterdNetworks";
import Buildings from "./inputWidgets/Buildings";
import SectorShocks from "./inputWidgets/SectorShocks";
import ValueLosses from "./inputWidgets/ValueLosses";
import InputTextField from "./inputWidgets/InputTextField";
import { IncoreTextField } from "../styledComponents/IncoreInput";
import RetrofitStrategies from "./inputWidgets/RetrofitStrategies";

const useStyles = makeStyles({
	runButton: {
		"height": "61px",
		"width": "100%",
		"fontSize": "16px",
		"fontWeight": 500,
		"backgroundColor": "#00619D",
		"&:hover": {
			backgroundColor: "#2C4170"
		},
		"color": "#ffffff",
		"textTransform": "capitalize"
	},
	endIconStyle: {
		backgroundColor: "#ffffff",
		marginLeft: "15px"
	},
	avatarStyle: {
		height: "35px",
		width: "56px",
		borderRadius: 0
	},
	explanation: {
		height: "14px",
		width: "410px",
		color: "#8798AD",
		fontFamily: "Rubik",
		fontSize: "12px",
		letterSpacing: 0,
		lineHeight: "14px",
		margin: "16px"
	},
	explanationLink: {
		textDecoration: "underline",
		color: "#00619D"
	},
	socioeconomicsBlock: {
		margin: "30px auto"
	},
	socioeconomics: {
		padding: "0 30px",
		border: "dashed 2px #00619D",
		maxHeight: "300px",
		overflow: "auto",
		backgroundColor: "#FFFFFF"
	}
});

// TODO move this registration somewhere else?
const registeredWidgets = {
	AllowedHazardTypes: <AllowedHazardTypes />,
	BlockGroups: <BlockGroups />,
	Buildings: <Buildings />,
	RetrofitStrategies: <RetrofitStrategies />,
	Epfs: <Epfs />,
	Hazards: <Hazards />,
	Huas: <Huas />,
	InputTextField: <InputTextField />,
	InterdNetworks: <InterdNetworks />,
	SectorShocks: <SectorShocks />,
	ValueLosses: <ValueLosses />
};

export default function ViewResult(props) {
	const classes = useStyles();

	const { value, index, gotoViewResultTab, setErrorAlertOpen, setErrorStatus, setErrorMessage, ...other } = props;

	// for execution
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	let submitExecutionErrorMessage = "Couldn't submit the Execution.";

	const assetConfig = useSelector((state) => state.config.assetConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);

	let parameters = datawolfWorkflowConfig.inputs.parameters;
	const [datawolfFormState, setDatawolfFormState] = useState(
		parameters.reduce((state, p) => {
			// prepopulate the default fields
			let mapState = {};
			p.parametersMap.map((pm) => {
				mapState[pm.paramId] = p.defaultValue;
			}, {});

			return { ...state, [p.variableName]: mapState };
		}, {})
	);

	const [disabled, setDisabled] = useState(true);

	// form check
	useEffect(() => {
		if (
			Object.keys(datawolfFormState).every((k) => Object.values(datawolfFormState[k])[0] !== null) &&
			title !== "" &&
			description !== ""
		)
			setDisabled(false);
		else setDisabled(true);
	}, [datawolfFormState, title, description]);

	const handleRunButtonClick = async () => {
		const datawolfExecutionStatus = await submitExecution(
			datawolfConfig,
			datawolfWorkflowConfig,
			title,
			description,
			datawolfFormState
		);

		if (datawolfExecutionStatus !== 200) {
			setErrorAlertOpen(true);
			setErrorMessage(submitExecutionErrorMessage);
			setErrorStatus(datawolfExecutionStatus);
		} else {
			// clear the form
			setTitle("");
			setDescription("");
			setDatawolfFormState(
				parameters.reduce((state, p) => {
					// prepopulate the default fields
					let mapState = {};
					p.parametersMap.map((pm) => {
						if (p.hidden) mapState[pm.paramId] = p.defaultValue;
						else mapState[pm.paramId] = "";
					}, {});

					return { ...state, [p.variableName]: mapState };
				}, {})
			);

			// jump to view result tab
			gotoViewResultTab();
		}
	};

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			<Grid container spacing={3}>
				<Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
					<Box className="inputGroup" style={{ height: "auto" }}>
						<IncoreInputLabel className="required-field">Title</IncoreInputLabel>
						<IncoreTextField
							variant="outlined"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</Box>
					<Box className="inputGroup" style={{ height: "auto" }}>
						<IncoreInputLabel className="required-field">Description</IncoreInputLabel>
						<IncoreTextField
							variant="outlined"
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
					</Box>
					{parameters.map((item) => {
						if (!item.hidden) {
							return (
								<Box className="inputGroup" style={{ height: "auto" }}>
									<IncoreInputLabel className="required-field">{item.title}</IncoreInputLabel>
									{(() => {
										// instantiate widget based on definitions
										return React.cloneElement(registeredWidgets[item.widget], {
											setDatawolfFormState: setDatawolfFormState,
											datawolfFormState: datawolfFormState,
											datawolfParamConfigItem: item
										});
									})()}
								</Box>
							);
						}
					})}

					<Box className="inputGroup" style={{ height: "auto" }}>
						<IncoreInputLabel>Run the Analysis</IncoreInputLabel>
						<Button
							variant="contained"
							color="primary"
							onClick={handleRunButtonClick}
							disabled={disabled}
							endIcon={<Avatar src={assetConfig.poweredByLogo} className={classes.avatarStyle} />}
							classes={{ root: classes.runButton, endIcon: classes.endIconStyle }}
						>
							CALCULATE THE HAZARD RISK
						</Button>
					</Box>
				</Grid>
				<Grid item xl={5} lg={5} md={5} sm={5} xs={12} className="gridItem">
					<StepInfo fullHtml={fullHtml} />
				</Grid>
			</Grid>
		</div>
	);
}

import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
	Box,
	Avatar,
	Button,
	Grid,
} from "@material-ui/core";

import {IncoreInputLabel} from "../styledComponents/IncoreInputLabel";
import {submitExecution} from "../../utils/datawolf";

import fullHtml from "../../public/steps/3-4.html";
import StepInfo from "../StepInfo";
import {useSelector} from "react-redux";
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
import {IncoreTextField} from "../styledComponents/IncoreInput";

const useStyles = makeStyles({
	runButton:{
		height: "61px",
		width: "100%",
		fontSize: "16px",
		fontWeight: 500,
		backgroundColor: "#00619D",
		"&:hover": {
			backgroundColor: "#2C4170"
		},
		color:"#ffffff",
		textTransform: "capitalize"
	},
	endIconStyle:{
		backgroundColor: "#ffffff",
		marginLeft:"15px"
	},
	avatarStyle:{
		height: "35px",
		width: "56px",
		borderRadius:0
	},
	explanation:{
		height: "14px",
		width: "410px",
		color: "#8798AD",
		fontFamily: "Rubik",
		fontSize: "12px",
		letterSpacing: 0,
		lineHeight: "14px",
		margin:"16px"
	},
	explanationLink:{
		textDecoration:"underline",
		color: "#00619D"
	},
	socioeconomicsBlock:{
		margin: "30px auto",
	},
	socioeconomics:{
		padding: "0 30px",
		border: "dashed 2px #00619D",
		maxHeight:"300px",
		overflow:"auto",
		backgroundColor:"#FFFFFF"
	}
});

// TODO move this registration somewhere else?
const registeredWidgets = {
	"AllowedHazardTypes": <AllowedHazardTypes/>,
	"BlockGroups": <BlockGroups/>,
	"Buildings": <Buildings/>,
	"Epfs": <Epfs/>,
	"Hazards": <Hazards/>,
	"Huas":<Huas/>,
	"InputTextField":<InputTextField/>,
	"InterdNetworks":<InterdNetworks/>,
	"SectorShocks":<SectorShocks/>,
	"ValueLosses":<ValueLosses/>
};


export default function ViewResult(props) {
	const classes = useStyles();

	const {value, index, getExecutionList, gotoViewResultTab, ...other} = props;

	// for execution
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const assetConfig = useSelector((state) => state.config.assetConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);

	// TODO assume only one step of inputs hence [0]
	let parametersMap = datawolfWorkflowConfig.inputs.parameters[0].parametersMap;
	const [datawolfFormState, setDatawolfFormState] = useState(
		parametersMap.reduce((state, item) => {
			// prepopulate the default fields
			return {...state, [item.parameters.variableName]:{[item.paramId]: item.parameters.defaultValue}};
		}, {})
	);
	const [disabled, setDisabled] = useState(true);

	// form check
	useEffect(() => {
		if (Object.keys(datawolfFormState).every((k, ) => Object.values(datawolfFormState[k])[0] !== null)) setDisabled(false);
		else setDisabled(true);
	}, [datawolfFormState]);

	const handleRunButtonClick = async () =>{
		const datawolfJson = await submitExecution(datawolfConfig, datawolfWorkflowConfig, title, description,
			datawolfFormState);
		if (datawolfJson && datawolfJson !== "") {
			setDatawolfFormState(parametersMap.reduce((state, item) => {
				if (item.hidden) {
					return {...state, [item.parameters.variableName]:item.parameters.defaultValue};
				}
				else{
					return {...state, [item.parameters.variableName]:""};
				}
			}, {}));
			// update execution list and then jump to view result tab
			getExecutionList(datawolfConfig);
			gotoViewResultTab();
		}
	};

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
			 aria-labelledby={`simple-tab-${index}`}
			 {...other}
		>
			<Grid container spacing={3}>
				<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
					<Box className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Title</IncoreInputLabel>
						<IncoreTextField variant="outlined"
										 value={title}
										 onChange={(e) => { setTitle(e.target.value); }} />
					</Box>
					<Box className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Description</IncoreInputLabel>
						<IncoreTextField variant="outlined"
										 value={description}
										 onChange={(e) => { setDescription(e.target.value); }} />
					</Box>
					{
						parametersMap.map(item => {
							if (!item.hidden){
								return (<Box className="inputGroup" style={{height: "auto"}}>
									<IncoreInputLabel>{item.parameters.title}</IncoreInputLabel>
									{(() => {
										// instantiate widget based on definitions
										return React.cloneElement(
											registeredWidgets[item.parameters.widget ],
											{
												setDatawolfFormState: setDatawolfFormState,
												datawolfFormState: datawolfFormState,
												datawolfParamConfigItem: item
											}
										);
									})()}
								</Box>);
							}
						})
					}
					<Box className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Run the Analysis</IncoreInputLabel>
						<Button variant="contained" color="primary" onClick={handleRunButtonClick}
							disabled={disabled}
							endIcon={<Avatar src={assetConfig.poweredByLogo} className={classes.avatarStyle}/>}
							classes={{ root: classes.runButton, endIcon: classes.endIconStyle}}
						>
							CALCULATE THE HAZARD RISK
						</Button>
					</Box>
				</Grid>
				<Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="gridItem">
					<StepInfo fullHtml={fullHtml} />
				</Grid>
			</Grid>
		</div>
	);
}



import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {
	Box,
	Avatar,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";

import {IncoreInputLabel} from "../styledComponents/IncoreInputLabel";
import {IncoreSelectBox, IncoreMenuItem} from "../styledComponents/IncoreSelect";

import {IncoreTextField} from "../styledComponents/IncoreInput";

import {submitExecution} from "../../utils/datawolf";

import fullHtml from "../../public/steps/3-4.html";
import StepInfo from "../StepInfo";
import {inputDatasetTypes} from "../../globals";
import {useDispatch, useSelector} from "react-redux";
import {fetchHazards} from "../../actions/hazards";
import {fetchDatasets} from "../../actions/datasets";

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

export default function ViewResult(props) {
	const classes = useStyles();

	const {value, index, getExecutionList, gotoViewResultTab, ...other} = props;

	const dispatch = useDispatch();
	const listHazards = (hazardType, limit, offset) => dispatch(fetchHazards(hazardType, limit, offset));
	const listDatasets = (config, limit, offset, type) => dispatch(fetchDatasets(config, limit, offset, type));
	const tornadoes = useSelector((state) => state.hazard.tornadoes);
	const earthquakes = useSelector((state) => state.hazard.earthquakes);
	const hurricanes = useSelector((state) => state.hazard.hurricanes);
	const tsunamis = useSelector((state) => state.hazard.tsunamis);
	const floods = useSelector((state) => state.hazard.floods);
	const buildings = useSelector((state) => state.dataset.buildings);
	const epfs = useSelector((state) => state.dataset.epfs);
	const interdNetworks= useSelector((state) => state.dataset.interdNetworks);
	const sectorShocks = useSelector((state) => state.dataset.sectorShocks);
	const huas = useSelector((state) => state.dataset.huas);
	const blockGroups = useSelector((state) => state.dataset.blockGroups);
	const valueLosses = useSelector((state) => state.dataset.valueLosses);
	const assetConfig = useSelector((state) => state.config.assetConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const alllowedHazardTypes = useSelector((state) => state.config.allowedHazardTypes);
	const allowedDataTypes = useSelector((state) => state.config.allowedDataTypes);

	let parametersMap = datawolfWorkflowConfig.inputs[0].parametersMap;
	const [datawolfFormState, setDatawolfFormState] = useState(
		parametersMap.reduce((state, item) => {
			// prepopulate the default hidden fields
			if (item.hidden) {
				return {...state, [item.parameters.variableName]:{[item.paramId]: item.parameters.defaultValue}};
			}
			else{
				return {...state, [item.parameters.variableName]:{[item.paramId]: ""}};
			}
		}, {})
	);
	const [disabled, setDisabled] = useState(true);
	const [hazards, setHazards] = useState([]);

	// load datasets and tornadoes
	useEffect(() =>{

		// dataset
		Object.keys(inputDatasetTypes).map((key) => {
			inputDatasetTypes[key].map((inputDatasetType) => {
				listDatasets(globalConfig, inputDatasetType["num"], 0, inputDatasetType["type"]);
			});
		});

		// hazard
		alllowedHazardTypes.map((hazardType) =>{
			listHazards(globalConfig, hazardType);
		});
	}, []);

	// // form check
	useEffect(() => {
		if (Object.keys(datawolfFormState).every((k, ) => Object.values(datawolfFormState[k])[0] !== "")) setDisabled(false);
		else setDisabled(true);
	}, [datawolfFormState]);

	// hazard dropdown
	useEffect(() => {
		let hazardType = Object.values(datawolfFormState.selectedHazardType)[0];
		if (hazardType === "earthquakes"){
			setHazards(earthquakes);
		}
		else if (hazardType === "tornadoes"){
			setHazards(tornadoes);
		}
		else if (hazardType === "tsunamis"){
			setHazards(tsunamis);
		}
		else if (hazardType === "floods"){
			setHazards(floods);
		}
		else if (hazardType === "hurricanes"){
			setHazards(hurricanes);
		}
	}, [datawolfFormState.selectedHazardType]);

	const handleRunButtonClick = async () =>{
		const datawolfJson = await submitExecution(globalConfig, datawolfConfig, datawolfWorkflowConfig, datawolfFormState);
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
					{
						parametersMap.map(item => {
							if (!item.hidden){
								return (<Box className="inputGroup" style={{height: "auto"}}>
									<IncoreInputLabel>{item.parameters.title}</IncoreInputLabel>
									{(() => {
										if (item.parameters.widget === "TextField") {
											return (
												<IncoreTextField variant="outlined"
																 value={datawolfFormState[item.parameters.variableName][item.paramId] ?? ""}
																 onChange={(e) => {// e.target.value inside async doesn't perform correctly
																	 let currentVal = e.target.value;
																	 setDatawolfFormState(prevState =>
																	 ({...prevState, [item.parameters.variableName]: {[item.paramId]: currentVal}}));}}/>
											);
										} else if (item.parameters.widget === "SelectBox") {
											return (
												<IncoreSelectBox labelId="label" id="select" variant="outlined"
																 onChange={(e) => {
																	let currentVal = e.target.value;
																 	setDatawolfFormState(prevState =>
																	 ({...prevState, [item.parameters.variableName]: {[item.paramId]: currentVal}}));}}
																 value={datawolfFormState[item.parameters.variableName][item.paramId] ?? ""}>
													{
														eval(item.parameters.defaultValue).map((option) => {
															return (
																<IncoreMenuItem value={option["id"] ?? option} key={option["id"]?? option}>
																	{option["title"] ?? option["name"] ?? option}</IncoreMenuItem>
															);
														})
													}
												</IncoreSelectBox>
											);
										} else {
											return (<></>);
										}
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



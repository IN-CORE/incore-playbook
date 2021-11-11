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

import PoweredBy from "../../public/powered-by-incore.svg";
import fullHtml from "../../public/steps/3-4.html";
import StepInfo from "../StepInfo";
import {inputDatasetTypes} from "../../globals";

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
	const {value, index, listTornadoes, tornadoes, listDatasets, buildings, epfs, interdNetworks,
		sectorShocks, huas, blockGroups, valueLosses, getExecutionList, gotoViewResultTab, ...other} = props;

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedBldgId, setBldgId] = useState("");
	const [selectedSubstationId, setSubstationId] = useState("");
	const [selectedPoleId, setPoleId] = useState("");
	const [selectedInterdNetworkId, setInterdNetworkId] = useState("");
	const [selectedBldgToSectorId, setBldgToSectorId] = useState("");
	const [selectedHuaId, setHuaId] = useState("");
	const [selectedBlockGroupId, setBlockGroupId] = useState("");
	const [selectedValueLossId, setValueLossId] = useState("");
	const [selectedTornadoId, setTornadoId] = useState("");
	const [disabled, setDisabled] = useState(true);

	// load datasets and tornadoes
	useEffect(() =>{

		// dataset
		Object.keys(inputDatasetTypes).map((key) => {
			inputDatasetTypes[key].map((inputDatasetType) => {
				listDatasets(inputDatasetType["num"], 0, inputDatasetType["type"]);
			});
		});

		// hazard
		listTornadoes();
	}, []);

	// form check
	useEffect(() => {
		if (selectedBldgId !== ""
			&& selectedSubstationId !== ""
			&& selectedPoleId !== ""
			&& selectedInterdNetworkId !== ""
			&& title !== ""
			&& description !== ""
			&& selectedBldgToSectorId !== ""
			&& selectedHuaId !== ""
			&& selectedBlockGroupId !== ""
			&& selectedValueLossId !== ""
			&& selectedTornadoId !== "") setDisabled(false);
		else setDisabled(true);
	}, [selectedBldgId, selectedSubstationId, selectedPoleId, selectedInterdNetworkId, title, description,
		selectedBldgToSectorId, selectedHuaId, selectedBlockGroupId, selectedValueLossId,
		selectedTornadoId]);


	const classes = useStyles();

	const handleRunButtonClick = async () =>{
		const datawolfJson = await submitExecution(title, description, selectedBldgId, selectedSubstationId,
			selectedPoleId, selectedInterdNetworkId, selectedBldgToSectorId, selectedHuaId, selectedBlockGroupId,
			selectedValueLossId, selectedTornadoId);
		if (datawolfJson && datawolfJson !== "") {
			setTitle("");
			setDescription("");
			setBldgId("");
			setSubstationId("");
			setPoleId("");
			setInterdNetworkId("");
			setBldgToSectorId("");
			setHuaId("");
			setBlockGroupId("");
			setValueLossId("");
			setTornadoId("");

			// update execution list and then jump to view result tab
			getExecutionList();
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
					<div className="inputGroup" style={{height: "auto", marginTop:"55px"}}>
						<IncoreInputLabel>Title</IncoreInputLabel>
						<IncoreTextField value={title} variant="outlined" onChange={(e) => setTitle(e.target.value)}/>
					</div>
					<div className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Description</IncoreInputLabel>
						<IncoreTextField value={description} variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
					</div>
					<Box className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Select a Building Cluster
						</IncoreInputLabel>
						<IncoreSelectBox labelId="label" id="select" variant="outlined"
										 onChange={(e)=>{ setBldgId(e.target.value); }}
										 value={selectedBldgId}>
							{
								buildings.map((building) => {
									return (
										<IncoreMenuItem value={building["id"]} key={building["id"]}>
											{building["title"]}</IncoreMenuItem>
									);
								})
							}
						</IncoreSelectBox>
					</Box>
					<Box className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Select Electric Power Facilities (Poles)
						</IncoreInputLabel>
						<IncoreSelectBox labelId="label" id="select" variant="outlined"
										 onChange={(e)=>{ setPoleId(e.target.value); }}
										 value={selectedPoleId}>
							{
								epfs.map((epf) => {
									return (
										<IncoreMenuItem value={epf["id"]} key={epf["id"]}>
											{epf["title"]}</IncoreMenuItem>
									);
								})
							}
						</IncoreSelectBox>
					</Box>
					<Box className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Select Electric Power Facilities (Substation)
						</IncoreInputLabel>
						<IncoreSelectBox labelId="label" id="select" variant="outlined"
										 onChange={(e)=>{ setSubstationId(e.target.value); }}
										 value={selectedSubstationId}>
							{
								epfs.map((epf) => {
									return (
										<IncoreMenuItem value={epf["id"]} key={epf["id"]}>
											{epf["title"]}</IncoreMenuItem>
									);
								})
							}
						</IncoreSelectBox>
					</Box>
					<Box className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Select Interdependency Network
						</IncoreInputLabel>
						<IncoreSelectBox labelId="label" id="select" variant="outlined"
										 onChange={(e)=>{ setInterdNetworkId(e.target.value); }}
										 value={selectedInterdNetworkId}>
							{
								interdNetworks.map((interdNetwork) => {
									return (
										<IncoreMenuItem key={interdNetwork["id"]} value={interdNetwork["id"]} interdNetwork={interdNetwork["id"]}>
											{interdNetwork["title"]}</IncoreMenuItem>
									);
								})
							}
						</IncoreSelectBox>

						{/*socioecnomic input*/}
						<Box className={classes.socioeconomicsBlock}>
							<Typography className={classes.explanation} style={{margin: "5px 0", color:"#00619D"}}>
								Select Socioeconomical Inputs
							</Typography>
							<Box className={classes.socioeconomics}>

								<Box className="inputGroup" style={{height: "auto"}}>
									<IncoreInputLabel>Select Building to Sector Mapping
									</IncoreInputLabel>
									<IncoreSelectBox labelId="label" id="select" variant="outlined"
													 onChange={(e)=>{ setBldgToSectorId(e.target.value); }}
													 value={selectedBldgToSectorId}>
										>
										{
											sectorShocks.map((item) => {
												return (
													<IncoreMenuItem key={item["id"]} value={item["id"]} sectorShock={item["id"]}>
														{item["title"]}</IncoreMenuItem>
												);
											})
										}
									</IncoreSelectBox>
								</Box>
								<Box className="inputGroup" style={{height: "auto"}}>
									<IncoreInputLabel>Select Housing Unit Allocation Table
									</IncoreInputLabel>
									<IncoreSelectBox labelId="label" id="select" variant="outlined"
													 onChange={(e)=>{ setHuaId(e.target.value); }}
													 value={selectedHuaId}>
										>
										{
											huas.map((item) => {
												return (
													<IncoreMenuItem key={item["id"]} value={item["id"]} hua={item["id"]}>
														{item["title"]}</IncoreMenuItem>
												);
											})
										}
									</IncoreSelectBox>
								</Box>
								<Box className="inputGroup" style={{height: "auto"}}>
									<IncoreInputLabel>Select Block Group Census
									</IncoreInputLabel>
									<IncoreSelectBox labelId="label" id="select" variant="outlined"
													 onChange={(e)=>{ setBlockGroupId(e.target.value); }}
													 value={selectedBlockGroupId}>
										>
										{
											blockGroups.map((item) => {
												return (
													<IncoreMenuItem key={item["id"]} value={item["id"]} blockGroup={item["id"]}>
														{item["title"]}</IncoreMenuItem>
												);
											})
										}
									</IncoreSelectBox>
								</Box>
								<Box className="inputGroup" style={{height: "auto"}}>
									<IncoreInputLabel>Select Value Loss Distribution
									</IncoreInputLabel>
									<IncoreSelectBox labelId="label" id="select" variant="outlined"
													 onChange={(e)=>{ setValueLossId(e.target.value); }}
													 value={selectedValueLossId}>
										>
										{
											valueLosses.map((item) => {
												return (
													<IncoreMenuItem key={item["id"]} value={item["id"]} valueLoss={item["id"]}>
														{item["title"]}</IncoreMenuItem>
												);
											})
										}
									</IncoreSelectBox>
								</Box>

							</Box>
						</Box>

						<Typography className={classes.explanation}>If you need to add entities to your built environment&nbsp;
							<NavLink to="/community-environment"
								  className={classes.explanationLink}>click here</NavLink>.</Typography>
					</Box>
					<Box className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Select a Hazard</IncoreInputLabel>
						<IncoreSelectBox labelId="label" id="select" variant="outlined"
										 onChange={(e)=>{ setTornadoId(e.target.value); }}
										 value={selectedTornadoId}>
							{
								tornadoes.map((tornado) => {
									return (
										<IncoreMenuItem value={tornado["id"]} key={tornado["id"]}>
											{tornado["name"]}</IncoreMenuItem>
									);
								})
							}
						</IncoreSelectBox>
						<Typography className={classes.explanation}>If you need to add new hazards to your community hazards list&nbsp;
							<NavLink to="/goal-objective-hazard"
								  className={classes.explanationLink}>click here</NavLink>.</Typography>
					</Box>
					<Box className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Run the Analysis</IncoreInputLabel>
						<Button variant="contained" color="primary" onClick={handleRunButtonClick}
							disabled={disabled}
							endIcon={<Avatar src={PoweredBy} className={classes.avatarStyle}/>}
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



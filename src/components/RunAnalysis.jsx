import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
	Box,
	Avatar,
	Link,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";

import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";
import {IncoreSelectBox, IncoreMenuItem} from "./styledComponents/IncoreSelect";

import StepDescription from "./StepDescription";

import {stepInfo} from "../app.messages";
import {IncoreTextField} from "./styledComponents/IncoreInput";

import {submitExecution} from "../utils/datawolf";
import PoweredBy from "../public/powered-by-incore.svg";

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
	}
});

export default function ViewResult(props) {
	const {value, index, listTornadoes, tornadoes, listDatasets, datasets,
		getExecutionList, gotoViewResultTab, ...other} = props;

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedDatasetId, setDatasetId] = useState("");
	const [selectedTornadoId, setTornadoId] = useState("");
	const [disabled, setDisabled] = useState(true);


	// load datasets and tornadoes
	useEffect(() =>{
		listDatasets(20, 0, "ergo:buildingInventoryVer6");
		listDatasets(20, 0, "incore:epf");
		listTornadoes();}, []);

	// form check
	useEffect(() => {
		if (selectedDatasetId !== "" && selectedDatasetId !== "" && title !== "" && description !== "") setDisabled(false);
		else setDisabled(true);
	}, [selectedDatasetId, selectedDatasetId, title, description]);


	const classes = useStyles();

	const handleRunButtonClick = async () =>{
		const datawolfJson = await submitExecution(title, description, selectedDatasetId,selectedTornadoId);
		if (datawolfJson && datawolfJson !== "") {
			setTitle("");
			setDescription("");
			setDatasetId("");
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
				<Grid item style={{width: "500px"}}>
					<div className="inputGroup" style={{height: "auto", marginTop:"55px"}}>
						<IncoreInputLabel>Title</IncoreInputLabel>
						<IncoreTextField value={title} variant="outlined" onChange={(e) => setTitle(e.target.value)}/>
					</div>
					<div className="inputGroup" style={{height: "auto"}}>
						<IncoreInputLabel>Description</IncoreInputLabel>
						<IncoreTextField value={description} variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
					</div>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item className="gridItem">
					<Box className="inputGroup">
						<IncoreInputLabel>Select a Building, Building Cluster, or Infrastructure Entity
						</IncoreInputLabel>
						<IncoreSelectBox labelId="label" id="select" variant="outlined"
										 onChange={(e)=>{ setDatasetId(e.target.value); }}
										 value={selectedDatasetId}>
							{
								datasets.map((dataset) => {
									return (
										<IncoreMenuItem value={dataset["id"]} key={dataset["id"]}>
											{dataset["title"]}</IncoreMenuItem>
									);
								})
							}
						</IncoreSelectBox>
						<Typography className={classes.explanation}>If you need to add entities to your built environment&nbsp;
							<Link href="/set-built-environment" className={classes.explanationLink}>click here</Link>.</Typography>
					</Box>
				</Grid>
				<Grid item className="gridItem">
					<StepDescription stepInfo={stepInfo[2]} />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item className="gridItem">
					<Box className="inputGroup">
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
							<Link href="/define-community-hazards" className={classes.explanationLink}>click here</Link>.</Typography>
					</Box>
				</Grid>
				<Grid item className="gridItem">
					<StepDescription stepInfo={stepInfo[3]} />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item className="gridItem">
					<Box className="inputGroup">
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
				<Grid item className="gridItem">
					<StepDescription stepInfo={stepInfo[4]} />
				</Grid>
			</Grid>
		</div>
	);
}



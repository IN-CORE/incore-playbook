import React, {useEffect, useRef, useState} from "react";

import {Box, Container, Dialog, DialogContent, Divider, Grid, IconButton} from "@material-ui/core";

import Layout from "../containers/Layout";
import PageBanner from "./Banner";
import StepStatus from "./StepStatus";
import StepDescription from "./StepDescription";
import {stepInfo} from "../app.messages";
import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";
import {IncoreTextField} from "./styledComponents/IncoreInput";
import {IncoreButton} from "./styledComponents/IncoreButton";

import {createDataset} from "../utils/dataset";
import {EntryTable} from "./EntryTable";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LoadingOverlay from "react-loading-overlay";
import CloseIcon from "@material-ui/icons/Close";
import FileUploadDrop from "./FileUploadDrop";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	title:{
		fontSize:"20px",
	},
	divider:{
		color:"red",
		border:"solid 1px",
		width: "100%"
	},
	uploadSection:{
		padding:"20px",
	},
	subUploadSection:{
		marginTop:"20px",
		marginBottom:"80px",
	},
	subTitleRow:{
		height:"50px"
	},
	subTitle:{
		display:"inline"
	},
	plusButton:{
		display:"inline",
		float:"right",
		padding:0
	},
	subDivider:{
		color:"#00619d",
		border:"solid 1px",
		width: "100%"
	}
});


export default function BuiltEnvironment(props) {
	const classes = useStyles();

	const {listDatasets, buildings, epfs} = props;
	const fileInputRef = useRef(null);
	const [files, setFile] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dataType, setDataType] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [uploadModalStatus, setUploadModalStatus] = useState(false);

	// load uploaded dataset
	useEffect(() => {
		listDatasets(20, 0, "ergo:buildingInventoryVer6");
		listDatasets(20, 0, "incore:epf");
	}, []);

	// form check
	useEffect(() => {
		if (title !== "" && description !== "" && dataType !== "" && files.length > 0) setDisabled(false);
		else setDisabled(true);
	}, [title, description, dataType, files]);

	const onFileInputChange = (event) => {
		const fileList = Array.from(event.target.files);
		setFile(fileList);
	};

	const onDrop = (fileList, event) => {
		setFile(Array.from(fileList));
	};

	const onDeleteClick = (filename) => {
		setFile(files.filter(file => file.name !== filename));
	};

	const onSave = async () => {
		setLoading(true);
		const datasetJson = await createDataset(title, description, dataType, files);
		if (datasetJson !== {}) {

			// update table to show uploaded data
			listDatasets(20, 0, "ergo:buildingInventoryVer6");
			listDatasets(20, 0, "incore:epf");

			setFile([]);
			setTitle("");
			setDescription("");
			setDataType("");
			setLoading(false);
			setUploadModalStatus(false);
		}
	};

	const handleUploadClose = () => {
		setUploadModalStatus(false);
		setFile([]);
		setTitle("");
		setDescription("");
		setLoading(false);
		setDataType("");
	};

	const fieldNames = [
		{
			"prettyName": "NAME",
			"columnName": "title",
		},
		{
			"prettyName": "DATE ADDED",
			"columnName": "date",
		}
	];

	return (
		<Layout>
			<div className="firstDivInContent">
				<PageBanner parentStep="Understand the Situation"
					childStep="Identify & Characterize the Built Environment" taskNo="2" subtaskNo="2-4"/>
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<Grid item className="gridItem">
							<LoadingOverlay
								active={loading}
								spinner
								text="Saving..."
							>
								<Container>
									<IncoreInputLabel className={classes.title}>Uploaded Data</IncoreInputLabel>
									<Divider orientation="horizontal" className={classes.divider} flexItem />
									<Box className={classes.uploadSection}>
										{/*list of uploaded building inventory*/}
										<Box className={classes.subUploadSection}>
											<Box className={classes.subTitleRow}>
												<IncoreInputLabel className={classes.subTitle}>Building Inventory</IncoreInputLabel>
												<IconButton className={classes.plusButton} onClick={() => {
													setUploadModalStatus(true);
													setDataType("ergo:buildingInventoryVer6");
												}}>
													<AddCircleOutlineIcon/>
												</IconButton>
												<Divider orientation="horizontal" className={classes.subDivider} flexItem />
											</Box>
											<Box className="entryTable">
												<EntryTable fieldNames={fieldNames} fields={buildings}/>
											</Box>
										</Box>
										{/*list of uploaded EPF inventory*/}
										<Box className={classes.subUploadSection}>
											<Box className={classes.subTitleRow}>
												<IncoreInputLabel className={classes.subTitle}>Electric Power Facility</IncoreInputLabel>
												<IconButton className={classes.plusButton} onClick={() => {
													setUploadModalStatus(true);
													setDataType("incore:epf");
												}}>
													<AddCircleOutlineIcon/>
												</IconButton>
												<Divider orientation="horizontal" className={classes.subDivider} flexItem />
											</Box>
											<Box className="entryTable">
												<EntryTable fieldNames={fieldNames} fields={epfs}/>
											</Box>
										</Box>
									</Box>
								</Container>
							</LoadingOverlay>
						</Grid>
						<Grid item className="gridItem">
							<StepStatus/>
							<StepDescription stepInfo={stepInfo[1]}/>
						</Grid>
					</Grid>
					{/*for individual analysis result preview*/}
					<Dialog open={uploadModalStatus} onClose={handleUploadClose} maxWidth="sm" fullWidth scroll="paper">
						<DialogContent>
							<IconButton aria-label="Close" onClick={handleUploadClose} style={{float: "right"}}>
								<CloseIcon fontSize="small"/>
							</IconButton>
							{/*Upload Form*/}
							<>
								<Box className="inputGroup">
									<IncoreInputLabel>Select Data</IncoreInputLabel>
									<FileUploadDrop onDrop={onDrop} onFileInputChange={onFileInputChange}
										fileInput={fileInputRef}
										files={files} onDeleteClick={onDeleteClick}/>
								</Box>
								<Box className="inputGroup">
									<IncoreInputLabel>Name</IncoreInputLabel>
									<IncoreTextField value={title} variant="outlined"
													 onChange={(e) => setTitle(e.target.value)}/>
								</Box>
								<Box className="inputGroup">
									<IncoreInputLabel>Description</IncoreInputLabel>
									<IncoreTextField value={description} variant="outlined"
													 onChange={(e) => setDescription(e.target.value)}/>
								</Box>
								<Box className="inputGroup">
									<IncoreButton variant="contained" onClick={onSave}
												  disabled={disabled}>Save</IncoreButton>
								</Box>
							</>
						</DialogContent>
					</Dialog>
				</Box>
			</div>
		</Layout>
	);
}

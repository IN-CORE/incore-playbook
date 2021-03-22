import React, {useEffect, useRef, useState} from "react";

import {Box, Container, Grid, IconButton} from "@material-ui/core";

import Layout from "../containers/Layout";
import PageBanner from "./Banner";
import StepStatus from "./StepStatus";
import StepDescription from "./StepDescription";
import {stepInfo} from "../app.messages";
import FileUploadDrop from "./FileUploadDrop";
import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";
import {IncoreTextField} from "./styledComponents/IncoreInput";
import {IncoreMenuItem, IncoreSelectBox} from "./styledComponents/IncoreSelect";
import {IncoreButton} from "./styledComponents/IncoreButton";

import {createDataset} from "../utils/dataset";
import {EntryTable} from "./EntryTable";

import FilterListIcon from "@material-ui/icons/FilterList";
import LoadingOverlay from "react-loading-overlay";

export default function BuiltEnvironment(props) {
	const { listDatasets, datasets } = props;
	const fileInputRef = useRef(null);
	const [files, setFile] = useState([]);
	const [activeKey, setActiveKey] = useState("inprogress");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dataType, setDataType] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	// load uploaded dataset
	useEffect(() => { listDatasets();}, []);

	// form check
	useEffect(() => {
		if (title !== "" && description !== "" && dataType !== "" && files.length > 0) setDisabled(false);
		else setDisabled(true);
	}, [title, description, files]);

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
			listDatasets();

			setFile([]);
			setTitle("");
			setDescription("");
			setDataType("");
			setActiveKey("complete");
			setLoading(false);
		}
	};

	const fieldNames = [
		{
			"prettyName": "NAME",
			"columnName" :"title",
		},
		{
			"prettyName": "DESCRIPTION",
			"columnName": "description"
		},
		{
			"prettyName": "DATE ADDED",
			"columnName" :"date",
		},
		{
			"prettyName": "SUBMITTED BY",
			"columnName" :"creator",
		},
		{
			"prettyName":"TYPE",
			"columnName" : "dataType"
		}
	];

	return (
		<Layout>


			<div className="firstDivInContent">
				<PageBanner parentStep="Understand the Situation"
					childStep="Identify & Characterize the Built Environment" taskNo="2" subtaskNo="2-4"/>
				<Box className="outerBox">
					{/*List uploaded datasets*/}
					<Container className="entryTableContainer">
						<Box className="entryTableTitle">
							<IncoreInputLabel>Uploaded Data</IncoreInputLabel>
							<Box style={{float:"right"}}>
								<IconButton>
									<FilterListIcon/>
								</IconButton>
							</Box>
						</Box>
						<Box className="entryTable">
							<EntryTable fieldNames={fieldNames} fields={datasets}/>
						</Box>
					</Container>
					<Grid container spacing={3} className="innerBox">
						<Grid item className="gridItem">
							<LoadingOverlay
								active={loading}
								spinner
								text="Saving..."
							>
								<Container>
									<Box className="inputGroup">
										<IncoreInputLabel>Select Data</IncoreInputLabel>
										<FileUploadDrop onDrop={onDrop} onFileInputChange={onFileInputChange}
											fileInput={fileInputRef}
											files={files} onDeleteClick={onDeleteClick}/>
									</Box>
									<Box className="inputGroup">
										<IncoreInputLabel>Name</IncoreInputLabel>
										<IncoreTextField value={title} variant="outlined" onChange={(e) => setTitle(e.target.value)}/>
									</Box>
									<Box className="inputGroup">
										<IncoreInputLabel>Description</IncoreInputLabel>
										<IncoreTextField value={description} variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
									</Box>
									<Box className="inputGroup">
										<IncoreInputLabel>Select Data Type</IncoreInputLabel>
										<IncoreSelectBox labelId="label" id="select"
														 variant="outlined"
														 onChange={(e)=>setDataType(e.target.value)}>
											<IncoreMenuItem value="ergo:buildingInventoryVer6" key="ergo:buildingInventoryVer6">Building</IncoreMenuItem>
											<IncoreMenuItem value="incore:epf" key="incore:epf">Electric Power Facility</IncoreMenuItem>
										</IncoreSelectBox>
									</Box>
									<Box className="inputGroup">
										<IncoreButton variant="contained" onClick={onSave} disabled={disabled}>Save</IncoreButton>
									</Box>
								</Container>
							</LoadingOverlay>
						</Grid>
						<Grid item className="gridItem">
							<StepStatus />
							<StepDescription stepInfo={stepInfo[1]} />
						</Grid>
					</Grid>
				</Box>
			</div>



		</Layout>
	);
}

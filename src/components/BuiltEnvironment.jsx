import React, {useEffect, useRef, useState} from "react";

import {Box, Container, Grid, IconButton} from "@material-ui/core";

import Layout from "../containers/Layout";
import PageBanner from "./Banner";
import StepStatus from "./StepStatus";
import {processStatus} from "../globals";
import StepDescription from "./StepDescription";
import {stepInfo} from "../app.messages";
import FileUploadDrop from "./FileUploadDrop";
import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";
import {IncoreTextField} from "./styledComponents/IncoreInput";
import {IncoreButton} from "./styledComponents/IncoreButton";
import {IncoreSelectBox, IncoreMenuItem} from "./styledComponents/IncoreSelect";

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
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	// load uploaded dataset
	useEffect(() => { listDatasets();}, []);

	// form check
	useEffect(() => {
		if (title !== "" && description !== "" && files.length > 0) setDisabled(false);
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
		const datasetJson = await createDataset(title, description, files);
		if (datasetJson !== {}) {

			// update table to show uploaded data
			listDatasets();

			setFile([]);
			setTitle("");
			setDescription("");
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
			"prettyName": "DATE ADDED",
			"columnName" :"date",
		},
		{
			"prettyName": "SUBMITTED BY",
			"columnName" :"creator",
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
						<Box className="inputGroup">
							<IncoreInputLabel>Uploaded Data</IncoreInputLabel>
							<Box style={{float:"right"}}>
								<IconButton>
									<FilterListIcon/>
								</IconButton>
							</Box>
						</Box>
						<Box className="inputGroup">
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
										<IncoreInputLabel>Select Building Cluster</IncoreInputLabel>
										<IncoreSelectBox labelId="label" id="select" variant="outlined" defaultValue="criticalFacilities">
											<IncoreMenuItem value="criticalFacilities" key="criticalFacilities">Critical Facilities</IncoreMenuItem>
											<IncoreMenuItem value="emergencyHousing" key="emergencyHousing">Emergency Housing</IncoreMenuItem>
											<IncoreMenuItem value="housingNeighborhood" key="housingNeighborhood">Housing / Neighborhood</IncoreMenuItem>
											<IncoreMenuItem value="communityRecovery" key="communityRecovery">Community Recovery</IncoreMenuItem>
										</IncoreSelectBox>
									</Box>
									<Box className="inputGroup">
										<IncoreButton variant="contained" onClick={onSave} disabled={disabled}>Save</IncoreButton>
									</Box>
								</Container>
							</LoadingOverlay>
						</Grid>
						<Grid item className="gridItem">
							<StepStatus statusOptions={processStatus} status={activeKey} />
							<StepDescription stepInfo={stepInfo[1]} />
						</Grid>
					</Grid>
				</Box>
			</div>



		</Layout>
	);
}

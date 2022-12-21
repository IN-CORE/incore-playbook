import React, { useEffect, useRef, useState } from "react";

import { Box, Dialog, DialogContent, Divider, Grid, IconButton } from "@material-ui/core";

import { Layout } from "./Layout";
import PageBanner from "./childComponents/navigation/Banner";
import StepInfo from "./StepInfo";
import StepStatus from "./childComponents/step/StepStatus";
import { IncoreInputLabel } from "./styledComponents/IncoreInputLabel";
import { IncoreTextField } from "./styledComponents/IncoreInput";
import { IncoreButton } from "./styledComponents/IncoreButton";

import { createDataset } from "../utils/dataset";
import { EntryTable } from "./childComponents/table/EntryTable";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LoadingOverlay from "react-loading-overlay";
import fullHtml from "../public/steps/2-4.html";
import CloseIcon from "@material-ui/icons/Close";
import FileUploadDrop from "./childComponents/form/FileUploadDrop";
import { makeStyles } from "@material-ui/core/styles";
import { inputDatasetTypes } from "../globals";
import { IncoreMenuItem, IncoreSelectBox } from "./styledComponents/IncoreSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchDatasets } from "../actions/datasets";

import Pagination from "./childComponents/navigation/Pagination";

const useStyles = makeStyles({
	title: {
		fontSize: "20px"
	},
	divider: {
		color: "red",
		border: "solid 1px",
		width: "100%"
	},
	uploadSection: {
		padding: "20px 0px 20px 0px"
	},
	subUploadSection: {
		marginTop: "20px",
		marginBottom: "80px"
	},
	subTitleRow: {
		height: "50px"
	},
	subTitle: {
		display: "inline"
	},
	plusButton: {
		display: "inline",
		float: "right",
		padding: 0
	},
	subDivider: {
		color: "#00619d",
		border: "solid 1px",
		width: "100%"
	}
});

export const BuiltEnvironment = ({ step, substep }) => {
	const classes = useStyles();

	const fileInputRef = useRef(null);
	const [files, setFile] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [datasetType, setDatasetType] = useState("");
	// use to display dataset type menus
	// social ecnomic datasets are a collection of various dataset types
	const [category, setCategory] = useState(""); // building, EPF, interdependency network, socioeconomics input
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [uploadModalStatus, setUploadModalStatus] = useState(false);

	const dispatch = useDispatch();
	const listDatasets = (config, limit, offset, type) => dispatch(fetchDatasets(config, limit, offset, type));
	const allowedDataTypes = useSelector((state) => state.config.allowedDataTypes);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const buildings = useSelector((state) => state.dataset.buildings);
	const epfs = useSelector((state) => state.dataset.epfs);
	const interdNetworks = useSelector((state) => state.dataset.interdNetworks);
	const sectorShocks = useSelector((state) => state.dataset.sectorShocks);
	const cgeSams = useSelector((state) => state.dataset.cgeSams);
	const cgeBbs = useSelector((state) => state.dataset.cgeBbs);
	const cgeIouts = useSelector((state) => state.dataset.cgeIouts);
	const cgeMiscs = useSelector((state) => state.dataset.cgeMiscs);
	const cgeMischs = useSelector((state) => state.dataset.cgeMischs);
	const cgeLandcaps = useSelector((state) => state.dataset.cgeLandcaps);
	const cgeEmploys = useSelector((state) => state.dataset.cgeEmploys);
	const cgeIgtds = useSelector((state) => state.dataset.cgeIgtds);
	const cgeTauffs = useSelector((state) => state.dataset.cgeTauffs);
	const cgeJobcrs = useSelector((state) => state.dataset.cgeJobcrs);
	const cgeOutcrs = useSelector((state) => state.dataset.cgeOutcrs);
	const huas = useSelector((state) => state.dataset.huas);
	const blockGroups = useSelector((state) => state.dataset.blockGroups);
	const valueLosses = useSelector((state) => state.dataset.valueLosses);
	const [dataPerPage, setDataPerPage] = React.useState(5);
	const [offsetBuilding, setOffsetBuilding] = React.useState(0);
	const [pageNumberBuilding, setPageNumberBuilding] = React.useState(1);
	const [offsetEpf, setOffsetEpf] = React.useState(0);
	const [pageNumberEpf, setPageNumberEpf] = React.useState(1);
	const [offsetInterdNetwork, setOffsetInterdNetwork] = React.useState(0);
	const [pageNumberInterdNetwork, setPageNumberInterdNetwork] = React.useState(1);
	const [offsetSocioEcon, setOffsetSocioEcon] = React.useState(0);
	const [pageNumberSocioEcon, setPageNumberSocioEcon] = React.useState(1);

	// load uploaded dataset
	useEffect(() => {
		Object.keys(inputDatasetTypes).map((key) => {
			inputDatasetTypes[key].map((inputDatasetType) => {
				listDatasets(globalConfig, dataPerPage, 0, inputDatasetType["type"]);
			});
		});
	}, []);

	// form check
	useEffect(() => {
		if (title !== "" && description !== "" && datasetType !== "" && files.length > 0) setDisabled(false);
		else setDisabled(true);
	}, [title, description, datasetType, files]);

	const onFileInputChange = (event) => {
		const fileList = Array.from(event.target.files);
		setFile(fileList);
	};

	const onDrop = (fileList) => {
		setFile(Array.from(fileList));
	};

	const onDeleteClick = (filename) => {
		setFile(files.filter((file) => file.name !== filename));
	};

	const onSave = async () => {
		setLoading(true);

		let format = "shapefile";
		// determine format based on datasetTypes
		Object.keys(inputDatasetTypes).map((key) => {
			inputDatasetTypes[key].map((inputDatasetType) => {
				if (inputDatasetType["type"] === datasetType) format = inputDatasetType["format"];
			});
		});

		const datasetJson = await createDataset(globalConfig, title, description, datasetType, files, format);
		if (datasetJson !== {}) {
			// update table to show uploaded data
			Object.keys(inputDatasetTypes).map((key) => {
				inputDatasetTypes[key].map((inputDatasetType) => {
					if (inputDatasetType["type"] === datasetType) {
						if (key === "buildings") {
							listDatasets(globalConfig, dataPerPage, offsetBuilding, datasetType);
						}
						if (key === "epfs") {
							listDatasets(globalConfig, dataPerPage, offsetEpf, datasetType);
						}
						if (key === "interdNetworks") {
							listDatasets(globalConfig, dataPerPage, offsetInterdNetwork, datasetType);
						}
						if (key === "sectorShocks" || key === "huas" || key === "blockGroups" || key === "valueLosses" ) {
							listDatasets(globalConfig, dataPerPage, offsetSocioEcon, datasetType);
						}
					}
				});
			});
			setFile([]);
			setTitle("");
			setDescription("");
			setDatasetType("");
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
		setDatasetType("");
	};

	const pageChange = (direction, key) => {
		if (direction === "previous") {
			if (key === "building") {
				setOffsetBuilding((pageNumberBuilding - 2) * dataPerPage);
				setPageNumberBuilding(pageNumberBuilding - 1);
			}
			if (key === "epf") {
				setOffsetEpf((pageNumberEpf - 2) * dataPerPage);
				setPageNumberEpf(pageNumberEpf - 1);
			}
			if (key === "interdNetwork") {
				setOffsetInterdNetwork((pageNumberInterdNetwork - 2) * dataPerPage);
				setPageNumberInterdNetwork(pageNumberInterdNetwork - 1);
			}
			if (key === "sectorShocks" || key === "huas" || key === "blockGroups" || key === "valueLosses") {
				setOffsetSocioEcon((pageNumberSocioEcon - 2) * dataPerPage);
				setPageNumberSocioEcon(pageNumberSocioEcon - 1);
			}
		} else if (direction === "next") {
			if (key === "building") {
				setOffsetBuilding(pageNumberBuilding * dataPerPage);
				setPageNumberBuilding(pageNumberBuilding + 1);
			}
			if (key === "epf") {
				setOffsetEpf(pageNumberEpf * dataPerPage);
				setPageNumberEpf(pageNumberEpf + 1);
			}
			if (key === "interdNetwork") {
				setOffsetInterdNetwork(pageNumberInterdNetwork * dataPerPage);
				setPageNumberInterdNetwork(pageNumberInterdNetwork + 1);
			}
			if (key === "sectorShocks" || key === "huas" || key === "blockGroups" || key === "valueLosses") {
				setOffsetSocioEcon(pageNumberSocioEcon * dataPerPage);
				setPageNumberSocioEcon(pageNumberSocioEcon + 1);
			}
		}
	};

	useEffect(() => {
		inputDatasetTypes["buildings"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetBuilding, inputDatasetType["type"]);
		});
	}, [offsetBuilding, dataPerPage, pageNumberBuilding]);

	useEffect(() => {
		inputDatasetTypes["epfs"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetEpf, inputDatasetType["type"]);
		});
	}, [offsetEpf, dataPerPage, pageNumberEpf]);

	useEffect(() => {
		inputDatasetTypes["interdNetworks"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetInterdNetwork, inputDatasetType["type"]);
		});
	}, [offsetInterdNetwork, dataPerPage, pageNumberInterdNetwork]);

	useEffect(() => {
		inputDatasetTypes["sectorShocks"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetSocioEcon, inputDatasetType["type"]);
		});
		inputDatasetTypes["huas"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetSocioEcon, inputDatasetType["type"]);
		});
		inputDatasetTypes["blockGroups"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetSocioEcon, inputDatasetType["type"]);
		});
		inputDatasetTypes["valueLosses"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetSocioEcon, inputDatasetType["type"]);
		});
	}, [offsetSocioEcon, dataPerPage, pageNumberSocioEcon]);

	const fieldNames = [
		{
			prettyName: "NAME",
			columnName: "title"
		},
		{
			prettyName: "DESCRIPTION",
			columnName: "description"
		},
		{
			prettyName: "DATE ADDED",
			columnName: "date"
		}
	];

	return (
		<Layout>
			<div className="firstDivInContent">
				<PageBanner
					parentStep="Understand the Situation"
					childStep="Identify & Characterize the Built Environment"
					taskNo="2"
					subtaskNo="2-4"
				/>
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						<Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="gridItem">
							<LoadingOverlay active={loading} spinner text="Saving...">
								<div>
									<IncoreInputLabel className={classes.title}>Uploaded Data</IncoreInputLabel>
									<Divider orientation="horizontal" className={classes.divider} flexItem />
									<Box className={classes.uploadSection}>
										{/*list of uploaded building inventory*/}
										{allowedDataTypes.building ? (
											<Box className={classes.subUploadSection}>
												<Box className={classes.subTitleRow}>
													<IncoreInputLabel className={classes.subTitle}>
														Building Inventory
													</IncoreInputLabel>
													<IconButton
														className={classes.plusButton}
														onClick={() => {
															setUploadModalStatus(true);
															setDatasetType("ergo:buildingInventoryVer6");
															setCategory("building");
														}}
													>
														<AddCircleOutlineIcon />
													</IconButton>
													<Divider
														orientation="horizontal"
														className={classes.subDivider}
														flexItem
													/>
												</Box>
												<Box className="entryTable">
													<EntryTable fieldNames={fieldNames} fields={buildings} />
													<Pagination
														pageNumber={pageNumberBuilding}
														data={buildings}
														dataPerPage={dataPerPage}
														previous={() => pageChange("previous", "building")}
														next={() => pageChange("next", "building")}
													/>
												</Box>
											</Box>
										) : null}

										{/*list of uploaded EPF inventory*/}
										{allowedDataTypes.epf ? (
											<Box className={classes.subUploadSection}>
												<Box className={classes.subTitleRow}>
													<IncoreInputLabel className={classes.subTitle}>
														Electric Power Facility
													</IncoreInputLabel>
													<IconButton
														className={classes.plusButton}
														onClick={() => {
															setUploadModalStatus(true);
															setDatasetType("incore:epf");
															setCategory("electric power facility");
														}}
													>
														<AddCircleOutlineIcon />
													</IconButton>
													<Divider
														orientation="horizontal"
														className={classes.subDivider}
														flexItem
													/>
												</Box>
												<Box className="entryTable">
													<EntryTable fieldNames={fieldNames} fields={epfs} />
													<Pagination
														pageNumber={pageNumberEpf}
														data={epfs}
														dataPerPage={dataPerPage}
														previous={() => pageChange("previous", "epf")}
														next={() => pageChange("next", "epf")}
													/>
												</Box>
											</Box>
										) : null}

										{/*list of uploaded interdependency network*/}
										{allowedDataTypes.network ? (
											<Box className={classes.subUploadSection}>
												<Box className={classes.subTitleRow}>
													<IncoreInputLabel className={classes.subTitle}>
														Interdependency Network
													</IncoreInputLabel>
													<IconButton
														className={classes.plusButton}
														onClick={() => {
															setUploadModalStatus(true);
															setDatasetType("incore:buildingInterdependencyDict");
															setCategory("interdependency network");
														}}
													>
														<AddCircleOutlineIcon />
													</IconButton>
													<Divider
														orientation="horizontal"
														className={classes.subDivider}
														flexItem
													/>
												</Box>
												<Box className="entryTable">
													<EntryTable fieldNames={fieldNames} fields={interdNetworks} />
													<Pagination
														pageNumber={pageNumberInterdNetwork}
														data={interdNetworks}
														dataPerPage={dataPerPage}
														previous={() => pageChange("previous", "interdNetwork")}
														next={() => pageChange("next", "interdNetwork")}
													/>
												</Box>
											</Box>
										) : null}

										{/*list of socioeconomics datasets for sector shock, cge and population dislocation*/}
										{allowedDataTypes.socioeconomics ? (
											<Box className={classes.subUploadSection}>
												<Box className={classes.subTitleRow}>
													<IncoreInputLabel className={classes.subTitle}>
														Socioeconomics Datasets
													</IncoreInputLabel>
													<IconButton
														className={classes.plusButton}
														onClick={() => {
															setUploadModalStatus(true);
															// don't set types here, set the types inside the modal
															setDatasetType("");
															setCategory("socioeconomics input");
														}}
													>
														<AddCircleOutlineIcon />
													</IconButton>
													<Divider
														orientation="horizontal"
														className={classes.subDivider}
														flexItem
													/>
												</Box>
												<Box className="entryTable">
													<EntryTable
														fieldNames={fieldNames}
														fields={[
															...sectorShocks,
															...huas,
															...blockGroups,
															...valueLosses
														]}
													/>
													<Pagination
														pageNumber={pageNumberSocioEcon}
														data={[
															...sectorShocks,
															...huas,
															...blockGroups,
															...valueLosses
														]}
														dataPerPage={dataPerPage}
														previous={() => pageChange("previous", "socioEcon")}
														next={() => pageChange("next", "socioEcon")}
													/>
												</Box>
											</Box>
										) : null}
									</Box>
								</div>
							</LoadingOverlay>
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="gridItem">
							<StepStatus step={step} substep={substep} />
							<StepInfo fullHtml={fullHtml} />
						</Grid>
					</Grid>
					{/*for individual analysis result preview*/}
					<Dialog open={uploadModalStatus} onClose={handleUploadClose} maxWidth="sm" fullWidth scroll="paper">
						<DialogContent>
							<IconButton aria-label="Close" onClick={handleUploadClose} style={{ float: "right" }}>
								<CloseIcon fontSize="small" />
							</IconButton>
							{/*Upload Form*/}
							<>
								<Box className="inputGroup">
									<IncoreInputLabel>Select {category} Data</IncoreInputLabel>
									<FileUploadDrop
										onDrop={onDrop}
										onFileInputChange={onFileInputChange}
										fileInput={fileInputRef}
										files={files}
										onDeleteClick={onDeleteClick}
									/>
								</Box>
								<Box className="inputGroup">
									<IncoreInputLabel>Name</IncoreInputLabel>
									<IncoreTextField
										value={title}
										variant="outlined"
										onChange={(e) => setTitle(e.target.value)}
									/>
								</Box>
								<Box className="inputGroup">
									<IncoreInputLabel>Description</IncoreInputLabel>
									<IncoreTextField
										value={description}
										variant="outlined"
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Box>
								{/*only for socioeconomic data*/}
								{category === "socioeconomics input" ? (
									<Box className="inputGroup">
										<IncoreInputLabel>Socioeconomic Dataset Type</IncoreInputLabel>
										<IncoreSelectBox
											labelId="label"
											id="select"
											variant="outlined"
											onChange={(e) => {
												setDatasetType(e.target.value);
											}}
											value={datasetType}
										>
											{Object.keys(inputDatasetTypes).map((key) => {
												return inputDatasetTypes[key].map((inputDatasetType) => {
													return inputDatasetType["isSocioeconomics"] ? (
														<IncoreMenuItem
															value={inputDatasetType["type"]}
															key={inputDatasetType["type"]}
														>
															{inputDatasetType["description"]}
														</IncoreMenuItem>
													) : null;
												});
											})}
										</IncoreSelectBox>
									</Box>
								) : null}
								<Box className="inputGroup">
									<IncoreButton variant="contained" onClick={onSave} disabled={disabled}>
										Save
									</IncoreButton>
								</Box>
							</>
						</DialogContent>
					</Dialog>
				</Box>
			</div>
		</Layout>
	);
};

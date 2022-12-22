import React, { useEffect, useRef, useState } from "react";

import { Box, Dialog, DialogContent, Divider, Grid, IconButton } from "@material-ui/core";

import { Layout } from "./Layout";
import BreadCrumb from "./childComponents/navigation/BreadCrumb";
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
	socioeconomicsSubBox:{
		padding: "1em"
	},
	socioeconomicsSubTitle: {
		color: "#00619d",
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
	const [dataPerPage, setDataPerPage] = React.useState(2);
	const [offsetBuilding, setOffsetBuilding] = React.useState(0);
	const [pageNumberBuilding, setPageNumberBuilding] = React.useState(1);
	const [offsetEpf, setOffsetEpf] = React.useState(0);
	const [pageNumberEpf, setPageNumberEpf] = React.useState(1);
	const [offsetInterdNetwork, setOffsetInterdNetwork] = React.useState(0);
	const [pageNumberInterdNetwork, setPageNumberInterdNetwork] = React.useState(1);
	const [offsetSectorShocks, setOffsetSectorShocks] = React.useState(0);
	const [offsetHuas, setOffsetHuas] = React.useState(0);
	const [offsetBlockGroups, setOffsetBlockGroups] = React.useState(0);
	const [offsetValueLosses, setOffsetValueLosses] = React.useState(0);
	const [pageNumberSectorShocks, setPageNumberSectorShocks] = React.useState(1);
	const [pageNumberHuas, setPageNumberHuas] = React.useState(1);
	const [pageNumberBlockGroups, setPageNumberBlockGroups] = React.useState(1);
	const [pageNumberValueLosses, setPageNumberValueLosses] = React.useState(1);

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
			listDatasets(globalConfig, dataPerPage, offsetBuilding, datasetType);
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

	const _pageChangeHelper = (direction, dataPerPage, setOffset, currPageNumber, setCurrPageNumber) => {
		if (direction === "previous") {
			setOffset((currPageNumber - 2) * dataPerPage);
			setCurrPageNumber(currPageNumber - 1);
		} else if (direction === "next") {
			setOffset(currPageNumber * dataPerPage);
			setCurrPageNumber(currPageNumber + 1);
		}
	};

	const pageChange = (direction, key) => {
		if (key === "building") {
			_pageChangeHelper(direction, dataPerPage, setOffsetBuilding, pageNumberBuilding,
				setPageNumberBuilding);
		}
		if (key === "epf") {
			_pageChangeHelper(direction, dataPerPage, setOffsetEpf, pageNumberEpf, setPageNumberEpf);
		}
		if (key === "interdNetwork") {
			_pageChangeHelper(direction, dataPerPage, setOffsetInterdNetwork, pageNumberInterdNetwork,
				setPageNumberInterdNetwork);
		}
		if (key === "sectorShocks") {
			_pageChangeHelper(direction, dataPerPage, setOffsetSectorShocks, pageNumberSectorShocks,
				setPageNumberSectorShocks);
		}
		if (key === "huas") {
			_pageChangeHelper(direction, dataPerPage, setOffsetHuas, pageNumberHuas, setPageNumberHuas);
		}
		if (key === "blockGroups") {
			_pageChangeHelper(direction, dataPerPage, setOffsetBlockGroups, pageNumberBlockGroups,
				setPageNumberBlockGroups);
		}
		if (key === "valueLosses") {
			_pageChangeHelper(direction, dataPerPage, setOffsetValueLosses, pageNumberValueLosses,
				setPageNumberValueLosses);
		}
	};

	useEffect(() => {
		inputDatasetTypes["buildings"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetBuilding, inputDatasetType["type"]);
		});
	}, [offsetBuilding, dataPerPage]);

	useEffect(() => {
		inputDatasetTypes["epfs"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetEpf, inputDatasetType["type"]);
		});
	}, [offsetEpf, dataPerPage]);

	useEffect(() => {
		inputDatasetTypes["interdNetworks"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetInterdNetwork, inputDatasetType["type"]);
		});
	}, [offsetInterdNetwork, dataPerPage]);

	useEffect(() => {
		inputDatasetTypes["sectorShocks"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetSectorShocks, inputDatasetType["type"]);
		});
	}, [offsetSectorShocks, dataPerPage]);

	useEffect(() => {
		inputDatasetTypes["huas"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetHuas, inputDatasetType["type"]);
		});
	}, [offsetHuas, dataPerPage]);

	useEffect(() => {
		inputDatasetTypes["blockGroups"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetBlockGroups, inputDatasetType["type"]);
		});
	}, [offsetBlockGroups, dataPerPage]);

	useEffect(() => {
		inputDatasetTypes["valueLosses"].map((inputDatasetType) => {
			listDatasets(globalConfig, dataPerPage, offsetValueLosses, inputDatasetType["type"]);
		});
	}, [offsetValueLosses, dataPerPage]);

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
				<BreadCrumb
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
												</Box>
												<Pagination
													pageNumber={pageNumberBuilding}
													data={buildings}
													dataPerPage={dataPerPage}
													previous={() => pageChange("previous", "building")}
													next={() => pageChange("next", "building")}
												/>
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
												</Box>
												<Pagination
													pageNumber={pageNumberEpf}
													data={epfs}
													dataPerPage={dataPerPage}
													previous={() => pageChange("previous", "epf")}
													next={() => pageChange("next", "epf")}
												/>
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
												</Box>
												<Pagination
													pageNumber={pageNumberInterdNetwork}
													data={interdNetworks}
													dataPerPage={dataPerPage}
													previous={() => pageChange("previous", "interdNetwork")}
													next={() => pageChange("next", "interdNetwork")}
												/>
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
												{/*sector shocks*/}
												<Box className={classes.socioeconomicsSubBox}>
													<IncoreInputLabel className={classes.socioeconomicsSubTitle}>
														Sector Shocks
													</IncoreInputLabel>
													<Box className="entryTable">
														<EntryTable
															fieldNames={fieldNames}
															fields={sectorShocks}
														/>
													</Box>
													<Pagination
														pageNumber={pageNumberSectorShocks}
														data={sectorShocks}
														dataPerPage={dataPerPage}
														previous={() => pageChange("previous", "sectorShocks")}
														next={() => pageChange("next", "sectorShocks")}
													/>
												</Box>
												{/*huas*/}
												<Box className={classes.socioeconomicsSubBox}>
													<IncoreInputLabel className={classes.socioeconomicsSubTitle}>
														Housing Unit Allocations
													</IncoreInputLabel>
													<Box className="entryTable">
														<EntryTable
															fieldNames={fieldNames}
															fields={huas}
														/>
													</Box>
													<Pagination
														pageNumber={pageNumberHuas}
														data={huas}
														dataPerPage={dataPerPage}
														previous={() => pageChange("previous", "huas")}
														next={() => pageChange("next", "huas")}
													/>
												</Box>
												{/*block groups*/}
												<Box className={classes.socioeconomicsSubBox}>
													<IncoreInputLabel className={classes.socioeconomicsSubTitle}>
														Block Groups
													</IncoreInputLabel>
													<Box className="entryTable">
														<EntryTable
															fieldNames={fieldNames}
															fields={blockGroups}
														/>
													</Box>
													<Pagination
														pageNumber={pageNumberBlockGroups}
														data={blockGroups}
														dataPerPage={dataPerPage}
														previous={() => pageChange("previous", "blockGroups")}
														next={() => pageChange("next", "blockGroups")}
													/>
												</Box>
												{/*value losses*/}
												<Box className={classes.socioeconomicsSubBox}>
													<IncoreInputLabel className={classes.socioeconomicsSubTitle}>
														Value Losses
													</IncoreInputLabel>
													<Box className="entryTable">
														<EntryTable
															fieldNames={fieldNames}
															fields={valueLosses}
														/>
													</Box>
													<Pagination
														pageNumber={pageNumberValueLosses}
														data={valueLosses}
														dataPerPage={dataPerPage}
														previous={() => pageChange("previous", "valueLosses")}
														next={() => pageChange("next", "valueLosses")}
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

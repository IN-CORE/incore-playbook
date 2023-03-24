import {
	Box,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	Grid,
	IconButton,
	Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ResultSummaryTable } from "../table/ResultSummaryTable";
import { FunctionalityGraph } from "../graph/FunctionalityGraph";
import Map from "../map/Map";
import { fromLonLat, getTransform } from "ol/proj";
import { FunctionalityTable } from "../table/FunctionalityTable";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { applyTransform } from "ol/extent";
import { downloadOutputFile, getOutputFileContent, getOutputFileContentJSON } from "../../../utils/datawolf";
import { basicLayers, generateLayers } from "../../../utils/map";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

export default function BldgFunctionality(props){

	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, hazardType, hazardLayers,
		setDownloadDialogOpen} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [runtime, setRuntime] = useState(null);
	const [bldgFuncSummaryTableContent, setBldgFuncSummaryTableContent] = useState(null);
	const [bldgFuncProbDownload, setBldgFuncProbDownload] = useState();
	const [damageLayers, setDamageLayers] = useState(null);

	// print container
	const printRef = useRef();

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		// for summary table on the top
		setRuntime(executionItem["date"].slice(0, 10));

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "bldgFuncProbINCOREId") {
				const bldgFuncProbINCOREId = await getOutputFileContent(
					datawolfConfig,
					executionItem,
					datawolfDatasetConfigItem.datasetId
				);
				const layerDef = [
					{
						"layerId": bldgFuncProbINCOREId,
						"layerStyles": "incore:joplin-bldg-func",
						"title": "Building Functionality Probability",
						"opacity": 1,
						"zIndex": 1
					}
				];
				const previewLayers = generateLayers(globalConfig, layerDef);
				setDamageLayers(previewLayers);
			}
			else if (vName === "bldgFuncSummaryTableContent") {
				setBldgFuncSummaryTableContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "bldgFuncProbDownload"){
				setBldgFuncProbDownload(executionItem["datasets"][datawolfDatasetConfigItem.datasetId]);
			}
		});
	}, []);

	const download = async () => {
		setDownloadDialogOpen(true);
		if (bldgFuncProbDownload) {
			await downloadOutputFile(datawolfConfig, bldgFuncProbDownload, null,
				`bldg-func-${executionItem.id}.csv`);
		}
	};

	return (
		<Dialog
			open={previewOn}
			onClose={handlePreviewClose}
			maxWidth="lg"
			fullWidth
			scroll="paper"
		>
			<DialogContent className="previewModal" ref={printRef}>
				<IconButton
					aria-label="Close"
					onClick={handlePreviewClose}
					style={{ float: "right" }}
				>
					<CloseIcon fontSize="small" />
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{selectedExecutionName}</Typography>
					<Typography className="previewTitle">Select Data: Building Functionality</Typography>
				</Box>

				{/*for chart*/}
				<Box className="chartContainer">
					<Grid container spacing={3} justify="center">
						{runtime ? (
							<Grid item>
								<Typography className="previewSubTitle">Analysis Result View</Typography>
								<ResultSummaryTable
									hazardType={hazardType}
									inventoryType="buildings"
									runtime={runtime}
								/>
							</Grid>
						) : (
							<></>
						)}
						<Divider orientation="vertical" flexItem />
						{bldgFuncSummaryTableContent && bldgFuncSummaryTableContent["by_category"] ? (
							<Grid item style={{ minWidth: "804px" }}>
								<Typography className="previewSubTitle">
									Anticipated Performance - Building Clusters
								</Typography>
								<Box style={{ marginTop: "38px" }}>
									<FunctionalityGraph categorySummary={bldgFuncSummaryTableContent["by_category"]} />
								</Box>
							</Grid>
						) : (
							<></>
						)}
					</Grid>
					<Divider orientation="horizontal" />
				</Box>

				{/*for map*/}
				{
					basicLayers && hazardLayers && damageLayers ?
						<Container className="mapContainer" disableGutters>
							<Map
								className="fillContainer"
								zoom={mapConfig.ZOOM}
								minZoom={mapConfig.MIN_ZOOM}
								maxZoom={mapConfig.MAX_ZOOM}
								extent={applyTransform(mapConfig.MAP_BOUNDS, getTransform("EPSG:4326", "EPSG:3857"))}
								center={fromLonLat(mapConfig.MAP_CENTER)}
								layers={[
									basicLayers,
									hazardLayers,
									damageLayers,
								]}
								layerSwitcherOptions={{}}
							/>
						</Container>
						:
						<></>
				}

				{/*for table*/}
				{bldgFuncSummaryTableContent ? (
					<Box>
						<FunctionalityTable funcResults={bldgFuncSummaryTableContent} />
					</Box>
				) : (
					<>/</>
				)}
			</DialogContent>
			<DialogActions>
				<IncoreButtonText onClick={()=>{downloadImg(printRef.current, "Building_Functionality");}}
								  startIcon={<CameraAltIcon/>}>Image</IncoreButtonText>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon/>}>Data</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon/>}>Close</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}

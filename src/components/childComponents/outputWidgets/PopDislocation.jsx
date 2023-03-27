import { Box, Container, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import { fromLonLat, getTransform } from "ol/proj";
import { DislocationResultsTable } from "../table/DislocationResultsTable";
import { HuaResultsTable } from "../table/HuaResultsTable";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { applyTransform } from "ol/extent";
import { downloadOutputFile, getOutputFileContent, getOutputFileContentJSON } from "../../../utils/datawolf";
import { basicLayers, generateLayers } from "../../../utils/map";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

export default function PopDislocation(props) {
	let {
		executionItem,
		previewOn,
		handlePreviewClose,
		datawolfDatasetConfigItems,
		hazardLayers,
		setDownloadDialogOpen
	} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [totalDislTableContent, setTotalDislTableContent] = useState(null);
	const [dislocationByRaceContent, setDislocationByRaceContent] = useState(null);
	const [dislocationByTenureContent, setDislocationByTenureContent] = useState(null);
	const [dislocationByIncomeContent, setDislocationByIncomeContent] = useState(null);
	const [dislocationByHousingTypeContent, setDislocationByHousingTypeContent] = useState(null);
	const [damageLayers1, setDamageLayers1] = useState(null);
	const [damageLayers2, setDamageLayers2] = useState(null);
	const [populationDislocationDownload, setPopulationDislocationDownload] = useState();

	// print container
	const printRef = useRef();

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "bldgMaxDamageStateINCOREId") {
				const bldgMaxDamageStateINCOREId = await getOutputFileContent(
					datawolfConfig,
					executionItem,
					datawolfDatasetConfigItem.datasetId
				);
				const tmpLayerDef = [
					{
						layerId: bldgMaxDamageStateINCOREId,
						layerStyles: mapConfig.LAYER_STYLES.PopDislocation.bldgMaxDamageStateINCOREId,
						title: "Building Damage",
						opacity: 1,
						zIndex: 1
					}
				];
				const previewLayers = generateLayers(globalConfig, tmpLayerDef);
				setDamageLayers1(previewLayers);
			} else if (vName === "popdislHeatmapINCOREId") {
				const popdislHeatmapINCOREId = await getOutputFileContent(
					datawolfConfig,
					executionItem,
					datawolfDatasetConfigItem.datasetId
				);
				const tmpLayerDef = [
					{
						layerId: popdislHeatmapINCOREId,
						layerStyles: mapConfig.LAYER_STYLES.PopDislocation.popdislHeatmapINCOREId,
						title: "Population Dislocation Heatmap",
						opacity: 0.8,
						zIndex: 2
					}
				];
				const previewLayers = generateLayers(globalConfig, tmpLayerDef, "Population Dislocation");
				setDamageLayers2(previewLayers);
			} else if (vName === "totalDislTableContent") {
				setTotalDislTableContent(
					await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
				);
			} else if (vName === "dislocationByRaceContent") {
				setDislocationByRaceContent(
					await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
				);
			} else if (vName === "dislocationByTenureContent") {
				setDislocationByTenureContent(
					await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
				);
			} else if (vName === "dislocationByIncomeContent") {
				setDislocationByIncomeContent(
					await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
				);
			} else if (vName === "dislocationByHousingTypeContent") {
				setDislocationByHousingTypeContent(
					await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
				);
			} else if (vName === "populationDislocationDownload") {
				setPopulationDislocationDownload(executionItem["datasets"][datawolfDatasetConfigItem.datasetId]);
			}
		});
	}, []);

	const download = async () => {
		setDownloadDialogOpen(true);
		if (populationDislocationDownload) {
			await downloadOutputFile(
				datawolfConfig,
				populationDislocationDownload,
				null,
				`population-dislocation-${executionItem.id}.csv`
			);
		}
	};

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal" ref={printRef}>
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{ float: "right" }}>
					<CloseIcon fontSize="small" />
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{selectedExecutionName}</Typography>
					<Typography className="previewTitle">Select Data: Popluation Dislocation</Typography>
				</Box>

				{/*for map*/}
				{basicLayers && hazardLayers && damageLayers1 && damageLayers2 ? (
					<Container className="mapContainer" disableGutters>
						<Map
							className="fillContainer"
							zoom={mapConfig.ZOOM}
							minZoom={mapConfig.MIN_ZOOM}
							maxZoom={mapConfig.MAX_ZOOM}
							extent={applyTransform(mapConfig.MAP_BOUNDS, getTransform("EPSG:4326", "EPSG:3857"))}
							center={fromLonLat(mapConfig.MAP_CENTER)}
							layers={[basicLayers, hazardLayers, damageLayers1, damageLayers2]}
							layerSwitcherOptions={{}}
						/>
					</Container>
				) : (
					<></>
				)}

				{/*for table*/}
				<Box style={{ padding: "50px 25px" }}>
					<Grid container spacing={2} justify="center">
						<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
							{totalDislTableContent && totalDislTableContent["household_dislocation_in_total"] ? (
								<DislocationResultsTable
									resultsJson={totalDislTableContent["household_dislocation_in_total"]}
									headers={["HOUSEHOLD", "% of HOUSEHOLD"]}
									title={"Household Dislocation - in Total"}
								/>
							) : (
								<></>
							)}
							{totalDislTableContent && totalDislTableContent["population_dislocation_in_total"] ? (
								<DislocationResultsTable
									resultsJson={totalDislTableContent["population_dislocation_in_total"]}
									headers={["POPULATION", "% of POPULATION"]}
									title={"Population Dislocation - in Total"}
								/>
							) : (
								<></>
							)}
						</Grid>
						<Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
							{dislocationByIncomeContent &&
							dislocationByRaceContent &&
							dislocationByTenureContent &&
							dislocationByHousingTypeContent ? (
								<HuaResultsTable
									resultsJson={{
										income: dislocationByIncomeContent,
										race: dislocationByRaceContent,
										tenure: dislocationByTenureContent,
										housingType: dislocationByHousingTypeContent
									}}
								/>
							) : (
								<></>
							)}
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<IncoreButtonText
					onClick={() => {
						downloadImg(printRef.current, "Population_Dislocation");
					}}
					startIcon={<CameraAltIcon />}
				>
					Image
				</IncoreButtonText>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon />}>
					Data
				</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon />}>
					Close
				</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}

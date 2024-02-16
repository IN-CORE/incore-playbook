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
import Map from "../map/Map";
import { fromLonLat, getTransform } from "ol/proj";
import React, { useEffect, useRef, useState } from "react";
import { ResultSummaryTable } from "../table/ResultSummaryTable";
import { StackedResult } from "../graph/StackedResult";
import { BuildingClusterTable } from "../table/BuildingClusterTable";
import { useSelector } from "react-redux";
import { applyTransform } from "ol/extent";
import { downloadOutputFile, getOutputFileContent, getOutputFileContentJSON } from "../../../utils/datawolf";
import { basicLayers, generateLayers } from "../../../utils/map";
import { downloadImg } from "../../../utils/image";
import GetAppIcon from "@material-ui/icons/GetApp";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";

export default function BldgDamage(props) {
	let {
		executionItem,
		previewOn,
		handlePreviewClose,
		datawolfDatasetConfigItems,
		hazardType,
		hazardLayers,
		setDownloadDialogOpen
	} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [runtime, setRuntime] = useState(null);
	const [bldgDmgSummaryTableContent, setBldgDmgSummaryTableContent] = useState(null);
	const [bldgDmgDsResultDownload, setBldgDmgDsResultDownload] = useState(null);
	const [damageLayers, setDamageLayers] = useState(null);

	const printRef = useRef();

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		// for summary table on the top
		setRuntime(executionItem["date"].slice(0, 10));

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "bldgMaxDamageStateINCOREId") {
				const bldgMaxDamageStateINCOREId = await getOutputFileContent(
					datawolfConfig,
					executionItem,
					datawolfDatasetConfigItem.datasetId
				);
				const layerDef = [
					{
						layerId: bldgMaxDamageStateINCOREId,
						layerStyles: mapConfig.LAYER_STYLES.BldgDamage,
						title: "Building Damage",
						opacity: 1,
						zIndex: 1
					}
				];
				const previewLayers = generateLayers(globalConfig, layerDef);
				setDamageLayers(previewLayers);
			} else if (vName === "bldgDmgSummaryTableContent") {
				setBldgDmgSummaryTableContent(
					await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId)
				);
			} else if (vName === "bldgDmgDsResultDownload") {
				setBldgDmgDsResultDownload(executionItem["datasets"][datawolfDatasetConfigItem.datasetId]);
			}
		});
	}, []);

	const download = async () => {
		setDownloadDialogOpen(true);
		if (bldgDmgDsResultDownload) {
			await downloadOutputFile(datawolfConfig, bldgDmgDsResultDownload, null, `bldg-dmg-${executionItem.id}.csv`);
		}
	};

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal" ref={printRef}>
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{ float: "right" }}>
					<CloseIcon fontSize="small" />
				</IconButton>

				{/*title*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{selectedExecutionName}</Typography>
					<Typography className="previewTitle">Select Data: Building Damage</Typography>
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
						{/*barchart*/}
						{bldgDmgSummaryTableContent ? (
							<Grid item style={{ minWidth: "804px" }}>
								<Typography className="previewSubTitle">
									Anticipated Performance - Building Clusters
								</Typography>
								<Box style={{ marginTop: "38px" }}>
									<StackedResult categorySummary={bldgDmgSummaryTableContent["by_category"]} />
								</Box>
							</Grid>
						) : (
							<></>
						)}
					</Grid>
					<Divider orientation="horizontal" />
				</Box>

				{/*for map*/}
				{basicLayers && hazardLayers && damageLayers ? (
					<Container className="mapContainer" disableGutters>
						<Map
							className="fillContainer-BldgDamage"
							zoom={mapConfig.ZOOM}
							minZoom={mapConfig.MIN_ZOOM}
							maxZoom={mapConfig.MAX_ZOOM}
							extent={applyTransform(mapConfig.MAP_BOUNDS, getTransform("EPSG:4326", "EPSG:3857"))}
							center={fromLonLat(mapConfig.MAP_CENTER)}
							layers={[basicLayers, hazardLayers, damageLayers]}
							layerSwitcherOptions={{}}
						/>
					</Container>
				) : (
					<></>
				)}

				{/*for table*/}
				{bldgDmgSummaryTableContent ? (
					<Box>
						<BuildingClusterTable fields={bldgDmgSummaryTableContent} />
					</Box>
				) : (
					<></>
				)}
			</DialogContent>
			<DialogActions>
				<IncoreButtonText
					onClick={() => {
						downloadImg(printRef.current, "Building_Damage");
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

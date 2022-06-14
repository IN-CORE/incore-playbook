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
import {ResultSummaryTable} from "../table/ResultSummaryTable";
import {FunctionalityGraph} from "../graph/FunctionalityGraph";
import Map from "../map/Map";
import {fromLonLat, getTransform} from "ol/proj";
import {FunctionalityTable} from "../table/FunctionalityTable";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {applyTransform} from "ol/extent";
import {getOutputFileContent, getOutputFileContentJSON} from "../../../utils/datawolf";
import {basicLayers, generateLayers} from "../../../utils/map";
import {downloadDataset} from "../../../utils/dataset";
import {IncoreButtonText} from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";

export default function BldgMCS(props){

	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, hazardDatasetId} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [runtime, setRuntime] = useState(null);
	const [mcsBldgSummaryTableContent, setMcsBldgSummaryTableContent] = useState(null);
	const [mcsBldgFailureProbINCOREId, setMcsBldgFailureProbINCOREId] = useState(null);

	// Holds an instance of Map component
	const mapRef = React.useRef();
	const layerRef = React.useRef(basicLayers);

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		// for summary table on the top
		setRuntime(executionItem["date"].slice(0, 10));

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "mcsBldgFailureProbINCOREId") {
				const mcsBldgFailureProbINCOREId = await getOutputFileContent(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId);
				setMcsBldgFailureProbINCOREId(mcsBldgFailureProbINCOREId);
				const layerDef = [
					{
						"layerId": mcsBldgFailureProbINCOREId,
						"layerStyles": "incore:joplin-bldg-mcs",
						"title": "Building Functionality Probability without Interdependency",
						"opacity": 1,
						"zIndex": 1
					},
					{
						"layerId": hazardDatasetId,
						"layerStyles": "incore:tornado",
						"title": "Tornado",
						"opacity": 0.3,
						"zIndex": 2
					}
				];
				const previewLayers = generateLayers(globalConfig, layerDef);
				layerRef.current.tilelayer.getLayers().extend(previewLayers);
			}
			else if (vName === "mcsBldgSummaryTableContent") {
				setMcsBldgSummaryTableContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
		});
	}, []);

	const download = async () => {
		if (mcsBldgFailureProbINCOREId) await downloadDataset(globalConfig, mcsBldgFailureProbINCOREId, "bldg-mcs");
	};


	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{selectedExecutionName}</Typography>
					<Typography className="previewTitle">Select Data: Building Functionality without Interdependency</Typography>
				</Box>

				{/*for chart*/}
				<Box className="chartContainer">
					<Grid container spacing={3} justify="center">
						{
							runtime ?
								<Grid item>
									<Typography className="previewSubTitle">
										Analysis Result View</Typography>
									<ResultSummaryTable runtime={runtime}/>
								</Grid>
								:<></>
						}
						<Divider orientation="vertical" flexItem/>
						{
							mcsBldgSummaryTableContent && mcsBldgSummaryTableContent["by_category"] ?
								<Grid item style={{minWidth: "804px"}}>
									<Typography className="previewSubTitle">
										Anticipated Performance - Building Clusters</Typography>
									<Box style={{marginTop: "38px"}}>
										<FunctionalityGraph categorySummary={mcsBldgSummaryTableContent["by_category"]}/>
									</Box>
								</Grid>
								:<></>
						}
					</Grid>
					<Divider orientation="horizontal"/>
				</Box>

				{/*for map*/}
				<Container className="mapContainer" disableGutters>
					<Map
						className="fillContainer"
						zoom={mapConfig.ZOOM}
						minZoom={mapConfig.MIN_ZOOM}
						maxZoom={mapConfig.MAX_ZOOM}
						extent={applyTransform(mapConfig.MAP_BOUNDS, getTransform("EPSG:4326", "EPSG:3857"))}
						center={fromLonLat(mapConfig.MAP_CENTER)}
						layers={[
							layerRef.current.basemaps,
							layerRef.current.tilelayer
						]}
						layerSwitcherOptions={{}}
						updateMap={(map) => {
							mapRef.current = map;
						}}
					/>
				</Container>

				{/*for table*/}
				{
					mcsBldgSummaryTableContent ?
						<Box>
							<FunctionalityTable funcResults={mcsBldgSummaryTableContent}/>
						</Box>
						:<>/</>
				}
			</DialogContent>
			<DialogActions>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon/>}>Download Report</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon/>}>Close</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}

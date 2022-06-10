import {Box, Container, Dialog, DialogContent, Divider, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import {fromLonLat, getTransform} from "ol/proj";
import React, {useEffect, useState} from "react";
import {ResultSummaryTable} from "../table/ResultSummaryTable";
import {StackedResult} from "../graph/StackedResult";
import {ResultTable} from "../table/ResultTable";
import {useSelector} from "react-redux";
import {applyTransform} from "ol/extent";
import {getOutputFileContent, getOutputFileContentJSON} from "../../../utils/datawolf";
import {basicLayers, handleLayerUpdate} from "../../../utils/map";

export default function BldgDamage(props) {

	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, setMap, hazardDatasetId} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [runtime, setRuntime] = useState(null);
	const [layers, setLayers] = useState(basicLayers);
	const [bldgDmgSummaryTableContent, setBldgDmgSummaryTableContent] = useState(null);

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		// for summary table on the top
		setRuntime(executionItem["date"].slice(0, 10));

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "bldgMaxDamageStateINCOREId") {
				const bldgMaxDamageStateINCOREId = await getOutputFileContent(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId);
				const layerDef = [
					{
						"layerId": bldgMaxDamageStateINCOREId,
						"layerStyles": "incore:bldg-dmg-summary",
						"title": "Building Damage",
						"opacity": 1
					},
					{
						"layerId": hazardDatasetId,
						"layerStyles": "incore:tornado",
						"title": "Tornado",
						"opacity": 0.3
					}
				];
				setLayers(handleLayerUpdate(globalConfig, layerDef));
			}
			else if (vName === "bldgDmgSummaryTableContent") {
				setBldgDmgSummaryTableContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
		});
	}, []);

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
					<Typography className="previewTitle">Select Data: Building Damage</Typography>
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
						{/*barchart*/}
						{
							bldgDmgSummaryTableContent ?
								<Grid item style={{minWidth: "804px"}}>
									<Typography className="previewSubTitle">
										Anticipated Performance - Building Clusters</Typography>
									<Box style={{marginTop: "38px"}}>
										<StackedResult categorySummary={bldgDmgSummaryTableContent["by_category"]}/>
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
						layers={Object.values(layers)}
						layerSwitcherOptions={{}}
						updateMap={(map) => { setMap(map); }}
					/>
				</Container>

				{/*for table*/}
				{
					bldgDmgSummaryTableContent ?
						<Box>
							<ResultTable fields={bldgDmgSummaryTableContent}/>
						</Box>
						:<></>
				}
			</DialogContent>
		</Dialog>

	);
}

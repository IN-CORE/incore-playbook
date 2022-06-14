import {Box, Container, Dialog, DialogActions, DialogContent, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import {fromLonLat, getTransform} from "ol/proj";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {applyTransform} from "ol/extent";
import {basicLayers, generateLayers} from "../../../utils/map";
import {getOutputFileContent} from "../../../utils/datawolf";
import {IncoreButtonText} from "../../styledComponents/IncoreButtonText";

export default function Interdependency(props) {

	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");

	// Holds an instance of Map component
	const layerRef = React.useRef(basicLayers);

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "substationMaxDmgStateINCOREId") {
				const substationMaxDmgStateINCOREId = await getOutputFileContent(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId);
				const layerDef = [
					{
						"layerId": "joplin-bldg-subs",
						"layerStyles": null,
						"title": "Interdependency Network",
						"opacity": 0.7,
						"zIndex": 1
					},
					{
						"layerId": substationMaxDmgStateINCOREId,
						"layerStyles": "incore:joplin-substations-label",
						"title": "EPF Substations",
						"opacity": 1,
						"zIndex": 2
					}
				];
				const previewLayers = generateLayers(globalConfig, layerDef);
				layerRef.current.tilelayer.getLayers().extend(previewLayers);
			}
		});
	}, []);


	return (
		<Dialog open={previewOn} onClose={()=>{handlePreviewClose(layerRef);}} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={()=>{handlePreviewClose(layerRef);}} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>
				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{selectedExecutionName}</Typography>
					<Typography className="previewTitle">Select Data: Interdependent Network of Building and Electric Power Facility</Typography>
				</Box>

				{/*map*/}
				<Container className="mapContainerFull" disableGutters>
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
					/>
				</Container>
			</DialogContent>
			<DialogActions>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon/>}>Close</IncoreButtonText>
			</DialogActions>
		</Dialog>);
}

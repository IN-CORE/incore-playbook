import {Box, Container, Dialog, DialogContent, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import {fromLonLat, getTransform} from "ol/proj";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {applyTransform} from "ol/extent";
import {basicLayers, handleLayerUpdate} from "../../../utils/map";
import {getOutputFileContent} from "../../../utils/datawolf";

export default function Interdependency(props) {

	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, setMap} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [layers, setLayers] = useState(basicLayers);

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
						"opacity": 0.7
					},
					{
						"layerId": substationMaxDmgStateINCOREId,
						"layerStyles": "incore:joplin-substations-label",
						"title": "EPF Substations",
						"opacity": 1
					}
				];
				setLayers(handleLayerUpdate(globalConfig, layerDef));
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
						layers={Object.values(layers)}
						layerSwitcherOptions={{}}
						updateMap={(map) => { setMap(map); }}
					/>
				</Container>
			</DialogContent>
		</Dialog>);
}

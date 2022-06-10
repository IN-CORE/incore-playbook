import {Box, Container, Dialog, DialogContent, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import {fromLonLat, getTransform} from "ol/proj";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {applyTransform} from "ol/extent";
import {getOutputFileContent} from "../../../utils/datawolf";
import {basicLayers, handleLayerUpdate} from "../../../utils/map";


export default function PoleDamage(props){

	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, setMap, hazardDatasetId} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [layers, setLayers] = useState(basicLayers);

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "poleMaxDmgStateINCOREId") {
				const epfMaxDmgStateINCOREId = await getOutputFileContent(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId);
				const layerDef = [
					{
						"layerId": epfMaxDmgStateINCOREId,
						"layerStyles": "incore:epf-dmg-summary",
						"title": `EPF Damage (Pole)`,
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
					<Typography className="previewTitle">Select Data: EPF Pole Damage</Typography>
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
		</Dialog>
	);
}

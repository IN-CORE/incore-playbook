import {Box, Container, Dialog, DialogActions, DialogContent, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import {fromLonLat, getTransform} from "ol/proj";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {applyTransform} from "ol/extent";
import {getOutputFileContent} from "../../../utils/datawolf";
import {basicLayers, generateLayers} from "../../../utils/map";
import {IncoreButtonText} from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import {downloadDataset} from "../../../utils/dataset";


export default function SubstationDamage(props){

	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, hazardDatasetId,
		hazardLayerTitle, hazardLayerStyles} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [substationMaxDmgStateINCOREId, setSubstationMaxDmgStateINCOREId] = useState(null);

	// Holds an instance of Map component
	const layerRef = React.useRef(basicLayers);

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "substationMaxDmgStateINCOREId") {
				const substationMaxDmgStateINCOREId = await getOutputFileContent(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId);
				setSubstationMaxDmgStateINCOREId(substationMaxDmgStateINCOREId);
				const layerDef = [
					{
						"layerId": substationMaxDmgStateINCOREId,
						"layerStyles": "incore:epf-dmg-summary",
						"title": "EPF Damage (Substation)",
						"opacity": 1,
						"zIndex": 1
					},
					{
						"layerId": hazardDatasetId,
						"layerStyles": hazardLayerStyles,
						"title": hazardLayerTitle,
						"opacity": 0.8,
						"zIndex": 2
					}
				];
				const previewLayers = generateLayers(globalConfig, layerDef);
				layerRef.current.tilelayer.getLayers().extend(previewLayers);
			}
		});
	}, []);

	const download = async () => {
		if (substationMaxDmgStateINCOREId) await downloadDataset(globalConfig, substationMaxDmgStateINCOREId, "epf-substation");
	};

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
					<Typography className="previewTitle">Select Data: EPF Substation Damage</Typography>
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
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon/>}>Download Report</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon/>}>Close</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}

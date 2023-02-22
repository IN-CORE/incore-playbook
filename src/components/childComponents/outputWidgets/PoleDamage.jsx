import { Box, Container, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import { fromLonLat, getTransform } from "ol/proj";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { applyTransform } from "ol/extent";
import { getOutputFileContent } from "../../../utils/datawolf";
import { basicLayers, generateLayers } from "../../../utils/map";
import { downloadDataset } from "../../../utils/dataset";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Collection } from "ol";


export default function PoleDamage(props){

	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems, hazardLayers} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [poleMaxDmgStateINCOREId, setPoleMaxDmgStateINCOREId] = useState(null);

	// Holds an instance of Map component
	const layerRef = useRef(basicLayers);
	// print container
	const printRef = useRef();

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		if (hazardLayers && layerRef.current.tilelayer.getLayers()) {
			layerRef.current.tilelayer.getLayers().push(hazardLayers);
		}

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "poleMaxDmgStateINCOREId") {
				const poleMaxDmgStateINCOREId = await getOutputFileContent(
					datawolfConfig,
					executionItem,
					datawolfDatasetConfigItem.datasetId
				);
				setPoleMaxDmgStateINCOREId(poleMaxDmgStateINCOREId);
				const layerDef = [
					{
						"layerId": poleMaxDmgStateINCOREId,
						"layerStyles": "incore:epf-dmg-summary",
						"title": "EPF Damage (Pole)",
						"opacity": 1,
						"zIndex": 1
					}
				];
				const previewLayers = generateLayers(globalConfig, layerDef);
				layerRef.current.tilelayer.getLayers().extend(previewLayers);
			}
		});

		// important! remove tile layers; reset map
		return function cleanup() {
			layerRef.current.tilelayer.setLayers(new Collection([]));
		};
	}, []);

	const download = async () => {
		if (poleMaxDmgStateINCOREId) await downloadDataset(globalConfig, poleMaxDmgStateINCOREId, "epf-pole");
	};

	return (
		<Dialog
			open={previewOn}
			onClose={() => {
				handlePreviewClose(layerRef);
			}}
			maxWidth="lg"
			fullWidth
			scroll="paper"
		>
			<DialogContent className="previewModal" ref={printRef}>
				<IconButton
					aria-label="Close"
					onClick={() => {
						handlePreviewClose(layerRef);
					}}
					style={{ float: "right" }}
				>
					<CloseIcon fontSize="small" />
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
						className="fillContainer-PoleDamage"
						zoom={mapConfig.ZOOM}
						minZoom={mapConfig.MIN_ZOOM}
						maxZoom={mapConfig.MAX_ZOOM}
						extent={applyTransform(mapConfig.MAP_BOUNDS, getTransform("EPSG:4326", "EPSG:3857"))}
						center={fromLonLat(mapConfig.MAP_CENTER)}
						layers={[layerRef.current.basemaps, layerRef.current.tilelayer]}
						layerSwitcherOptions={{}}
					/>
				</Container>
			</DialogContent>
			<DialogActions>
				<IncoreButtonText onClick={()=>{downloadImg(printRef.current, "Electric_Pole_Damage");}}
								  startIcon={<CameraAltIcon/>}>Image</IncoreButtonText>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon/>}>Data</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon/>}>Close</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}

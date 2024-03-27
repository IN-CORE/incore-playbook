import {
	Box,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	IconButton,
	Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import { fromLonLat, getTransform } from "ol/proj";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { applyTransform } from "ol/extent";
import {
	downloadOutputFile,
	getOutputFileContent,
} from "../../../utils/datawolf";
import { basicLayers, generateLayers } from "../../../utils/map";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

export default function PoleDamage(props) {
	let {
		executionItem,
		previewOn,
		handlePreviewClose,
		datawolfDatasetConfigItems,
		hazardLayers,
		retrofitLayer,
		setDownloadDialogOpen,
	} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [poleDmgDsResultDownload, setPoleDmgDsResultDownload] = useState();
	const [damageLayers, setDamageLayers] = useState(null);

	// print container
	const printRef = useRef();

	useEffect(() => {
		setSelectedExecutionName(executionItem["title"]);

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "poleMaxDmgStateINCOREId") {
				const poleMaxDmgStateINCOREId = await getOutputFileContent(
					datawolfConfig,
					executionItem,
					datawolfDatasetConfigItem.datasetId,
				);
				const layerDef = [
					{
						layerId: poleMaxDmgStateINCOREId,
						layerStyles: mapConfig.LAYER_STYLES.PoleDamage,
						title: "EPF Damage (Pole)",
						opacity: 1,
						zIndex: 1,
					},
				];
				const previewLayers = generateLayers(globalConfig, layerDef);
				setDamageLayers(previewLayers);
			} else if (vName === "poleDmgDsResultDownload") {
				setPoleDmgDsResultDownload(
					executionItem["datasets"][datawolfDatasetConfigItem.datasetId],
				);
			}
		});
	}, []);

	const download = async () => {
		setDownloadDialogOpen(true);
		if (poleDmgDsResultDownload) {
			await downloadOutputFile(
				datawolfConfig,
				poleDmgDsResultDownload,
				null,
				`epf-pole-${executionItem.id}.csv`,
			);
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
					<Typography className="previewTitle">
						{selectedExecutionName}
					</Typography>
					<Typography className="previewTitle">
						Select Data: EPF Pole Damage
					</Typography>
				</Box>

				{/*for map*/}
				{basicLayers && hazardLayers && retrofitLayer && damageLayers ? (
					<Container className="mapContainer" disableGutters>
						<Map
							className="fillContainer"
							zoom={mapConfig.ZOOM}
							minZoom={mapConfig.MIN_ZOOM}
							maxZoom={mapConfig.MAX_ZOOM}
							extent={applyTransform(
								mapConfig.MAP_BOUNDS,
								getTransform("EPSG:4326", "EPSG:3857"),
							)}
							center={fromLonLat(mapConfig.MAP_CENTER)}
							layers={[basicLayers, hazardLayers, retrofitLayer, damageLayers]}
							layerSwitcherOptions={{}}
							allowBuildingSelection={true}
						/>
					</Container>
				) : (
					<></>
				)}
			</DialogContent>
			<DialogActions>
				<IncoreButtonText
					onClick={() => {
						downloadImg(printRef.current, "Electric_Pole_Damage");
					}}
					startIcon={<CameraAltIcon />}
				>
					Image
				</IncoreButtonText>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon />}>
					Data
				</IncoreButtonText>
				<IncoreButtonText
					onClick={handlePreviewClose}
					startIcon={<CloseIcon />}
				>
					Close
				</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}

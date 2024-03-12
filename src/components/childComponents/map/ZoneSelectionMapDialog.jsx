import { useSelector } from "react-redux";
import * as React from "react";
import { useEffect, useState } from "react";
import { basicLayers } from "../../../utils/map";
import { applyTransform } from "ol/extent";
import { fromLonLat, getTransform } from "ol/proj";
import { ZoneSelectionMap } from "./ZoneSelectionMap";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Fill, Stroke, Style } from "ol/style";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from "@material-ui/core";
import { IncoreButton } from "../../styledComponents/IncoreButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

export const ZoneSelectionMapDialog = (props) => {
	const { open, handleClose, handleSave, zoneNames, setZoneNames } = props;
	const mapConfig = useSelector((state) => state.config.mapConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const classes = useStyles();

	// TODO: These should be moved outside of this component to the parent; and passdown as props
	const [zoneLayer, setZoneLayer] = useState(null);
	const [selectedZoneName, setSelectedZoneName] = useState("");

	useEffect(() => {
		// Construct the WFS request URL
		const wfsUrl = `${globalConfig.geoServerWFS}&typeName=${globalConfig.retrofitStrategyBuilder["zoneLayerId"]}`;

		const zoneLayer = new VectorLayer({
			title: "Zone",
			source: new VectorSource({
				format: new GeoJSON(),
				url: wfsUrl,
			}),
			style: new Style({
				fill: new Fill({
					color: "rgba(238, 238, 238, 0)",
				}),
				stroke: new Stroke({
					color: "#777777",
					width: 1,
				}),
			}),
		});
		setZoneLayer(zoneLayer);
	}, []);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="lg"
			fullWidth
			scroll="paper"
		>
			<DialogTitle id="Zone Selection Dialog">
				<Typography variant="h5">Zone Selection</Typography>
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent className="previewModal">
				{basicLayers && zoneLayer ? (
					<ZoneSelectionMap
						className="fillContainer-ZoneSelectionMap"
						zoom={mapConfig.ZOOM}
						minZoom={mapConfig.MIN_ZOOM}
						maxZoom={mapConfig.MAX_ZOOM}
						extent={applyTransform(
							mapConfig.MAP_BOUNDS,
							getTransform("EPSG:4326", "EPSG:3857"),
						)}
						center={fromLonLat(mapConfig.MAP_CENTER)}
						layers={[basicLayers, zoneLayer]}
						layerSwitcherOptions={{}}
						activeLayerNames={
							globalConfig.retrofitStrategyBuilder["activeLayerNames"]
						}
						selectedZoneName={selectedZoneName}
						setSelectedZoneName={setSelectedZoneName}
						zoneNames={zoneNames}
						setZoneNames={setZoneNames}
					/>
				) : (
					<div>Loading...</div>
				)}
			</DialogContent>
			<DialogActions>
				<IncoreButton
					onClick={() => {
						handleSave(selectedZoneName);
					}}
					color="primary"
					style={{ width: "auto" }}
				>
					Save
				</IncoreButton>
			</DialogActions>
		</Dialog>
	);
};

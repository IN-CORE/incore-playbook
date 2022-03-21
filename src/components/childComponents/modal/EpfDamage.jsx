import {Box, Container, Dialog, DialogContent, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import  globals from "../../../globals";
import {fromLonLat} from "ol/proj";
import React from "react";


export default function EpfDamage(props){

	let {executionName, title, previewOn, handlePreviewClose, layers, setMap} = props;

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{executionName}</Typography>
					<Typography className="previewTitle">Select Data: {title}</Typography>
				</Box>

				{/*map*/}
				<Container className="mapContainerFull" disableGutters>
					<Map
						className="fillContainer"
						zoom={12}
						minZoom={5}
						maxZoom={15}
						extent={globals.JOPLIN_MAP_BOUNDS}
						center={fromLonLat(globals.JOPLIN_MAP_CENTER)}
						layers={Object.values(layers)}
						layerSwitcherOptions={{}}
						updateMap={(map) => { setMap(map); }}
					/>
				</Container>
			</DialogContent>
		</Dialog>
	);
}

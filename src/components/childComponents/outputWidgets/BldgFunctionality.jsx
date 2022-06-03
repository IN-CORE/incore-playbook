import {Box, Container, Dialog, DialogContent, Divider, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ResultSummaryTable} from "../table/ResultSummaryTable";
import {FunctionalityGraph} from "../graph/FunctionalityGraph";
import Map from "../map/Map";
import {fromLonLat, getTransform} from "ol/proj";
import {FunctionalityTable} from "../table/FunctionalityTable";
import React from "react";
import {useSelector} from "react-redux";
import {applyTransform} from "ol/extent";

export default function BldgFunctionality(props){

	let {executionName, title, previewOn, handlePreviewClose, runtime, barCharts, layers, tables, map, setMap} = props;
	const mapConfig = useSelector((state) => state.config.mapConfig);

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

				{/*for chart*/}
				<Box className="chartContainer">
					<Grid container spacing={3} justify="center">
						<Grid item>
							<Typography className="previewSubTitle">
									Analysis Result View</Typography>
							<ResultSummaryTable runtime={runtime}/>
						</Grid>
						<Divider orientation="vertical" flexItem/>

						<Grid item style={{minWidth: "804px"}}>
							<Typography className="previewSubTitle">
									Anticipated Performance - Building Clusters</Typography>
							<Box style={{marginTop: "38px"}}>
								<FunctionalityGraph categorySummary={barCharts}/>
							</Box>
						</Grid>
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
				<Box>
					<FunctionalityTable funcResults={tables}/>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

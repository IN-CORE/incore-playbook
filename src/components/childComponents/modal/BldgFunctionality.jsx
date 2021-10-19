import {Box, Container, Dialog, DialogContent, Divider, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ResultSummaryTable} from "../table/ResultSummaryTable";
import {FunctionalityGraph} from "../graph/FunctionalityGraph";
import Map from "../map/Map";
import {globals} from "../../../globals";
import {fromLonLat} from "ol/proj";
import {FunctionalityTable} from "../table/FunctionalityTable";
import React from "react";

export default function BldgFunctionality(props){

	let {title, previewOn, handlePreviewClose, runtime, barCharts, layers, tables, map, setMap} = props;

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>
				{/*title*/}
				<Typography className="previewTitle">{title}</Typography>

				{/*for chart*/}
				<Box className="chartContainer">
					<Grid container spacing={3} justify="left">
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

				{/*for table*/}
				<Box>
					<FunctionalityTable funcResults={tables}/>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

import {Box, Container, Dialog, DialogContent, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import {fromLonLat} from "ol/proj";
import {DislocationResultsTable} from "../table/DislocationResultsTable";
import {HuaResultsTable} from "../table/HuaResultsTable";
import React from "react";

export default function PopDislocation(props){
	let {executionName, title, previewOn, handlePreviewClose, layers, tables, setMap} = props;

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

				{/*for map*/}
				<Container className="mapContainer" isableGutters>
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
				<Box style={{padding:"50px 25px"}}>
					<Grid container spacing={2} justify="center">
						<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
							<DislocationResultsTable resultsJson={tables["totalResultsTable"]["household_dislocation_in_total"]}
													 headers={["HOUSEHOLD", "% of HOUSEHOLD"]}
													 title={"Household Dislocation - in Total"}/>
							<DislocationResultsTable resultsJson={tables["totalResultsTable"]["population_dislocation_in_total"]}
													 headers={["POPULATION", "% of POPULATION"]}
													 title={"Population Dislocation - in Total"}/>
						</Grid>
						<Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
							<HuaResultsTable resultsJson={tables["huaResultsTable"]} />
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

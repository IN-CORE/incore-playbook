import {Box, Container, Dialog, DialogContent, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../map/Map";
import {globals} from "../../../globals";
import {fromLonLat} from "ol/proj";
import {DislocationResultsTable} from "../table/DislocationResultsTable";
import {HuaResultsTable} from "../table/HuaResultsTable";
import React from "react";

export default function PopDislocation(props){
	let {title, previewOn, handlePreviewClose, layers, tables, setMap} = props;

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>

				{/*title*/}
				<Typography className="previewTitle">{title}</Typography>

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
					<Grid container spacing={2} justify="left">
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<DislocationResultsTable resultsJson={tables["totalResultsTable"]["housing_unit_dislocation"]}
													 headers={["UNITS", "% of UNITS"]}
													 title={"Housing Unit Dislocation - in Total"}/>
							<DislocationResultsTable resultsJson={tables["totalResultsTable"]["population_dislocation"]}
													 headers={["POPULATION", "% of POPULATION"]}
													 title={"Population Dislocation - in Total"}/>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<HuaResultsTable resultsJson={tables["huaResultsTable"]} />
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

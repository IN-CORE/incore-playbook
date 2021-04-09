import * as React from "react";
import {Box, Container, Grid, IconButton, Tab, Tabs, withStyles} from "@material-ui/core";
import GroupLayer from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM, {ATTRIBUTION as OSM_ATTRIBUTION} from "ol/source/OSM";
import Draw from "ol/interaction/Draw";
import LineString from "ol/geom/LineString";
import {Circle, Fill, Stroke, Style} from "ol/style";
import {fromLonLat} from "ol/proj";
import Feature from "ol/Feature";

import RasterTornado from "./RasterTornado";
import ModelTornado from "./ModelTornado";
import Map from "./Map";
import config from "../app.config";
import {globals} from "../globals";
import Layout from "../containers/Layout";
import {IncoreInputLabel} from "./styledComponents/IncoreInputLabel";
import {IncoreMenuItem, IncoreSelectBox} from "./styledComponents/IncoreSelect";

import FilterListIcon from "@material-ui/icons/FilterList";

import {EntryTable} from "./EntryTable";
import PageBanner from "./Banner";
import fullHtml from "../public/steps/3-3.html";
import StepInfo from "./StepInfo";

const styles = {
	tabDiv: {
		margin: "48px 0 0 0",
		width: "100%",
	},
	tabs: {
		height: "21px",
		width: "100%"
	},
	tab: {
		height: "17px",
		color: "#69707F",
		fontSize: "14px",
		fontWeight: 500,
		letterSpacing: 0,
		lineHeight: "17px",
		textTransform: "None"
	},
	mapContainer: {
		height: "700px",
	}
};

class CommunityHazards extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currTabIndex: 0,
			startCoord: [],
			endCoord: [],
		};

		this.handleLayerUpdate = this.handleLayerUpdate.bind(this);
		this.drawLine = this.drawLine.bind(this);
		this.handleMapClick = this.handleMapClick.bind(this);
		this.hazardIdClick = this.hazardIdClick.bind(this);

		this.drawSource = new VectorSource({wrapX: false});
		this.lineSource = new VectorSource({wrapX: false});

		this.lineStyle = new Style({
			stroke: new Stroke({
				color: "#979797",
				width: 3,
				lineDash: [.1, 5] //or other combinations
			})
		});

		this.startStyle = new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: "#96B712"
				})
			})
		});

		this.endStyle = new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: "#D63649"
				})
			})
		});


		this.layers = {
			basemaps: new GroupLayer({
				title: "Base Maps",
				layers: [
					new TileLayer({
						type: "base",
						visible: true,
						title: "Carto",
						source: new XYZ({
							url: "https://{a-d}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
							attributions: [
								"&#169; <a href=\"https://www.carto.com\">Carto</a>,",
								OSM_ATTRIBUTION
							]
						})
					}),
					new TileLayer({
						type: "base",
						visible: false,
						title: "OSM",
						source: new OSM()
					})
				]
			}),
			drawlayer: new GroupLayer({
				title: "Draw Layer",
				layers: [
					new VectorLayer({source: this.drawSource}),
					new VectorLayer({source: this.lineSource, style: [this.lineStyle]})
				]
			}),
			tilelayer: new GroupLayer({
				title: "Hazards",
				layers: []
			})
		};

		this.fieldNames = [
			{
				"prettyName": "NAME",
				"columnName": "name",
				"handleClick": this.hazardIdClick
			},
			{
				"prettyName": "DESCRIPTION",
				"columnName": "description"
			},
			{
				"prettyName": "DATE ADDED",
				"columnName": "date",
			},
			{
				"prettyName": "SUBMITTED BY",
				"columnName": "creator",
			}
		];
	}

	componentDidMount() {
		this.props.listTornadoes();
	}

	map;

	async hazardIdClick(hazard) {
		this.handleLayerUpdate(hazard);
	}

	drawLine() {
		let lineString = new LineString([this.state.startCoord, this.state.endCoord]);
		let lineFeature = new Feature({
			geometry: lineString,
			name: "Line"
		});
		this.lineSource.addFeature(lineFeature);
	}

	handleLayerUpdate(json) {

		let layerId = json["datasetId"];
		let layerTitle = json["name"];

		const source = new TileWMS({
			url: `${config.geoServerWMS}`,
			params: {LAYERS: layerId, STYLES: "incore:tornado"},
			ratio: 1,
			serverType: "geoserver"
		});
		let HazardMapLayer = new TileLayer({
			title: layerTitle,
			source: source,
			zIndex: 1,
			opacity: 1
		});

		// add created hazard to this created group layer
		this.layers["tilelayer"].getLayers().push(HazardMapLayer);
	}

	handleMapClick(event) {
		// Important: need to clear previous draw interaction first
		let map = event.map;
		map.getInteractions().forEach((interaction) => {
			if (interaction instanceof Draw) {
				map.removeInteraction(interaction);
			}
		});

		let drawPointInteraction = new Draw({
			source: this.drawSource,
			type: "Point",
		});
		drawPointInteraction.on("drawend", (event) => {
			let coords = event.feature.getGeometry().getFlatCoordinates();

			if (this.state.startCoord.length === 0 && this.state.endCoord.length === 0) {
				// draw start
				event.feature.setStyle(this.startStyle);
				this.setState({startCoord: coords});
			} else if (this.state.startCoord.length > 0 && this.state.endCoord.length === 0) {
				// draw endpoint
				event.feature.setStyle(this.endStyle);
				this.setState({endCoord: coords}, this.drawLine);
			} else if (this.state.startCoord.length > 0 && this.state.endCoord.length > 0) {
				// restart
				this.drawSource.clear();
				this.lineSource.clear();
				event.feature.setStyle(this.startStyle);
				this.setState({startCoord: coords, endCoord: []});
			}
		});

		map.addInteraction(drawPointInteraction);
	}

	render() {
		const {classes} = this.props;

		return (
			<Layout>
				<div className="firstDivInContent">
					<PageBanner parentStep="Determine Goals & Objectives"
						childStep="Define Community Hazards" taskNo="3" subtaskNo="3-3"/>
					<Box className="outerBox">
						{/*List created tornadoes*/}
						<Box className="entryTableContainer">
							<StepInfo fullHtml={fullHtml} />
							<br />
							<Box className="entryTableTitle">
								<IncoreInputLabel>Created Hazard</IncoreInputLabel>
								{/*<Box style={{float:"right"}}>*/}
								{/*	<IconButton>*/}
								{/*		<FilterListIcon/>*/}
								{/*	</IconButton>*/}
								{/*</Box>*/}
							</Box>
							<Box className="entryTable">
								<EntryTable fieldNames={this.fieldNames} fields={this.props.tornadoes}/>
							</Box>
						</Box>
						<Grid container spacing={3} className="innerBox">
							<Grid item xl={5} lg={5} md={5} sm={5} xs={12} className="gridItem">
								{/*Select*/}
								<Box>
									<IncoreInputLabel>Select Hazard Type</IncoreInputLabel>
									<IncoreSelectBox labelId="label" id="select" variant="outlined"
													 defaultValue="tornado">
										<IncoreMenuItem value="earthquake" key="earthquake">Earthquake</IncoreMenuItem>
										<IncoreMenuItem value="tsunami" key="tsunami">Tsunami</IncoreMenuItem>
										<IncoreMenuItem value="tornado" key="tornado">Tornado</IncoreMenuItem>
										<IncoreMenuItem value="hurricane" key="hurricane">Hurricane</IncoreMenuItem>
										<IncoreMenuItem value="flood" key="flood">Flood</IncoreMenuItem>
									</IncoreSelectBox>
								</Box>
								{/*Tabs*/}
								<Box className={classes.tabDiv}>
									<Tabs aria-label="create tornado tabs" value={this.state.currTabIndex}
										  className={classes.tabs}
										  onChange={(e, value) => {this.setState({currTabIndex: value});}}>
										<Tab label="Create a Hazard" className={classes.tab}/>
										<Tab label="Upload a Hazard Dataset" className={classes.tab}/>
									</Tabs>
									<ModelTornado value={this.state.currTabIndex} index={0}
												  handleLayerUpdate={this.handleLayerUpdate}
												  handleListUpdate={this.props.listTornadoes}
												  startCoordProps={this.state.startCoord}
												  endCoordProps={this.state.endCoord}/>
									<RasterTornado value={this.state.currTabIndex} index={1}
												   handleLayerUpdate={this.handleLayerUpdate}
												   handleListUpdate={this.props.listTornadoes}/>
								</Box>
							</Grid>
							<Grid item xl={7} lg={7} md={7} sm={7} xs={12} className="gridItem">
								<Container className={classes.mapContainer} disableGutters>
									<Map
										className="fillContainer"
										zoom={10}
										minZoom={5}
										maxZoom={15}
										extent={globals.JOPLIN_MAP_BOUNDS}
										center={fromLonLat(globals.JOPLIN_MAP_CENTER)}
										layers={Object.values(this.layers)}
										layerSwitcherOptions={{}}
										updateMap={(map) => { this.map = map; }}
										events={{
											"click": this.handleMapClick
										}}
									/>
								</Container>
							</Grid>
						</Grid>
					</Box>
				</div>
			</Layout>
		);
	}
}

export default withStyles(styles)(CommunityHazards);

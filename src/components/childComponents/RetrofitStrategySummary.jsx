import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
	Box,
	Container,
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@material-ui/core";

import StopRoundedIcon from "@material-ui/icons/StopRounded";
import { makeStyles } from "@material-ui/core/styles";
import { fromLonLat, getTransform } from "ol/proj";
import { applyTransform } from "ol/extent";

import { basicLayers, generateLayers } from "../../utils/map";
import Map from "./map/Map";
import { IncoreFootNote } from "../styledComponents/IncoreFootNote";

const useStyles = makeStyles(() => ({
	table: {
		minWidth: 650,
	},
	tableHeaderCellNo: {
		width: "8%",
	},
	tableHeaderCellConditions: {
		borderRight: "1px solid #0000001F",
		borderLeft: "1px solid #0000001F",
	},
	tableHeaderCellRetrofit: {
		borderRight: "1px solid #0000001F",
		borderLeft: "1px solid #0000001F",
		width: "20%",
		maxWidth: "20%",
	},
	tableHeaderCellRetrofitCosts: {
		borderRight: "1px solid #0000001F",
		borderLeft: "1px solid #0000001F",
		width: "15%",
	},
	tableHeaderCellRetrofitBldgs: {
		width: "15%",
	},
	tableHeaderRow: {
		fontSize: "15px",
		letterSpacing: "0.17px",
		backgroundColor: "#EDF1F4",
		color: "#000000DE",
	},
	tableSavedCell: {
		padding: 0,
		border: "1px solid #E0E0E0",
		backgroundColor: "#FBFBFB",
	},
	tableUnSavedCell: {
		border: "1px solid #E0E0E0",
	},
	tableSavedText: {
		fontSize: "15px",
		letterSpacing: "0.15px",
		color: "#0000008A",
	},
	tableSavedValue: {
		fontSize: "15px",
		letterSpacing: "0.15px",
		color: "#000000DE",
	},
	mapHeaderText: {
		fontSize: "16px",
		fontWeight: 500,
		letterSpacing: "0.1px",
		color: "#000000DE",
		marginTop: "20px",
	},
	summaryTableCellLeft: {
		borderRight: "1px solid #0000001F",
	},
	summaryTableCellRight: {
		borderLeft: "1px solid #0000001F",
	},
	summaryTableSavedText: {
		textAlign: "right",
		fontSize: "16px",
		fontWeight: 500,
		letterSpacing: "0.15px",
		color: "#000000DE",
		wordBreak: "break-all",
	},
}));

export default function RetrofitStrategySummary(props) {
	const mapConfig = useSelector((state) => state.config.mapConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const [retrofitLayer, setRetrofitLayer] = useState(null);
	const [zoneLayer, setZoneLayer] = useState(null);

	const classes = useStyles();

	const getDollarString = (val) => {
		const formattedNum = parseFloat(val).toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

		return `$ ${formattedNum}`;
	};

	const {
		name,
		description,
		retrofitDetails,
		rules,
		retrofits,
		rsLayerId,
		summary,
	} = props;

	const getLabel = (value, possibleOptions) => {
		const option = possibleOptions.find((option) => option.value === value);
		return option ? option.label : value;
	};

	const getRetrofitOptionLabel = (ret_key, ret_val, possibleOptions) => {
		const option = possibleOptions.find(
			(option) =>
				option.value.ret_key === ret_key && option.value.ret_val === ret_val,
		);
		return option ? option.label : `${ret_key} ${ret_val}`;
	};

	// TODO replace with real interaction
	useEffect(() => {
		const layerDef = [
			{
				layerId: rsLayerId,
				layerStyles: mapConfig.LAYER_STYLES.RetrofitStrategy,
				title: "Retrofit Strategy Details",
				opacity: 1,
				zIndex: 2,
			},
		];
		const retrofitLayer = generateLayers(
			globalConfig,
			layerDef,
			"Retrofit Strategy",
		);
		setRetrofitLayer(retrofitLayer);

		if ("zoneLayerId" in globalConfig.retrofitStrategyBuilder) {
			const zoneLayerDef = [
				{
					layerId: globalConfig.retrofitStrategyBuilder.zoneLayerId,
					title: "Zone",
					opacity: 0.3,
					zIndex: 1,
				},
			];
			const zoneLayer = generateLayers(globalConfig, zoneLayerDef, "Zone");
			setZoneLayer(zoneLayer);
		}
	}, []);

	return (
		<Grid
			container
			alignItems="flex-start"
			spacing={3}
			style={summary ? null : { marginLeft: "25px", marginRight: "25px" }}
		>
			<Grid gutterTop item xs={12}>
				<Typography variant="h6" className={classes.mapHeaderText}>
					Summary
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<Box display="flex" flexDirection="column" width="100%">
					<Box display="flex" mb={2}>
						{" "}
						{/* Margin bottom for spacing */}
						<Box flex={1}>
							<Typography variant="h6" className={classes.tableSavedText}>
								Name
							</Typography>
						</Box>
						<Box flex={2}>
							<Typography
								variant="body1"
								className={classes.summaryTableSavedText}
							>
								{name}
							</Typography>
						</Box>
					</Box>
					<Box display="flex" mb={2}>
						{" "}
						{/* Repeat for Description */}
						<Box flex={1}>
							<Typography variant="h6" className={classes.tableSavedText}>
								Description
							</Typography>
						</Box>
						<Box flex={2}>
							<Typography
								variant="body1"
								className={classes.summaryTableSavedText}
							>
								{description}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6} style={{ borderLeft: "1px solid #0000001F" }}>
				<Grid container alignItems="center" spacing={3}>
					<Grid item xs={4}>
						<Typography variant="h6" className={classes.tableSavedText}>
							Total of Retrofit Costs
						</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography
							variant="body1"
							className={classes.summaryTableSavedText}
						>
							{retrofitDetails.total && "cost" in retrofitDetails.total
								? getDollarString(retrofitDetails.total.cost)
								: "N/A"}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant="h6" className={classes.tableSavedText}>
							Number of Zones
						</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography
							variant="body1"
							className={classes.summaryTableSavedText}
						>
							{retrofitDetails.by_rule
								? Object.keys(retrofitDetails.by_rule).length
								: "N/A"}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant="h6" className={classes.tableSavedText}>
							Number of Retrofitted Buildings
						</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography
							variant="body1"
							className={classes.summaryTableSavedText}
						>
							{retrofitDetails.total && "num_bldg" in retrofitDetails.total
								? retrofitDetails.total.num_bldg
								: "N/A"}
						</Typography>
						<IncoreFootNote style={{ color: "red", textAlign: "right" }}>
							{retrofitDetails.total &&
							"num_bldg_no_cost" in retrofitDetails.total
								? retrofitDetails.total.num_bldg_no_cost > 0
									? `(${retrofitDetails.total.num_bldg_no_cost} buildings with no cost)`
									: null
								: "N/A"}
						</IncoreFootNote>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h6" className={classes.mapHeaderText}>
					Retrofit Buildings Distribution Map
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{/*for map*/}
				{basicLayers && retrofitLayer ? (
					<Container className="mapContainer" disableGutters>
						<Map
							className="fillContainer-retrofitStrategy"
							zoom={mapConfig.ZOOM}
							minZoom={mapConfig.MIN_ZOOM}
							maxZoom={mapConfig.MAX_ZOOM}
							extent={applyTransform(
								"zoneMapBounds" in globalConfig.retrofitStrategyBuilder
									? globalConfig.retrofitStrategyBuilder.zoneMapBounds
									: mapConfig.MAP_BOUNDS,
								getTransform("EPSG:4326", "EPSG:3857"),
							)}
							center={fromLonLat(mapConfig.MAP_CENTER)}
							layers={
								zoneLayer
									? [basicLayers, zoneLayer, retrofitLayer]
									: [basicLayers, retrofitLayer]
							}
							layerSwitcherOptions={{}}
							allowBuildingSelection={true}
							activeLayerNames="Retrofit Strategy"
						/>
					</Container>
				) : (
					<></>
				)}
			</Grid>
			<Grid item xs={12}>
				<TableContainer>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow className={classes.tableHeaderRow}>
								<TableCell className={classes.tableHeaderCellNo} align="center">
									No.
								</TableCell>
								<TableCell className={classes.tableHeaderCellConditions}>
									Conditions
								</TableCell>
								<TableCell className={classes.tableHeaderCellRetrofit}>
									Methods
								</TableCell>
								<TableCell className={classes.tableHeaderCellRetrofitCosts}>
									Costs
								</TableCell>
								<TableCell className={classes.tableHeaderCellRetrofitBldgs}>
									No. of Buildings
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{retrofitDetails.by_rule
								? Object.keys(retrofitDetails.by_rule).map((key) => {
										return (
											<TableRow key={key}>
												<TableCell
													component="th"
													align="center"
													scope="row"
													className={classes.tableSavedCell}
												>
													<Box
														display="flex"
														flexDirection="row"
														alignItems="center"
														justifyContent="center"
													>
														<StopRoundedIcon
															fontSize="large"
															style={{
																color:
																	globalConfig.retrofitStrategyBuilder
																		.colorCodes[key],
															}}
														/>
														{parseInt(key) + 1}
													</Box>
												</TableCell>
												<TableCell className={classes.tableSavedCell}>
													<TableContainer>
														<Table>
															<TableBody>
																{globalConfig.retrofitStrategyBuilder.conditions.map(
																	(condition) => {
																		return (
																			<TableRow key={key}>
																				<TableCell>
																					<Typography
																						variant="body1"
																						className={classes.tableSavedText}
																					>
																						{condition.label}
																					</Typography>
																				</TableCell>
																				<TableCell align="right">
																					<Typography
																						variant="body1"
																						className={classes.tableSavedValue}
																					>
																						{condition.type === "number"
																							? `${rules[condition.key][key]} %`
																							: condition.type === "select"
																							  ? getLabel(
																										rules[condition.key][key],
																										condition.possibleOptions,
																							    )
																							  : rules[condition.key][key]}
																					</Typography>
																				</TableCell>
																			</TableRow>
																		);
																	},
																)}
															</TableBody>
														</Table>
													</TableContainer>
												</TableCell>
												<TableCell
													align="center"
													className={classes.tableSavedCell}
													style={{ padding: "16px" }}
												>
													{globalConfig.retrofitStrategyBuilder.retrofitMethods.map(
														(method, idx) => {
															return (
																<>
																	<Typography variant="body1">
																		{getRetrofitOptionLabel(
																			retrofits.ret_keys[key],
																			retrofits.ret_vals[key],
																			method.possibleOptions,
																		)}
																	</Typography>
																	{idx ===
																	globalConfig.retrofitStrategyBuilder
																		.retrofitMethods.length -
																		1 ? null : (
																		<Divider />
																	)}
																</>
															);
														},
													)}
												</TableCell>
												<TableCell
													align="center"
													className={classes.tableSavedCell}
													style={{ padding: "16px" }}
												>
													<Typography
														variant="body1"
														className={classes.tableSavedValue}
													>
														{retrofitDetails.by_rule &&
														`${key}` in retrofitDetails.by_rule &&
														"cost" in retrofitDetails.by_rule[`${key}`]
															? getDollarString(
																	retrofitDetails.by_rule[`${key}`].cost,
															  )
															: "N/A"}
													</Typography>
												</TableCell>
												<TableCell
													align="center"
													className={classes.tableSavedCell}
													style={{ padding: "16px" }}
												>
													<Typography
														variant="body1"
														className={classes.tableSavedValue}
													>
														{retrofitDetails.by_rule &&
														`${key}` in retrofitDetails.by_rule &&
														"num_bldg" in retrofitDetails.by_rule[`${key}`]
															? retrofitDetails.by_rule[`${key}`].num_bldg
															: "N/A"}
													</Typography>
													<IncoreFootNote style={{ color: "red" }}>
														{retrofitDetails.by_rule &&
														`${key}` in retrofitDetails.by_rule &&
														"num_bldg_no_cost" in
															retrofitDetails.by_rule[`${key}`]
															? retrofitDetails.by_rule[`${key}`]
																	.num_bldg_no_cost > 0
																? `(${
																		retrofitDetails.by_rule[`${key}`]
																			.num_bldg_no_cost
																  } buildings with no cost)`
																: null
															: "N/A"}
													</IncoreFootNote>
												</TableCell>
											</TableRow>
										);
								  })
								: null}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
}

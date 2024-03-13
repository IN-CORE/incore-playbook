import React from "react";
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

import { basicLayers } from "../../utils/map";
import Map from "./map/Map";

const useStyles = makeStyles((theme) => ({
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
		font: "Roboto",
		fontSize: "14px",
		fontWeight: 400,
		lineHeight: "24px",
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
		font: "Roboto",
		fontSize: "14px",
		fontWeight: 400,
		lineHeight: "16.41px",
		letterSpacing: "0.15px",
		color: "#0000008A",
	},
	tableSavedValue: {
		font: "Roboto",
		fontSize: "14px",
		fontWeight: 400,
		lineHeight: "16.41px",
		letterSpacing: "0.15px",
		color: "#000000DE",
	},
	mapHeaderText: {
		font: "Roboto",
		fontSize: "20px",
		fontWeight: 600,
		lineHeight: "25.12px",
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
		font: "Roboto",
		fontSize: "16px",
		fontWeight: 600,
		lineHeight: "25.6px",
		letterSpacing: "0.15px",
		color: "#000000DE",
	},
}));

export default function RetrofitStrategySummary(props) {
	const mapConfig = useSelector((state) => state.config.mapConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const classes = useStyles();

	const getDollarString = (val) => {
		const formattedNum = parseFloat(val).toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

		return `$ ${formattedNum}`;
	};

	const {
		addedStrategies,
		retrofitSummary,
		colorCodes,
		conditionKeys,
		retrofitMethodKeys,
		name,
		description,
	} = props;

	return (
		<Grid
			container
			alignItems="center"
			spacing={3}
			style={{ marginLeft: "25px", marginRight: "25px" }}
		>
			<Grid gutterTop item xs={12}>
				<Typography variant="h6" className={classes.mapHeaderText}>
					Summary
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<Grid container alignItems="center" spacing={3}>
					<Grid item xs={4}>
						<Typography variant="h6" className={classes.tableSavedText}>
							Name
						</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography
							variant="body1"
							className={classes.summaryTableSavedText}
						>
							{name}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant="h6" className={classes.tableSavedText}>
							description
						</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography
							variant="body1"
							className={classes.summaryTableSavedText}
						>
							{description}
						</Typography>
					</Grid>
				</Grid>
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
							{getDollarString(retrofitSummary.total.cost)}
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
							{addedStrategies.length}
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
							{retrofitSummary.total.num_bldg}
						</Typography>
						<Typography
							variant="body1"
							className={classes.summaryTableSavedText}
						>
							{retrofitSummary.total.num_bldg_no_cost > 0
								? `(${retrofitSummary.total.num_bldg_no_cost} buildings with no cost)`
								: null}
						</Typography>
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
				{basicLayers ? (
					<Container className="mapContainer" disableGutters>
						<Map
							className="fillContainer-BldgDamage"
							zoom={mapConfig.ZOOM}
							minZoom={mapConfig.MIN_ZOOM}
							maxZoom={mapConfig.MAX_ZOOM}
							extent={applyTransform(
								mapConfig.MAP_BOUNDS,
								getTransform("EPSG:4326", "EPSG:3857"),
							)}
							center={fromLonLat(mapConfig.MAP_CENTER)}
							layers={[basicLayers]}
							layerSwitcherOptions={{}}
							allowBuildingSelection={false}
						/>
					</Container>
				) : (
					<></>
				)}
			</Grid>
			{addedStrategies.length > 0 ? (
				<Grid item xs={12}>
					<TableContainer>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow className={classes.tableHeaderRow}>
									<TableCell className={classes.tableHeaderCellNo}>
										No.
									</TableCell>
									<TableCell className={classes.tableHeaderCellConditions}>
										Conditions
									</TableCell>
									<TableCell className={classes.tableHeaderCellRetrofit}>
										Retrofit Methods
									</TableCell>
									<TableCell className={classes.tableHeaderCellRetrofitCosts}>
										Retrofit Costs
									</TableCell>
									<TableCell className={classes.tableHeaderCellRetrofitBldgs}>
										No. of Retrofitted Buildings
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{addedStrategies.map((strategy, index) => {
									return (
										<TableRow key={index}>
											<TableCell
												component="th"
												align="center"
												scope="row"
												className={classes.tableSavedCell}
											>
												<Grid
													container
													alignItems="center"
													justifyContent="center"
													spacing={0}
												>
													<StopRoundedIcon
														fontSize="large"
														style={{ color: colorCodes[index] }}
													/>
													{index + 1}
												</Grid>
											</TableCell>
											<TableCell className={classes.tableSavedCell}>
												<TableContainer>
													<Table>
														<TableBody>
															{conditionKeys.map((key) => (
																<TableRow key={key}>
																	<TableCell>
																		<Typography
																			variant="body1"
																			className={classes.tableSavedText}
																		>
																			{strategy[key].label}
																		</Typography>
																	</TableCell>
																	<TableCell align="right">
																		<Typography
																			variant="body1"
																			className={classes.tableSavedValue}
																		>
																			{strategy[key].type === "number"
																				? strategy[key].value + " %"
																				: globalConfig.retrofitStrategyBuilder
																							.displayValues[
																							strategy[key].value
																				    ] === undefined
																				  ? strategy[key].value
																				  : globalConfig.retrofitStrategyBuilder
																							.displayValues[
																							strategy[key].value
																				    ]}
																		</Typography>
																	</TableCell>
																</TableRow>
															))}
														</TableBody>
													</Table>
												</TableContainer>
											</TableCell>
											<TableCell
												align="center"
												className={classes.tableSavedCell}
											>
												<Grid container spacing={0}>
													{retrofitMethodKeys.map((key, idx) => (
														<>
															{strategy[key].label === "" ? null : (
																<Grid item xs={4} key={key + 1} sx={{ p: 0 }}>
																	<Typography
																		variant="body1"
																		className={classes.tableSavedText}
																	>
																		{strategy[key].label}
																	</Typography>
																</Grid>
															)}
															<Grid
																item
																xs={strategy[key].label === "" ? 12 : 8}
																key={key + 2}
																sx={{ p: 0 }}
															>
																<Typography variant="body1">
																	{strategy[key].value}
																</Typography>
															</Grid>
															{idx === retrofitMethodKeys.length - 1 ? null : (
																<Divider />
															)}
														</>
													))}
												</Grid>
											</TableCell>
											<TableCell
												align="center"
												className={classes.tableSavedCell}
											>
												<Typography
													variant="body1"
													className={classes.tableSavedValue}
												>
													{getDollarString(
														retrofitSummary.by_rule[`${index}`].cost,
													)}
												</Typography>
											</TableCell>
											<TableCell
												align="center"
												className={classes.tableSavedCell}
											>
												<Typography
													variant="body1"
													className={classes.tableSavedValue}
												>
													{retrofitSummary.by_rule[`${index}`].num_bldg}
												</Typography>
												<Typography
													variant="body1"
													className={classes.tableSavedValue}
												>
													{retrofitSummary.by_rule[`${index}`]
														.num_bldg_no_cost > 0
														? `(${
																retrofitSummary.by_rule[`${index}`]
																	.num_bldg_no_cost
														  } buildings with no cost)`
														: null}
												</Typography>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			) : null}
		</Grid>
	);
}

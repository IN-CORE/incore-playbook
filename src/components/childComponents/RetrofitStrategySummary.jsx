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
			alignItems="flex-start"
			spacing={3}
			style={{ marginLeft: "25px", marginRight: "25px" }}
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
				{/*<Grid container alignItems="center" spacing={3}>*/}
				{/*<Grid item xs={4}>*/}
				{/*    <Typography variant="h6" className={classes.tableSavedText}>*/}
				{/*        Name*/}
				{/*    </Typography>*/}
				{/*</Grid>*/}
				{/*<Grid item xs={8}>*/}
				{/*    <Typography*/}
				{/*        variant="body1"*/}
				{/*        className={classes.summaryTableSavedText}*/}
				{/*    >*/}
				{/*        {name}*/}
				{/*    </Typography>*/}
				{/*</Grid>*/}
				{/*<Grid item xs={4}>*/}
				{/*    <Typography variant="h6" className={classes.tableSavedText}>*/}
				{/*        Description*/}
				{/*    </Typography>*/}
				{/*</Grid>*/}
				{/*<Grid item xs={8}>*/}
				{/*    <Typography*/}
				{/*        variant="body1"*/}
				{/*        className={classes.summaryTableSavedText}*/}
				{/*    >*/}
				{/*        {description}*/}
				{/*    </Typography>*/}
				{/*</Grid>*/}
				{/*</Grid>*/}
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
						<IncoreFootNote style={{ color: "red", textAlign: "right" }}>
							{retrofitSummary.total.num_bldg_no_cost > 0
								? `(${retrofitSummary.total.num_bldg_no_cost} buildings with no cost)`
								: null}
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
									<TableCell
										className={classes.tableHeaderCellNo}
										align="center"
									>
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
										Retrofitted Buildings
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
																globalConfig.retrofitStrategyBuilder.colorCodes[
																	index
																],
														}}
													/>
													{index + 1}
												</Box>
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
																				? `${strategy[key].value} %`
																				: strategy[key].value}
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
												style={{ padding: "16px" }}
											>
												{retrofitMethodKeys.map((key, idx) => (
													<>
														<Typography variant="body1">
															{strategy[key].value}
														</Typography>
														{idx === retrofitMethodKeys.length - 1 ? null : (
															<Divider />
														)}
													</>
												))}
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
													{getDollarString(
														retrofitSummary.by_rule[`${index}`].cost,
													)}
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
													{retrofitSummary.by_rule[`${index}`].num_bldg}
												</Typography>
												<IncoreFootNote style={{ color: "red" }}>
													{retrofitSummary.by_rule[`${index}`]
														.num_bldg_no_cost > 0
														? `(${
																retrofitSummary.by_rule[`${index}`]
																	.num_bldg_no_cost
														  } buildings with no cost)`
														: null}
												</IncoreFootNote>
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

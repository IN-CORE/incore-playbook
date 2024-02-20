import React, { useEffect, useState } from "react";

import { Box, Container, InputLabel } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { IncoreButton } from "../../styledComponents/IncoreButton";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { IncoreTextField } from "../../styledComponents/IncoreInput";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";

import { FlatCoordToLonLat, LonLatToFlatCoord, move2TestbedSpace, round } from "../../../utils/common";
import { createModelTornado } from "../../../utils/hazard";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import { validateCoord } from "../../../utils/map";

const useStyles = makeStyles({
	startLabel: {
		color: "#96B712",
		fontSize: "14px"
	},
	endLabel: {
		color: "#D63649",
		fontSize: "14px"
	},
	coordInput: {
		color: "#2E384D",
		fontSize: "14px",
		height: "18px",
		border: "0 none",
		maxWidth: "4.5em",
		background: "transparent"
	},
	coordInputEdit: {
		color: "#00619D",
		fontSize: "14px",
		height: "18px",
		border: "0 none",
		maxWidth: "4.5em",
		background: "#FFFFFF",
		fontStyle: "italic"
	},
	coordBox: {
		width: "100%",
		height: "41px",
		fontSize: "15px",
		fontWeight: "500",
		lineHeight: "18px",
		letterSpacing: 0,
		// backgroundColor: "#EDF5F5",
		border: "1px solid rgba(0, 0, 0, 0.23)",
		borderRadius: "4px",
		textAlign: "center",
		paddingLeft: "11.25px"
	}
});

export default function ModelTornado(props) {
	const {
		value,
		index,
		startCoordProps,
		endCoordProps,
		setStartCoordProps,
		setEndCoordProps,
		handleLayerUpdate,
		handleListUpdate,
		enableEdit,
		setEnableEdit,
		...other
	} = props;
	const classes = useStyles();

	const globalConfig = useSelector((state) => state.config.globalConfig);
	const mapConfig = useSelector((state) => state.config.mapConfig);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [rating, setRating] = useState("EF3");
	const [startLatCoord, setStartLatCoord] = useState(null);
	const [startLonCoord, setStartLonCoord] = useState(null);
	const [endLatCoord, setEndLatCoord] = useState(null);
	const [endLonCoord, setEndLonCoord] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [validStartCoord, setValidStartCoord] = useState(true);
	const [validEndCoord, setValidEndCoord] = useState(true);

	//function to check before setting coordinates

	const checkSetCoord = (lon, lat, setLon, setLat, setValidCoord) => {
		if (validateCoord(lon, lat, mapConfig.MAP_BOUNDS)) {
			setLat(lat);
			setLon(lon);
			setValidCoord(true);
		} else {
			setValidCoord(false);
		}
	};

	// form check
	useEffect(() => {
		if (
			name &&
			description &&
			startLatCoord &&
			startLonCoord &&
			endLatCoord &&
			endLonCoord &&
			rating &&
			!enableEdit
		)
			setDisabled(false);
		else setDisabled(true);
	}, [name, description, startLatCoord, startLonCoord, endLatCoord, endLonCoord, rating, enableEdit]);

	// update start and end based on map click (parent prop change)
	useEffect(() => {
		if (startCoordProps.length > 0 && !enableEdit) {
			const startLat = round(FlatCoordToLonLat(startCoordProps)[1], 3);
			const startLon = round(FlatCoordToLonLat(startCoordProps)[0], 3);
			checkSetCoord(startLon, startLat, setStartLonCoord, setStartLatCoord, setValidStartCoord);
		}
		if (endCoordProps.length > 0 && !enableEdit) {
			const endLat = round(FlatCoordToLonLat(endCoordProps)[1], 3);
			const endLon = round(FlatCoordToLonLat(endCoordProps)[0], 3);
			checkSetCoord(endLon, endLat, setEndLonCoord, setEndLatCoord, setValidEndCoord);
		}
	}, [startCoordProps, endCoordProps, enableEdit]);

	useEffect(() => {
		if (startLonCoord && startLatCoord && endLatCoord && endLonCoord && enableEdit) {
			setStartCoordProps(LonLatToFlatCoord(startLonCoord, startLatCoord));
			setEndCoordProps(LonLatToFlatCoord(endLonCoord, endLatCoord));
		}
	}, [startLonCoord, startLatCoord, endLonCoord, endLatCoord, enableEdit]);

	const onSave = async () => {
		setLoading(true);

		const tornadoJson = await createModelTornado(
			globalConfig,
			name,
			description,
			rating,
			startLatCoord,
			startLonCoord,
			endLatCoord,
			endLonCoord
		);
		if (tornadoJson && tornadoJson["id"]) {
			// move to testbed space
			await move2TestbedSpace(globalConfig, tornadoJson["id"]);
			handleLayerUpdate(tornadoJson);
			handleListUpdate(globalConfig, "tornado");
			setName("");
			setDescription("");
			setStartLatCoord("");
			setStartLonCoord("");
			setEndLatCoord("");
			setEndLonCoord("");
		}
		setLoading(false);
	};

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Container>
					<LoadingOverlay active={loading} spinner text="Saving...">
						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">Name</IncoreInputLabel>
							<IncoreTextField
								value={name}
								variant="outlined"
								onChange={(e) => setName(e.target.value)}
							/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">Description</IncoreInputLabel>
							<IncoreTextField
								value={description}
								variant="outlined"
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">Rating</IncoreInputLabel>
							<IncoreSelectBox
								labelId="label"
								id="select"
								variant="outlined"
								defaultValue={rating}
								onChange={(e) => setRating(e.target.value)}
							>
								<IncoreMenuItem value="EF0" key="EF0">
									EF0
								</IncoreMenuItem>
								<IncoreMenuItem value="EF1" key="EF1">
									EF1
								</IncoreMenuItem>
								<IncoreMenuItem value="EF2" key="EF2">
									EF2
								</IncoreMenuItem>
								<IncoreMenuItem value="EF3" key="EF3">
									EF3
								</IncoreMenuItem>
								<IncoreMenuItem value="EF4" key="EF4">
									EF4
								</IncoreMenuItem>
								<IncoreMenuItem value="EF5" key="EF5">
									EF5
								</IncoreMenuItem>
							</IncoreSelectBox>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel>Draw Tornado Path</IncoreInputLabel>
							{startLonCoord !== null &&
							startLatCoord !== null &&
							endLonCoord !== null &&
							endLatCoord !== null ? (
									validStartCoord && validEndCoord ? (
										<></>
									) : (
										<span style={{ color: "Red" }}>
										Coordinate not valid or outside of the bounding box.
										</span>
									)
								) : null}
							<Box className={classes.coordBox}>
								<Box display="flex" style={{ alignItems: "baseline", justifyContent: "center" }}>
									<InputLabel className={classes.startLabel}>Lat: </InputLabel>
									<input
										placeholder={mapConfig.MAP_CENTER[1]}
										className={!enableEdit ? classes.coordInput : classes.coordInputEdit}
										value={startLatCoord}
										type={"number"}
										onChange={(e) => setStartLatCoord(e.target.value)}
										disabled={!enableEdit}
									/>
									<InputLabel className={classes.startLabel}>Lon: </InputLabel>
									<input
										placeholder={mapConfig.MAP_CENTER[0]}
										className={!enableEdit ? classes.coordInput : classes.coordInputEdit}
										value={startLonCoord}
										type={"number"}
										onChange={(e) => setStartLonCoord(e.target.value)}
										disabled={!enableEdit}
									/>

									<InputLabel className={classes.endLabel}>Lat: </InputLabel>
									<input
										placeholder={mapConfig.MAP_CENTER[1]}
										className={!enableEdit ? classes.coordInput : classes.coordInputEdit}
										value={endLatCoord}
										type={"number"}
										onChange={(e) => setEndLatCoord(e.target.value)}
										disabled={!enableEdit}
									/>
									<InputLabel className={classes.endLabel}>Lon: </InputLabel>
									<input
										placeholder={mapConfig.MAP_CENTER[0]}
										className={!enableEdit ? classes.coordInput : classes.coordInputEdit}
										value={endLonCoord}
										type={"number"}
										onChange={(e) => setEndLonCoord(e.target.value)}
										disabled={!enableEdit}
									/>
									{!enableEdit ? (
										<IncoreButtonText
											onClick={() => {
												setEnableEdit(true);
											}}
											style={{ maxWidth: "fit-content" }}
										>
											Edit
										</IncoreButtonText>
									) : (
										<IncoreButtonText
											onClick={() => {
												setEnableEdit(false);
												setValidStartCoord(
													validateCoord(startLonCoord, startLatCoord, mapConfig.MAP_BOUNDS)
												);
												setValidEndCoord(
													validateCoord(endLonCoord, endLatCoord, mapConfig.MAP_BOUNDS)
												);
											}}
											style={{ maxWidth: "fit-content" }}
										>
											Save
										</IncoreButtonText>
									)}
								</Box>
							</Box>
						</Box>
						<Box className="inputGroup">
							<IncoreButton
								variant="contained"
								onClick={onSave}
								disabled={disabled || !(validStartCoord && validEndCoord)}
							>
								Save
							</IncoreButton>
						</Box>
					</LoadingOverlay>
				</Container>
			)}
		</div>
	);
}

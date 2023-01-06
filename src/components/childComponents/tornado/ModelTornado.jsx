import React, { useEffect, useState } from "react";

import { Box, Container, InputLabel } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { IncoreButton } from "../../styledComponents/IncoreButton";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { IncoreTextField } from "../../styledComponents/IncoreInput";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";

import { FlatCoordToLonLat, move2TestbedSpace, round } from "../../../utils/common";
import { createModelTornado } from "../../../utils/hazard";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
	startLabel: {
		color: "#96B712",
		height: "18px",
		display: "inline-block",
		marginLeft: "11.25px"
	},
	endLabel: {
		color: "#D63649",
		height: "18px",
		display: "inline-block",
		marginLeft: "11.25px"
	},
	coordInput: {
		color: "#2E384D",
		fontSize: "14px",
		height: "18px",
		margin: "11.25px 0",
		display: "inline-block",
		border: "0 none"
	},
	coordBox: {
		width: "100%",
		height: "41px",
		fontSize: "15px",
		fontWeight: "500",
		lineHeight: "18px",
		letterSpacing: 0,
		backgroundColor: "#FFFFFF",
		border: "1px solid rgba(0, 0, 0, 0.23)",
		borderRadius: "4px",
		textAlign: "center"
	}
});

export default function ModelTornado(props) {
	const { value, index, startCoordProps, endCoordProps, handleLayerUpdate, handleListUpdate, ...other } = props;
	const classes = useStyles();
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [rating, setRating] = useState("EF3");
	const [startCoord, setStartCoord] = useState("");
	const [endCoord, setEndCoord] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	// form check
	useEffect(() => {
		if (name !== "" && description !== "" && startCoord !== "" && endCoord !== "" && rating !== "")
			setDisabled(false);
		else setDisabled(true);
	}, [name, description, startCoord, endCoord, rating]);

	// update start and end based on map click (parent prop change)
	useEffect(() => {
		if (startCoordProps.length > 0) {
			setStartCoord(
				`${round(FlatCoordToLonLat(startCoordProps)[1], 4)}, ${round(FlatCoordToLonLat(startCoordProps)[0], 4)}`
			);
		}
		if (endCoordProps.length > 0) {
			setEndCoord(
				`${round(FlatCoordToLonLat(endCoordProps)[1], 4)},${round(FlatCoordToLonLat(endCoordProps)[0], 4)}`
			);
		}
	}, [startCoordProps, endCoordProps]);

	const onSave = async () => {
		setLoading(true);
		let startLat = startCoord.split(",")[0];
		let startLon = startCoord.split(",")[1];
		let endLat = endCoord.split(",")[0];
		let endLon = endCoord.split(",")[1];

		const tornadoJson = await createModelTornado(
			globalConfig,
			name,
			description,
			rating,
			startLat,
			startLon,
			endLat,
			endLon
		);
		if (tornadoJson && tornadoJson["id"]) {
			// move to testbed space
			await move2TestbedSpace(globalConfig, tornadoJson["id"]);
			handleLayerUpdate(tornadoJson);
			handleListUpdate(globalConfig, "tornadoes");
			setName("");
			setDescription("");
			setStartCoord("");
			setEndCoord("");
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
							<IncoreInputLabel>Name</IncoreInputLabel>
							<IncoreTextField
								value={name}
								variant="outlined"
								onChange={(e) => setName(e.target.value)}
							/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel>Description</IncoreInputLabel>
							<IncoreTextField
								value={description}
								variant="outlined"
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel>Rating</IncoreInputLabel>
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
							<IncoreInputLabel>Start and End Points</IncoreInputLabel>
							<Box className={classes.coordBox}>
								<InputLabel className={classes.startLabel}>Start: </InputLabel>
								<input
									placeholder="set start on map"
									className={classes.coordInput}
									value={startCoord}
									onChange={(e) => setStartCoord(e.target.value)}
								/>
								<InputLabel className={classes.endLabel}>End: </InputLabel>
								<input
									placeholder="set end on map"
									className={classes.coordInput}
									value={endCoord}
									onChange={(e) => setEndCoord(e.target.value)}
								/>
							</Box>
						</Box>
						<Box className="inputGroup">
							<IncoreButton variant="contained" onClick={onSave} disabled={disabled}>
								Save
							</IncoreButton>
						</Box>
					</LoadingOverlay>
				</Container>
			)}
		</div>
	);
}

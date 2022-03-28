import React, {useEffect, useState} from "react";

import {Box, Container, InputLabel} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";

import {IncoreButton} from "../../styledComponents/IncoreButton";
import {IncoreMenuItem, IncoreSelectBox} from "../../styledComponents/IncoreSelect";
import {IncoreTextField} from "../../styledComponents/IncoreInput";
import {IncoreInputLabel} from "../../styledComponents/IncoreInputLabel";

import {createModelEarthquake} from "../../../utils/hazard";
import { FlatCoordToLonLat } from "../../../utils/common";
import LoadingOverlay from "react-loading-overlay";

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
		border: "0 none",
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
		textAlign:"center"
	}
});

export default function ModelEarthquake(props) {
	const {value, index, startCoordProps, endCoordProps, handleLayerUpdate, handleListUpdate, ...other} = props;
	const classes = useStyles();

	//{
	//   "eqType": "model",
	//   "attenuations": {
	//     "AtkinsonBoore1995": "1.0"
	//   },
	//   "eqParameters": {
	//     "srcLatitude": "35.927",
	//     "srcLongitude": "-89.919",
	//     "magnitude": "7.9",
	//     "depth": "10.0"
	//   },
	//   "visualizationParameters": {
	//     "demandType": "PGA",
	//     "demandUnits": "g",
	//     "minX": "-90.3099",
	//     "minY": "34.9942",
	//     "maxX": "-89.6231",
	//     "maxY": "35.4129",
	//     "numPoints": "1025",
	//     "amplifyHazard": "true"
	//   }
	// }
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [coord, setCoord] = useState("");
	const [magnitude, setMagnitude] = useState(7.9);
	const [depth, setDepth] = useState(10);
	const [demandType, setDemandtype] = useState("PGA");
	const [demandUnits, setDemandUnits] = useState("g");
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	// form check
	useEffect(() => {
		if (name !== "" && description !== "" && startCoord !== "" && endCoord !== "" && rating!== "") setDisabled(false);
		else setDisabled(true);
	}, [name, description, startCoord, endCoord, rating]);


	// update start and end based on map click (parent prop change)
	useEffect(() => {
		if (startCoordProps.length > 0) {
			setStartCoord(`${FlatCoordToLonLat(startCoordProps)[1].toFixed(4)},${FlatCoordToLonLat(startCoordProps)[0].toFixed(4)}`);
		}
		if (endCoordProps.length > 0) {
			setEndCoord(`${FlatCoordToLonLat(endCoordProps)[1].toFixed(4)},${FlatCoordToLonLat(endCoordProps)[0].toFixed(4)}`);
		}
	}, [startCoordProps, endCoordProps]);

	const onSave = async () => {
		setLoading(true);
		let startLat = startCoord.split(",")[0];
		let startLon = startCoord.split(",")[1];
		let endLat = endCoord.split(",")[0];
		let endLon = endCoord.split(",")[1];

		const tornadoJson = await createModelEarthquake(name, description, rating, startLat, startLon, endLat, endLon);
		if (tornadoJson !== {}){
			handleLayerUpdate(tornadoJson);
			handleListUpdate("tornadoes");
			setName("");
			setDescription("");
			setStartCoord("");
			setEndCoord("");
		}
		setLoading(false);
	};

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
			 aria-labelledby={`simple-tab-${index}`}
			 {...other}
		>
			{value === index && (
				<Container>
					<LoadingOverlay
						active={loading}
						spinner
						text="Saving..."
					>
						<Box className="inputGroup">
							<IncoreInputLabel>Name</IncoreInputLabel>
							<IncoreTextField value={name} variant="outlined" onChange={(e) => setName(e.target.value)}/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel>Description</IncoreInputLabel>
							<IncoreTextField value={description} variant="outlined"
											 onChange={(e) => setDescription(e.target.value)}/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel>Magnitude</IncoreInputLabel>
							<IncoreTextField value={magnitude} variant="outlined"
											 onChange={(e) => setMagnitude(e.target.value)}/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel>Depth</IncoreInputLabel>
							<IncoreTextField value={depth} variant="outlined"
											 onChange={(e) => setDepth(e.target.value)}/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel>Demand Type</IncoreInputLabel>
							<IncoreSelectBox labelId="label" id="select" variant="outlined" defaultValue={demandType}
											 onChange={(e) => setRating(e.target.value)}>
								<IncoreMenuItem value="PGV" key="PGV">PGV</IncoreMenuItem>
								<IncoreMenuItem value="0.1 Sec SA" key="0.1 Sec SA">0.1 Sec SA</IncoreMenuItem>
								<IncoreMenuItem value="0.2 Sec SA" key="0.2 Sec SA">0.2 Sec SA</IncoreMenuItem>
								<IncoreMenuItem value="0.3 Sec SA" key="0.3 Sec SA">0.3 Sec SA</IncoreMenuItem>
								<IncoreMenuItem value="SD" key="SD">SD</IncoreMenuItem>
								<IncoreMenuItem value="SV" key="SV">SV</IncoreMenuItem>
							</IncoreSelectBox>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel>Demand Units</IncoreInputLabel>
							<IncoreSelectBox labelId="label" id="select" variant="outlined" defaultValue={demandUnits}
											 onChange={(e) => setDemandUnits(e.target.value)}>
								<IncoreMenuItem value="in/s" key="in/s">in/s</IncoreMenuItem>
								<IncoreMenuItem value="cm/s" key="cm/s">cm/s</IncoreMenuItem>
								<IncoreMenuItem value="in" key="in">in</IncoreMenuItem>
								<IncoreMenuItem value="ft" key="ft">ft</IncoreMenuItem>
								<IncoreMenuItem value="m" key="m">in, ft, m</IncoreMenuItem>
							</IncoreSelectBox>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel>Start and End Points</IncoreInputLabel>
							<Box className={classes.coordBox}>
								<InputLabel className={classes.startLabel}>Start: </InputLabel>
								<input placeholder="set start on map" className={classes.coordInput}
									   value={coord}
									   onChange={(e) => setCoord(e.target.value)}/>
							</Box>
						</Box>
						<Box className="inputGroup">
							<IncoreButton variant="contained" onClick={onSave} disabled={disabled}>Save</IncoreButton>
						</Box>
					</LoadingOverlay>
				</Container>
			)}
		</div>
	);
}

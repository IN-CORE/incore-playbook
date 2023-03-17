import React, { useEffect, useState } from "react";

import { Box, Container, InputLabel } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { IncoreButton } from "../../styledComponents/IncoreButton";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { IncoreTextField } from "../../styledComponents/IncoreInput";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";

import { createModelEarthquake } from "../../../utils/hazard";
import { FlatCoordToLonLat, LonLatToFlatCoord, move2TestbedSpace, round } from "../../../utils/common";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import { validateCoord } from "../../../utils/map";

const useStyles = makeStyles({
	srcLatLabel: {
		fontSize: "14px",
		color: "#D63649"
	},
	srcLonLabel: {
		fontSize: "14px",
		color: "#96B712"
	},
	coordInput: {
		color: "#2E384D",
		fontSize: "14px",
		height: "18px",
		border: "0 none",
		background: "transparent"
	},
	coordInputEdit: {
		color: "#00619D",
		fontSize: "14px",
		height: "18px",
		border: "0 none",
		background: "transparent",
		fontStyle: "italic"
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
		textAlign: "center",
		paddingLeft: "11.25px"
	}
});

export default function ModelEarthquake(props) {
	const {
		value,
		index,
		srcCoordProps,
		setSrcCoordProps,
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
	const [coordLat, setCoordLat] = useState(null);
	const [coordLon, setCoordLon] = useState(null);
	const [magnitude, setMagnitude] = useState(6.2);
	const [depth, setDepth] = useState(10);
	const [demandType, setDemandType] = useState("PGA");
	const [demandUnits, setDemandUnits] = useState("g");
	const [attenuations, setAttenuations] = useState("AtkinsonBoore1995");
	const [faultTypeMap, setFaultTypeMap] = useState("Strike-Slip");
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	// form check
	useEffect(() => {
		if (name && description && coordLat && coordLon && magnitude && depth && !enableEdit) setDisabled(false);
		else setDisabled(true);
	}, [name, description, coordLat, coordLon, enableEdit]);

	// update start and end based on map click (parent prop change)
	useEffect(() => {
		if (srcCoordProps.length > 0 && !enableEdit) {
			setCoordLat(round(FlatCoordToLonLat(srcCoordProps)[1], 3));
			setCoordLon(round(FlatCoordToLonLat(srcCoordProps)[0], 3));
		}
	}, [srcCoordProps, enableEdit]);

	useEffect(() => {
		if (coordLat && coordLon && enableEdit) setSrcCoordProps(LonLatToFlatCoord(coordLon, coordLat));
	}, [coordLat, coordLon, enableEdit]);

	const onSave = async () => {
		setLoading(true);
		const eqJson = await createModelEarthquake(
			globalConfig,
			mapConfig,
			name,
			description,
			coordLat,
			coordLon,
			magnitude,
			depth,
			demandType,
			demandUnits,
			attenuations,
			faultTypeMap
		);
		if (eqJson && eqJson["id"]) {
			// move to testbed space
			await move2TestbedSpace(globalConfig, eqJson["id"]);
			handleLayerUpdate(eqJson);
			handleListUpdate(globalConfig, "earthquake");
			setName("");
			setDescription("");
			setCoordLat("");
			setCoordLon("");
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
							<IncoreInputLabel className="required-field">Magnitude</IncoreInputLabel>
							<IncoreTextField
								value={magnitude}
								type={"number"}
								variant="outlined"
								onChange={(e) => setMagnitude(e.target.value < 0 ? 0 : e.target.value)}
							/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">Depth</IncoreInputLabel>
							<IncoreTextField
								value={depth}
								type={"number"}
								variant="outlined"
								onChange={(e) => setDepth(e.target.value < 0 ? 0 : e.target.value)}
							/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">Demand Type</IncoreInputLabel>
							<IncoreSelectBox
								labelId="label"
								id="select"
								variant="outlined"
								defaultValue={demandType}
								onChange={(e) => setDemandType(e.target.value)}
							>
								<IncoreMenuItem value="PGA" key="PGA">
									PGA
								</IncoreMenuItem>
								<IncoreMenuItem value="PGV" key="PGV">
									PGV
								</IncoreMenuItem>
								<IncoreMenuItem value="0.1 Sec SA" key="0.1 Sec SA">
									0.1 Sec SA
								</IncoreMenuItem>
								<IncoreMenuItem value="0.2 Sec SA" key="0.2 Sec SA">
									0.2 Sec SA
								</IncoreMenuItem>
								<IncoreMenuItem value="0.3 Sec SA" key="0.3 Sec SA">
									0.3 Sec SA
								</IncoreMenuItem>
								<IncoreMenuItem value="SD" key="SD">
									SD
								</IncoreMenuItem>
								<IncoreMenuItem value="SV" key="SV">
									SV
								</IncoreMenuItem>
							</IncoreSelectBox>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">Demand Units</IncoreInputLabel>
							<IncoreSelectBox
								labelId="label"
								id="select"
								variant="outlined"
								defaultValue={demandUnits}
								onChange={(e) => setDemandUnits(e.target.value)}
							>
								<IncoreMenuItem value="g" key="g">
									g
								</IncoreMenuItem>
								<IncoreMenuItem value="in/s" key="in/s">
									in/s
								</IncoreMenuItem>
								<IncoreMenuItem value="cm/s" key="cm/s">
									cm/s
								</IncoreMenuItem>
								<IncoreMenuItem value="in" key="in">
									in
								</IncoreMenuItem>
								<IncoreMenuItem value="ft" key="ft">
									ft
								</IncoreMenuItem>
								<IncoreMenuItem value="m" key="m">
									m
								</IncoreMenuItem>
							</IncoreSelectBox>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">Attenuation Model</IncoreInputLabel>
							<IncoreSelectBox
								labelId="label"
								id="select"
								variant="outlined"
								defaultValue={attenuations}
								onChange={(e) => setAttenuations(e.target.value)}
							>
								<IncoreMenuItem value="AtkinsonBoore1995" key="AtkinsonBoore1995">
									AtkinsonBoore1995
								</IncoreMenuItem>
								<IncoreMenuItem value="ChiouYoungs2014" key="ChiouYoungs2014">
									ChiouYoungs2014
								</IncoreMenuItem>
								<IncoreMenuItem value="AbrahamsonSilvaKamai2014" key="AbrahamsonSilvaKamai2014">
									AbrahamsonSilvaKamai2014
								</IncoreMenuItem>
								<IncoreMenuItem value="CampbellBozorgnia2014" key="CampbellBozorgnia2014">
									CampbellBozorgnia2014
								</IncoreMenuItem>
								<IncoreMenuItem value="Toro1997" key="Toro1997">
									Toro1997
								</IncoreMenuItem>
							</IncoreSelectBox>
						</Box>

						{attenuations === "ChiouYoungs2014" ||
						attenuations === "CampbellBozorgnia2014" ||
						attenuations === "AbrahamsonSilvaKamai2014" ? (
							<Box className="inputGroup">
								<IncoreInputLabel className="required-field">Fault Mechanism</IncoreInputLabel>
								<IncoreSelectBox
									labelId="label"
									id="select"
									variant="outlined"
									defaultValue={faultTypeMap}
									onChange={(e) => setFaultTypeMap(e.target.value)}
								>
									<IncoreMenuItem value="Strike-Slip" key="Strike-Slip">
										Strike-Slip
									</IncoreMenuItem>
									<IncoreMenuItem value="Normal" key="Normal">
										Normal
									</IncoreMenuItem>
									<IncoreMenuItem value="Reverse-Thrust" key="Reverse-Thrust">
										Reverse-Thrust
									</IncoreMenuItem>
									<IncoreMenuItem value="Reverse-Slip" key="Reverse-Slip">
										Reverse-Slip
									</IncoreMenuItem>
									<IncoreMenuItem value="All" key="All">
										All
									</IncoreMenuItem>
									<IncoreMenuItem value="Reverse" key="Reverse">
										Reverse
									</IncoreMenuItem>
								</IncoreSelectBox>
							</Box>
						) : (
							<></>
						)}

						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">Draw Earthquake Epicenter</IncoreInputLabel>
							{coordLon !== null && coordLat !== null ? (
								validateCoord(coordLon, coordLat, mapConfig.MAP_BOUNDS) ? (
									<></>
								) : (
									<span style={{ color: "Red" }}>
										Coordinate not valid or outside of the bounding box.
									</span>
								)
							) : null}
							<Box className={classes.coordBox}>
								<Box display="flex" style={{ alignItems: "baseline", justifyContent: "center" }}>
									<InputLabel className={classes.srcLatLabel}>Lat: </InputLabel>
									<input
										placeholder={mapConfig.MAP_CENTER[1]}
										className={!enableEdit ? classes.coordInput : classes.coordInputEdit}
										value={coordLat}
										type={"number"}
										onChange={(e) => setCoordLat(e.target.value)}
										disabled={!enableEdit}
									/>
									<InputLabel className={classes.srcLonLabel}>Lon: </InputLabel>
									<input
										placeholder={mapConfig.MAP_CENTER[0]}
										className={!enableEdit ? classes.coordInput : classes.coordInputEdit}
										value={coordLon}
										type={"number"}
										onChange={(e) => setCoordLon(e.target.value)}
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
											}}
											style={{ maxWidth: "fit-content" }}
											disabled={!validateCoord(coordLon, coordLat, mapConfig.MAP_BOUNDS)}
										>
											Save
										</IncoreButtonText>
									)}
								</Box>
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

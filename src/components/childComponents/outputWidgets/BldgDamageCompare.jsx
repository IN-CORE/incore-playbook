import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { StackedResult } from "../graph/StackedResult";
import { ResultTable } from "../table/ResultTable";
import { useSelector } from "react-redux";
import { getOutputFileContent, getOutputFileContentJSON } from "../../../utils/datawolf";
import { generateLayers } from "../../../utils/map";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import { comparisonKey } from "../../../globals";

export default function BldgDamageCompare(props) {
	let {
		executionItems,
		datawolfDatasetConfigItems,
		hazardLayers
	} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [bldgDmgSummaryTableContents, setBldgDmgSummaryTableContents] = useState({});
	const [damageLayers, setDamageLayers] = useState({});

	const printRef = useRef();

	useEffect(() => {
		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "bldgMaxDamageStateINCOREId") {
						const bldgMaxDamageStateINCOREId = await getOutputFileContent(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId
						);
						const layerDef = [
							{
								layerId: bldgMaxDamageStateINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.BldgDamage,
								title: "Building Damage",
								opacity: 1,
								zIndex: 1
							}
						];
						const previewLayers = generateLayers(globalConfig, layerDef);
						setDamageLayers(prevState => ({
							...prevState,
							[comparisonKey[i]]: previewLayers
						}));
					} else if (vName === "bldgDmgSummaryTableContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setBldgDmgSummaryTableContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					}
				}
			}
		};

		fetchData();
	}, []);

	return (
		<Box ref={printRef}>
			{/*for chart*/}
			<Box className="chartContainer">
				<Grid container spacing={3} justify="center">
					<Divider orientation="vertical" flexItem />
					{/*barchart*/}
					{Object.keys(bldgDmgSummaryTableContents).length > 0 ? (
						<Grid item style={{ minWidth: "804px" }}>
							<Typography className="previewSubTitle">
								Anticipated Performance - Building Clusters
							</Typography>
							<Box style={{ marginTop: "38px" }}>
								<StackedResult categorySummary={bldgDmgSummaryTableContents["A"]["by_category"]} />
							</Box>
						</Grid>
					) : (
						<></>
					)}
				</Grid>
				<Divider orientation="horizontal" />
			</Box>

			{/*/!*for map*!/*/}
			{/*{basicLayers && Object.keys(hazardLayers).length > 0 && Object.keys(damageLayers).length > 0 ? (*/}
			{/*	Object.keys(hazardLayers).map(key => (*/}
			{/*		<Container className={`mapContainer-${key}`} disableGutters>*/}
			{/*			<div className={`mapsWrapper-${key}`}>*/}
			{/*				<Map*/}
			{/*					key={`hazard-${key}`}*/}
			{/*					// className="mapColumn"*/}
			{/*					zoom={mapConfig.ZOOM}*/}
			{/*					minZoom={mapConfig.MIN_ZOOM}*/}
			{/*					maxZoom={mapConfig.MAX_ZOOM}*/}
			{/*					extent={applyTransform(mapConfig.MAP_BOUNDS, getTransform("EPSG:4326", "EPSG:3857"))}*/}
			{/*					center={fromLonLat(mapConfig.MAP_CENTER)}*/}
			{/*					layers={[basicLayers, hazardLayers[key], damageLayers[key]]}*/}
			{/*					layerSwitcherOptions={{}}*/}
			{/*				/>*/}
			{/*			</div>*/}
			{/*		</Container>*/}
			{/*	))*/}
			{/*) : (*/}
			{/*	<></>*/}
			{/*)}*/}

			{/*for table*/}
			{Object.keys(bldgDmgSummaryTableContents).length > 0 ? (
				<Box>
					<ResultTable fields={bldgDmgSummaryTableContents["A"]} />
				</Box>
			) : (
				<></>
			)}

			{/*Print*/}
			<IncoreButtonText
				onClick={() => {
					downloadImg(printRef.current, "Building_Damage");
				}}
				startIcon={<CameraAltIcon />}
			>
				Image
			</IncoreButtonText>
		</Box>
	);
}

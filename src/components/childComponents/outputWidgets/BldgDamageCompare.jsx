import { Box, Container } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
	getOutputFileContent,
	getOutputFileContentJSON,
} from "../../../utils/datawolf";
import { createBasicLayers, generateLayers } from "../../../utils/map";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import { comparisonKey } from "../../../globals";
import { BldgDamageTableCompare } from "../table/BldgDamageTableCompare";
import MapCompare from "../map/MapCompare";
import { applyTransform } from "ol/extent";
import { fromLonLat, getTransform } from "ol/proj";

export default function BldgDamageCompare(props) {
	let { executionItems, datawolfDatasetConfigItems, hazardLayers } = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [bldgDmgSummaryTableContents, setBldgDmgSummaryTableContents] =
		useState({});
	const [damageLayersA, setDamageLayersA] = useState(null);
	const [damageLayersB, setDamageLayersB] = useState(null);

	// one layer can only be added to one map, so creating multiple objects is necessary
	const basicLayersA = createBasicLayers("Base Maps");
	const basicLayersB = createBasicLayers("Base Maps");
	const printRef = useRef();

	const mapHeight = 400; // px

	useEffect(() => {
		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "bldgMaxDamageStateINCOREId") {
						const bldgMaxDamageStateINCOREId = await getOutputFileContent(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						const layerDef = [
							{
								layerId: bldgMaxDamageStateINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.BldgDamage,
								title: "Building Damage",
								opacity: 1,
								zIndex: 1,
							},
						];
						const previewLayers = generateLayers(globalConfig, layerDef);
						if (i === 0) {
							setDamageLayersA(previewLayers);
						} else {
							setDamageLayersB(previewLayers);
						}
					} else if (vName === "bldgDmgSummaryTableContent") {
						const content = await getOutputFileContentJSON(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						setBldgDmgSummaryTableContents((prevState) => ({
							...prevState,
							[comparisonKey[i]]: content,
						}));
					}
				}
			}
		};

		fetchData();
	}, [executionItems, datawolfDatasetConfigItems]);

	return (
		<Box ref={printRef}>
			{/*for chart*/}
			{/*<Box className="chartContainer">*/}
			{/*	<Grid container spacing={3} justify="center">*/}
			{/*		<Divider orientation="vertical" flexItem />*/}
			{/*		/!*barchart*!/*/}
			{/*		{Object.keys(bldgDmgSummaryTableContents).length >= 2 ? (*/}
			{/*			<Grid item style={{ minWidth: "804px" }}>*/}
			{/*				<Typography className="previewSubTitle">*/}
			{/*					Anticipated Performance - Building Clusters*/}
			{/*				</Typography>*/}
			{/*				<Box style={{ marginTop: "38px" }}>*/}
			{/*					<StackedResult categorySummary={bldgDmgSummaryTableContents["A"]["by_category"]} />*/}
			{/*				</Box>*/}
			{/*			</Grid>*/}
			{/*		) : (*/}
			{/*			<></>*/}
			{/*		)}*/}
			{/*	</Grid>*/}
			{/*	<Divider orientation="horizontal" />*/}
			{/*</Box>*/}

			{/*for map*/}
			{basicLayersA &&
			basicLayersB &&
			hazardLayers &&
			damageLayersA &&
			damageLayersB ? (
				<Container
					className="mapContainer"
					disableGutters
					style={{ height: `${mapHeight}px` }}
				>
					<MapCompare
						className="fillContainer"
						zoom={mapConfig.ZOOM}
						minZoom={mapConfig.MIN_ZOOM}
						maxZoom={mapConfig.MAX_ZOOM}
						extent={applyTransform(
							mapConfig.MAP_BOUNDS,
							getTransform("EPSG:4326", "EPSG:3857"),
						)}
						center={fromLonLat(mapConfig.MAP_CENTER)}
						layersA={[
							basicLayersA,
							hazardLayers[comparisonKey[0]],
							damageLayersA,
						]}
						layersB={[
							basicLayersB,
							hazardLayers[comparisonKey[1]],
							damageLayersB,
						]}
						layerSwitcherOptionsA={{}}
						layerSwitcherOptionsB={{}}
						height={mapHeight}
						allowBuildingSelection={true}
						fields={bldgDmgSummaryTableContents[comparisonKey[0]]}
					/>
				</Container>
			) : (
				<></>
			)}

			{/*for table*/}
			{Object.keys(bldgDmgSummaryTableContents).length >= 2 ? (
				<Box>
					<BldgDamageTableCompare
						fieldsA={bldgDmgSummaryTableContents[comparisonKey[0]]}
						fieldsB={bldgDmgSummaryTableContents[comparisonKey[1]]}
					/>
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

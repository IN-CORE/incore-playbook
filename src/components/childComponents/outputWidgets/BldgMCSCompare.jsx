import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	getOutputFileContent,
	getOutputFileContentJSON,
} from "../../../utils/datawolf";
import { createBasicLayers, generateLayers } from "../../../utils/map";
import { FunctionalityTableCompare } from "../table/FunctionalityTableCompare";
import { FunctionalityGraphCompare } from "../graph/FunctionalityGraphCompare";
import MapCompare from "../map/MapCompare";
import { applyTransform } from "ol/extent";
import { fromLonLat, getTransform } from "ol/proj";

export default function BldgMCSCompare(props) {
	let {
		executionItems,
		datawolfDatasetConfigItems,
		hazardLayers,
		retrofitLayers,
	} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [mcsBldgSummaryTableContents, setMcsBldgSummaryTableContents] =
		useState({});
	const [damageLayersA, setDamageLayersA] = useState(null);
	const [damageLayersB, setDamageLayersB] = useState(null);

	const basicLayersA = createBasicLayers("Base Maps");
	const basicLayersB = createBasicLayers("Base Maps");

	const mapHeight = 300; // px

	useEffect(() => {
		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "mcsBldgFailureProbINCOREId") {
						const mcsBldgFailureProbINCOREId = await getOutputFileContent(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						const layerDef = [
							{
								layerId: mcsBldgFailureProbINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.BldgMCS,
								title:
									"Building Functionality Probability without Interdependency",
								opacity: 1,
								zIndex: 2,
							},
						];
						const previewLayers = generateLayers(globalConfig, layerDef);
						if (i === 0) {
							setDamageLayersA(previewLayers);
						} else {
							setDamageLayersB(previewLayers);
						}
					} else if (vName === "mcsBldgSummaryTableContent") {
						const content = await getOutputFileContentJSON(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						setMcsBldgSummaryTableContents((prevState) => ({
							...prevState,
							[globalConfig.comparisonKey[i]]: content,
						}));
					}
				}
			}
		};

		fetchData();
	}, [executionItems, datawolfDatasetConfigItems]);

	return (
		<Box>
			{/*for chart*/}
			<Box className="chartContainer">
				<Grid container spacing={3} justify="center">
					{Object.keys(mcsBldgSummaryTableContents).length >= 2 &&
					mcsBldgSummaryTableContents[globalConfig.comparisonKey[0]][
						"by_category"
					] &&
					mcsBldgSummaryTableContents[globalConfig.comparisonKey[1]][
						"by_category"
					] ? (
						<Grid item style={{ minWidth: "90%" }}>
							<FunctionalityGraphCompare
								categorySummaryA={
									mcsBldgSummaryTableContents[globalConfig.comparisonKey[0]][
										"by_category"
									]
								}
								categorySummaryB={
									mcsBldgSummaryTableContents[globalConfig.comparisonKey[1]][
										"by_category"
									]
								}
							/>
						</Grid>
					) : (
						<></>
					)}
				</Grid>
			</Box>

			{/*for map*/}
			{basicLayersA &&
			basicLayersB &&
			Object.keys(hazardLayers).length >= 2 &&
			damageLayersA &&
			damageLayersB ? (
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
						hazardLayers[globalConfig.comparisonKey[0]],
						...(Object.keys(retrofitLayers).length > 0 &&
						retrofitLayers[globalConfig.comparisonKey[0]]
							? [retrofitLayers[globalConfig.comparisonKey[0]]]
							: []), // Include retrofitLayer if it's not null
						damageLayersA,
					]}
					layersB={[
						basicLayersB,
						hazardLayers[globalConfig.comparisonKey[1]],
						...(Object.keys(retrofitLayers).length > 0 &&
						retrofitLayers[globalConfig.comparisonKey[1]]
							? [retrofitLayers[globalConfig.comparisonKey[1]]]
							: []), // Include retrofitLayer if it's not null
						damageLayersB,
					]}
					layerSwitcherOptionsA={{}}
					layerSwitcherOptionsB={{}}
					height={mapHeight}
					allowBuildingSelection={true}
				/>
			) : (
				<></>
			)}

			{/*for table*/}
			{Object.keys(mcsBldgSummaryTableContents).length >= 2 ? (
				<Box>
					<FunctionalityTableCompare
						funcResultsA={
							mcsBldgSummaryTableContents[globalConfig.comparisonKey[0]]
						}
						funcResultsB={
							mcsBldgSummaryTableContents[globalConfig.comparisonKey[1]]
						}
					/>
				</Box>
			) : (
				<>/</>
			)}
		</Box>
	);
}

import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
	getOutputFileContent,
	getOutputFileContentJSON,
} from "../../../utils/datawolf";
import { createBasicLayers, generateLayers } from "../../../utils/map";
import { comparisonKey } from "../../../globals";
import { FunctionalityTableCompare } from "../table/FunctionalityTableCompare";
import { FunctionalityGraphCompare } from "../graph/FunctionalityGraphCompare";
import MapCompare from "../map/MapCompare";
import { applyTransform } from "ol/extent";
import { fromLonLat, getTransform } from "ol/proj";

export default function BldgFunctionality(props) {
	let { executionItems, datawolfDatasetConfigItems, hazardLayers } = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [bldgFuncSummaryTableContents, setBldgFuncSummaryTableContents] =
		useState({});
	const [damageLayersA, setDamageLayersA] = useState(null);
	const [damageLayersB, setDamageLayersB] = useState(null);

	// one layer can only be added to one map, so creating multiple objects is necessary
	const basicLayersA = createBasicLayers("Base Maps");
	const basicLayersB = createBasicLayers("Base Maps");

	const mapHeight = 300; // px

	useEffect(() => {
		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "bldgFuncProbINCOREId") {
						const bldgFuncProbINCOREId = await getOutputFileContent(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						const layerDef = [
							{
								layerId: bldgFuncProbINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.BldgFunctionality,
								title: "Building Functionality Probability",
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
					} else if (vName === "bldgFuncSummaryTableContent") {
						const content = await getOutputFileContentJSON(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						setBldgFuncSummaryTableContents((prevState) => ({
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
		<Box>
			{/*for chart*/}
			<Box className="chartContainer">
				<Grid container spacing={3} justify="center">
					{Object.keys(bldgFuncSummaryTableContents).length >= 2 &&
					bldgFuncSummaryTableContents[comparisonKey[0]]["by_category"] &&
					bldgFuncSummaryTableContents[comparisonKey[1]]["by_category"] ? (
						<Grid item style={{ minWidth: "90%" }}>
							<FunctionalityGraphCompare
								categorySummaryA={
									bldgFuncSummaryTableContents[comparisonKey[0]]["by_category"]
								}
								categorySummaryB={
									bldgFuncSummaryTableContents[comparisonKey[1]]["by_category"]
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
					/>
				</Container>
			) : (
				<></>
			)}

			{/*for table*/}
			{Object.keys(bldgFuncSummaryTableContents).length >= 2 ? (
				<Box>
					<FunctionalityTableCompare
						funcResultsA={bldgFuncSummaryTableContents[comparisonKey[0]]}
						funcResultsB={bldgFuncSummaryTableContents[comparisonKey[1]]}
					/>
				</Box>
			) : (
				<></>
			)}
		</Box>
	);
}

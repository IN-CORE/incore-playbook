import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getOutputFileContent, getOutputFileContentJSON } from "../../../utils/datawolf";
import { createBasicLayers, generateLayers } from "../../../utils/map";
import { comparisonKey } from "../../../globals";
import { FunctionalityTableCompare } from "../table/FunctionalityTableCompare";
import { FunctionalityGraphCompare } from "../graph/FunctionalityGraphCompare";
import MapCompare from "../map/MapCompare";
import { applyTransform } from "ol/extent";
import { fromLonLat, getTransform } from "ol/proj";

export default function BldgMCSCompare(props) {
	let { executionItems, datawolfDatasetConfigItems, hazardLayers } = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [mcsBldgSummaryTableContents, setMcsBldgSummaryTableContents] = useState({});
	const [damageLayersA, setDamageLayersA] = useState(null);
	const [damageLayersB, setDamageLayersB] = useState(null);

	const basicLayersA = createBasicLayers("Base Maps");
	const basicLayersB = createBasicLayers("Base Maps");

	// print container
	const printRef = useRef();

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
							datawolfDatasetConfigItem.datasetId
						);
						const layerDef = [
							{
								layerId: mcsBldgFailureProbINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.BldgMCS,
								title: "Building Functionality Probability without Interdependency",
								opacity: 1,
								zIndex: 1
							}
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
							datawolfDatasetConfigItem.datasetId
						);
						setMcsBldgSummaryTableContents((prevState) => ({
							...prevState,
							[comparisonKey[i]]: content
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
			<Box className="chartContainer">
				<Grid container spacing={3} justify="center">
					{Object.keys(mcsBldgSummaryTableContents).length >= 2 &&
					mcsBldgSummaryTableContents[comparisonKey[0]]["by_category"] &&
					mcsBldgSummaryTableContents[comparisonKey[1]]["by_category"] ? (
						<Grid item style={{ minWidth: "90%" }}>
							<FunctionalityGraphCompare
								categorySummaryA={mcsBldgSummaryTableContents[comparisonKey[0]]["by_category"]}
								categorySummaryB={mcsBldgSummaryTableContents[comparisonKey[1]]["by_category"]}
							/>
						</Grid>
					) : (
						<></>
					)}
				</Grid>
			</Box>

			{/*for map*/}
			{basicLayersA && basicLayersB && hazardLayers && damageLayersA && damageLayersB ? (
				<Container className="mapContainer" disableGutters style={{ height: `${mapHeight}px` }}>
					<MapCompare
						className="fillContainer"
						zoom={mapConfig.ZOOM}
						minZoom={mapConfig.MIN_ZOOM}
						maxZoom={mapConfig.MAX_ZOOM}
						extent={applyTransform(mapConfig.MAP_BOUNDS, getTransform("EPSG:4326", "EPSG:3857"))}
						center={fromLonLat(mapConfig.MAP_CENTER)}
						layersA={[basicLayersA, hazardLayers[comparisonKey[0]], damageLayersA]}
						layersB={[basicLayersB, hazardLayers[comparisonKey[1]], damageLayersB]}
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
			{Object.keys(mcsBldgSummaryTableContents).length >= 2 ? (
				<Box>
					<FunctionalityTableCompare
						funcResultsA={mcsBldgSummaryTableContents[comparisonKey[0]]}
						funcResultsB={mcsBldgSummaryTableContents[comparisonKey[1]]}
					/>
				</Box>
			) : (
				<>/</>
			)}
		</Box>
	);
}

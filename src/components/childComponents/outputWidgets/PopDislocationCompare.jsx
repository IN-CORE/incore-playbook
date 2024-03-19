import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	getOutputFileContent,
	getOutputFileContentJSON,
} from "../../../utils/datawolf";
import { createBasicLayers, generateLayers } from "../../../utils/map";
import { DislocationResultsTableCompare } from "../table/DislocationResultsTableCompare";
import { HuaResultsTableCompare } from "../table/HuaResultsTableCompare";
import MapCompare from "../map/MapCompare";
import { applyTransform } from "ol/extent";
import { fromLonLat, getTransform } from "ol/proj";

export default function PopDislocationCompare(props) {
	let { executionItems, datawolfDatasetConfigItems, hazardLayers } = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [totalDislTableContentA, setTotalDislTableContentA] = useState(null);
	const [totalDislTableContentB, setTotalDislTableContentB] = useState(null);
	const [dislocationByRaceContent, setDislocationByRaceContent] =
		useState(null);
	const [dislocationByTenureContent, setDislocationByTenureContent] =
		useState(null);
	const [dislocationByIncomeContent, setDislocationByIncomeContent] =
		useState(null);
	const [dislocationByHousingTypeContent, setDislocationByHousingTypeContent] =
		useState(null);
	const [popDislocationLayerA, setPopDislocationLayerA] = useState(null);
	const [popDislocationLayerB, setPopDislocationLayerB] = useState(null);

	// one layer can only be added to one map, so creating multiple objects is necessary
	const basicLayersA = createBasicLayers("Base Maps");
	const basicLayersB = createBasicLayers("Base Maps");

	const mapHeight = 300; // px

	useEffect(() => {
		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "popdislHeatmapINCOREId") {
						const popdislINCOREId = await getOutputFileContent(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						const tmpLayerDef = [
							{
								layerId: popdislINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.PopulationDislocation,
								title: "Population Dislocation",
								opacity: 1,
								zIndex: i + 1,
							},
						];
						const previewLayers = generateLayers(
							globalConfig,
							tmpLayerDef,
							"Population Dislocation",
						);
						if (i === 0) {
							setPopDislocationLayerA(previewLayers);
						} else {
							setPopDislocationLayerB(previewLayers);
						}
					} else if (vName === "totalDislTableContent") {
						if (i === 0) {
							setTotalDislTableContentA(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						} else if (i === 1) {
							setTotalDislTableContentB(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						}
					} else if (vName === "dislocationByRaceContent") {
						const content = await getOutputFileContentJSON(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						setDislocationByRaceContent((prevState) => ({
							...prevState,
							[globalConfig.comparisonKey[i]]: content,
						}));
					} else if (vName === "dislocationByTenureContent") {
						const content = await getOutputFileContentJSON(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						setDislocationByTenureContent((prevState) => ({
							...prevState,
							[globalConfig.comparisonKey[i]]: content,
						}));
					} else if (vName === "dislocationByIncomeContent") {
						const content = await getOutputFileContentJSON(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						setDislocationByIncomeContent((prevState) => ({
							...prevState,
							[globalConfig.comparisonKey[i]]: content,
						}));
					} else if (vName === "dislocationByHousingTypeContent") {
						const content = await getOutputFileContentJSON(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						setDislocationByHousingTypeContent((prevState) => ({
							...prevState,
							[globalConfig.comparisonKey[i]]: content,
						}));
					}
				}
			}
		};

		fetchData();
	}, [executionItems, datawolfDatasetConfigItems, hazardLayers]);

	return (
		<Box>
			{/*for map*/}
			{basicLayersA &&
			basicLayersB &&
			hazardLayers &&
			popDislocationLayerA &&
			popDislocationLayerB ? (
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
							hazardLayers[globalConfig.comparisonKey[0]],
							popDislocationLayerA,
						]}
						layersB={[
							basicLayersB,
							hazardLayers[globalConfig.comparisonKey[1]],
							popDislocationLayerB,
						]}
						layerSwitcherOptionsA={{}}
						layerSwitcherOptionsB={{}}
						height={mapHeight}
						allowBuildingSelection={true}
						activeLayerNames={"Population Dislocation"}
					/>
				</Container>
			) : (
				<></>
			)}

			<Grid container spacing={2} justify="center">
				<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
					{totalDislTableContentA &&
					totalDislTableContentB &&
					totalDislTableContentA["household_dislocation_in_total"] &&
					totalDislTableContentB["household_dislocation_in_total"] ? (
						<DislocationResultsTableCompare
							resultsJsonA={
								totalDislTableContentA["household_dislocation_in_total"]
							}
							resultsJsonB={
								totalDislTableContentB["household_dislocation_in_total"]
							}
							headers={["HOUSEHOLD", "% of HOUSEHOLD"]}
							title={"Household Dislocation - in Total"}
						/>
					) : (
						<></>
					)}
					{totalDislTableContentA &&
					totalDislTableContentB &&
					totalDislTableContentA["population_dislocation_in_total"] &&
					totalDislTableContentB["population_dislocation_in_total"] ? (
						<DislocationResultsTableCompare
							resultsJsonA={
								totalDislTableContentA["population_dislocation_in_total"]
							}
							resultsJsonB={
								totalDislTableContentB["population_dislocation_in_total"]
							}
							headers={["POPULATION", "% of POPULATION"]}
							title={"Population Dislocation - in Total"}
						/>
					) : (
						<></>
					)}
				</Grid>
				<Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
					{dislocationByIncomeContent &&
					dislocationByRaceContent &&
					dislocationByTenureContent &&
					dislocationByHousingTypeContent ? (
						<HuaResultsTableCompare
							resultsJsonA={{
								income:
									dislocationByIncomeContent[globalConfig.comparisonKey[0]],
								race: dislocationByRaceContent[globalConfig.comparisonKey[0]],
								tenure:
									dislocationByTenureContent[globalConfig.comparisonKey[0]],
								housingType:
									dislocationByHousingTypeContent[
										globalConfig.comparisonKey[0]
									],
							}}
							resultsJsonB={{
								income:
									dislocationByIncomeContent[globalConfig.comparisonKey[1]],
								race: dislocationByRaceContent[globalConfig.comparisonKey[1]],
								tenure:
									dislocationByTenureContent[globalConfig.comparisonKey[1]],
								housingType:
									dislocationByHousingTypeContent[
										globalConfig.comparisonKey[1]
									],
							}}
						/>
					) : (
						<></>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}

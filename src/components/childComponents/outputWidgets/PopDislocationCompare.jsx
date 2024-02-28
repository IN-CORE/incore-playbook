import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOutputFileContent, getOutputFileContentJSON } from "../../../utils/datawolf";
import { generateLayers } from "../../../utils/map";
import { DislocationResultsTableCompare } from "../table/DislocationResultsTableCompare";
import { HuaResultsTableCompare } from "../table/HuaResultsTableCompare";
import { comparisonKey } from "../../../globals";

export default function PopDislocationCompare(props) {
	let {
		executionItems,
		datawolfDatasetConfigItems,
		hazardLayers
	} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [totalDislTableContentA, setTotalDislTableContentA] = useState(null);
	const [totalDislTableContentB, setTotalDislTableContentB] = useState(null);
	const [dislocationByRaceContent, setDislocationByRaceContent] = useState(null);
	const [dislocationByTenureContent, setDislocationByTenureContent] = useState(null);
	const [dislocationByIncomeContent, setDislocationByIncomeContent] = useState(null);
	const [dislocationByHousingTypeContent, setDislocationByHousingTypeContent] = useState(null);
	const [damageLayers1, setDamageLayers1] = useState(null);
	const [damageLayers2, setDamageLayers2] = useState(null);

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
						const tmpLayerDef = [
							{
								layerId: bldgMaxDamageStateINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.PopulationDislocation.bldgMaxDamageStateINCOREId,
								title: "Building Damage",
								opacity: 1,
								zIndex: 1
							}
						];
						const previewLayers = generateLayers(globalConfig, tmpLayerDef);
						setDamageLayers1(previewLayers);
					} else if (vName === "popdislHeatmapINCOREId") {
						const popdislHeatmapINCOREId = await getOutputFileContent(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId
						);
						const tmpLayerDef = [
							{
								layerId: popdislHeatmapINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.PopulationDislocation.popdislHeatmapINCOREId,
								title: "Population Dislocation Heatmap",
								opacity: 0.8,
								zIndex: 2
							}
						];
						const previewLayers = generateLayers(globalConfig, tmpLayerDef, "Population Dislocation");
						setDamageLayers2(previewLayers);
					} else if (vName === "totalDislTableContent") {
						if (i === 0) {
							setTotalDislTableContentA(
								await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId)
							);
						} else if (i === 1) {
							setTotalDislTableContentB(
								await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId)
							);
						}
					} else if (vName === "dislocationByRaceContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setDislocationByRaceContent(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "dislocationByTenureContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setDislocationByTenureContent(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "dislocationByIncomeContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setDislocationByIncomeContent(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "dislocationByHousingTypeContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setDislocationByHousingTypeContent(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					}
				}
			}
		};

		fetchData();
	}, [executionItems, datawolfDatasetConfigItems, hazardLayers]);

	return (
		<Box style={{ padding: "50px 25px" }}>
			<Grid container spacing={2} justify="center">
				<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
					{totalDislTableContentA && totalDislTableContentB &&
                    totalDislTableContentA["household_dislocation_in_total"] &&
                    totalDislTableContentB["household_dislocation_in_total"]
						? (
							<DislocationResultsTableCompare
								resultsJsonA={totalDislTableContentA["household_dislocation_in_total"]}
								resultsJsonB={totalDislTableContentB["household_dislocation_in_total"]}
								headers={["HOUSEHOLD", "% of HOUSEHOLD"]}
								title={"Household Dislocation - in Total"}
							/>
						) : (
							<></>
						)}
					{totalDislTableContentA && totalDislTableContentB &&
                    totalDislTableContentA["population_dislocation_in_total"] &&
                    totalDislTableContentB["population_dislocation_in_total"]
						? (
							<DislocationResultsTableCompare
								resultsJsonA={totalDislTableContentA["population_dislocation_in_total"]}
								resultsJsonB={totalDislTableContentB["population_dislocation_in_total"]}
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
									income: dislocationByIncomeContent[comparisonKey[0]],
									race: dislocationByRaceContent[comparisonKey[0]],
									tenure: dislocationByTenureContent[comparisonKey[0]],
									housingType: dislocationByHousingTypeContent[comparisonKey[0]]
								}}
								resultsJsonB={{
									income: dislocationByIncomeContent[comparisonKey[1]],
									race: dislocationByRaceContent[comparisonKey[1]],
									tenure: dislocationByTenureContent[comparisonKey[1]],
									housingType: dislocationByHousingTypeContent[comparisonKey[1]]
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

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { IncoreTitle } from "./styledComponents/IncoreTitle";
import { getExecution } from "../utils/datawolf";
import { useQuery } from "./customHooks/useQuery";
import { useSelector } from "react-redux";
import { getHazardMetadata } from "../utils/hazard";
import { getHazardGroupLayers } from "../utils/map";
import { registeredCompareWidgets } from "./childComponents/outputWidgets/RegisteredCompareWidgets";
import { comparisonKey } from "../globals";
import { IncoreMenuItem, IncoreSelectBox } from "./styledComponents/IncoreSelect";
import { IncoreInputLabel } from "./styledComponents/IncoreInputLabel";

export const CompareAnalyses = () => {

	const [executionsCompared, setExecutionsCompared] = useState([]);
	const [hazardGroupLayers, setHazardGroupLayers] = useState({}); // group layers of hazard to overlay on the map
	const [selectedWidgetName, setSelectedWidgetName] = useState("ResilienceMetrics"); // outputWidgets name
	const [datawolfDatasetConfigItems, setDatawolfDatasetConfigItems] = useState([]); // datawolf dataset config items
	const [widgetList, setWidgetList] = useState([]); // list of outputWidgets names

	const query = useQuery();
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);

	useEffect(() => {
		const fetchExecutions = async () => {
			const executionIds = query.get("executionIds").split(",");
			if (executionIds && executionIds.length > 0) {
				const temp = await Promise.all(executionIds.map(async (executionId) => {
					return getExecution(datawolfConfig, executionId);
				}));
				setExecutionsCompared(temp);
			}
		};

		fetchExecutions();

		setWidgetList(
			datawolfWorkflowConfig.outputs.datasets[0].datasetsMap.reduce((list, item) => {
				if (!list.includes(item.datasets.widget)) {
					return [...list, item.datasets.widget];
				} else {
					return list;
				}
			}, [])
		);
	}, []);

	useEffect(() => {
		const gatherHazardInfo = async () => {
			if (executionsCompared && executionsCompared.length >= 2) {

				for (let i = 0; i < executionsCompared.length; i++) {
					const hazardInfo = _getHazardInfo(executionsCompared[i]);
					const hazardMetadata = await getHazardMetadata(globalConfig, hazardInfo.hazardType, hazardInfo.hazardId);
					setHazardGroupLayers(prevState => ({
						...prevState,
						[comparisonKey[i]]: getHazardGroupLayers(globalConfig, mapConfig, hazardMetadata, hazardInfo.hazardType, 0, 0.5)
					}));
				}
			}
		};

		gatherHazardInfo();
	}, [executionsCompared]);

	useEffect(() => {
		setDatawolfDatasetConfigItems(
			datawolfWorkflowConfig.outputs.datasets[0].datasetsMap.reduce((list, item) => {
				if (selectedWidgetName === "ResilienceMetrics") {
					if (
						item.datasets.widget === "CGE" ||
                        item.datasets.widget === "PopDislocation" ||
                        item.datasets.widget === "BldgFunctionality"
					) {
						return [...list, item];
					}
				}
				if (selectedWidgetName === "Interdependency") {
					if (item.datasets.widget === "SubstationDamage") {
						return [...list, item];
					}
				}
				if (selectedWidgetName === "PopDislocation") {
					if (item.datasets.widget === selectedWidgetName || item.datasets.widget === "BldgDamage") {
						return [...list, item];
					}
				} else {
					if (item.datasets.widget === selectedWidgetName) {
						return [...list, item];
					}
				}

				return list;
			}, [])
		);
	}, [selectedWidgetName]);

	const _getHazardInfo = (executionItem) => {
		return datawolfWorkflowConfig.inputs.parameters.reduce((hazardInfo, p) => {
			if (p.variableName === "selectedHazardId") {
				return { ...hazardInfo, hazardId: executionItem["parameters"][p.parametersMap[0].paramId] };
			} else if (p.variableName === "selectedHazardType") {
				return { ...hazardInfo, hazardType: executionItem["parameters"][p.parametersMap[0].paramId] };
			} else {
				return hazardInfo;
			}
		}, {});
	};

	return (
		<div className="firstDivInContent">
			<Box className="outerBox">
				<Box className="innerBox">
					{
						executionsCompared && executionsCompared.length >= 2 ?
							<Box display="flex" sx={{ justifyContent: "space-between" }}>
								<Box>
									<IncoreTitle style={{ display: "inline" }}>
                                        Compare Analyses {comparisonKey[0]}:&nbsp;
										<Typography style={{ display: "inline", color: "#00619D", fontWeight: 500 }}>
											{executionsCompared[0]["title"] ?? ""}
										</Typography> and {comparisonKey[1]}:&nbsp;
										<Typography style={{ display: "inline", color: "#00619D", fontWeight: 500 }}>
											{executionsCompared[1]["title"] ?? ""}
										</Typography>
									</IncoreTitle>
								</Box>
								{/*select compare analysis result*/}
								<Box>
									<IncoreInputLabel>Select Analysis Result</IncoreInputLabel>
									<IncoreSelectBox
										labelId="label"
										id="select"
										variant="outlined"
										onChange={(e) => {
											setSelectedWidgetName(e.target.value);
										}}
										value={selectedWidgetName}
									>
										{
											widgetList.includes("CGE") &&
                                            widgetList.includes("PopDislocation") &&
                                            widgetList.includes("BldgFunctionality") ?
												<IncoreMenuItem key="ResilienceMetrics" value="ResilienceMetrics">
                                                    Resilience Metrics
												</IncoreMenuItem> : <></>
										}
										{
											widgetList.includes("SubstationDamage") ?
												<IncoreMenuItem key="SubstationDamage" value="SubstationDamage">
                                                    Substation Damage (Electrical Power Network)
												</IncoreMenuItem> : <></>
										}
										{
											widgetList.includes("PoleDamage") ?
												<IncoreMenuItem key="PoleDamage" value="PoleDamage">
                                                    Pole Damage (Electrical Power Network)
												</IncoreMenuItem> : <></>
										}
										{
											widgetList.includes("BldgDamage") ?
												<IncoreMenuItem key="BldgDamage" value="BldgDamage">
                                                    Building Damage
												</IncoreMenuItem> : <></>
										}
										{
											widgetList.includes("BldgMCS") ?
												<IncoreMenuItem key="BldgMCS" value="BldgMCS">
                                                    Building Functionality (without Electrical Power Dependency)
												</IncoreMenuItem> : <></>
										}
										{
											widgetList.includes("BldgFunctionality") ?
												<IncoreMenuItem key="BldgFunctionality" value="BldgFunctionality">
                                                    Building Functionality (with Electrical Power Dependency)
												</IncoreMenuItem> : <></>
										}
										{
											widgetList.includes("SectorShocks") ?
												<IncoreMenuItem key="SectorShocks" value="SectorShocks">
                                                    Capital Shocks
												</IncoreMenuItem> : <></>
										}
										{
											widgetList.includes("CGE") ?
												<IncoreMenuItem key="CGE" value="CGE">
                                                    Economic Prediction Model (Computable General Equilibrium)
												</IncoreMenuItem> : <></>
										}
										{
											widgetList.includes("PopDislocation") ?
												<IncoreMenuItem key="PopDislocation" value="PopDislocation">
                                                    Population Dislocation
												</IncoreMenuItem> : <></>
										}
										{
											widgetList.includes("HHS") ?
												<IncoreMenuItem key="HHS" value="HHS">
                                                    Housing Recovery
												</IncoreMenuItem> : <></>
										}
									</IncoreSelectBox>
								</Box>
							</Box>
							:
							<></>
					}
					{/*for individual analysis result preview*/}
					{selectedWidgetName &&
                    executionsCompared && executionsCompared.length >= 2 &&
                    datawolfDatasetConfigItems.length > 0 &&
                    Object.keys(hazardGroupLayers).length > 0 ? (
							<Box style={{ margin: "2em" }}>
								{(() => {
									return React.cloneElement(registeredCompareWidgets[selectedWidgetName], {
										executionItems: executionsCompared,
										datawolfDatasetConfigItems: datawolfDatasetConfigItems,
										hazardLayers: hazardGroupLayers
									});
								})()
								}
							</Box>
						) : (
							<></>
						)}
				</Box>
			</Box>
		</div>
	);
};

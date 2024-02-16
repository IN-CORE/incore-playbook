import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { IncoreTitle } from "./styledComponents/IncoreTitle";
import { getExecution } from "../utils/datawolf";
import { useQuery } from "./customHooks/useQuery";
import { useSelector } from "react-redux";
import { getHazardMetadata } from "../utils/hazard";
import { getHazardGroupLayers } from "../utils/map";
import { registeredCompareWidgets } from "./childComponents/outputWidgets/RegisteredCompareWidgets";
import { comparisonKey } from "../globals";

export const CompareAnalyses = () => {

	const [errorAlertOpen, setErrorAlertOpen] = useState(false);
	const [executionsCompared, setExecutionsCompared] = useState([]);
	const [hazardGroupLayers, setHazardGroupLayers] = useState({}); // group layers of hazard to overlay on the map
	const [widgetName, setWidgetName] = useState("BldgDamage"); // outputWidgets name
	const [datawolfDatasetConfigItems, setDatawolfDatasetConfigItems] = useState([]); // datawolf dataset config items

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
				if (widgetName === "ResilienceMetrics") {
					if (
						item.datasets.widget === "CGE" ||
						item.datasets.widget === "PopDislocation" ||
						item.datasets.widget === "BldgFunctionality"
					) {
						return [...list, item];
					}
				}
				if (widgetName === "Interdependency") {
					if (item.datasets.widget === "SubstationDamage") {
						return [...list, item];
					}
				}
				if (widgetName === "PopDislocation") {
					if (item.datasets.widget === widgetName || item.datasets.widget === "BldgDamage") {
						return [...list, item];
					}
				} else {
					if (item.datasets.widget === widgetName) {
						return [...list, item];
					}
				}

				return list;
			}, [])
		);
	}, [widgetName]);

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
				<Grid container spacing={3} className="innerBox">
					{
						executionsCompared && executionsCompared.length >= 2 ?
							<IncoreTitle>Compare
								Analyses {comparisonKey[0]}: {executionsCompared[0]["title"] ?? ""} and
							{comparisonKey[1]}: {executionsCompared[1]["title"] ?? ""}</IncoreTitle> :
							<></>
					}
					{/*for individual analysis result preview*/}
					{widgetName &&
					executionsCompared && executionsCompared.length >= 2 &&
					datawolfDatasetConfigItems.length > 0 &&
					Object.keys(hazardGroupLayers).length > 0 ? (
							(() => {
								return React.cloneElement(registeredCompareWidgets[widgetName], {
									executionItems: executionsCompared,
									datawolfDatasetConfigItems: datawolfDatasetConfigItems,
									hazardLayers: hazardGroupLayers
								});
							})()
						) : (
							<></>
						)}
				</Grid>
			</Box>
		</div>
	);
};

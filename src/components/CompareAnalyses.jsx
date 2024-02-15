import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { Layout } from "./Layout";

import { AlertMessage } from "./childComponents/alert/AlertMessage";
import { IncoreTitle } from "./styledComponents/IncoreTitle";
import { getExecution } from "../utils/datawolf";
import { useQuery } from "./customHooks/useQuery";
import { useSelector } from "react-redux";
import { registeredWidgets } from "./childComponents/outputWidgets/RegisteredWidgets";
import { getHazardMetadata } from "../utils/hazard";
import { getHazardGroupLayers } from "../utils/map";

export const CompareAnalyses = () => {

	const [errorAlertOpen, setErrorAlertOpen] = useState(false);
	const [errorStatus, setErrorStatus] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [executionsCompared, setExecutionsCompared] = useState([]);
	const [hazardGroupLayer, setHazardGroupLayer] = useState(); // group layer of hazard to overlay on the map
	const [hazardType, setHazardType] = useState(""); // used in runtime table
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
			const hazardInfo = _getHazardInfo(executionsCompared[0]);
			let hazardMetadata = await getHazardMetadata(globalConfig, hazardInfo.hazardType, hazardInfo.hazardId);
			setHazardGroupLayer(
				getHazardGroupLayers(globalConfig, mapConfig, hazardMetadata, hazardInfo.hazardType, 0, 0.5)
			);
			setHazardType(hazardInfo["hazardType"]);
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
		<Layout>
			<div className="firstDivInContent">
				<Box className="outerBox">
					<Grid container spacing={3} className="innerBox">
						{
							executionsCompared && executionsCompared.length >= 2 ?
								<IncoreTitle>Compare Analyses A: {executionsCompared[0]["title"] ?? ""} and
                                    B: {executionsCompared[1]["title"] ?? ""}</IncoreTitle> :
								<></>
						}
						{/*for individual analysis result preview*/}
						{widgetName &&
                        executionsCompared && executionsCompared.length >= 2 &&
                        datawolfDatasetConfigItems.length > 0 &&
                        hazardType &&
                        hazardGroupLayer ? (
								(() => {
									return React.cloneElement(registeredWidgets[widgetName], {
										executionItem: executionsCompared[0],
										getExecution: getExecution,
										previewOn: true,
										handlePreviewClose: null,
										datawolfDatasetConfigItems: datawolfDatasetConfigItems,
										hazardType: hazardType,
										hazardLayers: hazardGroupLayer,
										setDownloadDialogOpen: false
									});
								})()
							) : (
								<></>
							)}
						<AlertMessage
							open={errorAlertOpen}
							setOpen={setErrorAlertOpen}
							message={errorMessage}
							alertSeverity={"error"}
							status={errorStatus}
						/>
					</Grid>
				</Box>
			</div>
		</Layout>
	);
};

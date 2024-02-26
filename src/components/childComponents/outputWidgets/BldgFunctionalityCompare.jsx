import { Box } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getOutputFileContent, getOutputFileContentJSON } from "../../../utils/datawolf";
import { generateLayers } from "../../../utils/map";
import { comparisonKey } from "../../../globals";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { FunctionalityTableCompare } from "../table/FunctionalityTableCompare";

export default function BldgFunctionality(props) {
	let {
		executionItems,
		datawolfDatasetConfigItems,
		hazardLayers
	} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [bldgFuncSummaryTableContents, setBldgFuncSummaryTableContents] = useState({});
	const [damageLayers, setDamageLayers] = useState(null);

	// print container
	const printRef = useRef();

	useEffect(() => {

		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "bldgFuncProbINCOREId") {
						const bldgFuncProbINCOREId = await getOutputFileContent(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId
						);
						const layerDef = [
							{
								layerId: bldgFuncProbINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.BldgFunctionality,
								title: "Building Functionality Probability",
								opacity: 1,
								zIndex: 1
							}
						];
						const previewLayers = generateLayers(globalConfig, layerDef);
						setDamageLayers(previewLayers);
					} else if (vName === "bldgFuncSummaryTableContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setBldgFuncSummaryTableContents(prevState => ({
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
			{/*/!*for map*!/*/}
			{/*{basicLayers && hazardLayers && damageLayers ? (*/}
			{/*	<Container className="mapContainer" disableGutters>*/}
			{/*		<Map*/}
			{/*			className="fillContainer"*/}
			{/*			zoom={mapConfig.ZOOM}*/}
			{/*			minZoom={mapConfig.MIN_ZOOM}*/}
			{/*			maxZoom={mapConfig.MAX_ZOOM}*/}
			{/*			extent={applyTransform(mapConfig.MAP_BOUNDS, getTransform("EPSG:4326", "EPSG:3857"))}*/}
			{/*			center={fromLonLat(mapConfig.MAP_CENTER)}*/}
			{/*			layers={[basicLayers, hazardLayers, damageLayers]}*/}
			{/*			layerSwitcherOptions={{}}*/}
			{/*		/>*/}
			{/*	</Container>*/}
			{/*) : (*/}
			{/*	<></>*/}
			{/*)}*/}

			{/*for table*/}
			{Object.keys(bldgFuncSummaryTableContents).length >= 2 ? (
				<Box>
					<FunctionalityTableCompare funcResultsA={bldgFuncSummaryTableContents[comparisonKey[0]]}
						funcResultsB={bldgFuncSummaryTableContents[comparisonKey[1]]} />
				</Box>
			) : (
				<>/</>
			)}

			{/*Print*/}
			<IncoreButtonText
				onClick={() => {
					downloadImg(printRef.current, "Building_Functionality");
				}}
				startIcon={<CameraAltIcon />}
			>
                Image
			</IncoreButtonText>
		</Box>
	);
}

import { Box, Container, Grid } from "@material-ui/core";
import { fromLonLat, getTransform } from "ol/proj";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { applyTransform } from "ol/extent";
import { getOutputFileContent } from "../../../utils/datawolf";
import { basicLayers, generateLayers, createBasicLayers } from "../../../utils/map";
import { comparisonKey } from "../../../globals";
import MapCompare from "../map/MapCompare";

export default function PoleDamageCompare(props) {
	let {
		executionItems,
		datawolfDatasetConfigItems,
		hazardLayers,
	} = props;

	const mapConfig = useSelector((state) => state.config.mapConfig);
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [damageLayersA, setDamageLayersA] = useState(null);
	const [damageLayersB, setDamageLayersB] = useState(null);

	// one layer can only be added to one map, so creating multiple objects is necessary
	const basicLayersA = createBasicLayers("Base Maps");
	const basicLayersB = createBasicLayers("Base Maps");

	const mapHeight = 500; // px

	useEffect(() => {
		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "poleMaxDmgStateINCOREId") {
						const poleMaxDmgStateINCOREId = await getOutputFileContent(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId
						);
						const layerDef = [
							{
								layerId: poleMaxDmgStateINCOREId,
								layerStyles: mapConfig.LAYER_STYLES.PoleDamage,
								title: "EPF Damage (Pole)",
								opacity: 1,
								zIndex: 1
							}
						];
						const previewLayers = await generateLayers(globalConfig, layerDef);
						if (i === 0) {
							setDamageLayersA(previewLayers);
						} else {
							setDamageLayersB(previewLayers);
						}
					}
				}
			}
		};

		fetchData();
	}, [executionItems, datawolfDatasetConfigItems, hazardLayers]);

	return (
		<Box style={{ padding: "5px 25px 25px 25px" }}>
			<Grid container spacing={3} justify="center">
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
			</Grid>
		</Box>
	);
}

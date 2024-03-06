import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getOutputFileContent } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import SectorShocksBarChartCompare from "../graph/SectorShocksBarChartCompare";

export default function SectorShocksCompare(props) {
	let { executionItems, datawolfDatasetConfigItems } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const [sectorShocksContentA, setSectorShocksContentA] = useState(null);
	const [sectorShocksContentB, setSectorShocksContentB] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "sectorShocksDownload") {
						if (i === 0) {
							setSectorShocksContentA(
								await getOutputFileContent(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						} else if (i === 1) {
							setSectorShocksContentB(
								await getOutputFileContent(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						}
					}
				}
			}
		};

		fetchData();
	}, [executionItems, datawolfDatasetConfigItems]);

	return (
		<Box>
			{/*table and barchart*/}
			{(() => {
				if (sectorShocksContentA && sectorShocksContentB) {
					return (
						<SectorShocksBarChartCompare
							dataA={sectorShocksContentA}
							dataB={sectorShocksContentB}
							xAxisLegend="Sectors"
							yAxisLegend="Capital Shocks"
						/>
					);
				}
			})()}
		</Box>
	);
}

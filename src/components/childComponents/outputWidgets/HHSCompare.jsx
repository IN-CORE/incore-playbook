import React, { useEffect, useState } from "react";

import { Box, Container, Grid } from "@material-ui/core";
import { getOutputFileContentJSON } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import HhsDescription from "../step/HhsDescription";
import HhsSlider from "../form/HhsSlider";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";
import HHSBarChartCompare from "../graph/HHSBarChartCompare";

export default function HHSCompare(props) {
	let { executionItems, datawolfDatasetConfigItems } = props;
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const [marks, setMarks] = useState([
		{
			value: 1,
			label: "0"
		},
		{
			value: 7,
			label: "6"
		},
		{
			value: 13,
			label: "12"
		},
		{
			value: 25,
			label: "24"
		},
		{
			value: 49,
			label: "48"
		}
	]);

	const [HHSBarChartContentA, setHHSBarChartContentA] = useState({ 1: [], 7: [], 13: [], 25: [], 49: [] });
	const [HHSBarChartContentB, setHHSBarChartContentB] = useState({ 1: [], 7: [], 13: [], 25: [], 49: [] });
	const [t, setT] = useState("1");

	useEffect(() => {
		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "HHSBarChartContent") {
						if (i === 0) {
							setHHSBarChartContentA(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId
								)
							);
						} else if (i === 1) {
							setHHSBarChartContentB(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId
								)
							);
						}
					}
				}
			}
		};

		fetchData();
	}, [executionItems, datawolfDatasetConfigItems]);

	return (
		<Box style={{ padding: "5px 25px 25px 25px" }}>
			<Grid container spacing={3} justify="center">
				<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
					{/*Sliders*/}
					<Container style={{ width: "80%", margin: 0 }}>
						<IncoreInputLabel id="discrete-slider-restrict" gutterBottom>
							Months after the disaster
						</IncoreInputLabel>
						<HhsSlider
							marks={marks}
							value={t}
							handleChange={(e, newValue) => {
								setT(newValue);
							}}
						/>
					</Container>
					{HHSBarChartContentA && HHSBarChartContentB ? (
						<HHSBarChartCompare
							dataA={HHSBarChartContentA[t]}
							dataB={HHSBarChartContentB[t]}
							height={"25em"}
							xAxisLegend="Housing Recovery Stage"
							yAxisLegend="Frequency"
						/>
					) : null}
				</Grid>
				{/*description*/}
				<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
					<HhsDescription />
				</Grid>
			</Grid>
		</Box>
	);
}

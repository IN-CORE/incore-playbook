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
	const [marksA, setMarksA] = useState([]);
	const [marksB, setMarksB] = useState([]);
	const [HHSBarChartContentA, setHHSBarChartContentA] = useState({});
	const [HHSBarChartContentB, setHHSBarChartContentB] = useState({});
	const [t, setT] = useState("1");

	useEffect(() => {
		const fetchData = async () => {
			for (const datawolfDatasetConfigItem of datawolfDatasetConfigItems) {
				const vName = datawolfDatasetConfigItem.datasets.variableName;
				for (let i = 0; i < executionItems.length; i++) {
					if (vName === "HHSBarChartContent") {
						const content = await getOutputFileContentJSON(
							datawolfConfig,
							executionItems[i],
							datawolfDatasetConfigItem.datasetId,
						);
						const marks = Object.keys(content).map((key) => ({
							value: parseInt(key),
							label: `${parseInt(key) - 1}`,
						}));
						if (i === 0) {
							setHHSBarChartContentA(content);
							setMarksA(marks);
						} else if (i === 1) {
							setHHSBarChartContentB(content);
							setMarksB(marks);
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
					{Object.keys(HHSBarChartContentA).length > 0 &&
					Object.keys(HHSBarChartContentB).length > 0 &&
					marksA.length > 0 &&
					marksB.length > 0 ? (
						<>
							{/*Sliders*/}
							<Container style={{ width: "80%", margin: 0 }}>
								<IncoreInputLabel id="discrete-slider-restrict" gutterBottom>
									Months after the disaster
								</IncoreInputLabel>
								<HhsSlider
									// pick the overlapping resolution
									marks={marksB.length < marksA.length ? marksB : marksA}
									value={t}
									handleChange={(e, newValue) => {
										setT(newValue);
									}}
								/>
							</Container>
							<HHSBarChartCompare
								dataA={HHSBarChartContentA[t]}
								dataB={HHSBarChartContentB[t]}
								height={"25em"}
								xAxisLegend="Housing Recovery Stage"
								yAxisLegend="Frequency"
							/>
						</>
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

import React from "react";
import { useSelector } from "react-redux";
import { Box, Container, Grid } from "@material-ui/core";

import CgeDescription from "../step/CgeDescription";
import CGEBarChartCompare from "../graph/CGEBarChartCompare";
import { CGEResultsTableCompare } from "../table/CGEResultsTableCompare";
import {
	IncoreMenuItem,
	IncoreSelectBox,
} from "../../styledComponents/IncoreSelect";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";
import { getOutputFileContentJSON } from "../../../utils/datawolf";

export default function CGECompare({
	executionItems,
	datawolfDatasetConfigItems,
}) {
	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [cgeType, setCgeType] = React.useState("totalHouseholdIncome");
	const [region, setRegion] = React.useState(
		globalConfig["allowedRegions"]
			? globalConfig["allowedRegions"][0].value
			: null,
	);

	const [selectedExecutionNames, setSelectedExecutionNames] = React.useState(
		[],
	);

	const [cgeHouseholdIncomeContentA, setCgeHouseholdIncomeContentA] =
		React.useState(null);
	const [cgeDomesticSupplyContentA, setCgeDomesticSupplyContentA] =
		React.useState(null);
	const [cgeEmploymentContentA, setCgeEmploymentContentA] =
		React.useState(null);

	const [cgeHouseholdIncomeContentB, setCgeHouseholdIncomeContentB] =
		React.useState(null);
	const [cgeDomesticSupplyContentB, setCgeDomesticSupplyContentB] =
		React.useState(null);
	const [cgeEmploymentContentB, setCgeEmploymentContentB] =
		React.useState(null);

	React.useEffect(() => {
		setSelectedExecutionNames(
			executionItems.map((executionItem) => executionItem["title"]),
		);

		const fetchData = async () => {
			for (let i = 0; i < executionItems.length; i++) {
				datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
					const vName = datawolfDatasetConfigItem.datasets.variableName;
					if (vName === "cgeHouseholdIncomeContent") {
						if (i === 0) {
							setCgeHouseholdIncomeContentA(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						} else {
							setCgeHouseholdIncomeContentB(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						}
					} else if (vName === "cgeDomesticSupplyContent") {
						if (i === 0) {
							setCgeDomesticSupplyContentA(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						} else {
							setCgeDomesticSupplyContentB(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						}
					} else if (vName === "cgeEmploymentContent") {
						if (i === 0) {
							setCgeEmploymentContentA(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						} else {
							setCgeEmploymentContentB(
								await getOutputFileContentJSON(
									datawolfConfig,
									executionItems[i],
									datawolfDatasetConfigItem.datasetId,
								),
							);
						}
					}
				});
			}
		};

		fetchData();
	}, [executionItems, datawolfDatasetConfigItems]);

	return (
		<Box style={{ padding: "5px 25px 25px 25px" }}>
			<Grid container spacing={3} justify="center">
				<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
					{/*dropdown*/}
					<Box display="flex" justifyContent="flex-start">
						<Container>
							<Box flexGrow={2}>
								<IncoreInputLabel>Select A Category</IncoreInputLabel>
								<IncoreSelectBox
									labelId="label"
									id="select"
									variant="outlined"
									onChange={(e) => {
										setCgeType(e.target.value);
									}}
									value={cgeType}
									style={{ maxWidth: "500px" }}
								>
									<IncoreMenuItem
										value="totalHouseholdIncome"
										key="totalHouseholdIncome"
									>
										Total Household Income
									</IncoreMenuItem>
									<IncoreMenuItem value="domesticSupply" key="domesticSupply">
										Domestic Supply
									</IncoreMenuItem>
									<IncoreMenuItem value="employment" key="employment">
										Employment
									</IncoreMenuItem>
								</IncoreSelectBox>
							</Box>
						</Container>

						{/*regions*/}
						<Container>
							{globalConfig["allowedRegions"] ? (
								<Box flexGrow={1}>
									<IncoreInputLabel>Select A Region</IncoreInputLabel>
									<IncoreSelectBox
										labelId="label"
										id="select"
										variant="outlined"
										onChange={(e) => {
											setRegion(e.target.value);
										}}
										value={region}
										style={{ maxWidth: "500px" }}
									>
										{globalConfig["allowedRegions"]
											? globalConfig["allowedRegions"].map((allowedRegion) => {
													return (
														<IncoreMenuItem
															value={allowedRegion.value}
															key={allowedRegion}
														>
															{allowedRegion.name}
														</IncoreMenuItem>
													);
											  })
											: null}
									</IncoreSelectBox>
								</Box>
							) : null}
						</Container>
					</Box>

					{/*table and barchart*/}
					{/*TODO CGE Result table left to implement*/}
					{(() => {
						if (
							cgeType === "totalHouseholdIncome" &&
							cgeHouseholdIncomeContentA &&
							cgeHouseholdIncomeContentB
						) {
							return (
								<>
									<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
										<CGEBarChartCompare
											region={region}
											data={[
												cgeHouseholdIncomeContentA,
												cgeHouseholdIncomeContentB,
											]}
											executionTitles={selectedExecutionNames}
											height="30em"
										/>
									</Box>
									<Box>
										<CGEResultsTableCompare
											region={region}
											resultsJsonArr={[
												cgeHouseholdIncomeContentA,
												cgeHouseholdIncomeContentB,
											]}
										/>
									</Box>
								</>
							);
						} else if (
							cgeType === "domesticSupply" &&
							cgeDomesticSupplyContentA &&
							cgeDomesticSupplyContentB
						) {
							return (
								<>
									<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
										<CGEBarChartCompare
											region={region}
											data={[
												cgeDomesticSupplyContentA,
												cgeDomesticSupplyContentB,
											]}
											executionTitles={selectedExecutionNames}
											yAxisLegend="Million of $"
											height="30em"
										/>
									</Box>
									<Box>
										<CGEResultsTableCompare
											region={region}
											resultsJsonArr={[
												cgeDomesticSupplyContentA,
												cgeDomesticSupplyContentB,
											]}
											yAxisLegend="Person"
										/>
									</Box>
								</>
							);
						} else if (
							cgeType === "employment" &&
							cgeEmploymentContentA &&
							cgeEmploymentContentB
						) {
							return (
								<>
									<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
										<CGEBarChartCompare
											region={region}
											data={[cgeEmploymentContentA, cgeEmploymentContentB]}
											executionTitles={selectedExecutionNames}
											title="Employment"
											height="30em"
										/>
									</Box>
									<Box>
										<CGEResultsTableCompare
											region={region}
											resultsJsonArr={[
												cgeEmploymentContentA,
												cgeEmploymentContentB,
											]}
										/>
									</Box>
								</>
							);
						}
					})()}
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
					{/*description*/}
					<CgeDescription cgeMetrics={cgeType} />
				</Grid>
			</Grid>
		</Box>
	);
}

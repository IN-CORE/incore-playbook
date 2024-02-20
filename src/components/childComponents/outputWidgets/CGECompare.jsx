import React from 'react'
import { useSelector } from "react-redux";
import { Box, Container, Grid } from "@material-ui/core";

import CgeDescription from "../step/CgeDescription";
import CGEBarChart from "../graph/CGEBarChart";
import { CgeResultsTable } from "../table/CgeResultsTable";
import { IncoreMenuItem, IncoreSelectBox } from "../../styledComponents/IncoreSelect";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";
import { getOutputFileContentJSON } from "../../../utils/datawolf";
import { set } from 'ol/transform';

export default function CGECompare({ executionItems, datawolfDatasetConfigItems }) {

    const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

    const [cgeType, setCgeType] = React.useState("totalHouseholdIncome");
	const [region, setRegion] = React.useState(
		globalConfig["allowedRegions"] ? globalConfig["allowedRegions"][0].value : null
	);

    const [cgeHouseholdIncomeContentA, setCgeHouseholdIncomeContentA] = React.useState(null);
	const [cgeDomesticSupplyContentA, setCgeDomesticSupplyContentA] = React.useState(null);
	const [cgeEmploymentContentA, setCgeEmploymentContentA] = React.useState(null);
    
    const [cgeHouseholdIncomeContentB, setCgeHouseholdIncomeContentB] = React.useState(null);
	const [cgeDomesticSupplyContentB, setCgeDomesticSupplyContentB] = React.useState(null);
	const [cgeEmploymentContentB, setCgeEmploymentContentB] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {

            for (let i = 0; i < executionItems.length; i++) {
                console.log("executionItems[i]: ", executionItems[i])
                datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
                    const vName = datawolfDatasetConfigItem.datasets.variableName;
                    console.log("vName: ", vName)
                    if (vName === "cgeHouseholdIncomeContent") {
                        if (i === 0) {
                            setCgeHouseholdIncomeContentA(
                                await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId)
                            );
                        } else {
                            setCgeHouseholdIncomeContentB(
                                await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId)
                            );
                        }
                    } else if (vName === "cgeDomesticSupplyContent") {
                        if (i === 0) {
                            setCgeDomesticSupplyContentA(
                                await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId)
                            );
                        } else {
                            setCgeDomesticSupplyContentB(
                                await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId)
                            );
                        }
                    } else if (vName === "cgeEmploymentContent") {
                        if (i === 0) {
                            setCgeEmploymentContentA(
                                await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId)
                            );
                        } else {
                            setCgeEmploymentContentB(
                                await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId)
                            );
                        }
                    }
                })
            }

		};

        fetchData();

    }, [])

    return (
        <Box style={{ padding: "5px 25px 25px 25px" }}>
        {console.log(cgeHouseholdIncomeContent)}
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
									<IncoreMenuItem value="totalHouseholdIncome" key="totalHouseholdIncome">
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
					{/*TODO for some reason barchart unit not working*/}
					{(() => {
						if (cgeType === "totalHouseholdIncome" && cgeHouseholdIncomeContentA) {
							return (
								<>
									<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
										<CGEBarChart
											region={region}
											data={cgeHouseholdIncomeContentA}
											height="25em"
										/>
									</Box>
									<Box>
										<CgeResultsTable
											region={region}
											resultsJson={cgeHouseholdIncomeContentA}
										/>
									</Box>
								</>
							);
						} else if (cgeType === "domesticSupply" && cgeDomesticSupplyContentA) {
							return (
								<>
									<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
										<CGEBarChart
											region={region}
											data={cgeDomesticSupplyContentA}
											yAxisLegend="Million of $"
											height="25em"
										/>
									</Box>
									<Box>
										<CgeResultsTable
											region={region}
											resultsJson={cgeDomesticSupplyContentA}
											yAxisLegend="Person"
										/>
									</Box>
								</>
							);
						} else if (cgeType === "employment" && cgeEmploymentContentA) {
							return (
								<>
									<Box style={{ margin: "50px 0", maxWidth: "700px" }}>
										<CGEBarChart
											region={region}
											data={cgeEmploymentContentA}
											title="Employment"
											height="25em"
										/>
									</Box>
									<Box>
										<CgeResultsTable region={region} resultsJson={cgeEmploymentContentA} />
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
    )

}

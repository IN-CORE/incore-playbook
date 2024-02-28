import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getOutputFileContentJSON } from "../../../utils/datawolf";
import { useSelector } from "react-redux";
import { IncoreButtonText } from "../../styledComponents/IncoreButtonText";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import FormLabel from "@material-ui/core/FormLabel";
import { IncoreRadioGroup } from "../form/IncoreRadioGroup";
import { comparisonKey } from "../../../globals";
import { HuaResultsTableCompare } from "../table/HuaResultsTableCompare";
import { DislocationResultsTableCompare } from "../table/DislocationResultsTableCompare";
import { CGEResultsTableCompare } from "../table/CGEResultsTableCompare";
import { FunctionalityTableCompare } from "../table/FunctionalityTableCompare";


const useStyles = makeStyles({
	tableEntry: {
		display: "block",
		margin: "50px auto",
		textAlign: "center"
	},
	title: {
		height: "19px",
		color: "#2E384D",
		fontSize: "16px",
		fontWeight: "500",
		letterSpacing: "0.6px",
		lineHeight: "19px",
		padding: "12px 8px",
		marginBottom: "25px",
		display: "block"
	},
	tab: {
		height: "22px",
		color: "#69707F",
		fontSize: "16px",
		fontWeight: "500",
		letterSpacing: 0,
		lineHeight: "22px",
		textAlign: "center",
		textTransform: "capitalize"
	},
	radio: {
		color: "#69707F"
	},
	label: {
		fontSize: "12px"
	}
});

export default function ResilienceMetricsCompare(props) {
	const classes = useStyles();

	let { executionItems, datawolfDatasetConfigItems } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [currTabIndex, setCurrTabIndex] = useState(0);
	const [totalDislTableContents, setTotalDislTableContents] = useState({});
	const [dislocationByRaceContents, setDislocationByRaceContents] = useState({});
	const [dislocationByTenureContents, setDislocationByTenureContents] = useState({});
	const [dislocationByIncomeContents, setDislocationByIncomeContents] = useState({});
	const [dislocationByHousingTypeContents, setDislocationByHousingTypeContents] = useState({});
	const [cgeHouseholdIncomeContents, setCgeHouseholdIncomeContents] = useState({});
	const [cgeDomesticSupplyContents, setCgeDomesticSupplyContents] = useState({});
	const [cgeEmploymentContents, setCgeEmploymentContents] = useState({});
	const [bldgFuncSummaryTableContents, setBldgFuncSummaryTableContents] = useState({});
	const [cgeHhIncomeRegion, setCgeHhIncomeRegion] = useState(globalConfig["allowedRegions"] ? globalConfig["allowedRegions"][0].value : null);
	const [cgeDomesticSupplyRegion, setCgeDomesticSupplyRegion] = useState(globalConfig["allowedRegions"] ? globalConfig["allowedRegions"][0].value : null);
	const [cgeEmploymentRegion, setCgeEmploymentRegion] = useState(globalConfig["allowedRegions"] ? globalConfig["allowedRegions"][0].value : null);

	const [cgeFilterOptions, setCgeFilterOptions] = useState(globalConfig["allowedRegions"] ?
		globalConfig["allowedRegions"].reduce((state, region) => {
			return [...state, { "name": region.name, "value": region.value }];
		}, [])
		:
		[]);

	// print container
	const printRef = useRef();


	useEffect(() => {
		const fetchData = async () => {
			for (let i = 0; i < executionItems.length; i++) {
				datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
					const vName = datawolfDatasetConfigItem.datasets.variableName;
					if (vName === "totalDislTableContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setTotalDislTableContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "dislocationByRaceContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setDislocationByRaceContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "dislocationByTenureContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setDislocationByTenureContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "dislocationByIncomeContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setDislocationByIncomeContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "dislocationByHousingTypeContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setDislocationByHousingTypeContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "cgeHouseholdIncomeContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setCgeHouseholdIncomeContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "cgeDomesticSupplyContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setCgeDomesticSupplyContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "cgeEmploymentContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setCgeEmploymentContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					} else if (vName === "bldgFuncSummaryTableContent") {
						const content = await getOutputFileContentJSON(datawolfConfig, executionItems[i], datawolfDatasetConfigItem.datasetId);
						setBldgFuncSummaryTableContents(prevState => ({
							...prevState,
							[comparisonKey[i]]: content
						}));
					}
				});
			}
		};

		fetchData();
	}, [executionItems, datawolfDatasetConfigItems]);

	return (
		<Box ref={printRef}>
			{/*tabs*/}
			<Tabs
				TabIndicatorProps={{ style: { background: "#00619D", color: "#00619D" } }}
				aria-label="metrics tabs"
				value={currTabIndex}
				onChange={(e, value) => {
					setCurrTabIndex(value);
				}}
			>
				<Tab
					className={classes.tab}
					label="Population Stability"
					style={currTabIndex === 0 ? { color: "#00619D" } : {}}
				/>
				<Tab
					className={classes.tab}
					label="Economic Stability"
					style={currTabIndex === 1 ? { color: "#00619D" } : {}}
				/>
				<Tab
					className={classes.tab}
					label="Physical Services Stability"
					style={currTabIndex === 2 ? { color: "#00619D" } : {}}
				/>
			</Tabs>
			{/*population stability*/}
			<div
				role="tabpanel"
				hidden={currTabIndex !== 0}
				id="tabpanel-population-stability"
				aria-labelledby="population stability"
			>
				{
					Object.keys(dislocationByIncomeContents).length >= 2 &&
                    Object.keys(dislocationByRaceContents).length >= 2 &&
                    Object.keys(dislocationByTenureContents).length >= 2 &&
                    Object.keys(dislocationByHousingTypeContents).length >= 2 ?
						(
							<Box className={classes.tableEntry}>
								<HuaResultsTableCompare
									resultsJsonA={{
										income: dislocationByIncomeContents[comparisonKey[0]],
										race: dislocationByRaceContents[comparisonKey[0]],
										tenure: dislocationByTenureContents[comparisonKey[0]],
										housingType: dislocationByHousingTypeContents[comparisonKey[0]]
									}}
									resultsJsonB={{
										income: dislocationByIncomeContents[comparisonKey[1]],
										race: dislocationByRaceContents[comparisonKey[1]],
										tenure: dislocationByTenureContents[comparisonKey[1]],
										housingType: dislocationByHousingTypeContents[comparisonKey[1]]
									}}
									isMetrics={true}
								/>
							</Box>
						) : (
							<></>
						)}
				{
					Object.keys(totalDislTableContents).length >= 2 &&
                    totalDislTableContents[comparisonKey[0]]["population_dislocation_in_total"] &&
                    totalDislTableContents[comparisonKey[1]]["population_dislocation_in_total"]
						? (
							<Box className={classes.tableEntry}>
								<DislocationResultsTableCompare
									resultsJsonA={totalDislTableContents[comparisonKey[0]]["population_dislocation_in_total"]}
									resultsJsonB={totalDislTableContents[comparisonKey[1]]["population_dislocation_in_total"]}
									headers={["POPULATION", "% of POPULATION"]}
									title={"Population Dislocation - in Total"}
									isMetrics={true}
								/>
							</Box>
						) : (
							<></>
						)}
				{
					Object.keys(totalDislTableContents).length >= 2 &&
                    totalDislTableContents[comparisonKey[0]]["household_dislocation_in_total"] &&
                    totalDislTableContents[comparisonKey[1]]["household_dislocation_in_total"]
						? (
							<Box className={classes.tableEntry}>
								<DislocationResultsTableCompare
									resultsJsonA={totalDislTableContents[comparisonKey[0]]["household_dislocation_in_total"]}
									resultsJsonB={totalDislTableContents[comparisonKey[1]]["household_dislocation_in_total"]}
									headers={["HOUSEHOLD", "% of HOUSEHOLD"]}
									title={"Household Dislocation - in Total"}
									isMetrics={true}
								/>
							</Box>
						) : (
							<></>
						)}
			</div>
			<div
				role="tabpanel"
				hidden={currTabIndex !== 1}
				id="tabpanel-economic-stability"
				aria-labelledby="economic stability"
			>
				{
					Object.keys(cgeHouseholdIncomeContents).length >= 2 ? (
						<Box className={classes.tableEntry}>
							<div style={{ paddingLeft: "6px" }}>
								<FormLabel component="legend" className={classes.title}>
                                    Household Income
								</FormLabel>
								<IncoreRadioGroup options={cgeFilterOptions} value={cgeHhIncomeRegion}
									handleChange={(e) => { setCgeHhIncomeRegion(e.target.value);}} />
							</div>
							<CGEResultsTableCompare
								resultsJsonArr={[cgeHouseholdIncomeContents[comparisonKey[0]],
									cgeHouseholdIncomeContents[comparisonKey[1]]]}
								isMetrics={true}
								region={cgeHhIncomeRegion} />
						</Box>
					) : (
						<></>
					)}
				{
					Object.keys(cgeEmploymentContents).length >= 2 ? (
						<Box className={classes.tableEntry}>
							<FormLabel component="legend" className={classes.title}>
                                Employment
							</FormLabel>
							<IncoreRadioGroup options={cgeFilterOptions} value={cgeEmploymentRegion}
								handleChange={(e) => { setCgeEmploymentRegion(e.target.value);}} />
							<CGEResultsTableCompare
								resultsJsonArr={[cgeEmploymentContents[comparisonKey[0]],
									cgeEmploymentContents[comparisonKey[1]]]}
								isMetrics={true}
								region={cgeEmploymentRegion} />
						</Box>
					) : (
						<></>
					)}
				{Object.keys(cgeDomesticSupplyContents).length >= 2 ? (
					<Box className={classes.tableEntry}>
						<FormLabel component="legend" className={classes.title}>
                            Community-level GDP
						</FormLabel>
						<IncoreRadioGroup options={cgeFilterOptions} value={cgeDomesticSupplyRegion}
							handleChange={(e) => { setCgeDomesticSupplyRegion(e.target.value);}} />
						<CGEResultsTableCompare
							resultsJsonArr={[cgeDomesticSupplyContents[comparisonKey[0]],
								cgeDomesticSupplyContents[comparisonKey[1]]]}
							yAxisLegend="Person"
							isMetrics={true}
							region={cgeDomesticSupplyRegion}
						/>
					</Box>
				) : (
					<></>
				)}
			</div>

			<div
				role="tabpanel"
				hidden={currTabIndex !== 2}
				id="tabpanel-physical-services-stability"
				aria-labelledby="physical services stability"
			>
				{Object.keys(bldgFuncSummaryTableContents).length >= 2 ? (
					<Box className={classes.tableEntry}>
						<Typography className={classes.title}>Count of Functional Buildings</Typography>
						<FunctionalityTableCompare funcResultsA={bldgFuncSummaryTableContents[comparisonKey[0]]}
							funcResultsB={bldgFuncSummaryTableContents[comparisonKey[1]]} />
					</Box>
				) : (
					<></>
				)}
			</div>
			<IncoreButtonText onClick={() => {downloadImg(printRef.current, "Resilience_Metrics");}}
				startIcon={<CameraAltIcon />}>Image</IncoreButtonText>
		</Box>
	);
}

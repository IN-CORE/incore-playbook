import {Box, Container, Dialog, DialogContent, Grid, IconButton, Tab, Tabs, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {DislocationResultsTable} from "../table/DislocationResultsTable";
import {HuaResultsTable} from "../table/HuaResultsTable";
import React, {useEffect, useState} from "react";
import {CgeResultsTable} from "../table/CgeResultsTable";
import {FunctionalityTable} from "../table/FunctionalityTable";
import {makeStyles} from "@material-ui/core/styles";
import {getOutputFileJson} from "../../../utils/datawolf";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
	tableEntry:{
		display: "block",
		margin:"50px auto",
		textAlign: "center",
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
		display:"block"
	},
	tab: {
		height: "22px",
		color: "#69707F",
		fontSize: "16px",
		fontWeight: "500",
		letterSpacing: 0,
		lineHeight: "22px",
		textAlign: "center",
		textTransform:"capitalize"
	},
});

export default function ResilienceMetrics(props){
	const classes = useStyles();

	let {executionItemId, getExecution, selectedExecutionName, setSelectedExecutionName, title, previewOn, handlePreviewClose } = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);
	const datawolfWorkflowConfig = useSelector((state) => state.config.datawolfWorkflowConfig);

	const [currTabIndex, setCurrTabIndex] = useState(0);
	const [tables, setTables] = useState({});

	useEffect(()=> {

		let executionItem = getExecution(executionItemId);
		setSelectedExecutionName(executionItem["title"]);

		const getOutputFileContent = async (dwDatasetId) => {
			let incoreId = executionItem["datasets"][dwDatasetId];
			let incoreTable = await getOutputFileJson(datawolfConfig, incoreId);
			return JSON.parse(incoreTable);
		};

		const totalDislTableIdContent = getOutputFileContent(datawolfConfig["datasets"]["totalDislocationId"]).catch(console.error);
		const dislocationByRaceContent = getOutputFileContent(datawolfConfig["datasets"]["dislocationByRaceId"]).catch(console.error);
		const dislocationByTenureContent = getOutputFileContent(datawolfConfig["datasets"]["dislocationByTenureId"]).catch(console.error);
		const dislocationByIncomeContent = getOutputFileContent(datawolfConfig["datasets"]["dislocationByIncomeId"]).catch(console.error);
		const dislocationByHousingTypeIdContent = getOutputFileContent(datawolfConfig["datasets"]["dislocationByHousingTypeId"]).catch(console.error);
		const cgeHouseholdIncomeContent = getOutputFileContent(datawolfConfig["datasets"]["cgeHouseholdIncomeId"]).catch(console.error);
		const cgeDomesticSupplyContent = getOutputFileContent(datawolfConfig["datasets"]["cgeDomesticSupplyId"]).catch(console.error);
		const cgeEmploymentContent = getOutputFileContent(datawolfConfig["datasets"]["cgeEmploymentId"]).catch(console.error);
		const bldgFuncSummaryTableContent = getOutputFileContent(datawolfConfig["datasets"]["bldgFuncSummaryTableId"]).catch(console.error);


		setTables(
			{
				// populationdislocation
				"totalResultsTable": totalDislTableIdContent,
				"huaResultsTable": {
					"income": dislocationByIncomeContent,
					"race": dislocationByRaceContent,
					"tenure": dislocationByTenureContent,
					"housingType": dislocationByHousingTypeIdContent
				},
				// cge
				"totalHouseholdIncome":cgeHouseholdIncomeContent,
				"domesticSupply":cgeDomesticSupplyContent,
				"employment":cgeEmploymentContent,
				// bldgfunc
				"bldgFunc": bldgFuncSummaryTableContent,
			}
		);
	}, []);


	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{selectedExecutionName}</Typography>
					<Typography className="previewTitle">Select Data: {title}</Typography>
				</Box>

				{/*tabs*/}
				<Tabs aria-label="metrics tabs" value={currTabIndex}
					  TabIndicatorProps={{style: {background: "#00619D", color: "#00619D"}}}
					  onChange={(e, value) => {setCurrTabIndex(value);}}>
					<Tab className={classes.tab} label="Population Stability"
						 style={currTabIndex === 0? {color: "#00619D"}: {}}/>
					<Tab className={classes.tab} label="Economic Stability"
						 style={currTabIndex === 1? {color: "#00619D"}: {}}/>
					<Tab className={classes.tab} label="Physical Services Stability"
						 style={currTabIndex === 2? {color: "#00619D"}: {}}/>
				</Tabs>
				{/*population stability*/}
				<div role="tabpanel" hidden={currTabIndex !== 0} id="tabpanel-population-stability"
					 aria-labelledby="population stability"
				>
					<Box className={classes.tableEntry}>
						<HuaResultsTable resultsJson={tables["huaResultsTable"]} isMetrics={true}/>
					</Box>
					<Box className={classes.tableEntry}>
						<DislocationResultsTable resultsJson={tables["totalResultsTable"]["population_dislocation_in_total"]}
												 headers={["POPULATION", "% of POPULATION"]}
												 title={"Population Dislocation - in Total"}
												 isMetrics={true}
						/>
					</Box>
					<Box className={classes.tableEntry}>
						<DislocationResultsTable resultsJson={tables["totalResultsTable"]["household_dislocation_in_total"]}
												 headers={["HOUSEHOLD", "% of HOUSEHOLD"]}
												 title={"Household Dislocation - in Total"}
												 isMetrics={true}
						/>
					</Box>
				</div>
				<div role="tabpanel" hidden={currTabIndex !== 1} id="tabpanel-economic-stability"
					 aria-labelledby="economic stability"
				>
					<Box className={classes.tableEntry}>
						<Typography className={classes.title}>Household Income</Typography>
						<CgeResultsTable resultsJson={tables["totalHouseholdIncome"]} isMetrics={true}/>
					</Box>
					<Box className={classes.tableEntry}>
						<Typography className={classes.title}>Employment</Typography>
						<CgeResultsTable resultsJson={tables["employment"]} isMetrics={true}/>
					</Box>
					<Box className={classes.tableEntry}>
						<Typography className={classes.title}>Community-level GDP</Typography>
						<CgeResultsTable resultsJson={tables["domesticSupply"]} yAxisLegend="Person" isMetrics={true}/>
					</Box>
				</div>

				<div role="tabpanel" hidden={currTabIndex !== 2} id="tabpanel-physical-services-stability"
					 aria-labelledby="physical services stability"
				>
					<Box className={classes.tableEntry}>
						<Typography className={classes.title}>Count of Functional Buildings</Typography>
						<FunctionalityTable funcResults={tables["bldgFunc"]}/>
					</Box>
				</div>
			</DialogContent>
		</Dialog>
	);
}

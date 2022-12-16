import {Box, Dialog, DialogActions, DialogContent, IconButton, Tab, Tabs, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {DislocationResultsTable} from "../table/DislocationResultsTable";
import {HuaResultsTable} from "../table/HuaResultsTable";
import React, { useEffect, useRef, useState } from "react";
import {CgeResultsTable} from "../table/CgeResultsTable";
import {FunctionalityTable} from "../table/FunctionalityTable";
import {makeStyles} from "@material-ui/core/styles";
import {getOutputFileContentJSON} from "../../../utils/datawolf";
import {useSelector} from "react-redux";
import {IncoreButtonText} from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImg } from "../../../utils/image";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

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

	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems} = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);

	const [currTabIndex, setCurrTabIndex] = useState(0);
	const [selectedExecutionName, setSelectedExecutionName] = useState("");

	const [totalDislTableContent, setTotalDislTableContent] = useState(null);
	const [dislocationByRaceContent, setDislocationByRaceContent] = useState(null);
	const [dislocationByTenureContent, setDislocationByTenureContent] = useState(null);
	const [dislocationByIncomeContent, setDislocationByIncomeContent] = useState(null);
	const [dislocationByHousingTypeContent, setDislocationByHousingTypeContent] = useState(null);
	const [cgeHouseholdIncomeContent, setCgeHouseholdIncomeContent] = useState(null);
	const [cgeDomesticSupplyContent, setCgeDomesticSupplyContent] = useState(null);
	const [cgeEmploymentContent, setCgeEmploymentContent] = useState(null);
	const [bldgFuncSummaryTableContent, setBldgFuncSummaryTableContent] = useState(null);

	// print container
	const printRef = useRef();

	useEffect(()=> {
		setSelectedExecutionName(executionItem["title"]);

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "totalDislTableContent") {
				setTotalDislTableContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "dislocationByRaceContent") {
				setDislocationByRaceContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "dislocationByTenureContent") {
				setDislocationByTenureContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "dislocationByIncomeContent") {
				setDislocationByIncomeContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "dislocationByHousingTypeContent") {
				setDislocationByHousingTypeContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "cgeHouseholdIncomeContent") {
				setCgeHouseholdIncomeContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "cgeDomesticSupplyContent"){
				setCgeDomesticSupplyContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "cgeEmploymentContent"){
				setCgeEmploymentContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "bldgFuncSummaryTableContent"){
				setBldgFuncSummaryTableContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
		});
	}, []);

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal" ref={printRef}>
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{selectedExecutionName}</Typography>
					<Typography className="previewTitle">Select Data: Resilience Metrics</Typography>
				</Box>

				{/*tabs*/}
				<Tabs aria-label="metrics tabs" value={currTabIndex}
							  TabIndicatorProps={{style: {background: "#00619D", color: "#00619D"}}}
							  onChange={(e, value) => {setCurrTabIndex(value);}}>
					<Tab className={classes.tab} label="Population Stability"
								 style={currTabIndex === 0 ? {color: "#00619D"} : {}}/>
					<Tab className={classes.tab} label="Economic Stability"
								 style={currTabIndex === 1 ? {color: "#00619D"} : {}}/>
					<Tab className={classes.tab} label="Physical Services Stability"
								 style={currTabIndex === 2 ? {color: "#00619D"} : {}}/>
				</Tabs>
				{/*population stability*/}
				<div role="tabpanel" hidden={currTabIndex !== 0} id="tabpanel-population-stability"
							 aria-labelledby="population stability"
				>
					{
						dislocationByIncomeContent && dislocationByRaceContent && dislocationByTenureContent
						&& dislocationByHousingTypeContent ?
							<Box className={classes.tableEntry}>
								<HuaResultsTable resultsJson={{
									"income": dislocationByIncomeContent,
									"race": dislocationByRaceContent,
									"tenure": dislocationByTenureContent,
									"housingType": dislocationByHousingTypeContent
								}} isMetrics={true}/>
							</Box>
							:<></>
					}
					{
						totalDislTableContent && totalDislTableContent["population_dislocation_in_total"] ?
							<Box className={classes.tableEntry}>
								<DislocationResultsTable
									resultsJson={totalDislTableContent["population_dislocation_in_total"]}
									headers={["POPULATION", "% of POPULATION"]}
									title={"Population Dislocation - in Total"}
									isMetrics={true}
								/>
							</Box>
							:<></>
					}
					{
						totalDislTableContent && totalDislTableContent["household_dislocation_in_total"] ?
							<Box className={classes.tableEntry}>
								<DislocationResultsTable
									resultsJson={totalDislTableContent["household_dislocation_in_total"]}
									headers={["HOUSEHOLD", "% of HOUSEHOLD"]}
									title={"Household Dislocation - in Total"}
									isMetrics={true}
								/>
							</Box>
							:
							<></>
					}

				</div>
				<div role="tabpanel" hidden={currTabIndex !== 1} id="tabpanel-economic-stability"
							 aria-labelledby="economic stability"
				>
					{
						cgeHouseholdIncomeContent ?
							<Box className={classes.tableEntry}>
								<Typography className={classes.title}>Household Income</Typography>
								<CgeResultsTable resultsJson={cgeHouseholdIncomeContent} isMetrics={true}/>
							</Box>
							:
							<></>
					}
					{
						cgeEmploymentContent ?
							<Box className={classes.tableEntry}>
								<Typography className={classes.title}>Employment</Typography>
								<CgeResultsTable resultsJson={cgeEmploymentContent} isMetrics={true}/>
							</Box>
							:<></>
					}
					{
						cgeDomesticSupplyContent ?
							<Box className={classes.tableEntry}>
								<Typography className={classes.title}>Community-level GDP</Typography>
								<CgeResultsTable resultsJson={cgeDomesticSupplyContent} yAxisLegend="Person"
												 isMetrics={true}/>
							</Box>
							:
							<></>
					}
				</div>

				<div role="tabpanel" hidden={currTabIndex !== 2} id="tabpanel-physical-services-stability"
							 aria-labelledby="physical services stability"
				>
					{
						bldgFuncSummaryTableContent ?
							<Box className={classes.tableEntry}>
								<Typography className={classes.title}>Count of Functional Buildings</Typography>
								<FunctionalityTable funcResults={bldgFuncSummaryTableContent}/>
							</Box>
							:
							<></>
					}
				</div>
			</DialogContent>
			<DialogActions>
				<IncoreButtonText onClick={()=>{downloadImg(printRef.current, "Resilience_Metrics");}}
								  startIcon={<CameraAltIcon/>}>Image</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon/>}>Close</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}

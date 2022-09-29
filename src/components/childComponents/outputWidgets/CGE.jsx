import {Box, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CGEBarChart from "../graph/CGEBarChart";
import {CgeResultsTable} from "../table/CgeResultsTable";
import CgeDescription from "../step/CgeDescription";
import React, {useEffect, useState} from "react";
import {IncoreMenuItem, IncoreSelectBox} from "../../styledComponents/IncoreSelect";
import {getOutputFileContentJSON} from "../../../utils/datawolf";
import {useSelector} from "react-redux";
import {exportJson} from "../../../utils/common";
import {IncoreButtonText} from "../../styledComponents/IncoreButtonText";
import GetAppIcon from "@material-ui/icons/GetApp";

export default function CGE(props) {
	let {executionItem, previewOn, handlePreviewClose, datawolfDatasetConfigItems} = props;

	const datawolfConfig = useSelector((state) => state.config.datawolfConfig);

	const [cgeType, setCgeType] = useState("totalHouseholdIncome");
	const [selectedExecutionName, setSelectedExecutionName] = useState("");
	const [cgeHouseholdIncomeContent, setCgeHouseholdIncomeContent] = useState(null);
	const [cgeDomesticSupplyContent, setCgeDomesticSupplyContent] = useState(null);
	const [cgeEmploymentContent, setCgeEmploymentContent] = useState(null);

	useEffect(()=> {
		setSelectedExecutionName(executionItem["title"]);

		datawolfDatasetConfigItems.map(async (datawolfDatasetConfigItem) => {
			const vName = datawolfDatasetConfigItem.datasets.variableName;
			if (vName === "cgeHouseholdIncomeContent") {
				setCgeHouseholdIncomeContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "cgeDomesticSupplyContent"){
				setCgeDomesticSupplyContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
			else if (vName === "cgeEmploymentContent"){
				setCgeEmploymentContent(await getOutputFileContentJSON(datawolfConfig, executionItem, datawolfDatasetConfigItem.datasetId));
			}
		});
	}, []);

	const download = async () => {
		if (cgeHouseholdIncomeContent && cgeDomesticSupplyContent && cgeEmploymentContent){
			const cgeJson = {
				"totalHouseholdIncome": cgeHouseholdIncomeContent,
				"domesticSupply": cgeDomesticSupplyContent,
				"employment": cgeEmploymentContent
			};
			exportJson(cgeJson, `cge-${executionItem.id}`);
		}
	};

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
					<Typography className="previewTitle">Select Data: CGE Results</Typography>
				</Box>

				<Box style={{padding:"5px 25px 25px 25px"}}>
					<Grid container spacing={3} justify="center">
						<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
							{/*dropdown*/}
							<IncoreSelectBox labelId="label" id="select" variant="outlined"
											 onChange={(e)=>{ setCgeType(e.target.value); }}
											 value={cgeType}
											 style={{maxWidth:"500px"}}>
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

							{/*table and barchart*/}
							{/*TODO for some reason barchart unit not working*/}
							{
								(() =>{
									if (cgeType === "totalHouseholdIncome" && cgeHouseholdIncomeContent){
										return (
											<>
												<Box style={{margin:"50px 0", maxWidth:"700px"}}>
													<CGEBarChart data={cgeHouseholdIncomeContent}
																 yAxisLegend="Million of $"/>
												</Box>
												<Box>
													<CgeResultsTable resultsJson={cgeHouseholdIncomeContent}/>
												</Box>
											</>
										);
									}
									else if (cgeType === "domesticSupply" && cgeDomesticSupplyContent){
										return (<>
											<Box style={{margin:"50px 0", maxWidth:"700px"}}>
												<CGEBarChart data={cgeDomesticSupplyContent} yAxisLegend="Million of $"/>
											</Box>
											<Box>
												<CgeResultsTable resultsJson={cgeDomesticSupplyContent} yAxisLegend="Person"/>
											</Box>
										</>);
									}
									else if (cgeType === "employment" && cgeEmploymentContent){
										return (<>
											<Box style={{margin:"50px 0", maxWidth:"700px"}}>
												<CGEBarChart data={cgeEmploymentContent} title="Employment"/>
											</Box>
											<Box>
												<CgeResultsTable resultsJson={cgeEmploymentContent}/>
											</Box>
										</>);
									}
								})()
							}
						</Grid>
						<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
							{/*description*/}
							<CgeDescription cgeMetrics={cgeType}/>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<IncoreButtonText onClick={download} startIcon={<GetAppIcon/>}>Download Report</IncoreButtonText>
				<IncoreButtonText onClick={handlePreviewClose} startIcon={<CloseIcon/>}>Close</IncoreButtonText>
			</DialogActions>
		</Dialog>
	);
}

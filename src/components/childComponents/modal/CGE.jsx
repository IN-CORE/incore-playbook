import {Box, Dialog, DialogContent, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CGEBarChart from "../graph/CGEBarChart";
import {CgeResultsTable} from "../table/CgeResultsTable";
import CgeDescription from "../step/CgeDescription";
import React, {useState} from "react";
import {IncoreMenuItem, IncoreSelectBox} from "../../styledComponents/IncoreSelect";

export default function CGE(props) {
	let {
		executionName,
		title,
		previewOn,
		handlePreviewClose,
		tables,
	} = props;

	//"totalHouseholdIncome", "domesticSupply", "employment"
	const [cgeType, setCgeType] = useState("totalHouseholdIncome");

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>

				{/*title*/}
				{/*TODO wrap into a component*/}
				<Box className="previewTitleSection">
					<Typography className="previewTitle">{executionName}</Typography>
					<Typography className="previewTitle">Select Data: {title}</Typography>
				</Box>

				<Box style={{padding:"50px 25px"}}>
					<Grid container spacing={3} justify="left">
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
									if (cgeType === "totalHouseholdIncome"){
										return (
											<>
												<Box style={{margin:"50px 0", maxWidth:"700px"}}>
													<CGEBarChart data={tables["totalHouseholdIncome"]}
																 yAxisLegend="Million of $"/>
												</Box>
												<Box>
													<CgeResultsTable resultsJson={tables["totalHouseholdIncome"]}/>
												</Box>
											</>
										);
									}
									else if (cgeType === "domesticSupply"){
										return (<>
											<Box style={{margin:"50px 0", maxWidth:"700px"}}>
												<CGEBarChart data={tables["domesticSupply"]} yAxisLegend="Million of $"/>
											</Box>
											<Box>
												<CgeResultsTable resultsJson={tables["domesticSupply"]} yAxisLegend="Person"/>
											</Box>
										</>);
									}
									else if (cgeType === "employment"){
										return (<>
											<Box style={{margin:"50px 0", maxWidth:"700px"}}>
												<CGEBarChart data={tables["employment"]} title="Employment"/>
											</Box>
											<Box>
												<CgeResultsTable resultsJson={tables["employment"]}/>
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
		</Dialog>
	);
}

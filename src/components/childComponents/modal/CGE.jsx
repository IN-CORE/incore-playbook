import {Box, Dialog, DialogContent, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CGEBarChart from "../graph/CGEBarChart";
import {CgeResultsTable} from "../table/CgeResultsTable";
import CgeDescription from "../step/CgeDescription";
import React, {useState} from "react";

export default function CGE(props) {
	let {
		title,
		previewOn,
		handlePreviewClose,
		tables,
	} = props;

	//"totalHouseholdIncome", "domesticSupply", "employment"
	const [cgeDescription, setCgeDescription] = useState("totalHouseholdIncome");

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>

				{/*title*/}
				<Typography className="previewTitle">{title}</Typography>

				{/*barchart*/}
				<Grid item style={{minWidth: "804px"}}>
					<Typography className="previewSubTitle">
						Anticipated Performance - Building Clusters</Typography>
					<Box style={{marginTop: "38px"}}>
						<CGEBarChart data={tables["totalHouseholdIncome"]} title="total Household Income"/>
						<CGEBarChart data={tables["domesticSupply"]} title="total Household Income"/>
						<CGEBarChart data={tables["employment"]} title="total Household Income"/>
					</Box>
				</Grid>

				{/*for table*/}
				<Box>
					<CgeResultsTable resultsJson={null}/>
				</Box>

				{/*description*/}
				<CgeDescription cgeMetrics={cgeDescription}/>
			</DialogContent>
		</Dialog>
	);
}

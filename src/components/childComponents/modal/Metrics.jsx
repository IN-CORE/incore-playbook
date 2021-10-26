import {Box, Container, Dialog, DialogContent, Grid, IconButton, Tab, Tabs, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {DislocationResultsTable} from "../table/DislocationResultsTable";
import {HuaResultsTable} from "../table/HuaResultsTable";
import React, {useState} from "react";
import {CgeResultsTable} from "../table/CgeResultsTable";
import {FunctionalityTable} from "../table/FunctionalityTable";
import {makeStyles} from "@material-ui/core/styles";

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
});

export default function Metrics(props){
	const classes = useStyles();

	let {title, previewOn, handlePreviewClose, tables} = props;

	const [currTabIndex, setCurrTabIndex] = useState(0);

	return (
		<Dialog open={previewOn} onClose={handlePreviewClose} maxWidth="lg" fullWidth scroll="paper">
			<DialogContent className="previewModal">
				<IconButton aria-label="Close" onClick={handlePreviewClose} style={{float: "right"}}>
					<CloseIcon fontSize="small"/>
				</IconButton>

				{/*title*/}
				<Typography className="previewTitle">{title}</Typography>

				{/*tabs*/}
				<Tabs aria-label="metrics tabs" value={currTabIndex}
					  onChange={(e, value) => {setCurrTabIndex(value);}}>
					<Tab label="Population Stability"/>
					<Tab label="Economic Stability"/>
					<Tab label="Physical Services Stability"/>
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

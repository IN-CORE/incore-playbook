import {Box, Container, Dialog, DialogContent, Grid, IconButton, Tab, Tabs, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {globals} from "../../../globals";
import {DislocationResultsTable} from "../table/DislocationResultsTable";
import {HuaResultsTable} from "../table/HuaResultsTable";
import React, {useState} from "react";
import {CgeResultsTable} from "../table/CgeResultsTable";
import {FunctionalityTable} from "../table/FunctionalityTable";

export default function Metrics(props){
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
					<Box>
						<Typography className="previewTitle">Housing Unit Dislocation</Typography>
						<HuaResultsTable resultsJson={tables["huaResultsTable"]} />
					</Box>
					<Box>
						<Typography className="previewTitle">Population Dislocation - in Total</Typography>
						<DislocationResultsTable resultsJson={tables["totalResultsTable"]["population_dislocation_in_total"]}
												 headers={["POPULATION", "% of POPULATION"]}
												 title={"Population Dislocation - in Total"}/>
					</Box>
					<Box>
						<Typography className="previewTitle">Household Dislocation - in Total</Typography>
						<DislocationResultsTable resultsJson={tables["totalResultsTable"]["household_dislocation_in_total"]}
												 headers={["HOUSEHOLD", "% of HOUSEHOLD"]}
												 title={"Household Dislocation - in Total"}/>
					</Box>
				</div>
				<div role="tabpanel" hidden={currTabIndex !== 1} id="tabpanel-economic-stability"
					 aria-labelledby="economic stability"
				>
					<Box>
						<Typography className="previewTitle">Household Income</Typography>
						<CgeResultsTable resultsJson={tables["totalHouseholdIncome"]}/>
					</Box>
					<Box>
						<Typography className="previewTitle">Employment</Typography>
						<CgeResultsTable resultsJson={tables["employment"]}/>
					</Box>
					<Box>
						<Typography className="previewTitle">Community-level GDP</Typography>
						<CgeResultsTable resultsJson={tables["domesticSupply"]} yAxisLegend="Person"/>
					</Box>
				</div>

				<div role="tabpanel" hidden={currTabIndex !== 2} id="tabpanel-physical-services-stability"
					 aria-labelledby="physical services stability"
				>
					<Box>
						<Typography className="previewTitle">Count of Functional Buildings</Typography>
						<FunctionalityTable funcResults={tables["bldgFunc"]}/>
					</Box>
				</div>
			</DialogContent>
		</Dialog>
	);
}

import {Box, Container, Dialog, DialogContent, Grid, IconButton, Tab, Tabs, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {globals} from "../../../globals";
import {DislocationResultsTable} from "../table/DislocationResultsTable";
import {HuaResultsTable} from "../table/HuaResultsTable";
import React, {useState} from "react";

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
				{/*ppopulation stability*/}
				<div role="tabpanel" hidden={currTabIndex !== 0} id="tabpanel-population-stability"
					 aria-labelledby="population stability"
				>
					Pop
					{/*<Box>*/}
					{/*	<HuaResultsTable resultsJson={tables["huaResultsTable"]} />*/}
					{/*	<DislocationResultsTable resultsJson={tables["totalResultsTable"]["household_dislocation_in_total"]}*/}
					{/*							 headers={["HOUSEHOLD", "% of HOUSEHOLD"]}*/}
					{/*							 title={"Household Dislocation - in Total"}/>*/}
					{/*	<DislocationResultsTable resultsJson={tables["totalResultsTable"]["population_dislocation_in_total"]}*/}
					{/*							 headers={["POPULATION", "% of POPULATION"]}*/}
					{/*							 title={"Population Dislocation - in Total"}/>*/}
					{/*</Box>*/}
				</div>
				<div role="tabpanel" hidden={currTabIndex !== 1} id="tabpanel-economic-stability"
					 aria-labelledby="economic stability"
				>
					Econ
				</div>
				<div role="tabpanel" hidden={currTabIndex !== 2} id="tabpanel-physical-services-stability"
					 aria-labelledby="physical services stability"
				>
					Physical
				</div>

			</DialogContent>
		</Dialog>
	);
}

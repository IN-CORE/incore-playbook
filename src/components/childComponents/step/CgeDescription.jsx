import * as React from "react";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	withStyles
} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	thisStepTitle: {
		cursor: "pointer",
		color: "#00619D",
		fontFamily: "Rubik, sans-serif",
		fontSize: "12px",
		fontWeight: "500",
		margin:"12px auto"
	},
	thisStepAbout: {
		color: "#69707F",
		fontFamily: "Rubik, sans-serif",
		fontSize: "12px",
	},
	tableRowHead:{
		color: "#69707F",
		fontFamily: "Rubik, sans-serif",
		fontSize:"12px",
		fontWeight:"500",
		textAlign:"center",
		backgroundColor:"#EAEEFF",
		border:"solid 2px #FFFFFF",
		width:"30%"
	},
	tableRowCell:{
		color: "#69707F",
		fontFamily: "Rubik, sans-serif",
		fontSize:"12px",
		textAlign:"center",
		border:"solid 2px #FFFFFF",
		width:"70%"
	}
});

export default function ModelTornado(props) {

	const classes = useStyles();

	let textTitle = "What do we mean by “Total Household Income?";
	let textContent = "Household income is the total income accruing to a household from land, labor, capital, and government transfers for the selected timeframe. In the context of a result like \"household income by the household group\" (i.e., HH1 to HH5), this would mean the combined total income for all households in that household group.";
	let tableTitle = "Household (HH) Groups";
	let rows = {
		"HH1": "Less than $15k",
		"HH2": "15k - 35k",
		"HH3": "35k - 70k",
		"HH4": "70k - 120k",
		"HH5": "More than 120k"
	};

	let tableContent = (
		<Table size="small" aria-label="cge description">
			<TableBody>
				{Object.keys(rows).map((key) => (
					<TableRow key={key} class>
						<TableCell component="th" scope="row" className={classes.tableRowHead}>
							{key}
						</TableCell>
						<TableCell align="left" className={classes.tableRowCell}>{rows[key]}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);

	return(
		<Box style={{"padding": "20px 40px"}}>
			<Box style={{"marginBottom": "30px"}}>
				<Typography className={classes.thisStepTitle} >
					{textTitle}
				</Typography>
				<Typography className={classes.thisStepAbout}>
					{textContent}
				</Typography>
			</Box>
			<Box style={{"marginBottom": "30px"}}>
				<Typography className={classes.thisStepTitle} >
					{tableTitle}
				</Typography>
				<Box className={classes.thisStepAbout}>
					{tableContent}
				</Box>
			</Box>
		</Box>
	);
}

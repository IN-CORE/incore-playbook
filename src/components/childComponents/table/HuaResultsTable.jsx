import React from "react";

import {
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {makeStyles} from "@material-ui/core/styles";
import {round} from "../../../utils/common";

const tableColumnHead = {
	color: "#69707F",
	fontSize: "12px",
	fontWeight: "500",
	textAlign: "right",
	border: "solid 1px rgba(46,91,255,0.08)",
	borderRadius: "1px",
	width: "185px",
	backgroundColor: "rgba(234,238,255, 0.6)",
};

const tableRowHead = {
	color: "#69707F",
	fontSize: "12px",
	fontWeight: "500",
	textAlign: "center",
	backgroundColor: "rgba(234,238,255, 0.6)",
	borderLeft: "solid 1px #FFFFFF",
	borderRight: "solid 1px #FFFFFF",
	borderTop: "solid 1px #FFFFFF",
	borderBottom: "solid 1px #FFFFFF",
	letterSpacing: "1.13px",
};


const useStyles = makeStyles({
	table: {
		maxWidth: 700,
		display:"block",
	},
	metricsTable:{
		display:"block",
		maxWidth: "fit-content",
		margin:"auto auto"
	},
	tableRowHeadFirst: {
		color: "#69707F",
		fontSize: "12px",
		fontWeight: "500",
		textAlign: "center",
		backgroundColor: "rgba(234, 238, 255, 0.6)",
		border: "solid 1px #FFFFFF",
		letterSpacing: "1.13px"
	},
	tableRowHead: {
		...tableRowHead,
		backgroundColor: "#DB4F60",
		color: "#FFFFFF"
	},
	tableRowHeadRight: {
		...tableRowHead,
		borderRight: "solid 1px rgba(234, 238, 255, 0.6)",
	},
	tableColumnHead: {
		...tableColumnHead
	},
	tableColumnHeadCharacteristics: {
		...tableColumnHead,
		backgroundColor: "rgba(234,238,255, 1)"
	},
	tableColumnHeadTotal: {
		...tableColumnHead,
		backgroundColor: "rgba(234, 238, 255, 0.6)"
	},
	tableDataCell: {
		width: "100px",
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)"
	},
	tableDataCellRed: {
		width: "100px",
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)",
		backgroundColor: "#FEEFF1"
	},
	title: {
		height: "19px",
		// width: "460px",
		color: "#2E384D",
		fontSize: "16px",
		fontWeight: "500",
		letterSpacing: "0.6px",
		lineHeight: "19px",
		padding: "12px 8px",
		marginBottom: "25px",
		display:"block"
	},
	radio: {
		color: "#69707F",
		// letterSpacing: "0.53px"
	},
	label: {
		fontSize: "12px"
	}
});


export function HuaResultsTable(props) {

	const [huaBy, setHuaBy] = React.useState("tenure");

	const handleChange = (event) => {
		setHuaBy(event.target.value);
	};

	let { resultsJson, isMetrics } = props;

	resultsJson = resultsJson[huaBy];

	let headers = ["HOUSEHOLD CHARACTERISTICS", "# HOUSEHOLDS DISLOCATED", "TOTAL HOUSEHOLDS", "% HOUSEHOLDS DISLOCATED"];

	const classes = useStyles();

	return (
		<div>
			<div style={{paddingLeft: "6px"}}>
				<FormLabel component="legend" className={classes.title}>
						Household Dislocation
				</FormLabel>

				<FormControl component="fieldset">
					<RadioGroup row aria-label="Household Dislocation" name="huaBy" value={huaBy}
						className={classes.radio} onChange={handleChange}>
						<FormControlLabel value="tenure" control={<Radio color="primary" size="small"/>}
							className= {classes.label}
							label = {<Typography className={classes.label}>by Tenure</Typography>}/>
						<FormControlLabel value="race" control={<Radio color="primary" size="small"/>}
							label = {<Typography className={classes.label}>by Race / Ethnicity</Typography>}/>
						<FormControlLabel value="income" control={<Radio color="primary" size="small"/>}
							label = {<Typography className={classes.label}>by Household Income Level</Typography>}/>
						<FormControlLabel value="housingType" control={<Radio color="primary" size="small"/>}
										  label = {<Typography className={classes.label}>by Housing Type</Typography>}/>
						<FormControlLabel value="disability" control={<Radio color="primary" size="small"/>}
							label = {<Typography className={classes.label}>by Disability</Typography>}/>
					</RadioGroup>
				</FormControl>
			</div>

			{
				(resultsJson !== undefined) ?
					<TableContainer>
						<Table className={isMetrics ? classes.metricsTable: classes.table} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow >
									{
										headers.map( (header, idx) => {
											let headClass = classes.tableRowHead;
											if (idx === 0){
												headClass = classes.tableRowHeadFirst;
											} else if (header !== "# HOUSEHOLDS DISLOCATED"){
												headClass = classes.tableRowHeadRight;
											}
											return (<TableCell className={headClass} key={idx}
															   style={ isMetrics ? {"minWidth":"200px"} : {}}>
												{header}
											</TableCell>);
										})
									}
								</TableRow>
							</TableHead>
							<TableBody>

								{
									resultsJson.map((e, idx) => {
										return (
											<TableRow key={idx}>
												<TableCell
													className={(idx === resultsJson.length - 1) ?
														classes.tableColumnHeadTotal : classes.tableColumnHeadCharacteristics} key={`1_${  idx.toString()}`}>
													{e["household_characteristics"]} </TableCell>
												<TableCell className={classes.tableDataCellRed} key={`2_${  idx.toString()}`}>
													{e["household_dislocated"].toLocaleString("en-US")}
												</TableCell>
												<TableCell className={classes.tableDataCell} key={`3_${  idx.toString()}`} >
													{e["total_households"].toLocaleString("en-US")}
												</TableCell>
												<TableCell className={classes.tableDataCell} key={`3_${  idx.toString()}`} >
													{round(e["%_household_dislocated"], 1)}%
												</TableCell>
											</TableRow>
										);
									})
								}
							</TableBody>
						</Table>
					</TableContainer>
					:
					<div style={{padding: "10px"}}> No data available for the selection</div>
			}

		</div>

	);
}

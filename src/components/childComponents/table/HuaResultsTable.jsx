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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from "@material-ui/core/styles";

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
	letterSpacing: "1.13px"
};

const useStyles = makeStyles({
	table: {
		maxWidth: 700,
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
	title: {
		height: "19px",
		width: "460px",
		color: "#2E384D",
		fontSize: "16px",
		fontWeight: "500",
		letterSpacing: "0.6px",
		lineHeight: "19px",
		padding: "12px 8px"
	},
	radio: {
		color: "#69707F",
		letterSpacing: "0.53px"
	},
	label: {
		fontSize: "14px"
	}
});


export function HuaResultsTable(props) {

	const [huaBy, setHuaBy] = React.useState('tenure');

	const handleChange = (event) => {
		setHuaBy(event.target.value);
	};

	let resultsJson = props.resultsJson;

	if (resultsJson === null){
		// to be commented out when integrated with API and prop validation can be added
		resultsJson = {
			"income": [
				{
					"housing_unit_characteristics": "HH1 (less than $15,000)",
					"housing_unit_dislocation": 311,
					"housing_unit_in_total": 3252
				},
				{
					"housing_unit_characteristics": "HH2 ($15,000 to $35,000)",
					"housing_unit_dislocation": 280,
					"housing_unit_in_total": 3133
				},
				{
					"housing_unit_characteristics": "HH3 ($35,000 to $70,000)",
					"housing_unit_dislocation": 741,
					"housing_unit_in_total": 9272
				},
				{
					"housing_unit_characteristics": "HH4 ($70,000 to $120,000)",
					"housing_unit_dislocation": 741,
					"housing_unit_in_total": 9252
				},
				{
					"housing_unit_characteristics": "HH5 (More than $120,000)",
					"housing_unit_dislocation": 131,
					"housing_unit_in_total": 1887
				},
				{
					"housing_unit_characteristics": "Unknown",
					"housing_unit_dislocation": 422,
					"housing_unit_in_total": 4210
				},
				{
					"housing_unit_characteristics": "Total",
					"housing_unit_dislocation": 1999,
					"housing_unit_in_total": 23261
				}
			],
			"race": [
				{
					"housing_unit_characteristics": "White alone, Not Hispanic",
					"housing_unit_dislocation": 1521,
					"housing_unit_in_total":18507
				},
				{
					"housing_unit_characteristics": "Black alone, Not Hispanic",
					"housing_unit_dislocation": 76,
					"housing_unit_in_total": 606
				},
				{
					"housing_unit_characteristics": "Other race, Not Hispanic",
					"housing_unit_dislocation": 92,
					"housing_unit_in_total": 1110
				},
				{
					"housing_unit_characteristics": "Any race, Hispanic",
					"housing_unit_dislocation": 41,
					"housing_unit_in_total": 556
				},
				{
					"housing_unit_characteristics": "No race Ethnicity Data",
					"housing_unit_dislocation": 269,
					"housing_unit_in_total": 2482
				},
				{
					"housing_unit_characteristics": "Total",
					"housing_unit_dislocation": 1999,
					"housing_unit_in_total": 23261
				}
			],
			"tenure": [
				{
					"housing_unit_characteristics": "Owner occupied",
					"housing_unit_dislocation": 1018,
					"housing_unit_in_total": 11344
				},
				{
					"housing_unit_characteristics": "Renter occupied",
					"housing_unit_dislocation": 712,
					"housing_unit_in_total": 9435
				},
				{
					"housing_unit_characteristics": "Nursing facilities",
					"housing_unit_dislocation": 0,
					"housing_unit_in_total": 9
				},
				{
					"housing_unit_characteristics": "Other group quarters",
					"housing_unit_dislocation": 3,
					"housing_unit_in_total": 18
				},
				{
					"housing_unit_characteristics": "Vacant for rent",
					"housing_unit_dislocation": 75,
					"housing_unit_in_total": 984
				},
				{
					"housing_unit_characteristics": "Vacant for sale",
					"housing_unit_dislocation": 60,
					"housing_unit_in_total": 573
				},
				{
					"housing_unit_characteristics": "Vacant Other",
					"housing_unit_dislocation": 131,
					"housing_unit_in_total": 898
				},
				{
					"housing_unit_characteristics": "Total",
					"housing_unit_dislocation": 1999,
					"housing_unit_in_total": 23261
				}
			]
		};
	}

	resultsJson = resultsJson[huaBy];

	let headers = ["UNIT CHARACTERISTICS", "# UNITS DISLOCATED", "TOTAL UNITS"];

	const headerSize = headers.length;

	const classes = useStyles();

	return (
			<div>
				<div style={{paddingLeft: "6px"}}>
					<FormLabel component="legend" className={classes.title}>
						Housing Unit Dislocation
					</FormLabel>

					<FormControl component="fieldset">
						<RadioGroup row aria-label="Housing Unit Dislocation" name="huaBy" value={huaBy}
												className={classes.radio} onChange={handleChange}>
							<FormControlLabel value="tenure" control={<Radio color="primary"/>}
																className= {classes.label}
																label = {<Typography className={classes.label}>by Tenure</Typography>}/>
							<FormControlLabel value="race" control={<Radio color="primary"/>}
																label = {<Typography className={classes.label}>by Race / Ethnicity</Typography>}/>
							<FormControlLabel value="income" control={<Radio color="primary"/>}
																label = {<Typography className={classes.label}>by Household Income Level</Typography>}/>

							<FormControlLabel value="disability" control={<Radio color="primary"/>}
																label = {<Typography className={classes.label}>by Disability</Typography>}/>
						</RadioGroup>
					</FormControl>
				</div>

				{
					(resultsJson !== undefined) ?
					<TableContainer>
					<Table className={classes.table} size="small" aria-label="a dense table">
					<TableHead>
					<TableRow >
						{
							headers.map( (header, idx) => {
							let headClass = classes.tableRowHead;
							if (idx === 0){
							headClass = classes.tableRowHeadFirst;
						} else if (idx === headerSize -1){
							headClass = classes.tableRowHeadRight;
						}
							return (<TableCell className={headClass} key={idx}>
						{header}
							</TableCell>)
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
					classes.tableColumnHeadTotal : classes.tableColumnHeadCharacteristics} key={"1_" + idx.toString()}>
				{e.housing_unit_characteristics} </TableCell>
					<TableCell className={classes.tableDataCell} key={"2_" + idx.toString()}>
						{e.housing_unit_dislocation.toLocaleString('en-US')}
					</TableCell>
					<TableCell className={classes.tableDataCell} key={"3_" + idx.toString()} >
						{e.housing_unit_in_total.toLocaleString('en-US')}
					</TableCell>
					</TableRow>
					)
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

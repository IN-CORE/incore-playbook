import * as React from "react";
import { Box, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
	hhsDescriptionTitle: {
		cursor: "pointer",
		color: "#00619D",
		fontFamily: "Rubik, sans-serif",
		fontSize: "12px",
		fontWeight: "500",
		margin: "12px auto"
	},
	hhsDescriptionAbout: {
		color: "#69707F",
		fontFamily: "Rubik, sans-serif",
		fontSize: "12px"
	},
	tableRowHead: {
		color: "#69707F",
		fontFamily: "Rubik, sans-serif",
		fontSize: "12px",
		fontWeight: "500",
		textAlign: "center",
		backgroundColor: "#EAEEFF",
		border: "solid 2px #FFFFFF",
		width: "30%"
	},
	tableRowCell: {
		color: "#69707F",
		fontFamily: "Rubik, sans-serif",
		fontSize: "12px",
		textAlign: "left",
		border: "solid 2px #FFFFFF",
		width: "70%"
	}
});

export default function HhsDescription() {
	const classes = useStyles();

	const hhsInfo = useSelector((state) => state.config.hhsInfo);

	let tableContent = (
		<Table size="small" aria-label="hhs description">
			<TableBody>
				{Object.keys(hhsInfo["rows"]).map((key) => (
					<TableRow key={key}>
						<TableCell component="th" scope="row" className={classes.tableRowHead}>
							{key}
						</TableCell>
						<TableCell align="left" className={classes.tableRowCell}>
							{hhsInfo["rows"][key]}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);

	return (
		<Box>
			<Box style={{ marginBottom: "30px" }}>
				<Typography className={classes.hhsDescriptionTitle}>{hhsInfo["tableTitle"]}</Typography>
				<Box className={classes.hhsDescriptionAbout}>{tableContent}</Box>
			</Box>
		</Box>
	);
}

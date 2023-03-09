import * as React from "react";
import { Box, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
	cgeDescriptionTitle: {
		cursor: "pointer",
		color: "#00619D",
		fontFamily: "Rubik, sans-serif",
		fontSize: "12px",
		fontWeight: "500",
		margin: "12px auto"
	},
	cgeDescriptionAbout: {
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

export default function CgeDescription(props) {
	const { cgeMetrics, ...others } = props;
	const classes = useStyles();

	const cgeInfo = useSelector((state) => state.config.cgeInfo);

	let cgeDescription = cgeInfo[cgeMetrics];

	let tableContent = (
		<Table size="small" aria-label="cge description">
			<TableBody>
				{Object.keys(cgeDescription["rows"]).map((key) => (
					<TableRow key={key}>
						<TableCell component="th" scope="row" className={classes.tableRowHead}>
							{key}
						</TableCell>
						<TableCell align="left" className={classes.tableRowCell}>
							{cgeDescription["rows"][key]}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);

	return (
		<Box>
			<Box style={{ marginBottom: "30px" }}>
				<Typography className={classes.cgeDescriptionTitle}>{cgeDescription["textTitle"]}</Typography>
				<Typography className={classes.cgeDescriptionAbout}>{cgeDescription["textContent"]}</Typography>
			</Box>
			<Box style={{ marginBottom: "30px" }}>
				<Typography className={classes.cgeDescriptionTitle}>{cgeDescription["tableTitle"]}</Typography>
				<Box className={classes.cgeDescriptionAbout}>{tableContent}</Box>
			</Box>
		</Box>
	);
}

import React from "react";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import {ARCHETYPE} from "../../../globals";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	baseColorBlue: {
		height: "29px",
		width: "96px",
		backgroundColor: "#ED8036",
	},
	tableHeaderRow: {
		height: "34px",
		width: "1134px",
	},
	tableHeaderCell: {
		height: "14px",
		width: "37px",
		color: "#69707F",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1.13px",
		lineHeight: "14px"
	},
	tableBodyRow: {
		height: "75px",
		width: "1134px",
	},
	tableBodyCell: {
		height: "21px",
		width: "68.75px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "22px"
	},
	guid: {
		height: "18px",
		width: "208px",
		color: "#2E384D",
		fontSize: "15px",
		fontWeight: 600,
		letterSpacing: 0,
		lineHeight: "18px"
	}
});

/**
 * Generate a attributes table
 * props.attributeName = {"prettyName":"", "columnName":""}
 * props.attributes = [ features returned from WFS query ]
 */
export const AttributesTable = (props) => {
	const {attributes, attributeNames} = props;
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						{
							attributeNames.map((attributeName) =>{
								return (
									<TableCell className={classes.tableHeaderCell} key={attributeName["prettyName"]} >
										{attributeName["prettyName"]}
									</TableCell>
								);
							})
						}
					</TableRow>
				</TableHead>
				<TableBody>
					{
						attributes.map((attribute) => {

							return (
								<TableRow className={classes.tableBodyRow} key={attribute["id"]}>
									{
										attributeNames.map((attributeName, idx) =>{
											if (attributeName["prettyName"] === "MEAN DAMAGE"){
												return (
													<TableCell key={idx} className={classes.tableBodyCell}>
														{parseFloat(attribute["properties"][attributeName["columnName"]]).toFixed(4)}</TableCell>
												);
											}
											else if (attributeName["prettyName"] === "BUILDING DESCRIPTION"){
												return (
													<TableCell key={idx} className={classes.tableBodyCell}>
														{ARCHETYPE[attribute["properties"][attributeName["columnName"]]]}</TableCell>
												);
											}
											else{
												return (
													<TableCell key={idx} className={classes.tableBodyCell}>
														{attribute["properties"][attributeName["columnName"]]}</TableCell>
												);
											}

										})
									}
								</TableRow>
							);

						})
					}

				</TableBody>
			</Table>
		</TableContainer>
	);
};

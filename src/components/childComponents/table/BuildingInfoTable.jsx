import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
	table: {
		backgroundColor: "#FFFFFF",
		minWidth: "1135px",
		overflowY: "auto"
	},
	tableHeaderRow: {
		height: "34px"
	},
	tableHeaderCell: {
		height: "14px",
		width: "37px",
		color: "#FFFFFF",
		fontSize: "12px",
		fontWeight: 500,
		letterSpacing: "1.13px",
		lineHeight: "14px",
		textAlign: "center",
		textTransform: "uppercase"
	},
	tableBodyRow: {
		height: "28px"
	},
	tableBodyCell: {
		height: "21px",
		width: "123px",
		color: "#2E384D",
		fontSize: "15px",
		letterSpacing: 0,
		lineHeight: "18px",
		border: "1px solid rgba(46,91,255,0.08)"
	}
});

// const bldgDmgColumnOrder = [
// 	"guid",
// 	"year_built",
// 	"strctid",
// 	"struct_typ",
// 	"ffe_elev",
// 	"g_elev",
// 	"max_state",
// 	"sq_foot",
// 	"a_stories",
// 	"appr_bldg",
// 	"appr_land",
// 	"appr_tot",
// 	"arch_flood",
// 	"arch_sw",
// 	"arch_wind",
// 	"archetype",
// 	"b_stories",
// 	"broad_occ",
// 	"bsmt_type",
// 	"cont_val",
// 	"csv_sector",
// 	"csv_val_st",
// 	"dgn_lvl",
// 	"dwell_unit",
// 	"efacility",
// 	"gsq_foot",
// 	"major_occ",
// 	"no_stories",
// 	"nstra_cst",
// 	"nstrd_cst",
// 	"occ_detail",
// 	"occ_typ2",
// 	"occ_type",
// 	"parid",
// 	"repl_cst",
// 	"str_cst",
// 	"str_typ2"
// ];

// const poleDmgColumnOrder = [
// 	"guid",
// 	"nodenwid",
// 	"epf_class",
// 	"max_state",
// 	"flow",
// 	"fltytype",
// 	"height",
// 	"spanLength",
// 	"strctype",
// 	"utilfcltyc"
// ];

export function BuildingInfoTable({
    buildingData, 
    setSelectedBuilding, 
    // component 
    }) {
	const classes = useStyles();

	//modify list to adjust what to show and in what order
	let columnOrder = Object.keys(buildingData)

	// if (component === "bldgdmg") {
	// 	columnOrder = bldgDmgColumnOrder;
	// } else if (component === "poledmg") {
	// 	columnOrder = poleDmgColumnOrder;
	// }

	return (
		<TableContainer>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow className={classes.tableHeaderRow} key="hdrRow">
						<TableCell
							style={{ backgroundColor: "#EFF2FF", color: "#69707F" }}
							className={classes.tableHeaderCell}
						></TableCell>
						{columnOrder.map((colName) => {
							return (
								<TableCell
									style={{ backgroundColor: "#EFF2FF", color: "#69707F" }}
									className={classes.tableHeaderCell}
									key={colName}
								>
									{colName}
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow className={classes.tableBodyRow}>
						<TableCell align="center" className={classes.tableBodyCell}>
							<IconButton aria-label="close" size="small" onClick={() => setSelectedBuilding(null)}>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						</TableCell>
						{columnOrder.map((colName) => {
							return (
								<TableCell align="center" className={classes.tableBodyCell} key={colName}>
									{buildingData[colName] === undefined ||
									buildingData[colName] === null ||
									buildingData[colName] === ""
										? "-"
										: buildingData[colName]}
								</TableCell>
							);
						})}
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}

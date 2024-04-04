import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import { diff, percentDiff, round } from "../../../utils/common";
import { IncoreRadioGroup } from "../form/IncoreRadioGroup";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";

const tableColumnHead = {
	color: "#69707F",
	fontSize: "12px",
	fontWeight: "500",
	textAlign: "right",
	border: "solid 1px rgba(46,91,255,0.08)",
	borderRadius: "1px",
	backgroundColor: "rgba(234,238,255, 1)",
};

const tableRowHead = {
	color: "#69707F",
	fontSize: "12px",
	fontWeight: "500",
	textAlign: "center",
	backgroundColor: "rgba(234,238,255, 1)",
	borderLeft: "solid 1px #FFFFFF",
	borderRight: "solid 1px #FFFFFF",
	borderTop: "solid 1px #FFFFFF",
	borderBottom: "solid 1px #FFFFFF",
	letterSpacing: "1.13px",
};

const useStyles = makeStyles({
	table: {
		display: "block",
	},
	tableContainer: {
		height: "400px",
	},
	metricsTable: {
		display: "block",
		maxWidth: "fit-content",
		margin: "auto auto",
	},
	tableRowHeadFirst: {
		color: "#69707F",
		fontSize: "12px",
		fontWeight: "500",
		textAlign: "center",
		backgroundColor: "rgba(234, 238, 255, 1)",
		border: "solid 1px #FFFFFF",
		letterSpacing: "1.13px",
	},
	tableRowHead: {
		...tableRowHead,
		backgroundColor: "#DB4F60",
		color: "#FFFFFF",
	},
	tableRowHeadRight: {
		...tableRowHead,
		borderRight: "solid 1px rgba(234, 238, 255, 1)",
	},
	tableColumnHead: {
		...tableColumnHead,
	},
	tableColumnHeadCharacteristics: {
		...tableColumnHead,
		backgroundColor: "rgba(234,238,255, 1)",
	},
	tableColumnHeadTotal: {
		...tableColumnHead,
		backgroundColor: "rgba(234, 238, 255, 1)",
	},
	tableDataCell: {
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)",
	},
	tableDiffCell: {
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)",
		backgroundColor: "#F3F3F3",
	},
	tableDataCellRed: {
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)",
		backgroundColor: "#FEEFF1",
	},
	tableDataCellDarkRed: {
		textAlign: "center",
		border: "solid 1px rgba(46,91,255,0.08)",
		backgroundColor: "#FACFD5",
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
		display: "block",
	},
	radio: {
		color: "#69707F",
	},
	label: {
		fontSize: "12px",
	},
});

export function HuaResultsTableCompare(props) {
	const [huaBy, setHuaBy] = React.useState("tenure");
	const [filterOptions, setFilterOptions] = React.useState([
		{
			value: "tenure",
			name: "by Tenure",
		},
		{
			value: "race",
			name: "by Race / Ethnicity",
		},
		{
			value: "income",
			name: "by Household Income Level",
		},
		{
			value: "housingType",
			name: "by Housing Type",
		},
		{
			value: "disability",
			name: "by Disability",
		},
	]);

	const handleChange = (event) => {
		setHuaBy(event.target.value);
	};

	let { resultsJsonA, resultsJsonB, isMetrics } = props;

	resultsJsonA = resultsJsonA[huaBy];
	resultsJsonB = resultsJsonB[huaBy];

	let headers = [
		"HOUSEHOLD CHARACTERISTICS",
		"# HOUSEHOLDS DISLOCATED",
		"TOTAL HOUSEHOLDS",
		"% HOUSEHOLDS DISLOCATED",
	];

	const classes = useStyles();

	return (
		<div>
			<div style={{ paddingLeft: "6px" }}>
				<FormLabel component="legend" className={classes.title}>
					Household Dislocation
				</FormLabel>
				<IncoreRadioGroup
					options={filterOptions}
					value={huaBy}
					handleChange={handleChange}
				/>
			</div>

			{resultsJsonA !== undefined && resultsJsonB !== undefined ? (
				<TableContainer className={classes.tableContainer}>
					<Table
						className={isMetrics ? classes.metricsTable : classes.table}
						size="small"
						stickyHeader
						aria-label="a dense table"
					>
						<TableHead>
							<TableRow>
								{headers.map((header, idx) => {
									let headClass = classes.tableRowHead;
									let colSpan = 1;
									if (idx === 0) {
										headClass = classes.tableRowHeadFirst;
										colSpan = 2;
									} else if (header !== "# HOUSEHOLDS DISLOCATED") {
										headClass = classes.tableRowHeadRight;
										colSpan = 1;
									}
									return (
										<TableCell
											className={headClass}
											key={idx}
											style={isMetrics ? { minWidth: "200px" } : {}}
											colSpan={colSpan}
										>
											{header}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{resultsJsonA.map((resA, idx) => {
								const resB = resultsJsonB[idx];
								return (
									<>
										{/*A*/}
										<TableRow key={idx}>
											<TableCell
												className={
													idx === resultsJsonA.length - 1
														? classes.tableColumnHeadTotal
														: classes.tableColumnHeadCharacteristics
												}
												key={`1_${idx.toString()}`}
												rowspan={3}
											>
												{resA["household_characteristics"]}{" "}
											</TableCell>
											<TableCell
												className={
													idx === resultsJsonA.length - 1
														? classes.tableColumnHeadTotal
														: classes.tableColumnHeadCharacteristics
												}
												style={{ textAlign: "center" }}
											>
												A
											</TableCell>
											<TableCell
												className={classes.tableDataCellRed}
												key={`2_${idx.toString()}`}
											>
												{resA["household_dislocated"].toLocaleString("en-US")}
											</TableCell>
											<TableCell
												className={classes.tableDataCell}
												key={`3_${idx.toString()}`}
											>
												{resA["total_households"].toLocaleString("en-US")}
											</TableCell>
											<TableCell
												className={classes.tableDataCell}
												key={`4_${idx.toString()}`}
											>
												{round(resA["percent_household_dislocated"], 1)}%
											</TableCell>
										</TableRow>

										{/*B*/}
										<TableRow key={idx}>
											<TableCell
												className={
													idx === resultsJsonA.length - 1
														? classes.tableColumnHeadTotal
														: classes.tableColumnHeadCharacteristics
												}
												style={{ textAlign: "center" }}
											>
												B
											</TableCell>
											<TableCell
												className={classes.tableDataCellRed}
												key={`2_${idx.toString()}`}
											>
												{resB["household_dislocated"].toLocaleString("en-US")}
											</TableCell>
											<TableCell
												className={classes.tableDataCell}
												key={`3_${idx.toString()}`}
											>
												{resB["total_households"].toLocaleString("en-US")}
											</TableCell>
											<TableCell
												className={classes.tableDataCell}
												key={`4_${idx.toString()}`}
											>
												{round(resB["percent_household_dislocated"], 1)}%
											</TableCell>
										</TableRow>

										{/*Diff*/}
										<TableRow key={idx}>
											<TableCell
												className={
													idx === resultsJsonA.length - 1
														? classes.tableColumnHeadTotal
														: classes.tableColumnHeadCharacteristics
												}
												style={{ textAlign: "center" }}
											>
												<CompareArrowsIcon
													style={{ transform: "rotate(90deg)" }}
												/>
											</TableCell>
											<TableCell
												className={classes.tableDataCellDarkRed}
												key={`2_${idx.toString()}`}
											>
												{diff(
													resB["household_dislocated"],
													resA["household_dislocated"],
												)}
											</TableCell>
											<TableCell
												className={classes.tableDiffCell}
												key={`3_${idx.toString()}`}
											>
												{diff(
													resB["total_households"],
													resA["total_households"],
												)}
											</TableCell>
											<TableCell
												className={classes.tableDiffCell}
												key={`4_${idx.toString()}`}
											>
												{percentDiff(
													resB["percent_household_dislocated"],
													resA["percent_household_dislocated"],
												)}
											</TableCell>
										</TableRow>
									</>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<div style={{ padding: "10px" }}>
					{" "}
					No data available for the selection
				</div>
			)}
		</div>
	);
}

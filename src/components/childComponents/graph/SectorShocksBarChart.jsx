import React from "react";
import Chart from "react-google-charts";
import { csvToArray } from "../../../utils/common";

export default function SectorShocksBarChart(props) {
	const { height, width, data, title, xAxisLegend, yAxisLegend } = props;

	return (
		<div className="barChart">
			<Chart
				width={width}
				height={height}
				chartType="Bar"
				loader={<div>Loading Chart</div>}
				data={csvToArray(data)}
				options={{
					title: title,
					legend: { position: "none" },
					chartArea: { width: "50%" },
					colors: ["#A1BE2E", "#DB4F60"],
					hAxis: {
						title: xAxisLegend,
						minValue: 0
					},
					vAxis: {
						title: yAxisLegend
					}
				}}
				// For tests
				rootProps={{ "data-testid": "1" }}
			/>
		</div>
	);
}

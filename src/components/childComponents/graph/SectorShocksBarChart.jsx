import React from "react";
import Chart from "react-google-charts";
import { csvToArray } from "../../../utils/common";

const ParseData = (data) => {
	const chartData = [];
	chartData.push(["Sector", "% Capital Remaining"]);

	// without header
	const dataArr = csvToArray(data, ",", false);
	for (let i=0; i< dataArr.length; i++) {
		chartData.push([dataArr[i][0], parseFloat(dataArr[i][1])]);
	}
	return chartData;
};

export default function SectorShocksBarChart(props) {
	const { height, width, data, title, xAxisLegend, yAxisLegend } = props;

	return (
		<div className="barChart">
			<Chart
				width={width}
				height={height}
				chartType="ColumnChart"
				loader={<div>Loading Chart</div>}
				data={ParseData(data)}
				options={{
					title: title,
					colors: ["#A1BE2E"],
					legend: { position: "none" },
					height: "25em",
					hAxis: {
						title: xAxisLegend,
					},
					vAxis: {
						title: yAxisLegend,
						titleTextStyle:{ italic: false },
						minValue: 0,
						maxValue: 1,
					},
				}}
				// For tests
				rootProps={{ "data-testid": "1" }}
			/>
		</div>
	);
}

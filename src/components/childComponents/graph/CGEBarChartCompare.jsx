import React from "react";
import Chart from "react-google-charts";

const ParseData = (data, executionTitles, region = null) => {
	let beforeEvent = data[0]["beforeEvent"];
	let afterEvents = data.map((d) => d["afterEvent"]);

	if (region) {
		let filterFunc = ([key]) => {
			if (region.startsWith("R") || (key.startsWith("H") && !/\d$/.test(key))) {
				return key.endsWith(region);
			}

			return key.startsWith(region);
		};

		beforeEvent = Object.fromEntries(
			Object.entries(beforeEvent).filter(filterFunc),
		);
		afterEvents = afterEvents.map((afterEvent) =>
			Object.fromEntries(Object.entries(afterEvent).filter(filterFunc)),
		);
	}

	const chartData = [];
	let chartFirstRow = ["Million of $", "Before Event"];
	executionTitles.forEach((title) =>
		chartFirstRow.push(`After Event ${title}`),
	);
	chartData.push(chartFirstRow);

	for (const key in beforeEvent) {
		let row = [key, beforeEvent[key]];
		afterEvents.forEach((afterEvent) => row.push(afterEvent[key]));
		chartData.push(row);
	}
	return chartData;
};

export default function CGEBarChartCompare(props) {
	const {
		height,
		width,
		data,
		title,
		xAxisLegend,
		yAxisLegend,
		region,
		executionTitles,
	} = props;

	return (
		<div className="barChart">
			<Chart
				width={width}
				height={height}
				chartType="BarChart"
				loader={<div>Loading Chart</div>}
				data={ParseData(data, executionTitles, region)}
				options={{
					title: title,
					legend: { position: "none" },
					colors: ["#A1BE2E", "#CB5963", "#833841"],
					hAxis: {
						title: xAxisLegend,
					},
					vAxis: {
						title: yAxisLegend,
					},
					bars: "horizontal",
				}}
				// For tests
				rootProps={{ "data-testid": "1" }}
			/>
		</div>
	);
}

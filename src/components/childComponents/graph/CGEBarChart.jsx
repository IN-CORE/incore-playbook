import React from "react";
import Chart from "react-google-charts";

const ParseData = (data, region = null) => {
	let beforeEvent = data["beforeEvent"];
	let afterEvent = data["afterEvent"];

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
		afterEvent = Object.fromEntries(
			Object.entries(afterEvent).filter(filterFunc),
		);
	}

	const chartData = [];
	chartData.push(["Million of $", "Before Event", "After Event"]);

	for (const key in beforeEvent) {
		chartData.push([key, beforeEvent[key], afterEvent[key]]);
	}
	return chartData;
};

export default function CGEBarChart(props) {
	const { height, width, data, title, xAxisLegend, yAxisLegend, region } =
		props;

	return (
		<div className="barChart">
			<Chart
				width={width}
				height={height}
				chartType="Bar"
				loader={<div>Loading Chart</div>}
				data={ParseData(data, region)}
				options={{
					title: title,
					legend: { position: "none" },
					colors: ["#A1BE2E", "#DB4F60"],
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

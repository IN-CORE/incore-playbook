import React from "react";
import Chart from "react-google-charts";

const parseData = (headers, data) => {
	const chartData = [];
	const colors = ["#96B712", "#F7C137", "#ED8036", "#D63649"];
	chartData.push([
		"Category",
		"Difference",
		{ role: "style" },
		{ role: "annotation" },
	]);
	for (let i = 0; i < data.length; i++) {
		const changeString = `${data[i] >= 0 ? "+" : ""}${data[i]}`;
		chartData.push([headers[i], data[i], colors[i], changeString]);
	}
	return chartData;
};

export default function BldgDmgDiffBarChart(props) {
	const { headers, data, height, width } = props;

	return data ? (
		<Chart
			chartType="ColumnChart"
			width={width ?? "100%"}
			height={height ?? "100px"}
			data={parseData(headers, data)}
			options={{
				legend: { position: "none" },
				bar: { groupWidth: "75%" },
				backgroundColor: "transparent",
				hAxis: {
					minValue: 0,
					baselineColor: "transparent",
					gridlines: { color: "transparent" },
					textPosition: "none",
				},
				vAxis: {
					textPosition: "none",
					ticks: [], // Specify an empty array for vAxis ticks to remove labels
				},
				annotations: {
					textStyle: {
						fontSize: 12,
						auraColor: "none", // Remove the background color around the text
						color: "#555",
					},
				},
				chartArea: {
					width: "100%", // Set chart area width to 100% of the enclosing div
					height: "100%", // Set chart area height to 80% to allow space for annotations
				},
			}}
		/>
	) : (
		<></>
	);
}

import React from "react";
import Chart from "react-google-charts";

const ParseData = (data) => {
	const chartData = [];
	const colors = ["#DB4F60", "#ff7e0f", "#A1BE2E", "#1e77b4", "#3fbecf"];
	chartData.push(["Housing Recovery Stage", "Frequency", { role: "style" }]);
	for (let i = 0; i < data.length; i++) {
		// use mod (%) to recycle through those 4 colors in case we have more stages
		chartData.push([`Stage ${(i + 1).toString()}`, data[i], colors[i % 4]]);
	}

	return chartData;
};

export default function HHSBarChart(props) {
	const { height, width, data, title } = props;

	return data ? (
		<div className="barChart">
			<Chart
				width={width}
				height={height}
				chartType="ColumnChart"
				loader={<div>Loading Chart</div>}
				data={ParseData(data)}
				options={{
					title: title,
					legend: { position: "none" },
					bar: { groupWidth: "50%" },
					vAxis: {
						title: "Frequency",
						titleTextStyle: { italic: false }
					}
				}}
			/>
		</div>
	) : (
		<></>
	);
}

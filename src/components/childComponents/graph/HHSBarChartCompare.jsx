import React from "react";
import Chart from "react-google-charts";

const ParseData = (dataA, dataB) => {
	const chartData = [];
	const colorsA = ["#DB4F60", "#ff7e0f", "#A1BE2E", "#1e77b4", "#3fbecf"];
	const colorsB = ["#9E2B3F", "#C66000", "#638E1E", "#0E3E71", "#2E616F"];
	chartData.push(["Housing Recovery Stage", "Frequency A", {role: "style"}, "Frequency B", {role: "style"}]);
	for (let i=0; i< dataA.length; i++) {
		chartData.push([`Stage ${(i+1).toString()}`, dataA[i], colorsA[i%4], dataB[i], colorsB[i%4]]);
	}

	return chartData;
};

export default function HHSBarChartCompare(props) {
	const { height, width, dataA, dataB, title } = props;

	return (
		dataA && dataB ?
			<div className="barChart">
				<Chart
					width={width}
					height={height}
					chartType="ColumnChart"
					loader={<div>Loading Chart</div>}
					data={ParseData(dataA, dataB)}
					options={{
						title: title,
						legend: { position: "none" },
						bar:{ groupWidth: "50%" },
						vAxis: {
							title: "Frequency",
							titleTextStyle:{ italic: false }
						},
					}}
				/>
			</div>
			:
			<></>
	);
}

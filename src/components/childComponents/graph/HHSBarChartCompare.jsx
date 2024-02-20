import React from "react";
import Chart from "react-google-charts";

const ParseData = (dataA, dataB) => {
	const chartData = [];
	const colorsA = ["#6cb224", "#478f00", "#1d6c00", "#004b00", "#002d00"];
	const colorsB = ["#dfb877", "#e7a53a", "#cf8000", "#a46b0f", "#7a5213"];
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
						legend: { position: "top", alignment: "center" },
						series: {
						  0: { color: "#1d6c00" },
						  1: { color: "#cf8000" },
						},
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

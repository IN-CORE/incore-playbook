import React from "react";
import Chart from "react-google-charts";
import { csvToArray } from "../../../utils/common";

const ParseData = (data) => {
	const chartData = [];
	const chartDataObj = {};
	const colors = ["#DB4F60", "#ff7e0f", "#A1BE2E", "#1e77b4", "#3fbecf"];
	chartData.push(["Sector", "Ratio of Capital Remaining", { role: "style" }]);

	// without header
	const dataArr = csvToArray(data, ",", false);

	let sortFunc = (a, b) => {
		if (a[0] < b[0]) return -1;
		if (a[0] > b[0]) return +1;
		return 0;
	};

	if (dataArr[0][0].lastIndexOf("_") === -1) {
		if (
			!(dataArr[0][0].startsWith("M") || dataArr[0][0].endsWith("M")) &&
			!(dataArr[0][0].startsWith("I") || dataArr[0][0].endsWith("I"))
		) {
			for (let i = 0; i < dataArr.length; i++) {
				chartData.push([dataArr[i][0], parseFloat(dataArr[i][1]), colors[i % 5]]);
			}
			return chartData;
		}

		let galDataArry = [];
		for (let i = 0; i < dataArr.length; i++) {
			if (dataArr[i][0].startsWith("H") && !/\d$/.test(dataArr[i][0])) {
				galDataArry.push([dataArr[i][0].slice(0, dataArr[i][0].length - 1), parseFloat(dataArr[i][1])]);
			} else {
				galDataArry.push([dataArr[i][0].slice(1), parseFloat(dataArr[i][1])]);
			}
		}

		for (let i = 0; i < galDataArry.length; i++) {
			if (galDataArry[i][0].startsWith("H") && /\d$/.test(galDataArry[i][0])) {
				chartData.push([`${galDataArry[i][0]}I`, galDataArry[i][1], colors[i % 5]]);
			} else {
				chartData.push([`I${galDataArry[i][0]}`, galDataArry[i][1], colors[i % 5]]);
			}
		}

		return chartData;
	}

	for (let i = 0; i < dataArr.length; i++) {
		let last_idx_ = dataArr[i][0].lastIndexOf("_");
		let key = dataArr[i][0].slice(0, last_idx_);
		let subKey = dataArr[i][0].slice(last_idx_ + 1);

		if (chartDataObj[key] !== undefined) {
			chartDataObj[key].push([subKey, parseFloat(dataArr[i][1])]);
		} else {
			chartDataObj[key] = [[subKey, parseFloat(dataArr[i][1])]];
		}
	}

	let i = 0;
	for (let [key, regions] of Object.entries(chartDataObj)) {
		regions = regions.sort(sortFunc);

		for (const [subKey, value] of regions) {
			chartData.push([`${key}_${subKey}`, value, colors[i % 5]]);
		}
		i += 1;
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
					legend: { position: "none" },
					height: "25em",
					hAxis: {
						title: xAxisLegend,
						textStyle: {
							fontSize: 10 // or the number you want
						}
					},
					vAxis: {
						title: yAxisLegend,
						titleTextStyle: { italic: false },
						minValue: 0,
						maxValue: 1
					}
				}}
				// For tests
				rootProps={{ "data-testid": "1" }}
			/>
		</div>
	);
}

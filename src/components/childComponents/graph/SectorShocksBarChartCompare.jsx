import React from "react";
import Chart from "react-google-charts";
import { csvToArray } from "../../../utils/common";

const ParseData = (dataA, dataB) => {
	const chartData = [];
	const colorsA = "#aededb";
	const colorsB = "#2c698d";
	chartData.push([
		"Sector",
		"Ratio of Capital Remaining A",
		{ role: "style" },
		"Ratio of Capital Remaining B",
		{ role: "style" },
	]);

	// without header
	const dataArrA = csvToArray(dataA, ",", false);
	const dataArrB = csvToArray(dataB, ",", false);

	let sortFunc = (a, b) => {
		if (a[0] < b[0]) return -1;
		if (a[0] > b[0]) return +1;
		return 0;
	};

	if (
		dataArrA[0][0].lastIndexOf("_") === -1 &&
		dataArrB[0][0].lastIndexOf("_") === -1
	) {
		if (
			!(dataArrA[0][0].startsWith("M") || dataArrA[0][0].endsWith("M")) &&
			!(dataArrA[0][0].startsWith("I") || dataArrA[0][0].endsWith("I"))
		) {
			for (let i = 0; i < dataArrA.length; i++) {
				chartData.push([
					dataArrA[i][0],
					parseFloat(dataArrA[i][1]),
					colorsA,
					dataArrB.length > i ? parseFloat(dataArrB[i][1]) : 0,
					colorsB,
				]);
			}
			return chartData;
		}

		let galDataArryA = generateGalDataArry(dataArrA);
		let galDataArryB = generateGalDataArry(dataArrB);
		for (let i = 0; i < galDataArryA.length; i++) {
			if (
				galDataArryA[i][0].startsWith("H") &&
				/\d$/.test(galDataArryA[i][0])
			) {
				chartData.push([
					`${galDataArryA[i][0]}I`,
					galDataArryA[i][1],
					colorsA,
					galDataArryB[i][1],
					colorsB,
				]);
			} else {
				chartData.push([
					`I${galDataArryA[i][0]}`,
					galDataArryA[i][1],
					colorsA,
					galDataArryB.length > i ? galDataArryB[i][1] : 0,
					colorsB,
				]);
			}
		}

		return chartData;
	}

	let chartDataObjA = generateChartDataObj(dataArrA);
	let chartDataObjB = generateChartDataObj(dataArrB);

	// Make sure both objects have the same keys
	const keys = Object.keys(chartDataObjA);

	// Loop through both objects together
	for (const key of keys) {
		let regionsA = chartDataObjA[key];
		let regionsB = chartDataObjB[key];
		regionsA = regionsA.sort(sortFunc);
		regionsB = regionsB.sort(sortFunc);

		regionsA.forEach((objA, i) => {
			const subKeyA = objA.subKey;
			const valueA = objA.value;
			const objB = regionsB[i];
			const valueB = objB.value;

			chartData.push([`${key}_${subKeyA}`, valueA, colorsA, valueB, colorsB]);
		});
	}

	return chartData;
};

function generateChartDataObj(dataArr) {
	const chartDataObj = {};
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
	return chartDataObj;
}

function generateGalDataArry(dataArr) {
	let galDataArry = [];
	for (let i = 0; i < dataArr.length; i++) {
		if (dataArr[i][0].startsWith("H") && !/\d$/.test(dataArr[i][0])) {
			galDataArry.push([
				dataArr[i][0].slice(0, dataArr[i][0].length - 1),
				parseFloat(dataArr[i][1]),
			]);
		} else {
			galDataArry.push([dataArr[i][0].slice(1), parseFloat(dataArr[i][1])]);
		}
	}
	return galDataArry;
}

export default function SectorShocksBarChartCompare(props) {
	const { height, width, dataA, dataB, title, xAxisLegend, yAxisLegend } =
		props;

	return (
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
						0: { color: "#aededb", labelInLegend: "Execution A" }, // Customize color and name for Data A
						1: { color: "#2c698d", labelInLegend: "Execution B" }, // Customize color and name for Data B
					},
					height: "40em",
					hAxis: {
						title: xAxisLegend,
						textStyle: {
							fontSize: 10, // or the number you want
						},
					},
					vAxis: {
						title: yAxisLegend,
						titleTextStyle: { italic: false },
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

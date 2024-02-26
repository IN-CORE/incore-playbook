import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-zoom";
import { Button } from "@material-ui/core";
import { round } from "../../../utils/common";

export function FunctionalityGraphCompare(props) {
	let { categorySummaryA, categorySummaryB } = props;

	const ref = React.useRef();

	const resetClick = () => {
		ref.current.chartInstance.resetZoom();
	};

	let categories = [];
	let funcPercentA = [];
	let funcCountA = [];
	let nonFuncPercentA = [];
	let nonFuncCountA = [];
	let funcPercentB = [];
	let funcCountB = [];
	let nonFuncPercentB = [];
	let nonFuncCountB = [];

	// Assuming categorySummaryA and categorySummaryB have the same categories
	categorySummaryA.forEach((entry, index) => {

		funcPercentA.push(entry.percent_functional < 0 ? 0 : round(entry.percent_functional * 100, 1));
		nonFuncPercentA.push(entry.percent_non_functional < 0 ? 0 : round(entry.percent_non_functional * 100, 1));
		funcCountA.push(entry.num_functional < 0 ? 0 : entry.num_functional);
		nonFuncCountA.push(entry.num_non_functional < 0 ? 0 : entry.num_non_functional);
		categories.push(entry.category.trim());

		// Match category in B with A
		const matchB = categorySummaryB[index];
		funcPercentB.push(matchB.percent_functional < 0 ? 0 : round(matchB.percent_functional * 100, 1));
		nonFuncPercentB.push(matchB.percent_non_functional < 0 ? 0 : round(matchB.percent_non_functional * 100, 1));
		funcCountB.push(matchB.num_functional < 0 ? 0 : matchB.num_functional);
		nonFuncCountB.push(matchB.num_non_functional < 0 ? 0 : matchB.num_non_functional);
	});

	let data = {
		labels: categories,
		datasets: [
			{
				label: "Functional Percentage A",
				backgroundColor: "#96B712",
				data: funcPercentA
			},
			{
				label: "Functional Percentage B",
				backgroundColor: "#2E5232",
				data: funcPercentB
			},
			{
				label: "Non-Functional Percentage A",
				backgroundColor: "#D63649",
				data: nonFuncPercentA
			},
			{
				label: "Non-Functional Percentage B",
				backgroundColor: "#833841",
				data: nonFuncPercentB
			},
			{
				label: "Functional Building Num A",
				data: funcCountA,
				hidden: true
			},
			{
				label: "Functional Building Num B",
				data: funcCountB,
				hidden: true
			},
			{
				label: "Non-Functional Building Num A",
				data: nonFuncCountA,
				hidden: true
			},
			{
				label: "Non-Functional Building Num B",
				data: nonFuncCountB,
				hidden: true
			}
		]
	};

	let options = {
		responsive: true,
		legend: {
			display: true,
			labels: {
				// Filter function to only display legends for datasets that are not hidden
				filter: function(legendItem, chartData) {
					return !chartData.datasets[legendItem.datasetIndex].hidden;
				}
			}
		},
		tooltips: {
			mode: "single",
			callbacks: {
				title: function() {
					return "";
				},
				label: function(item, data) {
					let datasetLabel = data.datasets[item.datasetIndex].label || "";
					let dataPoint = item.yLabel;
					let label = [`${datasetLabel}: ${dataPoint} %`];
					label.push(`${data.datasets[item.datasetIndex + 4].label}: ${data.datasets[item.datasetIndex + 4].data[item.index]}`);
					return label;
				}
			}
		},
		maintainAspectRatio: false,
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					fontFamily: "Rubik",
					fontSize: 14
				},
				categoryPercentage: 0.8,
				barPercentage: 0.75 // Adjust as needed for your design
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: "Percentage"
				},
				ticks: {
					maxTicksLimit: 6
				}
			}]
		},
		plugins: {
			zoom: {
				pan: {
					enabled: false
				},
				zoom: {
					enabled: true,
					mode: "y"
				}
			}
		}
	};

	return (
		<div>
			<div style={{ textAlign: "right" }}>
				<Button onClick={resetClick} variant="outlined" size="small" className="compactButton">
                    Reset Zoom
				</Button>
			</div>
			<div style={{ height: "180px" }}>
				<Bar data={data} options={options} ref={ref} />
			</div>
		</div>
	);
}

import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-zoom";
import { Button } from "@material-ui/core";
import { round } from "../../../utils/common";

export function FunctionalityGraph(props) {
	let { categorySummary } = props;

	const ref = React.useRef();

	const resetClick = () => {
		ref.current.chartInstance.resetZoom();
	};

	let categories = [];
	let funcPercent = [];
	let nonFuncPercent = [];
	let funcCount = [];
	let nonFuncCount = [];

	categorySummary.map((entry, _) => {
		funcPercent.push(
			entry.percent_functional < 0
				? 0
				: round(entry.percent_functional * 100, 1),
		);
		nonFuncPercent.push(
			entry.percent_non_functional < 0
				? 0
				: round(entry.percent_non_functional * 100, 1),
		);
		funcCount.push(entry.num_functional < 0 ? 0 : entry.num_functional);
		nonFuncCount.push(
			entry.num_non_functional < 0 ? 0 : entry.num_non_functional,
		);
		categories.push([entry.category.trim()]);
	});

	let data = {
		labels: categories,
		datasets: [
			{
				label: "Functional",
				backgroundColor: "#96B712",
				data: funcPercent,
			},
			{
				label: "Non-Functional",
				backgroundColor: "#D63649",
				data: nonFuncPercent,
			},
			{
				label: "Functional Buildings",
				data: funcCount,
				hidden: true,
			},
			{
				label: "Non-Functional Buildings",
				data: nonFuncCount,
				hidden: true,
			},
		],
	};

	let options = {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		tooltips: {
			mode: "single",
			callbacks: {
				title: function () {
					return "";
				},
				label: function (item, data) {
					let datasetLabel = data.datasets[item.datasetIndex].label || "";
					let dataPoint = item.yLabel;
					let label = [`${datasetLabel}: ${dataPoint} %`];
					label.push(
						`Buildings: ${
							data.datasets[item.datasetIndex + 2].data[item.index]
						}`,
					);
					return label;
				},
			},
		},
		scales: {
			xAxes: [
				{
					gridLines: {
						display: false,
					},
					barPercentage: 0.75,
					ticks: {
						// fontStyle: "bold",
						fontFamily: "Rubik",
						fontSize: 14,
					},
				},
			],
			yAxes: [
				{
					scaleLabel: {
						display: true,
						labelString: "Percentage",
					},
					ticks: {
						maxTicksLimit: 6,
					},
				},
			],
		},
		plugins: {
			zoom: {
				pan: {
					enabled: false,
				},
				zoom: {
					enabled: true,
					mode: "y",
					// Drag-to-zoom effect. Set same to false to disable
					drag: {
						borderColor: "rgba(225,225,225,0.3)",
						borderWidth: 5,
						backgroundColor: "rgb(225,225,225)",
						animationDuration: 0,
					},
					rangeMin: {
						x: 0,
						y: 0,
					},
				},
			},
		},
	};

	return (
		<div>
			<div style={{ textAlign: "right" }}>
				<Button
					onClick={resetClick}
					variant="outlined"
					size="small"
					className="compactButton"
				>
					Reset Zoom
				</Button>
			</div>
			<div style={{ maxWidth: "900px", height: "180px" }}>
				<Bar data={data} options={options} ref={ref} />
			</div>
		</div>
	);
}

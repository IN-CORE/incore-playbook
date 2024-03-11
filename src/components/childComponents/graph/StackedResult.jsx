import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-zoom";
import { Button } from "@material-ui/core";

export function StackedResult(props) {
	let { categorySummary } = props;
	const ref = React.useRef();

	const resetClick = () => {
		ref.current.chartInstance.resetZoom();
	};

	let categories = [];
	let totals = [];
	let DS_0 = []; //"DS_0" or "Insignificant" or "Affected"
	let DS_1 = []; //"DS_1" or "Moderate" or "Minor"
	let DS_2 = []; //"DS_2" or "Extensive" or "Major"
	let DS_3 = []; //"DS_3" or "Complete" or "Destroyed"

	categorySummary.map((entry, idx) => {
		DS_0.push(
			"DS_0" in entry && entry.DS_0 >= 0
				? entry.DS_0
				: "Insignificant" in entry && entry.Insignificant >= 0
					? entry.Insignificant
					: "Affected" in entry && entry.Affected >= 0
						? entry.Affected
						: 0,
		);
		DS_1.push(
			"DS_1" in entry && entry.DS_1 >= 0
				? entry.DS_1
				: "Moderate" in entry && entry.Moderate >= 0
					? entry.Moderate
					: "Minor" in entry && entry.Minor >= 0
						? entry.Minor
						: 0,
		);
		DS_2.push(
			"DS_2" in entry && entry.DS_2 >= 0
				? entry.DS_2
				: "Extensive" in entry && entry.Extensive >= 0
					? entry.Extensive
					: "Major" in entry && entry.Major >= 0
						? entry.Major
						: 0,
		);
		DS_3.push(
			"DS_3" in entry && entry.DS_3 >= 0
				? entry.DS_3
				: "Complete" in entry && entry.Complete >= 0
					? entry.Complete
					: "Destroyed" in entry && entry.Destroyed >= 0
						? entry.Destroyed
						: 0,
		);
		totals.push(DS_0[idx] + DS_1[idx] + DS_2[idx] + DS_3[idx]);
		categories.push([entry.category.trim(), `(total: ${totals[idx]})`]);
	});

	let data = {
		labels: categories,
		datasets: [
			{
				label: "Insignificant" in categorySummary[0]? "Insignificant":
					"Affected" in categorySummary[0]? "Affected": "DS_0",
				backgroundColor: "#96B712",
				data: DS_0,
			},
			{
				label: "Moderate" in categorySummary[0]? "Moderate":
					"Minor" in categorySummary[0]? "Minor": "DS_1",
				backgroundColor: "#F7C137",
				data: DS_1,
			},
			{
				label: "Extensive" in categorySummary[0]? "Extensive":
					"Major" in categorySummary[0]? "Major": "DS_2",
				backgroundColor: "#ED8036",
				data: DS_2,
			},
			{
				label: "Complete" in categorySummary[0]? "Complete":
					"Destroyed" in categorySummary[0]? "Destroyed": "DS_3",
				backgroundColor: "#D63649",
				data: DS_3,
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
			callbacks: {
				title: function () {
					return "";
				},
				label: function (item, data) {
					let datasetLabel = data.datasets[item.datasetIndex].label || "";
					let dataPoint = item.yLabel;
					return `${datasetLabel}: ${dataPoint} buildings`;
				},
			},
		},
		scales: {
			xAxes: [
				{
					stacked: true,
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
					stacked: true,
					scaleLabel: {
						display: true,
						labelString: "Buildings",
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

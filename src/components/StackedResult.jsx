import React from "react";
import {Bar} from "react-chartjs-2";

export function StackedResult(props) {
	let {categorySummary} = props;

	categorySummary = "[{\"category\": \"Critical Facilities\", \"complete\": 0, \"heavy\": 2, \"insignific\": 25, \"moderate\": 0}, {\"category\": \"Emergency Housing \", \"complete\": -1, \"heavy\": -1, \"insignific\": -1, \"moderate\": -1}, {\"category\": \"Housing / Neighborhood\", \"complete\": 2453, \"heavy\": 3, \"insignific\": 5841, \"moderate\": 9}, {\"category\": \"Community Recovery\", \"complete\": 159, \"heavy\": 25, \"insignific\": 844, \"moderate\": 85}]";

	let resJson = JSON.parse(categorySummary);

	let categories = [];
	let totals = [];
	let insignific = [];
	let moderate = [];
	let extensive = [];
	let complete = [];

	resJson.map((entry, idx) => {
		insignific.push(entry.insignific < 0 ? 0 : entry.insignific);
		moderate.push(entry.moderate < 0 ? 0 : entry.moderate);
		extensive.push(entry.heavy < 0 ? 0 : entry.heavy);
		complete.push(entry.complete < 0 ? 0 : entry.complete);
		totals.push(insignific[idx] + moderate[idx] + extensive[idx] + complete[idx]);
		categories.push([entry.category.trim(), `(total: ${  totals[idx]  })`]);
	});

	let data = {
		labels: categories,
		datasets: [
			{
				label: "Insignificant",
				backgroundColor: "#96B712",
				data: insignific
			},
			{
				label: "Moderate",
				backgroundColor: "#F7C137",
				data: moderate
			},
			{
				label: "Extensive",
				backgroundColor: "#ED8036",
				data: extensive
			},
			{
				label: "Complete",
				backgroundColor: "#D63649",
				data: complete
			}
		]
	};

	let options = {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: false
		},
		tooltips: {
			callbacks: {
				title: function() {
					return "";
				},
				label: function(item, data) {
					let datasetLabel = data.datasets[item.datasetIndex].label || "";
					let dataPoint = item.yLabel;
					return `${datasetLabel }: ${ dataPoint } buildings`;
				}
			}
		},
		scales: {
			xAxes:[{
				stacked: true,
				gridLines: {
					display: false
				},
				barPercentage: 0.75,
				ticks: {
					fontStyle: "bold",
					fontFamily: "Rubik",
					fontSize: 14
				}
			}],
			yAxes:[{
				stacked: true,
				scaleLabel: {
					display: true,
					labelString: "Buildings"
				},
				ticks: {
					maxTicksLimit: 6
				}
			}],
		}
	};

	return(
		<div style={{maxWidth: "900px", height: "250px"}}>
			<Bar data={data} options={options}/>
		</div>
	);

}

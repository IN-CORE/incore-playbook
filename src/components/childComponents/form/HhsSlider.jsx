import React from "react";
import { IncoreSlider } from "../../styledComponents/IncoreSlider";

export default function HhsSlider(props) {
	const { marks, value, handleChange } = props;

	return (
		<IncoreSlider
			step={null}
			defaultValue={marks[0]["value"]}
			aria-labelledby="discrete-slider-restrict"
			valueLabelDisplay="off"
			marks={marks}
			min={marks[0]["value"]}
			max={marks[marks.length - 1]["value"]}
			value={value}
			onChange={handleChange}
			track={false}
		/>
	);
}

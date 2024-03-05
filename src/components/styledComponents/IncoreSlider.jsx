import { styled } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

export const IncoreSlider = styled(Slider)({
	color: "#00619D",
	height: 8,
	"& .MuiSlider-thumb": {
		height: 16,
		width: 16,
		backgroundColor: "#FFF",
		border: "4px solid #00619D",
		"&:focus, &:hover, &$active": {
			boxShadow: "inherit",
		},
	},
	"& .MuiSlider-mark": {
		display: "none",
	},
	"& .MuiSlider-markLabel": {
		color: "#2E384D",
		fontSize: "15px",
		fontWeight: 500,
	},
	"& .MuiSlider-markLabelActive": {
		color: "#00619D",
		fontSize: "15px",
		fontWeight: 500,
	},
	"& .MuiSlider-track": {
		height: 8,
		borderRadius: 4,
	},
	"& .MuiSlider-rail": {
		height: 8,
		borderRadius: 4,
	},
});

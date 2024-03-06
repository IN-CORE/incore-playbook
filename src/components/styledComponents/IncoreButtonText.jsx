import { styled } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

export const IncoreButtonText = styled(Button)({
	height: "41px",
	width: "100%",
	fontSize: "16px",
	fontWeight: 500,
	"&:hover": {
		color: "#2C4170",
	},
	color: "#00619D",
	textTransform: "capitalize",
});

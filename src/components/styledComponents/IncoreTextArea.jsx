import { styled } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export const IncoreTextArea = styled(TextField)({
	width: "100%",
	"& .MuiInputBase-root": {
		width: "100%",
		color: "#2E384D",
		fontSize: "15px",
		fontWeight: 500,
		letterSpacing: 0,
		backgroundColor: "#FFFFFF",
		position: "relative",
	},
});

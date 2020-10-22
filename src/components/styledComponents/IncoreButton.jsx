import {styled} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

export const IncoreButton = styled(Button)({
	height: "41px",
	width: "100%",
	fontSize: "16px",
	fontWeight: 500,
	backgroundColor: "#00619D",
	"&:hover": {
		backgroundColor: "#96B712"
	},
	color:"#ffffff"
});

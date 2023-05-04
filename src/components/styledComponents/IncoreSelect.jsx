import { styled } from "@material-ui/core/styles";
import { Select, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export const IncoreSelectBox = styled(Select)({
	boxSizing: "border-box",
	height: "41px",
	width: "100%",
	color: "#2E384D",
	fontSize: "15px",
	fontWeight: 500,
	letterSpacing: 0,
	lineHeight: "18px",
	backgroundColor: "#FFFFFF",
	position: "relative",
	"&:before, &:after": {
		borderColor: "#00619D",
	},
	"& .MuiSelect-select:focus": {
		backgroundColor: "#FFFFFF!important"
	},
});

export const IncoreMenuItem = styled(MenuItem)({
	height: "41px",
	width: "100%",
	color: "#2E384D",
	fontSize: "15px",
	fontWeight: 500,
	letterSpacing: 0,
	lineHeight: "18px",
	backgroundColor: "#FFFFFF"
});

export const IncoreAutocomplete = styled(Autocomplete)({
	boxSizing: "border-box",
	height: "41px",
	width: "100%",
	color: "#2E384D",
	fontSize: "15px",
	fontWeight: 500,
	letterSpacing: 0,
	lineHeight: "18px",
	backgroundColor: "#FFFFFF",
	position: "relative",
	"&:before, &:after": {
		borderColor: "#00619D",
	},
	"& .MuiSelect-select:focus": {
		backgroundColor: "#FFFFFF!important"
	},
});

export const IncoreTextField = styled(TextField)({
	boxSizing: "border-box",
	height: "41px",
	width: "100%",
	color: "#2E384D",
	fontSize: "15px",
	fontWeight: 500,
	letterSpacing: 0,
	lineHeight: "18px",
	backgroundColor: "#FFFFFF",
	position: "relative",
	"&:before, &:after": {
		borderColor: "#00619D",
	},
	"& .MuiSelect-select:focus": {
		backgroundColor: "#FFFFFF!important"
	},
});

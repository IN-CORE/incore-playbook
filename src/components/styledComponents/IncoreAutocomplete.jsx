import { styled } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

export const IncoreAutocomplete = styled(Autocomplete)({
	"height": "41px",
	"width": "100%",
	"color": "#2E384D",
	"fontSize": "15px",
	"fontWeight": 500,
	"letterSpacing": 0,
	"lineHeight": "18px",
	"position": "relative",
	"&:before, &:after": {
		borderColor: "#00619D"
	},
	"& .MuiSelect-select:focus": {
		backgroundColor: "#FFFFFF!important"
	}
});

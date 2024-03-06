import { styled } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

export const IncoreLinkSmall = styled(Link)({
	color: "#00619D",
	wordBreak: "break-word",
	"&:hover": {
		cursor: "pointer",
	},
	fontWeight: 500,
});

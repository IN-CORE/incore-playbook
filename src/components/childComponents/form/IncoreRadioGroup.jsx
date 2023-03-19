import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	radio: {
		color: "#69707F"
	},
	label: {
		fontSize: "12px"
	}
});


export const IncoreRadioGroup = (props) => {

	const {options, value, handleChange} = props;

	const classes = useStyles();

	return (
		<FormControl component="fieldset">
			<RadioGroup
				row
				name="radioGroup"
				value={value}
				className={classes.radio}
				onChange={handleChange}
			>
				{
					options ? options.map((option) => {
						return (
							<FormControlLabel
								value={option["value"]}
								key={option["value"]}
								control={<Radio color="primary" size="small" />}
								className={classes.label}
								label={<Typography className={classes.label}>{option["name"]}</Typography>}
							/>
						);
					})
						:
						null
				}
			</RadioGroup>
		</FormControl>
	);
};

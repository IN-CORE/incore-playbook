import { Box } from "@material-ui/core";
import { IncoreInputLabel } from "./IncoreInputLabel";
import { IncoreTextField } from "./IncoreInput";
import React from "react";

export const CustomTextInput = (item) => {
	return (
		<Box style={{ marginTop: "10px" }}>
			<IncoreInputLabel
				className={item.schema.required ? "required-field" : ""}
			>
				{item.schema.title}
			</IncoreInputLabel>
			<IncoreTextField
				value={item.value}
				variant="outlined"
				onChange={(e) => {
					item.onChange(e.target.value);
				}}
			/>
		</Box>
	);
};

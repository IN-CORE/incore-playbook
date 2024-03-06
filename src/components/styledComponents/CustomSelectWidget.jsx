import { Box } from "@material-ui/core";
import { IncoreInputLabel } from "./IncoreInputLabel";
import { IncoreMenuItem, IncoreSelectBox } from "./IncoreSelect";
import React from "react";

export const CustomSelectWidget = (item) => {
	return (
		<Box style={{ marginTop: "10px" }}>
			<IncoreInputLabel>{item.schema.title}</IncoreInputLabel>
			<IncoreSelectBox
				labelId="label"
				id="select"
				variant="outlined"
				defaultValue={item.schema.enum[0]}
				onChange={(e) => {
					item.onChange(e.target.value);
				}}
			>
				{item.schema.enum.map((option, i) => {
					return (
						<IncoreMenuItem value={option} key={option}>
							{item.schema.enumNames
								? item.schema.enumNames[i]
								: item.schema.enum[i]}
						</IncoreMenuItem>
					);
				})}
			</IncoreSelectBox>
		</Box>
	);
};

import React, { useState } from "react";

import { Box, Container } from "@material-ui/core";

import { IncoreButton } from "../../styledComponents/IncoreButton";
import LoadingOverlay from "react-loading-overlay";
import { CustomSelectWidget } from "../../styledComponents/CustomSelectWidget";
import { CustomTextInput } from "../../styledComponents/CustomTextWidget";
import DatasetFloodSchema from "../../../schema/flood/datasetFlood.json";
import DatasetFloodUiSchema from "../../../schema/flood/datasetFloodUi.json";
import { createRjfsDatasetHazards } from "../../../utils/hazard";

import Form from "@rjsf/material-ui";
import { useSelector } from "react-redux";
import { move2TestbedSpace } from "../../../utils/common";

export default function DatasetFlood(props) {
	const { value, index, handleLayerUpdate, handleListUpdate, ...other } = props;
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const [loading, setLoading] = useState(false);

	const widgets = {
		TextWidget: CustomTextInput,
		SelectWidget: CustomSelectWidget
	};

	const onSave = async (formData) => {
		setLoading(true);
		const floodJson = await createRjfsDatasetHazards(globalConfig, formData, "floods");
		if (floodJson && floodJson["id"]) {
			// move to testbed space
			await move2TestbedSpace(globalConfig, floodJson["id"]);
			handleLayerUpdate(floodJson);
			handleListUpdate(globalConfig, "floods");
		}
		setLoading(false);
	};

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Container>
					<LoadingOverlay active={loading} spinner text="Saving...">
						<Form
							schema={DatasetFloodSchema}
							uiSchema={DatasetFloodUiSchema}
							widgets={widgets}
							onSubmit={({ formData }, e) => {
								onSave(formData);
							}}
						>
							<Box className="inputGroup">
								<IncoreButton variant="contained" type="submit">
									Save
								</IncoreButton>
							</Box>
						</Form>
					</LoadingOverlay>
				</Container>
			)}
		</div>
	);
}

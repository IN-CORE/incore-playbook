import React, {useState} from "react";

import {Box, Container} from "@material-ui/core";

import {IncoreButton} from "../../styledComponents/IncoreButton";
import LoadingOverlay from "react-loading-overlay";
import {CustomSelectWidget} from "../../styledComponents/CustomSelectWidget";
import {CustomTextInput} from "../../styledComponents/CustomTextWidget";
import DatasetTsunamiSchema from "../../../schema/tsunami/datasetTsunami.json";
import DatasetTsunamiUiSchema from "../../../schema/tsunami/datasetTsunamiUi.json";
import {createRjfsDatasetHazards} from "../../../utils/hazard";

import Form from "@rjsf/material-ui";
import {useSelector} from "react-redux";

export default function DatasetTsunami(props) {
	const {value, index, handleLayerUpdate, handleListUpdate, ...other} = props;
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const [loading, setLoading] = useState(false);

	const widgets = {
		TextWidget: CustomTextInput,
		SelectWidget: CustomSelectWidget,
	};

	const onSave = async (formData) => {
		setLoading(true);
		const tsunamiJson = await createRjfsDatasetHazards(globalConfig, formData, "tsunamis");
		if (tsunamiJson !== {}){
			handleLayerUpdate(tsunamiJson);
			handleListUpdate(globalConfig, "tsunamis");
		}
		setLoading(false);
	};

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
			 aria-labelledby={`simple-tab-${index}`}
			 {...other}
		>
			{value === index && (

				<Container>
					<LoadingOverlay
						active={loading}
						spinner
						text="Saving..."
					>
						<Form schema={DatasetTsunamiSchema}
							  uiSchema={DatasetTsunamiUiSchema}
							  widgets={widgets}
							  onSubmit={({formData}, e) => {onSave(formData);}}>
							<Box className="inputGroup">
								<IncoreButton variant="contained" type="submit">Save</IncoreButton>
							</Box>
						</Form>
					</LoadingOverlay>
				</Container>
			)}
		</div>
	);

}

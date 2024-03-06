import React, { useEffect, useRef, useState } from "react";

import { Box, Container } from "@material-ui/core";

import { IncoreButton } from "../../styledComponents/IncoreButton";
import { IncoreTextField } from "../../styledComponents/IncoreInput";
import { IncoreInputLabel } from "../../styledComponents/IncoreInputLabel";

import FileUploadDrop from "../form/FileUploadDrop";

import { createRasterTornado } from "../../../utils/hazard";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
import { move2TestbedSpace } from "../../../utils/common";

export default function RasterTornado(props) {
	const { value, index, handleLayerUpdate, handleListUpdate, ...other } = props;
	const globalConfig = useSelector((state) => state.config.globalConfig);

	const fileInputRef = useRef(null);
	const [files, setFile] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	// form check
	useEffect(() => {
		if (name !== "" && description !== "" && files.length > 0)
			setDisabled(false);
		else setDisabled(true);
	}, [name, description, files]);

	const onFileInputChange = (event) => {
		const fileList = Array.from(event.target.files);
		setFile(fileList);
	};

	const onDrop = (fileList, event) => {
		setFile(Array.from(fileList));
	};

	const onSave = async () => {
		setLoading(true);
		// check if all fields are filled:
		const tornadoJson = await createRasterTornado(
			globalConfig,
			name,
			description,
			files,
		);
		if (tornadoJson && tornadoJson["id"]) {
			// move to testbed space
			await move2TestbedSpace(globalConfig, tornadoJson["id"]);
			handleLayerUpdate(tornadoJson);
			handleListUpdate(globalConfig, "tornado");
			setFile([]);
			setName("");
			setDescription("");
		}
		setLoading(false);
	};

	const onDeleteClick = (filename) => {
		setFile(files.filter((file) => file.name !== filename));
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
						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">
								Name
							</IncoreInputLabel>
							<IncoreTextField
								value={name}
								variant="outlined"
								onChange={(e) => setName(e.target.value)}
							/>
						</Box>
						<Box className="inputGroup">
							<IncoreInputLabel className="required-field">
								Description
							</IncoreInputLabel>
							<IncoreTextField
								value={description}
								variant="outlined"
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Box>
						<Box className="inputGroup">
							<FileUploadDrop
								className="required-field"
								onDrop={onDrop}
								onFileInputChange={onFileInputChange}
								fileInput={fileInputRef}
								files={files}
								onDeleteClick={onDeleteClick}
							/>
						</Box>
						<Box className="inputGroup">
							<IncoreButton
								variant="contained"
								onClick={onSave}
								disabled={disabled}
							>
								Save
							</IncoreButton>
						</Box>
					</LoadingOverlay>
				</Container>
			)}
		</div>
	);
}

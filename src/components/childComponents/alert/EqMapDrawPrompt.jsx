import React from "react";
import { MapDrawPrompt } from "./MapDrawPrompt";

export const EqMapDrawPrompt = (props) => {
	const { mapDialogOpen, handleMapDialogClose } = props;

	const promptElem = (
		<>
			<span
				style={{
					height: "2em",
					width: "2em",
					backgroundColor: "#D63649",
					borderRadius: "50%",
					display: "block",
					margin: "auto",
				}}
			/>
			<span>Epicenter</span>
		</>
	);

	return (
		<MapDrawPrompt
			mapDialogOpen={mapDialogOpen}
			handleMapDialogClose={handleMapDialogClose}
			promptTitle="Define Epicenter"
			promptText="Click on the map to draw the dot below to define the epicenter of an earthquake.
					   The locations will automatically be entered into the form.
					   Alternatively, you can directly edit the coordinates."
			promptElem={promptElem}
		/>
	);
};

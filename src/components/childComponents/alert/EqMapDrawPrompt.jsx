import React from "react";
import { MapDrawPrompt } from "./MapDrawPrompt";


export const EqMapDrawPrompt = (props) => {
	const { mapDialogOpen, handleMapDialogClose } = props;

	const promptElem = (<>
		<span style={{height: "2em", width: "2em", backgroundColor: "#D63649", borderRadius: "50%",
			display:"block", margin:"auto"}} />
		<span>Epicenter</span>
	</>);

	return (
		<MapDrawPrompt mapDialogOpen={mapDialogOpen}
					   handleMapDialogClose={handleMapDialogClose}
					   promptTitle="Define Start and End"
					   promptText="Click and drag the circles below to define the start and stop positions of the tornado path that
					   you are defining.The locations will automatically be entered into the form.
					   Alternatively, you can directly edit the coordinates."
					   promptElem={promptElem}
		/>
	);
};

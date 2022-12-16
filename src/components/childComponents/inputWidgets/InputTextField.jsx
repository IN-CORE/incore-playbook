import React from "react";
import { IncoreTextField } from "../../styledComponents/IncoreInput";

export default function InputTextField(props) {
	const { setDatawolfFormState, datawolfFormState, datawolfParamConfigItem } = props;

	return (
		<IncoreTextField
			variant="outlined"
			onChange={(e) => {
				let currentVal = e.target.value;
				setDatawolfFormState((prevState) => {
					let mapState = {};
					datawolfParamConfigItem.parametersMap.map((pm) => {
						mapState[pm.paramId] = currentVal;
					});
					return { ...prevState, [datawolfParamConfigItem.variableName]: mapState };
				});
			}}
			// parameters belong to the same variable should have the same value; just pick one
			value={
				datawolfFormState[datawolfParamConfigItem.variableName][
					Object.keys(datawolfFormState[datawolfParamConfigItem.variableName])[0]
				] ?? ""
			}
		/>
	);
}

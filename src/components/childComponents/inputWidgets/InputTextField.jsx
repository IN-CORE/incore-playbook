import React from "react";
import {IncoreTextField} from "../../styledComponents/IncoreInput";


export default function InputTextField(props) {

	const {setDatawolfFormState, datawolfFormState, datawolfParamConfigItem} = props;

	return (
		<IncoreTextField variant="outlined"
						 value={datawolfFormState[datawolfParamConfigItem.parameters.variableName][datawolfParamConfigItem.paramId] ?? ""}
						 onChange={(e) => {// e.target.value inside async doesn't perform correctly
							 let currentVal = e.target.value;
							 setDatawolfFormState(prevState =>
								 ({...prevState, [datawolfParamConfigItem.parameters.variableName]: {[datawolfParamConfigItem.paramId]: currentVal}}));}}/>
	);
}

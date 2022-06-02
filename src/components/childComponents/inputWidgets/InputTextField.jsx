import React from "react";
import {IncoreTextField} from "../../styledComponents/IncoreInput";


export default function InputTextField(props) {

	const {setDatawolfFormState, datawolfFormState, datawolfConfigItem} = props;

	return (
		<IncoreTextField variant="outlined"
						 value={datawolfFormState[datawolfConfigItem.parameters.variableName][datawolfConfigItem.paramId] ?? ""}
						 onChange={(e) => {// e.target.value inside async doesn't perform correctly
							 let currentVal = e.target.value;
							 setDatawolfFormState(prevState =>
								 ({...prevState, [datawolfConfigItem.parameters.variableName]: {[datawolfConfigItem.paramId]: currentVal}}));}}/>
	);
}

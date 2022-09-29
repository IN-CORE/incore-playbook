import React from "react";
import {IncoreMenuItem, IncoreSelectBox} from "../../styledComponents/IncoreSelect";
import {useSelector} from "react-redux";


export default function AllowedHazardTypes(props) {

	const {setDatawolfFormState, datawolfFormState, datawolfParamConfigItem} = props;

	const alllowedHazardTypes = useSelector((state) => state.config.allowedHazardTypes);

	return (
		<IncoreSelectBox labelId="label" id="select" variant="outlined"
						 onChange={(e) => {
							 let currentVal = e.target.value;
							 setDatawolfFormState(prevState =>
								 ({...prevState, [datawolfParamConfigItem.parameters.variableName]: {[datawolfParamConfigItem.paramId]: currentVal}}));
						 }}
						 value={datawolfFormState[datawolfParamConfigItem.parameters.variableName][datawolfParamConfigItem.paramId] ?? ""}>
			{
				alllowedHazardTypes.map((option) => {
					return (
						<IncoreMenuItem value={option} key={option}>{option}</IncoreMenuItem>
					);
				})
			}
		</IncoreSelectBox>
	);
}

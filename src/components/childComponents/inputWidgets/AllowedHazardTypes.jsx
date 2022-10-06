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
							 setDatawolfFormState((prevState) => {
								 let mapState = {};
								 datawolfParamConfigItem.parametersMap.map((pm) => {
									 mapState[pm.paramId] = currentVal;
								 });
								 return {...prevState, [datawolfParamConfigItem.variableName]: mapState};
							 });
						 }}
			// parameters belong to the same variable should have the same value; just pick one
						 value={datawolfFormState[datawolfParamConfigItem.variableName][
							 Object.keys(datawolfFormState[datawolfParamConfigItem.variableName])[0]] ?? ""
						 }
		>
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

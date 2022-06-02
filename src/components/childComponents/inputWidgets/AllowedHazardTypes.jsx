import React from "react";
import {IncoreMenuItem, IncoreSelectBox} from "../../styledComponents/IncoreSelect";
import {useSelector} from "react-redux";


export default function AllowedHazardTypes(props) {

	const {setDatawolfFormState, datawolfFormState, datawolfConfigItem} = props;

	const alllowedHazardTypes = useSelector((state) => state.config.allowedHazardTypes);

	return (
		<IncoreSelectBox labelId="label" id="select" variant="outlined"
						 onChange={(e) => {
							 let currentVal = e.target.value;
							 setDatawolfFormState(prevState =>
								 ({...prevState, [datawolfConfigItem.parameters.variableName]: {[datawolfConfigItem.paramId]: currentVal}}));
						 }}
						 value={datawolfFormState[datawolfConfigItem.parameters.variableName][datawolfConfigItem.paramId] ?? ""}>
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

import React, {useEffect} from "react";
import {IncoreMenuItem, IncoreSelectBox} from "../../styledComponents/IncoreSelect";
import {useDispatch, useSelector} from "react-redux";
import {inputDatasetTypes} from "../../../globals";
import {fetchDatasets} from "../../../actions/datasets";


export default function ValueLosses(props) {

	const {setDatawolfFormState, datawolfFormState, datawolfParamConfigItem} = props;

	const dispatch = useDispatch();
	const listDatasets = (config, limit, offset, type) => dispatch(fetchDatasets(config, limit, offset, type));
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const valueLosses = useSelector((state) => state.dataset.valueLosses);

	useEffect(() =>{
		inputDatasetTypes.valueLosses.map((inputDatasetType) => {
			listDatasets(globalConfig, inputDatasetType["num"], 0, inputDatasetType["type"]);
		});
	}, []);

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
							 datawolfFormState[datawolfParamConfigItem.variableName].keys()[0]] ?? ""
						 }
		>
			{
				valueLosses.map((option) => {
					return (
						<IncoreMenuItem value={option["id"]} key={option["id"]}>{option["title"]}</IncoreMenuItem>
					);
				})
			}
		</IncoreSelectBox>
	);
}

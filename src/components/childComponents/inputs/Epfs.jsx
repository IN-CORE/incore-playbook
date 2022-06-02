import React, {useEffect} from "react";
import {IncoreMenuItem, IncoreSelectBox} from "../../styledComponents/IncoreSelect";
import {useDispatch, useSelector} from "react-redux";
import {inputDatasetTypes} from "../../../globals";
import {fetchDatasets} from "../../../actions/datasets";


export default function Epfs(props) {

	const {setDatawolfFormState, datawolfFormState, datawolfConfigItem} = props;

	const dispatch = useDispatch();
	const listDatasets = (config, limit, offset, type) => dispatch(fetchDatasets(config, limit, offset, type));
	const globalConfig = useSelector((state) => state.config.globalConfig);
	const epfs = useSelector((state) => state.dataset.epfs);

	useEffect(() =>{
		listDatasets(globalConfig, inputDatasetTypes.epfs["num"], 0, inputDatasetTypes.epfs["type"]);
	}, []);

	return (
		<IncoreSelectBox labelId="label" id="select" variant="outlined"
						 onChange={(e) => {
							 let currentVal = e.target.value;
							 setDatawolfFormState(prevState =>
								 ({...prevState, [datawolfConfigItem.parameters.variableName]: {[datawolfConfigItem.paramId]: currentVal}}));
						 }}
						 value={datawolfFormState[datawolfConfigItem.parameters.variableName][datawolfConfigItem.paramId] ?? ""}>
			{
				epfs.map((option) => {
					return (
						<IncoreMenuItem value={option["id"]} key={option["id"]}>{option["title"]}</IncoreMenuItem>
					);
				})
			}
		</IncoreSelectBox>
	);
}

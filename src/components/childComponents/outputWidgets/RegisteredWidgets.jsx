import React from "react";
import Interdependency from "./Interdependency";
import BldgDamage from "./BldgDamage";
import PoleDamage from "./PoleDamage";
import BldgMCS from "./BldgMCS";
import BldgFunctionality from "./BldgFunctionality";
import CGE from "./CGE";
import PopDislocation from "./PopDislocation";
import ResilienceMetrics from "./ResilienceMetrics";
import SubstationDamage from "./SubstationDamage";
import HHS from "./HHS";
import Log from "./Log";
import SectorShocks from "./SectorShocks";

export const registeredWidgets = {
	Interdependency: <Interdependency />,
	BldgDamage: <BldgDamage />,
	PoleDamage: <PoleDamage />,
	BldgMCS: <BldgMCS />,
	BldgFunctionality: <BldgFunctionality />,
	// eslint-disable-next-line react/jsx-pascal-case
	CGE: <CGE />,
	PopDislocation: <PopDislocation />,
	ResilienceMetrics: <ResilienceMetrics />,
	SubstationDamage: <SubstationDamage />,
	// eslint-disable-next-line react/jsx-pascal-case
	HHS: <HHS />,
	Log: <Log />,
	SectorShocks: <SectorShocks />,
};

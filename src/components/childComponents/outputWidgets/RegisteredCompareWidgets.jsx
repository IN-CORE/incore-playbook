import React from "react";
import PoleDamage from "./PoleDamage";
import BldgMCS from "./BldgMCS";
import BldgFunctionality from "./BldgFunctionality";
import CGE from "./CGE";
import PopDislocation from "./PopDislocation";
import ResilienceMetrics from "./ResilienceMetrics";
import SubstationDamage from "./SubstationDamage";
import HHS from "./HHS";
import SectorShocks from "./SectorShocks";
import BldgDamageCompare from "./BldgDamageCompare";

export const registeredCompareWidgets = {
	BldgDamage: <BldgDamageCompare />,
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
	SectorShocks: <SectorShocks />
};

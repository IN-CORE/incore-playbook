import React from "react";
import PoleDamage from "./PoleDamage";
import CGECompare from "./CGECompare";
import PopDislocation from "./PopDislocation";
import ResilienceMetrics from "./ResilienceMetrics";
import SubstationDamage from "./SubstationDamage";
import SectorShocks from "./SectorShocks";
import BldgDamageCompare from "./BldgDamageCompare";
import HHSCompare from "./HHSCompare";
import BldgMCSCompare from "./BldgMCSCompare";
import BldgFunctionalityCompare from "./BldgFunctionalityCompare";

export const registeredCompareWidgets = {
	BldgDamage: <BldgDamageCompare />,
	PoleDamage: <PoleDamage />,
	BldgMCS: <BldgMCSCompare />,
	BldgFunctionality: <BldgFunctionalityCompare />,
	// eslint-disable-next-line react/jsx-pascal-case
	CGE: <CGECompare />,
	PopDislocation: <PopDislocation />,
	ResilienceMetrics: <ResilienceMetrics />,
	SubstationDamage: <SubstationDamage />,
	// eslint-disable-next-line react/jsx-pascal-case
	HHS: <HHSCompare />,
	SectorShocks: <SectorShocks />
};

import React from "react";
import PoleDamageCompare from "./PoleDamageCompare";
import BldgMCS from "./BldgMCS";
import CGECompare from "./CGECompare";
import PopDislocationCompare from "./PopDislocationCompare";
import ResilienceMetrics from "./ResilienceMetrics";
import SubstationDamage from "./SubstationDamage";
import SectorShocksCompare from "./SectorShocksCompare";
import BldgDamageCompare from "./BldgDamageCompare";
import HHSCompare from "./HHSCompare";
import BldgMCSCompare from "./BldgMCSCompare";
import BldgFunctionalityCompare from "./BldgFunctionalityCompare";

export const registeredCompareWidgets = {
	BldgDamage: <BldgDamageCompare />,
	BldgMCS: <BldgMCSCompare />,
	BldgFunctionality: <BldgFunctionalityCompare />,
	PoleDamage: <PoleDamageCompare />,
	// eslint-disable-next-line react/jsx-pascal-case
	CGE: <CGECompare />,
	PopDislocation: <PopDislocationCompare />,
	ResilienceMetrics: <ResilienceMetrics />,
	SubstationDamage: <SubstationDamage />,
	// eslint-disable-next-line react/jsx-pascal-case
	HHS: <HHSCompare />,
	SectorShocks: <SectorShocksCompare />
};

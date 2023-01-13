# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Added
- Pagination of list dataset and hazard [#70](https://github.com/IN-CORE/incore-playbook/issues/70)
- Toggle switch for showing all datawolf flows [#74](https://github.com/IN-CORE/incore-playbook/issues/74)
- Move created dataset and hazard into a common testbed space [#87](https://github.com/IN-CORE/incore-playbook/issues/87)
- Set Time intervals to periodically requesting datawolf execution status [#60](https://github.com/IN-CORE/incore-playbook/issues/60)
- Allow user to set document uri in each of the step [#81](https://github.com/IN-CORE/incore-playbook/issues/81)

### Changed
- Renamed master branch to main [#28](https://github.com/IN-CORE/incore-playbook/issues/28)
- Made data upload button on and off [#73](https://github.com/IN-CORE/incore-playbook/issues/73)
- Display multiple layers of hazard [#63](https://github.com/IN-CORE/incore-playbook/issues/63)

### Fixed
- First time load map layers at step 3-4 "view results" does not show correctly sometimes [#97](https://github.com/IN-CORE/incore-playbook/issues/97)

## [0.3.0] - 2021-11-16

### Added
- Description component for CGE data [#2](https://github.com/IN-CORE/incore-playbook/issues/2)
- CGE and Population Dislocation table components [#1](https://github.com/IN-CORE/incore-playbook/issues/1)
- Connect "run analysis" with datawolf workflow [#7](https://github.com/IN-CORE/incore-playbook/issues/7)
- Github action to auto build [#4](https://github.com/IN-CORE/incore-playbook/issues/4)
- Component to display resilience metrics [#14](https://github.com/IN-CORE/incore-playbook/issues/14)
- Enable Download of CGE and Population Dislocation outputs [#16](https://github.com/IN-CORE/incore-playbook/issues/16)

### Fixed
- Fix ESlint warnings and errors [#10](https://github.com/IN-CORE/incore-playbook/issues/10)

### Changed
- CGE and Population Dislocation table with additional column and rows [#13](https://github.com/IN-CORE/incore-playbook/issues/13)


## [0.2.0] - 2021-04-22

### Added
- Included HTML content for each step of the playbook on the steps pages. Enabled all the menu items [INCORE1-1045](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1045)
- Introduction HTML explaining each section of the playbook steps [INCORE1-1090](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1090)
- Ability to upload datasets related to EPF and interdependency [INCORE1-1119](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1119)
- Visualization for Monte Carlo Simulation analysis [INCORE1-1126](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1126)
- Visualization for EPF damage [INCORE1-1050](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1050)
- Visualization for Building Functionality [INCORE1-1049](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1049)
- Visualization for Building Functionality without Interdependency [INCORE1-1129](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1129)

### Updated
- Results View screen to include all the analyses related to Building Functionality [INCORE1-1091](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1091)
- Improvements to "Create Datasets" screens to support other datatypes [INCORE1-1074](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1074)
- "Run Analysis" functinality to use the new datawold workflow that runs all the analyses related to Building Functionality [INCORE1-1100](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1100)
- Margins and whitespaces to make the content more compact and scale better to screen sizes [INCORE1-1094](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1094)

### Fixed
- Bug related to logout not clearing the cookie when the cookie is set from homepage login [INCORE1-1114](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-1114)


## [0.1.0] - 2020-11-11

### Added
- Initial setups for the repository [INCORE1-804](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-804)
- Create login component [INCORE1-812](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-812)
- Add playbook app layout with header, footer and sidebar [INCORE1-813](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-813)
- Get attributes from geoserver and create attribute table component [INCORE1-814](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-814)
- Create team page component [INCORE1-817](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-817)
- Create step status component [INCORE1-818](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-818)
- Create step description component [INCORE1-819](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-819)
- Upgrade react and other packages with warnings [INCORE1-823](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-823)
- Create run analysis page component [INCORE1-824](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-824)
- Create community hazard component [INCORE1-827](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-827)
- Update dockerfile and routes [INCORE1-828](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-828)
- Create building environment page [INCORE1-839](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-839)
- Create incore playbook menus [INCORE1-840](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-840)
- Analysis component [INCORE1-848](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-848)
- Stacked barchart component for displaying grouped damage results [INCORE1-855](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-855)
- Adjust the CSS styles [INCORE1-856](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-856)
- Adjust the styles of breadcrumbs, menu items and etc [INCORE1-858](https://opensource.ncsa.illinois.edu/jira/browse/INCORE1-858)


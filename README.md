NIST Community Resilience Planning Playbook
============================================

**Work in Progress**

Requirements: [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com).

Install dependencies: `yarn install` or `npm install`

Install peer dependencies: `npm install react@~16.14.0 react-dom@~16.14.0 react-redux@~7.1.0 redux-thunk@~2.3.0 redux@~4.0.1 react-router-dom@~5.2.0 @material-ui/core@^4.11.0 @material-ui/icons@^4.9.1 babel-polyfill@^6.26.0 --no-save`

Develop: `export DEPLOY_ENV=development` and run `yarn start` or `npm start`

Build: `yarn run build` or `npm run build`

**Example of use this repository in child repositories**

1. `yarn link` to register the incore-playbook
2. Go to the child repository
3. `npm install` in child repository and link it by `yarn link incore-playbook`
4. `export DEPLOY_ENV=development` and `npm start`
5. Note: you should be able to set map configuration and allowed hazard types here: https://github.com/IN-CORE/Joplin-Playbook/blob/main/src/index.jsx

```
import render from "incore-playbook/src/render";
import baseReducer from "incore-playbook/src/reducers";
import baseRoutes from "incore-playbook/src/routes";
import {createTheme} from "@material-ui/core/styles";

const newTheme = createTheme({
	typography: {
		fontFamily: "Times New Roman"
	},
	palette:{
		fontFamily: "Times New Roman"
	}
});

export default (render(aggregatedReducer, aggregatedRoutes, newTheme));
```


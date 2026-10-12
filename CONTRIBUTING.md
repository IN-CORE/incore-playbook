# Contributing to incore-playbook

Start with the [IN-CORE developer guide](https://github.com/IN-CORE/.github/blob/main/DEVELOPING.md) (dev access, CORS, PR rules).

incore-playbook is a library (`@in-core/incore-playbook`) used by the testbed apps:
[Joplin](https://github.com/IN-CORE/Joplin-Playbook) · [Galveston](https://github.com/IN-CORE/Galveston-Playbook) · [SLC](https://github.com/IN-CORE/SLC-Playbook).

## Setup

```bash
npm install
pre-commit install
yarn link                                   # register local library

cd ../Joplin-Playbook                       # or another testbed
npm install && yarn link incore-playbook    # use your local library
export INCORE_REMOTE_HOSTNAME=https://dev.in-core.org && npm start
```

> Use the `export` above — `npm run start:dev` still points to the retired `incore-dev.ncsa.illinois.edu`.

Run on `localhost:3000` (or `:5000`) — the only origins dev allows via CORS. Pointing a local web client at prod (`tools.in-core.org`) will fail.
Local services: see [incore-services CONTRIBUTING](https://github.com/IN-CORE/incore-services/blob/develop/CONTRIBUTING.md#web-clients-incore-ui-studio-playbook-against-local-services).

## Commands

| Task | Command |
|------|---------|
| Build | `npm run build` |
| Test | `npm run test:headless` |
| Lint | `npm run lint` |

## Releasing

Bump the version in `package.json`, publish `@in-core/incore-playbook`, then bump the dependency in each testbed app.

## Pull requests

Branch from `develop`, PR to `develop`, link the issue, update `CHANGELOG.md`, lint + tests pass.

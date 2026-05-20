# qmc-sim

Quine-McCluskey logic minimization simulator for teaching minterm grouping, prime implicants, chart simplification, and final coverage.

## Run

Open `index.html` in a browser, or run the macOS launcher:

```sh
./Launch\ qmc-sim.command
```

The launcher starts a local Python HTTP server on `127.0.0.1`. Set `QMC_SIM_PORT` to choose the first port to try.

## Electron development

From the repository root:

```bash
npm install
npm run start:qmc-sim
```

## Build desktop packages

From the repository root:

```bash
npm run package:qmc-sim
```

Electron metadata for this tool lives in `tool.json`. The shared packager writes final artifacts to `tools/qmc-sim/release/`.

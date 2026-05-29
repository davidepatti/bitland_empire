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

## Exam use

qmc-sim no longer owns the exam lock. For guarded exam/prep releases, build and distribute the Bitland Empire hub from the repository root:

```bash
npm run package:hub
```

The hub unlocks the whole package once and then launches qmc-sim and the other tools from inside the same Electron app. Direct qmc-sim launches through this folder, `npm run start:qmc-sim`, or `npm run package:qmc-sim` are intentionally unguarded for development and ordinary practice.

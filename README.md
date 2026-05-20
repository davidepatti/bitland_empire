# Bitland Empire

Small teaching tools, kept as independent apps under `tools/`.

## Tools

- `tools/cpu-spy` - clickable MIPS64 datapath and instruction execution demo.
- `tools/qmc-sim` - Quine-McCluskey logic minimization simulator.

Each tool owns its web files and declares desktop packaging metadata in `tool.json`. Shared Electron development and packaging live under `scripts/electron/`.

## Electron apps

Install shared desktop dependencies from the repository root:

```bash
npm install
```

Run a tool in Electron:

```bash
npm run start:cpu-spy
npm run start:qmc-sim
```

Build desktop packages:

```bash
npm run package:cpu-spy
npm run package:qmc-sim
```

The packager stages each tool in a temporary directory and writes artifacts back to that tool's `release/` folder.

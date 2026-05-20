# CPU Spy

Clickable MIPS64 datapath demo for stepping through instruction execution cycle by cycle.

## Web version

```bash
./launch.sh
```

## Electron development

From the repository root:

```bash
npm install
npm run start:cpu-spy
```

## Build desktop packages

From the repository root:

```bash
npm run package:cpu-spy
```

Electron metadata for this tool lives in `tool.json`. The shared packager writes final artifacts to `tools/cpu-spy/release/`.

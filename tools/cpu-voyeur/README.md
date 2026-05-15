# CPU Voyeur

Clickable MIPS64 datapath demo for stepping through instruction execution cycle by cycle.

## Web version

```bash
./launch.sh
```

## Electron development

```bash
npm install
npm start
```

## Build desktop packages

```bash
./scripts/package-electron.sh
```

The packaging script builds from the current source into a clean temporary staging directory, then writes final artifacts to `release/`.

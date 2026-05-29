# Shared Electron Tooling

Each browser-based teaching tool can become an Electron app by adding a `tool.json` file in its tool directory. The guarded exam package is the Bitland Empire hub under `hub/`, which bundles the tools' web assets into one Electron app.

Required fields:

- `slug`: package-safe tool name.
- `productName`: desktop app name.
- `appId`: reverse-DNS Electron app id.
- `webAssets`: files or folders copied into the packaged app.

Optional fields include `version`, `description`, `entry`, and `electron` window settings such as `width`, `height`, `minWidth`, `minHeight`, and `backgroundColor`.

From the repository root:

```bash
npm run start:hub
npm run start:hub:web
npm run start:cpu-spy
npm run start:qmc-sim
npm run start:karnaugh
npm run package:hub
npm run package:cpu-spy
npm run package:qmc-sim
npm run package:karnaugh
```

`npm run package:hub` and `./build-electron-hub.sh` build the guarded hub package. `npm run package:all` and `./build-electron-apps.sh` are compatibility aliases that also build only the hub.

Exam integrity belongs to the Electron hub. Standalone tool starts, standalone tool packages, and the browser hub launcher are not locked.

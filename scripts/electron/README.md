# Shared Electron Tooling

Each browser-based teaching tool can become an Electron app by adding a `tool.json` file in its tool directory.

Required fields:

- `slug`: package-safe tool name.
- `productName`: desktop app name.
- `appId`: reverse-DNS Electron app id.
- `webAssets`: files or folders copied into the packaged app.

Optional fields include `version`, `description`, `entry`, and `electron` window settings such as `width`, `height`, `minWidth`, `minHeight`, and `backgroundColor`.

From the repository root:

```bash
npm run start:cpu-spy
npm run start:qmc-sim
npm run package:cpu-spy
npm run package:qmc-sim
```

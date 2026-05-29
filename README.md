# Bitland Empire

Small teaching tools, kept as independent apps under `tools/`.

## Tools

- `tools/cpu-spy` - clickable MIPS64 datapath and instruction execution demo.
- `tools/qmc-sim` - Quine-McCluskey logic minimization simulator.
- `tools/karnaugh-tables` - random Karnaugh-map table generator for practicing legal groupings.
- `tools/seq-circuits` - sequential-circuit exercise builder for FSM tables, Paull-Unger minimization, flip-flop excitation tables, and logic equations.

Each tool owns its web files and declares desktop packaging metadata in `tool.json`. Shared Electron development and packaging live under `scripts/electron/`.

## Unified hub

Bitland Empire is the guarded exam-use package. It opens a visual hub first, then launches each tool in its own Electron window after the hub is unlocked:

```bash
npm run start:hub
```

Build the self-contained hub package:

```bash
npm run package:hub
```

Run the same hub in a browser, without Electron:

```bash
npm run start:hub:web
```

You can also double-click `hub/Launch Bitland Empire.command` on macOS or run `hub/launch.sh` directly.

The hub bundles the tools' web assets into one Electron app for guarded releases. The exam unlock is checked only at the Electron hub level, so a successful unlock enables all bundled tools. Standalone tool launches and the browser hub remain outside the exam guard and are intended for local development, practice, or ordinary classroom use.

## Exam integrity

Create an instructor keypair once:

```bash
node scripts/electron/qmc-exam-code.js keygen --public private/qmc-public.pem --private private/qmc-private.pem
```

For guarded builds, package and distribute the hub release from `hub/release/`:

```bash
npm run package:hub
```

When a student opens Bitland Empire, ask for the displayed `BIT-...` computer code and issue an unlock code:

```bash
./unlock <BIT-...>
```

The command records `manual` as the student label by default. Set `BITLAND_STUDENT=<student-id>` to record a student label in the signed unlock payload.

Keep the private key out of anything distributed to students. The public key is embedded in the guarded hub build.

## Packaging trade-off

The exam package is implemented as one self-contained Electron app instead of a hub that launches separate packaged Electron apps. Separate packages are convenient for independent release cadence, smaller per-tool updates, and direct distribution of one tool at a time, but they also create a direct-bypass path: if the guarded hub and child apps are shipped together, a student can open a child app without passing through the hub lock.

The self-contained hub has one Electron runtime, one machine fingerprint, and one unlock activation for the whole Bitland Empire package. Its trade-off is that exam releases are updated as a single artifact, even when only one tool changed. Standalone tool scripts and packages stay available for non-exam use.

## Electron apps

Install shared desktop dependencies from the repository root:

```bash
npm install
```

Run an app in Electron:

```bash
npm run start:hub
npm run start:cpu-spy
npm run start:qmc-sim
npm run start:karnaugh
npm run start:seq-circuits
```

Build the exam Electron hub:

```bash
npm run package:hub
```

Or run the script directly:

```bash
./build-electron-hub.sh
```

`npm run package:all` and `./build-electron-apps.sh` are compatibility aliases that now build only the Bitland Empire hub.

Build standalone tool packages for non-exam use:

```bash
npm run package:cpu-spy
npm run package:qmc-sim
npm run package:karnaugh
npm run package:seq-circuits
```

The packagers stage each app in a temporary directory and write artifacts back to that app's `release/` folder.

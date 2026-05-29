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

## Exam integrity build

The Electron app can be locked to the computer where it is first used. The browser/HTML version remains available for ordinary practice, but the packaged Electron copy asks students for an unlock code tied to the displayed computer code.

Create an instructor keypair once:

```bash
node scripts/electron/qmc-exam-code.js keygen --public private/qmc-public.pem --private private/qmc-private.pem
```

Build qmc-sim with the public key:

```bash
npm run package:qmc-sim
```

The packager also accepts `QMC_SIM_UNLOCK_PUBLIC_KEY=/path/to/qmc-public.pem` if you keep the public key somewhere else. The all-app build script, `./build-electron-apps.sh`, automatically uses `private/qmc-public.pem` when that file exists.

When a student opens the Electron app, ask them for the displayed `QMC-...` computer code and issue an unlock code:

```bash
./unlock <QMC-...>
```

The command takes only the computer code. If you want the generated code to record a student label, run it as `QMC_SIM_STUDENT=<student-id> ./unlock <QMC-...>`.

Keep the private key out of the distributed app. For guarded exam/prep releases, distribute only the packaged Electron artifacts, not this source folder or the standalone HTML launcher. Unlock codes are signed for one computer code, so copying the app or the activation file to a different exam computer will not unlock it. Activated Electron solutions also use the signed activation as a deterministic presentation watermark for equivalent solution choices.

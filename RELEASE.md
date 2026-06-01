# Bitland Empire Release Checklist

Use this checklist for every guarded exam release. Standalone tool packages are for practice, demos, and local development unless a release note explicitly says otherwise.

## Before Building

- Confirm the student-facing scope: included tools, languages, and any exam-only behavior.
- Update `version` in `hub/hub.json` and the touched `tools/*/tool.json` files when the distributed behavior changes.
- Keep `private/qmc-private.pem` off every student machine and outside every release artifact.
- Ensure the public key exists at `private/qmc-public.pem`, or set `BITLAND_UNLOCK_PUBLIC_KEY` to a public-key file or PEM string.
- Run the repository check:

```bash
npm run check
```

## Build

Build the guarded hub from the repository root:

```bash
npm run package:hub
```

The guarded artifacts are written to `hub/release/`. Do not distribute standalone `tools/*/release/` artifacts for exams, because those packages are intentionally outside the hub lock.

## Verify Artifacts

- Confirm `hub/release/SHA256SUMS.txt` exists and lists every distributed file.
- Launch the built hub on at least one clean machine or fresh user profile.
- Confirm the first screen shows the Bitland Empire hub, the learning paths, and a locked exam state.
- Generate one unlock code with:

```bash
BITLAND_STUDENT=<student-id> ./unlock <BIT-...>
```

- Unlock the hub and launch each included tool once.
- Confirm direct browser launches and standalone tool starts are not described as exam-safe in release notes.

## Publish

- Attach the hub artifacts for the target platforms plus `SHA256SUMS.txt`.
- Include the version, build date, supported platforms, and a short summary of student-facing changes.
- Include the exam-unlock reminder: students send the displayed `BIT-...` code; instructors return the signed unlock code.

## After Release

- Keep the private key and issued unlock process under instructor control.
- Archive the released `SHA256SUMS.txt` with the course/exam record.
- Record any classroom issues and decide whether they need a patch release or a normal next release.

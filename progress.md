Original prompt: Add visual tuttorial and a more clean path to which is the sequence to be completed. GUI elements seems to be just staying there, without an order

Progress:
- Identified `tools/seq-circuits` as the likely target: its current UI has numbered result panels, but setup/diagram/results are visually peer-like and the completion order is easy to miss.
- Added a visual workflow strip to `tools/seq-circuits/index.html`, updated step numbering from setup through final logic, and wired step targets for jump navigation.
- Added workflow styling to `tools/seq-circuits/styles.css`, including ordered markers, completion/current states, and responsive single-column behavior.
- Added `updateWorkflowGuide()` in `tools/seq-circuits/app.js` so validation errors and unapplied graph edits show a clear next step.
- Verified `node --check tools/seq-circuits/app.js`, `npm run check`, and a browser smoke test via `http://127.0.0.1:4183/tools/seq-circuits/index.html`.

TODO:
- No known follow-up TODOs for this request.

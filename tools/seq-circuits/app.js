"use strict";

const MAX_STATES = 8;
const GRAPH_WIDTH = 820;
const GRAPH_HEIGHT = 460;
const NODE_RADIUS = 34;
const GRAPH_HISTORY_LIMIT = 60;
const languageKey = "seq-circuits-language";

const translations = {
  it: {
    appTitle: "Circuiti sequenziali",
    language: "Lingua",
    tutorial: "Tutorial",
    close: "Chiudi",
    example: "Esempio",
    analyze: "Analizza",
    visualTutorial: "Tutorial visuale",
    completeInOrder: "Completa l'esercizio in ordine",
    define: "Definisci",
    structure: "Struttura",
    diagram: "Diagramma",
    graph: "Grafo",
    table: "Tabella",
    stateRows: "Righe stato",
    reduce: "Riduci",
    encode: "Codifica",
    transitions: "Transizioni",
    excite: "Eccita",
    logic: "Logica",
    equations: "Equazioni",
    step1: "Passo 1",
    step2: "Passo 2",
    step3: "Passo 3",
    step4: "Passo 4",
    step5: "Passo 5",
    step6: "Passo 6",
    step7: "Passo 7",
    machineDefinition: "Definizione macchina",
    applyStructure: "Applica struttura",
    fsmType: "Tipo FSM",
    inputBits: "Bit input",
    outputBits: "Bit output",
    states: "Stati",
    mooreOutputTable: "Tabella output Moore",
    transitionEditorTable: "Tabella editor transizioni",
    stateDiagram: "Diagramma degli stati",
    state: "Stato",
    transition: "Transizione",
    delete: "Elimina",
    applyGraph: "Applica grafo",
    stateTable: "Tabella degli stati",
    paullUngerTable: "Tabella di implicazione Paull-Unger",
    transitionTable: "Tabella transizioni",
    excitationTables: "Tabelle di eccitazione",
    nextStateLogic: "Logica di stato prossimo e output",
    tutorialIntro: "Usa questi passaggi per completare una sintesi di macchina sequenziale dall'editor alla logica finale.",
    tutorialStep1Title: "1. Definisci la macchina",
    tutorialStep1Body: "Scegli tipo FSM, bit di input/output, flip-flop e stati; poi applica la struttura.",
    tutorialStep2Title: "2. Disegna il grafo",
    tutorialStep2Body: "Sposta gli stati, aggiungi transizioni e applica il grafo per aggiornare le tabelle.",
    tutorialStep3Title: "3. Segui le tabelle",
    tutorialStep3Body: "Leggi tabella degli stati, Paull-Unger, codifica e transizioni minimizzate in ordine.",
    tutorialStep4Title: "4. Arriva alle equazioni",
    tutorialStep4Body: "Controlla le eccitazioni dei flip-flop e le equazioni di stato prossimo e uscita."
  },
  en: {
    appTitle: "Sequential Circuits",
    language: "Language",
    tutorial: "Tutorial",
    close: "Close",
    example: "Example",
    analyze: "Analyze",
    visualTutorial: "Visual tutorial",
    completeInOrder: "Complete the exercise in order",
    define: "Define",
    structure: "Structure",
    diagram: "Diagram",
    graph: "Graph",
    table: "Table",
    stateRows: "State rows",
    reduce: "Reduce",
    encode: "Encode",
    transitions: "Transitions",
    excite: "Excite",
    logic: "Logic",
    equations: "Equations",
    step1: "Step 1",
    step2: "Step 2",
    step3: "Step 3",
    step4: "Step 4",
    step5: "Step 5",
    step6: "Step 6",
    step7: "Step 7",
    machineDefinition: "Machine definition",
    applyStructure: "Apply structure",
    fsmType: "FSM type",
    inputBits: "Input bits",
    outputBits: "Output bits",
    states: "States",
    mooreOutputTable: "Moore output table",
    transitionEditorTable: "Transition editor table",
    stateDiagram: "State diagram",
    state: "State",
    transition: "Transition",
    delete: "Delete",
    applyGraph: "Apply graph",
    stateTable: "State table",
    paullUngerTable: "Paull-Unger implication table",
    transitionTable: "Transition table",
    excitationTables: "Excitation tables",
    nextStateLogic: "Next-state and output logic",
    tutorialIntro: "Use these steps to complete a sequential-machine synthesis from the editor to the final logic.",
    tutorialStep1Title: "1. Define the machine",
    tutorialStep1Body: "Choose FSM type, input/output bits, flip-flop, and states; then apply the structure.",
    tutorialStep2Title: "2. Draw the graph",
    tutorialStep2Body: "Move states, add transitions, and apply the graph to update the tables.",
    tutorialStep3Title: "3. Follow the tables",
    tutorialStep3Body: "Read the state table, Paull-Unger, encoding, and minimized transitions in order.",
    tutorialStep4Title: "4. Reach the equations",
    tutorialStep4Body: "Check flip-flop excitations and the next-state and output equations."
  }
};

const italianText = {
  "Applied": "Applicato",
  "Check values": "Controlla valori",
  "Structure": "Struttura",
  "Apply graph": "Applica grafo",
  "Graph": "Grafo",
  "Generated": "Generato",
  "State rows": "Righe stato",
  "Transitions": "Transizioni",
  "Flip-flops": "Flip-flop",
  "Equations": "Equazioni",
  "Done": "Fatto",
  "Current": "Corrente",
  "Waiting": "In attesa",
  "Next": "Prossimo",
  "Fix Step 1": "Correggi passo 1",
  "Apply Step 2": "Applica passo 2",
  "Sequence complete": "Sequenza completa",
  "Graph edits are staged. Apply the graph before using the generated tables.": "Le modifiche al grafo sono pronte. Applica il grafo prima di usare le tabelle generate.",
  "The generated tables and logic now follow the ordered path.": "Le tabelle generate e la logica seguono ora il percorso ordinato.",
  "Ready.": "Pronto.",
  "Structure applied.": "Struttura applicata.",
  "Exercise generated.": "Esercizio generato.",
  "Reducible Mealy example loaded.": "Esempio Mealy riducibile caricato.",
  "Graph draft ready.": "Bozza grafo pronta.",
  "Graph draft matches the applied machine.": "La bozza del grafo coincide con la macchina applicata.",
  "Graph draft": "Bozza grafo",
  "Not applied": "Non applicato",
  "Select a state or transition.": "Seleziona uno stato o una transizione.",
  "Name": "Nome",
  "Save state": "Salva stato",
  "Assign input": "Assegna input",
  "Graph changes applied.": "Modifiche del grafo applicate.",
  "Undo applied.": "Annullamento applicato.",
  "Redo applied.": "Ripristino applicato.",
  "Transition mode cancelled.": "Modalita transizione annullata.",
  "Transition mode ready.": "Modalita transizione pronta.",
  "Layout reset. Apply graph to keep it.": "Layout reimpostato. Applica il grafo per conservarlo.",
  "State name is required.": "Il nome dello stato e richiesto.",
  "At least one state is required.": "Serve almeno uno stato.",
  "No state minimization is possible for this complete machine.": "Non e possibile minimizzare gli stati per questa macchina completa.",
  "Only one state is present.": "E presente un solo stato.",
  "No rows.": "Nessuna riga.",
  "Present state": "Stato presente",
  "Input": "Input",
  "Next state": "Stato prossimo",
  "Output": "Output",
  "State": "Stato",
  "Class": "Classe",
  "Original states": "Stati originali",
  "Encoding": "Codifica",
  "Pair": "Coppia",
  "Result": "Risultato",
  "Signal": "Segnale",
  "Variable order": "Ordine variabili",
  "1-minterms": "Mintermini a 1",
  "Don't-cares": "Don't-care",
  "Equation": "Equazione",
  "Check": "Controllo",
  "unused": "non usato",
  "don't care": "don't care",
  "invalid": "non valido",
  "OK": "OK",
  "none": "nessuna",
  "no pending pair": "nessuna coppia pendente"
};

const els = {
  fsmType: document.querySelector("#fsmType"),
  inputBits: document.querySelector("#inputBits"),
  outputBits: document.querySelector("#outputBits"),
  flipFlopType: document.querySelector("#flipFlopType"),
  stateList: document.querySelector("#stateList"),
  applyStructure: document.querySelector("#applyStructure"),
  analyzeTop: document.querySelector("#analyzeTop"),
  loadExample: document.querySelector("#loadExample"),
  languageSelect: document.querySelector("#languageSelect"),
  tutorialButton: document.querySelector("#tutorialButton"),
  infoModal: document.querySelector("#infoModal"),
  infoModalTitle: document.querySelector("#infoModalTitle"),
  infoModalBody: document.querySelector("#infoModalBody"),
  mooreOutputSection: document.querySelector("#mooreOutputSection"),
  mooreOutputTable: document.querySelector("#mooreOutputTable"),
  transitionEditorTable: document.querySelector("#transitionEditorTable"),
  inputMessage: document.querySelector("#inputMessage"),
  graphUndo: document.querySelector("#graphUndo"),
  graphRedo: document.querySelector("#graphRedo"),
  graphAddState: document.querySelector("#graphAddState"),
  graphAddTransition: document.querySelector("#graphAddTransition"),
  graphAutoLayout: document.querySelector("#graphAutoLayout"),
  graphDelete: document.querySelector("#graphDelete"),
  graphApply: document.querySelector("#graphApply"),
  graphMessage: document.querySelector("#graphMessage"),
  stateDiagram: document.querySelector("#stateDiagram"),
  graphInspector: document.querySelector("#graphInspector"),
  stateTable: document.querySelector("#stateTable"),
  implicationSummary: document.querySelector("#implicationSummary"),
  implicationTable: document.querySelector("#implicationTable"),
  equivalenceTable: document.querySelector("#equivalenceTable"),
  transitionTable: document.querySelector("#transitionTable"),
  excitationStatus: document.querySelector("#excitationStatus"),
  referenceExcitationTable: document.querySelector("#referenceExcitationTable"),
  computedExcitationTable: document.querySelector("#computedExcitationTable"),
  logicEquations: document.querySelector("#logicEquations"),
  logicSourceTable: document.querySelector("#logicSourceTable"),
  nextStepCard: document.querySelector("#nextStepCard"),
  workflowSteps: Array.from(document.querySelectorAll("[data-step-target]")),
  workflowPanels: Array.from(document.querySelectorAll("[data-workflow-panel]"))
};

let currentLanguage = getInitialLanguage();
let lastInfoTrigger = null;

const workflowCopy = {
  setupPanel: {
    complete: "Applied",
    current: "Check values",
    pending: "Structure"
  },
  diagramPanel: {
    complete: "Applied",
    current: "Apply graph",
    pending: "Graph"
  },
  stateTablePanel: {
    complete: "Generated",
    pending: "State rows"
  },
  minimizationPanel: {
    complete: "Generated",
    pending: "Paull-Unger"
  },
  transitionPanel: {
    complete: "Generated",
    pending: "Transitions"
  },
  excitationPanel: {
    complete: "Generated",
    pending: "Flip-flops"
  },
  logicPanel: {
    complete: "Generated",
    pending: "Equations"
  }
};

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(languageKey);
    if (saved === "en" || saved === "it") return saved;
  } catch (error) {
    // Local files may block storage in some browser settings.
  }
  return "it";
}

function t(key, params = {}) {
  const entry = translations[currentLanguage][key] ?? translations.en[key] ?? key;
  if (typeof entry === "function") return entry(params);
  return entry.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
}

function localizeText(value) {
  const text = String(value ?? "");
  if (currentLanguage === "en") return text;
  if (italianText[text]) return italianText[text];
  let match = text.match(/^Use (\d+) states or fewer\.$/);
  if (match) return `Usa al massimo ${match[1]} stati.`;
  match = text.match(/^(.+) states reduce to (.+) equivalent class\(es\)\.$/);
  if (match) return `${match[1]} stati si riducono a ${match[2]} classi equivalenti.`;
  match = text.match(/^All valid transitions match the (.+) flip-flop excitation rules\.$/);
  if (match) return `Tutte le transizioni valide rispettano le regole di eccitazione del flip-flop ${match[1]}.`;
  match = text.match(/^At least one transition violates the selected flip-flop excitation rules\.$/);
  if (match) return "Almeno una transizione viola le regole di eccitazione del flip-flop selezionato.";
  match = text.match(/^State (.+) added\. Apply graph to recompute the tables\.$/);
  if (match) return `Stato ${match[1]} aggiunto. Applica il grafo per ricalcolare le tabelle.`;
  match = text.match(/^State (.+) deleted\. Apply graph to recompute the tables\.$/);
  if (match) return `Stato ${match[1]} eliminato. Applica il grafo per ricalcolare le tabelle.`;
  match = text.match(/^State (.+) already exists\.$/);
  if (match) return `Lo stato ${match[1]} esiste gia.`;
  match = text.match(/^Transition (.+) -> (.+) added\. Apply graph to recompute the tables\.$/);
  if (match) return `Transizione ${match[1]} -> ${match[2]} aggiunta. Applica il grafo per ricalcolare le tabelle.`;
  match = text.match(/^Transition (.+) -> (.+) deleted\. Apply graph to recompute the tables\.$/);
  if (match) return `Transizione ${match[1]} -> ${match[2]} eliminata. Applica il grafo per ricalcolare le tabelle.`;
  return text;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(element => {
    element.dataset.i18nAttr.split(";").forEach(pair => {
      const [attribute, key] = pair.split(":");
      if (attribute && key) element.setAttribute(attribute, t(key));
    });
  });
  els.languageSelect.value = currentLanguage;
}

function setLanguage(language) {
  if (language !== "en" && language !== "it") return;
  currentLanguage = language;
  try {
    localStorage.setItem(languageKey, language);
  } catch (error) {
    // Local files may block storage in some browser settings.
  }
  applyTranslations();
  renderEditor();
  renderEditorValues(machine);
  const analysis = analyzeMachine(machine);
  renderStateTable(analysis.stateRows);
  renderImplicationSection(analysis);
  renderTransitionTable(analysis);
  renderExcitationSection(analysis);
  renderLogicSection(analysis);
  renderGraphEditor();
  updateWorkflowGuide();
}

function tutorialTopic() {
  return {
    title: t("tutorial"),
    paragraphs: [t("tutorialIntro")],
    steps: [
      { visual: "define", title: t("tutorialStep1Title"), body: t("tutorialStep1Body") },
      { visual: "graph", title: t("tutorialStep2Title"), body: t("tutorialStep2Body") },
      { visual: "tables", title: t("tutorialStep3Title"), body: t("tutorialStep3Body") },
      { visual: "logic", title: t("tutorialStep4Title"), body: t("tutorialStep4Body") }
    ]
  };
}

function tutorialVisual(type) {
  if (type === "define") {
    return `
      <div class="shot-bar"><span>${escapeHtml(t("fsmType"))}: Mealy</span><span>D</span></div>
      <div class="shot-card">${escapeHtml(t("states"))}: A, B, C, D</div>
      <div class="shot-grid"><b>${escapeHtml(t("inputBits"))}</b><b>${escapeHtml(t("outputBits"))}</b><b>${escapeHtml(t("state"))}</b><b>${escapeHtml(t("transition"))}</b><span>1</span><span>1</span><span>A</span><span>B</span></div>
    `;
  }

  if (type === "graph") {
    return `
      <div class="shot-bar"><span>${escapeHtml(t("stateDiagram"))}</span><span>${escapeHtml(t("applyGraph"))}</span></div>
      <div class="shot-diagram"><span class="shot-node a">A</span><span class="shot-edge"></span><span class="shot-node b">B</span></div>
    `;
  }

  if (type === "tables") {
    return `
      <div class="shot-bar"><span>Paull-Unger</span><span>${escapeHtml(t("transitionTable"))}</span></div>
      <div class="shot-grid"><b>A,B</b><b>B,C</b><b>Q</b><b>Q+</b><span>OK</span><span>X</span><span>0</span><span>1</span></div>
    `;
  }

  return `
    <div class="shot-bar"><span>${escapeHtml(t("excitationTables"))}</span><span>${escapeHtml(t("equations"))}</span></div>
    <div class="shot-card">D0 = X'Q0 + XQ1<br>Z = Q1X</div>
  `;
}

function openTutorial(trigger) {
  lastInfoTrigger = trigger;
  const topic = tutorialTopic();
  els.infoModalTitle.textContent = topic.title;
  els.infoModalBody.innerHTML = "";
  topic.paragraphs.forEach(text => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    els.infoModalBody.appendChild(paragraph);
  });
  const steps = document.createElement("div");
  steps.className = "tutorial-steps";
  topic.steps.forEach(step => {
    const article = document.createElement("article");
    article.className = "tutorial-step";
    const shot = document.createElement("div");
    shot.className = `tutorial-screenshot tutorial-screenshot-${step.visual}`;
    shot.setAttribute("aria-hidden", "true");
    shot.innerHTML = tutorialVisual(step.visual);
    const copy = document.createElement("div");
    copy.className = "tutorial-copy";
    const title = document.createElement("h3");
    const body = document.createElement("p");
    title.textContent = step.title;
    body.textContent = step.body;
    copy.append(title, body);
    article.append(shot, copy);
    steps.appendChild(article);
  });
  els.infoModalBody.appendChild(steps);
  els.infoModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  els.infoModal.querySelector(".modal-close").focus();
}

function closeInfo() {
  els.infoModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  if (lastInfoTrigger) lastInfoTrigger.focus();
}

let machine = exampleMachine();
let graphDraft = null;
let graphSelection = null;
let graphMode = "select";
let pendingTransitionSource = null;
let graphDirty = false;
let graphUndoStack = [];
let graphRedoStack = [];
let activeDrag = null;
let suppressNextGraphClick = false;

init();

function init() {
  applyTranslations();
  writeControlsFromMachine(machine);
  renderEditor();
  bindWorkflowGuide();
  bindGraphControls();
  analyzeCurrent();

  els.languageSelect.addEventListener("change", () => setLanguage(els.languageSelect.value));
  document.addEventListener("click", event => {
    const tutorialTrigger = event.target.closest("#tutorialButton");
    if (!tutorialTrigger) return;
    event.preventDefault();
    openTutorial(tutorialTrigger);
  });
  els.infoModal.querySelectorAll("[data-modal-close]").forEach(button => {
    button.addEventListener("click", closeInfo);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !els.infoModal.classList.contains("hidden")) {
      closeInfo();
    }
  });

  els.applyStructure.addEventListener("click", () => {
    applyStructureFromControls();
  });

  els.analyzeTop.addEventListener("click", () => {
    applyStructureFromControls();
  });

  els.loadExample.addEventListener("click", () => {
    machine = exampleMachine();
    writeControlsFromMachine(machine);
    renderEditor();
    analyzeCurrent("Reducible Mealy example loaded.");
  });

  els.flipFlopType.addEventListener("change", () => {
    machine.flipFlopType = els.flipFlopType.value;
    analyzeCurrent();
  });

  for (const control of [els.fsmType, els.inputBits, els.outputBits]) {
    control.addEventListener("change", () => {
      applyStructureFromControls();
    });
  }

  els.transitionEditorTable.addEventListener("change", () => {
    analyzeCurrent();
  });

  els.mooreOutputTable.addEventListener("change", () => {
    analyzeCurrent();
  });
}

function bindGraphControls() {
  els.graphAddState.addEventListener("click", addGraphState);
  els.graphAddTransition.addEventListener("click", toggleTransitionMode);
  els.graphAutoLayout.addEventListener("click", resetGraphLayout);
  els.graphDelete.addEventListener("click", deleteGraphSelection);
  els.graphApply.addEventListener("click", applyGraphDraft);
  els.graphUndo.addEventListener("click", undoGraphEdit);
  els.graphRedo.addEventListener("click", redoGraphEdit);

  els.graphInspector.addEventListener("change", handleGraphInspectorChange);
  els.graphInspector.addEventListener("click", handleGraphInspectorClick);

  document.addEventListener("pointermove", handleGraphPointerMove);
  document.addEventListener("pointerup", handleGraphPointerUp);
  document.addEventListener("keydown", handleGraphKeydown);
}

function bindWorkflowGuide() {
  for (const step of els.workflowSteps) {
    step.addEventListener("click", () => {
      const target = document.getElementById(step.dataset.stepTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function updateWorkflowGuide() {
  if (!els.nextStepCard || !els.workflowSteps.length) return;
  const strict = readEditorStrict();
  const hasErrors = strict.errors.length > 0;
  const pendingGraph = Boolean(graphDirty);
  const currentTarget = hasErrors ? "setupPanel" : pendingGraph ? "diagramPanel" : null;

  for (const step of els.workflowSteps) {
    const target = step.dataset.stepTarget;
    const status = step.querySelector(".step-status");
    const state = workflowStepState(target, currentTarget, hasErrors, pendingGraph);
    step.classList.remove("done", "current", "pending");
    step.classList.add(state);
    if (state === "current") {
      step.setAttribute("aria-current", "step");
    } else {
      step.removeAttribute("aria-current");
    }
    if (status) status.textContent = workflowStatusText(target, state);
  }

  for (const panel of els.workflowPanels) {
    panel.classList.toggle("workflow-current", Boolean(currentTarget) && panel.id === currentTarget);
  }

  if (hasErrors) {
    renderNextStepCard("Fix Step 1", strict.errors[0]);
    return;
  }

  if (pendingGraph) {
    renderNextStepCard("Apply Step 2", "Graph edits are staged. Apply the graph before using the generated tables.");
    return;
  }

  renderNextStepCard("Sequence complete", "The generated tables and logic now follow the ordered path.");
}

function workflowStepState(target, currentTarget, hasErrors, pendingGraph) {
  if (target === currentTarget) return "current";
  if (hasErrors) return target === "setupPanel" ? "current" : "pending";
  if (pendingGraph) {
    return target === "setupPanel" ? "done" : "pending";
  }
  return "done";
}

function workflowStatusText(target, state) {
  const copy = workflowCopy[target] || {};
  if (state === "done") return localizeText(copy.complete || "Done");
  if (state === "current") return localizeText(copy.current || "Current");
  return localizeText(copy.pending || "Waiting");
}

function renderNextStepCard(title, detail) {
  els.nextStepCard.innerHTML = [
    `<p class="eyebrow">${escapeHtml(localizeText("Next"))}</p>`,
    `<h3>${escapeHtml(localizeText(title))}</h3>`,
    `<p>${escapeHtml(localizeText(detail))}</p>`
  ].join("");
}

function exampleMachine() {
  const states = [
    { name: "A", output: "0" },
    { name: "B", output: "0" },
    { name: "C", output: "0" },
    { name: "D", output: "0" }
  ];

  return {
    type: "mealy",
    inputBits: 1,
    outputBits: 1,
    flipFlopType: "D",
    states,
    transitions: {
      A: {
        0: { next: "A", output: "0" },
        1: { next: "B", output: "0" }
      },
      B: {
        0: { next: "C", output: "0" },
        1: { next: "D", output: "1" }
      },
      C: {
        0: { next: "A", output: "0" },
        1: { next: "B", output: "0" }
      },
      D: {
        0: { next: "C", output: "0" },
        1: { next: "D", output: "1" }
      }
    },
    layout: {
      A: { x: 410, y: 75 },
      B: { x: 566, y: 238 },
      C: { x: 410, y: 394 },
      D: { x: 254, y: 238 }
    }
  };
}

function writeControlsFromMachine(value) {
  els.fsmType.value = value.type;
  els.inputBits.value = value.inputBits;
  els.outputBits.value = value.outputBits;
  els.flipFlopType.value = value.flipFlopType;
  els.stateList.value = value.states.map(state => state.name).join(", ");
}

function applyStructureFromControls() {
  const previous = readEditorLenient();
  machine = buildMachineFromControls(previous);
  writeControlsFromMachine(machine);
  renderEditor();
  analyzeCurrent("Structure applied.");
}

function buildMachineFromControls(previous) {
  const type = els.fsmType.value === "moore" ? "moore" : "mealy";
  const inputBits = clampInteger(els.inputBits.value, 1, 3, 1);
  const outputBits = clampInteger(els.outputBits.value, 1, 3, 1);
  const flipFlopType = ["D", "JK", "T", "SR"].includes(els.flipFlopType.value) ? els.flipFlopType.value : "D";
  const names = parseStateNames(els.stateList.value);
  const previousStates = new Map((previous.states || []).map(state => [state.name, state]));
  const previousTransitions = previous.transitions || {};
  const previousLayout = previous.layout || {};
  const symbols = inputSymbols(inputBits);
  const zero = zeroVector(outputBits);
  const stateNameSet = new Set(names);
  const states = names.map(name => ({
    name,
    output: isBitVector(previousStates.get(name)?.output, outputBits)
      ? previousStates.get(name).output
      : zero
  }));
  const transitions = {};

  for (const state of states) {
    transitions[state.name] = {};
    for (const input of symbols) {
      const oldTransition = previousTransitions[state.name]?.[input];
      transitions[state.name][input] = {
        next: oldTransition && stateNameSet.has(oldTransition.next) ? oldTransition.next : state.name,
        output: isBitVector(oldTransition?.output, outputBits) ? oldTransition.output : zero
      };
    }
  }

  const built = { type, inputBits, outputBits, flipFlopType, states, transitions, layout: {} };
  for (const state of states) {
    if (previousLayout[state.name]) {
      built.layout[state.name] = clampGraphPoint(previousLayout[state.name]);
    }
  }
  ensureGraphLayout(built);
  return built;
}

function readEditorLenient() {
  const copy = cloneMachine(machine);
  copy.type = els.fsmType.value === "moore" ? "moore" : "mealy";
  copy.inputBits = clampInteger(els.inputBits.value, 1, 3, copy.inputBits || 1);
  copy.outputBits = clampInteger(els.outputBits.value, 1, 3, copy.outputBits || 1);
  copy.flipFlopType = ["D", "JK", "T", "SR"].includes(els.flipFlopType.value) ? els.flipFlopType.value : copy.flipFlopType;

  const stateMap = new Map(copy.states.map(state => [state.name, state]));
  for (const input of els.mooreOutputTable.querySelectorAll("[data-state-output]")) {
    const state = stateMap.get(input.dataset.stateOutput);
    if (state) state.output = coerceBitVector(input.value, copy.outputBits);
  }

  for (const select of els.transitionEditorTable.querySelectorAll("[data-next-state]")) {
    const [stateName, inputSymbol] = select.dataset.nextState.split("::");
    if (!copy.transitions[stateName]) copy.transitions[stateName] = {};
    if (!copy.transitions[stateName][inputSymbol]) {
      copy.transitions[stateName][inputSymbol] = { next: stateName, output: zeroVector(copy.outputBits) };
    }
    copy.transitions[stateName][inputSymbol].next = select.value;
  }

  for (const input of els.transitionEditorTable.querySelectorAll("[data-transition-output]")) {
    const [stateName, inputSymbol] = input.dataset.transitionOutput.split("::");
    if (!copy.transitions[stateName]) copy.transitions[stateName] = {};
    if (!copy.transitions[stateName][inputSymbol]) {
      copy.transitions[stateName][inputSymbol] = { next: stateName, output: zeroVector(copy.outputBits) };
    }
    copy.transitions[stateName][inputSymbol].output = coerceBitVector(input.value, copy.outputBits);
  }

  return copy;
}

function readEditorStrict() {
  const value = readEditorLenient();
  return { value, errors: validateMachineValue(value) };
}

function validateMachineValue(value) {
  const errors = [];
  const names = value.states.map(state => state.name);
  const stateNameSet = new Set(names);
  const symbols = inputSymbols(value.inputBits);

  if (!value.states.length) {
    errors.push("At least one state is required.");
  }

  if (value.states.length > MAX_STATES) {
    errors.push(`Use ${MAX_STATES} states or fewer.`);
  }

  for (const state of value.states) {
    if (!isBitVector(state.output, value.outputBits)) {
      errors.push(`Moore output for ${state.name} must have ${value.outputBits} bit(s).`);
    }
  }

  for (const state of value.states) {
    for (const input of symbols) {
      const transition = value.transitions[state.name]?.[input];
      if (!transition || !stateNameSet.has(transition.next)) {
        errors.push(`Transition ${state.name}, input ${input} needs a valid next state.`);
      }
      if (!isBitVector(transition?.output, value.outputBits)) {
        errors.push(`Mealy output for ${state.name}, input ${input} must have ${value.outputBits} bit(s).`);
      }
    }
  }

  return errors;
}

function cloneMachine(value) {
  return JSON.parse(JSON.stringify(value));
}

function parseStateNames(raw) {
  const seen = new Set();
  const names = String(raw || "")
    .split(",")
    .map(name => name.trim())
    .filter(Boolean)
    .map(name => name.slice(0, 18))
    .filter(name => {
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    })
    .slice(0, MAX_STATES);
  return names.length ? names : ["A"];
}

function clampInteger(value, min, max, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function zeroVector(bits) {
  return "0".repeat(bits);
}

function inputSymbols(bits) {
  return Array.from({ length: 2 ** bits }, (_, index) => toBinary(index, bits));
}

function toBinary(value, bits) {
  return value.toString(2).padStart(bits, "0");
}

function isBitVector(value, bits) {
  return typeof value === "string" && new RegExp(`^[01]{${bits}}$`).test(value);
}

function coerceBitVector(value, bits) {
  const digits = String(value || "").replace(/[^01]/g, "");
  return (digits + zeroVector(bits)).slice(0, bits);
}

function analyzeCurrent(message = "Exercise generated.") {
  const strict = readEditorStrict();
  if (strict.errors.length) {
    setMessage(els.inputMessage, strict.errors[0], "bad");
    updateWorkflowGuide();
    return;
  }

  machine = strict.value;
  ensureGraphLayout(machine);
  renderEditorValues(machine);
  const analysis = analyzeMachine(machine);
  syncGraphDraftFromMachine(machine);
  renderStateTable(analysis.stateRows);
  renderImplicationSection(analysis);
  renderTransitionTable(analysis);
  renderExcitationSection(analysis);
  renderLogicSection(analysis);
  setMessage(els.inputMessage, message, "good");
  updateWorkflowGuide();
}

function renderEditor() {
  const symbols = inputSymbols(machine.inputBits);
  const stateOptions = machine.states
    .map(state => `<option value="${escapeHtml(state.name)}">${escapeHtml(state.name)}</option>`)
    .join("");

  els.mooreOutputSection.classList.toggle("hidden", machine.type !== "moore");
  els.mooreOutputTable.innerHTML = tableHtml(
    ["State", "Output"],
    machine.states.map(state => [
      { text: state.name, className: "mono" },
      {
        html: `<input class="table-input" data-state-output="${escapeHtml(state.name)}" value="${escapeHtml(state.output)}" maxlength="${machine.outputBits}" spellcheck="false">`
      }
    ])
  );

  const headers = ["Present state", "Input", "Next state"];
  if (machine.type === "mealy") headers.push("Output");

  const rows = [];
  for (const state of machine.states) {
    for (const input of symbols) {
      const transition = machine.transitions[state.name][input];
      const select = [
        `<select class="table-select" data-next-state="${escapeHtml(state.name)}::${escapeHtml(input)}">`,
        stateOptions,
        "</select>"
      ].join("");
      const row = [
        { text: state.name, className: "mono" },
        { text: input, className: "mono center" },
        { html: select.replace(`value="${escapeHtml(transition.next)}"`, `value="${escapeHtml(transition.next)}" selected`) }
      ];
      if (machine.type === "mealy") {
        row.push({
          html: `<input class="table-input" data-transition-output="${escapeHtml(state.name)}::${escapeHtml(input)}" value="${escapeHtml(transition.output)}" maxlength="${machine.outputBits}" spellcheck="false">`
        });
      }
      rows.push(row);
    }
  }

  els.transitionEditorTable.innerHTML = tableHtml(headers, rows);

  for (const select of els.transitionEditorTable.querySelectorAll("select[data-next-state]")) {
    const [stateName, inputSymbol] = select.dataset.nextState.split("::");
    select.value = machine.transitions[stateName][inputSymbol].next;
  }
}

function renderEditorValues(value) {
  for (const input of els.mooreOutputTable.querySelectorAll("[data-state-output]")) {
    const state = value.states.find(candidate => candidate.name === input.dataset.stateOutput);
    if (state) input.value = state.output;
  }

  for (const input of els.transitionEditorTable.querySelectorAll("[data-transition-output]")) {
    const [stateName, inputSymbol] = input.dataset.transitionOutput.split("::");
    const transition = value.transitions[stateName]?.[inputSymbol];
    if (transition) input.value = transition.output;
  }
}

function analyzeMachine(value) {
  const stateRows = buildStateRows(value);
  const paull = buildPaullUnger(value);
  const minimized = buildMinimizedMachine(value, paull);
  const encoded = buildEncodedTransitionRows(value, minimized);
  const excitation = buildExcitationRows(encoded.transitionRows, encoded.stateBitLabels, value.flipFlopType);
  const logic = buildLogic(value, encoded, excitation);

  return {
    machine: value,
    stateRows,
    paull,
    minimized,
    encoded,
    excitation,
    logic
  };
}

function buildStateRows(value) {
  const rows = [];
  for (const state of value.states) {
    for (const input of inputSymbols(value.inputBits)) {
      const transition = value.transitions[state.name][input];
      rows.push({
        state: state.name,
        input,
        next: transition.next,
        output: value.type === "moore" ? state.output : transition.output
      });
    }
  }
  return rows;
}

function buildPaullUnger(value) {
  const states = value.states.map(state => state.name);
  const stateByName = new Map(value.states.map(state => [state.name, state]));
  const indexByState = new Map(states.map((state, index) => [state, index]));
  const symbols = inputSymbols(value.inputBits);
  const cells = new Map();
  const pairOrder = [];

  for (let row = 1; row < states.length; row += 1) {
    for (let col = 0; col < row; col += 1) {
      const a = states[col];
      const b = states[row];
      const key = pairKey(a, b, indexByState);
      const cell = {
        a,
        b,
        key,
        dependencies: [],
        incompatible: false,
        reason: ""
      };

      if (value.type === "moore" && stateByName.get(a).output !== stateByName.get(b).output) {
        cell.incompatible = true;
        cell.reason = `outputs ${stateByName.get(a).output} and ${stateByName.get(b).output}`;
      }

      for (const input of symbols) {
        const left = value.transitions[a][input];
        const right = value.transitions[b][input];
        if (value.type === "mealy" && left.output !== right.output) {
          cell.incompatible = true;
          cell.reason = `input ${input} gives outputs ${left.output} and ${right.output}`;
        }

        if (left.next !== right.next) {
          cell.dependencies.push({
            input,
            key: pairKey(left.next, right.next, indexByState),
            pair: orderedPair(left.next, right.next, indexByState)
          });
        }
      }

      cells.set(key, cell);
      pairOrder.push(key);
    }
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (const key of pairOrder) {
      const cell = cells.get(key);
      if (cell.incompatible) continue;

      const blocking = cell.dependencies.find(dependency => {
        const dependencyCell = cells.get(dependency.key);
        return dependencyCell && dependencyCell.incompatible;
      });

      if (blocking) {
        const dependencyCell = cells.get(blocking.key);
        cell.incompatible = true;
        cell.reason = `input ${blocking.input} requires (${blocking.pair.join(", ")}), already incompatible: ${dependencyCell.reason}`;
        changed = true;
      }
    }
  }

  return { states, cells, indexByState };
}

function pairKey(a, b, indexByState) {
  const [left, right] = orderedPair(a, b, indexByState);
  return `${left}::${right}`;
}

function orderedPair(a, b, indexByState) {
  if (a === b) return [a, b];
  return indexByState.get(a) < indexByState.get(b) ? [a, b] : [b, a];
}

function buildMinimizedMachine(value, paull) {
  const parent = new Map(value.states.map(state => [state.name, state.name]));
  const stateByName = new Map(value.states.map(state => [state.name, state]));

  function find(name) {
    const parentName = parent.get(name);
    if (parentName === name) return name;
    const root = find(parentName);
    parent.set(name, root);
    return root;
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent.set(rootB, rootA);
  }

  for (const cell of paull.cells.values()) {
    if (!cell.incompatible) union(cell.a, cell.b);
  }

  const grouped = new Map();
  for (const state of value.states) {
    const root = find(state.name);
    if (!grouped.has(root)) grouped.set(root, []);
    grouped.get(root).push(state.name);
  }

  const classes = Array.from(grouped.values()).map((members, index) => ({
    id: `M${index}`,
    members,
    output: stateByName.get(members[0]).output,
    transitions: {}
  }));
  const classByState = new Map();
  for (const clazz of classes) {
    for (const member of clazz.members) {
      classByState.set(member, clazz);
    }
  }

  for (const clazz of classes) {
    const representative = clazz.members[0];
    for (const input of inputSymbols(value.inputBits)) {
      const transition = value.transitions[representative][input];
      clazz.transitions[input] = {
        nextClass: classByState.get(transition.next).id,
        output: value.type === "moore" ? clazz.output : transition.output
      };
    }
  }

  return { classes, classByState };
}

function buildEncodedTransitionRows(value, minimized) {
  const stateBitCount = Math.max(1, Math.ceil(Math.log2(Math.max(1, minimized.classes.length))));
  const stateBitLabelsValue = stateBitLabels(stateBitCount);
  const inputBitLabelsValue = inputBitLabels(value.inputBits);
  const outputBitLabelsValue = outputBitLabels(value.outputBits);
  const classById = new Map(minimized.classes.map(clazz => [clazz.id, clazz]));

  minimized.classes.forEach((clazz, index) => {
    clazz.encoding = toBinary(index, stateBitCount);
  });

  const rows = [];
  for (const clazz of minimized.classes) {
    for (const input of inputSymbols(value.inputBits)) {
      const transition = clazz.transitions[input];
      const nextClass = classById.get(transition.nextClass);
      const presentBits = clazz.encoding;
      const inputBitsValue = input;
      const nextBits = nextClass.encoding;
      const outputBitsValue = transition.output;
      rows.push({
        unused: false,
        state: clazz.id,
        members: clazz.members,
        presentBits,
        inputBits: inputBitsValue,
        nextState: nextClass.id,
        nextBits,
        outputBits: outputBitsValue,
        minterm: Number.parseInt(`${presentBits}${inputBitsValue}`, 2)
      });
    }
  }

  const assigned = new Set(minimized.classes.map(clazz => clazz.encoding));
  for (let code = 0; code < 2 ** stateBitCount; code += 1) {
    const presentBits = toBinary(code, stateBitCount);
    if (assigned.has(presentBits)) continue;
    for (const input of inputSymbols(value.inputBits)) {
      rows.push({
        unused: true,
        state: "unused",
        members: [],
        presentBits,
        inputBits: input,
        nextState: "X",
        nextBits: "X".repeat(stateBitCount),
        outputBits: "X".repeat(value.outputBits),
        minterm: Number.parseInt(`${presentBits}${input}`, 2)
      });
    }
  }

  return {
    stateBitCount,
    stateBitLabels: stateBitLabelsValue,
    inputBitLabels: inputBitLabelsValue,
    outputBitLabels: outputBitLabelsValue,
    variableLabels: [...stateBitLabelsValue, ...inputBitLabelsValue],
    transitionRows: rows
  };
}

function stateBitLabels(count) {
  return Array.from({ length: count }, (_, index) => `Q${count - index - 1}`);
}

function inputBitLabels(count) {
  if (count === 1) return ["X"];
  return Array.from({ length: count }, (_, index) => `X${count - index - 1}`);
}

function outputBitLabels(count) {
  if (count === 1) return ["Z"];
  return Array.from({ length: count }, (_, index) => `Z${count - index - 1}`);
}

function buildExcitationRows(transitionRows, labels, flipFlopType) {
  const rows = [];
  const signalNames = flipFlopSignalNames(flipFlopType, labels.length);

  for (const row of transitionRows) {
    const signalValues = {};
    const perBit = [];

    labels.forEach((label, bitIndex) => {
      const suffix = label.replace(/^Q/, "");
      const current = row.presentBits[bitIndex];
      const next = row.nextBits[bitIndex];
      const values = row.unused ? dontCareExcitation(flipFlopType) : excitationFor(flipFlopType, current, next);
      const namedValues = {};

      for (const [rawName, value] of Object.entries(values)) {
        const signalName = `${rawName}${suffix}`;
        namedValues[signalName] = value;
        signalValues[signalName] = value;
      }

      perBit.push({ label, current, next, signals: namedValues });
    });

    const invalidSr = flipFlopType === "SR" && Object.entries(signalValues).some(([name, signalValue]) => {
      if (!name.startsWith("S") || signalValue !== "1") return false;
      const suffix = name.slice(1);
      return signalValues[`R${suffix}`] === "1";
    });

    rows.push({
      ...row,
      perBit,
      signalValues,
      signalNames,
      status: row.unused ? "don't care" : invalidSr ? "invalid" : "OK"
    });
  }

  return { rows, signalNames };
}

function flipFlopSignalNames(flipFlopType, bitCount) {
  const suffixes = Array.from({ length: bitCount }, (_, index) => `${bitCount - index - 1}`);
  if (flipFlopType === "D") return suffixes.map(suffix => `D${suffix}`);
  if (flipFlopType === "T") return suffixes.map(suffix => `T${suffix}`);
  if (flipFlopType === "JK") return suffixes.flatMap(suffix => [`J${suffix}`, `K${suffix}`]);
  return suffixes.flatMap(suffix => [`S${suffix}`, `R${suffix}`]);
}

function excitationFor(type, current, next) {
  if (type === "D") return { D: next };
  if (type === "T") return { T: current === next ? "0" : "1" };
  if (type === "JK") {
    if (current === "0" && next === "0") return { J: "0", K: "X" };
    if (current === "0" && next === "1") return { J: "1", K: "X" };
    if (current === "1" && next === "0") return { J: "X", K: "1" };
    return { J: "X", K: "0" };
  }
  if (current === "0" && next === "0") return { S: "0", R: "X" };
  if (current === "0" && next === "1") return { S: "1", R: "0" };
  if (current === "1" && next === "0") return { S: "0", R: "1" };
  return { S: "X", R: "0" };
}

function dontCareExcitation(type) {
  if (type === "D") return { D: "X" };
  if (type === "T") return { T: "X" };
  if (type === "JK") return { J: "X", K: "X" };
  return { S: "X", R: "X" };
}

function buildLogic(value, encoded, excitation) {
  const functions = [];

  for (const signalName of excitation.signalNames) {
    functions.push(buildFunction(signalName, encoded.variableLabels, encoded.transitionRows, row => {
      const excitationRow = excitation.rows.find(candidate => candidate.minterm === row.minterm);
      return excitationRow.signalValues[signalName];
    }));
  }

  encoded.outputBitLabels.forEach((label, bitIndex) => {
    functions.push(buildFunction(label, encoded.variableLabels, encoded.transitionRows, row => row.outputBits[bitIndex]));
  });

  return { functions };
}

function buildFunction(name, variables, rows, valueForRow) {
  const ones = [];
  const dontCares = [];
  const seenCare = new Set();
  const seenDc = new Set();

  for (const row of rows) {
    const value = row.unused ? "X" : valueForRow(row);
    if (value === "1" && !seenCare.has(row.minterm)) {
      ones.push(row.minterm);
      seenCare.add(row.minterm);
    } else if (value === "X" && !seenDc.has(row.minterm) && !seenCare.has(row.minterm)) {
      dontCares.push(row.minterm);
      seenDc.add(row.minterm);
    }
  }

  ones.sort((a, b) => a - b);
  dontCares.sort((a, b) => a - b);

  return {
    name,
    variables,
    ones,
    dontCares,
    equation: minimizeSop(variables, ones, dontCares)
  };
}

function minimizeSop(variables, ones, dontCares) {
  const varCount = variables.length;
  const universeSize = 2 ** varCount;
  const oneSet = new Set(ones);
  const dcSet = new Set(dontCares.filter(value => !oneSet.has(value)));
  const zeroCount = universeSize - oneSet.size - dcSet.size;

  if (oneSet.size === 0) return "0";
  if (zeroCount === 0) return "1";

  const primes = primeImplicants([...oneSet, ...dcSet], varCount)
    .filter(implicant => implicant.covers.some(minterm => oneSet.has(minterm)));

  const selected = selectCover(primes, oneSet);
  return selected.map(implicant => implicantToTerm(implicant.bits, variables)).join(" + ");
}

function primeImplicants(minterms, varCount) {
  let current = uniqueImplicants(minterms.map(minterm => ({
    bits: toBinary(minterm, varCount).split("").map(bit => Number(bit)),
    covers: [minterm]
  })));
  const primes = new Map();

  while (current.length) {
    const used = new Set();
    const next = new Map();

    for (let i = 0; i < current.length; i += 1) {
      for (let j = i + 1; j < current.length; j += 1) {
        const combinedBits = combineBits(current[i].bits, current[j].bits);
        if (!combinedBits) continue;
        used.add(i);
        used.add(j);
        const key = bitsKey(combinedBits);
        const covers = uniqueNumbers([...current[i].covers, ...current[j].covers]);
        if (!next.has(key)) {
          next.set(key, { bits: combinedBits, covers });
        } else {
          next.get(key).covers = uniqueNumbers([...next.get(key).covers, ...covers]);
        }
      }
    }

    current.forEach((implicant, index) => {
      if (!used.has(index)) primes.set(bitsKey(implicant.bits), implicant);
    });

    current = Array.from(next.values());
  }

  return Array.from(primes.values());
}

function uniqueImplicants(implicants) {
  const map = new Map();
  for (const implicant of implicants) {
    const key = bitsKey(implicant.bits);
    if (!map.has(key)) {
      map.set(key, { bits: implicant.bits, covers: uniqueNumbers(implicant.covers) });
    } else {
      map.get(key).covers = uniqueNumbers([...map.get(key).covers, ...implicant.covers]);
    }
  }
  return Array.from(map.values());
}

function combineBits(left, right) {
  let diff = 0;
  const result = [];

  for (let index = 0; index < left.length; index += 1) {
    if (left[index] === right[index]) {
      result.push(left[index]);
      continue;
    }

    if (left[index] === null || right[index] === null) return null;
    diff += 1;
    result.push(null);
  }

  return diff === 1 ? result : null;
}

function bitsKey(bits) {
  return bits.map(bit => bit === null ? "-" : String(bit)).join("");
}

function uniqueNumbers(values) {
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

function selectCover(primes, oneSet) {
  const selected = [];
  const uncovered = new Set(oneSet);
  const primeSet = new Set(primes);

  for (const minterm of Array.from(uncovered)) {
    if (!uncovered.has(minterm)) continue;
    const covering = primes.filter(implicant => implicant.covers.includes(minterm));
    if (covering.length === 1 && !selected.includes(covering[0])) {
      selected.push(covering[0]);
      primeSet.delete(covering[0]);
      for (const covered of covering[0].covers) uncovered.delete(covered);
    }
  }

  if (uncovered.size === 0) return selected;

  const remaining = Array.from(primeSet).filter(implicant => implicant.covers.some(minterm => uncovered.has(minterm)));
  const best = bestCoverSubset(remaining, uncovered);
  return [...selected, ...best];
}

function bestCoverSubset(implicants, uncoveredSet) {
  let best = null;

  function visit(index, chosen, covered) {
    if (best && chosen.length > best.length) return;
    if (coversAll(covered, uncoveredSet)) {
      if (!best || compareCover(chosen, best) < 0) best = [...chosen];
      return;
    }
    if (index >= implicants.length) return;

    visit(index + 1, [...chosen, implicants[index]], new Set([...covered, ...implicants[index].covers]));
    visit(index + 1, chosen, covered);
  }

  if (implicants.length <= 18) {
    visit(0, [], new Set());
    return best || [];
  }

  return greedyCover(implicants, uncoveredSet);
}

function coversAll(covered, required) {
  for (const minterm of required) {
    if (!covered.has(minterm)) return false;
  }
  return true;
}

function compareCover(left, right) {
  if (left.length !== right.length) return left.length - right.length;
  const leftLiteralCount = left.reduce((sum, implicant) => sum + literalCount(implicant.bits), 0);
  const rightLiteralCount = right.reduce((sum, implicant) => sum + literalCount(implicant.bits), 0);
  if (leftLiteralCount !== rightLiteralCount) return leftLiteralCount - rightLiteralCount;
  return left.map(implicant => bitsKey(implicant.bits)).join(",").localeCompare(right.map(implicant => bitsKey(implicant.bits)).join(","));
}

function greedyCover(implicants, uncoveredSet) {
  const uncovered = new Set(uncoveredSet);
  const selected = [];
  const remaining = [...implicants];

  while (uncovered.size && remaining.length) {
    remaining.sort((a, b) => {
      const coverA = a.covers.filter(minterm => uncovered.has(minterm)).length;
      const coverB = b.covers.filter(minterm => uncovered.has(minterm)).length;
      if (coverA !== coverB) return coverB - coverA;
      return literalCount(a.bits) - literalCount(b.bits);
    });
    const next = remaining.shift();
    selected.push(next);
    for (const minterm of next.covers) uncovered.delete(minterm);
  }

  return selected;
}

function literalCount(bits) {
  return bits.filter(bit => bit !== null).length;
}

function implicantToTerm(bits, variables) {
  const parts = bits
    .map((bit, index) => {
      if (bit === null) return "";
      return bit === 1 ? variables[index] : `${variables[index]}'`;
    })
    .filter(Boolean);
  return parts.length ? parts.join("") : "1";
}

function syncGraphDraftFromMachine(value) {
  graphDraft = cloneMachine(value);
  ensureGraphLayout(graphDraft);
  graphSelection = validGraphSelection(graphSelection, graphDraft) ? graphSelection : null;
  graphMode = "select";
  pendingTransitionSource = null;
  graphDirty = false;
  graphUndoStack = [];
  graphRedoStack = [];
  renderGraphEditor("Graph draft matches the applied machine.");
}

function renderGraphEditor(message) {
  if (!graphDraft) return;
  ensureGraphLayout(graphDraft);
  renderStateDiagram(graphDraft);
  renderGraphInspector();
  updateGraphButtons();
  if (message) setGraphMessage(message, graphDirty ? "warn" : "good");
  updateWorkflowGuide();
}

function renderStateDiagram(value) {
  const positions = new Map(Object.entries(value.layout || {}));
  const edgeMap = new Map();
  for (const state of value.states) {
    for (const input of inputSymbols(value.inputBits)) {
      const transition = value.transitions[state.name][input];
      const key = edgeKey(state.name, transition.next);
      const label = value.type === "moore" ? input : `${input}/${transition.output}`;
      if (!edgeMap.has(key)) {
        edgeMap.set(key, { key, from: state.name, to: transition.next, labels: [] });
      }
      edgeMap.get(key).labels.push(label);
    }
  }

  const edges = Array.from(edgeMap.values()).map(edge => drawEdge(edge, positions));
  const nodes = value.states.map(state => {
    const point = positions.get(state.name);
    const selected = graphSelection?.type === "state" && graphSelection.state === state.name;
    const pending = graphMode === "transition" && pendingTransitionSource === state.name;
    const output = value.type === "moore" ? `<text class="output-label" x="${point.x}" y="${point.y + 18}">Z=${escapeHtml(state.output)}</text>` : "";
    return [
      `<g class="state-node${selected ? " selected" : ""}${pending ? " pending-source" : ""}" data-state-name="${escapeHtml(state.name)}" role="button" tabindex="0">`,
      `<circle cx="${point.x}" cy="${point.y}" r="${NODE_RADIUS}"></circle>`,
      `<text x="${point.x}" y="${point.y - (value.type === "moore" ? 5 : 0)}">${escapeHtml(state.name)}</text>`,
      output,
      `</g>`
    ].join("");
  });

  els.stateDiagram.innerHTML = [
    `<svg viewBox="0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}" role="img" aria-label="State diagram">`,
    `<defs><marker id="arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 Z" fill="#405466"></path></marker></defs>`,
    ...edges,
    ...nodes,
    `</svg>`
  ].join("");

  wireGraphSvgEvents();
}

function drawEdge(edge, positions) {
  const from = positions.get(edge.from);
  const to = positions.get(edge.to);
  const label = edge.labels.join(", ");
  const selected = graphSelection?.type === "edge" && graphSelection.from === edge.from && graphSelection.to === edge.to;
  const escapedKey = escapeHtml(edge.key);
  const className = `edge-group${selected ? " selected" : ""}`;

  if (edge.from === edge.to) {
    const loopX = from.x;
    const loopY = from.y - NODE_RADIUS - 12;
    const path = `M ${from.x - 16} ${from.y - NODE_RADIUS + 5} C ${from.x - 62} ${from.y - 86}, ${from.x + 62} ${from.y - 86}, ${from.x + 16} ${from.y - NODE_RADIUS + 5}`;
    return [
      `<g class="${className}" data-edge-key="${escapedKey}" role="button" tabindex="0">`,
      `<path class="edge-hit" d="${path}"></path>`,
      `<path class="edge-path" marker-end="url(#arrow)" d="${path}"></path>`,
      `<text class="edge-label" x="${loopX}" y="${loopY - 34}">${escapeHtml(label)}</text>`,
      `</g>`
    ].join("");
  }

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const sx = from.x + ux * NODE_RADIUS;
  const sy = from.y + uy * NODE_RADIUS;
  const ex = to.x - ux * NODE_RADIUS;
  const ey = to.y - uy * NODE_RADIUS;
  const offsetSign = edge.from < edge.to ? 1 : -1;
  const offset = 24 * offsetSign;
  const mx = (sx + ex) / 2 + -uy * offset;
  const my = (sy + ey) / 2 + ux * offset;
  const path = `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;

  return [
    `<g class="${className}" data-edge-key="${escapedKey}" role="button" tabindex="0">`,
    `<path class="edge-hit" d="${path}"></path>`,
    `<path class="edge-path" marker-end="url(#arrow)" d="${path}"></path>`,
    `<text class="edge-label" x="${mx.toFixed(1)}" y="${(my - 8).toFixed(1)}">${escapeHtml(label)}</text>`,
    `</g>`
  ].join("");
}

function wireGraphSvgEvents() {
  for (const node of els.stateDiagram.querySelectorAll("[data-state-name]")) {
    node.addEventListener("pointerdown", event => {
      handleGraphNodePointerDown(event, node.dataset.stateName);
    });
    node.addEventListener("click", event => {
      event.stopPropagation();
      if (suppressNextGraphClick) {
        suppressNextGraphClick = false;
        return;
      }
      if (!activeDrag && graphMode !== "transition") selectGraphState(node.dataset.stateName);
    });
  }

  for (const edge of els.stateDiagram.querySelectorAll("[data-edge-key]")) {
    edge.addEventListener("click", event => {
      event.stopPropagation();
      selectGraphEdge(edge.dataset.edgeKey);
    });
  }

  const svg = els.stateDiagram.querySelector("svg");
  if (svg) {
    svg.addEventListener("click", () => {
      if (graphMode === "select") {
        graphSelection = null;
        renderGraphEditor();
      }
    });
  }
}

function handleGraphNodePointerDown(event, stateName) {
  els.stateDiagram.focus();
  event.preventDefault();
  event.stopPropagation();

  if (graphMode === "transition") {
    suppressNextGraphClick = true;
    handleTransitionPick(stateName);
    return;
  }

  graphSelection = { type: "state", state: stateName };
  activeDrag = {
    state: stateName,
    pointerId: event.pointerId,
    historyPushed: false,
    moved: false
  };
  renderGraphEditor();
}

function handleGraphPointerMove(event) {
  if (!activeDrag || event.pointerId !== activeDrag.pointerId || !graphDraft) return;
  const point = graphPointFromEvent(event);
  if (!point) return;

  if (!activeDrag.historyPushed) {
    pushGraphHistory();
    activeDrag.historyPushed = true;
  }

  graphDraft.layout[activeDrag.state] = clampGraphPoint(point);
  graphDirty = true;
  activeDrag.moved = true;
  renderGraphEditor();
}

function handleGraphPointerUp(event) {
  if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
  const wasMoved = activeDrag.moved;
  activeDrag = null;
  if (wasMoved) {
    renderGraphEditor("Layout changed. Apply graph to recompute the tables.");
  }
}

function graphPointFromEvent(event) {
  const svg = els.stateDiagram.querySelector("svg");
  if (!svg || !svg.createSVGPoint) return null;
  const matrix = svg.getScreenCTM();
  if (!matrix) return null;
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(matrix.inverse());
}

function selectGraphState(stateName) {
  if (!graphDraft?.states.some(state => state.name === stateName)) return;
  graphSelection = { type: "state", state: stateName };
  graphMode = "select";
  pendingTransitionSource = null;
  renderGraphEditor();
}

function selectGraphEdge(rawKey) {
  const parsed = parseEdgeKey(rawKey);
  if (!parsed || !graphEdgeExists(parsed.from, parsed.to)) return;
  graphSelection = { type: "edge", from: parsed.from, to: parsed.to };
  graphMode = "select";
  pendingTransitionSource = null;
  renderGraphEditor();
}

function graphEdgeExists(from, to) {
  return Boolean(graphDraft?.transitions[from]) && Object.values(graphDraft.transitions[from]).some(transition => transition.next === to);
}

function renderGraphInspector() {
  if (!graphDraft) {
    els.graphInspector.innerHTML = "";
    return;
  }

  if (graphSelection?.type === "state" && graphDraft.states.some(state => state.name === graphSelection.state)) {
    renderStateInspector(graphSelection.state);
    return;
  }

  if (graphSelection?.type === "edge" && graphEdgeExists(graphSelection.from, graphSelection.to)) {
    renderEdgeInspector(graphSelection.from, graphSelection.to);
    return;
  }

  graphSelection = null;
  els.graphInspector.innerHTML = [
    `<div class="inspector-head">`,
    `<h3>${escapeHtml(localizeText("Graph draft"))}</h3>`,
    graphDirty ? `<span class="draft-badge">${escapeHtml(localizeText("Not applied"))}</span>` : `<span class="status-pill good">${escapeHtml(localizeText("Applied"))}</span>`,
    `</div>`,
    `<p class="inspector-note">${escapeHtml(localizeText("Select a state or transition."))}</p>`
  ].join("");
}

function renderStateInspector(stateName) {
  const state = graphDraft.states.find(candidate => candidate.name === stateName);
  const transitionRows = inputSymbols(graphDraft.inputBits).map(input => {
    const transition = graphDraft.transitions[stateName][input];
    const outputCell = graphDraft.type === "mealy"
      ? `<td><input class="table-input" data-state-transition-output="${transitionKey(stateName, input)}" value="${escapeHtml(transition.output)}" maxlength="${graphDraft.outputBits}" spellcheck="false"></td>`
      : "";
    return [
      `<tr>`,
      `<td class="mono center">${escapeHtml(input)}</td>`,
      `<td>${stateSelectHtml(transition.next, `data-state-transition-next="${transitionKey(stateName, input)}"`)}</td>`,
      outputCell,
      `</tr>`
    ].join("");
  }).join("");

  const outputField = graphDraft.type === "moore"
    ? `<label class="field"><span>${escapeHtml(localizeText("Output"))}</span><input id="graphStateOutput" class="table-input" value="${escapeHtml(state.output)}" maxlength="${graphDraft.outputBits}" spellcheck="false"></label>`
    : "";
  const transitionHeaders = graphDraft.type === "mealy"
    ? `<th>${escapeHtml(localizeText("Input"))}</th><th>${escapeHtml(localizeText("Next state"))}</th><th>${escapeHtml(localizeText("Output"))}</th>`
    : `<th>${escapeHtml(localizeText("Input"))}</th><th>${escapeHtml(localizeText("Next state"))}</th>`;

  els.graphInspector.innerHTML = [
    `<div class="inspector-head">`,
    `<h3>${escapeHtml(localizeText("State"))} ${escapeHtml(state.name)}</h3>`,
    graphDirty ? `<span class="draft-badge">${escapeHtml(localizeText("Not applied"))}</span>` : `<span class="status-pill good">${escapeHtml(localizeText("Applied"))}</span>`,
    `</div>`,
    `<div class="inspector-grid${graphDraft.type === "moore" ? "" : " two"}">`,
    `<label class="field"><span>${escapeHtml(localizeText("Name"))}</span><input id="graphStateName" value="${escapeHtml(state.name)}" maxlength="18" spellcheck="false"></label>`,
    outputField,
    `<button id="graphSaveState" class="button" type="button" data-icon="check">${escapeHtml(localizeText("Save state"))}</button>`,
    `</div>`,
    `<div class="table-wrap">`,
    `<table><thead><tr>${transitionHeaders}</tr></thead><tbody>${transitionRows}</tbody></table>`,
    `</div>`
  ].join("");
}

function renderEdgeInspector(from, to) {
  const representedInputs = inputSymbols(graphDraft.inputBits).filter(input => graphDraft.transitions[from][input].next === to);
  const rows = representedInputs.map(input => {
    const transition = graphDraft.transitions[from][input];
    const outputCell = graphDraft.type === "mealy"
      ? `<td><input class="table-input" data-edge-transition-output="${transitionKey(from, input)}" value="${escapeHtml(transition.output)}" maxlength="${graphDraft.outputBits}" spellcheck="false"></td>`
      : "";
    return `<tr><td class="mono center">${escapeHtml(input)}</td>${outputCell}</tr>`;
  }).join("");
  const headers = graphDraft.type === "mealy"
    ? `<th>${escapeHtml(localizeText("Input"))}</th><th>${escapeHtml(localizeText("Output"))}</th>`
    : `<th>${escapeHtml(localizeText("Input"))}</th>`;
  const assignOutput = graphDraft.type === "mealy"
    ? `<label class="field"><span>${escapeHtml(localizeText("Output"))}</span><input id="edgeOutputValue" class="table-input" value="${zeroVector(graphDraft.outputBits)}" maxlength="${graphDraft.outputBits}" spellcheck="false"></label>`
    : "";

  els.graphInspector.innerHTML = [
    `<div class="inspector-head">`,
    `<h3>${escapeHtml(from)} -> ${escapeHtml(to)}</h3>`,
    graphDirty ? `<span class="draft-badge">${escapeHtml(localizeText("Not applied"))}</span>` : `<span class="status-pill good">${escapeHtml(localizeText("Applied"))}</span>`,
    `</div>`,
    `<div class="inspector-grid">`,
    `<label class="field"><span>${escapeHtml(localizeText("Input"))}</span>${inputSelectHtml("edgeInputSelect", inputSymbols(graphDraft.inputBits)[0])}</label>`,
    assignOutput,
    `<button id="edgeAssignInput" class="button" type="button" data-icon="check">${escapeHtml(localizeText("Assign input"))}</button>`,
    `</div>`,
    `<div class="table-wrap">`,
    `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`,
    `</div>`
  ].join("");
}

function handleGraphInspectorChange(event) {
  const target = event.target;
  if (!target) return;

  if (target.matches("[data-state-transition-next]")) {
    const { state, input } = parseTransitionKey(target.dataset.stateTransitionNext);
    mutateGraphDraft(draft => {
      draft.transitions[state][input].next = target.value;
      graphSelection = { type: "edge", from: state, to: target.value };
    }, "Transition target changed. Apply graph to recompute the tables.");
    return;
  }

  if (target.matches("[data-state-transition-output]")) {
    const { state, input } = parseTransitionKey(target.dataset.stateTransitionOutput);
    mutateGraphDraft(draft => {
      draft.transitions[state][input].output = coerceBitVector(target.value, draft.outputBits);
    }, "Transition output changed. Apply graph to recompute the tables.");
    return;
  }

  if (target.matches("[data-edge-transition-output]")) {
    const { state, input } = parseTransitionKey(target.dataset.edgeTransitionOutput);
    mutateGraphDraft(draft => {
      draft.transitions[state][input].output = coerceBitVector(target.value, draft.outputBits);
    }, "Transition output changed. Apply graph to recompute the tables.");
  }
}

function handleGraphInspectorClick(event) {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.id === "graphSaveState") {
    saveSelectedGraphState();
    return;
  }

  if (button.id === "edgeAssignInput") {
    assignSelectedEdgeInput();
  }
}

function saveSelectedGraphState() {
  if (graphSelection?.type !== "state") return;
  const oldName = graphSelection.state;
  const nameInput = document.querySelector("#graphStateName");
  const outputInput = document.querySelector("#graphStateOutput");
  const nextName = normalizeGraphStateName(nameInput?.value);
  if (!nextName) {
    setGraphMessage("State name is required.", "bad");
    return;
  }

  if (nextName !== oldName && graphDraft.states.some(state => state.name === nextName)) {
    setGraphMessage(`State ${nextName} already exists.`, "bad");
    return;
  }

  mutateGraphDraft(draft => {
    const state = draft.states.find(candidate => candidate.name === oldName);
    if (draft.type === "moore" && outputInput) {
      state.output = coerceBitVector(outputInput.value, draft.outputBits);
    }
    if (nextName !== oldName) {
      renameGraphState(draft, oldName, nextName);
      graphSelection = { type: "state", state: nextName };
    }
  }, "State changed. Apply graph to recompute the tables.");
}

function assignSelectedEdgeInput() {
  if (graphSelection?.type !== "edge") return;
  const input = document.querySelector("#edgeInputSelect")?.value;
  const output = document.querySelector("#edgeOutputValue")?.value;
  if (!input) return;

  mutateGraphDraft(draft => {
    draft.transitions[graphSelection.from][input].next = graphSelection.to;
    if (draft.type === "mealy") {
      draft.transitions[graphSelection.from][input].output = coerceBitVector(output, draft.outputBits);
    }
  }, "Input assigned to transition. Apply graph to recompute the tables.");
}

function addGraphState() {
  if (!graphDraft) return;
  if (graphDraft.states.length >= MAX_STATES) {
    setGraphMessage(`Use ${MAX_STATES} states or fewer.`, "bad");
    return;
  }

  const name = nextGraphStateName();
  mutateGraphDraft(draft => {
    draft.states.push({ name, output: zeroVector(draft.outputBits) });
    draft.transitions[name] = {};
    for (const input of inputSymbols(draft.inputBits)) {
      draft.transitions[name][input] = { next: name, output: zeroVector(draft.outputBits) };
    }
    draft.layout[name] = firstFreeGraphPoint(draft);
    graphSelection = { type: "state", state: name };
  }, `State ${name} added. Apply graph to recompute the tables.`);
}

function toggleTransitionMode() {
  if (graphMode === "transition") {
    graphMode = "select";
    pendingTransitionSource = null;
    renderGraphEditor("Transition mode cancelled.");
    return;
  }

  graphMode = "transition";
  pendingTransitionSource = null;
  graphSelection = null;
  renderGraphEditor("Transition mode ready.");
}

function handleTransitionPick(stateName) {
  if (!pendingTransitionSource) {
    pendingTransitionSource = stateName;
    graphSelection = { type: "state", state: stateName };
    renderGraphEditor(`Source ${stateName} selected.`);
    return;
  }

  const from = pendingTransitionSource;
  const to = stateName;
  const input = firstAssignableInput(from, to);
  mutateGraphDraft(draft => {
    draft.transitions[from][input].next = to;
    graphSelection = { type: "edge", from, to };
    graphMode = "select";
    pendingTransitionSource = null;
  }, `Transition ${from} -> ${to} added. Apply graph to recompute the tables.`);
}

function firstAssignableInput(from, to) {
  const symbols = inputSymbols(graphDraft.inputBits);
  return symbols.find(input => graphDraft.transitions[from][input].next !== to) || symbols[0];
}

function resetGraphLayout() {
  if (!graphDraft) return;
  mutateGraphDraft(draft => {
    draft.layout = autoLayoutFor(draft);
  }, "Layout reset. Apply graph to keep it.");
}

function deleteGraphSelection() {
  if (!graphDraft || !graphSelection) return;

  if (graphSelection.type === "state") {
    deleteGraphState(graphSelection.state);
    return;
  }

  if (graphSelection.type === "edge") {
    deleteGraphEdge(graphSelection.from, graphSelection.to);
  }
}

function deleteGraphState(stateName) {
  if (graphDraft.states.length <= 1) {
    setGraphMessage("At least one state is required.", "bad");
    return;
  }

  mutateGraphDraft(draft => {
    const fallback = draft.states.find(state => state.name !== stateName).name;
    draft.states = draft.states.filter(state => state.name !== stateName);
    delete draft.transitions[stateName];
    delete draft.layout[stateName];
    for (const state of draft.states) {
      for (const transition of Object.values(draft.transitions[state.name])) {
        if (transition.next === stateName) transition.next = fallback;
      }
    }
    graphSelection = { type: "state", state: fallback };
  }, `State ${stateName} deleted. Apply graph to recompute the tables.`);
}

function deleteGraphEdge(from, to) {
  const replacement = from !== to
    ? from
    : graphDraft.states.find(state => state.name !== from)?.name;
  if (!replacement) {
    setGraphMessage("A single-state self-loop cannot be deleted.", "bad");
    return;
  }

  mutateGraphDraft(draft => {
    for (const input of inputSymbols(draft.inputBits)) {
      if (draft.transitions[from][input].next === to) {
        draft.transitions[from][input].next = replacement;
      }
    }
    graphSelection = { type: "state", state: from };
  }, `Transition ${from} -> ${to} deleted. Apply graph to recompute the tables.`);
}

function undoGraphEdit() {
  if (!graphUndoStack.length) return;
  graphRedoStack.push(graphSnapshot());
  restoreGraphSnapshot(graphUndoStack.pop());
  renderGraphEditor("Undo applied.");
}

function redoGraphEdit() {
  if (!graphRedoStack.length) return;
  graphUndoStack.push(graphSnapshot());
  restoreGraphSnapshot(graphRedoStack.pop());
  renderGraphEditor("Redo applied.");
}

function applyGraphDraft() {
  if (!graphDraft) return;
  const errors = validateMachineValue(graphDraft);
  if (errors.length) {
    setGraphMessage(errors[0], "bad");
    return;
  }

  machine = cloneMachine(graphDraft);
  ensureGraphLayout(machine);
  writeControlsFromMachine(machine);
  renderEditor();
  analyzeCurrent("Graph changes applied.");
  setGraphMessage("Graph changes applied.", "good");
}

function handleGraphKeydown(event) {
  const targetTag = event.target?.tagName?.toLowerCase();
  const isTextTarget = ["input", "select", "textarea"].includes(targetTag);
  const shortcut = event.ctrlKey || event.metaKey;

  if (shortcut && event.key.toLowerCase() === "z" && !event.shiftKey) {
    event.preventDefault();
    undoGraphEdit();
    return;
  }

  if (shortcut && (event.key.toLowerCase() === "y" || (event.shiftKey && event.key.toLowerCase() === "z"))) {
    event.preventDefault();
    redoGraphEdit();
    return;
  }

  if (isTextTarget) return;

  if ((event.key === "Delete" || event.key === "Backspace") && graphSelection) {
    event.preventDefault();
    deleteGraphSelection();
  }

  if (event.key === "Escape" && graphMode === "transition") {
    graphMode = "select";
    pendingTransitionSource = null;
    renderGraphEditor("Transition mode cancelled.");
  }
}

function mutateGraphDraft(mutator, message) {
  if (!graphDraft) return;
  pushGraphHistory();
  mutator(graphDraft);
  normalizeGraphMachine(graphDraft);
  graphDirty = true;
  graphRedoStack = [];
  renderGraphEditor(message);
}

function pushGraphHistory() {
  graphUndoStack.push(graphSnapshot());
  if (graphUndoStack.length > GRAPH_HISTORY_LIMIT) graphUndoStack.shift();
}

function graphSnapshot() {
  return {
    draft: cloneMachine(graphDraft),
    selection: graphSelection ? { ...graphSelection } : null,
    mode: graphMode,
    pending: pendingTransitionSource,
    dirty: graphDirty
  };
}

function restoreGraphSnapshot(snapshot) {
  graphDraft = cloneMachine(snapshot.draft);
  graphSelection = snapshot.selection ? { ...snapshot.selection } : null;
  graphMode = snapshot.mode || "select";
  pendingTransitionSource = snapshot.pending || null;
  graphDirty = Boolean(snapshot.dirty);
  normalizeGraphMachine(graphDraft);
}

function updateGraphButtons() {
  els.graphUndo.disabled = graphUndoStack.length === 0;
  els.graphRedo.disabled = graphRedoStack.length === 0;
  els.graphDelete.disabled = !graphSelection;
  els.graphApply.disabled = !graphDirty;
  els.graphAddTransition.classList.toggle("active", graphMode === "transition");
}

function setGraphMessage(message, tone) {
  setMessage(els.graphMessage, message, tone);
}

function normalizeGraphMachine(value) {
  value.layout = value.layout || {};
  const stateNames = value.states.map(state => state.name);
  const stateNameSet = new Set(stateNames);
  const symbols = inputSymbols(value.inputBits);
  const zero = zeroVector(value.outputBits);

  for (const state of value.states) {
    state.output = isBitVector(state.output, value.outputBits) ? state.output : zero;
    value.transitions[state.name] = value.transitions[state.name] || {};
    for (const input of symbols) {
      const transition = value.transitions[state.name][input];
      value.transitions[state.name][input] = {
        next: transition && stateNameSet.has(transition.next) ? transition.next : state.name,
        output: isBitVector(transition?.output, value.outputBits) ? transition.output : zero
      };
    }
  }

  for (const key of Object.keys(value.transitions)) {
    if (!stateNameSet.has(key)) delete value.transitions[key];
  }

  ensureGraphLayout(value);
  if (!validGraphSelection(graphSelection, value)) graphSelection = null;
}

function ensureGraphLayout(value) {
  const layout = value.layout || {};
  const auto = autoLayoutFor(value);
  const stateNameSet = new Set(value.states.map(state => state.name));
  for (const state of value.states) {
    layout[state.name] = clampGraphPoint(layout[state.name] || auto[state.name]);
  }
  for (const name of Object.keys(layout)) {
    if (!stateNameSet.has(name)) delete layout[name];
  }
  value.layout = layout;
}

function autoLayoutFor(value) {
  const layout = {};
  const centerX = GRAPH_WIDTH / 2;
  const centerY = GRAPH_HEIGHT / 2 + 8;
  const ring = Math.min(GRAPH_WIDTH, GRAPH_HEIGHT) * 0.34;
  value.states.forEach((state, index) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / value.states.length;
    layout[state.name] = {
      x: centerX + Math.cos(angle) * ring,
      y: centerY + Math.sin(angle) * ring
    };
  });
  return layout;
}

function clampGraphPoint(point) {
  return {
    x: Math.max(NODE_RADIUS + 10, Math.min(GRAPH_WIDTH - NODE_RADIUS - 10, Number(point?.x) || GRAPH_WIDTH / 2)),
    y: Math.max(NODE_RADIUS + 10, Math.min(GRAPH_HEIGHT - NODE_RADIUS - 10, Number(point?.y) || GRAPH_HEIGHT / 2))
  };
}

function firstFreeGraphPoint(value) {
  const used = new Set(Object.values(value.layout || {}).map(point => `${Math.round(point.x / 20)}:${Math.round(point.y / 20)}`));
  for (let index = 0; index < 12; index += 1) {
    const point = clampGraphPoint({ x: GRAPH_WIDTH / 2 + index * 28, y: GRAPH_HEIGHT / 2 + index * 18 });
    const key = `${Math.round(point.x / 20)}:${Math.round(point.y / 20)}`;
    if (!used.has(key)) return point;
  }
  return clampGraphPoint({ x: GRAPH_WIDTH / 2, y: GRAPH_HEIGHT / 2 });
}

function validGraphSelection(selection, value) {
  if (!selection) return false;
  const stateNames = new Set(value.states.map(state => state.name));
  if (selection.type === "state") return stateNames.has(selection.state);
  if (selection.type === "edge") {
    return stateNames.has(selection.from)
      && stateNames.has(selection.to)
      && Object.values(value.transitions[selection.from] || {}).some(transition => transition.next === selection.to);
  }
  return false;
}

function renameGraphState(value, oldName, nextName) {
  const state = value.states.find(candidate => candidate.name === oldName);
  state.name = nextName;
  value.transitions[nextName] = value.transitions[oldName];
  delete value.transitions[oldName];
  value.layout[nextName] = value.layout[oldName];
  delete value.layout[oldName];

  for (const source of value.states) {
    for (const transition of Object.values(value.transitions[source.name])) {
      if (transition.next === oldName) transition.next = nextName;
    }
  }
}

function nextGraphStateName() {
  const used = new Set(graphDraft.states.map(state => state.name));
  for (const name of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    if (!used.has(name)) return name;
  }
  let index = 1;
  while (used.has(`S${index}`)) index += 1;
  return `S${index}`;
}

function normalizeGraphStateName(value) {
  return String(value || "").replace(/[,:\n\r\t]/g, " ").trim().replace(/\s+/g, "_").slice(0, 18);
}

function stateSelectHtml(selected, extraAttrs = "") {
  return [
    `<select class="table-select" ${extraAttrs}>`,
    ...graphDraft.states.map(state => `<option value="${escapeHtml(state.name)}"${state.name === selected ? " selected" : ""}>${escapeHtml(state.name)}</option>`),
    `</select>`
  ].join("");
}

function inputSelectHtml(id, selected) {
  return [
    `<select id="${escapeHtml(id)}" class="table-select">`,
    ...inputSymbols(graphDraft.inputBits).map(input => `<option value="${escapeHtml(input)}"${input === selected ? " selected" : ""}>${escapeHtml(input)}</option>`),
    `</select>`
  ].join("");
}

function edgeKey(from, to) {
  return `${encodeURIComponent(from)}::${encodeURIComponent(to)}`;
}

function parseEdgeKey(key) {
  const parts = String(key || "").split("::");
  if (parts.length !== 2) return null;
  return {
    from: decodeURIComponent(parts[0]),
    to: decodeURIComponent(parts[1])
  };
}

function transitionKey(state, input) {
  return `${encodeURIComponent(state)}::${input}`;
}

function parseTransitionKey(key) {
  const parts = String(key || "").split("::");
  return {
    state: decodeURIComponent(parts[0] || ""),
    input: parts[1] || ""
  };
}

function renderStateTable(rows) {
  renderTable(els.stateTable, ["Present state", "Input", "Next state", "Output"], rows.map(row => [
    { text: row.state, className: "mono" },
    { text: row.input, className: "mono center" },
    { text: row.next, className: "mono" },
    { text: row.output, className: "mono center" }
  ]));
}

function renderImplicationSection(analysis) {
  const minimizedCount = analysis.minimized.classes.length;
  const originalCount = analysis.machine.states.length;
  const reduced = minimizedCount < originalCount;
  setMessage(
    els.implicationSummary,
    reduced
      ? `${originalCount} states reduce to ${minimizedCount} equivalent class(es).`
      : "No state minimization is possible for this complete machine.",
    reduced ? "good" : "warn"
  );

  const states = analysis.paull.states;
  if (states.length < 2) {
    renderTable(els.implicationTable, ["Pair", "Result"], [[{ text: "none" }, { text: "Only one state is present." }]]);
  } else {
    const headers = ["", ...states.slice(0, -1)];
    const rows = [];
    for (let rowIndex = 1; rowIndex < states.length; rowIndex += 1) {
      const row = [{ text: states[rowIndex], className: "mono" }];
      for (let colIndex = 0; colIndex < states.length - 1; colIndex += 1) {
        if (colIndex >= rowIndex) {
          row.push({ text: "", className: "center" });
          continue;
        }

        const key = pairKey(states[colIndex], states[rowIndex], analysis.paull.indexByState);
        const cell = analysis.paull.cells.get(key);
        row.push({ html: implicationCellHtml(cell), className: cell.incompatible ? "bad-cell" : "good-cell" });
      }
      rows.push(row);
    }
    renderTable(els.implicationTable, headers, rows);
  }

  renderTable(
    els.equivalenceTable,
    ["Class", "Original states", "Encoding", "Output"],
    analysis.minimized.classes.map(clazz => [
      { text: clazz.id, className: "mono" },
      { text: `{${clazz.members.join(", ")}}`, className: "mono" },
      { text: clazz.encoding, className: "mono center" },
      { text: analysis.machine.type === "moore" ? clazz.output : "-", className: "mono center" }
    ])
  );
}

function implicationCellHtml(cell) {
  if (cell.incompatible) {
    return `<strong>X</strong><div class="cell-note">${escapeHtml(cell.reason)}</div>`;
  }

  if (!cell.dependencies.length) {
    return `<strong>OK</strong><div class="cell-note">no pending pair</div>`;
  }

  const dependencies = cell.dependencies
    .map(dependency => `(${dependency.pair.join(", ")})`)
    .join(", ");
  return `<strong>OK</strong><div class="cell-note">${escapeHtml(dependencies)}</div>`;
}

function renderTransitionTable(analysis) {
  const headers = [
    "State",
    ...analysis.encoded.stateBitLabels,
    ...analysis.encoded.inputBitLabels,
    "Next state",
    ...analysis.encoded.stateBitLabels.map(label => `${label}+`),
    ...analysis.encoded.outputBitLabels
  ];

  const rows = analysis.encoded.transitionRows.map(row => [
    { text: row.unused ? "unused" : `${row.state} {${row.members.join(", ")}}`, className: "mono" },
    ...row.presentBits.split("").map(bit => ({ text: bit, className: "mono center" })),
    ...row.inputBits.split("").map(bit => ({ text: bit, className: "mono center" })),
    { text: row.nextState, className: "mono" },
    ...row.nextBits.split("").map(bit => ({ text: bit, className: "mono center" })),
    ...row.outputBits.split("").map(bit => ({ text: bit, className: "mono center" }))
  ]);

  renderTable(els.transitionTable, headers, rows);
}

function renderExcitationSection(analysis) {
  const invalid = analysis.excitation.rows.some(row => row.status === "invalid");
  setMessage(
    els.excitationStatus,
    invalid
      ? "At least one transition violates the selected flip-flop excitation rules."
      : `All valid transitions match the ${analysis.machine.flipFlopType} flip-flop excitation rules.`,
    invalid ? "bad" : "good"
  );

  renderReferenceExcitationTable(analysis.machine.flipFlopType);
  renderComputedExcitationTable(analysis);
}

function renderReferenceExcitationTable(type) {
  const specs = {
    D: {
      headers: ["Q", "Q+", "D"],
      rows: [["0", "0", "0"], ["0", "1", "1"], ["1", "0", "0"], ["1", "1", "1"]]
    },
    T: {
      headers: ["Q", "Q+", "T"],
      rows: [["0", "0", "0"], ["0", "1", "1"], ["1", "0", "1"], ["1", "1", "0"]]
    },
    JK: {
      headers: ["Q", "Q+", "J", "K"],
      rows: [["0", "0", "0", "X"], ["0", "1", "1", "X"], ["1", "0", "X", "1"], ["1", "1", "X", "0"]]
    },
    SR: {
      headers: ["Q", "Q+", "S", "R"],
      rows: [["0", "0", "0", "X"], ["0", "1", "1", "0"], ["1", "0", "0", "1"], ["1", "1", "X", "0"]]
    }
  };
  const spec = specs[type];
  renderTable(els.referenceExcitationTable, spec.headers, spec.rows.map(row => row.map(value => ({ text: value, className: "mono center" }))));
}

function renderComputedExcitationTable(analysis) {
  const headers = [
    "State",
    ...analysis.encoded.stateBitLabels,
    ...analysis.encoded.inputBitLabels,
    ...analysis.encoded.stateBitLabels.map(label => `${label}+`),
    ...analysis.excitation.signalNames,
    "Check"
  ];

  const rows = analysis.excitation.rows.map(row => {
    const statusClass = row.status === "OK" ? "good" : row.status === "invalid" ? "bad" : "neutral";
    return [
      { text: row.unused ? "unused" : row.state, className: "mono" },
      ...row.presentBits.split("").map(bit => ({ text: bit, className: "mono center" })),
      ...row.inputBits.split("").map(bit => ({ text: bit, className: "mono center" })),
      ...row.nextBits.split("").map(bit => ({ text: bit, className: "mono center" })),
      ...analysis.excitation.signalNames.map(signal => ({ text: row.signalValues[signal], className: "mono center" })),
      { html: `<span class="status-pill ${statusClass}">${escapeHtml(row.status)}</span>`, className: "center" }
    ];
  });

  renderTable(els.computedExcitationTable, headers, rows);
}

function renderLogicSection(analysis) {
  els.logicEquations.innerHTML = analysis.logic.functions.map(fn => [
    `<section class="equation-card">`,
    `<h3>${escapeHtml(fn.name)}</h3>`,
    `<code>${escapeHtml(fn.name)} = ${escapeHtml(fn.equation)}</code>`,
    `</section>`
  ].join("")).join("");

  renderTable(
    els.logicSourceTable,
    ["Signal", "Variable order", "1-minterms", "Don't-cares", "Equation"],
    analysis.logic.functions.map(fn => [
      { text: fn.name, className: "mono" },
      { text: fn.variables.join(", "), className: "mono" },
      { text: fn.ones.length ? fn.ones.join(", ") : "-", className: "mono" },
      { text: fn.dontCares.length ? fn.dontCares.join(", ") : "-", className: "mono" },
      { text: `${fn.name} = ${fn.equation}`, className: "mono" }
    ])
  );
}

function renderTable(container, headers, rows) {
  container.innerHTML = tableHtml(headers, rows);
}

function tableHtml(headers, rows) {
  if (!rows.length) return `<div class="empty">${escapeHtml(localizeText("No rows."))}</div>`;
  return [
    `<table>`,
    `<thead><tr>${headers.map(header => `<th>${escapeHtml(localizeText(header))}</th>`).join("")}</tr></thead>`,
    `<tbody>`,
    ...rows.map(row => `<tr>${row.map(cellToHtml).join("")}</tr>`),
    `</tbody>`,
    `</table>`
  ].join("");
}

function cellToHtml(cell) {
  const normalized = typeof cell === "object" && cell !== null ? cell : { text: String(cell) };
  const className = normalized.className ? ` class="${escapeHtml(normalized.className)}"` : "";
  if (Object.prototype.hasOwnProperty.call(normalized, "html")) {
    return `<td${className}>${normalized.html}</td>`;
  }
  const rawText = normalized.text ?? "";
  const text = normalized.className && normalized.className.includes("mono")
    ? rawText
    : localizeText(rawText);
  return `<td${className}>${escapeHtml(text)}</td>`;
}

function setMessage(element, message, tone) {
  element.textContent = localizeText(message);
  element.classList.remove("good", "bad", "warn");
  if (tone) element.classList.add(tone);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

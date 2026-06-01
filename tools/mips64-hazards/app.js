"use strict";

const languageKey = "mips64-hazards-language";

const translations = {
  it: {
    language: "Lingua",
    tutorial: "Tutorial",
    quizMode: "Quiz",
    close: "Chiudi",
    exercise: "Esercizio",
    caseResolution: "Caso e risoluzione",
    resolution: "Risoluzione",
    delaySlot: "Branch delay slot utile",
    cycleCommands: "Comandi ciclo",
    clock: "Clock",
    cycleDetail: "Dettaglio ciclo",
    instruction: "Istruzione",
    dataPath: "Cammino dato",
    keyIdea: "Idea chiave",
    emptyPipeline: "Clock 0 - pipeline vuota",
    wait: "attesa",
    done: "finita",
    stopped: "ferma",
    quizQuestion: "Quale descrizione spiega correttamente questo clock?",
    quizIntro: "Modalita quiz attiva: scegli la descrizione corretta. Le spiegazioni del ciclo sono nascoste finche non rispondi.",
    correct: "Corretto.",
    wrong: "Non proprio.",
    correctAnswer: "Risposta corretta",
    tutorialIntro: "Segui questo flusso per confrontare stalli, forwarding e penalita di controllo.",
    tutorialStep1Title: "1. Scegli il caso",
    tutorialStep1Body: "Seleziona la coppia produttore-consumatore oppure il branch preso nella matrice degli hazard.",
    tutorialStep2Title: "2. Confronta le risoluzioni",
    tutorialStep2Body: "Passa da con forwarding a senza forwarding e osserva quanti cicli di stallo cambiano.",
    tutorialStep3Title: "3. Avanza nel tempo",
    tutorialStep3Body: "Usa i controlli ciclo per costruire la pipeline e leggere quando compaiono bolle, flush e dati inoltrati.",
    tutorialStep4Title: "4. Prova il quiz",
    tutorialStep4Body: "In modalita quiz il pannello Clock story diventa una domanda a scelta multipla."
  },
  en: {
    language: "Language",
    tutorial: "Tutorial",
    quizMode: "Quiz",
    close: "Close",
    exercise: "Exercise",
    caseResolution: "Case and resolution",
    resolution: "Resolution",
    delaySlot: "Useful branch delay slot",
    cycleCommands: "Cycle controls",
    clock: "Clock",
    cycleDetail: "Cycle detail",
    instruction: "Instruction",
    dataPath: "Data path",
    keyIdea: "Key idea",
    emptyPipeline: "Clock 0 - empty pipeline",
    wait: "waiting",
    done: "done",
    stopped: "stopped",
    quizQuestion: "Which description correctly explains this clock?",
    quizIntro: "Quiz mode is active: choose the correct description. Cycle explanations stay hidden until you answer.",
    correct: "Correct.",
    wrong: "Not quite.",
    correctAnswer: "Correct answer",
    tutorialIntro: "Use this flow to compare stalls, forwarding, and control penalties.",
    tutorialStep1Title: "1. Choose the case",
    tutorialStep1Body: "Select the producer-consumer pair or the taken branch in the hazard matrix.",
    tutorialStep2Title: "2. Compare resolutions",
    tutorialStep2Body: "Switch between forwarding and no forwarding and watch how many stall cycles change.",
    tutorialStep3Title: "3. Step through time",
    tutorialStep3Body: "Use the cycle controls to build the pipeline and see when bubbles, flushes, and forwarded values appear.",
    tutorialStep4Title: "4. Try quiz mode",
    tutorialStep4Body: "In quiz mode the Clock story panel becomes a multiple-choice question."
  }
};

const englishText = {
  "Con forwarding": "With forwarding",
  "Senza forwarding": "Without forwarding",
  "RAW sui dati": "Data RAW hazard",
  "RAW su branch anticipato": "RAW hazard on early branch",
  "Salto preso": "Taken branch",
  "produce R1": "produces R1",
  "usa R1": "uses R1",
  "carica R1": "loads R1",
  "aggiorna R1": "updates R1",
  "confronta R1": "compares R1",
  "Bolle": "Bubbles",
  "interlock": "interlock",
  "decide PC": "decides PC",
  "fall-through": "fall-through",
  "target": "target",
  "stallo": "stall",
  "bolla": "bubble",
  "annulla": "cancel",
  "La prima ALU produce R1 alla fine di EX. Con forwarding il dato entra direttamente nella ALU successiva.": "The first ALU instruction produces R1 at the end of EX. With forwarding, the value goes directly into the next ALU.",
  "La load calcola solo l'indirizzo in EX; il dato utile arriva dopo MEM.": "The load only computes the address in EX; the useful data arrives after MEM.",
  "Il branch anticipato confronta i registri in ID, quindi chiede il dato prima di una ALU normale.": "The early branch compares registers in ID, so it needs the value earlier than a normal ALU consumer.",
  "La load rende disponibile R1 troppo tardi per il branch in ID: il caso resta il piu penalizzante.": "The load makes R1 available too late for the branch in ID: this remains the most expensive case.",
  "Quando il salto e' preso, l'istruzione sequenziale gia entrata in IF diventa lavoro sprecato.": "When the branch is taken, the sequential instruction already fetched in IF becomes wasted work.",
  "ForwardA/ForwardB scelgono il risultato appena calcolato invece del valore vecchio nel register file.": "ForwardA/ForwardB select the freshly computed result instead of the stale register-file value.",
  "La seconda istruzione resta in ID finche R1 viene scritto nel register file.": "The second instruction stays in ID until R1 is written in the register file.",
  "Anche con forwarding serve una bolla: il dato della load non esiste prima della fine di MEM.": "Even with forwarding, one bubble is needed: load data does not exist before the end of MEM.",
  "Senza forwarding si aspetta la scrittura in WB, poi la ALU puo partire al ciclo seguente.": "Without forwarding, the pipeline waits for WB, then the ALU can start in the next cycle.",
  "Il forwarding verso il comparatore in ID riduce lo stallo a un solo ciclo.": "Forwarding to the ID comparator reduces the stall to one cycle.",
  "Senza forwarding il branch puo confrontare R1 solo quando il register file lo vede aggiornato.": "Without forwarding, the branch can compare R1 only when the register file sees the updated value.",
  "Il dato letto in MEM puo arrivare al confronto solo dopo due cicli di attesa.": "The data read in MEM can reach the comparison only after two waiting cycles.",
  "Il numero di stalli resta due perche la lettura in ID puo vedere il WB nella stessa finestra di clock.": "The stall count remains two because the ID read can see WB in the same clock window.",
  "Il forwarding non cambia questo hazard: la penalita dipende da quando il nuovo PC e' noto.": "Forwarding does not change this hazard: the penalty depends on when the new PC is known.",
  "Il delay slot viene riempito con lavoro utile: la bolla di controllo non pesa sul programma.": "The delay slot is filled with useful work: the control bubble does not cost the program.",
  "La pipeline e' vuota: premi avanti per inserire la prima IF e costruire il diagramma ciclo per ciclo.": "The pipeline is empty: press next to insert the first IF and build the diagram cycle by cycle.",
  "Il branch decide il PC mentre la fetch sequenziale e' gia partita.": "The branch decides the PC while sequential fetch has already started.",
  "Il salto preso annulla la fall-through e lascia entrare il target corretto.": "The taken branch cancels the fall-through and lets the correct target enter.",
  "Il delay slot avanza come istruzione utile mentre il target entra in fetch.": "The delay slot advances as useful work while the target enters fetch.",
  "Le istruzioni scorrono negli stadi visibili per questo ciclo.": "The instructions flow through the visible stages for this cycle.",
  "La seconda istruzione legge R1 dal register file, ma legge ancora il vecchio valore.": "The second instruction reads R1 from the register file, but still sees the old value.",
  "Le istruzioni avanzano di uno stadio rispetto al ciclo precedente.": "Instructions advance by one stage from the previous cycle.",
  "Non e' ancora entrata nella pipeline.": "It has not entered the pipeline yet.",
  "Ha gia completato il proprio cammino nella pipeline.": "It has already completed its path through the pipeline.",
  "Non occupa uno stadio in questo ciclo.": "It does not occupy a stage in this cycle.",
  "La EX resta vuota: la bolla mantiene ferma l'istruzione dipendente senza perdere il dato corretto.": "EX stays empty: the bubble keeps the dependent instruction stopped without losing the correct value.",
  "Questa istruzione era entrata lungo il cammino sequenziale, ma viene annullata perche il branch e' preso.": "This instruction entered through the sequential path, but it is canceled because the branch is taken.",
  "Il branch anticipato confronta i registri in ID e seleziona il prossimo PC; se il salto e' preso, la fetch sequenziale va annullata.": "The early branch compares registers in ID and selects the next PC; if the branch is taken, sequential fetch must be canceled.",
  "Questa istruzione riempie il branch delay slot: avanza normalmente e il suo lavoro non viene perso.": "This instruction fills the branch delay slot: it advances normally and its work is not lost.",
  "Il target del branch entra in IF appena il PC corretto viene selezionato.": "The branch target enters IF as soon as the correct PC is selected.",
  "La fetch sequenziale e' gia partita, ma verra annullata se il branch viene confermato preso.": "Sequential fetch has already started, but it will be canceled if the branch is confirmed taken."
};

const MODES = {
  forwarding: {
    label: "Con forwarding",
    shortLabel: "FWD"
  },
  noForwarding: {
    label: "Senza forwarding",
    shortLabel: "NO FWD"
  }
};

const STAGES = {
  IF: {
    label: "IF",
    name: "Instruction Fetch",
    resource: "IM",
    description: "Il PC legge la memoria istruzioni e prepara PC + 4."
  },
  ID: {
    label: "ID",
    name: "Instruction Decode",
    resource: "Reg",
    description: "Il register file viene letto nella seconda meta del clock."
  },
  EX: {
    label: "EX",
    name: "Execute",
    resource: "ALU",
    description: "La ALU calcola il risultato o l'indirizzo effettivo."
  },
  MEM: {
    label: "MEM",
    name: "Memory",
    resource: "DM",
    description: "La memoria dati viene letta o scritta quando serve."
  },
  WB: {
    label: "WB",
    name: "Write Back",
    resource: "Reg",
    description: "Il risultato viene scritto nel register file all'inizio del clock."
  },
  BUBBLE: {
    label: "bolla",
    name: "Bubble",
    resource: "EX vuota",
    description: "Ciclo inserito dalla logica di interlock per preservare il dato corretto."
  },
  FLUSH: {
    label: "flush",
    name: "Flush",
    resource: "IF annullata",
    description: "L'istruzione speculativa viene annullata perche il branch e' preso."
  }
};

const SCENARIOS = {
  "alu-alu": {
    kind: "data",
    title: "ALU -> ALU",
    hazard: "RAW sui dati",
    producerLabel: "ALU",
    consumerLabel: "ALU",
    focusRegister: "R1",
    producerType: "alu",
    consumerType: "alu",
    roleLabels: ["produce R1", "usa R1"],
    program: ["DADD R1,R2,R3", "DSUB R4,R1,R5"],
    summary:
      "La prima ALU produce R1 alla fine di EX. Con forwarding il dato entra direttamente nella ALU successiva.",
    resolutions: {
      forwarding: {
        stalls: 0,
        route: ["EX/MEM", "ALU input"],
        link: { source: { row: "producer", cycle: 3 }, target: { row: "consumer", cycle: 4 } },
        note: "ForwardA/ForwardB scelgono il risultato appena calcolato invece del valore vecchio nel register file."
      },
      noForwarding: {
        stalls: 2,
        route: ["WB", "ID"],
        link: { source: { row: "producer", cycle: 5 }, target: { row: "consumer", cycle: 5 } },
        note: "La seconda istruzione resta in ID finche R1 viene scritto nel register file."
      }
    }
  },
  "load-alu": {
    kind: "data",
    title: "Load -> ALU",
    hazard: "RAW sui dati",
    producerLabel: "Load",
    consumerLabel: "ALU",
    focusRegister: "R1",
    producerType: "load",
    consumerType: "alu",
    roleLabels: ["carica R1", "usa R1"],
    program: ["LD R1,0(R2)", "DADD R4,R1,R5"],
    summary:
      "La load calcola solo l'indirizzo in EX; il dato utile arriva dopo MEM.",
    resolutions: {
      forwarding: {
        stalls: 1,
        route: ["MEM/WB", "ALU input"],
        link: { source: { row: "producer", cycle: 4 }, target: { row: "consumer", cycle: 5 } },
        note: "Anche con forwarding serve una bolla: il dato della load non esiste prima della fine di MEM."
      },
      noForwarding: {
        stalls: 2,
        route: ["WB", "ID"],
        link: { source: { row: "producer", cycle: 5 }, target: { row: "consumer", cycle: 5 } },
        note: "Senza forwarding si aspetta la scrittura in WB, poi la ALU puo partire al ciclo seguente."
      }
    }
  },
  "alu-branch": {
    kind: "data",
    title: "ALU -> Branch",
    hazard: "RAW su branch anticipato",
    producerLabel: "ALU",
    consumerLabel: "Branch",
    focusRegister: "R1",
    producerType: "alu",
    consumerType: "branch",
    roleLabels: ["aggiorna R1", "confronta R1"],
    program: ["DADDI R1,R1,4", "BEQ R1,R6,L1"],
    summary:
      "Il branch anticipato confronta i registri in ID, quindi chiede il dato prima di una ALU normale.",
    resolutions: {
      forwarding: {
        stalls: 1,
        route: ["EX/MEM", "ID compare"],
        link: { source: { row: "producer", cycle: 3 }, target: { row: "consumer", cycle: 4 } },
        note: "Il forwarding verso il comparatore in ID riduce lo stallo a un solo ciclo."
      },
      noForwarding: {
        stalls: 2,
        route: ["WB", "ID compare"],
        link: { source: { row: "producer", cycle: 5 }, target: { row: "consumer", cycle: 5 } },
        note: "Senza forwarding il branch puo confrontare R1 solo quando il register file lo vede aggiornato."
      }
    }
  },
  "load-branch": {
    kind: "data",
    title: "Load -> Branch",
    hazard: "RAW su branch anticipato",
    producerLabel: "Load",
    consumerLabel: "Branch",
    focusRegister: "R1",
    producerType: "load",
    consumerType: "branch",
    roleLabels: ["carica R1", "confronta R1"],
    program: ["LD R1,0(R2)", "BEQ R1,R6,L1"],
    summary:
      "La load rende disponibile R1 troppo tardi per il branch in ID: il caso resta il piu penalizzante.",
    resolutions: {
      forwarding: {
        stalls: 2,
        route: ["MEM/WB", "ID compare"],
        link: { source: { row: "producer", cycle: 4 }, target: { row: "consumer", cycle: 5 } },
        note: "Il dato letto in MEM puo arrivare al confronto solo dopo due cicli di attesa."
      },
      noForwarding: {
        stalls: 2,
        route: ["WB", "ID compare"],
        link: { source: { row: "producer", cycle: 5 }, target: { row: "consumer", cycle: 5 } },
        note: "Il numero di stalli resta due perche la lettura in ID puo vedere il WB nella stessa finestra di clock."
      }
    }
  },
  "taken-branch": {
    kind: "control",
    title: "Salto preso",
    hazard: "Control hazard",
    producerLabel: "Branch",
    consumerLabel: "Target",
    focusRegister: "PC",
    program: ["BEQ R1,R2,L1", "DADD R7,R8,R9", "L1: OR R4,R5,R6"],
    summary:
      "Quando il salto e' preso, l'istruzione sequenziale gia entrata in IF diventa lavoro sprecato.",
    resolutions: {
      forwarding: {
        stalls: 1,
        route: ["ID branch", "PC target"],
        note: "Il forwarding non cambia questo hazard: la penalita dipende da quando il nuovo PC e' noto."
      },
      noForwarding: {
        stalls: 1,
        route: ["ID branch", "PC target"],
        note: "Il forwarding non cambia questo hazard: la penalita dipende da quando il nuovo PC e' noto."
      }
    }
  }
};

const els = {
  modeButtons: document.getElementById("modeButtons"),
  delayToggleWrap: document.getElementById("delayToggleWrap"),
  delaySlotToggle: document.getElementById("delaySlotToggle"),
  scenarioMatrix: document.getElementById("scenarioMatrix"),
  hazardType: document.getElementById("hazardType"),
  timelineTitle: document.getElementById("timelineTitle"),
  penaltyMeter: document.getElementById("penaltyMeter"),
  programSnippet: document.getElementById("programSnippet"),
  pipelineGrid: document.getElementById("pipelineGrid"),
  stageRail: document.getElementById("stageRail"),
  inspector: document.getElementById("inspector"),
  cycleLabel: document.getElementById("cycleLabel"),
  prevCycle: document.getElementById("prevCycle"),
  nextCycle: document.getElementById("nextCycle"),
  playCycle: document.getElementById("playCycle"),
  playIcon: document.getElementById("playIcon"),
  resetCycle: document.getElementById("resetCycle"),
  languageSelect: document.getElementById("languageSelect"),
  tutorialButton: document.getElementById("tutorialButton"),
  quizModeBtn: document.getElementById("quizModeBtn"),
  infoModal: document.getElementById("infoModal"),
  infoModalTitle: document.getElementById("infoModalTitle"),
  infoModalBody: document.getElementById("infoModalBody")
};

const state = {
  language: getInitialLanguage(),
  scenarioId: "alu-alu",
  mode: "forwarding",
  selectedCycle: 0,
  selectedCell: null,
  delaySlot: false,
  playing: false,
  timer: null,
  quizMode: false,
  quizAnswers: new Map(),
  quizChoiceCache: new Map()
};

let lastInfoTrigger = null;

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
  const entry = translations[state.language][key] ?? translations.en[key] ?? key;
  if (typeof entry === "function") return entry(params);
  return entry.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
}

function localizeText(value) {
  if (state.language === "it") return value;
  return englishText[value] || value;
}

function quizText(it, en) {
  return state.language === "en" ? en : it;
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(element => {
    element.dataset.i18nAttr.split(";").forEach(pair => {
      const [attribute, key] = pair.split(":");
      if (attribute && key) element.setAttribute(attribute, t(key));
    });
  });
  els.languageSelect.value = state.language;
  els.quizModeBtn.textContent = t("quizMode");
  els.tutorialButton.textContent = t("tutorial");
}

function setLanguage(language) {
  if (language !== "en" && language !== "it") return;
  state.language = language;
  try {
    localStorage.setItem(languageKey, language);
  } catch (error) {
    // Local files may block storage in some browser settings.
  }
  applyTranslations();
  render();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cellKey(rowId, cycle) {
  return `${rowId}:${cycle}`;
}

function currentScenario() {
  return SCENARIOS[state.scenarioId];
}

function currentResolution() {
  const scenario = currentScenario();
  if (scenario.kind === "control" && state.delaySlot) {
    return {
      ...scenario.resolutions[state.mode],
      stalls: 0,
      route: ["delay slot", "target IF"],
      note: "Il delay slot viene riempito con lavoro utile: la bolla di controllo non pesa sul programma."
    };
  }
  return scenario.resolutions[state.mode];
}

function makeRow(id, label, role) {
  return {
    id,
    label,
    role,
    cells: {}
  };
}

function addCell(row, cycle, stage, options = {}) {
  row.cells[cycle] = {
    rowId: row.id,
    cycle,
    stage,
    label: options.label || STAGES[stage].label,
    sub: options.sub === undefined ? STAGES[stage].resource : options.sub,
    detail: options.detail || "",
    tone: options.tone || stage.toLowerCase()
  };
}

function rowInstructionTag(row) {
  if (row.id === "producer" || row.id === "branch") return "I1";
  if (row.id === "consumer" || row.id === "flushed" || row.id === "delay") return "I2";
  if (row.id === "target") return "I3";
  return row.role;
}

function rowBounds(row) {
  const cycles = Object.keys(row.cells).map(Number).sort((a, b) => a - b);
  return {
    first: cycles[0] || 0,
    last: cycles[cycles.length - 1] || 0
  };
}

function producerDetail(scenario, stage) {
  if (stage === "EX" && scenario.producerType === "alu") {
    return `${scenario.focusRegister} viene calcolato alla fine di EX. Con forwarding puo essere usato prima del WB.`;
  }
  if (stage === "EX" && scenario.producerType === "load") {
    return `La ALU calcola l'indirizzo effettivo; il valore di ${scenario.focusRegister} non e' ancora uscito dalla memoria.`;
  }
  if (stage === "MEM" && scenario.producerType === "load") {
    return `La memoria dati restituisce ${scenario.focusRegister} alla fine della fase MEM.`;
  }
  if (stage === "WB") {
    return `${scenario.focusRegister} viene scritto nel register file all'inizio del clock.`;
  }
  return STAGES[stage].description;
}

function consumerDetail(scenario, stage, isStall) {
  if (isStall) {
    return `Interlock attivo: la seconda istruzione resta in ID e in EX entra una bolla.`;
  }
  if (stage === "ID" && scenario.consumerType === "branch") {
    return `Il branch confronta ${scenario.focusRegister} in ID; se il dato non e' pronto, la pipeline deve fermarsi.`;
  }
  if (stage === "EX" && scenario.consumerType === "alu") {
    return `La ALU consuma ${scenario.focusRegister}; il valore arriva tramite ${currentResolution().route.join(" -> ")}.`;
  }
  return STAGES[stage].description;
}

function buildDataSchedule(scenario, resolution) {
  const producer = makeRow("producer", scenario.program[0], scenario.roleLabels[0]);
  const consumer = makeRow("consumer", scenario.program[1], scenario.roleLabels[1]);
  const rows = [producer, consumer];

  ["IF", "ID", "EX", "MEM", "WB"].forEach((stage, index) => {
    addCell(producer, index + 1, stage, { detail: producerDetail(scenario, stage) });
  });

  addCell(consumer, 2, "IF", { detail: consumerDetail(scenario, "IF", false) });
  addCell(consumer, 3, "ID", { detail: consumerDetail(scenario, "ID", false) });

  for (let index = 0; index < resolution.stalls; index += 1) {
    addCell(consumer, 4 + index, "ID", {
      label: "ID",
      sub: "stallo",
      detail: consumerDetail(scenario, "ID", true),
      tone: "stall"
    });
  }

  const exCycle = 4 + resolution.stalls;
  addCell(consumer, exCycle, "EX", { detail: consumerDetail(scenario, "EX", false) });
  addCell(consumer, exCycle + 1, "MEM", { detail: consumerDetail(scenario, "MEM", false) });
  addCell(consumer, exCycle + 2, "WB", { detail: consumerDetail(scenario, "WB", false) });

  if (resolution.stalls > 0) {
    const bubble = makeRow("bubble", "Bolle", "interlock");
    for (let index = 0; index < resolution.stalls; index += 1) {
      addCell(bubble, 4 + index, "BUBBLE", {
        label: "bolla",
        sub: "EX",
        detail: STAGES.BUBBLE.description,
        tone: "bubble"
      });
    }
    rows.push(bubble);
  }

  return {
    rows,
    maxCycle: exCycle + 2,
    link: resolution.link || null
  };
}

function buildControlSchedule(scenario, resolution) {
  const branch = makeRow("branch", scenario.program[0], "decide PC");
  ["IF", "ID", "EX", "MEM", "WB"].forEach((stage, index) => {
    const detail = stage === "ID"
      ? "Il branch anticipato decide il prossimo PC in ID."
      : STAGES[stage].description;
    addCell(branch, index + 1, stage, { detail });
  });

  const rows = [branch];

  if (state.delaySlot) {
    const delay = makeRow("delay", scenario.program[1], "delay slot");
    ["IF", "ID", "EX", "MEM", "WB"].forEach((stage, index) => {
      addCell(delay, index + 2, stage, {
        detail: "Il delay slot esegue lavoro utile indipendente dall'esito del branch."
      });
    });
    rows.push(delay);
  } else {
    const flushed = makeRow("flushed", scenario.program[1], "fall-through");
    addCell(flushed, 2, "IF", {
      detail: "L'istruzione sequenziale entra in IF prima che il salto sia confermato."
    });
    addCell(flushed, 3, "FLUSH", {
      label: "flush",
      sub: "annulla",
      detail: STAGES.FLUSH.description,
      tone: "flush"
    });
    rows.push(flushed);
  }

  const target = makeRow("target", scenario.program[2], "target");
  ["IF", "ID", "EX", "MEM", "WB"].forEach((stage, index) => {
    addCell(target, index + 3, stage, {
      detail: stage === "IF" ? "Il target L1 entra in fetch appena il PC corretto e' selezionato." : STAGES[stage].description
    });
  });
  rows.push(target);

  return {
    rows,
    maxCycle: 7,
    link: null,
    penalty: resolution.stalls
  };
}

function buildSchedule() {
  const scenario = currentScenario();
  const resolution = currentResolution();
  return scenario.kind === "control"
    ? buildControlSchedule(scenario, resolution)
    : buildDataSchedule(scenario, resolution);
}

function findCell(schedule, key) {
  if (!key) return null;
  const [rowId, rawCycle] = key.split(":");
  const row = schedule.rows.find(item => item.id === rowId);
  return row ? row.cells[Number(rawCycle)] || null : null;
}

function firstCellAtCycle(schedule, cycle) {
  for (const row of schedule.rows) {
    if (row.cells[cycle]) return row.cells[cycle];
  }
  return null;
}

function rowForCell(schedule, cell) {
  return schedule.rows.find(row => row.id === cell.rowId);
}

function clampCycle(schedule) {
  state.selectedCycle = Math.max(0, Math.min(state.selectedCycle, schedule.maxCycle));
}

function renderModeButtons() {
  els.modeButtons.innerHTML = Object.entries(MODES).map(([mode, config]) => `
    <button class="segment-button" type="button" data-mode="${mode}" aria-pressed="${mode === state.mode}">
      ${escapeHtml(localizeText(config.label))}
    </button>
  `).join("");
}

function renderScenarioMatrix() {
  const cells = [
    ["alu-alu", "alu-branch"],
    ["load-alu", "load-branch"]
  ];

  const rows = [
    { id: "alu", label: "ALU" },
    { id: "load", label: "Load" }
  ];
  const columns = [
    { id: "alu", label: "ALU" },
    { id: "branch", label: "Branch" }
  ];

  let html = `<div class="matrix-label"></div>`;
  html += columns.map(column => `<div class="matrix-label">${escapeHtml(column.label)}</div>`).join("");

  rows.forEach((row, rowIndex) => {
    html += `<div class="matrix-label row-label">${escapeHtml(row.label)}</div>`;
    cells[rowIndex].forEach(id => {
      const scenario = SCENARIOS[id];
      html += `
        <button class="matrix-cell" type="button" data-scenario="${id}" aria-pressed="${id === state.scenarioId}">
          <strong>${escapeHtml(localizeText(scenario.title))}</strong>
          <span>FWD ${scenario.resolutions.forwarding.stalls}</span>
          <span>NO ${scenario.resolutions.noForwarding.stalls}</span>
        </button>
      `;
    });
  });

  const control = SCENARIOS["taken-branch"];
  html += `
    <button class="control-tile" type="button" data-scenario="taken-branch" aria-pressed="${state.scenarioId === "taken-branch"}">
      <strong>${escapeHtml(localizeText(control.title))}</strong>
      <span>${escapeHtml(localizeText(control.hazard))} - ${state.language === "en" ? "1 cycle, or 0 with a useful delay slot" : "1 ciclo, oppure 0 con delay slot utile"}</span>
    </button>
  `;

  els.scenarioMatrix.innerHTML = html;
}

function highlightRegister(line, registerName) {
  return escapeHtml(line).replaceAll(
    escapeHtml(registerName),
    `<span class="register-mark">${escapeHtml(registerName)}</span>`
  );
}

function renderProgram() {
  const scenario = currentScenario();
  els.programSnippet.innerHTML = scenario.program.map((line, index) => `
    <div class="program-line">
      <span>I${index + 1}</span>
      <code>${highlightRegister(line, scenario.focusRegister)}</code>
    </div>
  `).join("");
}

function renderPenaltyMeter() {
  const scenario = currentScenario();
  const fwdStalls = scenario.kind === "control" && state.delaySlot ? 0 : scenario.resolutions.forwarding.stalls;
  const noFwdStalls = scenario.kind === "control" && state.delaySlot ? 0 : scenario.resolutions.noForwarding.stalls;

  els.penaltyMeter.innerHTML = `
    <div class="penalty-tile ${state.mode === "forwarding" ? "active" : ""}">
      <span>FWD</span>
      <strong>${fwdStalls}</strong>
    </div>
    <div class="penalty-tile ${state.mode === "noForwarding" ? "active" : ""}">
      <span>NO FWD</span>
      <strong>${noFwdStalls}</strong>
    </div>
  `;
}

function stageClass(cell) {
  if (cell.tone === "stall") return "stage-stall";
  return `stage-${cell.tone || cell.stage.toLowerCase()}`;
}

function isLinkCell(cell, link, side) {
  if (!link || !link[side]) return false;
  if (cell.cycle > state.selectedCycle) return false;
  return link[side].row === cell.rowId && link[side].cycle === cell.cycle;
}

function renderPipeline(schedule) {
  const cycleHeaders = Array.from({ length: schedule.maxCycle }, (_, index) => index + 1);
  els.pipelineGrid.style.setProperty("--cycle-count", String(schedule.maxCycle));

  let html = `<div class="pipeline-corner">Istruzione</div>`;
  html += cycleHeaders.map(cycle => `
    <div class="cycle-header ${cycle === state.selectedCycle ? "current" : ""}">CC${cycle}</div>
  `).join("");

  schedule.rows.forEach(row => {
    html += `
      <div class="row-header">
        <strong>${escapeHtml(row.label)}</strong>
        <span>${escapeHtml(localizeText(row.role))}</span>
      </div>
    `;

    cycleHeaders.forEach(cycle => {
      const cell = row.cells[cycle];
      if (!cell || cycle > state.selectedCycle) {
        const future = cycle > state.selectedCycle ? " future-cell" : "";
        html += `<div class="empty-cell${future}" aria-hidden="true"></div>`;
        return;
      }

      const key = cellKey(cell.rowId, cell.cycle);
      const selected = state.selectedCell === key ? " selected" : "";
      const current = cell.cycle === state.selectedCycle ? " current" : "";
      const source = isLinkCell(cell, schedule.link, "source") ? " link-source" : "";
      const target = isLinkCell(cell, schedule.link, "target") ? " link-target" : "";

      html += `
        <button class="stage-cell ${stageClass(cell)}${selected}${current}${source}${target}" type="button" data-cell="${escapeHtml(key)}" aria-label="${escapeHtml(`${row.label} ${cell.label} clock ${cycle}`)}">
          <strong>${escapeHtml(cell.label)}</strong>
          <span>${escapeHtml(localizeText(cell.sub))}</span>
        </button>
      `;
    });
  });

  els.pipelineGrid.innerHTML = html;
}

function renderStageRail(schedule) {
  const activeByStage = {
    IF: [],
    ID: [],
    EX: [],
    MEM: [],
    WB: []
  };

  schedule.rows.forEach(row => {
    const cell = row.cells[state.selectedCycle];
    if (cell && activeByStage[cell.stage]) {
      activeByStage[cell.stage].push(row.id === "producer" ? "I1" : row.id === "consumer" ? "I2" : row.role);
    }
  });

  els.stageRail.innerHTML = ["IF", "ID", "EX", "MEM", "WB"].map(stage => {
    const tokens = activeByStage[stage];
    const tokenHtml = tokens.map(token => `<span class="rail-token">${escapeHtml(token)}</span>`).join("");
    return `
      <div class="rail-node ${tokens.length ? "active" : ""}">
        <strong>${stage}</strong>
        <span>${escapeHtml(STAGES[stage].resource)} - ${escapeHtml(STAGES[stage].name)}</span>
        <div class="rail-token-list">${tokenHtml}</div>
      </div>
    `;
  }).join("");
}

function formatStageAction(row, cell, scenario, resolution) {
  const registerName = scenario.focusRegister;
  const route = resolution.route || ["-", "-"];
  const isProducer = row.id === "producer";
  const isConsumer = row.id === "consumer";
  const isBranch = row.id === "branch";
  const isDelay = row.id === "delay";
  const isTarget = row.id === "target";
  const isFlushed = row.id === "flushed";

  if (cell.stage === "BUBBLE") {
    return "La EX resta vuota: la bolla mantiene ferma l'istruzione dipendente senza perdere il dato corretto.";
  }

  if (cell.stage === "FLUSH") {
    return "Questa istruzione era entrata lungo il cammino sequenziale, ma viene annullata perche il branch e' preso.";
  }

  if (isProducer && cell.stage === "EX" && scenario.producerType === "alu") {
    return `Produce ${registerName} alla fine della ALU. Il valore e' pronto per il forwarding, ma non e' ancora scritto nel register file.`;
  }

  if (isProducer && cell.stage === "EX" && scenario.producerType === "load") {
    return `Calcola l'indirizzo effettivo nella ALU. Il registro ${registerName} non e' ancora disponibile: il dato arrivera dalla memoria.`;
  }

  if (isProducer && cell.stage === "MEM" && scenario.producerType === "load") {
    return `Legge dalla memoria dati: ${registerName} diventa disponibile solo alla fine di MEM.`;
  }

  if (isProducer && cell.stage === "MEM" && scenario.producerType === "alu") {
    return `Non accede alla memoria dati: il risultato ALU resta nel registro di pipeline ed e' disponibile per eventuale forwarding.`;
  }

  if ((isProducer || isBranch) && cell.stage === "WB") {
    if (isBranch) {
      return "Non scrive registri: il branch sta solo completando il proprio passaggio nella pipeline.";
    }
    return `Scrive il risultato nel register file all'inizio del ciclo; da questo punto una ID ordinaria puo leggere il valore corretto.`;
  }

  if (isConsumer && cell.stage === "ID" && cell.tone !== "stall") {
    if (scenario.consumerType === "branch") {
      return `Legge il register file per confrontare ${registerName}. Il valore letto e' ancora quello vecchio, quindi l'hazard detection ferma il branch.`;
    }
    if (state.mode === "noForwarding") {
      return `Legge gli operandi dal register file, ma ${registerName} e' ancora vecchio; senza forwarding dovra attendere il WB del produttore.`;
    }
    return `Legge gli operandi dal register file. ${registerName} e' ancora vecchio qui, ma la ALU del ciclo successivo puo ricevere il dato tramite forwarding se disponibile.`;
  }

  if (isConsumer && cell.stage === "ID" && cell.tone === "stall") {
    const target = resolution.link && resolution.link.target;
    if (target && target.row === "consumer" && target.cycle === cell.cycle) {
      return `Resta in ID per lo stallo finale: il valore di ${registerName} arriva da ${route[0]} verso ${route[1]} e diventa utilizzabile.`;
    }
    return `Resta in ID: il valore di ${registerName} letto dal register file non e' ancora corretto, quindi la pipeline inserisce una bolla.`;
  }

  if (isConsumer && cell.stage === "EX") {
    const target = resolution.link && resolution.link.target;
    if (target && target.row === "consumer" && target.cycle === cell.cycle) {
      return `Esegue in ALU usando ${registerName} inoltrato da ${route[0]} verso ${route[1]}, invece del valore vecchio letto in ID.`;
    }
    return `Esegue in ALU con gli operandi ormai corretti; lo stallo precedente ha eliminato la dipendenza RAW.`;
  }

  if (isConsumer && cell.stage === "MEM" && scenario.consumerType === "alu") {
    return "Non usa la memoria dati: attraversa MEM portando avanti il risultato calcolato in EX.";
  }

  if (isBranch && cell.stage === "ID") {
    return "Il branch anticipato confronta i registri in ID e seleziona il prossimo PC; se il salto e' preso, la fetch sequenziale va annullata.";
  }

  if (isDelay) {
    return "Questa istruzione riempie il branch delay slot: avanza normalmente e il suo lavoro non viene perso.";
  }

  if (isTarget && cell.stage === "IF") {
    return "Il target del branch entra in IF appena il PC corretto viene selezionato.";
  }

  if (isFlushed && cell.stage === "IF") {
    return "La fetch sequenziale e' gia partita, ma verra annullata se il branch viene confermato preso.";
  }

  return cell.detail || STAGES[cell.stage].description;
}

function statusForRow(row, schedule, scenario, resolution) {
  const bounds = rowBounds(row);
  const cell = row.cells[state.selectedCycle];
  const tag = rowInstructionTag(row);

  if (cell) {
    const kind = cell.stage === "BUBBLE" || cell.stage === "FLUSH"
      ? "hazard"
      : cell.tone === "stall"
        ? "hazard"
        : "active";
    return {
      kind,
      tag,
      label: row.label,
      role: row.role,
      stage: cell.label,
      sub: cell.sub,
      text: formatStageAction(row, cell, scenario, resolution)
    };
  }

  if (state.selectedCycle === 0 || state.selectedCycle < bounds.first) {
    return {
      kind: "waiting",
      tag,
      label: row.label,
      role: row.role,
      stage: "-",
      sub: t("wait"),
      text: "Non e' ancora entrata nella pipeline."
    };
  }

  if (state.selectedCycle > bounds.last) {
    return {
      kind: "done",
      tag,
      label: row.label,
      role: row.role,
      stage: "-",
      sub: t("done"),
      text: "Ha gia completato il proprio cammino nella pipeline."
    };
  }

  return {
    kind: "waiting",
    tag,
    label: row.label,
    role: row.role,
    stage: "-",
    sub: t("stopped"),
    text: "Non occupa uno stadio in questo ciclo."
  };
}

function cycleSummary(schedule, scenario, resolution) {
  if (state.selectedCycle === 0) {
    return quizText(
      "La pipeline e' vuota: premi avanti per inserire la prima IF e costruire il diagramma ciclo per ciclo.",
      "The pipeline is empty: press next to insert the first IF and build the diagram cycle by cycle."
    );
  }

  if (scenario.kind === "control") {
    if (state.selectedCycle === 2) {
      return quizText(
        "Il branch decide il PC mentre la fetch sequenziale e' gia partita.",
        "The branch decides the PC while sequential fetch has already started."
      );
    }
    if (state.selectedCycle === 3 && !state.delaySlot) {
      return quizText(
        "Il salto preso annulla la fall-through e lascia entrare il target corretto.",
        "The taken branch cancels the fall-through and lets the correct target enter."
      );
    }
    if (state.selectedCycle === 3 && state.delaySlot) {
      return quizText(
        "Il delay slot avanza come istruzione utile mentre il target entra in fetch.",
        "The delay slot advances as useful work while the target enters fetch."
      );
    }
    return quizText(
      "Le istruzioni scorrono negli stadi visibili per questo ciclo.",
      "The instructions flow through the visible stages for this cycle."
    );
  }

  const source = resolution.link && resolution.link.source;
  const target = resolution.link && resolution.link.target;
  if (source && source.cycle === state.selectedCycle) {
    const sourceCell = findCell(schedule, cellKey(source.row, source.cycle));
    if (sourceCell && sourceCell.stage === "WB") {
      return quizText(
        `Il produttore scrive ${scenario.focusRegister} nel register file: la dipendenza RAW puo finalmente essere risolta senza forwarding.`,
        `The producer writes ${scenario.focusRegister} into the register file: the RAW dependency can finally be resolved without forwarding.`
      );
    }
    return quizText(
      `Il produttore crea il valore necessario a ${scenario.focusRegister}; la dipendenza RAW e' ora visibile.`,
      `The producer creates the value needed for ${scenario.focusRegister}; the RAW dependency is now visible.`
    );
  }
  if (target && target.cycle === state.selectedCycle) {
    return quizText(
      `Il valore corretto di ${scenario.focusRegister} arriva tramite ${resolution.route.join(" -> ")}.`,
      `The correct value of ${scenario.focusRegister} arrives through ${resolution.route.join(" -> ")}.`
    );
  }
  if (state.selectedCycle === 3) {
    return quizText(
      `La seconda istruzione legge ${scenario.focusRegister} dal register file, ma legge ancora il vecchio valore.`,
      `The second instruction reads ${scenario.focusRegister} from the register file, but still sees the old value.`
    );
  }
  return quizText(
    "Le istruzioni avanzano di uno stadio rispetto al ciclo precedente.",
    "Instructions advance by one stage from the previous cycle."
  );
}

function quizKey() {
  return `${state.language}:${state.scenarioId}:${state.mode}:${state.delaySlot ? "delay" : "flush"}:${state.selectedCycle}`;
}

function shuffleQuizValues(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function uniqueQuizValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function routeLabel(resolution) {
  return (resolution.route || ["-", "-"]).join(" -> ");
}

function selectedCycleHasStall(schedule) {
  return schedule.rows.some((row) => {
    const cell = row.cells[state.selectedCycle];
    return cell && (cell.stage === "BUBBLE" || cell.tone === "stall");
  });
}

function selectedCycleHasStage(schedule, stage) {
  return schedule.rows.some((row) => row.cells[state.selectedCycle]?.stage === stage);
}

function fallbackQuizPool(scenario) {
  if (state.selectedCycle === 0) {
    return [
      quizText(
        `La prima istruzione di ${scenario.title} e gia in ID e la seconda e in IF.`,
        `The first ${scenario.title} instruction is already in ID and the second is in IF.`
      ),
      quizText(
        `Il ciclo mostra gia la prima decisione sulla dipendenza di ${scenario.focusRegister}.`,
        `This cycle already shows the first decision about the ${scenario.focusRegister} dependency.`
      ),
      quizText(
        "Una bolla iniziale e stata inserita prima che la prima IF entri nella pipeline.",
        "An initial bubble has been inserted before the first IF enters the pipeline."
      )
    ];
  }

  return [
    quizText(
      `Le istruzioni del caso ${scenario.title} restano ferme, ma non viene mostrata nessuna bolla.`,
      `The instructions in the ${scenario.title} case stay still, but no bubble is shown.`
    ),
    quizText(
      `Il ciclo conclude il caso ${scenario.title} senza usare il registro ${scenario.focusRegister}.`,
      `This cycle completes the ${scenario.title} case without using register ${scenario.focusRegister}.`
    ),
    quizText(
      `La pipeline ignora la relazione tra produttore e consumatore per ${scenario.focusRegister}.`,
      `The pipeline ignores the relationship between producer and consumer for ${scenario.focusRegister}.`
    )
  ];
}

function controlQuizPool(schedule, scenario) {
  const cycle = state.selectedCycle;

  if (cycle === 1) {
    return [
      quizText(
        "Il branch ha gia deciso il prossimo PC in ID mentre il target entra in fetch.",
        "The branch has already decided the next PC in ID while the target enters fetch."
      ),
      quizText(
        "La fall-through viene annullata prima ancora di entrare nella pipeline.",
        "The fall-through is canceled before it even enters the pipeline."
      ),
      quizText(
        "Il target L1 e gia in IF insieme al branch.",
        "Target L1 is already in IF together with the branch."
      ),
      quizText(
        "Il PC aspetta il completamento del branch in WB prima di prelevare la prima istruzione.",
        "The PC waits for the branch to complete WB before fetching the first instruction."
      )
    ];
  }

  if (cycle === 2) {
    return [
      quizText(
        "Il branch resta in IF e il PC non puo ancora essere scelto.",
        "The branch remains in IF and the PC cannot be selected yet."
      ),
      quizText(
        "La fall-through e gia stata annullata prima della decisione del branch in ID.",
        "The fall-through has already been canceled before the branch decision in ID."
      ),
      quizText(
        "Il target entra in IF senza attendere la selezione del PC.",
        "The target enters IF without waiting for PC selection."
      ),
      quizText(
        "Il branch decide il PC solo quando raggiunge WB.",
        "The branch decides the PC only when it reaches WB."
      ),
      state.delaySlot
        ? quizText(
          "Il delay slot viene bloccato in ID invece di avanzare come lavoro utile.",
          "The delay slot is blocked in ID instead of advancing as useful work."
        )
        : quizText(
          "La fall-through diventa gia target corretto prima del ciclo di flush.",
          "The fall-through already becomes the correct target before the flush cycle."
        )
    ];
  }

  if (cycle === 3 && !state.delaySlot) {
    return [
      quizText(
        "La fall-through continua in ID come istruzione valida.",
        "The fall-through continues in ID as a valid instruction."
      ),
      quizText(
        "Il target resta fuori dalla pipeline mentre il branch arriva a EX.",
        "The target stays outside the pipeline while the branch reaches EX."
      ),
      quizText(
        "PCSrc torna sequenziale e il flush non viene applicato.",
        "PCSrc returns to sequential mode and the flush is not applied."
      ),
      quizText(
        "Il branch decide il PC solo in EX, quindi IF non puo essere annullata in questo ciclo.",
        "The branch decides the PC only in EX, so IF cannot be canceled in this cycle."
      ),
      quizText(
        "La fall-through viene trasformata nel target invece di essere annullata.",
        "The fall-through is transformed into the target instead of being canceled."
      )
    ];
  }

  if (cycle === 3 && state.delaySlot) {
    return [
      quizText(
        "Il delay slot viene flushato come se fosse una fall-through sbagliata.",
        "The delay slot is flushed as if it were a wrong fall-through."
      ),
      quizText(
        "Il target resta bloccato finche il delay slot arriva in WB.",
        "The target remains blocked until the delay slot reaches WB."
      ),
      quizText(
        "La seconda istruzione e una bolla di controllo, non lavoro utile.",
        "The second instruction is a control bubble, not useful work."
      ),
      quizText(
        "Il branch mantiene il PC sequenziale e non permette al target di entrare.",
        "The branch keeps the PC sequential and does not let the target enter."
      ),
      quizText(
        "Il delay slot decide il PC al posto del branch.",
        "The delay slot decides the PC instead of the branch."
      )
    ];
  }

  return [
    state.delaySlot
      ? quizText(
        "Il delay slot viene annullato dopo aver avanzato nello stadio visibile.",
        "The delay slot is canceled after advancing through the visible stage."
      )
      : quizText(
        "La fall-through annullata torna valida nel ciclo corrente.",
        "The canceled fall-through becomes valid again in the current cycle."
      ),
    quizText(
      "Il target non puo avanzare finche il branch completa WB.",
      "The target cannot advance until the branch completes WB."
    ),
    quizText(
      "Il branch continua a riselezionare il PC in ogni stadio dopo ID.",
      "The branch keeps reselecting the PC in every stage after ID."
    ),
    quizText(
      "La pipeline inserisce una nuova penalita di controllo in ogni ciclo successivo.",
      "The pipeline inserts a new control penalty in every following cycle."
    ),
    selectedCycleHasStage(schedule, "FLUSH")
      ? quizText(
        "Il flush lascia comunque avanzare la fall-through come istruzione valida.",
        "The flush still lets the fall-through advance as a valid instruction."
      )
      : quizText(
        "Il target viene fermato anche se il PC corretto e gia stato selezionato.",
        "The target is stopped even though the correct PC has already been selected."
      )
  ];
}

function dataQuizPool(schedule, scenario, resolution) {
  const cycle = state.selectedCycle;
  const source = resolution.link && resolution.link.source;
  const target = resolution.link && resolution.link.target;
  const registerName = scenario.focusRegister;
  const route = routeLabel(resolution);
  const isBranchConsumer = scenario.consumerType === "branch";
  const consumerUnitIt = isBranchConsumer ? "comparatore in ID" : "ALU del consumatore";
  const consumerUnitEn = isBranchConsumer ? "ID comparator" : "consumer ALU";

  if (cycle === 1 || cycle === 2) {
    return [
      quizText(
        `La dipendenza su ${registerName} e gia stata risolta prima che il consumatore legga il register file.`,
        `The dependency on ${registerName} has already been resolved before the consumer reads the register file.`
      ),
      quizText(
        `Il produttore scrive ${registerName} nel register file prima di entrare in EX.`,
        `The producer writes ${registerName} into the register file before entering EX.`
      ),
      quizText(
        `Il consumatore usa gia ${registerName} nello stadio EX senza passare da ID.`,
        `The consumer already uses ${registerName} in EX without going through ID.`
      ),
      quizText(
        "L'interlock inserisce una bolla prima che il consumatore raggiunga ID.",
        "The interlock inserts a bubble before the consumer reaches ID."
      )
    ];
  }

  if (source && source.cycle === cycle) {
    const sourceCell = findCell(schedule, cellKey(source.row, source.cycle));
    if (sourceCell && sourceCell.stage === "WB") {
      return [
        quizText(
          `Il produttore crea per la prima volta ${registerName} in EX invece di scriverlo in WB.`,
          `The producer creates ${registerName} for the first time in EX instead of writing it in WB.`
        ),
        quizText(
          `Il register file resta vecchio per tutto il clock, quindi lo stallo continua invariato.`,
          `The register file stays stale for the whole clock, so the stall continues unchanged.`
        ),
        quizText(
          `${consumerUnitIt} usa ${registerName} prima che la lettura ID possa vederlo.`,
          `The ${consumerUnitEn} uses ${registerName} before the ID read can see it.`
        ),
        quizText(
          `La scrittura di ${registerName} viene rinviata al ciclo successivo, mantenendo la dipendenza RAW aperta.`,
          `The write of ${registerName} is delayed to the next cycle, keeping the RAW dependency open.`
        ),
        quizText(
          `Il consumatore torna in IF per rileggere l'istruzione dopo il WB del produttore.`,
          `The consumer goes back to IF to refetch the instruction after the producer WB.`
        )
      ];
    }

    return [
      scenario.producerType === "load"
        ? quizText(
          `La load produce ${registerName} in EX insieme all'indirizzo effettivo.`,
          `The load produces ${registerName} in EX together with the effective address.`
        )
        : quizText(
          `Il risultato ALU viene scritto subito nel register file nello stesso EX.`,
          `The ALU result is written into the register file immediately in the same EX.`
        ),
      quizText(
        `La seconda istruzione puo gia usare ${registerName} dal register file senza attendere ${route}.`,
        `The second instruction can already use ${registerName} from the register file without waiting for ${route}.`
      ),
      quizText(
        `L'interlock conclude che non esiste una dipendenza RAW su ${registerName}.`,
        `The interlock concludes that there is no RAW dependency on ${registerName}.`
      ),
      quizText(
        `Il produttore attraversa questo stadio senza rendere visibile ${registerName}.`,
        `The producer passes through this stage without making ${registerName} visible.`
      ),
      quizText(
        `${consumerUnitIt} riceve ${registerName} corretto gia in questo clock senza usare il cammino ${route}.`,
        `The ${consumerUnitEn} already receives the correct ${registerName} in this clock without using the ${route} path.`
      )
    ];
  }

  if (target && target.cycle === cycle) {
    return [
      state.mode === "forwarding"
        ? quizText(
          `Il consumatore continua a leggere il vecchio ${registerName} dal register file, ignorando ${route}.`,
          `The consumer keeps reading the old ${registerName} from the register file, ignoring ${route}.`
        )
        : quizText(
          `Il consumatore passa oltre ID prima che il register file esponga ${registerName}.`,
          `The consumer moves past ID before the register file exposes ${registerName}.`
        ),
      quizText(
        `L'interlock aggiunge un nuovo stallo proprio mentre ${registerName} e disponibile su ${route}.`,
        `The interlock adds a new stall exactly when ${registerName} is available on ${route}.`
      ),
      isBranchConsumer
        ? quizText(
          `Il comparatore ID decide usando il vecchio ${registerName}, anche se ${route} e pronto.`,
          `The ID comparator decides using the old ${registerName}, even though ${route} is ready.`
        )
        : quizText(
          `La ALU del consumatore parte senza ricevere ${registerName} dal cammino ${route}.`,
          `The consumer ALU starts without receiving ${registerName} from the ${route} path.`
        ),
      quizText(
        `Il produttore cancella ${registerName} dal registro di pipeline prima che il consumatore lo usi.`,
        `The producer clears ${registerName} from the pipeline register before the consumer uses it.`
      ),
      quizText(
        `La dipendenza viene risolta leggendo di nuovo l'istruzione del produttore in IF.`,
        `The dependency is resolved by fetching the producer instruction again in IF.`
      )
    ];
  }

  if (cycle === 3) {
    return [
      quizText(
        `Il consumatore riceve gia ${registerName} corretto dal cammino ${route}.`,
        `The consumer already receives the correct ${registerName} through ${route}.`
      ),
      quizText(
        `Il produttore ha gia scritto ${registerName} nel register file.`,
        `The producer has already written ${registerName} into the register file.`
      ),
      quizText(
        `La hazard detection considera indipendenti le due istruzioni su ${registerName}.`,
        `Hazard detection treats the two instructions on ${registerName} as independent.`
      ),
      isBranchConsumer
        ? quizText(
          `Il branch confronta ${registerName} corretto e non deve fermarsi.`,
          `The branch compares the correct ${registerName} and does not need to stop.`
        )
        : quizText(
          `La seconda ALU usa subito ${registerName} corretto nello stadio EX.`,
          `The second ALU immediately uses the correct ${registerName} in EX.`
        ),
      quizText(
        `La lettura ID aggiorna automaticamente ${registerName} senza aspettare il produttore.`,
        `The ID read automatically updates ${registerName} without waiting for the producer.`
      )
    ];
  }

  if (selectedCycleHasStall(schedule)) {
    return [
      quizText(
        `Lo stallo e finito: il consumatore passa oltre ID in questo stesso clock.`,
        `The stall is over: the consumer moves past ID in this same clock.`
      ),
      quizText(
        `La bolla cancella il produttore e perde il valore di ${registerName}.`,
        `The bubble cancels the producer and loses the value of ${registerName}.`
      ),
      quizText(
        `Il consumatore prosegue usando il vecchio ${registerName}, perche lo stallo non blocca ID.`,
        `The consumer continues using the old ${registerName}, because the stall does not hold ID.`
      ),
      quizText(
        `L'interlock blocca la prima istruzione invece della dipendente.`,
        `The interlock blocks the first instruction instead of the dependent one.`
      ),
      quizText(
        `La bolla occupa WB, quindi il producer non puo mai scrivere ${registerName}.`,
        `The bubble occupies WB, so the producer can never write ${registerName}.`
      )
    ];
  }

  return [
    quizText(
      `La pipeline inserisce una bolla anche se nessuna istruzione e ferma in ID.`,
      `The pipeline inserts a bubble even though no instruction is held in ID.`
    ),
    quizText(
      `${registerName} viene risolto da un nuovo stallo in questo ciclo.`,
      `${registerName} is resolved by a new stall in this cycle.`
    ),
    quizText(
      `Il consumatore torna indietro a ID per rileggere ${registerName}.`,
      `The consumer moves back to ID to reread ${registerName}.`
    ),
    quizText(
      `Il produttore e il consumatore scambiano i propri stadi per evitare la dipendenza RAW.`,
      `The producer and consumer swap stages to avoid the RAW dependency.`
    ),
    quizText(
      `Il cammino ${route} viene usato in ogni ciclo, anche quando il consumatore non sta leggendo ${registerName}.`,
      `The ${route} path is used on every cycle, even when the consumer is not reading ${registerName}.`
    )
  ];
}

function quizChoices(schedule, scenario, resolution) {
  const key = quizKey();
  if (state.quizChoiceCache.has(key)) {
    return state.quizChoiceCache.get(key);
  }

  const correct = localizeText(cycleSummary(schedule, scenario, resolution));
  const pool = scenario.kind === "control"
    ? controlQuizPool(schedule, scenario, resolution)
    : dataQuizPool(schedule, scenario, resolution);
  const candidates = uniqueQuizValues(pool)
    .filter(item => item !== correct);
  const distractors = shuffleQuizValues(candidates).slice(0, 3);
  if (distractors.length < 3) {
    const fallback = uniqueQuizValues(fallbackQuizPool(scenario))
      .filter(item => item !== correct && !distractors.includes(item));
    distractors.push(...shuffleQuizValues(fallback).slice(0, 3 - distractors.length));
  }
  const choices = shuffleQuizValues([correct, ...distractors]);
  state.quizChoiceCache.set(key, choices);
  return choices;
}

function renderQuizInspector(schedule, scenario, resolution) {
  const correct = localizeText(cycleSummary(schedule, scenario, resolution));
  const choices = quizChoices(schedule, scenario, resolution);
  const selected = state.quizAnswers.get(quizKey());
  const answered = selected !== undefined;
  const choiceHtml = choices.map((choice, index) => {
    const isCorrect = choice === correct;
    const isSelected = selected === index;
    const className = answered && isCorrect ? " correct" : answered && isSelected ? " wrong" : "";
    return `<button class="quiz-choice${className}" type="button" data-quiz-choice="${index}"${answered ? " disabled" : ""}>${escapeHtml(choice)}</button>`;
  }).join("");

  els.inspector.innerHTML = `
    <section class="focus-box quiz-box">
      <h3>${state.selectedCycle === 0 ? escapeHtml(t("emptyPipeline")) : `${escapeHtml(t("clock"))} ${state.selectedCycle}`}</h3>
      <p class="quiz-alert">${escapeHtml(t("quizIntro"))}</p>
      <p class="quiz-question">${escapeHtml(t("quizQuestion"))}</p>
      ${choiceHtml}
      ${answered ? `<p class="quiz-result"><strong>${choices[selected] === correct ? escapeHtml(t("correct")) : escapeHtml(t("wrong"))}</strong> ${escapeHtml(t("correctAnswer"))}: ${escapeHtml(correct)}</p>` : ""}
    </section>
  `;
}

function renderInspector(schedule) {
  const scenario = currentScenario();
  const resolution = currentResolution();
  if (state.quizMode) {
    renderQuizInspector(schedule, scenario, resolution);
    return;
  }
  const route = resolution.route || ["-", "-"];
  const statuses = schedule.rows
    .filter(row => row.id !== "bubble" || row.cells[state.selectedCycle])
    .map(row => statusForRow(row, schedule, scenario, resolution));

  const statusHtml = statuses.map(status => `
    <article class="status-card ${status.kind}">
      <div class="status-head">
        <span class="status-tag">${escapeHtml(status.tag)}</span>
        <span class="stage-chip">${escapeHtml(status.stage)}${status.sub && status.sub !== "-" ? ` / ${escapeHtml(localizeText(status.sub))}` : ""}</span>
      </div>
      <h3>${escapeHtml(localizeText(status.label))}</h3>
      <p>${escapeHtml(localizeText(status.text))}</p>
    </article>
  `).join("");

  els.inspector.innerHTML = `
    <section class="focus-box">
      <h3>${state.selectedCycle === 0 ? escapeHtml(t("emptyPipeline")) : `${escapeHtml(t("clock"))} ${state.selectedCycle}`}</h3>
      <p>${escapeHtml(localizeText(cycleSummary(schedule, scenario, resolution)))}</p>
    </section>
    <div class="status-list">${statusHtml}</div>
    <section class="route-box">
      <span>${escapeHtml(t("dataPath"))}</span>
      <div class="route-line">
        <div class="route-pill">${escapeHtml(route[0])}</div>
        <div class="route-arrow">-&gt;</div>
        <div class="route-pill">${escapeHtml(route[1])}</div>
      </div>
      <p>${escapeHtml(localizeText(resolution.note))}</p>
    </section>
    <section class="note-box">
      <span>${escapeHtml(t("keyIdea"))}</span>
      <p>${escapeHtml(localizeText(scenario.summary))}</p>
    </section>
  `;
}

function updateButtons(schedule) {
  els.cycleLabel.textContent = String(state.selectedCycle);
  els.prevCycle.disabled = state.selectedCycle <= 0;
  els.nextCycle.disabled = state.selectedCycle >= schedule.maxCycle;
  els.delayToggleWrap.classList.toggle("hidden", currentScenario().kind !== "control");
  els.delaySlotToggle.checked = state.delaySlot;

  const playLabel = state.playing
    ? state.language === "en" ? "Stop animation" : "Ferma animazione"
    : state.language === "en" ? "Start animation" : "Avvia animazione";
  els.playCycle.setAttribute("aria-label", playLabel);
  els.playCycle.setAttribute("title", playLabel);
  els.playIcon.innerHTML = state.playing
    ? `<path d="M7 5h4v14H7z"></path><path d="M13 5h4v14h-4z"></path>`
    : `<path d="M8 5v14l11-7z"></path>`;
}

function render() {
  const schedule = buildSchedule();
  clampCycle(schedule);
  if (state.selectedCell && !findCell(schedule, state.selectedCell)) {
    state.selectedCell = null;
  }

  const scenario = currentScenario();
  els.hazardType.textContent = localizeText(scenario.hazard);
  els.timelineTitle.textContent = localizeText(scenario.title);

  renderModeButtons();
  renderScenarioMatrix();
  renderProgram();
  renderPenaltyMeter();
  renderPipeline(schedule);
  renderStageRail(schedule);
  renderInspector(schedule);
  updateButtons(schedule);
}

function setScenario(id) {
  if (!SCENARIOS[id]) return;
  stopPlayback();
  state.scenarioId = id;
  state.selectedCycle = 0;
  state.selectedCell = null;
  render();
}

function setMode(mode) {
  if (!MODES[mode]) return;
  stopPlayback();
  state.mode = mode;
  state.selectedCycle = 0;
  state.selectedCell = null;
  render();
}

function stepCycle(delta) {
  const schedule = buildSchedule();
  state.selectedCycle = Math.max(0, Math.min(schedule.maxCycle, state.selectedCycle + delta));
  state.selectedCell = null;
  render();
}

function stopPlayback() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
  state.playing = false;
}

function togglePlayback() {
  if (state.playing) {
    stopPlayback();
    render();
    return;
  }

  state.playing = true;
  if (state.selectedCycle >= buildSchedule().maxCycle) {
    state.selectedCycle = 0;
  }
  state.timer = setInterval(() => {
    const schedule = buildSchedule();
    if (state.selectedCycle >= schedule.maxCycle) {
      stopPlayback();
      render();
      return;
    }
    stepCycle(1);
  }, 900);
  render();
}

function tutorialTopic() {
  return {
    title: t("tutorial"),
    paragraphs: [t("tutorialIntro")],
    steps: [
      { visual: "case", title: t("tutorialStep1Title"), body: t("tutorialStep1Body") },
      { visual: "resolution", title: t("tutorialStep2Title"), body: t("tutorialStep2Body") },
      { visual: "cycle", title: t("tutorialStep3Title"), body: t("tutorialStep3Body") },
      { visual: "quiz", title: t("tutorialStep4Title"), body: t("tutorialStep4Body") }
    ]
  };
}

function tutorialVisual(type) {
  if (type === "case") {
    return `
      <div class="shot-bar"><span>ALU -> ALU</span><span>RAW</span></div>
      <div class="shot-grid">
        <b>${escapeHtml(t("instruction"))}</b><b>1</b><b>2</b><b>3</b><b>4</b><b>5</b>
        <span>I1</span><span>IF</span><span>ID</span><span>EX</span><span>MEM</span><span>WB</span>
        <span>I2</span><span></span><span>IF</span><span>ID</span><span>EX</span><span>MEM</span>
      </div>
    `;
  }

  if (type === "resolution") {
    return `
      <div class="shot-bar"><span>${escapeHtml(localizeText("Con forwarding"))}</span><span>FWD 1</span></div>
      <div class="shot-card">MEM/WB -&gt; ALU input</div>
      <div class="shot-bar"><span>${escapeHtml(localizeText("Senza forwarding"))}</span><span>NO FWD 2</span></div>
    `;
  }

  if (type === "cycle") {
    return `
      <div class="shot-bar"><span>${escapeHtml(t("clock"))} 4</span><span>Load -> ALU</span></div>
      <div class="shot-grid">
        <b>${escapeHtml(t("instruction"))}</b><b>2</b><b>3</b><b>4</b><b>5</b><b>6</b>
        <span>I1</span><span>ID</span><span>EX</span><span>MEM</span><span>WB</span><span></span>
        <span>I2</span><span>IF</span><span>ID</span><span class="stall">ID</span><span>EX</span><span>MEM</span>
      </div>
    `;
  }

  return `
    <div class="shot-bar"><span>${escapeHtml(t("quizMode"))}</span><span>${escapeHtml(t("clock"))} 3</span></div>
    <div class="shot-choice">${escapeHtml(localizeText("Il branch decide il PC mentre la fetch sequenziale e' gia partita."))}</div>
    <div class="shot-choice good">${escapeHtml(localizeText("La seconda istruzione legge R1 dal register file, ma legge ancora il vecchio valore."))}</div>
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

els.modeButtons.addEventListener("click", event => {
  const button = event.target.closest("[data-mode]");
  if (button) setMode(button.dataset.mode);
});

els.scenarioMatrix.addEventListener("click", event => {
  const button = event.target.closest("[data-scenario]");
  if (button) setScenario(button.dataset.scenario);
});

els.pipelineGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-cell]");
  if (!button) return;
  stopPlayback();
  state.selectedCell = button.dataset.cell;
  state.selectedCycle = Number(state.selectedCell.split(":")[1]);
  render();
});

els.inspector.addEventListener("click", event => {
  const button = event.target.closest("[data-quiz-choice]");
  if (!button) return;
  state.quizAnswers.set(quizKey(), Number(button.dataset.quizChoice));
  render();
});

els.prevCycle.addEventListener("click", () => {
  stopPlayback();
  stepCycle(-1);
});

els.nextCycle.addEventListener("click", () => {
  stopPlayback();
  stepCycle(1);
});

els.playCycle.addEventListener("click", togglePlayback);

els.resetCycle.addEventListener("click", () => {
  stopPlayback();
  state.selectedCycle = 0;
  state.selectedCell = null;
  render();
});

els.delaySlotToggle.addEventListener("change", () => {
  stopPlayback();
  state.delaySlot = els.delaySlotToggle.checked;
  state.selectedCell = null;
  state.selectedCycle = 0;
  render();
});

els.languageSelect.addEventListener("change", () => setLanguage(els.languageSelect.value));
document.addEventListener("click", event => {
  const tutorialTrigger = event.target.closest("#tutorialButton");
  if (tutorialTrigger) {
    event.preventDefault();
    openTutorial(tutorialTrigger);
    return;
  }

  const quizTrigger = event.target.closest("#quizModeBtn");
  if (quizTrigger) {
    event.preventDefault();
    state.quizMode = !state.quizMode;
    els.quizModeBtn.setAttribute("aria-pressed", state.quizMode ? "true" : "false");
    render();
  }
});
els.infoModal.querySelectorAll("[data-modal-close]").forEach(button => {
  button.addEventListener("click", closeInfo);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !els.infoModal.classList.contains("hidden")) {
    closeInfo();
  }
});

applyTranslations();
render();

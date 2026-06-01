"use strict";

const variables = ["A", "B", "C", "D"];
const groupColors = ["#2f6f55", "#b87522", "#4767a5", "#9a4d8a", "#8d6b1f", "#3f7d88"];
const languageKey = "karnaugh-tables-language";

const translations = {
  it: {
    appTitle: "Tabelle di Karnaugh",
    logicMinimization: "Minimizzazione logica",
    language: "Lingua",
    tutorial: "Tutorial",
    close: "Chiudi",
    exercise: "Esercizio",
    randomTable: "Tabella casuale",
    variables: "Variabili",
    difficulty: "Difficolta",
    easy: "Facile",
    medium: "Media",
    hard: "Difficile",
    newTable: "Nuova tabella",
    task: "Compito",
    addGroup: "Aggiungi gruppo",
    clearSelection: "Pulisci selezione",
    checkGroups: "Controlla gruppi",
    kmap: "K-map",
    generatedTable: "Tabella generata",
    grouping: "Raggruppamento",
    yourGroups: "I tuoi gruppi",
    clearGroups: "Pulisci gruppi",
    result: "Risultato",
    coverageCheck: "Controllo copertura",
    revealExample: "Mostra esempio",
    rowsColumns: ({ rows, columns }) => `${rows || "-"} righe, ${columns || "-"} colonne`,
    problem: ({ names, ones, dcs }) => {
      const oneText = ones === 1 ? "cella con uscita 1" : "celle con uscita 1";
      const dcText = dcs === 0 ? "" : ` ${dcs} ${dcs === 1 ? "don't-care puo essere incluso" : "don't-care possono essere inclusi"} quando serve.`;
      return `F(${names}) contiene ${ones} ${oneText}.${dcText}`;
    },
    readyMessage: "Tabella casuale pronta. Seleziona un gruppo valido di celle a 1, poi aggiungilo.",
    groupsCleared: "Gruppi rimossi.",
    noGroupsYet: "Nessun gruppo.",
    groupName: ({ index }) => `Gruppo ${index}`,
    covers: ({ cells }) => `copre ${cells}`,
    remove: "Rimuovi",
    solutionShown: "Un raggruppamento di esempio e mostrato sulla tabella.",
    revealHint: "Mostra soluzione visualizza un possibile raggruppamento.",
    coveredCells: "Celle a 1 coperte",
    groupsAdded: "Gruppi aggiunti",
    duplicateGroup: "Questo gruppo e gia nella copertura.",
    groupAdded: "Gruppo aggiunto.",
    needGroup: "Aggiungi almeno un gruppo valido prima di controllare.",
    uncovered: ({ cells }) => `I gruppi sono validi finora, ma ${cells} devono ancora essere coperti.`,
    allCovered: "Ottimo. Ogni cella a 1 e coperta da gruppi validi.",
    selectOne: "Seleziona almeno una cella per il gruppo.",
    groupPower: "Un gruppo di Karnaugh deve contenere 1, 2, 4, 8 o 16 celle.",
    rectangular: "Le celle selezionate devono formare un rettangolo della K-map, inclusi i raggruppamenti con wraparound.",
    zeroCells: ({ cells }) => `Un gruppo non puo includere celle con uscita 0 (${cells}).`,
    needsOne: "Un gruppo deve coprire almeno un mintermine con uscita 1.",
    tutorialIntro: "Usa questi passaggi per esercitarti a coprire una funzione con gruppi validi sulla mappa.",
    tutorialStep1Title: "1. Genera la mappa",
    tutorialStep1Body: "Scegli il numero di variabili e la difficolta, poi crea una nuova tabella casuale.",
    tutorialStep2Title: "2. Seleziona un gruppo",
    tutorialStep2Body: "Clicca celle con valore 1 o X che formano un rettangolo di dimensione potenza di due, anche attraversando i bordi.",
    tutorialStep3Title: "3. Controlla la copertura",
    tutorialStep3Body: "Aggiungi il gruppo, ripeti finche tutte le celle a 1 sono coperte e poi controlla il risultato.",
    tutorialStep4Title: "4. Confronta un esempio",
    tutorialStep4Body: "Mostra esempio disegna una possibile copertura minima quando vuoi verificare la tua soluzione."
  },
  en: {
    appTitle: "Karnaugh Tables",
    logicMinimization: "Logic minimization",
    language: "Language",
    tutorial: "Tutorial",
    close: "Close",
    exercise: "Exercise",
    randomTable: "Random table",
    variables: "Variables",
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    newTable: "New table",
    task: "Task",
    addGroup: "Add group",
    clearSelection: "Clear selection",
    checkGroups: "Check groups",
    kmap: "K-map",
    generatedTable: "Generated table",
    grouping: "Grouping",
    yourGroups: "Your groups",
    clearGroups: "Clear groups",
    result: "Result",
    coverageCheck: "Coverage check",
    revealExample: "Reveal example",
    rowsColumns: ({ rows, columns }) => `${rows || "-"} rows, ${columns || "-"} columns`,
    problem: ({ names, ones, dcs }) => {
      const oneText = ones === 1 ? "output-1 cell" : "output-1 cells";
      const dcText = dcs === 0 ? "" : ` ${dcs} don't-care cell${dcs === 1 ? "" : "s"} may be included when helpful.`;
      return `F(${names}) has ${ones} ${oneText}.${dcText}`;
    },
    readyMessage: "A random table is ready. Select a legal group of 1 cells, then add it.",
    groupsCleared: "Groups cleared.",
    noGroupsYet: "No groups yet.",
    groupName: ({ index }) => `Group ${index}`,
    covers: ({ cells }) => `covers ${cells}`,
    remove: "Remove",
    solutionShown: "An example grouping is shown on the table.",
    revealHint: "Reveal shows one possible grouping.",
    coveredCells: "Covered 1-cells",
    groupsAdded: "Groups added",
    duplicateGroup: "That group is already in your cover.",
    groupAdded: "Group added.",
    needGroup: "Add at least one legal group before checking your work.",
    uncovered: ({ cells }) => `The groups are legal so far, but ${cells} still need coverage.`,
    allCovered: "Nice. Every 1-cell is covered by legal groups.",
    selectOne: "Select at least one cell for the group.",
    groupPower: "A Karnaugh group must contain 1, 2, 4, 8, or 16 cells.",
    rectangular: "Selected cells must form one rectangular K-map group, including wraparound rectangles.",
    zeroCells: ({ cells }) => `A group cannot include output-0 cells (${cells}).`,
    needsOne: "A group must cover at least one minterm with output 1.",
    tutorialIntro: "Use these steps to practice covering a function with legal groups on the map.",
    tutorialStep1Title: "1. Generate the map",
    tutorialStep1Body: "Choose the number of variables and the difficulty, then create a new random table.",
    tutorialStep2Title: "2. Select a group",
    tutorialStep2Body: "Click 1 or X cells that form a power-of-two rectangle, including groups that wrap across the edges.",
    tutorialStep3Title: "3. Check the cover",
    tutorialStep3Body: "Add the group, repeat until every 1-cell is covered, then check your result.",
    tutorialStep4Title: "4. Compare an example",
    tutorialStep4Body: "Reveal example draws one possible minimum cover when you want to verify your solution."
  }
};

const state = {
  language: getInitialLanguage(),
  bits: 4,
  difficulty: "medium",
  values: [],
  selected: new Set(),
  groups: [],
  revealed: false,
  solution: null
};

const els = {
  variableCount: document.getElementById("variableCount"),
  difficulty: document.getElementById("difficulty"),
  newExercise: document.getElementById("newExercise"),
  revealSolution: document.getElementById("revealSolution"),
  problemText: document.getElementById("problemText"),
  addGroup: document.getElementById("addGroup"),
  clearSelection: document.getElementById("clearSelection"),
  checkCover: document.getElementById("checkCover"),
  clearGroups: document.getElementById("clearGroups"),
  messageBox: document.getElementById("messageBox"),
  mapLegend: document.getElementById("mapLegend"),
  kmap: document.getElementById("kmap"),
  groupList: document.getElementById("groupList"),
  expressionBox: document.getElementById("expressionBox"),
  languageSelect: document.getElementById("languageSelect"),
  tutorialButton: document.getElementById("tutorialButton"),
  infoModal: document.getElementById("infoModal"),
  infoModalTitle: document.getElementById("infoModalTitle"),
  infoModalBody: document.getElementById("infoModalBody")
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
  if (els.languageSelect) els.languageSelect.value = state.language;
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

function tutorialTopic() {
  return {
    title: t("tutorial"),
    paragraphs: [t("tutorialIntro")],
    steps: [
      { visual: "setup", title: t("tutorialStep1Title"), body: t("tutorialStep1Body") },
      { visual: "select", title: t("tutorialStep2Title"), body: t("tutorialStep2Body") },
      { visual: "cover", title: t("tutorialStep3Title"), body: t("tutorialStep3Body") },
      { visual: "reveal", title: t("tutorialStep4Title"), body: t("tutorialStep4Body") }
    ]
  };
}

function renderInfoBody(topic) {
  els.infoModalBody.innerHTML = "";
  topic.paragraphs.forEach(text => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    els.infoModalBody.appendChild(paragraph);
  });

  if (!topic.steps) return;
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
}

function tutorialVisual(type) {
  if (type === "setup") {
    return `
      <div class="shot-bar"><span>${escapeHtml(t("variables"))}: 4</span><span>${escapeHtml(t("difficulty"))}: ${escapeHtml(t("medium"))}</span></div>
      <div class="shot-button">${escapeHtml(t("newTable"))}</div>
      <div class="shot-task">F(A, B, C, D) -> m1, m3, m7, m11</div>
    `;
  }

  if (type === "select") {
    return `
      <div class="shot-map">
        <b>1</b><b class="selected">1</b><b>0</b><b>X</b>
        <b>0</b><b class="selected">1</b><b>1</b><b>0</b>
        <b>X</b><b>0</b><b>1</b><b>1</b>
        <b>1</b><b>0</b><b>X</b><b>0</b>
      </div>
      <div class="shot-outline"></div>
    `;
  }

  if (type === "cover") {
    return `
      <div class="shot-bar"><span>${escapeHtml(t("yourGroups"))}</span><span>2</span></div>
      <div class="shot-list"><span>m1, m3</span><span>m7, m15</span></div>
      <div class="shot-message">${escapeHtml(t("allCovered"))}</div>
    `;
  }

  return `
    <div class="shot-map mini">
      <b class="group-a">1</b><b class="group-a">1</b><b>0</b><b>X</b>
      <b>0</b><b class="group-b">1</b><b class="group-b">1</b><b>0</b>
      <b>X</b><b>0</b><b class="group-b">1</b><b class="group-b">1</b>
      <b class="group-a">1</b><b class="group-a">1</b><b>X</b><b>0</b>
    </div>
    <div class="shot-button ghost">${escapeHtml(t("revealExample"))}</div>
  `;
}

function openTutorial(trigger) {
  lastInfoTrigger = trigger;
  const topic = tutorialTopic();
  els.infoModalTitle.textContent = topic.title;
  renderInfoBody(topic);
  els.infoModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  els.infoModal.querySelector(".modal-close").focus();
}

function closeInfo() {
  els.infoModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  if (lastInfoTrigger) lastInfoTrigger.focus();
}

function init() {
  applyTranslations();
  bindEvents();
  newExercise();
}

function bindEvents() {
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
  els.newExercise.addEventListener("click", newExercise);
  els.revealSolution.addEventListener("click", revealSolution);
  els.addGroup.addEventListener("click", addSelectedGroup);
  els.clearSelection.addEventListener("click", () => {
    state.selected.clear();
    render();
  });
  els.checkCover.addEventListener("click", checkCover);
  els.clearGroups.addEventListener("click", () => {
    state.groups = [];
    state.selected.clear();
    setMessage(t("groupsCleared"), "neutral");
    render();
  });

  window.addEventListener("resize", () => renderGroupOutlines());
}

function newExercise() {
  state.bits = clamp(parseInt(els.variableCount.value, 10) || 4, 2, 4);
  state.difficulty = els.difficulty.value;
  state.values = generateValues(state.bits, state.difficulty);
  state.selected.clear();
  state.groups = [];
  state.revealed = false;
  state.solution = solveMinimumSop(state.values, state.bits);
  setMessage(t("readyMessage"), "neutral");
  render();
}

function generateValues(bits, difficulty) {
  const total = 1 << bits;
  const settings = {
    easy: { ones: [2, Math.max(2, Math.floor(total * 0.35))], dcs: [0, Math.max(1, Math.floor(total * 0.12))] },
    medium: { ones: [3, Math.max(3, Math.floor(total * 0.50))], dcs: [1, Math.max(1, Math.floor(total * 0.20))] },
    hard: { ones: [4, Math.max(4, Math.floor(total * 0.62))], dcs: [1, Math.max(2, Math.floor(total * 0.25))] }
  }[difficulty];

  for (let attempt = 0; attempt < 200; attempt += 1) {
    const values = Array.from({ length: total }, () => 0);
    const order = shuffled(Array.from({ length: total }, (_, index) => index));
    const oneCount = randomInt(settings.ones[0], Math.min(settings.ones[1], total - 1));
    const maxDcs = Math.min(settings.dcs[1], total - oneCount - 1);
    const dcCount = randomInt(settings.dcs[0], Math.max(settings.dcs[0], maxDcs));

    order.slice(0, oneCount).forEach(index => {
      values[index] = 1;
    });
    order.slice(oneCount, oneCount + dcCount).forEach(index => {
      values[index] = "X";
    });

    const solution = solveMinimumSop(values, bits);
    if (solution.groups.length > 0 && solution.expression !== "1") {
      return values;
    }
  }

  const fallback = Array.from({ length: total }, () => 0);
  [1, 3, 5, 7].filter(index => index < total).forEach(index => {
    fallback[index] = 1;
  });
  if (total > 8) fallback[15] = "X";
  return fallback;
}

function render() {
  renderProblem();
  renderControls();
  renderMap();
  renderGroups();
  renderExpression();
}

function renderProblem() {
  const names = variables.slice(0, state.bits).join(", ");
  const ones = indexesWithValue(1);
  const dcs = indexesWithValue("X");
  els.problemText.textContent = t("problem", { names, ones: ones.length, dcs: dcs.length });
}

function renderControls() {
  els.addGroup.disabled = state.selected.size === 0;
  els.clearSelection.disabled = state.selected.size === 0;
}

function renderMap() {
  const layout = mapLayout(state.bits);
  els.mapLegend.textContent = t("rowsColumns", {
    rows: layout.rowVars.join(""),
    columns: layout.colVars.join("")
  });

  const rows = layout.rowCodes.map((rowCode, rowIndex) => {
    const cells = layout.colCodes.map((colCode, colIndex) => {
      const minterm = parseInt(`${rowCode}${colCode}` || "0", 2);
      const shownValue = state.values[minterm];
      const selected = state.selected.has(minterm);
      return `
        <td>
          <button class="cell-button${selected ? " selected" : ""}" type="button" data-minterm="${minterm}" data-row="${rowIndex}" data-col="${colIndex}" data-value="${escapeHtml(shownValue)}">
            <span class="cell-value">${escapeHtml(shownValue)}</span>
            <span class="cell-minterm">m${minterm}</span>
          </button>
        </td>
      `;
    }).join("");
    return `
      <tr>
        <th class="axis-label">${escapeHtml(rowCode || "-")}</th>
        ${cells}
      </tr>
    `;
  }).join("");

  els.kmap.innerHTML = `
    <div class="kmap-stage">
      <table class="kmap">
        <thead>
          <tr>
            <th class="corner-label">${escapeHtml(layout.rowVars.join("") || "-")} \\ ${escapeHtml(layout.colVars.join("") || "-")}</th>
            ${layout.colCodes.map(code => `<th class="axis-label">${escapeHtml(code || "-")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="group-overlay" aria-hidden="true"></div>
    </div>
  `;

  els.kmap.querySelectorAll("[data-minterm]").forEach(button => {
    button.addEventListener("click", () => handleCellClick(parseInt(button.dataset.minterm, 10)));
  });
  renderGroupOutlines(layout);
}

function renderGroupOutlines(layout = mapLayout(state.bits)) {
  const stage = els.kmap.querySelector(".kmap-stage");
  const overlay = els.kmap.querySelector(".group-overlay");
  if (!stage || !overlay) return;

  overlay.innerHTML = "";
  const stageRect = stage.getBoundingClientRect();
  const outlines = state.groups.map(group => ({
    cells: group.cells,
    color: group.color,
    className: "group-outline"
  }));

  const selectedCells = Array.from(state.selected).sort((a, b) => a - b);
  if (shouldOutlineCells(selectedCells, layout)) {
    outlines.push({
      cells: selectedCells,
      color: "#4767a5",
      className: "group-outline selection-outline"
    });
  }

  outlines.forEach(outline => {
    outlineBoxesForCells(outline.cells, layout, stageRect).forEach(box => {
      const element = document.createElement("div");
      element.className = outline.className;
      element.style.setProperty("--group-color", outline.color);
      element.style.left = `${box.left}px`;
      element.style.top = `${box.top}px`;
      element.style.width = `${box.width}px`;
      element.style.height = `${box.height}px`;
      overlay.appendChild(element);
    });
  });
}

function outlineBoxesForCells(cells, layout, stageRect) {
  const positions = positionsForCells(cells, layout);
  if (positions.length === 0) return [];

  const rows = uniqueNumbers(positions.map(position => position.row));
  const cols = uniqueNumbers(positions.map(position => position.col));
  const rowRanges = circularRanges(rows, layout.rowCodes.length);
  const colRanges = circularRanges(cols, layout.colCodes.length);
  const padding = 5;
  const boxes = [];

  rowRanges.forEach(rowRange => {
    colRanges.forEach(colRange => {
      const buttons = buttonsInRange(rowRange, colRange);
      if (buttons.length === 0) return;

      const rects = buttons.map(button => button.getBoundingClientRect());
      const left = Math.min(...rects.map(rect => rect.left)) - stageRect.left - padding;
      const top = Math.min(...rects.map(rect => rect.top)) - stageRect.top - padding;
      const right = Math.max(...rects.map(rect => rect.right)) - stageRect.left + padding;
      const bottom = Math.max(...rects.map(rect => rect.bottom)) - stageRect.top + padding;
      boxes.push({
        left,
        top,
        width: right - left,
        height: bottom - top
      });
    });
  });

  return boxes;
}

function buttonsInRange(rowRange, colRange) {
  const buttons = [];
  for (let row = rowRange[0]; row <= rowRange[1]; row += 1) {
    for (let col = colRange[0]; col <= colRange[1]; col += 1) {
      const button = els.kmap.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (button) buttons.push(button);
    }
  }
  return buttons;
}

function shouldOutlineCells(cells, layout) {
  if (cells.length === 0 || !isPowerOfTwo(cells.length)) return false;
  const positions = positionsForCells(cells, layout);
  if (positions.length !== cells.length) return false;

  const rows = uniqueNumbers(positions.map(position => position.row));
  const cols = uniqueNumbers(positions.map(position => position.col));
  return rows.length * cols.length === cells.length
    && isCircularContiguous(rows, layout.rowCodes.length)
    && isCircularContiguous(cols, layout.colCodes.length);
}

function positionsForCells(cells, layout) {
  const positions = mintermPositions(layout);
  return cells
    .map(cell => positions.get(cell))
    .filter(position => position !== undefined);
}

function mintermPositions(layout) {
  const positions = new Map();
  layout.rowCodes.forEach((rowCode, row) => {
    layout.colCodes.forEach((colCode, col) => {
      const minterm = parseInt(`${rowCode}${colCode}` || "0", 2);
      positions.set(minterm, { row, col });
    });
  });
  return positions;
}

function circularRanges(indices, count) {
  const unique = uniqueNumbers(indices);
  if (unique.length === 0) return [];
  if (unique.length === count) return [[0, count - 1]];

  let bestGapIndex = 0;
  let bestGapSize = -1;
  unique.forEach((value, index) => {
    const next = unique[(index + 1) % unique.length];
    const distance = (next - value + count) % count;
    const gapSize = distance === 0 ? count - unique.length : distance - 1;
    if (gapSize > bestGapSize) {
      bestGapSize = gapSize;
      bestGapIndex = index;
    }
  });

  const ordered = [];
  for (let offset = 1; offset <= unique.length; offset += 1) {
    ordered.push(unique[(bestGapIndex + offset) % unique.length]);
  }

  const ranges = [];
  let start = ordered[0];
  let end = ordered[0];
  for (let index = 1; index < ordered.length; index += 1) {
    const value = ordered[index];
    if (value === end + 1) {
      end = value;
    } else {
      ranges.push([start, end]);
      start = value;
      end = value;
    }
  }
  ranges.push([start, end]);
  return ranges;
}

function isCircularContiguous(indices, count) {
  const unique = uniqueNumbers(indices);
  if (unique.length === 0) return false;
  if (unique.length === count) return true;
  const set = new Set(unique);
  return unique.some(start => {
    for (let offset = 0; offset < unique.length; offset += 1) {
      if (!set.has((start + offset) % count)) return false;
    }
    return true;
  });
}

function uniqueNumbers(values) {
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

function renderGroups() {
  if (state.groups.length === 0) {
    els.groupList.innerHTML = `<div class="group-item">${escapeHtml(t("noGroupsYet"))}</div>`;
    return;
  }

  els.groupList.innerHTML = state.groups.map((group, index) => `
    <div class="group-item">
      <div>
        <span class="group-chip" style="--group-color: ${group.color}"></span>
        <span class="group-name">${escapeHtml(t("groupName", { index: index + 1 }))}</span>
        <span>${escapeHtml(t("covers", { cells: group.cells.map(cell => `m${cell}`).join(", ") }))}</span>
      </div>
      <button class="button ghost" type="button" data-remove-group="${index}" data-icon="trash">${escapeHtml(t("remove"))}</button>
    </div>
  `).join("");

  els.groupList.querySelectorAll("[data-remove-group]").forEach(button => {
    button.addEventListener("click", () => {
      state.groups.splice(parseInt(button.dataset.removeGroup, 10), 1);
      render();
    });
  });
}

function renderExpression() {
  const ones = indexesWithValue(1);
  const covered = new Set();
  state.groups.forEach(group => {
    group.cells.forEach(cell => {
      if (state.values[cell] === 1) covered.add(cell);
    });
  });
  const solutionLine = state.revealed
    ? `<div class="expression-line">${escapeHtml(t("solutionShown"))}</div>`
    : `<div class="expression-line">${escapeHtml(t("revealHint"))}</div>`;

  els.expressionBox.innerHTML = `
    <div class="expression-line">${escapeHtml(t("coveredCells"))}: <span class="expression">${covered.size}/${ones.length}</span></div>
    <div class="expression-line">${escapeHtml(t("groupsAdded"))}: <span class="expression">${state.groups.length}</span></div>
    ${solutionLine}
  `;
}

function handleCellClick(minterm) {
  if (state.selected.has(minterm)) {
    state.selected.delete(minterm);
  } else {
    state.selected.add(minterm);
  }
  render();
}

function addSelectedGroup() {
  const cells = Array.from(state.selected).sort((a, b) => a - b);
  const validation = validateGroup(cells, state.values, state.bits);
  if (!validation.ok) {
    setMessage(validation.error, "bad");
    return;
  }

  const duplicate = state.groups.some(group => sameArray(group.cells, validation.cells));
  if (duplicate) {
    setMessage(t("duplicateGroup"), "warn");
    return;
  }

  state.groups.push({
    cells: validation.cells,
    pattern: validation.pattern,
    expression: patternToExpression(validation.pattern),
    color: groupColors[state.groups.length % groupColors.length]
  });
  state.selected.clear();
  setMessage(t("groupAdded"), "good");
  render();
}

function checkCover() {
  if (state.groups.length === 0) {
    setMessage(t("needGroup"), "bad");
    return;
  }

  const ones = indexesWithValue(1);
  const covered = new Set();
  for (const group of state.groups) {
    const validation = validateGroup(group.cells, state.values, state.bits);
    if (!validation.ok) {
      setMessage(validation.error, "bad");
      return;
    }
    validation.cells.forEach(cell => covered.add(cell));
  }

  const uncovered = ones.filter(index => !covered.has(index));
  if (uncovered.length > 0) {
    setMessage(t("uncovered", { cells: uncovered.map(index => `m${index}`).join(", ") }), "warn");
    return;
  }

  setMessage(t("allCovered"), "good");
  render();
}

function revealSolution() {
  state.revealed = true;
  state.groups = state.solution.groups.map((group, index) => ({
    cells: group.cells,
    pattern: group.pattern,
    expression: patternToExpression(group.pattern),
    color: groupColors[index % groupColors.length]
  }));
  state.selected.clear();
  setMessage(t("solutionShown"), "good");
  render();
}

function validateGroup(cells, values, bits) {
  if (cells.length === 0) {
    return { ok: false, error: t("selectOne") };
  }
  if (!isPowerOfTwo(cells.length)) {
    return { ok: false, error: t("groupPower") };
  }

  const pattern = patternFromCells(cells, bits);
  const impliedCells = mintermsForPattern(pattern, bits);
  if (!sameArray(cells, impliedCells)) {
    return { ok: false, error: t("rectangular") };
  }

  const zeroCells = impliedCells.filter(index => values[index] === 0);
  if (zeroCells.length > 0) {
    return { ok: false, error: t("zeroCells", { cells: zeroCells.map(index => `m${index}`).join(", ") }) };
  }

  const oneCells = impliedCells.filter(index => values[index] === 1);
  if (oneCells.length === 0) {
    return { ok: false, error: t("needsOne") };
  }

  return { ok: true, cells: impliedCells, pattern };
}

function solveMinimumSop(values, bits) {
  const ones = values.map((value, index) => value === 1 ? index : -1).filter(index => index >= 0);
  if (ones.length === 0) {
    return { groups: [], expression: "0", cost: 0 };
  }

  const validPatterns = enumeratePatterns(bits).map(pattern => {
    const cells = mintermsForPattern(pattern, bits);
    const hasOne = cells.some(index => values[index] === 1);
    const hasZero = cells.some(index => values[index] === 0);
    return { pattern, cells, hasOne, hasZero };
  }).filter(item => item.hasOne && !item.hasZero);

  const primes = validPatterns.filter(candidate => {
    return !validPatterns.some(other => {
      return other.pattern !== candidate.pattern
        && other.cells.length > candidate.cells.length
        && candidate.cells.every(cell => other.cells.includes(cell));
    });
  });

  const onePositions = new Map(ones.map((minterm, index) => [minterm, index]));
  const allMask = (1 << ones.length) - 1;
  const prepared = primes.map(prime => {
    let mask = 0;
    prime.cells.forEach(cell => {
      if (onePositions.has(cell)) {
        mask |= 1 << onePositions.get(cell);
      }
    });
    return {
      ...prime,
      mask,
      cost: literalCount(prime.pattern)
    };
  }).filter(item => item.mask !== 0)
    .sort((left, right) => left.cost - right.cost || right.cells.length - left.cells.length);

  let best = null;
  function visit(index, mask, chosen, cost) {
    if (best && cost > best.cost) return;
    if (mask === allMask) {
      const candidate = { groups: chosen.slice(), cost };
      if (!best
        || candidate.cost < best.cost
        || (candidate.cost === best.cost && candidate.groups.length < best.groups.length)) {
        best = candidate;
      }
      return;
    }
    if (index >= prepared.length) return;

    const remainingMask = prepared.slice(index).reduce((nextMask, item) => nextMask | item.mask, 0);
    if ((mask | remainingMask) !== allMask) return;

    const item = prepared[index];
    visit(index + 1, mask | item.mask, [...chosen, item], cost + item.cost);
    visit(index + 1, mask, chosen, cost);
  }

  visit(0, 0, [], 0);
  const groups = best ? best.groups : [];
  const expression = groups.length ? groups.map(group => patternToExpression(group.pattern)).join(" + ") : "0";
  return { groups, expression, cost: best ? best.cost : 0 };
}

function enumeratePatterns(bits) {
  const output = [];
  function walk(prefix) {
    if (prefix.length === bits) {
      output.push(prefix);
      return;
    }
    ["0", "1", "-"].forEach(char => walk(prefix + char));
  }
  walk("");
  return output;
}

function mapLayout(bits) {
  const rowCount = Math.floor(bits / 2);
  const colCount = bits - rowCount;
  return {
    rowVars: variables.slice(0, rowCount),
    colVars: variables.slice(rowCount, bits),
    rowCodes: grayCodes(rowCount),
    colCodes: grayCodes(colCount)
  };
}

function grayCodes(bits) {
  if (bits === 0) return [""];
  let codes = ["0", "1"];
  for (let size = 2; size <= bits; size += 1) {
    codes = [
      ...codes.map(code => `0${code}`),
      ...codes.slice().reverse().map(code => `1${code}`)
    ];
  }
  return codes;
}

function patternFromCells(cells, bits) {
  const bitStrings = cells.map(index => index.toString(2).padStart(bits, "0"));
  let pattern = "";
  for (let bit = 0; bit < bits; bit += 1) {
    const first = bitStrings[0][bit];
    pattern += bitStrings.every(value => value[bit] === first) ? first : "-";
  }
  return pattern;
}

function mintermsForPattern(pattern, bits) {
  const cells = [];
  const total = 1 << bits;
  for (let index = 0; index < total; index += 1) {
    const bitsText = index.toString(2).padStart(bits, "0");
    if (matchesPattern(pattern, bitsText)) {
      cells.push(index);
    }
  }
  return cells;
}

function matchesPattern(pattern, bitsText) {
  for (let index = 0; index < pattern.length; index += 1) {
    if (pattern[index] !== "-" && pattern[index] !== bitsText[index]) return false;
  }
  return true;
}

function patternToExpression(pattern) {
  let expression = "";
  for (let index = 0; index < pattern.length; index += 1) {
    if (pattern[index] === "-") continue;
    expression += variables[index] + (pattern[index] === "0" ? "'" : "");
  }
  return expression || "1";
}

function literalCount(pattern) {
  return pattern.split("").filter(char => char !== "-").length;
}

function indexesWithValue(value) {
  return state.values
    .map((item, index) => item === value ? index : -1)
    .filter(index => index >= 0);
}

function setMessage(text, type) {
  els.messageBox.textContent = text;
  els.messageBox.classList.remove("good", "bad", "warn");
  if (type === "good") els.messageBox.classList.add("good");
  if (type === "bad") els.messageBox.classList.add("bad");
  if (type === "warn") els.messageBox.classList.add("warn");
}

function sameArray(left, right) {
  if (left.length !== right.length) return false;
  const sortedLeft = left.slice().sort((a, b) => a - b);
  const sortedRight = right.slice().sort((a, b) => a - b);
  return sortedLeft.every((value, index) => value === sortedRight[index]);
}

function isPowerOfTwo(value) {
  return value > 0 && (value & (value - 1)) === 0;
}

function shuffled(items) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

function randomInt(min, max) {
  if (max < min) return min;
  return min + Math.floor(Math.random() * (max - min + 1));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

init();

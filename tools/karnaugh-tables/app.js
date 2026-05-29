"use strict";

const variables = ["A", "B", "C", "D"];
const groupColors = ["#2f6f55", "#b87522", "#4767a5", "#9a4d8a", "#8d6b1f", "#3f7d88"];

const state = {
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
  expressionBox: document.getElementById("expressionBox")
};

function init() {
  bindEvents();
  newExercise();
}

function bindEvents() {
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
    setMessage("Groups cleared.", "neutral");
    render();
  });
}

function newExercise() {
  state.bits = clamp(parseInt(els.variableCount.value, 10) || 4, 2, 4);
  state.difficulty = els.difficulty.value;
  state.values = generateValues(state.bits, state.difficulty);
  state.selected.clear();
  state.groups = [];
  state.revealed = false;
  state.solution = solveMinimumSop(state.values, state.bits);
  setMessage("A random table is ready. Select a legal group of 1 cells, then add it.", "neutral");
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
  const dcText = dcs.length === 0 ? "" : ` ${dcs.length} don't-care cell${dcs.length === 1 ? "" : "s"} may be included when helpful.`;
  els.problemText.textContent = `F(${names}) has ${ones.length} output-1 cell${ones.length === 1 ? "" : "s"}.${dcText}`;
}

function renderControls() {
  els.addGroup.disabled = state.selected.size === 0;
  els.clearSelection.disabled = state.selected.size === 0;
}

function renderMap() {
  const layout = mapLayout(state.bits);
  els.mapLegend.textContent = `${layout.rowVars.join("") || "-"} rows, ${layout.colVars.join("") || "-"} columns`;

  const groupByCell = new Map();
  state.groups.forEach((group, index) => {
    group.cells.forEach(cell => {
      if (!groupByCell.has(cell)) {
        groupByCell.set(cell, index);
      }
    });
  });

  const rows = layout.rowCodes.map(rowCode => {
    const cells = layout.colCodes.map(colCode => {
      const minterm = parseInt(`${rowCode}${colCode}` || "0", 2);
      const shownValue = state.values[minterm];
      const selected = state.selected.has(minterm);
      const groupIndex = groupByCell.get(minterm);
      const groupClass = groupIndex === undefined ? "" : " in-group";
      const groupStyle = groupIndex === undefined ? "" : ` style="--group-color: ${groupColors[groupIndex % groupColors.length]}"`;
      return `
        <td>
          <button class="cell-button${selected ? " selected" : ""}${groupClass}" type="button" data-minterm="${minterm}" data-value="${escapeHtml(shownValue)}"${groupStyle}>
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
    <table class="kmap">
      <thead>
        <tr>
          <th class="corner-label">${escapeHtml(layout.rowVars.join("") || "-")} \\ ${escapeHtml(layout.colVars.join("") || "-")}</th>
          ${layout.colCodes.map(code => `<th class="axis-label">${escapeHtml(code || "-")}</th>`).join("")}
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  els.kmap.querySelectorAll("[data-minterm]").forEach(button => {
    button.addEventListener("click", () => handleCellClick(parseInt(button.dataset.minterm, 10)));
  });
}

function renderGroups() {
  if (state.groups.length === 0) {
    els.groupList.innerHTML = `<div class="group-item">No groups yet.</div>`;
    return;
  }

  els.groupList.innerHTML = state.groups.map((group, index) => `
    <div class="group-item">
      <div>
        <span class="group-chip" style="--group-color: ${group.color}"></span>
        <span class="group-name">Group ${index + 1}</span>
        <span>covers ${group.cells.map(cell => `m${cell}`).join(", ")}</span>
      </div>
      <button class="button ghost" type="button" data-remove-group="${index}" data-icon="x">Remove</button>
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
    ? `<div class="expression-line">An example grouping is shown on the table.</div>`
    : `<div class="expression-line">Reveal shows one possible grouping.</div>`;

  els.expressionBox.innerHTML = `
    <div class="expression-line">Covered 1-cells: <span class="expression">${covered.size}/${ones.length}</span></div>
    <div class="expression-line">Groups added: <span class="expression">${state.groups.length}</span></div>
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
    setMessage("That group is already in your cover.", "warn");
    return;
  }

  state.groups.push({
    cells: validation.cells,
    pattern: validation.pattern,
    expression: patternToExpression(validation.pattern),
    color: groupColors[state.groups.length % groupColors.length]
  });
  state.selected.clear();
  setMessage("Group added.", "good");
  render();
}

function checkCover() {
  if (state.groups.length === 0) {
    setMessage("Add at least one legal group before checking your work.", "bad");
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
    setMessage(`The groups are legal so far, but ${uncovered.map(index => `m${index}`).join(", ")} still need coverage.`, "warn");
    return;
  }

  setMessage("Nice. Every 1-cell is covered by legal groups.", "good");
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
  setMessage("One possible grouping is shown on the table.", "good");
  render();
}

function validateGroup(cells, values, bits) {
  if (cells.length === 0) {
    return { ok: false, error: "Select at least one cell for the group." };
  }
  if (!isPowerOfTwo(cells.length)) {
    return { ok: false, error: "A Karnaugh group must contain 1, 2, 4, 8, or 16 cells." };
  }

  const pattern = patternFromCells(cells, bits);
  const impliedCells = mintermsForPattern(pattern, bits);
  if (!sameArray(cells, impliedCells)) {
    return { ok: false, error: "Selected cells must form one rectangular K-map group, including wraparound rectangles." };
  }

  const zeroCells = impliedCells.filter(index => values[index] === 0);
  if (zeroCells.length > 0) {
    return { ok: false, error: `A group cannot include output-0 cells (${zeroCells.map(index => `m${index}`).join(", ")}).` };
  }

  const oneCells = impliedCells.filter(index => values[index] === 1);
  if (oneCells.length === 0) {
    return { ok: false, error: "A group must cover at least one minterm with output 1." };
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

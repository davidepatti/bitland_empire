"use strict";

const languageKey = "bitland-language";

const translations = {
  it: {
    brandEyebrow: "Strumenti didattici",
    language: "Lingua",
    about: "Info",
    checking: "Controllo",
    browser: "Browser",
    locked: "Bloccato",
    unlocked: "Sbloccato",
    examUnlock: "Sblocco esame",
    protectedPackage: "Pacchetto protetto",
    checkingComputer: "Controllo di questo computer.",
    unlockConfigured: "Questo hub deve essere sbloccato su questo computer prima di avviare gli strumenti.",
    unlockUnconfigured: "A questa build d'esame manca la chiave pubblica di sblocco.",
    computerCode: "Codice computer",
    unlockCode: "Codice di sblocco",
    unlock: "Sblocca",
    pasteUnlockCode: "Incolla il codice di sblocco fornito dal docente.",
    unlockedToast: "Bitland Empire sbloccato.",
    unlockFirst: "Sblocca prima Bitland Empire.",
    unableOpen: "Impossibile aprire lo strumento.",
    unableLaunch: "Impossibile avviare lo strumento.",
    opened: ({ tool }) => `${tool} aperto.`,
    runHubLauncher: "Esegui hub/launch.sh da questo pacchetto.",
    learningEyebrow: "Percorsi",
    learningTitle: "Percorsi consigliati",
    learningNote: "Scegli un filo di studio e procedi da sinistra a destra.",
    logicPathTitle: "Logica digitale",
    logicPathBody: "Dalle mappe di Karnaugh alla minimizzazione e poi alle macchine sequenziali.",
    architecturePathTitle: "Architettura MIPS64",
    architecturePathBody: "Osserva il datapath istruzione per istruzione, poi confronta hazard, stall e forwarding.",
    launchpad: "Avvio rapido",
    tools: "Strumenti",
    launch: "Avvia",
    toolCount: ({ count }) => `${count} strument${count === 1 ? "o" : "i"}`,
    credits: "Crediti",
    aboutTitle: "Info su Bitland Empire",
    developedBy: "Sviluppato da",
    institution: "Istituzione",
    license: "Licenza",
    repository: "Repository",
    close: "Chiudi"
  },
  en: {
    brandEyebrow: "Teaching tools",
    language: "Language",
    about: "About",
    checking: "Checking",
    browser: "Browser",
    locked: "Locked",
    unlocked: "Unlocked",
    examUnlock: "Exam unlock",
    protectedPackage: "Protected package",
    checkingComputer: "Checking this computer.",
    unlockConfigured: "This hub must be unlocked on this computer before the tools can run.",
    unlockUnconfigured: "This exam build is missing its public unlock key.",
    computerCode: "Computer code",
    unlockCode: "Unlock code",
    unlock: "Unlock",
    pasteUnlockCode: "Paste the unlock code supplied by the instructor.",
    unlockedToast: "Bitland Empire unlocked.",
    unlockFirst: "Unlock Bitland Empire first.",
    unableOpen: "Unable to open tool.",
    unableLaunch: "Unable to launch tool.",
    opened: ({ tool }) => `${tool} opened.`,
    runHubLauncher: "Run hub/launch.sh from this package.",
    learningEyebrow: "Learning path",
    learningTitle: "Recommended paths",
    learningNote: "Choose a study thread and move from left to right.",
    logicPathTitle: "Digital logic",
    logicPathBody: "Move from Karnaugh maps to minimization and then to sequential machines.",
    architecturePathTitle: "MIPS64 architecture",
    architecturePathBody: "Inspect the datapath instruction by instruction, then compare hazards, stalls, and forwarding.",
    launchpad: "Launchpad",
    tools: "Tools",
    launch: "Launch",
    toolCount: ({ count }) => `${count} tool${count === 1 ? "" : "s"}`,
    credits: "Credits",
    aboutTitle: "About Bitland Empire",
    developedBy: "Developed by",
    institution: "Institution",
    license: "License",
    repository: "Repository",
    close: "Close"
  }
};

const toolCopy = {
  it: {
    "karnaugh-tables": {
      productName: "Tabelle di Karnaugh",
      category: "Minimizzazione logica",
      description: "Genera mappe di Karnaugh casuali per esercitarsi con raggruppamenti validi."
    },
    "qmc-sim": {
      productName: "qmc-sim",
      category: "Minimizzazione logica",
      description: "Simulatore Quine-McCluskey per primi implicanti, chart e copertura finale."
    },
    "seq-circuits": {
      productName: "Circuiti sequenziali",
      category: "Logica sequenziale",
      description: "Costruisce esercizi su FSM, Paull-Unger, tabelle di eccitazione e logica dei flip-flop."
    },
    "cpu-spy": {
      productName: "CPU Spy",
      category: "Architettura degli elaboratori",
      description: "Demo cliccabile del datapath MIPS64 e dell'esecuzione delle istruzioni."
    },
    "mips64-hazards": {
      productName: "MIPS64 Hazard Lab",
      category: "Architettura degli elaboratori",
      description: "Visualizza hazard di pipeline MIPS64 con e senza forwarding."
    }
  },
  en: {
    "karnaugh-tables": {
      productName: "Karnaugh Tables",
      category: "Logic minimization",
      description: "Karnaugh-map exercise tool for generating random filled tables and practicing legal groupings."
    },
    "qmc-sim": {
      productName: "qmc-sim",
      category: "Logic minimization",
      description: "Quine-McCluskey logic minimization simulator for prime implicants, charts, and final coverage."
    },
    "seq-circuits": {
      productName: "Sequential Circuits",
      category: "Sequential logic",
      description: "Sequential-circuit exercise builder for FSMs, Paull-Unger, excitation tables, and flip-flop logic."
    },
    "cpu-spy": {
      productName: "CPU Spy",
      category: "Computer architecture",
      description: "Clickable MIPS64 datapath and instruction execution demo."
    },
    "mips64-hazards": {
      productName: "MIPS64 Hazard Lab",
      category: "Computer architecture",
      description: "Clickable MIPS64 pipeline hazard visualizer with and without forwarding."
    }
  }
};

const learningPaths = [
  {
    titleKey: "logicPathTitle",
    bodyKey: "logicPathBody",
    accent: "#d98b1f",
    tools: ["karnaugh-tables", "qmc-sim", "seq-circuits"]
  },
  {
    titleKey: "architecturePathTitle",
    bodyKey: "architecturePathBody",
    accent: "#116a67",
    tools: ["cpu-spy", "mips64-hazards"]
  }
];

const state = {
  language: getInitialLanguage(),
  tools: [],
  guard: {
    ready: false,
    available: true,
    enabled: true,
    configured: false,
    locked: true,
    requestCode: ""
  }
};

const els = {
  aboutButton: document.getElementById("aboutButton"),
  aboutModal: document.getElementById("aboutModal"),
  guardPill: document.getElementById("guardPill"),
  languageSelect: document.getElementById("languageSelect"),
  learningPaths: document.getElementById("learningPaths"),
  unlockPanel: document.getElementById("unlockPanel"),
  unlockMessage: document.getElementById("unlockMessage"),
  requestCode: document.getElementById("requestCode"),
  unlockCode: document.getElementById("unlockCode"),
  unlockButton: document.getElementById("unlockButton"),
  unlockError: document.getElementById("unlockError"),
  toolCount: document.getElementById("toolCount"),
  toolGrid: document.getElementById("toolGrid"),
  toast: document.getElementById("toast")
};

function apiAvailable() {
  return Boolean(window.bitlandHub);
}

function guardLocked() {
  const guard = state.guard;
  return Boolean(guard.available && guard.enabled && guard.locked);
}

function guardReady() {
  return state.guard.ready !== false;
}

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(languageKey);
    if (saved === "en" || saved === "it") return saved;
  } catch (error) {
    // Storage is optional; the selector still works for this session.
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
  els.languageSelect.value = state.language;
}

function setLanguage(language) {
  if (language !== "en" && language !== "it") return;
  state.language = language;
  try {
    localStorage.setItem(languageKey, language);
  } catch (error) {
    // Storage is optional; the selector still works for this session.
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

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    els.toast.classList.add("hidden");
  }, 2600);
}

function setUnlockError(message) {
  els.unlockError.textContent = message || "";
  els.unlockError.classList.toggle("hidden", !message);
}

function openAbout() {
  els.aboutModal.classList.remove("hidden");
  const closeButton = els.aboutModal.querySelector("[data-about-close]");
  if (closeButton) closeButton.focus();
}

function closeAbout() {
  els.aboutModal.classList.add("hidden");
  els.aboutButton.focus();
}

function renderGuard() {
  const guard = state.guard;
  const locked = guardLocked();
  const ready = guardReady();

  if (ready && !guard.available) {
    els.guardPill.classList.add("good");
    els.guardPill.classList.remove("bad");
    els.guardPill.textContent = t("browser");
    els.unlockPanel.classList.add("hidden");
    setUnlockError("");
    return;
  }

  els.guardPill.classList.toggle("good", ready && !locked);
  els.guardPill.classList.toggle("bad", ready && locked);
  els.guardPill.textContent = !ready ? t("checking") : locked ? t("locked") : t("unlocked");

  els.unlockPanel.classList.toggle("hidden", !locked);
  els.requestCode.textContent = guard.requestCode || "...";
  els.unlockButton.disabled = !ready || !guard.configured;
  els.unlockCode.disabled = !ready || !guard.configured;
  els.unlockMessage.textContent = !ready
    ? t("checkingComputer")
    : guard.configured
      ? t("unlockConfigured")
      : t("unlockUnconfigured");

  if (guard.error) {
    setUnlockError(guard.error);
  } else if (!locked) {
    setUnlockError("");
  }
}

function localizedTool(tool) {
  const copy = (toolCopy[state.language] && toolCopy[state.language][tool.slug]) || {};
  return {
    ...tool,
    productName: copy.productName || tool.productName,
    description: copy.description || tool.description || "",
    category: copy.category || tool.category || ""
  };
}

function toolIconFor(slug) {
  return {
    "karnaugh-tables": "kmap",
    "qmc-sim": "qmc",
    "seq-circuits": "fsm",
    "cpu-spy": "cpu",
    "mips64-hazards": "hazard"
  }[slug] || "launch";
}

function renderLearningPaths() {
  const locked = guardLocked();
  els.learningPaths.innerHTML = learningPaths.map(path => {
    const items = path.tools.map((slug, index) => {
      const rawTool = state.tools.find(tool => tool.slug === slug);
      if (!rawTool) return "";
      const tool = localizedTool(rawTool);
      const disabled = locked ? " disabled" : "";
      return `
        <button class="path-tool" type="button" data-path-tool="${escapeHtml(tool.slug)}"${disabled}>
          <span class="path-index">${index + 1}</span>
          <span class="path-copy">
            <strong>${escapeHtml(tool.productName)}</strong>
            <small>${escapeHtml(tool.category)}</small>
          </span>
        </button>
      `;
    }).join("");

    return `
      <article class="learning-card" style="--path-accent: ${escapeHtml(path.accent)}">
        <div class="learning-copy">
          <h3>${escapeHtml(t(path.titleKey))}</h3>
          <p>${escapeHtml(t(path.bodyKey))}</p>
        </div>
        <div class="path-list">${items}</div>
      </article>
    `;
  }).join("");

  els.learningPaths.querySelectorAll("[data-path-tool]").forEach(button => {
    button.addEventListener("click", () => launchTool(button.dataset.pathTool));
  });
}

function renderTools() {
  const locked = guardLocked();
  els.toolCount.textContent = t("toolCount", { count: state.tools.length });
  els.toolGrid.innerHTML = state.tools.map(rawTool => {
    const tool = localizedTool(rawTool);
    const accent = tool.accent || "#116a67";
    const shortName = tool.shortName || tool.productName.slice(0, 3).toUpperCase();
    const icon = toolIconFor(tool.slug);
    const disabled = locked ? " disabled" : "";
    const lockedClass = locked ? " locked" : "";
    return `
      <article class="tool-card${lockedClass}" style="--tool-accent: ${escapeHtml(accent)}">
        <div class="tool-head">
          <div class="tool-badge" data-tool-icon="${escapeHtml(icon)}" aria-hidden="true"><span>${escapeHtml(shortName)}</span></div>
          <div class="tool-title">
            <h3>${escapeHtml(tool.productName)}</h3>
            <p>${escapeHtml(tool.category || "Tool")}</p>
          </div>
        </div>
        <p class="tool-description">${escapeHtml(tool.description || "")}</p>
        <button class="button primary" type="button" data-tool="${escapeHtml(tool.slug)}" data-icon="launch" aria-label="${escapeHtml(`${t("launch")} ${tool.productName}`)}"${disabled}>${escapeHtml(t("launch"))}</button>
      </article>
    `;
  }).join("");

  els.toolGrid.querySelectorAll("[data-tool]").forEach(button => {
    button.addEventListener("click", () => launchTool(button.dataset.tool));
  });
}

function render() {
  renderLearningPaths();
  renderGuard();
  renderTools();
}

async function refreshGuard() {
  const status = await window.bitlandHub.getExamStatus();
  state.guard = {
    ...state.guard,
    ...status,
    ready: true,
    error: status.error || ""
  };
}

function normalizeToolEntry(entry) {
  return typeof entry === "string" ? { dir: entry } : { ...entry };
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load ${url.pathname || url.href}`);
  }
  return response.json();
}

async function loadBrowserTools() {
  const hubConfigUrl = new URL("hub.json", window.location.href);
  const hubConfig = await fetchJson(hubConfigUrl);
  return Promise.all((hubConfig.tools || []).map(async rawEntry => {
    const entry = normalizeToolEntry(rawEntry);
    const toolBaseUrl = new URL(`${String(entry.dir).replace(/\/+$/g, "")}/`, hubConfigUrl);
    const toolConfig = await fetchJson(new URL("tool.json", toolBaseUrl));
    return {
      slug: toolConfig.slug,
      productName: toolConfig.productName || toolConfig.name || toolConfig.slug || "Bitland Tool",
      description: toolConfig.description || "",
      category: entry.category || "",
      shortName: entry.shortName || "",
      accent: entry.accent || "#116a67",
      launchUrl: new URL(toolConfig.entry || "index.html", toolBaseUrl).href
    };
  }));
}

async function loadHub() {
  if (!apiAvailable()) {
    try {
      state.tools = await loadBrowserTools();
    } catch (error) {
      state.tools = [];
      showToast(`${error.message || String(error)}. ${t("runHubLauncher")}`);
    }
    state.guard = {
      ready: true,
      available: false,
      enabled: false,
      configured: false,
      locked: false,
      requestCode: ""
    };
    render();
    return;
  }

  state.tools = await window.bitlandHub.getTools();
  await refreshGuard();
  render();
}

async function activateGuard() {
  const code = els.unlockCode.value.trim();
  if (!code) {
    setUnlockError(t("pasteUnlockCode"));
    return;
  }

  els.unlockButton.disabled = true;
  setUnlockError("");
  try {
    const result = await window.bitlandHub.activateExamGuard(code);
    if (!result.ok) {
      state.guard = {
        ...state.guard,
        ...(result.status || {}),
        ready: true,
        error: result.error || (result.status && result.status.error) || ""
      };
      render();
      return;
    }

    state.guard = {
      ...state.guard,
      ...result.status,
      ready: true,
      error: ""
    };
    els.unlockCode.value = "";
    render();
    showToast(t("unlockedToast"));
  } catch (error) {
    setUnlockError(error.message || String(error));
  } finally {
    els.unlockButton.disabled = !state.guard.configured || guardLocked() === false;
  }
}

async function launchTool(slug) {
  if (guardLocked()) {
    showToast(t("unlockFirst"));
    return;
  }

  const rawTool = state.tools.find(item => item.slug === slug);
  const tool = rawTool ? localizedTool(rawTool) : null;
  if (!apiAvailable()) {
    if (!tool || !tool.launchUrl) {
      showToast(t("unableOpen"));
      return;
    }
    window.open(tool.launchUrl, "_blank", "noopener");
    return;
  }

  try {
    const result = await window.bitlandHub.launchTool(slug);
    if (!result.ok) {
      showToast(result.error || t("unableLaunch"));
      await refreshGuard();
      render();
      return;
    }
    showToast(t("opened", { tool: tool ? tool.productName : t("tools") }));
  } catch (error) {
    showToast(error.message || String(error));
  }
}

els.unlockButton.addEventListener("click", activateGuard);
els.unlockCode.addEventListener("keydown", event => {
  if (event.key === "Enter") activateGuard();
});
els.languageSelect.addEventListener("change", () => setLanguage(els.languageSelect.value));
els.aboutButton.addEventListener("click", openAbout);
els.aboutModal.querySelectorAll("[data-about-close]").forEach(element => {
  element.addEventListener("click", closeAbout);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !els.aboutModal.classList.contains("hidden")) {
    closeAbout();
  }
});

applyTranslations();
loadHub().catch(error => {
  showToast(error.message || String(error));
});

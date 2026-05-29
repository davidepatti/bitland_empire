"use strict";

const state = {
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
  guardPill: document.getElementById("guardPill"),
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

function renderGuard() {
  const guard = state.guard;
  const locked = guardLocked();
  const ready = guardReady();

  if (ready && !guard.available) {
    els.guardPill.classList.add("good");
    els.guardPill.classList.remove("bad");
    els.guardPill.textContent = "Browser";
    els.unlockPanel.classList.add("hidden");
    setUnlockError("");
    return;
  }

  els.guardPill.classList.toggle("good", ready && !locked);
  els.guardPill.classList.toggle("bad", ready && locked);
  els.guardPill.textContent = !ready ? "Checking" : locked ? "Locked" : "Unlocked";

  els.unlockPanel.classList.toggle("hidden", !locked);
  els.requestCode.textContent = guard.requestCode || "...";
  els.unlockButton.disabled = !ready || !guard.configured;
  els.unlockCode.disabled = !ready || !guard.configured;
  els.unlockMessage.textContent = !ready
    ? "Checking this computer."
    : guard.configured
      ? "This hub must be unlocked on this computer before the tools can run."
      : "This exam build is missing its public unlock key.";

  if (guard.error) {
    setUnlockError(guard.error);
  } else if (!locked) {
    setUnlockError("");
  }
}

function renderTools() {
  const locked = guardLocked();
  els.toolCount.textContent = `${state.tools.length} tool${state.tools.length === 1 ? "" : "s"}`;
  els.toolGrid.innerHTML = state.tools.map(tool => {
    const accent = tool.accent || "#116a67";
    const shortName = tool.shortName || tool.productName.slice(0, 3).toUpperCase();
    const disabled = locked ? " disabled" : "";
    const lockedClass = locked ? " locked" : "";
    return `
      <article class="tool-card${lockedClass}" style="--tool-accent: ${escapeHtml(accent)}">
        <div class="tool-head">
          <div class="tool-badge" aria-hidden="true">${escapeHtml(shortName)}</div>
          <div class="tool-title">
            <h3>${escapeHtml(tool.productName)}</h3>
            <p>${escapeHtml(tool.category || "Tool")}</p>
          </div>
        </div>
        <p class="tool-description">${escapeHtml(tool.description || "")}</p>
        <button class="button primary" type="button" data-tool="${escapeHtml(tool.slug)}" data-icon=">"${disabled}>Launch</button>
      </article>
    `;
  }).join("");

  els.toolGrid.querySelectorAll("[data-tool]").forEach(button => {
    button.addEventListener("click", () => launchTool(button.dataset.tool));
  });
}

function render() {
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
      showToast(`${error.message || String(error)}. Run hub/launch.sh from this package.`);
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
    setUnlockError("Paste the unlock code supplied by the instructor.");
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
    showToast("Bitland Empire unlocked.");
  } catch (error) {
    setUnlockError(error.message || String(error));
  } finally {
    els.unlockButton.disabled = !state.guard.configured || guardLocked() === false;
  }
}

async function launchTool(slug) {
  if (guardLocked()) {
    showToast("Unlock Bitland Empire first.");
    return;
  }

  const tool = state.tools.find(item => item.slug === slug);
  if (!apiAvailable()) {
    if (!tool || !tool.launchUrl) {
      showToast("Unable to open tool.");
      return;
    }
    window.open(tool.launchUrl, "_blank", "noopener");
    return;
  }

  try {
    const result = await window.bitlandHub.launchTool(slug);
    if (!result.ok) {
      showToast(result.error || "Unable to launch tool.");
      await refreshGuard();
      render();
      return;
    }
    showToast(`${tool ? tool.productName : "Tool"} opened.`);
  } catch (error) {
    showToast(error.message || String(error));
  }
}

els.unlockButton.addEventListener("click", activateGuard);
els.unlockCode.addEventListener("keydown", event => {
  if (event.key === "Enter") activateGuard();
});

loadHub().catch(error => {
  showToast(error.message || String(error));
});

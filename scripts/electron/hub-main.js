const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const fs = require("node:fs");
const path = require("node:path");
const { createExamGuard } = require("./exam-guard");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function defaultHubDir() {
  const packagedHubDir = path.join(__dirname, "hub");
  if (fs.existsSync(path.join(packagedHubDir, "hub.json"))) {
    return packagedHubDir;
  }
  return path.resolve(__dirname, "..", "..", "hub");
}

function resolveHubDir() {
  const explicitDir = process.env.BITLAND_HUB_DIR || process.argv.slice(2).find(arg => !arg.startsWith("-"));
  return explicitDir ? path.resolve(process.cwd(), explicitDir) : defaultHubDir();
}

function normalizeToolEntry(entry) {
  return typeof entry === "string" ? { dir: entry } : { ...entry };
}

function loadTools(config, hubDir) {
  return (config.tools || []).map(rawEntry => {
    const entry = normalizeToolEntry(rawEntry);
    const toolDir = path.resolve(hubDir, entry.dir);
    const toolConfigPath = path.join(toolDir, "tool.json");
    const toolConfig = readJson(toolConfigPath);
    return {
      dir: toolDir,
      config: {
        entry: "index.html",
        productName: toolConfig.name || toolConfig.slug || "Bitland Tool",
        electron: {},
        ...toolConfig
      },
      meta: {
        accent: entry.accent || "#116a67",
        category: entry.category || "",
        shortName: entry.shortName || ""
      }
    };
  });
}

function loadHub() {
  const hubDir = resolveHubDir();
  const configPath = process.env.BITLAND_HUB_CONFIG || path.join(hubDir, "hub.json");
  const config = readJson(configPath);
  const normalizedConfig = {
    entry: "index.html",
    productName: config.name || config.slug || "Bitland Empire",
    electron: {},
    ...config
  };

  return {
    dir: hubDir,
    config: normalizedConfig,
    tools: loadTools(normalizedConfig, hubDir)
  };
}

const hub = loadHub();
const examGuard = createExamGuard({ app, config: hub.config, dir: hub.dir });
const toolWindows = new Map();

function publicToolList() {
  return hub.tools.map(tool => ({
    slug: tool.config.slug,
    productName: tool.config.productName,
    description: tool.config.description || "",
    category: tool.meta.category,
    shortName: tool.meta.shortName,
    accent: tool.meta.accent
  }));
}

function applyExternalLinkPolicy(window) {
  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

function windowOptionsFor(config, preloadPath) {
  const settings = config.electron || {};
  return {
    width: settings.width || 1280,
    height: settings.height || 860,
    minWidth: settings.minWidth || 960,
    minHeight: settings.minHeight || 640,
    title: config.productName,
    backgroundColor: settings.backgroundColor || "#ffffff",
    autoHideMenuBar: settings.autoHideMenuBar !== false,
    webPreferences: {
      ...(fs.existsSync(preloadPath) ? { preload: preloadPath } : {}),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  };
}

function createHubWindow() {
  const preloadPath = path.join(__dirname, "hub-preload.js");
  const hubWindow = new BrowserWindow(windowOptionsFor(hub.config, preloadPath));
  hubWindow.loadFile(path.join(hub.dir, hub.config.entry));
  applyExternalLinkPolicy(hubWindow);
}

function findTool(slug) {
  return hub.tools.find(tool => tool.config.slug === slug);
}

function launchTool(slug) {
  const status = examGuard.status();
  if (status.enabled && status.locked) {
    return { ok: false, error: "Bitland Empire is locked.", status };
  }

  const tool = findTool(slug);
  if (!tool) {
    return { ok: false, error: `Unknown tool: ${slug}` };
  }

  const existingWindow = toolWindows.get(slug);
  if (existingWindow && !existingWindow.isDestroyed()) {
    existingWindow.focus();
    return { ok: true, status };
  }

  const preloadPath = path.join(__dirname, "preload.js");
  const toolWindow = new BrowserWindow(windowOptionsFor(tool.config, preloadPath));
  toolWindow.loadFile(path.join(tool.dir, tool.config.entry));
  toolWindow.on("closed", () => {
    toolWindows.delete(slug);
  });
  applyExternalLinkPolicy(toolWindow);
  toolWindows.set(slug, toolWindow);
  return { ok: true, status };
}

ipcMain.handle("hub:get-tools", () => publicToolList());
ipcMain.handle("hub:launch-tool", (_event, slug) => launchTool(slug));
ipcMain.handle("hub:get-exam-status", () => examGuard.status());
ipcMain.handle("hub:activate-exam-guard", (_event, code) => {
  try {
    return { ok: true, status: examGuard.activate(code) };
  } catch (error) {
    return { ok: false, error: error.message, status: examGuard.status() };
  }
});

ipcMain.handle("exam-guard:get-status", () => examGuard.status());
ipcMain.handle("exam-guard:activate", (_event, code) => {
  try {
    return { ok: true, status: examGuard.activate(code) };
  } catch (error) {
    return { ok: false, error: error.message, status: examGuard.status() };
  }
});

app.setName(hub.config.productName);

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createHubWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createHubWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

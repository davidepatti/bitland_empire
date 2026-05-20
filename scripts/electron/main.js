const { app, BrowserWindow, Menu, shell } = require("electron");
const fs = require("node:fs");
const path = require("node:path");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveToolDir() {
  const explicitDir = process.env.BITLAND_TOOL_DIR || process.argv.slice(2).find(arg => !arg.startsWith("-"));
  return explicitDir ? path.resolve(process.cwd(), explicitDir) : __dirname;
}

function loadTool() {
  const toolDir = resolveToolDir();
  const configPath = process.env.BITLAND_TOOL_CONFIG || path.join(toolDir, "tool.json");
  const config = readJson(configPath);
  return {
    dir: toolDir,
    config: {
      entry: "index.html",
      productName: config.name || config.slug || "Bitland Tool",
      electron: {},
      ...config
    }
  };
}

const tool = loadTool();

function createWindow() {
  const settings = tool.config.electron || {};
  const mainWindow = new BrowserWindow({
    width: settings.width || 1280,
    height: settings.height || 860,
    minWidth: settings.minWidth || 960,
    minHeight: settings.minHeight || 640,
    title: tool.config.productName,
    backgroundColor: settings.backgroundColor || "#ffffff",
    autoHideMenuBar: settings.autoHideMenuBar !== false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(tool.dir, tool.config.entry));

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.setName(tool.config.productName);

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

"use strict";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bitlandHub", {
  getTools: () => ipcRenderer.invoke("hub:get-tools"),
  launchTool: slug => ipcRenderer.invoke("hub:launch-tool", slug),
  getExamStatus: () => ipcRenderer.invoke("hub:get-exam-status"),
  activateExamGuard: code => ipcRenderer.invoke("hub:activate-exam-guard", code)
});

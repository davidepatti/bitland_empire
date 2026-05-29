"use strict";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("qmcExamGuard", {
  getStatus: () => ipcRenderer.invoke("exam-guard:get-status"),
  activate: code => ipcRenderer.invoke("exam-guard:activate", code)
});

contextBridge.exposeInMainWorld("bitlandExamGuard", {
  getStatus: () => ipcRenderer.invoke("exam-guard:get-status"),
  activate: code => ipcRenderer.invoke("exam-guard:activate", code)
});

"use strict";

const { execFileSync } = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

function base64Url(buffer) {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const normalized = String(value).replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - normalized.length % 4) % 4);
  return Buffer.from(normalized + padding, "base64");
}

function base32(buffer, length) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = 0;
  let bits = 0;
  let output = "";

  for (const byte of buffer) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5 && output.length < length) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
    if (output.length >= length) break;
  }

  if (output.length < length && bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }

  return output.padEnd(length, alphabet[0]).slice(0, length);
}

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest();
}

function readOptionalFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8").trim();
  } catch (error) {
    return "";
  }
}

function readMacMachineId() {
  const output = execFileSync("ioreg", ["-rd1", "-c", "IOPlatformExpertDevice"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  });
  const match = output.match(/"IOPlatformUUID"\s=\s"([^"]+)"/);
  return match ? match[1] : "";
}

function readWindowsMachineId() {
  const output = execFileSync("reg", ["query", "HKLM\\SOFTWARE\\Microsoft\\Cryptography", "/v", "MachineGuid"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  });
  const match = output.match(/MachineGuid\s+REG_\w+\s+([^\s]+)/i);
  return match ? match[1] : "";
}

function readLinuxMachineId() {
  return readOptionalFile("/etc/machine-id") || readOptionalFile("/var/lib/dbus/machine-id");
}

function machineFingerprint(identity) {
  let machineId = "";
  try {
    if (process.platform === "darwin") machineId = readMacMachineId();
    if (process.platform === "win32") machineId = readWindowsMachineId();
    if (process.platform === "linux") machineId = readLinuxMachineId();
  } catch (error) {
    machineId = "";
  }

  let username = "";
  try {
    username = os.userInfo().username;
  } catch (error) {
    username = "";
  }

  const cpu = os.cpus()[0] ? os.cpus()[0].model : "";
  return [
    identity.appId || identity.slug || identity.productName || "bitland-tool",
    process.platform,
    process.arch,
    machineId || "no-machine-id",
    os.hostname(),
    username,
    os.homedir(),
    cpu
  ].filter(Boolean).join("|");
}

function normalizeKeyText(value) {
  return String(value || "").replace(/\\n/g, "\n").trim();
}

function resolveTextOrFile(value, baseDir) {
  if (!value) return "";
  const normalized = normalizeKeyText(value);
  if (normalized.includes("BEGIN PUBLIC KEY")) return normalized;

  const filePath = path.isAbsolute(normalized) ? normalized : path.join(baseDir, normalized);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf8").trim();
  }

  return "";
}

function resolveExamPublicKey(config, baseDir) {
  if (!config) return "";
  if (config.publicKeyEnv && process.env[config.publicKeyEnv]) {
    return resolveTextOrFile(process.env[config.publicKeyEnv], process.cwd());
  }
  return resolveTextOrFile(config.publicKey || config.publicKeyFile, baseDir);
}

function formatRequestCode(prefix, token) {
  return `${prefix}-${token.match(/.{1,4}/g).join("-")}`;
}

function parseUnlockCode(code, options = {}) {
  const compact = String(code || "").trim().replace(/\s+/g, "");
  const parts = compact.split(".");
  const acceptedPrefixes = options.acceptedPrefixes || [options.unlockCodePrefix || "QMC1"];
  if (parts.length !== 3 || !acceptedPrefixes.includes(parts[0])) {
    throw new Error("Unlock code has an unsupported format.");
  }

  const payloadJson = fromBase64Url(parts[1]).toString("utf8");
  const payload = JSON.parse(payloadJson);
  const signature = fromBase64Url(parts[2]);
  return { compact, payloadJson, payload, signature };
}

function createExamGuard({ app, config, dir }) {
  const rawConfig = config.examIntegrity || {};
  const enabled = rawConfig.enabled === true;
  const publicKey = resolveExamPublicKey(rawConfig, dir);
  const requestPrefix = rawConfig.requestPrefix || "QMC";
  const requestCode = formatRequestCode(requestPrefix, base32(sha256(machineFingerprint(config)), rawConfig.requestCodeLength || 20));
  const unlockCodePrefix = rawConfig.unlockCodePrefix || "QMC1";
  const acceptedPrefixes = Array.from(new Set([
    unlockCodePrefix,
    ...(Array.isArray(rawConfig.acceptedUnlockCodePrefixes) ? rawConfig.acceptedUnlockCodePrefixes : [])
  ]));

  function activationPath() {
    return path.join(app.getPath("userData"), rawConfig.activationFile || "exam-guard-activation.json");
  }

  function readActivation() {
    try {
      return JSON.parse(fs.readFileSync(activationPath(), "utf8"));
    } catch (error) {
      return null;
    }
  }

  function writeActivation(record) {
    fs.mkdirSync(path.dirname(activationPath()), { recursive: true });
    fs.writeFileSync(activationPath(), `${JSON.stringify(record, null, 2)}\n`);
  }

  function validatePayload(payload) {
    if (!payload || payload.v !== 1) throw new Error("Unlock code version is not supported.");
    if (payload.tool !== config.slug) throw new Error("Unlock code is for a different app.");
    if (payload.requestCode !== requestCode) throw new Error("Unlock code is for a different computer.");
    if (payload.expiresAt && Date.parse(payload.expiresAt) < Date.now()) throw new Error("Unlock code has expired.");
  }

  function verifyCode(code) {
    if (!publicKey) throw new Error("This exam build is missing its public unlock key.");
    const parsed = parseUnlockCode(code, { acceptedPrefixes });
    const validSignature = crypto.verify(null, Buffer.from(parsed.payloadJson), publicKey, parsed.signature);
    if (!validSignature) throw new Error("Unlock code signature is invalid.");
    validatePayload(parsed.payload);
    return parsed;
  }

  function activationDetails(payload) {
    if (!payload) return null;
    return {
      studentId: payload.studentId || "",
      issuedAt: payload.issuedAt || "",
      expiresAt: payload.expiresAt || ""
    };
  }

  function status() {
    const base = {
      available: true,
      enabled,
      configured: Boolean(publicKey),
      locked: false,
      requestCode,
      watermarkEnabled: rawConfig.watermark !== false,
      watermarkSeed: requestCode,
      activation: null
    };

    if (!enabled) return base;
    if (!publicKey) {
      return {
        ...base,
        configured: false,
        locked: rawConfig.lockWhenUnconfigured === true,
        error: "The exam guard is enabled, but no public unlock key is configured."
      };
    }

    const activation = readActivation();
    if (!activation || !activation.code) {
      return { ...base, locked: true };
    }

    try {
      const parsed = verifyCode(activation.code);
      return {
        ...base,
        locked: false,
        watermarkSeed: parsed.payload.watermarkSeed || `${parsed.payload.studentId || ""}|${requestCode}`,
        activation: activationDetails(parsed.payload)
      };
    } catch (error) {
      return {
        ...base,
        locked: true,
        error: error.message
      };
    }
  }

  function activate(code) {
    const parsed = verifyCode(code);
    writeActivation({
      code: parsed.compact,
      activatedAt: new Date().toISOString(),
      payload: parsed.payload
    });
    return status();
  }

  return { activate, status };
}

module.exports = {
  createExamGuard,
  resolveTextOrFile,
  resolveExamPublicKey
};

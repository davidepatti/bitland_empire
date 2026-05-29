#!/usr/bin/env node

"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

function usage() {
  console.log(`Usage:
  node scripts/electron/qmc-exam-code.js keygen --public <public.pem> --private <private.pem>
  node scripts/electron/qmc-exam-code.js unlock --private <private.pem> --student <id> --request <QMC-...> [--expires <iso-date>] [--seed <watermark-seed>]

Examples:
  node scripts/electron/qmc-exam-code.js keygen --public private/qmc-public.pem --private private/qmc-private.pem
  QMC_SIM_UNLOCK_PUBLIC_KEY=private/qmc-public.pem npm run package:qmc-sim
  node scripts/electron/qmc-exam-code.js unlock --private private/qmc-private.pem --student s12345 --request QMC-ABCD-EFGH-JKLM-NPQR-STUV
`);
}

function readArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function requireArg(args, key) {
  if (!args[key]) {
    throw new Error(`Missing --${key}`);
  }
  return String(args[key]);
}

function base64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function ensureParent(filePath) {
  fs.mkdirSync(path.dirname(path.resolve(filePath)), { recursive: true });
}

function keygen(args) {
  const publicPath = requireArg(args, "public");
  const privatePath = requireArg(args, "private");
  const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");

  ensureParent(publicPath);
  ensureParent(privatePath);
  fs.writeFileSync(publicPath, publicKey.export({ type: "spki", format: "pem" }));
  fs.writeFileSync(privatePath, privateKey.export({ type: "pkcs8", format: "pem" }), { mode: 0o600 });

  console.log(`Public key:  ${path.resolve(publicPath)}`);
  console.log(`Private key: ${path.resolve(privatePath)}`);
  console.log("Keep the private key outside the package you give to students.");
}

function normalizeExpires(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid --expires value: ${value}`);
  }
  return date.toISOString();
}

function unlock(args) {
  const privatePath = requireArg(args, "private");
  const studentId = requireArg(args, "student");
  const requestCode = requireArg(args, "request").toUpperCase();
  const privateKey = fs.readFileSync(privatePath, "utf8");
  const payload = {
    v: 1,
    tool: args.tool || "qmc-sim",
    studentId,
    requestCode,
    issuedAt: new Date().toISOString(),
    watermarkSeed: args.seed || base64Url(crypto.randomBytes(16))
  };
  const expiresAt = normalizeExpires(args.expires);
  if (expiresAt) payload.expiresAt = expiresAt;

  const payloadJson = JSON.stringify(payload);
  const signature = crypto.sign(null, Buffer.from(payloadJson), privateKey);
  const code = `QMC1.${base64Url(payloadJson)}.${base64Url(signature)}`;

  console.log(code);
  console.error(`Student: ${studentId}`);
  console.error(`Request: ${requestCode}`);
  console.error(`Watermark seed: ${payload.watermarkSeed}`);
  if (payload.expiresAt) console.error(`Expires: ${payload.expiresAt}`);
}

function main() {
  const [command, ...rest] = process.argv.slice(2);
  const args = readArgs(rest);

  if (command === "keygen") {
    keygen(args);
    return;
  }
  if (command === "unlock") {
    unlock(args);
    return;
  }

  usage();
  process.exitCode = command ? 1 : 0;
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

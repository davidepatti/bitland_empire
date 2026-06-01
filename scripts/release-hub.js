#!/usr/bin/env node

"use strict";

const { execFileSync, spawnSync } = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const hubDir = path.join(repoRoot, "hub");
const releaseDir = path.join(hubDir, "release");
const releaseNotesFile = "GITHUB_RELEASE_BODY.md";
const helperFiles = new Set([releaseNotesFile]);
const buildMetadataFiles = new Set(["builder-debug.yml", "builder-effective-config.yaml"]);

function usage() {
  console.log(`Usage:
  npm run release:hub -- [options] [electron-builder args]

Options:
  --skip-check          Do not run npm run check.
  --skip-build          Do not build; verify the existing hub/release folder.
  --github-draft        Create a draft GitHub Release with gh after verification.
  --tag <tag>           Override the GitHub release tag. Default: v<hub version>.
  --title <title>       Override the GitHub release title.
  --help                Show this help.

Examples:
  npm run release:hub
  npm run release:hub -- --mac
  npm run release:hub -- --skip-build
  npm run release:hub -- --github-draft
`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseArgs(argv) {
  const options = {
    runCheck: true,
    runBuild: true,
    githubDraft: false,
    tag: "",
    title: "",
    builderArgs: []
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help") {
      options.help = true;
    } else if (arg === "--skip-check") {
      options.runCheck = false;
    } else if (arg === "--skip-build") {
      options.runBuild = false;
    } else if (arg === "--github-draft") {
      options.githubDraft = true;
    } else if (arg === "--tag") {
      options.tag = argv[index + 1] || "";
      index += 1;
    } else if (arg === "--title") {
      options.title = argv[index + 1] || "";
      index += 1;
    } else {
      options.builderArgs.push(arg);
    }
  }

  return options;
}

function npmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function run(command, args, options = {}) {
  console.log(`\n$ ${[command, ...args].join(" ")}`);
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: "inherit",
    env: process.env,
    shell: false,
    ...options
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} exited with status ${result.status}`);
  }
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function fileSize(filePath) {
  const bytes = fs.statSync(filePath).size;
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function parseChecksums(checksumPath) {
  const raw = fs.readFileSync(checksumPath, "utf8").trim();
  if (!raw) throw new Error(`${checksumPath} is empty.`);

  return raw.split(/\r?\n/).map(line => {
    const match = line.match(/^([a-fA-F0-9]{64})\s+\*?(.+)$/);
    if (!match) throw new Error(`Invalid checksum line: ${line}`);
    return {
      hash: match[1].toLowerCase(),
      file: match[2]
    };
  });
}

function verifyRelease() {
  if (!fs.existsSync(releaseDir)) {
    throw new Error(`Missing release directory: ${releaseDir}`);
  }

  const checksumPath = path.join(releaseDir, "SHA256SUMS.txt");
  if (!fs.existsSync(checksumPath)) {
    throw new Error(`Missing checksum file: ${checksumPath}`);
  }

  const entries = parseChecksums(checksumPath);
  const listedFiles = new Set(entries.map(entry => entry.file));
  for (const entry of entries) {
    const filePath = path.join(releaseDir, entry.file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Checksum lists a missing file: ${entry.file}`);
    }
    const actual = sha256(filePath);
    if (actual !== entry.hash) {
      throw new Error(`Checksum mismatch for ${entry.file}`);
    }
  }

  const unlisted = fs.readdirSync(releaseDir)
    .filter(file => fs.statSync(path.join(releaseDir, file)).isFile())
    .filter(file => file !== "SHA256SUMS.txt" && !helperFiles.has(file) && !listedFiles.has(file));

  if (unlisted.length) {
    console.warn(`Warning: release folder contains unlisted files: ${unlisted.join(", ")}`);
  }

  return entries;
}

function distributionEntries(entries) {
  const distributable = entries.filter(entry => !buildMetadataFiles.has(entry.file));
  if (!distributable.some(entry => entry.file === "SHA256SUMS.txt")) {
    distributable.push({ file: "SHA256SUMS.txt", hash: sha256(path.join(releaseDir, "SHA256SUMS.txt")) });
  }
  return distributable;
}

function gitCommit() {
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch (error) {
    return "unknown";
  }
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

function writeReleaseBody(hub, entries, tag) {
  const commit = gitCommit();
  const lines = [
    `# ${hub.productName} ${hub.version}`,
    "",
    `Release tag: ${tag}`,
    `Build date: ${new Date().toISOString()}`,
    `Commit: ${commit}`,
    "",
    "Guarded exam release. Distribute these hub artifacts only; standalone tool packages are not exam-guarded.",
    "",
    "Students send the displayed BIT-... computer code to the instructor. Instructors return the signed unlock code generated with ./unlock.",
    "",
    "## Assets",
    ""
  ];

  for (const entry of entries) {
    const filePath = path.join(releaseDir, entry.file);
    lines.push(`- ${entry.file} (${fileSize(filePath)})`);
    lines.push(`  SHA256: ${entry.hash}`);
  }

  const notesPath = path.join(releaseDir, releaseNotesFile);
  fs.writeFileSync(notesPath, `${lines.join("\n")}\n`);
  return notesPath;
}

function printSummary(hub, entries, notesPath, tag, title) {
  console.log("\nRelease ready.");
  console.log(`Hub: ${hub.productName} ${hub.version}`);
  console.log(`Folder: ${releaseDir}`);
  console.log(`Notes: ${notesPath}`);
  console.log("\nUpload these files as GitHub Release assets:");
  for (const entry of entries) {
    const filePath = path.join(releaseDir, entry.file);
    console.log(`- ${entry.file} (${fileSize(filePath)})`);
  }

  const assetArgs = entries.map(entry => shellQuote(path.join("hub", "release", entry.file))).join(" ");
  const command = [
    "gh release create",
    shellQuote(tag),
    assetArgs,
    "--draft",
    "--title",
    shellQuote(title),
    "--notes-file",
    shellQuote(path.join("hub", "release", releaseNotesFile))
  ].join(" ");

  console.log("\nOptional GitHub CLI command:");
  console.log(command);
}

function createGithubDraft(tag, title, entries) {
  const assetPaths = entries.map(entry => path.join(releaseDir, entry.file));
  run("gh", [
    "release",
    "create",
    tag,
    ...assetPaths,
    "--draft",
    "--title",
    title,
    "--notes-file",
    path.join(releaseDir, releaseNotesFile)
  ]);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    return;
  }

  const hub = readJson(path.join(hubDir, "hub.json"));
  const tag = options.tag || `v${hub.version || "1.0.0"}`;
  const title = options.title || `${hub.productName || "Bitland Empire"} ${hub.version || "1.0.0"}`;

  if (options.runCheck) {
    run(npmCommand(), ["run", "check"]);
  }

  if (options.runBuild) {
    const args = ["run", "package:hub"];
    if (options.builderArgs.length) args.push("--", ...options.builderArgs);
    run(npmCommand(), args);
  }

  const entries = verifyRelease();
  const uploadEntries = distributionEntries(entries);
  const notesPath = writeReleaseBody(hub, uploadEntries, tag);
  printSummary(hub, uploadEntries, notesPath, tag, title);

  if (options.githubDraft) {
    createGithubDraft(tag, title, uploadEntries);
  }
}

try {
  main();
} catch (error) {
  console.error(`\nRelease failed: ${error.message}`);
  process.exitCode = 1;
}

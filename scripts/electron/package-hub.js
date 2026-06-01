#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { resolveTextOrFile } = require("./exam-guard");

const repoRoot = path.resolve(__dirname, "..", "..");
const hubDir = path.join(repoRoot, "hub");
const electronBuilderBin = path.join(repoRoot, "node_modules", ".bin", process.platform === "win32" ? "electron-builder.cmd" : "electron-builder");

function usage() {
  console.error("Usage: node scripts/electron/package-hub.js [--dry-run] [electron-builder args]");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function copyPath(source, destination) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyPath(path.join(source, entry), path.join(destination, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function removePath(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

function lockedElectronVersion() {
  const lockPath = path.join(repoRoot, "package-lock.json");
  if (fs.existsSync(lockPath)) {
    const lock = readJson(lockPath);
    const locked = lock.packages && lock.packages["node_modules/electron"];
    if (locked && locked.version) return locked.version;
  }

  const installedPackage = path.join(repoRoot, "node_modules", "electron", "package.json");
  if (fs.existsSync(installedPackage)) {
    return readJson(installedPackage).version;
  }

  return null;
}

function rootDevDependencies() {
  const dependencies = { ...readJson(path.join(repoRoot, "package.json")).devDependencies };
  const exactElectronVersion = lockedElectronVersion();
  if (exactElectronVersion) {
    dependencies.electron = exactElectronVersion;
  }
  return dependencies;
}

function normalizeToolEntry(entry) {
  return typeof entry === "string" ? { dir: entry } : { ...entry };
}

function validateWebAssets(owner, ownerDir, configPath) {
  if (!Array.isArray(owner.webAssets) || !owner.webAssets.length) {
    throw new Error(`Expected non-empty webAssets array in ${configPath}`);
  }

  for (const asset of owner.webAssets) {
    const source = path.join(ownerDir, asset);
    if (!fs.existsSync(source)) {
      throw new Error(`Missing asset listed in ${configPath}: ${asset}`);
    }
  }
}

function validateHub(hub, configPath) {
  for (const key of ["slug", "productName", "appId"]) {
    if (!hub[key]) {
      throw new Error(`Missing required key "${key}" in ${configPath}`);
    }
  }
  validateWebAssets(hub, hubDir, configPath);
  if (!Array.isArray(hub.tools) || !hub.tools.length) {
    throw new Error(`Expected non-empty tools array in ${configPath}`);
  }
}

function validateTool(tool, configPath) {
  for (const key of ["slug", "productName", "appId"]) {
    if (!tool[key]) {
      throw new Error(`Missing required key "${key}" in ${configPath}`);
    }
  }
  validateWebAssets(tool, path.dirname(configPath), configPath);
}

function materializeHubConfig(hub, options = {}) {
  const packagedHub = JSON.parse(JSON.stringify(hub));
  const guard = packagedHub.examIntegrity;
  if (!guard || guard.enabled !== true) return packagedHub;

  const publicKey = guard.publicKeyEnv && process.env[guard.publicKeyEnv]
    ? resolveTextOrFile(process.env[guard.publicKeyEnv], process.cwd())
    : resolveTextOrFile(guard.publicKey || guard.publicKeyFile, hubDir);

  if (publicKey) {
    guard.publicKey = publicKey;
    delete guard.publicKeyFile;
  } else if (!options.dryRun && guard.lockWhenUnconfigured === true) {
    throw new Error([
      `Exam integrity is enabled for ${hub.slug}, but no public key was found.`,
      `Create it once with: node scripts/electron/qmc-exam-code.js keygen --public private/qmc-public.pem --private private/qmc-private.pem`,
      `Then run the normal hub build command again.`
    ].join("\n"));
  }

  return packagedHub;
}

function packageJsonFor(hub) {
  const electron = hub.electron || {};
  const exactElectronVersion = electron.electronVersion || lockedElectronVersion();
  return {
    name: hub.slug,
    version: hub.version || "1.0.0",
    description: hub.description || "",
    main: "main.js",
    author: hub.author || "PIPELINESIM",
    license: hub.license || "UNLICENSED",
    private: true,
    build: {
      appId: hub.appId,
      productName: hub.productName,
      ...(exactElectronVersion ? { electronVersion: exactElectronVersion } : {}),
      artifactName: electron.artifactName || "${productName}-${version}-${os}-${arch}.${ext}",
      directories: {
        output: "release"
      },
      files: [
        "main.js",
        "hub-preload.js",
        "preload.js",
        "exam-guard.js",
        "after-pack.js",
        "package.json",
        "hub/**/*",
        "tools/**/*"
      ],
      asar: true,
      afterPack: "after-pack.js",
      mac: {
        category: electron.macCategory || "public.app-category.education",
        target: electron.macTargets || [
          {
            target: "dmg",
            arch: ["arm64"]
          },
          {
            target: "zip",
            arch: ["arm64"]
          }
        ]
      },
      win: {
        target: electron.winTargets || [
          {
            target: "zip",
            arch: ["x64"]
          }
        ]
      },
      linux: {
        category: electron.linuxCategory || "Education",
        target: electron.linuxTargets || [
          {
            target: "tar.gz",
            arch: ["x64"]
          }
        ]
      }
    },
    devDependencies: rootDevDependencies()
  };
}

function writeChecksums(releaseDir) {
  const files = fs.readdirSync(releaseDir)
    .filter(file => file !== "SHA256SUMS.txt" && fs.statSync(path.join(releaseDir, file)).isFile())
    .sort();
  const lines = files.map(file => {
    const data = fs.readFileSync(path.join(releaseDir, file));
    return `${crypto.createHash("sha256").update(data).digest("hex")}  ${file}`;
  });
  fs.writeFileSync(path.join(releaseDir, "SHA256SUMS.txt"), `${lines.join("\n")}\n`);
}

function stageHubAssets(hub, packagedHub, stageDir) {
  const stageHubDir = path.join(stageDir, "hub");
  for (const asset of hub.webAssets || []) {
    copyPath(path.join(hubDir, asset), path.join(stageHubDir, asset));
  }
  writeJson(path.join(stageHubDir, "hub.json"), packagedHub);
}

function stageTool(rawEntry, stageDir) {
  const entry = normalizeToolEntry(rawEntry);
  const toolDir = path.resolve(hubDir, entry.dir);
  const toolConfigPath = path.join(toolDir, "tool.json");
  const tool = readJson(toolConfigPath);
  validateTool(tool, toolConfigPath);

  const stageToolDir = path.join(stageDir, "tools", tool.slug);
  for (const asset of tool.webAssets || []) {
    copyPath(path.join(toolDir, asset), path.join(stageToolDir, asset));
  }

  const packagedTool = { ...tool };
  delete packagedTool.examIntegrity;
  writeJson(path.join(stageToolDir, "tool.json"), packagedTool);

  return {
    ...entry,
    dir: `../tools/${tool.slug}`
  };
}

const rawBuilderArgs = process.argv.slice(2);
if (rawBuilderArgs.includes("--help")) {
  usage();
  process.exit(0);
}

const dryRun = rawBuilderArgs.includes("--dry-run");
const builderArgs = rawBuilderArgs.filter(arg => arg !== "--dry-run");

if (!dryRun && !fs.existsSync(electronBuilderBin)) {
  console.error("electron-builder is not installed. Run `npm install` from the repository root first.");
  process.exit(1);
}

const hubConfigPath = path.join(hubDir, "hub.json");
const hub = readJson(hubConfigPath);
validateHub(hub, hubConfigPath);
const packagedHub = materializeHubConfig(hub, { dryRun });
const buildRoot = fs.mkdtempSync(path.join(os.tmpdir(), `${hub.slug}-build-`));
const stageDir = path.join(buildRoot, "source");
const targetArgs = builderArgs.length ? builderArgs : ["--mac", "--win", "--linux"];

try {
  fs.mkdirSync(stageDir, { recursive: true });

  packagedHub.tools = hub.tools.map(entry => stageTool(entry, stageDir));
  stageHubAssets(hub, packagedHub, stageDir);
  copyPath(path.join(__dirname, "hub-main.js"), path.join(stageDir, "main.js"));
  copyPath(path.join(__dirname, "hub-preload.js"), path.join(stageDir, "hub-preload.js"));
  copyPath(path.join(__dirname, "preload.js"), path.join(stageDir, "preload.js"));
  copyPath(path.join(__dirname, "exam-guard.js"), path.join(stageDir, "exam-guard.js"));
  copyPath(path.join(__dirname, "after-pack.js"), path.join(stageDir, "after-pack.js"));
  writeJson(path.join(stageDir, "package.json"), packageJsonFor(packagedHub));

  if (dryRun) {
    console.log(`Validated Electron package staging for ${hub.slug}.`);
    process.exitCode = 0;
    return;
  }

  if (process.platform === "darwin") {
    try {
      execFileSync("xattr", ["-cr", stageDir], { stdio: "inherit" });
    } catch (error) {
      console.warn(`Unable to clear staging extended attributes: ${error.message}`);
    }
  }

  execFileSync(electronBuilderBin, targetArgs, {
    cwd: stageDir,
    stdio: "inherit",
    env: {
      ...process.env,
      ELECTRON_CACHE: path.join(buildRoot, "cache", "electron"),
      ELECTRON_BUILDER_CACHE: path.join(buildRoot, "cache", "electron-builder")
    }
  });

  const stagedRelease = path.join(stageDir, "release");
  const finalRelease = path.join(hubDir, "release");
  removePath(finalRelease);
  fs.mkdirSync(finalRelease, { recursive: true });

  for (const file of fs.readdirSync(stagedRelease)) {
    const source = path.join(stagedRelease, file);
    if (fs.statSync(source).isFile()) {
      copyPath(source, path.join(finalRelease, file));
    }
  }

  writeChecksums(finalRelease);
  console.log(`\nPackaged ${hub.productName} to ${finalRelease}`);
} finally {
  removePath(buildRoot);
}

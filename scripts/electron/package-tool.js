#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..", "..");
const sharedMain = path.join(__dirname, "main.js");
const sharedPreload = path.join(__dirname, "preload.js");
const sharedAfterPack = path.join(__dirname, "after-pack.js");
const electronBuilderBin = path.join(repoRoot, "node_modules", ".bin", process.platform === "win32" ? "electron-builder.cmd" : "electron-builder");

function usage() {
  console.error("Usage: node scripts/electron/package-tool.js <tool-dir> [--dry-run] [electron-builder args]");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
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

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
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

function materializeToolConfig(tool, toolDir, options = {}) {
  const packagedTool = JSON.parse(JSON.stringify(tool));
  const guard = packagedTool.examIntegrity;
  if (!guard || guard.enabled !== true) return packagedTool;

  const publicKey = guard.publicKeyEnv && process.env[guard.publicKeyEnv]
    ? resolveTextOrFile(process.env[guard.publicKeyEnv], process.cwd())
    : resolveTextOrFile(guard.publicKey || guard.publicKeyFile, toolDir);

  if (publicKey) {
    guard.publicKey = publicKey;
    delete guard.publicKeyFile;
  } else if (!options.dryRun && guard.lockWhenUnconfigured === true) {
    throw new Error([
      `Exam integrity is enabled for ${tool.slug}, but no public key was found.`,
      `Create it once with: node scripts/electron/qmc-exam-code.js keygen --public private/qmc-public.pem --private private/qmc-private.pem`,
      `Then run the normal build command again.`
    ].join("\n"));
  }

  return packagedTool;
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

function packageJsonFor(tool) {
  const electron = tool.electron || {};
  const exactElectronVersion = electron.electronVersion || lockedElectronVersion();
  return {
    name: tool.slug,
    version: tool.version || "1.0.0",
    description: tool.description || "",
    main: "main.js",
    author: tool.author || "PIPELINESIM",
    license: tool.license || "UNLICENSED",
    private: true,
    build: {
      appId: tool.appId,
      productName: tool.productName,
      ...(exactElectronVersion ? { electronVersion: exactElectronVersion } : {}),
      artifactName: electron.artifactName || "${productName}-${version}-${os}-${arch}.${ext}",
      directories: {
        output: "release"
      },
      files: [
        ...(tool.webAssets || []),
        "main.js",
        "preload.js",
        "tool.json",
        "package.json"
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

function validateTool(tool, configPath) {
  for (const key of ["slug", "productName", "appId"]) {
    if (!tool[key]) {
      throw new Error(`Missing required key "${key}" in ${configPath}`);
    }
  }
  if (!Array.isArray(tool.webAssets) || !tool.webAssets.length) {
    throw new Error(`Expected non-empty webAssets array in ${configPath}`);
  }
}

function writeChecksums(releaseDir) {
  const files = fs.readdirSync(releaseDir)
    .filter(file => file !== "SHA256SUMS.txt")
    .sort();
  const lines = files.map(file => {
    const data = fs.readFileSync(path.join(releaseDir, file));
    return `${crypto.createHash("sha256").update(data).digest("hex")}  ${file}`;
  });
  fs.writeFileSync(path.join(releaseDir, "SHA256SUMS.txt"), `${lines.join("\n")}\n`);
}

const [toolArg, ...rawBuilderArgs] = process.argv.slice(2);
if (!toolArg) {
  usage();
  process.exit(1);
}

const dryRun = rawBuilderArgs.includes("--dry-run");
const builderArgs = rawBuilderArgs.filter(arg => arg !== "--dry-run");

if (!dryRun && !fs.existsSync(electronBuilderBin)) {
  console.error("electron-builder is not installed. Run `npm install` from the repository root first.");
  process.exit(1);
}

const toolDir = path.resolve(repoRoot, toolArg);
const toolConfigPath = path.join(toolDir, "tool.json");
const tool = readJson(toolConfigPath);
validateTool(tool, toolConfigPath);
const packagedTool = materializeToolConfig(tool, toolDir, { dryRun });
const buildRoot = fs.mkdtempSync(path.join(os.tmpdir(), `${tool.slug}-build-`));
const stageDir = path.join(buildRoot, "source");
const targetArgs = builderArgs.length ? builderArgs : ["--mac", "--win", "--linux"];

try {
  fs.mkdirSync(stageDir, { recursive: true });

  for (const asset of tool.webAssets || []) {
    const source = path.join(toolDir, asset);
    if (!fs.existsSync(source)) {
      throw new Error(`Missing asset listed in ${toolConfigPath}: ${asset}`);
    }
    copyPath(source, path.join(stageDir, asset));
  }

  copyPath(sharedMain, path.join(stageDir, "main.js"));
  copyPath(sharedPreload, path.join(stageDir, "preload.js"));
  copyPath(sharedAfterPack, path.join(stageDir, "after-pack.js"));
  writeJson(path.join(stageDir, "tool.json"), packagedTool);
  writeJson(path.join(stageDir, "package.json"), packageJsonFor(packagedTool));

  if (dryRun) {
    console.log(`Validated Electron package staging for ${tool.slug}.`);
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
  const finalRelease = path.join(toolDir, "release");
  removePath(finalRelease);
  fs.mkdirSync(finalRelease, { recursive: true });

  for (const file of fs.readdirSync(stagedRelease)) {
    const source = path.join(stagedRelease, file);
    if (fs.statSync(source).isFile()) {
      copyPath(source, path.join(finalRelease, file));
    }
  }

  writeChecksums(finalRelease);
  console.log(`\nPackages written to:\n${finalRelease}`);
} finally {
  removePath(buildRoot);
}

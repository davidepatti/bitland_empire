const { execFileSync } = require("node:child_process");

module.exports = async function afterPack(context) {
  if (context.electronPlatformName !== "darwin") {
    return;
  }

  try {
    console.log(`Clearing macOS extended attributes in ${context.appOutDir}`);
    execFileSync("xattr", ["-cr", context.appOutDir], { stdio: "inherit" });
  } catch (error) {
    console.warn(`Unable to clear macOS extended attributes: ${error.message}`);
  }
};

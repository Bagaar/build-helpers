import findUp from "find-up";
import fsExtra from "fs-extra";

export default function readPackageFile({ cwd = "." } = {}) {
  const packageJsonPath = findUp.sync("package.json", { cwd });

  if (packageJsonPath) {
    return fsExtra.readJsonSync(packageJsonPath);
  }

  return {};
}

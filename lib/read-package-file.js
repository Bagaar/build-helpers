import fsExtra from "fs-extra";

export default function readPackageFile({ cwd = "." } = {}) {
  return fsExtra.readJsonSync(`${cwd}/package.json`);
}

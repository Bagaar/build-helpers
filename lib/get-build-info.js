import gitCommitInfo from "git-commit-info";
import readPackageFile from "./read-package-file.js";

export default function getBuildInfo({ cwd = "." } = {}) {
  const commitInfo = gitCommitInfo({ cwd });
  const packageFile = readPackageFile({ cwd });

  return {
    date: commitInfo.date,
    version: `${packageFile.version}+${commitInfo.shortHash}`,
  };
}

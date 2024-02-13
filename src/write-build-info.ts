import fsExtra from "fs-extra";
import { join } from "node:path";
import getBuildInfo from "./get-build-info";
import Logger from "./logger";

export default async function writeBuildInfo({ cwd = "." } = {}) {
  const logger = new Logger("write-build-info");
  const buildInfo = getBuildInfo({ cwd });
  const buildInfoPath = join(cwd, "dist/build-info.json");
  const spaces = 2;

  await fsExtra.writeJson(buildInfoPath, buildInfo, { spaces });

  logger.success(`Created "${buildInfoPath}" file:\n\n${buildInfo}`);
}

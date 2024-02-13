import { stringify } from "envfile";
import fsExtra from "fs-extra";
import { join } from "node:path";
import { cwd } from "node:process";
import Logger from "./logger";

export default async function createEnvFile() {
  const logger = new Logger("create-env-file");
  const { default: envFile } = await import(join(cwd(), "config/env-file.js"));
  const envFileString = stringify(envFile);

  await fsExtra.writeFile(".env", envFileString);

  logger.success(`Created ".env" file:\n\n${envFileString}`);
}

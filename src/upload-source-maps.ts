import { browser } from "@bugsnag/source-maps";
import { config as readEnvFile } from "dotenv";
import { bool, cleanEnv, str } from "envalid";
import fastGlob from "fast-glob";
import fsExtra from "fs-extra";
import { basename } from "node:path";
import { env } from "node:process";
import Logger from "./logger";
import getBuildInfo from "./get-build-info";

export default async function uploadSourceMaps() {
  readEnvFile();

  const ENV = cleanEnv(env, {
    BUGSNAG_API_KEY: str({ default: "" }),
    BUGSNAG_BUNDLE_HOST: str({ default: "" }),
    BUGSNAG_ENABLED: bool({ default: false }),
    CI: bool({ default: false }),
  });

  const logger = new Logger("upload-source-maps");

  if (ENV.CI === false) {
    return logger.warning('"CI" is "false", skipping uploading source maps.');
  }

  if (ENV.BUGSNAG_ENABLED === false) {
    return logger.warning(
      '"BUGSNAG_ENABLED" is "false", skipping uploading source maps.',
    );
  }

  const apiKey = ENV.BUGSNAG_API_KEY;

  if (apiKey === "") {
    return logger.error("Bugsnag API key is not provided.");
  }

  const bundleHost = ENV.BUGSNAG_BUNDLE_HOST;

  if (bundleHost === "") {
    return logger.error("Bugsnag bundle host is not provided.");
  }

  const files = await fastGlob(["dist/assets/*.js"]);

  if (files.length === 0) {
    return logger.warning("No JavaScript files found.");
  }

  const appVersion = getBuildInfo().versionWithHash;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    let sourceMap: string | null = `${file}.map`;

    if ((await fsExtra.exists(sourceMap)) === false) {
      const content = await fsExtra.readFile(file, { encoding: "utf-8" });
      const lastLine = content.split("\n").at(-1);

      if (lastLine?.startsWith("//# sourceMappingURL=")) {
        sourceMap = `dist/assets/${lastLine.split("=").at(-1)}`;

        if ((await fsExtra.exists(sourceMap)) === false) {
          sourceMap = null;
        }
      }
    }

    if (sourceMap === null) {
      continue;
    }

    const bundleUrl = `${bundleHost}assets/${basename(file)}`;

    try {
      await browser.uploadOne({ apiKey, appVersion, bundleUrl, sourceMap });

      logger.success(`Uploaded source map: ${sourceMap}`);
    } catch (exception: any) {
      const reason = exception?.responseText || "unknown";

      logger.error(
        `Could not upload source map: ${sourceMap} - Reason: ${reason}`,
      );
    }
  }
}

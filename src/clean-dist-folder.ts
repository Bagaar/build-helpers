import fastGlob from "fast-glob";
import fsExtra from "fs-extra";
import Logger from "./logger";
import readPackageFile from "./read-package-file";

export default function cleanDistFolder({ cwd = "." } = {}) {
  const dist = `${cwd}/dist`;
  const logger = new Logger("clean-dist-folder");

  if (fsExtra.existsSync(dist) === false) {
    return logger.warning(`No "${dist}" folder found.`);
  }

  const assets = `${dist}/assets`;
  const packageFile = readPackageFile({ cwd });
  const files = fastGlob.sync([
    // msw's Service Worker file:
    `${dist}/mockServiceWorker.js`,

    // In case someone forgot to remove these from the `./public` folder:
    `${assets}/**/.gitkeep`,

    // Source maps are not needed anymore once they are uploaded to Bugsnag:
    `${assets}/**/*.map`,

    // https://github.com/embroider-build/embroider/issues/1163:
    `${assets}/**/*.less`,
    `${assets}/**/*.scss`,

    // Always empty and not included in `./dist/index.html`:
    `${assets}/${packageFile.name}.css`,
  ]);

  if (files.length > 0) {
    files.forEach((file) => {
      fsExtra.removeSync(file);
      logger.success(`Removed file: ${file}`);
    });
  } else {
    logger.info(`"dist" folder is already clean.`);
  }
}

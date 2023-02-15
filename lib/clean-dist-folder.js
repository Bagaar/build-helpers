import fastGlob from "fast-glob";
import fsExtra from "fs-extra";
import Logger from "./logger.js";
import readPackageFile from "./read-package-file.js";

export default function cleanDistFolder({ cwd = "." } = {}) {
  const logger = new Logger("clean-dist-folder");

  if (fsExtra.existsSync(`${cwd}/dist`) === false) {
    return logger.warning('No "dist" folder found.');
  }

  const packageFile = readPackageFile({ cwd });
  const files = fastGlob.sync([
    `${cwd}/dist/assets/**/.gitkeep`,
    `${cwd}/dist/assets/**/*.{map,scss}`,
    `${cwd}/dist/assets/${packageFile.name}.css`,
  ]);

  files.forEach((file) => {
    fsExtra.removeSync(file);
    logger.success(`"${file}" was removed.`);
  });
}

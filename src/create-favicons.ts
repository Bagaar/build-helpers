import favicons from "favicons";
import fsExtra from "fs-extra";
import { pathToFileURL } from "node:url";
import Logger from "./logger";

export default async function createFavicons({ cwd = "." } = {}) {
  const logger = new Logger("create-favicons");

  const indexPath = `${cwd}/app/index.html`;
  const configPath = `${cwd}/config/favicons.js`;
  const publicPath = `${cwd}/public`;
  const sourcePath = `${cwd}/favicon-source.png`;

  const requiredPaths = [indexPath, configPath, publicPath, sourcePath];
  for (let i = 0; i < requiredPaths.length; i++) {
    if (fsExtra.existsSync(requiredPaths[i]) === false) {
      return logger.error(`Could not find "${requiredPaths[i]}"`);
    }
  }

  const config = (await import(pathToFileURL(configPath).pathname)).default;
  const faviconsResult = await favicons(sourcePath, config);

  faviconsResult.images.forEach((image) => {
    const imagePath = `${publicPath}/${image.name}`;

    fsExtra.writeFileSync(imagePath, image.contents);
    logger.success(`Created image: "${imagePath}"`);
  });

  const index = fsExtra.readFileSync(indexPath, { encoding: "utf-8" });
  const indexLines = index.split("\n");

  const iconLinks = indexLines.filter((line) => line.includes('rel="icon"'));
  const iconLinksIndent = " ".repeat(iconLinks[0].indexOf("<"));
  const iconLinksInsertAt = indexLines.indexOf(iconLinks[0]);

  iconLinks.forEach((iconLink) => {
    indexLines.splice(indexLines.indexOf(iconLink), 1);
  });

  faviconsResult.html.forEach((iconLink, iconLinkIndex) => {
    indexLines.splice(
      iconLinksInsertAt + iconLinkIndex,
      0,
      iconLinksIndent + iconLink.replace('"/', '"{{rootURL}}'),
    );
  });

  fsExtra.writeFileSync(indexPath, indexLines.join("\n"), {
    encoding: "utf-8",
  });

  logger.success(`Updated file: "${indexPath}"`);
}

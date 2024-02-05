import { config as readEnvFile } from "dotenv";
import download from "download";
import { cleanEnv, str } from "envalid";
import fsExtra from "fs-extra";
import gitDiff from "git-diff";
import { join } from "node:path";
import { env } from "node:process";
import Logger from "./logger";

export default async function updateGraphqlSchema({ cwd = "." } = {}) {
  readEnvFile();

  const ENV = cleanEnv(env, {
    GRAPHQL_SCHEMA_URL: str({ default: "" }),
  });

  const logger = new Logger("update-graphql-schema");

  if (ENV.GRAPHQL_SCHEMA_URL === "") {
    return logger.error(`"GRAPHQL_SCHEMA_URL" env var is not defined.`);
  }

  const graphqlConfigPath = join(cwd, ".graphqlrc.json");

  if (fsExtra.existsSync(graphqlConfigPath) === false) {
    return logger.error(`Could not find "${graphqlConfigPath}" config file.`);
  }

  const graphqlConfig = fsExtra.readJsonSync(graphqlConfigPath);

  if (graphqlConfig.schema === undefined) {
    return logger.error(
      `"schema" property is not defined in "${graphqlConfigPath}" config file.`,
    );
  }

  let currentSchema = "";

  if (fsExtra.existsSync(graphqlConfig.schema)) {
    currentSchema = fsExtra.readFileSync(graphqlConfig.schema, {
      encoding: "utf-8",
    });
  }

  const newSchema = await download(ENV.GRAPHQL_SCHEMA_URL);

  fsExtra.writeFileSync(graphqlConfig.schema, newSchema);

  logger.success(`GraphQL schema updated from:\n${ENV.GRAPHQL_SCHEMA_URL}`);

  if (currentSchema) {
    const schemaDiff = gitDiff(currentSchema, newSchema.toString(), {
      color: true,
    });

    if (schemaDiff) {
      logger.newLine();
      logger.info(`Schema diff:\n${schemaDiff}`);
    }
  }
}

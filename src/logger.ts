import chalk, { ChalkFunction } from "chalk";
import { env } from "node:process";

export default class Logger {
  prefix = "";

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  error(...args: string[]) {
    this.#log(chalk.redBright, ...args);
  }

  info(...args: string[]) {
    this.#log(chalk.cyanBright, ...args);
  }

  success(...args: string[]) {
    this.#log(chalk.greenBright, ...args);
  }

  warning(...args: string[]) {
    this.#log(chalk.yellowBright, ...args);
  }

  #log(color: ChalkFunction, ...args: string[]) {
    if (env.BUILD_HELPERS_LOGGING === "false") {
      return;
    }

    console.log(color(`[${this.prefix}]`), ...args);
  }
}

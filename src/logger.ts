import chalk, { ChalkFunction } from "chalk";

export default class Logger {
  prefix = "";

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  error(...args: string[]) {
    this.#log(chalk.bold.bgRed, ...args);
  }

  info(...args: string[]) {
    this.#log(chalk.bold.bgCyan, ...args);
  }

  success(...args: string[]) {
    this.#log(chalk.bold.bgGreen, ...args);
  }

  warning(...args: string[]) {
    this.#log(chalk.bold.bgYellow, ...args);
  }

  #log(color: ChalkFunction, ...args: string[]) {
    const prefix = chalk.supportsColor
      ? color(this.prefix)
      : `[${this.prefix}]`;

    console.log(prefix, ...args);
  }
}

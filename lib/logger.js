import chalk from "chalk";

export default class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }

  error() {
    this.#log(chalk.bold.bgRed, ...arguments);
  }

  info() {
    this.#log(chalk.bold.bgCyan, ...arguments);
  }

  success() {
    this.#log(chalk.bold.bgGreen, ...arguments);
  }

  warning() {
    this.#log(chalk.bold.bgYellow, ...arguments);
  }

  #log(color, ...args) {
    console.log(color(this.prefix), ...args);
  }
}

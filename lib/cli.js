#!/usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import pkg from "../package.json";
import deleteTrelloWebhook from "./";

const { argv } =
  yargs
  .usage(`Usage: ${chalk.cyan(pkg.name, chalk.underline("KEY"), chalk.underline("TOKEN"), chalk.underline("WEBHOOK ID"))}`)
  .option("h", { alias: "help", describe: "Show help", type: "boolean" })
  .option("v", { alias: "version", describe: "Show version", type: "boolean" });

if (argv.help || argv.h) {
  yargs.showHelp();
  process.exit();
}

if (argv.version || argv.v) {
  console.log(pkg.version);
  process.exit();
}

if (argv._.length !== 3) {
  yargs.showHelp();
  console.error(chalk.red("Key, token, and webhook ID must be specified."));
  process.exit(1);
}

let [ key, token, webhookId ] = argv._;
console.log(chalk.green("Deleting Trello webhook..."));

deleteTrelloWebhook(
  key,
  token,
  webhookId
).then(() => {
  console.log(chalk.green("Done!"));
  process.exit();
}).catch(error => {
  console.error(chalk.red(error.message || "An unexpected error occurred."));
  process.exit(1);
});

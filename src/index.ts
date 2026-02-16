#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { scaffold } from "./scaffold.js";

const program = new Command();

program
  .name("create-canton-app")
  .description("Scaffold a Canton Network Daml project")
  .argument("<project-name>", "Name of the project to create")
  .option(
    "--template <type>",
    "Project template: minimal or full",
    "minimal",
  )
  .option("--no-git", "Skip git initialization")
  .action(
    async (
      projectName: string,
      options: { template: string; git: boolean },
    ) => {
      if (options.template !== "minimal" && options.template !== "full") {
        console.error(
          chalk.red(
            `Invalid template: ${options.template}. Use "minimal" or "full".`,
          ),
        );
        process.exit(1);
      }

      console.log(chalk.bold.cyan("\n  create-canton-app\n"));
      console.log(
        chalk.dim(
          `  Scaffolding ${options.template} Canton project: ${projectName}\n`,
        ),
      );

      try {
        const files = await scaffold({
          projectName,
          template: options.template as "minimal" | "full",
          skipGit: !options.git,
        });

        for (const file of files) {
          console.log(chalk.green("  + ") + chalk.dim(file));
        }

        console.log(
          chalk.bold.green(`\n  Done! Created ${projectName}\n`),
        );
        console.log(chalk.dim("  Next steps:\n"));
        console.log(`    ${chalk.cyan("cd")} ${projectName}`);
        console.log(
          `    ${chalk.cyan("daml build")}    ${chalk.dim("— compile the project")}`,
        );
        console.log(
          `    ${chalk.cyan("daml test")}     ${chalk.dim("— run Daml Script tests")}`,
        );
        console.log("");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : String(error);
        console.error(chalk.red(`\n  Error: ${message}\n`));
        process.exit(1);
      }
    },
  );

program.parse();

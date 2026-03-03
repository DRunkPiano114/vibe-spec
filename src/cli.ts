import { Command } from "commander";
import { init } from "./commands/init.js";

const program = new Command();

program
  .name("vibe-spec")
  .description("Spec-first development protocol for AI coding agents")
  .version("0.1.0");

program
  .command("init")
  .description("Scaffold .vibe/ directory and append protocol to AGENTS.md")
  .option("--force", "Re-initialize even if already set up")
  .action(init);

program.parse();

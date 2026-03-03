import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const MARKER_START = "<!-- vibe-spec:start -->";

function getTemplatesDir(): string {
  const currentFile = fileURLToPath(import.meta.url);
  const distDir = dirname(currentFile);
  return join(distDir, "..", "templates");
}

function readTemplate(name: string): string {
  return readFileSync(join(getTemplatesDir(), name), "utf-8");
}

function createFile(path: string, templateName: string): boolean {
  if (existsSync(path)) return false;
  writeFileSync(path, readTemplate(templateName), "utf-8");
  return true;
}

export async function init(options: { force?: boolean }) {
  const cwd = process.cwd();
  const vibeDir = join(cwd, ".vibe");
  const modulesDir = join(vibeDir, "modules");
  const agentsPath = join(cwd, "AGENTS.md");

  mkdirSync(modulesDir, { recursive: true });

  const files = [
    { path: join(vibeDir, "SPEC.md"), template: "SPEC.md" },
    { path: join(vibeDir, "STACK.md"), template: "STACK.md" },
    { path: join(vibeDir, "DESIGN.md"), template: "DESIGN.md" },
  ];

  for (const { path, template } of files) {
    if (createFile(path, template)) {
      console.log(`  Created ${path.replace(cwd + "/", "")}`);
    } else if (options.force) {
      writeFileSync(path, readTemplate(template), "utf-8");
      console.log(`  Overwritten ${path.replace(cwd + "/", "")}`);
    } else {
      console.log(`  Skipped ${path.replace(cwd + "/", "")} (already exists)`);
    }
  }

  console.log(`  Created .vibe/modules/`);

  const agentsSection = readTemplate("agents-section.md");

  if (existsSync(agentsPath)) {
    const existing = readFileSync(agentsPath, "utf-8");
    if (existing.includes(MARKER_START)) {
      if (options.force) {
        const updated = existing.replace(
          /<!-- vibe-spec:start -->[\s\S]*?<!-- vibe-spec:end -->/,
          agentsSection.trim()
        );
        writeFileSync(agentsPath, updated, "utf-8");
        console.log(`  Updated vibe-spec protocol in AGENTS.md`);
      } else {
        console.log(`  Skipped AGENTS.md (vibe-spec section already exists)`);
      }
    } else {
      writeFileSync(agentsPath, existing.trimEnd() + "\n\n" + agentsSection, "utf-8");
      console.log(`  Appended vibe-spec protocol to AGENTS.md`);
    }
  } else {
    writeFileSync(agentsPath, agentsSection, "utf-8");
    console.log(`  Created AGENTS.md with vibe-spec protocol`);
  }

  console.log();
  console.log(
    `  Next: ask your coding agent to "read AGENTS.md, fill in .vibe/ based on this project"`
  );
}

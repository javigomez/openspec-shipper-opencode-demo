import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const ignoredDirectories = new Set([".git", "node_modules", "worktrees", ".openspec-shipper"]);
const failures = [];

for (const file of await listFiles(process.cwd())) {
  const content = await readFile(file, "utf8");
  if (!content.endsWith("\n") || /[ \t]$/m.test(content)) {
    failures.push(file);
  }
}

if (failures.length > 0) {
  console.error("Formatting check failed:");
  for (const file of failures) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log("Formatting check passed.");

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        files.push(...(await listFiles(path)));
      }
    } else if (entry.isFile() && isTextFile(path)) {
      files.push(path);
    }
  }

  return files;
}

function isTextFile(path) {
  return /\.(js|json|md|yaml|yml|cjs|mjs)$/.test(path);
}

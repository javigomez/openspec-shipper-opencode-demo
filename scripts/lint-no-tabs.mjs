import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const checkedExtensions = new Set([".js", ".json", ".md", ".yaml", ".yml"]);
const ignoredDirectories = new Set([".git", "node_modules", "worktrees", ".openspec-shipper"]);
const failures = [];

for (const file of await listFiles(process.cwd())) {
  if (!checkedExtensions.has(extension(file))) {
    continue;
  }

  const content = await readFile(file, "utf8");
  if (content.includes("\t")) {
    failures.push(file);
  }
}

if (failures.length > 0) {
  console.error("Tabs are not allowed in checked files:");
  for (const file of failures) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log("No tabs found.");

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        files.push(...(await listFiles(path)));
      }
    } else if (entry.isFile()) {
      files.push(path);
    }
  }

  return files;
}

function extension(file) {
  const index = file.lastIndexOf(".");
  return index === -1 ? "" : file.slice(index);
}

import {
  mkdir,
  readdir,
  readFile,
  writeFile,
  access,
} from "node:fs/promises";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface ScaffoldOptions {
  projectName: string;
  template: "minimal" | "full";
  skipGit: boolean;
}

export function getTemplatesDir(): string {
  return join(__dirname, "..", "templates");
}

export async function scaffold(
  options: ScaffoldOptions,
): Promise<string[]> {
  const { projectName, template, skipGit } = options;
  const targetDir = join(process.cwd(), projectName);

  await assertDirNotExists(targetDir, projectName);
  await mkdir(targetDir, { recursive: true });

  const templateDir = join(getTemplatesDir(), template);
  const createdFiles: string[] = [];

  await copyDir(templateDir, targetDir, { PROJECT_NAME: projectName }, targetDir, createdFiles);

  if (!skipGit) {
    execSync("git init", { cwd: targetDir, stdio: "ignore" });
  }

  return createdFiles.sort();
}

async function assertDirNotExists(
  dir: string,
  name: string,
): Promise<void> {
  try {
    await access(dir);
    throw new Error(`Directory "${name}" already exists`);
  } catch (error: unknown) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return;
    throw error;
  }
}

async function copyDir(
  srcDir: string,
  destDir: string,
  vars: Record<string, string>,
  projectRoot: string,
  createdFiles: string[],
): Promise<void> {
  const entries = await readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destName = mapFileName(entry.name);
    const destPath = join(destDir, destName);

    if (entry.isDirectory()) {
      await mkdir(destPath, { recursive: true });
      await copyDir(srcPath, destPath, vars, projectRoot, createdFiles);
    } else {
      const content = await readFile(srcPath, "utf-8");
      const transformed = replaceVars(content, vars);
      await mkdir(dirname(destPath), { recursive: true });
      await writeFile(destPath, transformed);
      createdFiles.push(relative(projectRoot, destPath));
    }
  }
}

function mapFileName(name: string): string {
  if (name.startsWith("_")) {
    return "." + name.slice(1);
  }
  return name;
}

function replaceVars(
  content: string,
  vars: Record<string, string>,
): string {
  let result = content;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  return result;
}

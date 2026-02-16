import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, readFile, access } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { scaffold, getTemplatesDir } from "../src/scaffold.js";

describe("scaffold", () => {
  let tempDir: string;
  let origCwd: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "create-canton-app-test-"));
    origCwd = process.cwd();
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(origCwd);
    await rm(tempDir, { recursive: true, force: true });
  });

  it("creates minimal project with expected files", async () => {
    const files = await scaffold({
      projectName: "test-project",
      template: "minimal",
      skipGit: true,
    });

    expect(files).toContain("daml.yaml");
    expect(files).toContain(".gitignore");
    expect(files).toContain("LICENSE");
    expect(files).toContain("README.md");
    expect(files).toContain("CLAUDE.md");
    expect(files).toContain("src/Main.daml");
    expect(files).toContain("src/TestMain.daml");
    expect(files).toContain(".github/workflows/ci.yml");
  });

  it("replaces project name in daml.yaml", async () => {
    await scaffold({
      projectName: "my-app",
      template: "minimal",
      skipGit: true,
    });

    const content = await readFile(
      join(tempDir, "my-app", "daml.yaml"),
      "utf-8",
    );
    expect(content).toContain("name: my-app");
    expect(content).not.toContain("{{PROJECT_NAME}}");
  });

  it("replaces project name in README.md", async () => {
    await scaffold({
      projectName: "my-app",
      template: "minimal",
      skipGit: true,
    });

    const content = await readFile(
      join(tempDir, "my-app", "README.md"),
      "utf-8",
    );
    expect(content).toContain("# my-app");
    expect(content).not.toContain("{{PROJECT_NAME}}");
  });

  it("creates full project with pattern files", async () => {
    const files = await scaffold({
      projectName: "full-project",
      template: "full",
      skipGit: true,
    });

    expect(files).toContain("src/Main.daml");
    expect(files).toContain("src/TestMain.daml");
    expect(files).toContain("src/Patterns/AccessControl.daml");
    expect(files).toContain("src/Patterns/Escrow.daml");
    expect(files).toContain("src/Patterns/Multisig.daml");
    expect(files).toContain("src/Patterns/Vesting.daml");
    expect(files).toContain("src/Patterns/Timelock.daml");
    expect(files).toContain("src/Patterns/Voting.daml");
  });

  it("fails if directory already exists", async () => {
    await scaffold({
      projectName: "dup",
      template: "minimal",
      skipGit: true,
    });
    await expect(
      scaffold({ projectName: "dup", template: "minimal", skipGit: true }),
    ).rejects.toThrow("already exists");
  });

  it("renames _ prefixed files to dot files", async () => {
    await scaffold({
      projectName: "dot-test",
      template: "minimal",
      skipGit: true,
    });

    await expect(
      access(join(tempDir, "dot-test", ".gitignore")),
    ).resolves.toBeUndefined();
    await expect(
      access(join(tempDir, "dot-test", ".github", "workflows", "ci.yml")),
    ).resolves.toBeUndefined();
  });

  it("returns sorted file list", async () => {
    const files = await scaffold({
      projectName: "sorted",
      template: "minimal",
      skipGit: true,
    });

    const sortedCopy = [...files].sort();
    expect(files).toEqual(sortedCopy);
  });

  it("getTemplatesDir points to existing directory", async () => {
    const dir = getTemplatesDir();
    await expect(access(dir)).resolves.toBeUndefined();
  });
});

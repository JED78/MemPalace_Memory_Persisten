import type { PluginConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import { execSync } from "node:child_process";

export interface Memory {
  id: string;
  content: string;
  room?: string;
  wing?: string;
}

export async function fetchMemories(config: PluginConfig, limit: number): Promise<string[]> {
  try {
    const stdout = execSync(
      `mempalace search --query "recent memories" --limit ${limit}`,
      {
        cwd: config.palacePath,
        env: { ...process.env, MP_PALACE_PATH: config.palacePath },
        encoding: "utf-8",
        timeout: 10000,
      }
    ).trim();
    if (!stdout) return [];
    return stdout.split("\n").filter(Boolean);
  } catch (err) {
    logger.warn(`fetchMemories failed: ${err instanceof Error ? err.message : String(err)}`);
    return [];
  }
}

export async function searchMemories(query: string, limit: number = 5): Promise<string[]> {
  try {
    const stdout = execSync(
      `mempalace search --query "${query}" --limit ${limit}`,
      { encoding: "utf-8", timeout: 10000 }
    ).trim();
    if (!stdout) return [];
    return stdout.split("\n").filter(Boolean);
  } catch (err) {
    logger.warn(`searchMemories failed: ${err instanceof Error ? err.message : String(err)}`);
    return [];
  }
}
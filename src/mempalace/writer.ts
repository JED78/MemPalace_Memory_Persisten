import type { PluginConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import { execSync } from "node:child_process";

export async function writeMemory(
  content: string,
  room: string = "general",
  config?: PluginConfig
): Promise<boolean> {
  const script = config?.mpWriteScript ?? "C:\\Users\\delac\\.mempalace\\mp-write.py";
  try {
    const proc = execSync(
      `python "${script}" --content "${content.replace(/"/g, '\\"')}" --room "${room}"`,
      {
        encoding: "utf-8",
        env: { ...process.env },
        timeout: 10000,
      }
    );
    if (proc) return true;
    return false;
  } catch (err: unknown) {
    logger.error(`writeMemory failed: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

export async function writeMemories(
  contents: string[],
  room: string = "general",
  config?: PluginConfig
): Promise<number> {
  let written = 0;
  for (const c of contents) {
    if (await writeMemory(c, room, config)) written++;
  }
  return written;
}
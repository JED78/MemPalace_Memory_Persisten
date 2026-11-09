import type { PluginInput } from "@kilocode/plugin";
import type { PluginConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import { ensureDir } from "../utils/config.js";
import { writeFileSync } from "node:fs";

export async function exportTranscript(
  input: PluginInput,
  config: PluginConfig,
  sessionID: string = "current"
): Promise<string | null> {
  try {
    const result = await input.client.session.messages({ path: { id: sessionID } });
    const messages = Array.isArray(result) ? result : [];
    if (messages.length === 0) return null;
    ensureDir(config.transcriptDir);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `transcript-${timestamp}.txt`;
    const filepath = `${config.transcriptDir}\\${filename}`;
    const lines = messages
      .map((m: any) => `[${m.info?.role ?? "unknown"}] ${(m.parts?.map((p: any) => p.text || "").join(" ") || "")}`)
      .join("\n");
    writeFileSync(filepath, lines, "utf-8");
    logger.info(`Transcript exported to ${filepath}`);
    return filepath;
  } catch (err) {
    logger.error(`exportTranscript failed: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}
import type { PluginInput } from "@kilocode/plugin";
import type { PluginConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import { writeMemory } from "./writer.js";

export async function mineSession(
  input: PluginInput,
  config: PluginConfig,
  sessionID: string = "current"
): Promise<void> {
  try {
    const result = await input.client.session.messages({ path: { id: sessionID } });
    const messages = Array.isArray(result) ? result : [];
    if (messages.length === 0) {
      logger.debug("No messages to mine");
      return;
    }
    const summary = messages
      .slice(-5)
      .map((m: any) => (m.parts?.map((p: any) => p.text || "").join(" ") || ""))
      .join("\n---\n");
    await writeMemory(`Session summary:\n${summary}`, "sessions", config);
    logger.info(`Mined session with ${messages.length} messages`);
  } catch (err) {
    logger.error(`mineSession failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}
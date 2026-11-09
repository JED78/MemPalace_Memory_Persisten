import type { PluginInput } from "@kilocode/plugin";
import type { PluginConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import { readIdentity } from "../utils/config.js";
import { fetchMemories } from "../mempalace/client.js";

export function createChatHooks(_input: PluginInput, config: PluginConfig) {
  return {
    "experimental.chat.system.transform": async (
      _hookInput: { sessionID?: string },
      output: { system: string[] }
    ) => {
      if (!config.autoInject) return;
      const identity = readIdentity(config.identityPath);
      const memories = await fetchMemories(config, config.maxMemories);
      const context: string[] = [];
      if (identity) context.push(`## Identity\n${identity}`);
      if (memories.length) {
        context.push("## Memories\n" + memories.map((m) => `- ${m}`).join("\n"));
      }
      if (context.length) {
        output.system.push(context.join("\n\n"));
        logger.debug(`Injected ${context.length} context blocks`);
      }
    },
  };
}
import type { PluginInput } from "@kilocode/plugin";
import type { PluginConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";

export function createToolHooks(_input: PluginInput, config: PluginConfig) {
  return {
    "tool.definition": async (input: { toolID: string }, output: { description: string; parameters: unknown }) => {
      if (input.toolID === config.mcpEndpoint) {
        output.description = `[MemPalace] ${output.description}`;
      }
    },
  };
}
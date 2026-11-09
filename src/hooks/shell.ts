import type { PluginInput } from "@kilocode/plugin";
import type { PluginConfig } from "../utils/config.js";

export function createShellHooks(_input: PluginInput, config: PluginConfig) {
  return {
    "shell.env": async (_input: { cwd: string }, output: { env: Record<string, string> }) => {
      output.env.MP_PALACE_PATH = config.palacePath;
      output.env.MP_MCP_ENDPOINT = config.mcpEndpoint;
      output.env.MP_WRITE_SCRIPT = config.mpWriteScript;
    },
  };
}
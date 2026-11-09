import type { Plugin, PluginInput, Hooks, PluginModule } from "@kilocode/plugin";
import { loadConfig } from "./utils/config.js";
import { logger } from "./utils/logger.js";
import { createChatHooks } from "./hooks/chat.js";
import { createEventHooks } from "./hooks/event.js";
import { createToolHooks } from "./hooks/tool.js";
import { createShellHooks } from "./hooks/shell.js";

const server: Plugin = async (input: PluginInput, options) => {
  const config = loadConfig(options);
  logger.setLevel(config.logLevel);

  const hooks: Hooks = {
    config: async () => {
      logger.debug("Plugin config loaded");
    },
    ...createChatHooks(input, config),
    ...createEventHooks(input, config),
    ...createToolHooks(input, config),
    ...createShellHooks(input, config),
  };

  return hooks;
};

export default { server } satisfies PluginModule;
import type { PluginInput } from "@kilocode/plugin";
import type { PluginConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import { exportTranscript } from "../mempalace/export.js";
import { mineSession } from "../mempalace/miner.js";

interface EventPayload {
  type: string;
  properties?: {
    sessionID?: string;
    [key: string]: unknown;
  };
}

export function createEventHooks(input: PluginInput, config: PluginConfig) {
  return {
    event: async ({ event }: { event: EventPayload }) => {
      switch (event.type) {
        case "session.idle":
          if (config.mineOnIdle) {
            const sessionID = event.properties?.sessionID ?? "current";
            logger.info("Mining session on idle");
            await mineSession(input, config, sessionID).catch((err) =>
              logger.error(`Mine failed: ${err instanceof Error ? err.message : String(err)}`)
            );
          }
          break;
        case "session.updated":
          if (config.mineOnExit) {
            const sessionID = event.properties?.sessionID ?? "current";
            logger.info("Mining session on update");
            await mineSession(input, config, sessionID).catch((err) =>
              logger.error(`Mine failed: ${err instanceof Error ? err.message : String(err)}`)
            );
          }
          break;
        case "session.created":
          if (config.mineOnStartup) {
            const sessionID = event.properties?.sessionID ?? "current";
            logger.info("Mining session on startup");
            await mineSession(input, config, sessionID).catch((err) =>
              logger.error(`Mine failed: ${err instanceof Error ? err.message : String(err)}`)
            );
          }
          break;
        default:
          break;
      }
    },
  };
}
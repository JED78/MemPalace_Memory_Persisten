import type { PluginConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";

export function getFooterStatus(config: PluginConfig): string {
  const parts: string[] = [];
  if (config.autoInject) parts.push("inject:on");
  if (config.exportTranscripts) parts.push("export:on");
  if (config.mineOnIdle) parts.push("mine:idle");
  if (config.mineOnExit) parts.push("mine:exit");
  if (config.mineOnStartup) parts.push("mine:startup");
  return `[mem] ${parts.join(" | ")}`;
}

export function formatStatusLine(config: PluginConfig): string {
  return getFooterStatus(config);
}

export function shouldShowFooter(config: PluginConfig): boolean {
  return config.statusFooter;
}
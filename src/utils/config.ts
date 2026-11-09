import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { logger } from "./logger.js";

export interface PluginConfig {
  palacePath: string;
  mcpEndpoint: string;
  mpWriteScript: string;
  identityPath: string;
  pluginConfigPath: string;
  autoInject: boolean;
  exportTranscripts: boolean;
  mineOnIdle: boolean;
  mineOnExit: boolean;
  mineOnStartup: boolean;
  statusFooter: boolean;
  maxMemories: number;
  transcriptDir: string;
  logLevel: string;
}

const DEFAULTS: PluginConfig = {
  palacePath: "C:\\ProyectosIA\\mempalace-memory",
  mcpEndpoint: "mempalace",
  mpWriteScript: "C:\\Users\\delac\\.mempalace\\mp-write.py",
  identityPath: "C:\\Users\\delac\\.mempalace\\identity.txt",
  pluginConfigPath: "C:\\Users\\delac\\.mempalace\\plugin-config.json",
  autoInject: true,
  exportTranscripts: true,
  mineOnIdle: true,
  mineOnExit: true,
  mineOnStartup: true,
  statusFooter: true,
  maxMemories: 10,
  transcriptDir: "C:\\ProyectosIA\\mempalace-memory\\transcripts",
  logLevel: "info",
};

function loadConfigFile(path: string): Partial<PluginConfig> {
  if (!existsSync(path)) return {};
  try {
    const raw = readFileSync(path, "utf-8");
    return JSON.parse(raw) as Partial<PluginConfig>;
  } catch (err) {
    logger.warn(`Failed to load config from ${path}: ${err instanceof Error ? err.message : String(err)}`);
    return {};
  }
}

export function loadConfig(options: Record<string, unknown> = {}): PluginConfig {
  const fileConfig = loadConfigFile("mempalace-config.json");
  const merged = { ...DEFAULTS, ...fileConfig, ...options } as PluginConfig;
  return merged;
}

export function readIdentity(path: string): string | null {
  if (!existsSync(path)) return null;
  try {
    return readFileSync(path, "utf-8").trim();
  } catch {
    return null;
  }
}

export function ensureDir(dir: string): boolean {
  try {
    mkdirSync(dir, { recursive: true });
    return true;
  } catch {
    return false;
  }
}
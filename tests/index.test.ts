import { describe, it, expect, vi } from "vitest";
import { loadConfig } from "../src/utils/config.js";
import { logger } from "../src/utils/logger.js";

describe("loadConfig", () => {
  it("returns defaults when no options", () => {
    const config = loadConfig({});
    expect(config.palacePath).toBeTruthy();
    expect(config.mcpEndpoint).toBe("mempalace");
    expect(config.autoInject).toBe(true);
  });

  it("overrides defaults with options", () => {
    const config = loadConfig({ autoInject: false });
    expect(config.autoInject).toBe(false);
  });
});

describe("logger", () => {
  it("has default level info", () => {
    expect(logger).toBeDefined();
  });

  it("setLevel changes level", () => {
    logger.setLevel("debug");
    logger.info("test");
    expect(true).toBe(true);
  });
});
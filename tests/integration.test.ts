import { test } from "vitest";
import { describe, expect } from "vitest";
import { loadConfig } from "../src/utils/config.js";
import { logger } from "../src/utils/logger.js";
import { createChatHooks } from "../src/hooks/chat.js";
import { createEventHooks } from "../src/hooks/event.js";
import { createShellHooks } from "../src/hooks/shell.js";
import { createToolHooks } from "../src/hooks/tool.js";
import type { PluginInput } from "@kilocode/plugin";

const mockInput = {
  client: { session: { messages: async () => [] } },
  project: { id: "test", worktree: "C:\\test", time: { created: 0 } },
  directory: "C:\\test",
  worktree: "C:\\test",
  experimental_workspace: { register: () => {} },
  serverUrl: new URL("http://localhost:3000"),
  $: {} as any,
} as unknown as PluginInput;

const config = loadConfig({});

describe("Plugin Integration", () => {
  test("chat hook injects identity and memories", async () => {
    const hooks = createChatHooks(mockInput, config);
    const output = { system: ["base system"] };
    await hooks["experimental.chat.system.transform"]?.({ sessionID: "test" }, output);
    expect(output.system.length).toBeGreaterThan(1);
  });

  test("shell hook sets MP_ env vars", async () => {
    const hooks = createShellHooks(mockInput, config);
    const output = { env: {} };
    await hooks["shell.env"]?.({ cwd: "C:\\test" }, output);
    expect(output.env.MP_PALACE_PATH).toBeTruthy();
  });

  test("event hook handles session.idle", async () => {
    const hooks = createEventHooks(mockInput, config);
    await hooks.event?.({ event: { type: "session.idle", properties: { sessionID: "test" } } });
    expect(true).toBe(true);
  });

  test("tool hook modifies mempalace tool definition", async () => {
    const hooks = createToolHooks(mockInput, config);
    const output = { description: "test tool", parameters: {} };
    await hooks["tool.definition"]?.({ toolID: "mempalace" }, output);
    expect(output.description).toContain("[MemPalace]");
  });
});
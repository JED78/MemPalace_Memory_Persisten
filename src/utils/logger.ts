type LogLevel = "debug" | "info" | "warn" | "error" | "silent";

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  silent: 4,
};

class Logger {
  private level: number = LEVELS.info;

  setLevel(level: string): void {
    const l = level.toLowerCase() as LogLevel;
    if (l in LEVELS) this.level = LEVELS[l];
  }

  private format(level: string, msg: string): string {
    return `[mempalace] ${level.toUpperCase()} ${msg}`;
  }

  debug(msg: string): void {
    if (this.level <= LEVELS.debug) console.error(this.format("debug", msg));
  }

  info(msg: string): void {
    if (this.level <= LEVELS.info) console.error(this.format("info", msg));
  }

  warn(msg: string): void {
    if (this.level <= LEVELS.warn) console.error(this.format("warn", msg));
  }

  error(msg: string): void {
    if (this.level <= LEVELS.error) console.error(this.format("error", msg));
  }
}

export const logger = new Logger();
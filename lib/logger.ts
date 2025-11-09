export enum LogScope {
  Scheduler = "scheduler",
  Admin = "admin",
}

export function logInfo(scope: LogScope, message: string, meta: Record<string, unknown> = {}) {
  console.log(`[Tripolio:${scope}] ${message}`, meta);
}

export function logError(scope: LogScope, message: string, error: unknown, meta: Record<string, unknown> = {}) {
  console.error(`[Tripolio:${scope}] ${message}`, { error, ...meta });
}


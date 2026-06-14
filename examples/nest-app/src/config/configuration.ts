/** Application configuration resolved from the environment. */
export interface AppConfiguration {
  readonly host: string;
  readonly port: number;
}

const DEFAULT_PORT = 3000;

/**
 * Builds the application configuration from environment variables.
 * `src/config/**` is the one place this project is allowed to read `process.env`.
 * @returns The resolved application configuration.
 */
export function loadConfiguration(): AppConfiguration {
  const parsedPort = Number.parseInt(process.env.PORT ?? '', 10);

  return {
    host: process.env.HOST ?? 'localhost',
    port: Number.isNaN(parsedPort) ? DEFAULT_PORT : parsedPort,
  };
}

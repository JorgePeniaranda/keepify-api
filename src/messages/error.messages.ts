export const ErrorMessages = {
  DatabaseConnectionError: 'Database connection error',
  EnvironmentVariableError: (variable: string): string =>
    `Environment variable "${variable}" not found`,
  Invalid: (name: string) => `${name} inválido`,
  InvalidPortValue: 'Invalid port value',
  NoVariableEnv: (variable: string): string =>
    `No se ha encontrado la variable de entorno "${variable}"`,
  NotFound: (name: string) => `${name} no encontrado`,
} as const;

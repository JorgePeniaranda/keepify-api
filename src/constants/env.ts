import { APP_INFO } from '@/constants/app';
import { getEnvValue } from '../helpers/server';

export const env = {
  APP_PORT: getEnvValue('APP_PORT', String(APP_INFO.DEFAULT_PORT)),
  JWT_SECRET: getEnvValue('JWT_SECRET', 'asdsa'),
  JWT_EXPIRATION_MINUTES: getEnvValue('JWT_EXPIRATION_MINUTES', '60'),
} as const;

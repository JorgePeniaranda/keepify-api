import { APP_INFO } from '@/constants/app';
import { getEnvValue } from '../helpers/server';

export const env = {
  APP_PORT: getEnvValue('APP_PORT', String(APP_INFO.DEFAULT_PORT)),
} as const;

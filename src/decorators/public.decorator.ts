import { IS_PUBLIC_ENDPOINT_KEY } from '@/constants/auth';
import { type CustomDecorator, SetMetadata } from '@nestjs/common';

export const Public = (): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC_ENDPOINT_KEY, true);

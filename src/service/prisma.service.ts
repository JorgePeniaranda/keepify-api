import { Messages } from '@/messages';
import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  type OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect().catch((error) => {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        Logger.fatal(Messages.error.DatabaseConnectionError);
        throw new ServiceUnavailableException(
          Messages.error.DatabaseConnectionError,
        );
      }

      throw error;
    });
  }
}

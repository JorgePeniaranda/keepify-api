import { Module } from '@nestjs/common';
import { UserRepositoryPrisma } from './data-access/user-prisma.repository';
import { ReadUserService } from './domain/service/read-user.service';
import { WriteUserService } from './domain/service/write-user.service';
import { UserController } from './entry-points/user.controller';
import { PrismaService } from '@/service/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    WriteUserService,
    ReadUserService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrisma,
    },
    PrismaService,
  ],
  exports: [ReadUserService],
})
export class UserModule {}

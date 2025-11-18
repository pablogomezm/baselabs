import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { HashService } from './hash.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, HashService],
  exports: [UsersService, HashService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module.js';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, JwtModule.register({
    secret : process.env.JWT_SECRET
  })]
})
export class UserModule {}

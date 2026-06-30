import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ExpenseModule } from './expense/expense.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { ConfigModule } from '@nestjs/config';
import { SetUserRoleCommand } from './commands/set-user-role.command.js';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true
  }), ExpenseModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService, SetUserRoleCommand],
})
export class AppModule {}

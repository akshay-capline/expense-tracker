import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpenseService } from './expense.service.js';
import { ExpenseController } from './expense.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ExpenseGateway } from './expense.gateway.js';
import { LoggerMiddleware } from '../../src/middleware/logger/logger.middleware.js';
import { AuthModule } from '../../src/auth/auth.module.js';


@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseGateway],
  imports : [PrismaModule, AuthModule]
})
export class ExpenseModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  }
}

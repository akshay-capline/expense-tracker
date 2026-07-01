import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service.js';
import { ExpenseController } from './expense.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ExpenseGateway } from './expense.gateway.js';


@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseGateway],
  imports : [PrismaModule]
})
export class ExpenseModule {}

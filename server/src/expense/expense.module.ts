import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service.js';
import { ExpenseController } from './expense.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';


@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports : [PrismaModule]
})
export class ExpenseModule {}

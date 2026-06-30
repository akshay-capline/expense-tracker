import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ExpenseService {
  constructor(private prismaService: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const createdData = await this.prismaService.expense.create({
      data: createExpenseDto
    });
    return {
      data : createdData 
    }
  }

  async findAll(id: number) {
    const expenses = await this.prismaService.expense.findMany({
      where: { user_id: id },
    });

    return {
      data: expenses.map((expense) => ({
        ...expense,
        amount: Number(expense.amount),
      })),
    };
  }

  async findOne(id: number) {
    return {
      data : await this.prismaService.expense.findFirst({
      where: { id },
      })
    }
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const updatedData = await this.prismaService.expense.update({
      where: { id },
      data: {
        ...updateExpenseDto,
        expense_date: new Date(updateExpenseDto.expense_date || ''),
      },
    })
    return {
      data : updatedData
    }
  }

  async remove(id: number) {
    const updatedData = await this.prismaService.expense.delete({
      where: {
        id,
      },
    }); 
    return {
      data : updatedData
    } 
  }
}

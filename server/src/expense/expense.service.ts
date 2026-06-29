import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseService {

  constructor(private prismaService : PrismaService){};

  async create(createExpenseDto: CreateExpenseDto) {
    return await this.prismaService.expense.create({
      data : createExpenseDto
    });
  }

  async findAll(id : number) {
    return await this.prismaService.expense.findMany({
      where : { user_id : id }
    })
  }

  async findOne(id: number) {
    return await this.prismaService.expense.findFirst({
      where : { id }
    })
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return await this.prismaService.expense.update({
      where : { id }, 
      data : updateExpenseDto
    })
  }

  async remove(id: number) {
    return await this.prismaService.expense.delete({
      where : {
        id
      }
    })
  }
}

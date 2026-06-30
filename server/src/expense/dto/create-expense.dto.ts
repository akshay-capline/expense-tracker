import { IsString, IsNumber, IsNotEmpty, IsInt, IsDate  } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  amount!: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  expense_date!: string;

  @IsInt()
  user_id!: number;
}
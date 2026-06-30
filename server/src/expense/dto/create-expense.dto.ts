import { IsString, IsNumber, IsDateString, IsNotEmpty, IsInt  } from 'class-validator';
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

  @IsDateString()
  @Transform(({ value }) => new Date(value))
  expense_date!: string;

  @IsInt()
  user_id!: number;
}
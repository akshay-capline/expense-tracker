import {
  IsString,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

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
  date!: string;

  @IsInt()
  user_id!: number;
}
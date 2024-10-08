import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from '@nestjs/class-validator';
import { CreateDayOfWeekDto } from './create-day-of-week.dto';
import { CreateTimeOfDayDto } from './create-time-of-day.dto';

export class CreateSportsCourtDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A modalidade não pode ser vazia!' })
  @IsString()
  modality: string;

  @IsNotEmpty({ message: 'O preço não pode ser vazio!' })
  @IsNumber()
  price: number;

  @IsArray()
  @IsNumber({}, { each: true })
  daysOfWeek: CreateDayOfWeekDto[];

  @IsArray()
  @IsNumber({}, { each: true })
  timesOfDay: CreateTimeOfDayDto[];
}

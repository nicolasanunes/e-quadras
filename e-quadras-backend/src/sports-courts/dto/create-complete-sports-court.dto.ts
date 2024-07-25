import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { CreateLocationDto } from './create-location.dto';
import { CreateDayOfWeekDto } from './create-day-of-week.dto';

export class CreateCompleteSportsCourtDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A modalidade não pode ser vazia!' })
  @IsString()
  modality: string;

  @IsNotEmpty({ message: 'O preço não pode ser vazio!' })
  @IsNumber()
  price: number;

  @IsNotEmpty({ message: 'A localidade não pode ser vazia!' })
  location: CreateLocationDto;

  daysOfWeek: CreateDayOfWeekDto[];
}

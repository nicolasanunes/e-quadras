import { IsNumber } from '@nestjs/class-validator';

export class CreateDayOfWeekDto {
  @IsNumber()
  id: number;
}

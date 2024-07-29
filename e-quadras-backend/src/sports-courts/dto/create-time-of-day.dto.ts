import { IsNumber } from '@nestjs/class-validator';

export class CreateTimeOfDayDto {
  @IsNumber()
  id: number;
}

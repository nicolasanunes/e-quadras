import { IsNotEmpty } from '@nestjs/class-validator';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';

export class CreateScheduleAppointmentDto {
  @IsNotEmpty({ message: 'O usuário não pode ser vazio!' })
  customer: CreateCustomerDto;

  dateTimeSchedule: Date;

  sportsCourt: number;
}

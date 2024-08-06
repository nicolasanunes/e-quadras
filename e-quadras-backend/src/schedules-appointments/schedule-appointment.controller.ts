import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScheduleAppointmentService } from './schedule-appointment.service';
import { CreateScheduleAppointmentDto } from './dto/create-schedule-appointment.dto';

@Controller('schedule-appointment')
export class ScheduleAppointmentController {
  constructor(
    private readonly scheduleAppointmentService: ScheduleAppointmentService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  createScheduleAppointment(
    @Body() body: CreateScheduleAppointmentDto,
  ): Promise<object> {
    return this.scheduleAppointmentService.createScheduleAppointment(body);
  }
}

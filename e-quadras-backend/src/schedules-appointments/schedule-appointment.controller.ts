import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScheduleAppointmentService } from './schedule-appointment.service';
import { CreateScheduleAppointmentDto } from './dto/create-schedule-appointment.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UserTypeEnum } from 'src/users/enums/user-type.enum';
import { ListScheduleAppointmentDto } from './dto/list-schedule-appointment.dto';

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

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Get()
  async listAllScheduleAppointments(): Promise<ListScheduleAppointmentDto[]> {
    return (
      await this.scheduleAppointmentService.listAllScheduleAppointments()
    ).map((scheduleAppointment) => scheduleAppointment);
  }
}

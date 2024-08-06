export class CreateInativeScheduleDto {
  inativeSchedules: CreateEachInativeScheduleDto[];
}

export class CreateEachInativeScheduleDto {
  sportsCourt: number;

  dayOfWeek: number;

  timeOfDay: number;
}

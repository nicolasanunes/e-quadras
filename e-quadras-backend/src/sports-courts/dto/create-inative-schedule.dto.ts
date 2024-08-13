export class CreateInativeScheduleDto {
  inativeSchedules: CreateEachInativeScheduleDto[];
}

export class CreateEachInativeScheduleDto {
  dateTimeInativeSchedule: Date;
  sportsCourt: number;
}

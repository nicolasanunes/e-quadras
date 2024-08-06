export class CreateExtraScheduleDto {
  extraSchedules: CreateEachExtraScheduleDto[];
}

export class CreateEachExtraScheduleDto {
  sportsCourt: number;

  dayOfWeek: number;

  timeOfDay: number;
}

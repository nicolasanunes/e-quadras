export class CreateExtraScheduleDto {
  extraSchedules: CreateEachExtraScheduleDto[];
}

export class CreateEachExtraScheduleDto {
  dateTimeExtraSchedule: Date;
  sportsCourt: number;
}

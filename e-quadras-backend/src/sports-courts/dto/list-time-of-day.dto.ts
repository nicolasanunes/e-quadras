import { TimeOfDayEntity } from '../entities/time-of-day.entity';

export class ListTimeOfDayDto {
  dayHour: number;

  constructor(timeOfDay: TimeOfDayEntity) {
    this.dayHour = timeOfDay.dayHour;
  }
}

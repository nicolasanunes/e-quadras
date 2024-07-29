import { DayOfWeekEntity } from '../entities/day-of-week.entity';

export class ListDayOfWeekDto {
  dayName: string;

  constructor(dayOfWeek: DayOfWeekEntity) {
    this.dayName = dayOfWeek.dayName;
  }
}

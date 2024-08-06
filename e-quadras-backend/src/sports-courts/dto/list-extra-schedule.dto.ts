import { ListDayOfWeekDto } from './list-day-of-week.dto';
import { ListSportsCourtDto } from './list-sports-court.dto';
import { ListTimeOfDayDto } from './list-time-of-day.dto';

export class ListExtraScheduleDto {
  sportsCourt: ListSportsCourtDto;
  dayOfWeek: ListDayOfWeekDto;
  timeOfDay: ListTimeOfDayDto;

  constructor(
    sportsCourt: ListSportsCourtDto,
    dayOfWeek: ListDayOfWeekDto,
    timeOfDay: ListTimeOfDayDto,
  ) {
    this.sportsCourt = sportsCourt;
    this.dayOfWeek = dayOfWeek;
    this.timeOfDay = timeOfDay;
  }
}

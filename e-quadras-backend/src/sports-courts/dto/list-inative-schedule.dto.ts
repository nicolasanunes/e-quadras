import { InativeScheduleEntity } from '../entities/inative-schedule.entity';
import { ListSportsCourtDto } from './list-sports-court.dto';

export class ListInativeScheduleDto {
  dateTimeInativeSchedule: Date;
  sportsCourt: ListSportsCourtDto;

  constructor(inativeSchedule: InativeScheduleEntity) {
    this.dateTimeInativeSchedule = inativeSchedule.dateTimeInativeSchedule;
    this.sportsCourt = inativeSchedule.sportsCourt;
  }
}

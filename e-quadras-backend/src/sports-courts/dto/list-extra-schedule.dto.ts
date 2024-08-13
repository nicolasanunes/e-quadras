import { ExtraScheduleEntity } from '../entities/extra-schedule.entity';
import { ListSportsCourtDto } from './list-sports-court.dto';

export class ListExtraScheduleDto {
  dateTimeExtraSchedule: Date;
  sportsCourt: ListSportsCourtDto;

  constructor(extraSchedule: ExtraScheduleEntity) {
    this.dateTimeExtraSchedule = extraSchedule.dateTimeExtraSchedule;
    this.sportsCourt = extraSchedule.sportsCourt;
  }
}

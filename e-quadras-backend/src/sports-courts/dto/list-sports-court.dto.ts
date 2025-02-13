import { SportsCourtEntity } from '../entities/sports-court.entity';
import { ListDayOfWeekDto } from './list-day-of-week.dto';
import { ListUserDto } from 'src/users/dto/list-user.dto';
import { ListTimeOfDayDto } from './list-time-of-day.dto';
import { DayOfWeekEntity } from '../entities/day-of-week.entity';
import { TimeOfDayEntity } from '../entities/time-of-day.entity';
import { ListLocationDto } from 'src/companies/dto/list-location.dto';

export class ListSportsCourtDto {
  name: string;
  modality: string[];
  price: number;
  isActive: boolean;
  user: ListUserDto;
  location: ListLocationDto;
  daysOfWeek: ListDayOfWeekDto[];
  timesOfDay: ListTimeOfDayDto[];

  constructor(
    sportsCourt: SportsCourtEntity,
    daysOfWeek: DayOfWeekEntity[],
    timesOfDay: TimeOfDayEntity[],
  ) {
    this.name = sportsCourt.name;
    this.modality = sportsCourt.modality;
    this.price = sportsCourt.price;
    this.isActive = sportsCourt.isActive;
    this.user = sportsCourt.user;
    this.location = sportsCourt.location;
    this.daysOfWeek = daysOfWeek;
    this.timesOfDay = timesOfDay;
  }
}

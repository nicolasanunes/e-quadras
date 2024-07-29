import { SportsCourtEntity } from '../entities/sports-court.entity';
import { ListDayOfWeekDto } from './list-day-of-week.dto';
import { ListLocationDto } from './list-location.dto';
import { ListUserDto } from 'src/users/dto/list-user.dto';
import { ListTimeOfDayDto } from './list-time-of-day.dto';
import { DayOfWeekEntity } from '../entities/day-of-week.entity';
import { TimeOfDayEntity } from '../entities/time-of-day.entity';

export class ListSportsCourtDto {
  name: string;
  modality: string;
  price: number;
  isActive: boolean;
  locationId: number;
  location: ListLocationDto;
  userId: number;
  user: ListUserDto;
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
    this.locationId = sportsCourt.locationId;
    this.location = new ListLocationDto(sportsCourt.location);
    this.userId = sportsCourt.userId;
    this.user = new ListUserDto(sportsCourt.user);
    this.daysOfWeek = daysOfWeek;
    this.timesOfDay = timesOfDay;
  }
}

import { SportsCourtEntity } from '../entities/sports-court.entity';
import { ListLocationDto } from './list-location.dto';
import { ListUserDto } from 'src/users/dto/list-user.dto';

export class ListSportsCourtDto {
  name: string;
  modality: string;
  price: number;
  isActive: boolean;
  locationId: number;
  location: ListLocationDto;
  userId: number;
  user: ListUserDto;

  constructor(sportsCourt: SportsCourtEntity) {
    this.name = sportsCourt.name;
    this.modality = sportsCourt.modality;
    this.price = sportsCourt.price;
    this.isActive = sportsCourt.isActive;
    this.locationId = sportsCourt.locationId;
    this.location = new ListLocationDto(sportsCourt.location);
    this.userId = sportsCourt.userId;
    this.user = new ListUserDto(sportsCourt.user);
  }
}

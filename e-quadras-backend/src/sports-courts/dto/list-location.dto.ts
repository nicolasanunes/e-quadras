import { LocationEntity } from '../entities/location.entity';

export class ListLocationDto {
  numberAddress: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;

  constructor(location: LocationEntity) {
    this.numberAddress = location.numberAddress;
    this.street = location.street;
    this.neighborhood = location.neighborhood;
    this.city = location.city;
    this.state = location.state;
    this.cep = location.cep;
  }
}

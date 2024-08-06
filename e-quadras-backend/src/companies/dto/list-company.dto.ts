import { ListLocationDto } from 'src/companies/dto/list-location.dto';
import { CompanyEntity } from '../entities/company.entity';

export class ListCompanyDto {
  name: string;
  location: ListLocationDto;

  constructor(company: CompanyEntity) {
    this.location = company.location;
  }
}

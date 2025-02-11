import { CompanyEntity } from '../entities/company.entity';

export class ListCompanyDto {
  name: string;

  constructor(company: CompanyEntity) {
    this.name = company.name;
  }
}

import { CustomerEntity } from '../entities/customer.entity';

export class ListCustomerDto {
  name: string;
  phone: string;

  constructor(customer: CustomerEntity) {
    this.name = customer.name;
    this.phone = customer.phone;
  }
}

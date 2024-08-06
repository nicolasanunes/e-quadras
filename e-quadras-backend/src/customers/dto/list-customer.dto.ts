import { CustomerEntity } from '../entities/customer.entity';

export class ListCustomerDto {
  name: string;
  email: string;
  phone: string;

  constructor(customer: CustomerEntity) {
    this.name = customer.name;
    this.email = customer.email;
    this.phone = customer.phone;
  }
}

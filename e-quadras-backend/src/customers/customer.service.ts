import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async createCustomer(createCustomer: CreateCustomerDto): Promise<object> {
    const createdCustomer = await this.customerRepository.save({
      name: createCustomer.name,
      email: createCustomer.email,
      phone: createCustomer.phone,
    });

    return { message: `O cliente ${createdCustomer.name} foi criado!` };
  }
}

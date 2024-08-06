import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UsePipes(ValidationPipe)
  @Post()
  createCustomer(@Body() createCustomer: CreateCustomerDto): Promise<object> {
    return this.customerService.createCustomer(createCustomer);
  }
}

import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O e-mail não pode ser vazio!' })
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'O telefone não pode ser vazio!' })
  @IsString()
  phone: string;
}

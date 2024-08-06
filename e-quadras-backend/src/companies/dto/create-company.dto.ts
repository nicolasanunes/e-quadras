import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { CreateLocationDto } from 'src/companies/dto/create-location.dto';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'O nome da empresa não pode ser vazio!' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profilePicture: string;

  @IsNotEmpty({ message: 'A localidade não pode ser vazia!' })
  location: CreateLocationDto;
}

import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'O nome da empresa não pode ser vazio!' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profilePicture: string;
}

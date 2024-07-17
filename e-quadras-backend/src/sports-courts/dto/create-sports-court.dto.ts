import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { CreateLocationDto } from './create-location.dto';

export class CreateSportsCourtDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A modalidade não pode ser vazia!' })
  @IsString()
  modality: string;

  @IsNotEmpty({ message: 'A localidade não pode ser vazia!' })
  location: CreateLocationDto;
}

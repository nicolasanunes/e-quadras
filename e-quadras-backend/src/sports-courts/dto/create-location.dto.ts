import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class CreateLocationDto {
  @IsNotEmpty({ message: 'O número não pode ser vazio!' })
  @IsNumber()
  numberAddress: number;

  @IsNotEmpty({ message: 'A rua não pode ser vazia!' })
  @IsString()
  street: string;

  @IsNotEmpty({ message: 'O bairro não pode ser vazio!' })
  @IsString()
  neighborhood: string;

  @IsNotEmpty({ message: 'A cidade não pode ser vazia!' })
  @IsString()
  city: string;

  @IsNotEmpty({ message: 'O estado não pode ser vazio!' })
  @IsString()
  state: string;

  @IsNotEmpty({ message: 'O CEP não pode ser vazio!' })
  @IsString()
  cep: string;
}

import { IsEmpty, IsNotEmpty } from '@nestjs/class-validator';

export class CreateSportsCourtDto {
  @IsEmpty({ message: 'O ID não pode ser fornecido!' })
  id: number;

  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string;
}

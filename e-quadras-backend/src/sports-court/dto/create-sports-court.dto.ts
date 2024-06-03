import { IsEmpty, IsNotEmpty } from '@nestjs/class-validator';
import { ObjectId } from 'mongodb';

export class CreateSportsCourtDto {
  @IsEmpty({ message: 'O ID não pode ser fornecido!' })
  _id: ObjectId;

  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string;
}

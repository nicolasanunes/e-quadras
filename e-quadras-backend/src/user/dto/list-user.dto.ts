import { ObjectId } from 'mongodb';

export class ListUserDto {
  constructor(
    readonly _id: ObjectId,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly cpf: string,
    readonly phone: string,
    readonly userType: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}

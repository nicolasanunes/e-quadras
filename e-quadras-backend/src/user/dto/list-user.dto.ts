import { ObjectId } from 'mongodb';
import { UserEntity } from '../entities/user.entity';

export class ListUserDto {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  userType: number;

  constructor(userEntity: UserEntity) {
    this._id = userEntity._id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.password = userEntity.password;
    this.cpf = userEntity.cpf;
    this.phone = userEntity.phone;
    this.userType = userEntity.userType;
  }
}

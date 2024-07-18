import { UserEntity } from '../entities/user.entity';

export class ListUserDto {
  email: string;
  name: string;
  phone: string;

  constructor(user: UserEntity) {
    this.email = user.email;
    this.name = user.name;
    this.phone = user.phone;
  }
}

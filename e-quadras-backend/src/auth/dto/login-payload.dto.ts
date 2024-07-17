import { UserEntity } from 'src/users/entities/user.entity';

export class LoginPayloadDto {
  id: number;
  userType: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.userType = user.userType;
  }
}

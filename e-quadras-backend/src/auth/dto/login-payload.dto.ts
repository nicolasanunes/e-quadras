import { ObjectId } from 'mongodb';
import { UserEntity } from 'src/user/entities/user.entity';

export class LoginPayloadDto {
  id: ObjectId;
  userType: number;

  constructor(user: UserEntity) {
    this.id = user._id;
    this.userType = user.userType;
  }
}

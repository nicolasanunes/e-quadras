import { ObjectId } from 'mongodb';
import { UserEntity } from 'src/user/entities/user.entity';

export class LoginPayloadDto {
  _id: ObjectId;
  userType: number;

  constructor(user: UserEntity) {
    this._id = user._id;
    this.userType = user.userType;
  }
}

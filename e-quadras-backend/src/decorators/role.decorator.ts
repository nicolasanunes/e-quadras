import { SetMetadata } from '@nestjs/common';
import { UserTypeEnum } from 'src/users/enums/user-type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypeEnum[]) =>
  SetMetadata(ROLES_KEY, roles);

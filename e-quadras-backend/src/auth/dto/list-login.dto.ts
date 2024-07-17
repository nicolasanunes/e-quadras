import { ListUserDto } from 'src/users/dto/list-user.dto';

export class ListLoginDto {
  user: ListUserDto;
  accessToken: string;
}

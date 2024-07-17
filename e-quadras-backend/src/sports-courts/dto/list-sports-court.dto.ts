import { UserEntity } from 'src/users/entities/user.entity';
import { ListLocationDto } from './list-location.dto';

export class ListSportsCourtDto {
  constructor(
    readonly name: string,
    readonly modality: string,
    readonly isActive: boolean,
    readonly locationId: ListLocationDto,
    readonly userId: UserEntity,
  ) {}
}

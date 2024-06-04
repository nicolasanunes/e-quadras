import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserTypeEnum } from './enum/user-type.enum';
import { ListUserDto } from './dto/list-user.dto';
import { Roles } from 'src/decorator/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post('/admin')
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Roles(UserTypeEnum.Root)
  @Post()
  async createAdmin(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser, UserTypeEnum.Admin);
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.Root)
  @Get('/all')
  async listAllUsers(): Promise<ListUserDto[]> {
    return (await this.userService.listAllUsers()).map(
      (userEntity) => new ListUserDto(userEntity),
    );
  }
}

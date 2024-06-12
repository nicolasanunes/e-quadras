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
import { UserId } from 'src/decorator/user-id.decorator';
import { ObjectId } from 'mongodb';

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

  @Roles(UserTypeEnum.User, UserTypeEnum.Admin, UserTypeEnum.Root)
  @Get()
  async listInfoUser(@UserId() _id: ObjectId): Promise<ListUserDto> {
    return new ListUserDto(await this.userService.listUserById(_id));
  }
}

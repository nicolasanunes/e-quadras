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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post('/admin')
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Post()
  async createAdmin(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser, UserTypeEnum.Admin);
  }

  @Get('all')
  async listAllUsers(): Promise<ListUserDto[]> {
    return (await this.userService.listAllUsers()).map(
      (userEntity) =>
        new ListUserDto(
          userEntity._id,
          userEntity.name,
          userEntity.email,
          userEntity.password,
          userEntity.cpf,
          userEntity.phone,
          userEntity.userType,
          userEntity.createdAt,
          userEntity.updatedAt,
        ),
    );
  }
}

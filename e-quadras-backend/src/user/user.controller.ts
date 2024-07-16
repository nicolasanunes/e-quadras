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
import { UserTypeEnum } from './enum/user-type.enum';
import { ListUserDto } from './dto/list-user.dto';
import { Roles } from 'src/decorator/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.createUser(createUser, UserTypeEnum.Admin);
  }

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Get()
  async listAllUsers(): Promise<ListUserDto[]> {
    return (await this.userService.listAllUsers()).map((user) => user);
  }
}

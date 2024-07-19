import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserTypeEnum } from './enums/user-type.enum';
import { ListUserDto } from './dto/list-user.dto';
import { Roles } from 'src/decorators/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.createUser(createUser, UserTypeEnum.Admin);
  }

  @Roles(UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Get()
  async listAllUsers(): Promise<ListUserDto[]> {
    return (await this.userService.listAllUsers()).map((user) => user);
  }

  @Roles(UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<object> {
    return this.userService.deleteUser(id);
  }
}

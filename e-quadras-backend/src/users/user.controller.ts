import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserTypeEnum } from './enums/user-type.enum';
import { ListUserDto } from './dto/list-user.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

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
  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.userService.updateUser(id, updateUser);
  }

  @Roles(UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<object> {
    return this.userService.deleteUser(id);
  }
}

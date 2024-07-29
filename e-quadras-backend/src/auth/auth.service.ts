import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { LoginDto } from './dto/login.dto';
import { ListLoginDto } from './dto/list-login.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { validatePassword } from 'src/utils/password';
import { ListUserDto } from 'src/users/dto/list-user.dto';
import { LoginPayloadDto } from './dto/login-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginDto): Promise<ListLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .listUserByEmail(login.email)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      login.password,
      user?.password || '',
    );

    if (!user || !isMatch) {
      throw new NotFoundException('E-mail e/ou senha inválidos!');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
      user: new ListUserDto(user),
    };
  }
}

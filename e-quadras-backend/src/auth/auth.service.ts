import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { ListLoginDto } from './dto/list-login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { validatePassword } from 'src/utils/password';
import { ListUserDto } from 'src/user/dto/list-user.dto';
import { LoginPayloadDto } from './dto/login-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ListLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .listUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      loginDto.password,
      user?.password || '',
    );

    if (!user || !isMatch) {
      throw new NotFoundException('E-mail e/ou senha inválidos!');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
      user: new ListUserDto(user.email, user.name, user.phone),
    };
  }
}

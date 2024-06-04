import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { createHashedPassword } from 'src/utils/password';
import { UserTypeEnum } from './enum/user-type.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    userTypeEnum?: number,
  ): Promise<UserEntity> {
    const user = await this.listUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException('Este e-mail já está sendo utilizado!');
    }

    const hashedPassword = await createHashedPassword(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      userType: userTypeEnum ? userTypeEnum : UserTypeEnum.User,
      password: hashedPassword,
    });
  }

  async listAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async listUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`email: ${email} not found.`);
    }

    return user;
  }
}

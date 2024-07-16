import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { createHashedPassword } from 'src/utils/password';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDto } from './dto/list-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    userTypeEnum: number,
  ): Promise<CreateUserDto> {
    const user = await this.listUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException(
        'Já existe um usuário com este endereço de e-mail!',
      );
    }

    const hashedPassword = await createHashedPassword(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      userType: userTypeEnum,
      password: hashedPassword,
    });
  }

  async listAllUsers(): Promise<ListUserDto[]> {
    return this.userRepository.find();
  }

  async listUserByEmail(email: string): Promise<ListUserDto> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`Não existe usuário com o e-mail ${email}`);
    }

    return user;
  }
}

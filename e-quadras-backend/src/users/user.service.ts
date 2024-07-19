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
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUser: CreateUserDto,
    userType: number,
  ): Promise<CreateUserDto> {
    const user = await this.listUserByEmail(createUser.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException(
        'Já existe um usuário com este endereço de e-mail!',
      );
    }

    const hashedPassword = await createHashedPassword(createUser.password);

    return this.userRepository.save({
      ...createUser,
      userType: userType,
      password: hashedPassword,
    });
  }

  listAllUsers(): Promise<ListUserDto[]> {
    return this.userRepository.find();
  }

  async listUserByEmail(email: string): Promise<ListUserDto> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`Não existe usuário com o e-mail ${email}`);
    }

    return user;
  }

  async updateUser(
    id: number,
    updateUser: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const updatedUser = await this.userRepository.findOne({
      where: { id: id },
    });

    console.log(updatedUser);

    if (updatedUser === null) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    Object.assign(updatedUser, updateUser as UserEntity);

    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: number): Promise<object> {
    const deletedUser = await this.userRepository.findOne({
      where: { id: id },
    });

    if (deletedUser !== null) {
      this.userRepository.delete(id);
      return { message: `O usuário ${deletedUser.name} foi excluído!` };
    } else {
      throw new NotFoundException('O usuário não foi encontrado!');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportsCourtEntity } from './entities/sports-court.entity';
import { Repository } from 'typeorm';
import { CreateSportsCourtDto } from './dto/create-sports-court.dto';
import { ListSportsCourtDto } from './dto/list-sports-court.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationEntity } from './entities/location.entity';

@Injectable()
export class SportsCourtService {
  constructor(
    @InjectRepository(SportsCourtEntity)
    private readonly sportsCourtRepository: Repository<SportsCourtEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  async createSportsCourt(
    createSportsCourt: CreateSportsCourtDto,
    userId: UserEntity,
    isActive: boolean,
  ): Promise<CreateSportsCourtDto> {
    const location = await this.createSportsCourtLocation(
      createSportsCourt.location,
    );

    return this.sportsCourtRepository.save({
      ...createSportsCourt,
      locationId: location,
      userId: userId,
      isActive: isActive,
    });
  }

  // Criar na tabela location com os endereços da quadra fornecidos no momento de criação da quadra
  async createSportsCourtLocation(
    createSportsCourtLocation: CreateLocationDto,
  ): Promise<LocationEntity> {
    return await this.locationRepository.save(createSportsCourtLocation);
  }

  listAllSportsCourts(): Promise<ListSportsCourtDto[]> {
    return this.sportsCourtRepository.find();
  }

  // async deleteSportsCourt(id: number) {
  //   const deletedSportsCourt = await this.sportsCourtRepository.findOneBy({
  //     id: id,
  //   });

  //   if (deletedSportsCourt !== null) {
  //     await this.sportsCourtRepository.delete(id);
  //     return deletedSportsCourt;
  //   } else {
  //     throw new NotFoundException('A quadra de esportes não foi encontrada!');
  //   }
  // }
}

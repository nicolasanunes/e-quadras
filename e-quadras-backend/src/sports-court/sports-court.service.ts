import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportsCourtEntity } from './entities/sports-court.entity';
import { MongoRepository } from 'typeorm';
import { CreateSportsCourtDto } from './dto/create-sports-court.dto';
import { ListSportsCourtDto } from './dto/list-sports-court.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class SportsCourtService {
  constructor(
    @InjectRepository(SportsCourtEntity)
    private readonly sportsCourtRepository: MongoRepository<SportsCourtEntity>,
  ) {}

  async createSportsCourt(
    createSportsCourtDto: CreateSportsCourtDto,
  ): Promise<CreateSportsCourtDto> {
    const sportsCourtEntity = new SportsCourtEntity();

    Object.assign(sportsCourtEntity, createSportsCourtDto as SportsCourtEntity);

    return this.sportsCourtRepository.save(sportsCourtEntity);
  }

  async listAllSportsCourts(): Promise<ListSportsCourtDto[]> {
    const savedSportsCourt = await this.sportsCourtRepository.find();

    const listAllSportsCourt = savedSportsCourt.map(
      (sportsCourt) =>
        new ListSportsCourtDto(sportsCourt._id, sportsCourt.name),
    );

    return listAllSportsCourt;
  }

  async deleteSportsCourt(id: ObjectId) {
    const deletedSportsCourt = await this.sportsCourtRepository.findOneBy({
      _id: new ObjectId(id),
    });

    if (deletedSportsCourt !== null) {
      await this.sportsCourtRepository.delete(id);
      return deletedSportsCourt;
    } else {
      throw new NotFoundException('A quadra de esportes não foi encontrada!');
    }
  }
}

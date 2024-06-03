import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SportsCourtService } from './sports-court.service';
import { CreateSportsCourtDto } from './dto/create-sports-court.dto';
import { ListSportsCourtDto } from './dto/list-sports-court.dto';
import { ObjectId } from 'mongodb';

@Controller('sports-court')
export class SportsCourtController {
  constructor(private readonly sportsCourtService: SportsCourtService) {}

  @Post()
  async createSportsCourt(
    @Body() createSportsCourtDto: CreateSportsCourtDto,
  ): Promise<any> {
    const createdSportsCourt =
      await this.sportsCourtService.createSportsCourt(createSportsCourtDto);

    return {
      sportsCourt: new ListSportsCourtDto(
        createdSportsCourt._id,
        createdSportsCourt.name,
      ),
      message: 'Quadra de esportes criada!',
    };
  }

  @Get()
  async listAllSportsCourts(): Promise<ListSportsCourtDto[]> {
    const savedSportsCourt =
      await this.sportsCourtService.listAllSportsCourts();

    return savedSportsCourt;
  }

  @Delete(':id')
  async deleteSportsCourt(@Param('id') id: ObjectId): Promise<any> {
    const deletedSportsCourt =
      await this.sportsCourtService.deleteSportsCourt(id);

    return {
      sportsCourt: new ListSportsCourtDto(
        deletedSportsCourt._id,
        deletedSportsCourt.name,
      ),
      message: `Quadra de esportes ${deletedSportsCourt.name} deletada!`,
    };
  }
}

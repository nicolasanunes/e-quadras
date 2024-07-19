import {
  Body,
  Controller,
  Delete,
  //Delete,
  Get,
  Param,
  //Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SportsCourtService } from './sports-court.service';
import { CreateSportsCourtDto } from './dto/create-sports-court.dto';
import { ListSportsCourtDto } from './dto/list-sports-court.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UserTypeEnum } from 'src/users/enums/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('sports-court')
export class SportsCourtController {
  constructor(private readonly sportsCourtService: SportsCourtService) {}

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createSportsCourt(
    @UserId() userId: number,
    @Body() createSportsCourt: CreateSportsCourtDto,
  ): Promise<CreateSportsCourtDto> {
    return this.sportsCourtService.createSportsCourt(
      createSportsCourt,
      userId,
      true,
    );
  }

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Get()
  async listAllSportsCourts(): Promise<ListSportsCourtDto[]> {
    return (await this.sportsCourtService.listAllSportsCourts()).map(
      (sportsCourt) => sportsCourt,
    );
  }

  @Roles(UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Delete(':id')
  deleteSportsCourt(@Param('id') id: number): Promise<any> {
    return this.sportsCourtService.deleteSportsCourt(id);
  }
}

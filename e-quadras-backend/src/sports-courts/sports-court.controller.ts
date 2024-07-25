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
import { ListSportsCourtDto } from './dto/list-sports-court.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UserTypeEnum } from 'src/users/enums/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';
import { CreateCompleteSportsCourtDto } from './dto/create-complete-sports-court.dto';

@Controller('sports-court')
export class SportsCourtController {
  constructor(private readonly sportsCourtService: SportsCourtService) {}

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCompleteSportsCourt(
    @UserId() userId: number,
    @Body() body: CreateCompleteSportsCourtDto,
  ): Promise<object> {
    return this.sportsCourtService.createCompleteSportsCourt(body, userId);
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
  deleteSportsCourt(@Param('id') id: number): Promise<object> {
    return this.sportsCourtService.deleteSportsCourt(id);
  }
}

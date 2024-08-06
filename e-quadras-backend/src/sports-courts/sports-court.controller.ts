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
import { CreateSportsCourtDto } from './dto/create-sports-court.dto';
import { CreateExtraScheduleDto } from './dto/create-extra-schedule.dto';
import { ListExtraScheduleDto } from './dto/list-extra-schedule.dto';
import { CreateInativeScheduleDto } from './dto/create-inative-schedule.dto';
import { ListInativeScheduleDto } from './dto/list-inative-schedule.dto';

@Controller('sports-court')
export class SportsCourtController {
  constructor(private readonly sportsCourtService: SportsCourtService) {}

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createSportsCourt(
    @UserId() userId: number,
    @Body() body: CreateSportsCourtDto,
  ): Promise<object> {
    return this.sportsCourtService.createSportsCourt(body, userId);
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

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post('/extra-schedule')
  createExtraSchedule(@Body() body: CreateExtraScheduleDto): Promise<object> {
    return this.sportsCourtService.createExtraSchedule(body);
  }

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Get('/extra-schedule/:id')
  async listExtraScheduleBySportsCourtId(
    @Param('id') sportsCourtId: number,
  ): Promise<ListExtraScheduleDto[]> {
    return await this.sportsCourtService.listExtraScheduleBySportsCourtId(
      sportsCourtId,
    );
  }

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post('/inative-schedule')
  createInativeSchedule(
    @Body() body: CreateInativeScheduleDto,
  ): Promise<object> {
    return this.sportsCourtService.createInativeSchedule(body);
  }

  @Roles(UserTypeEnum.Root, UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Get('/inative-schedule/:id')
  async listInativeScheduleBySportsCourtId(
    @Param('id') sportsCourtId: number,
  ): Promise<ListInativeScheduleDto[]> {
    return await this.sportsCourtService.listInativeScheduleBySportsCourtId(
      sportsCourtId,
    );
  }
}

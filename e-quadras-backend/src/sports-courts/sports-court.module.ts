import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsCourtEntity } from './entities/sports-court.entity';
import { SportsCourtController } from './sports-court.controller';
import { SportsCourtService } from './sports-court.service';
import { LocationEntity } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SportsCourtEntity, LocationEntity])],
  controllers: [SportsCourtController],
  providers: [SportsCourtService],
})
export class SportsCourtModule {}

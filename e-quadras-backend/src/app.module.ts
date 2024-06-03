import { Module } from '@nestjs/common';
import { SportsCourtController } from './sports-court/sports-court.controller';
import { SportsCourtService } from './sports-court/sports-court.service';
import { SportsCourtModule } from './sports-court/sports-court.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './db/db-config.service';
import { SportsCourtEntity } from './sports-court/entities/sports-court.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SportsCourtEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
    SportsCourtModule,
  ],
  controllers: [SportsCourtController],
  providers: [SportsCourtService],
})
export class AppModule {}

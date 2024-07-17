import { Module } from '@nestjs/common';
import { SportsCourtModule } from './sports-courts/sports-court.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './db/db-config.service';
import { SportsCourtEntity } from './sports-courts/entities/sports-court.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { UserEntity } from './users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from './companies/company.module';
import { CompanyEntity } from './companies/entities/company.entity';
import { LocationEntity } from './sports-courts/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      SportsCourtEntity,
      LocationEntity,
      UserEntity,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
    SportsCourtModule,
    AuthModule,
    JwtModule,
    UserModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

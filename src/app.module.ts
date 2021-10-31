import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import controllers from './app/controllers';
import services from './app/services';
import entities from './db/entities';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './app/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PassportModule,
    JwtModule.register({
      secret: configuration().jwt.secret,
    }),
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, JwtStrategy, ...services],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

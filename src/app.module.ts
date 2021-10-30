import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './app/controllers/users.controller';
import { UsersService } from './app/services/users.service';
import { User } from './db/entities/user.entity';
import configuration from './config/configuration';
import controllers from './app/controllers';
import services from './app/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...services],
})
export class AppModule {
  constructor(private connection: Connection) { }
}

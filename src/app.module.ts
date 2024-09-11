import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MODULES } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './config/database.config';
import { ModelModule } from './models/model.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmOptions),
    ModelModule,
    ...MODULES
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

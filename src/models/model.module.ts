/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { repositories } from './repositories';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    controllers: [],
    providers: [...repositories],
    exports: [...repositories, TypeOrmModule],
})
export class ModelModule { }

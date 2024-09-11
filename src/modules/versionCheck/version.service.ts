import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AppEntity } from 'src/models/entities/app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(AppEntity)
    private appRepository: Repository<AppEntity>,
  ) { }

  async findAll(): Promise<AppEntity[]> {
    return this.appRepository.find();
  }

  async findOne(id: number): Promise<AppEntity> {
    const app = await this.appRepository.findOneBy({ id });
    if (!app) {
      throw new NotFoundException(`app with id ${id} not found`);
    }
    return app;
  }

  async create(app: AppEntity): Promise<AppEntity> {
    return this.appRepository.save(app);
  }

  async update(id: number, app: Partial<AppEntity>): Promise<AppEntity> {
    await this.appRepository.update(id, app);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.appRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`app with id ${id} not found`);
    }
  }
}

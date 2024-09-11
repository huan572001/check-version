/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { VersionService } from './version.service';
import { AppEntity } from 'src/models/entities/app.entity';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { AppDto } from './dto/app.dto';

@Controller('version-check')
export class VersionCheckController {
  private readonly API_KEY = 'your-secret-api-key'; // Đặt API key của bạn ở đây

  constructor(private readonly VersionService: VersionService) { }

  @Get()
  async findAll(): Promise<AppEntity[]> {
    return this.VersionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AppEntity> {
    return this.VersionService.findOne(id);
  }

  @Post()
  @ApiSecurity('apiKey')
  @UseGuards(ApiKeyGuard)
  @ApiResponse({ status: 200, description: 'Create app', type: AppDto })
  async create(@Body() app: AppEntity): Promise<AppEntity> {
    return this.VersionService.create(app);
  }

  @Put(':id')
  @ApiSecurity('apiKey')
  @UseGuards(ApiKeyGuard)
  @ApiResponse({ status: 200, description: 'Create app', type: AppDto })
  async update(@Param('id') id: number, @Body() app: AppEntity): Promise<AppEntity> {
    return this.VersionService.update(id, app);
  }

  @ApiSecurity('apiKey')
  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.VersionService.remove(id);
  }
}

import { Module } from '@nestjs/common';
import { VersionCheckController } from './version.controller';
import { VersionService } from './version.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [VersionCheckController],
  providers: [VersionService],
})
export class VersionCheckModule {}

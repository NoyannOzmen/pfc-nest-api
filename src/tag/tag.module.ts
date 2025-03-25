import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './tag.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Tag]),
  ],
  controllers: [TagController],
  providers: [
    TagService
  ],
  exports: [TagService]
})
export class TagModule {}

import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Animal_Tag, Tag } from './tag.model';

@Module({
  imports: [SequelizeModule.forFeature([Tag, Animal_Tag])],
  controllers: [TagController],
  providers: [TagService],
  exports: [SequelizeModule],
})
export class TagModule {}

import { Module } from '@nestjs/common';
import { AnimalTagService } from './animal_tag.service';
import { AnimalTagController } from './animal_tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Animal_Tag } from './animal_tag.model';

@Module({
  imports: [SequelizeModule.forFeature([Animal_Tag])],
  controllers: [AnimalTagController],
  providers: [AnimalTagService],
  exports: [AnimalTagService]
})
export class AnimalTagModule {}

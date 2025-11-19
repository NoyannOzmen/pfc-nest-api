import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Animal } from './animal.model';
import { DemandeModule } from 'src/demande/demande.module';
import { TagModule } from 'src/tag/tag.module';
import { MediaModule } from 'src/media/media.module';
import { AnimalTagModule } from 'src/animal_tag/animal_tag.module';
import { Demande } from 'src/demande/demande.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Animal, Demande]),
    DemandeModule,
    TagModule,
    MediaModule,
    AnimalTagModule
  ],
  controllers: [AnimalController],
  providers: [
    AnimalService,
  ],
  exports: [ AnimalService]
})
export class AnimalModule {}

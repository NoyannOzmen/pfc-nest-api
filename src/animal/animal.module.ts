import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Animal } from './animal.model';
import { DemandeModule } from 'src/demande/demande.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Animal]),
    DemandeModule
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule {}

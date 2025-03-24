import { Module } from '@nestjs/common';
import { DemandeService } from './demande.service';
import { DemandeController } from './demande.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Demande } from './demande.model';

@Module({
  imports: [SequelizeModule.forFeature([Demande])],
  controllers: [DemandeController],
  providers: [DemandeService],
  exports: [DemandeService]
})
export class DemandeModule {}

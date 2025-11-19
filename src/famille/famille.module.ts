import { Module } from '@nestjs/common';
import { FamilleService } from './famille.service';
import { FamilleController } from './famille.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Famille } from './famille.model';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';
import { Animal } from 'src/animal/animal.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Famille, Animal]),
    UtilisateurModule,
  ],
  controllers: [FamilleController],
  providers: [FamilleService],
  exports: [FamilleService]
})
export class FamilleModule {}
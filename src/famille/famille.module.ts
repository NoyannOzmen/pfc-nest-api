import { Module } from '@nestjs/common';
import { FamilleService } from './famille.service';
import { FamilleController } from './famille.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Famille } from './famille.model';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Famille]),
    UtilisateurModule
  ],
  controllers: [FamilleController],
  providers: [FamilleService]
})
export class FamilleModule {}
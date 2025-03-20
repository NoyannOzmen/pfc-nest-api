import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Utilisateur } from './utilisateur.model';

@Module({
  imports: [SequelizeModule.forFeature([Utilisateur])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [SequelizeModule],
})
export class UtilisateurModule {}

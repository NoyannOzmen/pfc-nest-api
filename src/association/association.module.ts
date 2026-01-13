import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Association } from './association.model';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';
import { DemandeModule } from 'src/demande/demande.module';
import { AnimalModule } from 'src/animal/animal.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Association]),
    DemandeModule,
    AnimalModule,
    UtilisateurModule,
  ],
  controllers: [AssociationController],
  providers: [AssociationService],
  exports: [AssociationService],
})
export class AssociationModule {}

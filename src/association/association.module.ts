import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Association } from './association.model';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Association]),
    UtilisateurModule
  ],
  controllers: [AssociationController],
  providers: [
    AssociationService]
})
export class AssociationModule {}

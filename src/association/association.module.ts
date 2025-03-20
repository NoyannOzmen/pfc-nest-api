import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Association } from './association.model';

@Module({
  imports: [SequelizeModule.forFeature([Association])],
  controllers: [AssociationController],
  providers: [AssociationService],
  exports: [SequelizeModule],
})
export class AssociationModule {}

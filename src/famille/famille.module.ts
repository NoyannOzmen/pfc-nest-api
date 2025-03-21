import { Module } from '@nestjs/common';
import { FamilleService } from './famille.service';
import { FamilleController } from './famille.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Famille } from './famille.model';

@Module({
  imports: [SequelizeModule.forFeature([Famille])],
  controllers: [FamilleController],
  providers: [FamilleService]
})
export class FamilleModule {}

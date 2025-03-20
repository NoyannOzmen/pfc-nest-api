import { Module } from '@nestjs/common';
import { EspeceService } from './espece.service';
import { EspeceController } from './espece.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Espece } from './espece.model';

@Module({
  imports: [SequelizeModule.forFeature([Espece])],
  controllers: [EspeceController],
  providers: [EspeceService],
  exports: [SequelizeModule],
})
export class EspeceModule {}

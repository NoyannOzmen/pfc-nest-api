import { PartialType } from '@nestjs/mapped-types';
import { CreateEspeceDto } from './create-espece.dto';

export class UpdateEspeceDto extends PartialType(CreateEspeceDto) {}

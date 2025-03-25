import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalTagDto } from './create-animal_tag.dto';

export class UpdateAnimalTagDto extends PartialType(CreateAnimalTagDto) {}

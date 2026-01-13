import {
  IsAlpha,
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  nom_animal: string;
  couleur_animal: string;
  sexe_animal: string;
  espece_animal: string;
  statut: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  description_animal: string;

  @IsString()
  @IsOptional()
  @IsAlpha()
  race_animal: string;

  @IsOptional()
  tags: CreateTagDto | Array<CreateTagDto> | null;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  association_id: number;
  age_animal: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  famille_id: number;
}

import { CreateTagDto } from "src/tag/dto/create-tag.dto";

export class CreateAnimalDto {
  readonly nom_animal: string;
  readonly race_animal: string;
  readonly couleur_animal: string;
  readonly age_animal: number;
  readonly sexe_animal: string;
  readonly description_animal: string;
  tags : CreateTagDto | Array<CreateTagDto> | null;
  statut: string;
  association_id : number;
  famille_id : number
  readonly espece_animal: string
}

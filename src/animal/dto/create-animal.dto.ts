import { CreateTagDto } from "src/tag/dto/create-tag.dto";

export class CreateAnimalDto {
  readonly nom: string;
  readonly race: string;
  readonly couleur: string;
  readonly age: number;
  readonly sexe: string;
  readonly description: string;
  tags : CreateTagDto | Array<CreateTagDto> | null;
  statut: string;
  association_id : number;
  famille_id : number
}

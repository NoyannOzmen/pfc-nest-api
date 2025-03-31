import { IsAlphanumeric, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateFamilleDto {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  readonly nom: string;
  readonly prenom: string;
  readonly telephone: string;
  readonly rue: string;
  readonly commune: string;
  readonly code_postal: string;
  readonly pays: string;
  readonly hebergement: string;

  @IsString()
  @IsOptional()
  @IsAlphanumeric()
  readonly terrain: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  utilisateur_id : number
}

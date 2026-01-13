import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateAssociationDto {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  nom: string;
  responsable: string;
  rue: string;
  commune: string;
  code_postal: string;
  pays: string;
  siret: string;
  telephone: string;

  @IsString()
  @IsOptional()
  @IsAlphanumeric()
  description: string;

  @IsOptional()
  @IsUrl(
    { protocols: ['http', 'https'], require_protocol: true },
    { message: 'URL non valide' },
  )
  site: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  utilisateur_id: number;
}

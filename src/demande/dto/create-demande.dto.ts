import {
  IsAlpha,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateDemandeDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly famille_id: number;
  readonly animal_id: number;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  readonly statut_demande: string;

  @IsDate()
  @IsNotEmpty()
  readonly date_debut: Date;
  readonly date_fin: Date;
}

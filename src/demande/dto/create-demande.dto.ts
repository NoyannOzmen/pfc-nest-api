export class CreateDemandeDto {
  readonly famille_id: number;
  readonly animal_id: number;
  readonly statut_demande: string;
  readonly date_debut: Date;
  readonly date_fin: Date;
}

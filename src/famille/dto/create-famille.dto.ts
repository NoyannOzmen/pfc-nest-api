export class CreateFamilleDto {
  readonly nom: string;
  readonly prenom: string;
  readonly telephone: string;
  readonly rue: string;
  readonly commune: string;
  readonly code_postal: string;
  readonly pays: string;
  readonly hebergement: string;
  readonly terrain: string;
  utilisateur_id : number
}

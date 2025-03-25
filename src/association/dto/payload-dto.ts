export class SearchBodyDto {
  dptSelect: number;
  readonly dptSelectFull: number;
  readonly dptSelectSmall: number;
  readonly shelterNom: string;
  readonly espece: string | Array<string>;
}
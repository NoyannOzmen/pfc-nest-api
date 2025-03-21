export class SearchBodyDto {
  especeDropdown: string;
  readonly especeDropdownFull: string;
  readonly especeDropdownSmall: string;
  readonly dptSelect: number;
  readonly sexe: string;
  readonly minAge: number;
  readonly maxAge: number;
  readonly tag: string | Array<string>;
}
import { IsAlpha, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class SearchBodyDto {
  @IsString()
  @IsOptional()
  @IsAlpha()
  especeDropdown: string;
  especeDropdownFull: string;
  especeDropdownSmall: string;
  sexe: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  dptSelect: number;
  minAge: number;
  maxAge: number;

  @IsOptional()
  tag: string | Array<string>;
}
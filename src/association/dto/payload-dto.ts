import { IsAlphanumeric, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchBodyDto {
  @IsNumber()
  @IsOptional()
  dptSelect: number;
  readonly dptSelectFull: number;
  readonly dptSelectSmall: number;

  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  readonly shelterNom: string;

  @IsOptional()
  readonly espece: string | Array<string>;
}
import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class CreateEspeceDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  readonly nom: string;
}

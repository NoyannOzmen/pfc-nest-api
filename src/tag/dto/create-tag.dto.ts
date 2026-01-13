import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  readonly nom: string;
  readonly description: string;
}

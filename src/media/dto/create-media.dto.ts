import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsNumber()
  @IsPositive()
  readonly animal_id: number | null;
  readonly association_id: number | null;

  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly ordre: number;
}

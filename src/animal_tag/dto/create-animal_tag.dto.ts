import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateAnimalTagDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  animal_id: number;
  tag_id: number
}
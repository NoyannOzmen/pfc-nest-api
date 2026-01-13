import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUtilisateurDto {
  @IsEmail({}, { message: "Merci d'entrer une adresse e-mail valide" })
  readonly email: string;

  @IsString()
  @Length(8, 50, {
    message: "Votre mot de passe doit être constitué d'au moins 8 caractères",
  })
  readonly mot_de_passe: string;
}

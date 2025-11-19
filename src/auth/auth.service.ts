import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private utilisateurService: UtilisateurService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string, 
    mot_de_passe: string): Promise<{ user : any, access_token: string}>{
    const user = await this.utilisateurService.findByEmail(email);

    if(!user) {
      throw new NotFoundException({
        status: 'error',
        message: `Adresse e-mail ou mot de passe incorrect. Merci de réessayer`,
       })
    }

    const hasMatchingPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

    if(!hasMatchingPassword) {
      throw new NotFoundException({
        status: 'error',
        message: `Adresse e-mail ou mot de passe incorrect. Merci de réessayer`,
       })
    }

    if (user && hasMatchingPassword) {
      user.mot_de_passe = '';
      const payload = { sub: user.id, email: user.email, shelter: user.refuge?.id, foster: user.accueillant?.id  };

      return {
        user,
        access_token: await this.jwtService.signAsync(payload),
      }
    }
    throw new UnauthorizedException();
  }
}

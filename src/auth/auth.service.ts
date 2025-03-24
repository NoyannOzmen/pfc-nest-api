import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UtilisateurService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string, 
    mot_de_passe: string): Promise<{ access_token: string}> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    
    const hasMatchingPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

    if (!hasMatchingPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

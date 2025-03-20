import { Injectable } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Utilisateur } from './utilisateur.model';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectModel(Utilisateur)
    private utilisateurModel: typeof Utilisateur,
  ) {}

  create(createUtilisateurDto: CreateUtilisateurDto) {
    return 'This action adds a new utilisateur';
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurModel.findAll();
  }

  findOne(id: string): Promise<Utilisateur | null> {
    return this.utilisateurModel.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    return `This action updates a #${id} utilisateur`;
  }

  async remove(id: string): Promise<void> {
    const utilisateur = await this.findOne(id);
    await utilisateur?.destroy();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
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


  async create(createUtilisateurDto: CreateUtilisateurDto) {
    const user = await this.utilisateurModel.create({ ...createUtilisateurDto });
    return 'User successfully created';
  }

  async findAll(): Promise<Utilisateur[]> {
    const users = await this.utilisateurModel.findAll();
    return users
  }

  async findOne(id: string): Promise<Utilisateur> {
    const user = await this.utilisateurModel.findByPk(id);

    if (!user) {
      throw new NotFoundException({
        status: 'error',
        message: `User with id ${id} does not exist`,
      });
    }

    return user
  }

  async update(id: string, updateUtilisateurDto: UpdateUtilisateurDto) : Promise<Utilisateur> {
    const user = await this.utilisateurModel.findByPk(id);

    if (!user) {
      throw new NotFoundException({
        status: 'error',
        message: `User with id ${id} does not exist`,
      });
    }
    await user.update(updateUtilisateurDto);
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
    return `Succesfully removed #${id} User`;
  }
}

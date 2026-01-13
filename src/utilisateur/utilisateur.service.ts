import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Utilisateur } from './utilisateur.model';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectModel(Utilisateur)
    private utilisateurModel: typeof Utilisateur,
  ) {}

  async findByEmail(email: string): Promise<Utilisateur | null> {
    return this.utilisateurModel.findOne({
      where: { email },
      include: ['refuge', 'accueillant'],
    });
  }

  async create(createUtilisateurDto: CreateUtilisateurDto) {
    const newUser = await this.utilisateurModel.create({
      ...createUtilisateurDto,
    });
    await newUser.save();

    return { message: 'User successfully created', newUser: newUser };
  }

  //* Unused method
  /*
  async findAll(): Promise<Utilisateur[]> {
    const users = await this.utilisateurModel.findAll();
    return users
  }
  */

  async findOne(id: string): Promise<Utilisateur> {
    const user = await this.utilisateurModel.findByPk(id);

    if (!user) {
      throw new NotFoundException({
        status: 'error',
        message: `User with id ${id} does not exist`,
      });
    }

    return user;
  }

  //* Unused method
  /*
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
  */

  async remove(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: `User succesfully removed` };
  }
}

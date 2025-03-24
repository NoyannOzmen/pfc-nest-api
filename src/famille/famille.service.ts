import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilleDto } from './dto/create-famille.dto';
import { UpdateFamilleDto } from './dto/update-famille.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Famille } from './famille.model';
import * as bcrypt from 'bcrypt';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Injectable()
export class FamilleService {
  constructor(
    @InjectModel(Famille)
    private familleModel: typeof Famille,
    private readonly utilisateurService: UtilisateurService
  ) {}

  async registerFoster(email: string, mot_de_passe: string, confirmation: string, createFamilleDto: CreateFamilleDto) {
    if (mot_de_passe !== confirmation) {
      throw new BadRequestException('La confirmation du mot de passe ne correspond pas au mot de passe renseigné')
    }
    
    const found = await this.utilisateurService.findByEmail(email);

    if (found) {
      throw new BadRequestException('Cannot proceed')
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 8);

    const newUser = await this.utilisateurService.create({
      email: email,
      mot_de_passe : hashedPassword,
    })

    const newFoster = await this.familleModel.create({ ...createFamilleDto });
    await newFoster.save();

    return 'Foster successfully created';
  }

  async findAll(): Promise<Famille[]> {
    const fosters = await this.familleModel.findAll();
    return fosters
  }

  async findOne(id: string): Promise<Famille> {
    const foster = await this.familleModel.findByPk(id);

    if (!foster) {
      throw new NotFoundException({
        status: 'error',
        message: `Foster with id ${id} does not exist`,
      });
    }

    return foster
  }

  async update(updateFamilleDto: UpdateFamilleDto) : Promise<Famille> {
    const id = 1
    //! REMOVE HARDCODED
    const foster = await this.familleModel.findByPk(id);
    console.log(foster);
    console.log(UpdateFamilleDto)

    if (!foster) {
      throw new NotFoundException({
        status: 'error',
        message: `Foster with id ${id} does not exist`,
      });
    }
    await foster.update(updateFamilleDto);
    return foster;
  }

  //! Delete profile
  async remove(id: string) {
    const foster = await this.findOne(id);
    await foster.destroy();
    return `Succesfully removed #${id} foster`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Animal } from './animal.model';
import { Association } from 'src/association/association.model';
import { Famille } from 'src/famille/famille.model';
import { Tag } from 'src/tag/tag.model';
import { Utilisateur } from 'src/utilisateur/utilisateur.model';
import { Op } from 'sequelize';
import { SearchBodyDto } from './dto/payload-dto';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal)
    private animalModel: typeof Animal,
  ) {}

  //! Nouveau-profil

  async create(createAnimalDto: CreateAnimalDto) {
    const animal = await this.animalModel.create({ ...createAnimalDto });
    return 'Animal successfully created';
  }

  async findAll(): Promise<Animal[]> {
    const animals = await this.animalModel.findAll({
      include: [
        "espece",
        "images_animal",
        { model : Association, as : "refuge", include: ["images_association", { model: Utilisateur, attributes: ['email']}]},
        { model : Famille, as : "accueillant", include: [{ model: Utilisateur, attributes: ['email']}]},
        { model : Tag, as : "tags" },
      ]
    });
    return animals
  }

  async search(searchBodyDto : SearchBodyDto): Promise<Animal[]> {
    if (searchBodyDto.especeDropdownFull) {
      searchBodyDto.especeDropdown = searchBodyDto.especeDropdownFull
    } else {
      searchBodyDto.especeDropdown = searchBodyDto.especeDropdownSmall
    }
  
    const animals = await Animal.findAll({
        include : [
            "espece",
            "images_animal",
            { model : Association, as : "refuge"},
            { model : Tag, as : "tags" }
        ],
        where : {
            statut:'En refuge',
            '$espece.nom$' : (searchBodyDto.especeDropdown) ? { [Op.like] : searchBodyDto.especeDropdown} : { [Op.ne]: null },
            sexe : (searchBodyDto.sexe) ? (searchBodyDto.sexe) : { [Op.ne]: null },
            '$refuge.code_postal$' : (searchBodyDto.dptSelect) ? { [Op.startsWith] : searchBodyDto.dptSelect } : { [Op.ne] : null },
            age : (searchBodyDto.minAge && searchBodyDto.maxAge ) ? { [Op.between]:  [searchBodyDto.minAge, searchBodyDto.maxAge] } : { [Op.ne] : null },
            '$tags.nom$' : (searchBodyDto.tag) ? { [Op.not] : searchBodyDto.tag } : { [Op.or] : [ { [Op.ne] : null }, { [Op.is] : null } ] },
        }
    });
  
    return animals
  }

  async findOne(id: string): Promise<Animal> {
    const animal = await this.animalModel.findByPk(id, {
      include: [
        "espece",
        "images_animal",
        { model : Association, as : "refuge", include: ["images_association", { model: Utilisateur, attributes: ['email']}]},
        { model : Famille, as : "accueillant", include: [{ model: Utilisateur, attributes: ['email']}]},
        { model : Tag, as : "tags" },
      ]
    });

    if (!animal) {
      throw new NotFoundException({
        status: 'error',
        message: `Animal with id ${id} does not exist`,
      });
    }

    return animal
  }

  //! Faire une demande

  //! Upload Picture

  async update(id: string, updateAnimalDto: UpdateAnimalDto) : Promise<Animal> {
    const animal = await this.animalModel.findByPk(id);

    if (!animal) {
      throw new NotFoundException({
        status: 'error',
        message: `Animal with id ${id} does not exist`,
      });
    }
    await animal.update(updateAnimalDto);
    return animal;
  }

  async remove(id: string) {
    const animal = await this.findOne(id);
    await animal.destroy();
    return `Succesfully removed #${id} animal`;
  }
}

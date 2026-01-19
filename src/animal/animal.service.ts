import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Animal } from './animal.model';
import { Association } from 'src/association/association.model';
import { Famille } from 'src/famille/famille.model';
import { Tag } from 'src/tag/tag.model';
import { Op } from 'sequelize';
import { SearchBodyDto } from './dto/payload-dto';
import { Media } from 'src/media/media.model';
import { DemandeService } from 'src/demande/demande.service';
import { TagService } from 'src/tag/tag.service';
import { MediaService } from 'src/media/media.service';
import { AnimalTagService } from 'src/animal_tag/animal_tag.service';
import { Demande } from 'src/demande/demande.model';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal)
    private animalModel: typeof Animal,
    @InjectModel(Demande)
    private demandeModel: typeof Demande,
    private demandeService: DemandeService,
    private tagService: TagService,
    private mediaService: MediaService,
    private animalTagService: AnimalTagService,
  ) {}

  async create(createAnimalDto: CreateAnimalDto, req) {
    const shelterId = req.user.shelter;
    const tags = req.body.tags;

    const newAnimal = await this.animalModel.create({
      nom: createAnimalDto.nom_animal,
      race: createAnimalDto.race_animal,
      espece_id: createAnimalDto.espece_animal,
      sexe: createAnimalDto.sexe_animal,
      couleur: createAnimalDto.couleur_animal,
      age: createAnimalDto.age_animal,
      description: createAnimalDto.description_animal,
      tags: createAnimalDto.tags,
      association_id: shelterId,
      statut: 'En refuge',
    });

    await this.mediaService.create({
      association_id: null,
      animal_id: newAnimal.id,
      url: '/images/animal_empty.webp',
      ordre: 1,
    });

    if (tags) {
      for (const tag of tags) {
        await this.animalTagService.addTag(newAnimal.id, tag);
      }
    }
    return { message: 'Animal successfully created' };
  }

  async findAll(): Promise<Animal[]> {
    const animals = await this.animalModel.findAll({
      include: [
        'espece',
        'images_animal',
        'demandes',
        { model: Association, as: 'refuge', include: ['images_association'] },
        { model: Famille, as: 'accueillant' },
        { model: Tag, as: 'tags' },
      ],
      /* where : {
        statut:'En refuge',
      } */
    });
    return animals;
  }

  async search(searchBodyDto: SearchBodyDto): Promise<Animal[]> {
    if (searchBodyDto.especeDropdownFull) {
      searchBodyDto.especeDropdown = searchBodyDto.especeDropdownFull;
    } else {
      searchBodyDto.especeDropdown = searchBodyDto.especeDropdownSmall;
    }

    const animals = await Animal.findAll({
      include: [
        'espece',
        'images_animal',
        { model: Association, as: 'refuge' },
        { model: Tag, as: 'tags' },
      ],
      where: {
        statut: 'En refuge',
        '$espece.nom$': searchBodyDto.especeDropdown
          ? { [Op.like]: searchBodyDto.especeDropdown }
          : { [Op.ne]: null },
        sexe: searchBodyDto.sexe ? searchBodyDto.sexe : { [Op.ne]: null },
        '$refuge.code_postal$': searchBodyDto.dptSelect
          ? { [Op.startsWith]: searchBodyDto.dptSelect }
          : { [Op.ne]: null },
        age:
          searchBodyDto.minAge && searchBodyDto.maxAge
            ? { [Op.between]: [searchBodyDto.minAge, searchBodyDto.maxAge] }
            : { [Op.ne]: null },
        '$tags.nom$': searchBodyDto.tag.length
          ? { [Op.not]: searchBodyDto.tag }
          : { [Op.or]: [{ [Op.ne]: null }, { [Op.is]: null }] },
      },
    });

    return animals;
  }

  async findOne(id: string): Promise<Animal> {
    const animal = await this.animalModel.findByPk(id, {
      include: [
        'espece',
        'images_animal',
        { model: Association, as: 'refuge', include: ['images_association'] },
        { model: Famille, as: 'accueillant' },
        { model: Tag, as: 'tags' },
      ],
    });

    if (!animal) {
      throw new NotFoundException({
        status: 'error',
        message: `Animal with id ${id} does not exist`,
      });
    }

    return animal;
  }

  async findRequested(id: string): Promise<Animal[]> {
    const requested = this.animalModel.findAll({
      include: [
        'images_animal',
        'espece',
        'demandes',
        { model: Association, as: 'refuge' },
      ],
      where: {
        association_id: id,
        '$demandes.Demande.id$': { [Op.ne]: null },
      },
    });

    if (!requested) {
      throw new NotFoundException({
        status: 'error',
        message: `Shelter with id ${id} does not have animals requested for fostering`,
      });
    }

    return requested;
  }

  async findAnimalRequests(id: string): Promise<Demande[]> {
    const animalRequests = await this.demandeModel.findAll({
      include: [
        'famille',
        { model: Animal, as: 'animal', include: ['refuge'] },
      ],
      where: {
        '$animal.id$': id,
      },
    });

    if (!animalRequests) {
      throw new NotFoundException({
        status: 'error',
        message: `No request for Animal with id ${id} yet.`,
      });
    }

    return animalRequests;
  }

  async findFostered(id: string): Promise<Animal[]> {
    const fostered = this.animalModel.findAll({
      include: [
        'images_animal',
        'espece',
        'accueillant',
        { model: Tag, as: 'tags' },
      ],
      where: {
        statut: 'Accueilli',
      },
    });

    if (!fostered) {
      throw new NotFoundException({
        status: 'error',
        message: `Shelter with id ${id} does not have animals currently fostered`,
      });
    }

    return fostered;
  }

  async hostRequest(id: string, req) {
    const animalId = Number(id);
    const familleId = req.user.foster;
    const animal = await this.animalModel.findByPk(id);

    if (!animal) {
      throw new NotFoundException();
    }

    const found = await this.demandeService.findByExisting(familleId, animalId);

    if (found) {
      return {
        message: 'Vous avez déjà effectué une demande pour cet animal !',
      };
    }

    const date = new Date();
    await this.demandeService.create({
      famille_id: familleId,
      animal_id: Number(animalId),
      statut_demande: 'En attente',
      date_debut: date,
      date_fin: new Date(date.setMonth(date.getMonth() + 8)),
    });
    return {
      message: 'Votre demande a bien été prise en compte !',
    };
  }

  async uploadPhoto(file: Express.Multer.File, req) {
    const trim = `/uploads/${JSON.stringify(file)}`;
    const animalId = req.body.animalId;

    const animal = await this.animalModel.findByPk(animalId, {
      include: 'images_animal',
    });

    if (!animal) {
      throw new NotFoundException({
        status: 'error',
        message: `Animal with id ${animalId} does not exist`,
      });
    }

    const newMedia = await Media.create({
      animal_id: animal.id,
      url: trim,
      ordre: 1,
    });

    await newMedia.save();
    const url = newMedia.url;
    return { message: 'File uploaded successfully', animal, url };
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
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

  //* Unused method
  /*
  async remove(id: string) {
    const animal = await this.findOne(id);
    await animal.destroy();
    return `Succesfully removed #${id} animal`;
  }
  */
}

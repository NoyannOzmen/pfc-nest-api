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
import { Media } from 'src/media/media.model';
import { DemandeService } from 'src/demande/demande.service';
import { TagService } from 'src/tag/tag.service';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal)
    private animalModel: typeof Animal,
    private demandeService : DemandeService,
    private tagService : TagService,
    private mediaService : MediaService
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    const shelterId = 1
    //! REMOVE HARDCODED
    const tagCount = await this.tagService.count();
    const tagIdArray = [];

    for (let i = 0; i < tagCount; i++) {
      const hasProperty = Object.hasOwn(createAnimalDto,`tag_${i+1}`);
      if (hasProperty){
          tagIdArray.push(createAnimalDto.`tag_${i+1}`);
      }
    }
    createAnimalDto.association_id = shelterId;
    createAnimalDto.statut = 'En refuge'
    
    const newAnimal = await this.animalModel.create({ ...createAnimalDto });
    const newMedia = await this.mediaService.create({
      association_id : null,
      animal_id : newAnimal.id,
      url: "/images/animal_empty.webp",
      ordre: 1
    })

    if (tagIdArray) {
      for (const tagId of tagIdArray) {
          await this.tagService.addTag(newAnimal.id, tagId)
      }
  }

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

  async hostRequest(id: string) {
    const animalId = Number(id);
    const familleId = 1;
    //! REMOVE HARDCODED VALUE

    const animal = await this.animalModel.findByPk(id)

    if (!animal) {
      throw new NotFoundException();
    }

    const found = await this.demandeService.findByExisting(familleId, animalId);
    
    if (found) {
      return { message : 'Vous avez déjà effectué une demande pour cet animal !' }
    }

    const date = new Date();
    const newRequest = await this.demandeService.create({
        famille_id : familleId,
        animal_id : Number(animalId),
        statut_demande:'En attente',
        date_debut: date,
        date_fin: new Date(date.setMonth(date.getMonth() + 8))
    });
    return {
      message : 'Votre demande a bien été prise en compte !'
    }
  }

  async uploadPhoto(file: Express.Multer.File){
    let userImage = file.path;
    const trim = userImage.replace("./assets", "");
    /* const animalId = req.body.animalId */;
    //! REMOVE HARDCODED VALUE AFTER AUTH
    const animalId = 1;

    const animal = await this.animalModel.findByPk(animalId, {
        include : 'images_animal'
    });

    if (!animal) {
      throw new NotFoundException({
        status: 'error',
        message: `Animal with id ${animalId} does not exist`,
      })
    }

    const newMedia = await Media.create({
        animal_id : animal.id,
        url : trim,
        ordre : 1
    })

    await newMedia.save();
    return { message : 'File uploaded successfully', animal}
  }

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

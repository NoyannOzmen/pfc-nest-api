import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Association } from './association.model';
import { Utilisateur } from 'src/utilisateur/utilisateur.model';
import { SearchBodyDto } from './dto/payload-dto';
import { Op } from 'sequelize';
import { Espece } from 'src/espece/espece.model';
import { Animal } from 'src/animal/animal.model';

@Injectable()
export class AssociationService {
  constructor(
    @InjectModel(Association)
    private associationModel: typeof Association,
  ) {}

  //! Signup
  async create(createAssociationDto: CreateAssociationDto) {
    const shelter = await this.associationModel.create({ ...createAssociationDto });
    return 'Shelter successfully created';
  }

  async findAll(): Promise<Association[]> {
    const shelters = this.associationModel.findAll({
      include : ["images_association"]
    });
    return shelters
  }

  async search(searchBodyDto : SearchBodyDto): Promise<Association[]> {
    if (searchBodyDto.dptSelectFull) {
        searchBodyDto.dptSelect = searchBodyDto.dptSelectFull
    } else {
        searchBodyDto.dptSelect = searchBodyDto.dptSelectSmall
    }
  
    const associations = await Association.findAll({
      include : [ 
          'images_association',
          { model : Animal, as : "pensionnaires", include : [{ model : Espece, as : "espece" }] }],
          where : {
              nom : (searchBodyDto.shelterNom) ? (searchBodyDto.shelterNom) : { [Op.ne]: null },
              code_postal : (searchBodyDto.dptSelect) ? { [Op.startsWith] : searchBodyDto.dptSelect } : { [Op.ne] : null },
              '$pensionnaires.espece.nom$' : (searchBodyDto.espece ) ? searchBodyDto.espece : { [Op.ne] : null },
          }
      });

    return associations;
  }

  async findOne(id: string): Promise<Association> {
    const shelter = await this.associationModel.findByPk(id, {
      include : [
        "images_association",
        { model : Utilisateur, attributes : ['email']}
      ]
    });

    if (!shelter) {
      throw new NotFoundException({
        status: 'error',
        message: `Shelter with id ${id} does not exist`,
      })
    }

    return shelter
  }

  //! Profile update
  async update(id: string, updateAssociationDto: UpdateAssociationDto) : Promise<Association> {
    const shelter = await this.associationModel.findByPk(id);

    if (!shelter) {
      throw new NotFoundException({
        status: 'error',
        message: `Shelter with id ${id} does not exist`,
      })
    }
    
    await shelter.update(updateAssociationDto);
    return shelter
  }

  //! Upload logo

  //! Accept Request

  //! Deny Request

  //! Delete profile
  async remove(id: string) {
    const association = await this.findOne(id);
    await association.destroy();
    return `Succesfully removed #${id} shelter`;
  }
}

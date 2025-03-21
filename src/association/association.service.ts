import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Association } from './association.model';

@Injectable()
export class AssociationService {
  constructor(
    @InjectModel(Association)
    private associationModel: typeof Association,
  ) {}

  async create(createAssociationDto: CreateAssociationDto) {
    const shelter = await this.associationModel.create({ ...createAssociationDto });
    return 'Shelter successfully created';
  }

  async findAll(): Promise<Association[]> {
    const shelters = this.associationModel.findAll();
    return shelters
  }

  async findOne(id: string): Promise<Association> {
    const shelter = await this.associationModel.findByPk(id);

    if (!shelter) {
      throw new NotFoundException({
        status: 'error',
        message: `Shelter with id ${id} does not exist`,
      })
    }

    return shelter
  }

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

  async remove(id: string) {
    const association = await this.findOne(id);
    await association.destroy();
    return `Succesfully removed #${id} shelter`;
  }
}

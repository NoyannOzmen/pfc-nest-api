import { Injectable } from '@nestjs/common';
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

  create(createAssociationDto: CreateAssociationDto) {
    return 'This action adds a new association';
  }

  async findAll(): Promise<Association[]> {
    return this.associationModel.findAll();
  }

  findOne(id: string): Promise<Association | null> {
    return this.associationModel.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateAssociationDto: UpdateAssociationDto) {
    return `This action updates a #${id} association`;
  }

  async remove(id: string): Promise<void> {
    const association = await this.findOne(id);
    await association?.destroy();
  }
}

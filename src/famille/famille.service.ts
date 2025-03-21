import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilleDto } from './dto/create-famille.dto';
import { UpdateFamilleDto } from './dto/update-famille.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Famille } from './famille.model';

@Injectable()
export class FamilleService {
  constructor(
    @InjectModel(Famille)
    private familleModel: typeof Famille,
  ) {}

  async create(CreateFamilleDto: CreateFamilleDto) {
    const foster = await this.familleModel.create({ ...CreateFamilleDto });
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

  async update(id: string, UpdateFamilleDto: UpdateFamilleDto) : Promise<Famille> {
    const foster = await this.familleModel.findByPk(id);

    if (!foster) {
      throw new NotFoundException({
        status: 'error',
        message: `Foster with id ${id} does not exist`,
      });
    }
    await foster.update(UpdateFamilleDto);
    return foster;
  }

  async remove(id: string) {
    const foster = await this.findOne(id);
    await foster.destroy();
    return `Succesfully removed #${id} foster`;
  }
}

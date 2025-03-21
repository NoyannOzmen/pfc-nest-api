import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspeceDto } from './dto/create-espece.dto';
import { UpdateEspeceDto } from './dto/update-espece.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Espece } from './espece.model';

@Injectable()
export class EspeceService {
  constructor(
    @InjectModel(Espece)
    private especeModel: typeof Espece,
  ) {}

  async create(createEspeceDto: CreateEspeceDto) {
    const espece = await this.especeModel.create({ ...createEspeceDto });
    return 'Species successfully created';
  }

  async findAll(): Promise<Espece[]> {
    const especes = await this.especeModel.findAll();
    return especes
  }

  async findOne(id: string): Promise<Espece> {
    const espece = await this.especeModel.findByPk(id);

    if (!espece) {
      throw new NotFoundException({
        status: 'error',
        message: `Species with id ${id} does not exist`,
      });
    }

    return espece
  }

  async update(id: string, updateEspeceDto: UpdateEspeceDto) : Promise<Espece> {
    const espece = await this.especeModel.findByPk(id);

    if (!espece) {
      throw new NotFoundException({
        status: 'error',
        message: `Species with id ${id} does not exist`,
      });
    }
    await espece.update(updateEspeceDto);
    return espece;
  }

  async remove(id: string) {
    const espece = await this.findOne(id);
    await espece.destroy();
    return `Succesfully removed #${id} species`;
  }
}
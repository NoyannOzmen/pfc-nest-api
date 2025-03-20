import { Injectable } from '@nestjs/common';
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

  create(createEspeceDto: CreateEspeceDto) {
    return 'This action adds a new espece';
  }

  async findAll(): Promise<Espece[]> {
    return this.especeModel.findAll();
  }

  findOne(id: string): Promise<Espece | null> {
    return this.especeModel.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateEspeceDto: UpdateEspeceDto) {
    return `This action updates a #${id} espece`;
  }

  async remove(id: string): Promise<void> {
    const espece = await this.findOne(id);
    await espece?.destroy();
  }
}

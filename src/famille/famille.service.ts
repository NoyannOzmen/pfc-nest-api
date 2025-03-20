import { Injectable } from '@nestjs/common';
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

  create(createFamilleDto: CreateFamilleDto) {
    return 'This action adds a new famille';
  }

  async findAll(): Promise<Famille[]> {
    return this.familleModel.findAll();
  }

  findOne(id: string): Promise<Famille | null> {
    return this.familleModel.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateFamilleDto: UpdateFamilleDto) {
    return `This action updates a #${id} famille`;
  }

  async remove(id: string): Promise<void> {
    const famille = await this.findOne(id);
    await famille?.destroy();
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Animal } from './animal.model';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal)
    private animalModel: typeof Animal,
  ) {}

  create(createAnimalDto: CreateAnimalDto) {
    return 'This action adds a new animal';
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.findAll();
  }

  findOne(id: string): Promise<Animal | null> {
    return this.animalModel.findOne({
      where: {
        id,
      },
    });
  }
  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  async remove(id: string): Promise<void> {
    const animal = await this.findOne(id);
    await animal?.destroy();
  }
}

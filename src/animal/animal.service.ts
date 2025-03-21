import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createAnimalDto: CreateAnimalDto) {
    const user = await this.animalModel.create({ ...createAnimalDto });
    return 'Animal successfully created';
  }

  async findAll(): Promise<Animal[]> {
    const animals = await this.animalModel.findAll();
    console.log(animals)
    return animals;
  }

  async findOne(id: string): Promise<Animal> {
    const animal = await this.animalModel.findByPk(id);

    if (!animal) {
      throw new NotFoundException({
        status: 'error',
        message: `Animal with id ${id} does not exist`,
      });
    }

    return animal;
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

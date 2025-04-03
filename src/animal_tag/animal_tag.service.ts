import { Injectable } from '@nestjs/common';
import { CreateAnimalTagDto } from './dto/create-animal_tag.dto';
import { UpdateAnimalTagDto } from './dto/update-animal_tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Animal_Tag } from './animal_tag.model';

@Injectable()
export class AnimalTagService {
  constructor(
    @InjectModel(Animal_Tag)
    private animalTagModel: typeof Animal_Tag
  ) {}

  async addTag(id : number, tagId : number) {
    await this.animalTagModel.create({
      animal_id : id,
      tag_id : tagId,
    })
  }

  //* Unused methods
  /*
  create(createAnimalTagDto: CreateAnimalTagDto) {
    return 'This action adds a new animalTag';
  }

  findAll() {
    return `This action returns all animalTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animalTag`;
  }

  update(id: number, updateAnimalTagDto: UpdateAnimalTagDto) {
    return `This action updates a #${id} animalTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalTag`;
  }
  */
}

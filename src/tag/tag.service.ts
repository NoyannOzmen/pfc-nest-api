import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.model';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag)
    private tagModel: typeof Tag,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const newTag = await this.tagModel.create({ ...createTagDto });
    return { message: 'Tag successfully created', newTag };
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.tagModel.findAll();
    return tags;
  }

  async count() {
    return await this.tagModel.count();
  }

  //* Unused methods
  /*
  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagModel.findByPk(id);

    if (!tag) {
      throw new NotFoundException({
        status: 'error',
        message: `Tag with id ${id} does not exist`,
      });
    }

    return tag
  }

  async update(id: string, updateTagDto: UpdateTagDto) : Promise<Tag> {
    const tag = await this.tagModel.findByPk(id);

    if (!tag) {
      throw new NotFoundException({
        status: 'error',
        message: `Tag with id ${id} does not exist`,
      });
    }
    await tag.update(updateTagDto);
    return tag;
  }

  async remove(id: string) {
    const tag = await this.findOne(id);
    await tag.destroy();
    return `Succesfully removed #${id} Tag`;
  }
  */
}

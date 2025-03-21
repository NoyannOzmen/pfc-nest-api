import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.model';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag)
    private tagModel: typeof Tag,
  ) {}

  //! Create Tag
  async create(createTagDto: CreateTagDto) {
    const tag = await this.tagModel.create({ ...createTagDto });
    return 'Tag successfully created';
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.tagModel.findAll();
    return tags
  }

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
}
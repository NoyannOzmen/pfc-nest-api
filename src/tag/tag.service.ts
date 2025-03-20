import { Injectable } from '@nestjs/common';
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

  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.findAll();
  }

  findOne(id: string): Promise<Tag | null> {
    return this.tagModel.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  async remove(id: string): Promise<void> {
    const tag = await this.findOne(id);
    await tag?.destroy();
  }
}

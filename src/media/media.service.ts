import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from './media.model';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media)
    private mediaModel: typeof Media,
  ) {}

  create(createMediaDto: CreateMediaDto) {
    return 'This action adds a new media';
  }

  async findAll(): Promise<Media[]> {
    return this.mediaModel.findAll();
  }

  findOne(id: string): Promise<Media | null> {
    return this.mediaModel.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  async remove(id: string): Promise<void> {
    const media = await this.findOne(id);
    await media?.destroy();
  }
}

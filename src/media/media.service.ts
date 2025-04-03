import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createMediaDto: CreateMediaDto) {
    const media = await this.mediaModel.create({ ...createMediaDto });
    return 'Media successfully created';
  }
  
  //* Unused methods
  /*
  async findAll(): Promise<Media[]> {
    const medias = await this.mediaModel.findAll();
    return medias
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.mediaModel.findByPk(id);

    if (!media) {
      throw new NotFoundException({
        status: 'error',
        message: `Media with id ${id} does not exist`,
      });
    }

    return media
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) : Promise<Media> {
    const media = await this.mediaModel.findByPk(id);

    if (!media) {
      throw new NotFoundException({
        status: 'error',
        message: `Media with id ${id} does not exist`,
      });
    }
    await media.update(updateMediaDto);
    return media;
  }

  async remove(id: string) {
    const media = await this.findOne(id);
    await media.destroy();
    return `Succesfully removed #${id} Media`;
  }
  */
}

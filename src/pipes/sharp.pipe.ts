
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {

  async transform(image: Express.Multer.File): Promise<string> {
    const originalName = path.parse(image.originalname).name;
    const filename = originalName + '.webp';

    await sharp(image.buffer)
      .resize({
        width: 450,
        height: 300,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./assets/uploads', filename));

    return filename;
  }

}


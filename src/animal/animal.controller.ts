import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Request
} from '@nestjs/common';
import { Response } from 'express';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { SearchBodyDto } from './dto/payload-dto';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { SharpPipe } from 'src/pipes/sharp.pipe';
import { Public } from 'src/auth/decorators/public.decorator';

MulterModule.register({
  dest: 'src/assets/uploads'
});

@Controller()
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}
  
  @Post('/animaux/nouveau-profil')
  create(
    @Request() req,
    @Body() createAnimalDto: CreateAnimalDto
  ) {
    return this.animalService.create(createAnimalDto, req);
  }

  @Public()
  @Get('/animaux/')
  findAll() {
    return this.animalService.findAll();
  }

  @Public()
  @Post('/animaux/')
  async search(
    @Body() body: SearchBodyDto,
    @Req() req: Request,
    @Res({ passthrough : true}) res: Response,
  ) {
    return this.animalService.search(body)
  }

  @Public()
  @Get('/animaux/:id')
  findOne(@Param('id') id: string) {
    return this.animalService.findOne(id);
  }

  @Post('/animaux/:id/faire-une-demande')
  hostRequest(
    @Request() req,
    @Param('id') id:string
  ) {
    return this.animalService.hostRequest(id, req)
  }

  @Post('/upload/photo')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Request() req,
    @UploadedFile(

      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg|jpg|png|gif|webp',
        })
        .addMaxSizeValidator({
          maxSize: 5000000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
      SharpPipe,
    ) file: Express.Multer.File) {
    return this.animalService.uploadPhoto(file, req);
  }

  @Patch('/animaux/:id')
  update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto) {
      return this.animalService.update(id, updateAnimalDto);
    }

  @Delete('/animaux/:id')
  remove(@Param('id') id: string) {
    return this.animalService.remove(id);
  }
}

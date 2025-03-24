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
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { SearchBodyDto } from './dto/payload-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from 'src/pipes/sharp.pipe';

@Controller('animaux')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}
  
  @Post('/nouveau-profil')
  //! Add logic
  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }

  @Get()
  findAll() {
    return this.animalService.findAll();
  }

  @Post()
  async search(
    @Body() body: SearchBodyDto,
    @Req() req: Request,
    @Res({ passthrough : true}) res: Response,
  ) {
    return this.animalService.search(body)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalService.findOne(id);
  }

  @Post(':id/faire-une-demande')
  //! Add logic

  //! Add upload logic
  @Post('upload/photo')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      SharpPipe,
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/(jpeg|jpg|gif|png|webp)', 
        })
        .addMaxSizeValidator({
          maxSize: 5000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) file: Express.Multer.File) {
    return this.animalService.uploadPhoto(file);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto) {
      return this.animalService.update(id, updateAnimalDto);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalService.remove(id);
  }
}

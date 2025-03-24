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
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterModule } from '@nestjs/platform-express';
import { Express, Request, Response } from 'express';
import { AssociationService } from './association.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { SearchBodyDto } from './dto/payload-dto';
import { SharpPipe } from '../pipes/sharp.pipe';
import { Public } from 'src/auth/decorators/public.decorator';

MulterModule.register({
  dest: '../assets/upload'
});

@Controller('associations')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Public()
  @Post('association/inscription')
  async register(
    @Body() createAssociationDto: CreateAssociationDto,
    @Body('email') email: string,
    @Body('password') mot_de_passe: string,
    @Body('confirmation') confirmation: string,
  ) {
    return this.associationService.registerShelter(
      email, 
      mot_de_passe, 
      confirmation, 
      createAssociationDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.associationService.findAll();
  }

  @Public()
  @Post()
  async search(
    @Body() body: SearchBodyDto,
    @Req() req: Request,
    @Res({ passthrough : true}) res: Response,
  ) {
    return this.associationService.search(body)
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associationService.findOne(id);
  }

  @Post('association/profil')
  //! Add update infos logic
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto) {
    return this.associationService.update(id, updateAssociationDto);
  }

  //! Add upload logic
  @Post('/upload/logo')
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
    return this.associationService.uploadLogo(file);
  }

  @Post('association/profil/demandes/:id/accept')
  //! Add request logic

  @Post('association/profil/demandes/:id/deny')
  //! Add request logic

  @Post('association/profil/delete')
  //! Add delete account logic
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.associationService.remove(id);
  }
}

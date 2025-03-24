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
import { AnimalService } from 'src/animal/animal.service';
import { DemandeService } from 'src/demande/demande.service';

MulterModule.register({
  dest: '../assets/upload'
});

@Controller('associations')
export class AssociationController {
  constructor(
    private readonly associationService: AssociationService,
    private readonly animalService: AnimalService,
    private readonly demandeService: DemandeService
  ) {}

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
  update(
    @Body() updateAssociationDto: UpdateAssociationDto) {
    return this.associationService.update(updateAssociationDto);
  }

  @Get('association/profil/animaux/:id')
  residentDetails(@Param('id') id: string) {
    return this.animalService.findOne(id)
  }

  @Get('association/profil/demandes/:id')
  requestDetails(@Param('id') id: string) {
    return this.demandeService.findOne(id)
  }

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

  @Post('/associations/profil/demandes/:id/accept')
  accept(@Param('id') id: string) {
    return this.associationService.acceptRequest(id)
  }

  @Post('/associations/profil/demandes/:id/deny')
  deny(@Param('id') id: string) {
    return this.associationService.denyRequest(id)
  }

  @Post('association/profil/delete')
  remove() {
    return this.associationService.deleteShelterAccount();
  }
}

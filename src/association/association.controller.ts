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
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterModule } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { AssociationService } from './association.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { SearchBodyDto } from './dto/payload-dto';
import { SharpPipe } from '../pipes/sharp.pipe';
import { Public } from 'src/auth/decorators/public.decorator';
import { AnimalService } from 'src/animal/animal.service';
import { DemandeService } from 'src/demande/demande.service';

MulterModule.register({
  dest: 'src/assets/uploads'
});

@Controller()
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
    @Body('mot_de_passe') mot_de_passe: string,
    @Body('confirmation') confirmation: string,
  ) {
    return this.associationService.registerShelter(
      email, 
      mot_de_passe, 
      confirmation, 
      createAssociationDto);
  }

  @Public()
  @Get('associations')
  findAll() {
    return this.associationService.findAll();
  }

  @Public()
  @Post('associations')
  async search(
    @Body() body: SearchBodyDto,
    @Req() req: Request,
    @Res({ passthrough : true}) res: Response,
  ) {
    return this.associationService.search(body)
  }

  @Public()
  @Get('associations/:id')
  findOne(@Param('id') id: string) {
    return this.associationService.findOne(id);
  }

  @Post('associations/profil')
  update(
    @Request() req,
    @Body() updateAssociationDto: UpdateAssociationDto) {
    return this.associationService.update(updateAssociationDto, req);
  }

  @Get('associations/profil/:id')
  async DashboardInfos(@Param('id') id: string) {
    return this.associationService.findDashboardInfos(id);
  }

  @Get('associations/profil/animaux/:id')
  residentDetails(@Param('id') id: string) {
    return this.animalService.findOne(id)
  }

  @Get('associations/profil/demandes/:id')
  requestDetails(@Param('id') id: string) {
    return this.demandeService.findOne(id)
  }

  @Post('/upload/logo')
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
    return this.associationService.uploadLogo(file, req);
  }

  @Post('associations/profil/demandes/:id/accept')
  accept(@Param('id') id: string) {
    return this.associationService.acceptRequest(id)
  }

  @Post('associations/profil/demandes/:id/deny')
  deny(@Param('id') id: string) {
    return this.associationService.denyRequest(id)
  }

  @Post('association/profil/delete')
  remove(
    @Request() req,
  ) {
    return this.associationService.deleteShelterAccount(req);
  }
}

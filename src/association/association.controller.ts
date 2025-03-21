import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AssociationService } from './association.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { SearchBodyDto } from './dto/payload-dto';

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}


  @Post('/inscription')
  //! Add Signup logic  
  @Post()
  create(@Body() createAssociationDto: CreateAssociationDto) {
    return this.associationService.create(createAssociationDto);
  }

  @Get()
  findAll() {
    return this.associationService.findAll();
  }

  @Post()
  async search(
    @Body() body: SearchBodyDto,
    @Req() req: Request,
    @Res({ passthrough : true}) res: Response,
  ) {
    return this.associationService.search(body)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associationService.findOne(id);
  }

  @Post('/profil')
  //! Add update infos logic
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto) {
    return this.associationService.update(id, updateAssociationDto);
  }

  @Post('/upload/logo')
  //! Add upload logic

  @Post('/profil/demandes/:id/accept')
  //! Add request logic

  @Post('/profil/demandes/:id/deny')
  //! Add request logic

  @Post('/profil/delete')
  //! Add delete account logic
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.associationService.remove(id);
  }
}

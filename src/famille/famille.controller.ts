import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { FamilleService } from './famille.service';
import { CreateFamilleDto } from './dto/create-famille.dto';
import { UpdateFamilleDto } from './dto/update-famille.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('famille')
export class FamilleController {
  constructor(
    private readonly familleService: FamilleService,
  ) {}

  @Public()
  @Post('inscription')
  async register(
    @Body() createFamilleDto: CreateFamilleDto,
    @Body('email') email: string,
    @Body('mot_de_passe') mot_de_passe: string,
    @Body('confirmation') confirmation: string,
  ) {
    return this.familleService.registerFoster(
      email, 
      mot_de_passe, 
      confirmation, 
      createFamilleDto);
  }

  @Get('/profil/:id')
  async findOne(@Param('id') id: string) {
    return this.familleService.findOne(id);
  }

  //* Unused Endpoints
  /*
  @Get()
  findAll() {
    return this.familleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familleService.findOne(id);
  }

  @Get('/profil/demandes/:id')
  getCurrentRequests(
    @Param('id') id : string
  ) { 
    return this.familleService.getCurrentRequests(id)
  }
  */
 
  @Post('/profil')
  update(
    @Request() req,
    @Body() updateFamilleDto: UpdateFamilleDto) {
      return this.familleService.update(updateFamilleDto, req);
  }

  @Post('/profil/delete')
  remove(
    @Request() req
  ) {
    return this.familleService.deleteFosterAccount(req);
  }
}

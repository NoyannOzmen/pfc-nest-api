import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  @Post('/inscription')
  async register(
    @Body() createFamilleDto: CreateFamilleDto,
    @Body('email') email: string,
    @Body('password') mot_de_passe: string,
    @Body('confirmation') confirmation: string,
  ) {
    return this.familleService.registerFoster(
      email, 
      mot_de_passe, 
      confirmation, 
      createFamilleDto);
  }

  @Get()
  findAll() {
    return this.familleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familleService.findOne(id);
  }

  @Post('/profil')
  //! Add update infos logic
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFamilleDto: UpdateFamilleDto) {
      return this.familleService.update(id, updateFamilleDto);
  }

  @Post('/profil/delete')
  //! Add delete account logic
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familleService.remove(id);
  }
}

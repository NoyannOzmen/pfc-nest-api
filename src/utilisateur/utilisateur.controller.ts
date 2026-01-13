import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Public()
  @Post()
  create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    return this.utilisateurService.create(createUtilisateurDto);
  }

  //* Unused Endpoints
  /*
  @Get()
  findAll() {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilisateurService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto) {
      return this.utilisateurService.update(id, updateUtilisateurDto);
  }
  */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(id);
  }
}

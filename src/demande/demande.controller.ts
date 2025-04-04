import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DemandeService } from './demande.service';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('demandes')
export class DemandeController {
  constructor(private readonly demandeService: DemandeService) {}

  @Public()
  @Get()
  findAll() {
    return this.demandeService.findAll();
  }

  @Public()
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.demandeService.findOne(id);
  }

  //* Unused Endpoints
  /*
  @Post()
  create(@Body() createDemandeDto: CreateDemandeDto) {
    return this.demandeService.create(createDemandeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDemandeDto: UpdateDemandeDto) {
      return this.demandeService.update(id, updateDemandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandeService.remove(id);
  }
  */
}

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

@Controller('famille')
export class FamilleController {
  constructor(private readonly familleService: FamilleService) {}

  @Post('/inscription')
  //! Add Signup logic
  @Post()
  create(@Body() createFamilleDto: CreateFamilleDto) {
    return this.familleService.create(createFamilleDto);
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

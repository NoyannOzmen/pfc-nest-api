import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalTagService } from './animal_tag.service';
import { CreateAnimalTagDto } from './dto/create-animal_tag.dto';
import { UpdateAnimalTagDto } from './dto/update-animal_tag.dto';

@Controller('animal-tag')
export class AnimalTagController {
  constructor(private readonly animalTagService: AnimalTagService) {}

  //* Unused Endpoints
  /*
  @Post()
  create(@Body() createAnimalTagDto: CreateAnimalTagDto) {
    return this.animalTagService.create(createAnimalTagDto);
  }

  @Get()
  findAll() {
    return this.animalTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalTagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalTagDto: UpdateAnimalTagDto) {
    return this.animalTagService.update(+id, updateAnimalTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalTagService.remove(+id);
  }
  */
}

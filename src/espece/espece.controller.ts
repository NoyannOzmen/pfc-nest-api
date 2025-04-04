import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EspeceService } from './espece.service';
import { CreateEspeceDto } from './dto/create-espece.dto';
import { UpdateEspeceDto } from './dto/update-espece.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('especes')
export class EspeceController {
  constructor(private readonly especeService: EspeceService) {}

  @Public()
  @Get()
  findAll() {
    return this.especeService.findAll();
  }

  //* Unused Endpoints
  /*
  @Post()
  create(@Body() createEspeceDto: CreateEspeceDto) {
    return this.especeService.create(createEspeceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEspeceDto: UpdateEspeceDto) {
      return this.especeService.update(id, updateEspeceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especeService.remove(id);
  }
  */
}
